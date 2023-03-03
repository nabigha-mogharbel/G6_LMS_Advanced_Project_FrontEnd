<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;

class ClassesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function AddClass(Request $request)
    {
        $class = new Classes();
        $name = $request->input('name');
        $floor = $request->input('floor');
        $class->name = $name;
        $class->floor = $floor;
        $class->save();
        return response()->json([
            "message" => "Class added successfully"
        ]);
    }

    public function  GetClass(Request $request)
    {
        $class = Classes::paginate(5);
        return response()->json([
            "message" => $class
        ]);
    }

    public function getClassById(Request $request, $id)
    {
        $Classes = Classes::where('id', $id)->get();
        return response()->json([
            "message" => $Classes
        ]);
    }

    public function deleteClass(Request $request, $id)
    {
        $Classes = Classes::find($id);
        $Classes->delete();
        return response()->json([
            "message" => "Classes Deleted Successfully!"
        ]);
    }

    public function updateClass(Request $request, $id)
    {
        $Classes = Classes::find($id);
        $inputs = $request->except("_method");
        if ($inputs) {
            $Classes->update($inputs);
        }
        return response()->json([
            "message" => "Classes updated successfully",
            "Classes" => $Classes
        ]);
    }
}
