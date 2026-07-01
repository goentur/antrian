<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $nama
 * @property string|null $prefix
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */

#[Fillable(['nama', 'keterangan', 'prefix', 'icon'])]
class Pelayanan extends Model
{
    use SoftDeletes;

    public function lokets(): BelongsToMany
    {
        return $this->belongsToMany(Loket::class, PelayananLoket::class);
    }
}
