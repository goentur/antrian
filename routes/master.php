<?php

use App\Http\Controllers\PelayananController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('permission', PermissionController::class)->middleware('can:permission-index');
    Route::resource('role', RoleController::class)->middleware('can:role-index');
    Route::resource('user', UserController::class)->middleware('can:user-index');
    Route::resource('pelayanan', PelayananController::class)->middleware('can:pelayanan-index');
    Route::resource('loket', PelayananController::class)->middleware('can:loket-index');
});
