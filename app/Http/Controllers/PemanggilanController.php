<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatus;
use App\Events\AntrianUpdated;
use App\Events\PanggilAntrian;
use App\Http\Requests\Common\DataRequest;
use App\Models\Antrian;
use App\Repositories\PemanggilanRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PemanggilanController extends Controller
{
    public function __construct(protected PemanggilanRepository $repository)
    {
        $this->repository = $repository;
    }

    function index()
    {
        $user = Auth::user();
        $loket = $user->loket()->first();
        $pelayananIds = $loket->pelayanan->pluck('id')->toArray();
        return Inertia::render('pemanggilan/index', compact('pelayananIds'));
    }

    function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }

    public function panggilBerikutnya(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $loket = $user->loket()->first();

            if (!$loket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak terikat dengan loket manapun.'
                ], 400);
            }
            $antrian = Antrian::whereDate('created_at', today())
                ->whereIn('pelayanan_id', $request->pelayanan)
                ->where('status', AntrianStatus::MENUNGGU)
                ->orderBy('id')
                ->lockForUpdate()
                ->first();
            if (!$antrian) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Antrean sudah habis!'
                ], 404);
            }
            $antrian->update([
                'status' => AntrianStatus::DILAYANI,
                'loket_id' => $loket->id,
                'user_id' => $user->id
            ]);
            $nomorAntrian = $antrian->nama;
            $nomorLoket = $loket->nama;

            DB::commit();

            broadcast(new AntrianUpdated($antrian))->toOthers();
            broadcast(new PanggilAntrian($nomorAntrian, $nomorLoket))->toOthers();

            return response()->json([
                'success' => true,
                'nomor' => $nomorAntrian,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server.',
                'error' => config('app.debug') ? $e->getMessage() : null // Tampilkan detail error hanya di mode debug
            ], 500);
        }
    }
}
