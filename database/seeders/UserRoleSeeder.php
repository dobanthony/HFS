<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin user
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@gmail.com',
            'role' => 'admin',
            'password' => bcrypt('admin12345'),
        ]);

        // Create Agent user
        User::factory()->create([
            'first_name' => 'Agent',
            'last_name' => 'User',
            'email' => 'agent@gmail.com',
            'role' => 'agent',
            'password' => bcrypt('agent12345'),
        ]);
    }
}
