<?php

namespace App\Http\Controllers;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function addAdmin(Request $request){
        $admin = new Admin;
        $name = $request->input('name');
        $admin_created_id = $request->input('admin_created_id');
        $admin_child = Admin::find($admin_created_id);
        $email=$request->input('email');
        $password = hash::make($request->input('password'));//hashed password :/
        $admin->name=$name;
        $admin->email=$email;
        $admin->password=$password;
        // $admin->admin_created_id=$admin_created_id;
        $admin->Admin_child()->associate($admin_child);
        $admin->save();
        return response()->json([
            'message' => 'Admin created successfully!',
     
        ]);

    }

    public function getAdmin(Request $request, $id){
         
        $Admin =  Admin::where('id',$id)->with(['admins'])->get();
  
        return response()->json([
            'message' => $Admin,
     
        ]);
    }
    public function getAllAdmin(Request $request){
            
        $Admin =  Admin::get();
        return response()->json([
            'message' => $Admin,
    
        ]);
}

        public function deleteAdmin(Request $request, $id){
         
            $Admin = Admin::find($id);
            $Admin->delete();
            return response()->json([
                'message' => 'Admin deleted Successfully!',
            ]);
        }


        public function editAdmin(Request $request, $id){
            $Admin =  Admin::find($id);
            $inputs= $request->all();
            $Admin->update($inputs);
            return response()->json([
                'message' => 'Admin edited successfully!',
                'Admin' => $Admin,
            ]);
        }
}
