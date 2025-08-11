<?php

use App\Http\Controllers\Agent\PropertyController;
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

Route::resource('properties', PropertyController::class);

Route::get('/agent/property', [PropertyController::class, 'index'])->name('agent.property');


Route::prefix('user')->name('user.')->group(function () {
    Route::get('/properties', [\App\Http\Controllers\User\PropertyController::class, 'index'])->name('properties.index');
    Route::get('/properties/{property}', [\App\Http\Controllers\User\PropertyController::class, 'show'])->name('properties.show');
});


require __DIR__.'/auth.php';
