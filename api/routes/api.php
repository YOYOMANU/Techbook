<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ─── Auth publique ───────────────────────────────────────────
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ─── Routes publiques (lecture seule) ────────────────────────
Route::get('/levels',              [LevelController::class, 'index']);
Route::get('/levels/{level}',      [LevelController::class, 'show']);
Route::get('/statuses',            [StatusController::class, 'index']);
Route::get('/statuses/{status}',   [StatusController::class, 'show']);
Route::get('/categories',          [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

// ─── Routes protégées ────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', fn(Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profil
    Route::put('/profile',           [ProfileController::class, 'update']);
    Route::put('/profile/password',  [ProfileController::class, 'updatePassword']);
    Route::delete('/profile',        [ProfileController::class, 'destroy']);
    Route::post('/profile/avatar',   [ProfileController::class, 'updateAvatar']);
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar']);

    // Technologies (CRUD complet protégé)
    Route::apiResource('technologies', TechnologyController::class);

    // Levels / Statuses / Categories (écriture protégée)
    Route::post('/levels',             [LevelController::class, 'store']);
    Route::put('/levels/{level}',      [LevelController::class, 'update']);
    Route::delete('/levels/{level}',   [LevelController::class, 'destroy']);

    Route::post('/statuses',           [StatusController::class, 'store']);
    Route::put('/statuses/{status}',   [StatusController::class, 'update']);
    Route::delete('/statuses/{status}',[StatusController::class, 'destroy']);

    Route::post('/categories',             [CategoryController::class, 'store']);
    Route::put('/categories/{category}',   [CategoryController::class, 'update']);
    Route::delete('/categories/{category}',[CategoryController::class, 'destroy']);
});