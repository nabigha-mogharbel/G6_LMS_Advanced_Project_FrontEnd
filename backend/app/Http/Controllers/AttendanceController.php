<?php

namespace App\Http\Controllers;
use App\Models\Attendance;
use App\Models\Student;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    public function addAttendance(Request $request){
        $validated=Validator::make($request->all(), [
            'section_id' => 'required|numeric',
            'student_id' => 'required|numeric',
            'date' => 'required|date',
            'status' => Rule::in(["present", "absent", "late"])
        ]);
        if($validated->fails()){
            return response()->json(["message"=>$validated->errors()]);
        }
        $section_id = $request->input('section_id');
        $student_id = $request->input('student_id');
        $status=$request->input('status');
        $date=$request->input("date");
        $student=Student::find($student_id);
        $student->Attendance()->attach($section_id, ["status" => $status, "date"=>$date]);
        return response()->json(["message" => "attendance record created successfully"]);
    }

     public function getAttendanceById(Request $request, $id){
        $validated=Validator::make($id, [
            $id => 'numeric',
        ]);
        if($validated->fails()){
            return response()->json(["message"=>$validated->errors()]);
        }
        $Attendance = Attendance::with("student", "section")->find($id);
        return response()->json([
            "message"=>$Attendance
        ]);
     }

     public function getAllAttendance(Request $request){
         $Attendance=Attendance::with(["student", "section"])->paginate(5);
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
        $validated=Validator::make($request->all(), [
            'section_id' => 'numeric',
            'student_id' => 'numeric',
            'date' => 'date',
            'status' => Rule::in(["present", "absent", "late"]),
            $id => "numeric"
        ]);
        if($validated->fails()){
            return response()->json(["message"=>$validated->errors()]);
        }
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
        "message"=> "Student Attendance Records",
        "Atendance"=>$attendance
    ]);
   }
   public function getAttendanceBySection(Request $request, $id){
    $attendance=Attendance::where("section_id", $id)->with("student", "section")->get();
    return response()->json([
        "message"=> "Section Attendance Records",
        "Atendance"=>$attendance
    ]);
   }
   public function getAttendanceBydate(Request $request, $date){
    $attendance=Attendance::where("date", $date)->with("student", "section")->get();
    return response()->json([
        "message"=> "Date Attendance Records",
        "Atendance"=>$attendance
    ]);
}
}
