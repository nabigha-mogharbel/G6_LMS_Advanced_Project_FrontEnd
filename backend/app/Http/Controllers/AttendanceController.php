<?php

namespace App\Http\Controllers;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Section;
use Laravel\Sanctum\Sanctum;

use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function addAttendance(Request $request){
        $section_id = $request->input('section_id');
        $student_id = $request->input('student_id');
        $status=$request->input('status');
        $date=$request->input("date");
        $student=Student::find($student_id);
        $student->Attendance()->attach($section_id, ["status" => $status, "date"=>$date]);
        return response()->json(["message" => "attendance record created successfully"]);
    }

    public function getAttendance(Request $request, $id){
        $Attendance =  Attendance::where('id',$id)->with(['Student'],['Section'])->get();
         return response()->json([
             'message' => $Attendance,

         ]);
     }
     public function getAttendanceByStudent(Request $request, $id){
        $student=Student::find($id);
        /*$section=$student->Attendance->pluck("id");
        return response()->json([
            'message' => $section,

        ]);*/
        /*foreach ($student->Attendance as $sections) {
            $sections->pivot->section_id;
        }*/
        $relatedSections=$student->Attendance->first();
        return response()->json([
            "message"=>$relatedSections
        ]);
     }

     public function getAllAttendance(Request $request){
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
