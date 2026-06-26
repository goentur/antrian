<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar; // PENTING: Untuk reset cache

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. CLEAR CACHE SPATIE (Wajib ditaruh paling atas)
        // Ini memastikan Spatie langsung membaca permission baru yang dibuat di bawah
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 2. DAFTAR PERMISSION (Dibuat array agar kode rapi dan mudah dirawat)
        $permissions = [
            'dashboard',
            // role
            'role-index',
            'role-create',
            'role-update',
            'role-delete',
            // permission
            'permission-index',
            'permission-create',
            'permission-update',
            'permission-delete',
            // loket
            'loket-index',
            'loket-create',
            'loket-update',
            'loket-delete',
            // pelayanan
            'pelayanan-index',
            'pelayanan-create',
            'pelayanan-update',
            'pelayanan-delete',
            // fitur aplikasi antrian
            'pemanggilan',
            'laporan'
        ];

        // 3. GENERATE PERMISSION
        // Menggunakan firstOrCreate agar jika data sudah ada, tidak memicu error duplicate
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'web'
            ]);
        }

        // 4. GENERATE ROLE
        $superAdmin = Role::firstOrCreate([
            'name' => 'SUPER-ADMIN',
            'guard_name' => 'web'
        ]);

        // 5. ASSIGN PERMISSIONS TO ROLE
        // Menggunakan syncPermissions() jauh lebih aman daripada givePermissionTo() saat seeding
        // karena otomatis menyinkronkan data tanpa peduli apakah relasi sudah ada atau belum
        $superAdmin->syncPermissions($permissions);

        // 6. GENERATE USER SUPER ADMIN
        // Menggunakan updateOrCreate dengan patokan 'email' agar tidak error saat di-seed ulang
        $userSuperAdmin = User::updateOrCreate(
            ['email' => 'sa@mail.com'], // Pencari data unik
            [
                'name' => 'Super Admin',
                'password' => bcrypt('sa'), // Di Laravel 13 disarankan pakai Hash::make('sa') namun bcrypt tetap aman
                'email_verified_at' => now(),
            ]
        );

        // 7. ASSIGN ROLE TO USER
        // Menggunakan syncRoles() untuk mencegah error duplikasi jika user sudah memiliki role tersebut
        $userSuperAdmin->syncRoles($superAdmin);
    }
}
