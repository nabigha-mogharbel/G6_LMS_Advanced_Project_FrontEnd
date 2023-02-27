<?php

namespace App\Http\Controllers;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Section;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function addAttendance(Request $request){
        $Attendance = new Attendance;
        $date = $request->input('date');
        $section_id = $request->input('section_id');
        $student_id = $request->input('student_id');
        $section = Section::find($section_id);
        $student = Student::find($student_id);
        $status=$request->input('status');
        $Attendance->date=$date;
        $Attendance->status=$status;
        #$Attendance->section_id=$section_id;
        $Attendance->Section()->associate($section);
        #$Attendance->student_id=$student_id;
        $Attendance->Student()->associate($student);
        $Attendance->save();
        return response()->json([
            'message' => 'Section created successfully!',

        ]);

    }
    public function getAttendance(Request $request, $id){
        $Attendance =  Attendance::where('id',$id)->with(['Student'],['Section'])->get();
        
         return response()->json([
             'message' => $Attendance,

         ]);
     }
     public function getAllAttendnce(Request $request){
         $Attendance =  Attendance::get();
         return response()->json([
             'message' => $Attendance,

         ]);
     }
     public function deleteAttendance(Request $request, $id){

        $Attendance = Attendance::find($id);
        $Attendance->delete();
        return response()->json([
            'message' => 'Attendance deleted Successfully!',
        ]);
    }
    public function editAttendance(Request $request, $id){
        $Attendance =  Attendance::find($id);
        $inputs= $request->except('_method');
        $Attendance->update($inputs);
        return response()->json([
            'message' => 'Attendance edited successfully!',
            'Attendance' => $Attendance,

        ]);
   }

}
