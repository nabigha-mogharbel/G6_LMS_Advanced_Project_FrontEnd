<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SectionController;

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

Route::Post("/students", [StudentController::class, "addStudent"]);
Route::Get("/students/{id}", [StudentController::class, "getStudentById"]);
Route::Get("/students", [StudentController::class, "getStudents"]);
Route::Get("/students/{section_id}", [StudentController::class, "getStudentsBySection"]);
Route::delete("/students/{id}", [StudentController::class, "deleteStudentById"]);
Route::Patch("/students/update/{id}", [StudentController::class, "updateStudent"]);
Route::Post('/sections',[SectionController::class,'addSection']);
Route::Get('/sections',[SectionController::class,'getAllSection']);
Route::Get('/sections/{id}',[SectionController::class,'getSection']);
Route::Patch('/sections/{id}',[SectionController::class,'editSection']);
Route::delete('/sections/{id}',[SectionController::class,'deleteSection']);


