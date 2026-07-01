<?php

namespace App\Http\Resources\Pemanggilan;

use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PemanggilanResource extends JsonResource
{
     /**
      * Transform the resource into an array.
      *
      * @return array<string, mixed>
      */
     public function toArray(Request $request): array
     {
          return [
               'id' => $this->id,
               'pelayanan' => $this->when(!blank($this->pelayanan), function () {
                    return Memo::forDay('pelayanan-' . $this->pelayanan_id, function () {
                         return [
                              'id' => $this->pelayanan_id,
                              'nama' => $this->pelayanan->nama,
                         ];
                    });
               }),
               'nama' => $this->nama,
               'status' => [
                    'value' => $this->status->value,
                    'label' => $this->status->label(),
                    'color' => $this->status->color(),
               ],
          ];
     }
}
