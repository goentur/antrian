<?php

use App\Http\Controllers\PemanggilanController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('pemanggilan')->name('pemanggilan.')->controller(PemanggilanController::class)->group(function () {
    Route::get('', 'index')->name('index');
    Route::post('', 'data')->name('data');
    Route::post('panggil-berikutnya', 'panggilBerikutnya')->name('panggil-berikutnya');
});
