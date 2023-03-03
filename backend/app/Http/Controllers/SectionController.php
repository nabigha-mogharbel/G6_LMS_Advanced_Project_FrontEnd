<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;
use App\Models\Classes;

class SectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function addSection(Request $request)
    {
        $Section = new Section;
        $name = $request->input('name');
        $class_id = $request->input('class_id');
        $class = Classes::find($class_id);
        $capacity = $request->input('capacity');
        $Section->name = $name;
        $Section->capacity = $capacity;
        $Section->Class()->associate($class);
        $Section->save();
        return response()->json([
            'message' => 'Section created successfully!',
        ]);
    }


    public function getSection($id)
    {
        $Section =  Section::where('id', $id)->with(['Class'])->get();
        return response()->json([
            'message' => $Section,
        ]);
    }

    public function getSectionByname($name)
    {
        $Section = Section::where('name', $name)->with(['Class'])->paginate(10);
        return response()->json([
            'message' => $Section,
            'inpute' => $name,
        ]);
    }

    public function getAllSection(Request $request)
    {
        $Section =  Section::with(["Class"])->paginate(5);
        return response()->json([
            'message' => $Section,
        ]);
    }

    public function deleteSection(Request $request, $id)
    {
        $Section = Section::find($id);
        $Section->delete();
        return response()->json([
            'message' => 'Section deleted Successfully!',
        ]);
    }


    public function editSection(Request $request, $id)
    {
        $Section =  Section::find($id);
        $inputs = $request->except('_method');
        $Section->update($inputs);
        return response()->json([
            'message' => 'Section edited successfully!',
            'Section' => $Section,
        ]);
    }
}
