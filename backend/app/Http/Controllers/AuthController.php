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
        $email=$request->input('email');
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
        $admin=User::find($email)->get();
        if($admin->role==="superadmin"){
            $email=$admin->email;
            return $this->createNewTokens($token, true, $email);
        } else{
            $email=$admin->email;
        return $this->createNewToken($token, false, $email);}
    }
    /**
     * Register a admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            "name" => "required|string",
            "admin_created_id" => "numeric"
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $admin = new User;
        $name = $request->input('name');
        if($request->has("admin_created_id")){
        $admin_created_id = $request->input('admin_created_id');}
        $email=$request->input('email');
        $role=$request->input('role');
        $password = hash::make($request->input('password'));//hashed password :/
        $admin->name=$name;
        $admin->email=$email;
        $admin->password=$password;
        $admin->role=$role;
        if($request->has("admin_created_id")){
            $admin_parent = User::find($admin_created_id);
            if(empty($admin_parent)){
                return response()->json([
                    'message' => "Admin doesn't exists",
             
                ], 400);
            }
            $admin->admin_created_id=$admin_created_id;
            $admin->Admin()->associate($admin_parent);}
            $admin->save();
        return response()->json([
            'message' => 'Admin created successfully!',
     
        ], 201);
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
        return $this->createNewToken(auth()->refresh(),false,"");
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
    protected function createNewToken($token, $role, $email){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
            'email' => $email,
            "isSuperAdmin" => $role,
        ], 200);
    }
    public function getAdmin(Request $request, $id){
        $Admin =  User::where('id',$id)->with(['Admin'])->get();
        if($Admin->isEmpty()){
            return response()->json([
                'message' => "Admin doesn't exists",
         
            ], 400);
        }
        return response()->json([
            'message' => $Admin,
     
        ], 200);
    }
    public function getAllAdmin(Request $request){
            
        $Admin =  User::with(["Admin"])->get();
        return response()->json([
            'message' => $Admin,
    
        ], 200);
}

        public function deleteAdmin(Request $request, $id){
            $admin = User::find($id);
                if(empty($admin)){
                    return response()->json([
                        'message' => "Admin doesn't exists",
                    ], 400);
                }
            $admin->delete();
            return response()->json([
                'message' => 'Admin deleted Successfully!',
            ], 200);
        }


        public function editAdmin(Request $request, $id){
            $admin =  User::find($id);
            if(empty($admin)){
                return response()->json([
                    'message' => "Admin doesn't exists",
             
                ], 400);
            }
            $inputs= $request->except("_method", "password");
            $validator = Validator::make($request->all(), [
                'email' => 'email|unique:users',
                'password' => 'string|min:6',
                "name" => "string",
               " role "=> "boolean",
                "admin_created_id" => "numeric"
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            if($request->has("admin_created_id")){
                $admin_parent = User::find($request->input("admin_created_id"));
                if(empty($admin_parent)){
                    return response()->json([
                        'message' => "Parent Admin doesn't exists",
                 
                    ], 400);
                }
                $admin->admin_created_id=$admin_parent;
                $admin->Admin()->associate($admin_parent);}
            $admin->update($inputs);
            if($request->has('password')){
                $newpass = hash::make($request->input('password'));//hashed password :/
                $admin->update(["password" => $newpass]);
            }
            return response()->json([
                'message' => 'admin edited successfully!',
                'admin' => $admin,
            ], 200);
        }
}