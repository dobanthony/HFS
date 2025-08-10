<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    public function redirectToDashboard()
    {
        $user = Auth::user();

        if (!$user || !$user->role) {
            abort(403, 'Unauthorized - No valid role assigned');
        }

        if ($user->role === 'admin') {
            return Inertia::render('Admin/Dashboard', [
                'user' => $user,
            ]);
        }

        if ($user->role === 'agent') {
            return Inertia::render('Agent/Dashboard', [
                'user' => $user,
            ]);
        }

        if ($user->role === 'user') {
            return Inertia::render('User/Dashboard', [
                'user' => $user,
            ]);
        }

        abort(403, 'Unauthorized - Invalid role');
    }
}
