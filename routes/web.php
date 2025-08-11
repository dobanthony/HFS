<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Agent\PropertyController as AgentPropertyController;
use App\Http\Controllers\User\PropertyController as UserPropertyController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\ProfileController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard (Role-based redirection)
    Route::get('/dashboard', [UserRoleController::class, 'redirectToDashboard'])
        ->name('dashboard');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('agent')->name('agent.')->group(function () {
        Route::resource('properties', AgentPropertyController::class);
    });

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('properties', [UserPropertyController::class, 'index'])->name('properties.index');
        Route::get('properties/{property}', [UserPropertyController::class, 'show'])->name('properties.show');
        Route::post('properties/{property}/purchase', [UserPropertyController::class, 'purchase'])->name('properties.purchase');
    });
});

require __DIR__ . '/auth.php';
