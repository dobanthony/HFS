<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Role-based dashboard
    Route::get('/dashboard', [UserRoleController::class, 'redirectToDashboard'])->name('dashboard');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    // Agent routes to manage their properties
    Route::get('/agent/properties', [PropertyController::class, 'agentIndex'])->name('agent.properties.index');
    Route::get('/agent/properties/create', [PropertyController::class, 'create'])->name('agent.properties.create');
    Route::post('/agent/properties', [PropertyController::class, 'store'])->name('agent.properties.store');
});

// Public routes for buyers to view properties
Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/{property}', [PropertyController::class, 'show'])->name('properties.show');


require __DIR__.'/auth.php';
