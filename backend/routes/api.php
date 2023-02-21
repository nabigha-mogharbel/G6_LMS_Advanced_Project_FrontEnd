<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::Post("/student", [StudentController::class, "addStudent"]);
Route::Get("/student/{id}", [StudentController::class, "getStudentById"]);
Route::Get("/students", [StudentController::class, "getStudents"]);
Route::Get("/students/{section_id}", [StudentController::class, "getStudentsBySection"]);
Route::delete("/student/{id}", [StudentController::class, "deleteStudentById"]);
