<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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
Route::Post('/Section',[SectionController::class,'addSection']);
Route::Get('/Section/{id}',[SectionController::class,'getSection']);
Route::Patch('/Section/{id}',[SectionController::class,'editSection']);
Route::delete('/Section/{id}',[SectionController::class,'deleteSection']);
Route::Get('/Section',[SectionController::class,'getAllSection']);

