<?php

namespace App\Repositories;

use App\Enums\AntrianStatus;
use App\Http\Resources\Pemanggilan\PemanggilanResource;
use App\Models\Antrian;

class PemanggilanRepository
{
     public function __construct(protected Antrian $model) {}
     public function data(object $request)
     {
          $query = $this->model::with('pelayanan')->whereDate('created_at', today())->whereIn('status', [AntrianStatus::MENUNGGU, AntrianStatus::DILAYANI])->orderBy('created_at');
          $result = PemanggilanResource::collection($query->latest()->paginate($request->perPage ?? 25))->response()->getData(true);
          return $result['meta'] + ['data' => $result['data']];
     }
}
