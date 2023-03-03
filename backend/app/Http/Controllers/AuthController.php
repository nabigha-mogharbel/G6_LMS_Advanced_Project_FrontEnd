<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    /**
     * Register a admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $admin = new User;
        $name = $request->input('name');
        if($request->has("admin_created_id")){
        $admin_created_id = $request->input('admin_created_id');}
        $email=$request->input('email');
        $password = hash::make($request->input('password'));//hashed password :/
        $admin->name=$name;
        $admin->email=$email;
        $admin->password=$password;
        if($request->has("admin_created_id")){
            $admin_parent = User::find($admin_created_id);
            $admin->admin_created_id=$admin_created_id;
            $admin->Admin()->associate($admin_parent);}
            $admin->save();
        return response()->json([
            'message' => 'Admin created successfully!',
     
        ]);
    }

    /**
     * Log the admin out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'admin successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
    public function getAdmin(Request $request, $id){
        $Admin =  User::where('id',$id)->with(['Admin'])->get();
  
        return response()->json([
            'message' => $Admin,
     
        ]);
    }
    public function getAllAdmin(Request $request){
            
        $Admin =  User::with(["Admin"])->get();
        return response()->json([
            'message' => $Admin,
    
        ]);
}

        public function deleteAdmin(Request $request, $id){
            $Admin = User::find($id);
            $Admin->delete();
            return response()->json([
                'message' => 'Admin deleted Successfully!',
            ]);
        }


        public function editAdmin(Request $request, $id){
            $Admin =  User::find($id);
            $inputs= $request->except("_method");
            $Admin->update($inputs);
            return response()->json([
                'message' => 'Admin edited successfully!',
                'Admin' => $Admin,
            ]);
        }
}