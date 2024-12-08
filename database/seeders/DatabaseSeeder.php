<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create(['name' => 'ADMIN']);
        Role::create(['name' => 'PEGAWAI']);

        $userDeveloper = User::factory()->create([
            'email' => 'admin@mail.com',
            'name' => 'Admin',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole('ADMIN');
    }
}
