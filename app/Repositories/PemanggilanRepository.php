<?php

namespace App\Repositories;

use App\Enums\AntrianStatus;
use App\Http\Resources\Pemanggilan\PemanggilanResource;
use App\Models\Antrian;
use Illuminate\Support\Facades\Auth;

class PemanggilanRepository
{
     public function __construct(protected Antrian $model) {}
     public function data(object $request)
     {
          $user = Auth::user();
          $loket = $user->loket()->first();
          $pelayananIds = $loket->pelayanan->pluck('id')->toArray();
          $query = $this->model::with('pelayanan')->whereDate('created_at', today())->whereIn('pelayanan_id', $pelayananIds)->whereIn('status', [AntrianStatus::MENUNGGU, AntrianStatus::DILAYANI])->orderBy('id');
          $result = PemanggilanResource::collection($query->latest()->paginate($request->perPage ?? 25))->response()->getData(true);
          return $result['meta'] + ['data' => $result['data']];
     }
}
