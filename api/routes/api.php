<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ─── Technologies ────────────────────────────────────────────
Route::get('/technologies', [TechnologyController::class, 'index']);
Route::get('/technologies/{technology}', [TechnologyController::class, 'show']);
Route::post('/technologies', [TechnologyController::class, 'store']);
Route::put('/technologies/{technology}', [TechnologyController::class, 'update']);
Route::patch('/technologies/{technology}', [TechnologyController::class, 'update']);
Route::delete('/technologies/{technology}', [TechnologyController::class, 'destroy']);

// ─── Levels ──────────────────────────────────────────────────
Route::get('/levels', [LevelController::class, 'index']);
Route::get('/levels/{level}', [LevelController::class, 'show']);
Route::post('/levels', [LevelController::class, 'store']);
Route::put('/levels/{level}', [LevelController::class, 'update']);
Route::delete('/levels/{level}', [LevelController::class, 'destroy']);

// ─── Status ──────────────────────────────────────────────────
Route::get('/statuses', [StatusController::class, 'index']);
Route::get('/statuses/{status}', [StatusController::class, 'show']);
Route::post('/statuses', [StatusController::class, 'store']);
Route::put('/statuses/{status}', [StatusController::class, 'update']);
Route::delete('/statuses/{status}', [StatusController::class, 'destroy']);

// ─── Categories ──────────────────────────────────────────────
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

// ─── Admin ───────────────────────────────────────────────────
Route::post('/login',  [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn(Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);

      // Profil
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar']);
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar']);

    Route::apiResource('technologies', TechnologyController::class);
});


// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/admin/technologies',                    [TechnologyController::class, 'store']);
//     Route::put('/admin/technologies/{technology}',        [TechnologyController::class, 'update']);
//     Route::patch('/admin/technologies/{technology}/featured', [TechnologyController::class, 'featured']);
//     Route::delete('/admin/technologies/{technology}',     [TechnologyController::class, 'destroy']);
//
//     Route::post('/admin/categories',              [CategoryController::class, 'store']);
//     Route::put('/admin/categories/{category}',    [CategoryController::class, 'update']);
//     Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy']);
// });

// ─── Bonus ───────────────────────────────────────────────────
// Route::get('/technologies/featured',          [TechnologyController::class, 'featured']);
// Route::get('/technologies?search={q}',        [TechnologyController::class, 'index']);
// Route::get('/technologies?category={slug}',   [TechnologyController::class, 'index']);
// Route::get('/technologies?level={level}',     [TechnologyController::class, 'index']);
// Route::get('/stats',                          [StatsController::class, 'index']);

