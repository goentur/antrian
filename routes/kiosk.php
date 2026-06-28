<?php

use App\Http\Controllers\KioskController;
use Illuminate\Support\Facades\Route;

Route::get('ambil-nomor-antrian', [KioskController::class, 'ambilNomorAntrian'])->name('ambil-nomor-antrian');
Route::post('simpan-nomor-antrian', [KioskController::class, 'simpanNomorAntrian'])->name('simpan-nomor-antrian');
