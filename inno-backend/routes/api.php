<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

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

// Public routes
// Users
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Articles
Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles/search', [ArticleController::class, 'search']);
Route::get('/articles/filter-options', [ArticleController::class, 'getFilterOptions']);



// Private routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    //Users
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'index']);
    Route::put('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);
    Route::put('/user/preferences', [UserController::class, 'updatePreferences']);

    // Articles
    Route::get('/articles/personalized', [ArticleController::class, 'personalize']);
});
