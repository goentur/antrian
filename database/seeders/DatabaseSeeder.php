<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Permission::create(['name' => 'dashboard']);
        // role
        Permission::create(['name' => 'role-index']);
        Permission::create(['name' => 'role-create']);
        Permission::create(['name' => 'role-update']);
        Permission::create(['name' => 'role-delete']);
        // permission
        Permission::create(['name' => 'permission-index']);
        Permission::create(['name' => 'permission-create']);
        Permission::create(['name' => 'permission-update']);
        Permission::create(['name' => 'permission-delete']);
        $superAdmin = Role::create(['name' => 'SUPER-ADMIN']);
        $superAdmin->givePermissionTo([
            'dashboard',
            'role-index',
            'role-create',
            'role-update',
            'role-delete',
            'permission-index',
            'permission-create',
            'permission-update',
            'permission-delete',
        ]);
        $userSuperAdmin = User::factory()->create([
            'email' => 'sa@mail.com',
            'name' => 'Super Admin',
            'password' => bcrypt('sa')
        ]);
        $userSuperAdmin->assignRole($superAdmin);
    }
}
