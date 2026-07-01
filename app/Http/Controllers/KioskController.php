<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Kiosk\SimpanNomorAntrianRequest;
use App\Models\Antrian;
use App\Models\Pelayanan;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class KioskController extends Controller
{
    function ambilNomorAntrian()
    {
        $pelayanan = Pelayanan::get();
        return Inertia::render('kiosk/ambil-nomor-antrian', compact('pelayanan'));
    }

    function simpanNomorAntrian(SimpanNomorAntrianRequest $request): JsonResponse
    {
        $pelayanan = Pelayanan::findOrFail($request->id);

        $jumlahAntrianHariIni = Antrian::where('pelayanan_id', $pelayanan->id)
            ->whereDate('created_at', today())
            ->count();

        $nomorUrut = $jumlahAntrianHariIni + 1;
        $nomorAntrianLengkap = $pelayanan->prefix . '-' . str_pad($nomorUrut, 3, '0', STR_PAD_LEFT); // Hasil: A-005

        $antrian = Antrian::create([
            'pelayanan_id' => $pelayanan->id,
            'nama' => $nomorAntrianLengkap,
            'status' => AntrianStatus::MENUNGGU,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Antrean berhasil dibuat!',
            'tiket' => [
                'nomor' => $antrian->nomor_antrian,
                'layanan' => $pelayanan->name,
                'waktu' => $antrian->created_at->format('H:i:s'),
                'tanggal' => $antrian->created_at->format('d-m-Y'),
            ]
        ], 201);
    }

    function monitorNomorAntrian()
    {
        return Inertia::render('kiosk/monitor-nomor-antrian');
    }
}
