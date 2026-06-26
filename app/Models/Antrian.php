<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $nama
 * @property int|null $nomor
 * @property int|null $layanan_id
 * @property int|null $loket_id
 * @property int|null $user_id
 * @property string|null $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */

#[Fillable(['nama', 'nomor', 'layanan_id', 'loket_id', 'user_id', 'status'])]
class Antrian extends Model {}
