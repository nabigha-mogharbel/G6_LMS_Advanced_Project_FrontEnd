<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::Get('/admins/{id}', [AuthController::class, 'getAdmin']);
    Route::Patch('/admins/{id}', [AuthController::class, 'editAdmin']);
    Route::delete('/admins/{id}', [AuthController::class, 'deleteAdmin']);

    Route::Post('/classes', [ClassesController::class, 'AddClass']);    
    Route::Get('/classes', [ClassesController::class, 'GetClass']);
    Route::Get('/classes/{id}', [ClassesController::class, 'getClassById']);
    Route::delete('/classes/{id}', [ClassesController::class, 'deleteClass']);
    Route::Patch('/classes/{id}', [ClassesController::class, 'updateClass']);

    Route::Post("/students", [StudentController::class, "addStudent"]);
    Route::Get("/students/{id}", [StudentController::class, "getStudentById"]);
    Route::Get("/students", [StudentController::class, "getStudents"]);
    Route::Get("/students/{section_id}", [StudentController::class, "getStudentsBySection"]);
    Route::delete("/students/{id}", [StudentController::class, "deleteStudentById"]);
    Route::Patch("/students/update/{id}", [StudentController::class, "updateStudent"]);

    Route::Post('/sections', [SectionController::class, 'addSection']);
    Route::Get('/sections', [SectionController::class, 'getAllSection']);
    Route::Get('/sections/{id}', [SectionController::class, 'getSection']);
    Route::Patch('/sections/{id}', [SectionController::class, 'editSection']);
    Route::delete('/sections/{id}', [SectionController::class, 'deleteSection']);

    Route::Post("/attendance", [AttendanceController::class, "addAttendance"]);
    Route::Get("/attendance/{id}", [AttendanceController::class, "getAttendanceById"]);
    Route::Get("/attendance", [AttendanceController::class, "getAllAttendance"]);
    Route::Get("/attendance/section/{section_id}", [AttendanceController::class, "getAttendanceBySection"]);
    Route::Get("/attendance/student/{student_id}", [AttendanceController::class, "getAttendanceByStudent"]);
    Route::delete("/attendance/{id}", [AttendanceController::class, "deleteAttendanceById"]);
    Route::Patch("/attendance/update/{id}", [AttendanceController::class, "updateAttendance"]);
});
