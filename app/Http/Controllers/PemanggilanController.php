<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatus;
use App\Events\PanggilAntrian;
use App\Http\Requests\Common\DataRequest;
use App\Models\Antrian;
use App\Repositories\PemanggilanRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemanggilanController extends Controller
{
    public function __construct(protected PemanggilanRepository $repository)
    {
        $this->repository = $repository;
    }

    function index()
    {
        return Inertia::render('pemanggilan/index');
    }

    function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }

    public function panggilBerikutnya(Request $request)
    {
        $nomorAntrian = "A-005";
        $nomorLoket = 1;

        // Hapus ->toOthers() agar TV Monitor PASTI menerima event ini
        broadcast(new PanggilAntrian($nomorAntrian, $nomorLoket));

        // Gunakan HTTP status 200 (OK) agar Axios membaca JSON dengan mulus
        return response()->json([
            'success' => true,
            'nomorAntrian' => $nomorAntrian,
            'nomorLoket' => $nomorLoket
        ], 200);
    }
}
