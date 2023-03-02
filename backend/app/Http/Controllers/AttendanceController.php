<?php

namespace App\Http\Controllers;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Section;
use Laravel\Sanctum\Sanctum;

use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    public function addAttendance(Request $request){
        $section_id = $request->input('section_id');
        $student_id = $request->input('student_id');
        $status=$request->input('status');
        $date=$request->input("date");
        $student=Student::find($student_id);
        $student->Attendance()->attach($section_id, ["status" => $status, "date"=>$date]);
        return response()->json(["message" => "attendance record created successfully"]);
    }

   /* public function getAttendance(Request $request, $id){
        $Attendance =  Attendance::where('id',$id)->with(['Student'],['Section'])->get();
         return response()->json([
             'message' => $Attendance,

         ]);
     }*/
     public function getAttendanceById(Request $request, $id){
        $Attendance = Attendance::with("student", "section")->find($id);
        return response()->json([
            "message"=>$Attendance
        ]);
     }

     public function getAllAttendance(Request $request){
         #$Attendance =  Attendance::get();
         $Attendance=Attendance::with(["student", "section"])->get();
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
   public function getAttendanceByStudent(Request $request, $id){
    $attendance=Attendance::where("student_id", $id)->with("student", "section")->get();
    return response()->json([
        "message"=> "Records fro zis student",
        "Atendance"=>$attendance
    ]);
   }
   public function getAttendanceBySection(Request $request, $id){
    $attendance=Attendance::where("section_id", $id)->with("student", "section")->get();
    return response()->json([
        "message"=> "Records fro zis student",
        "Atendance"=>$attendance
    ]);
   }

}
