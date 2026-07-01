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
 * @property int|null $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */

#[Fillable(['nama', 'user_id'])]
class Loket extends Model
{
    use SoftDeletes;

    public function pelayanan(): BelongsToMany
    {
        return $this->belongsToMany(Pelayanan::class, PelayananLoket::class);
    }
}
