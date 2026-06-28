<?php

namespace App\Enums;

enum AntrianStatus: string
{
    case MENUGGU = 'MENUGGU';
    case DILAYANI = 'DILAYANI';
    case SELESAI = 'SELESAI';

    public function label(): string
    {
        return match ($this) {
            self::MENUGGU => 'MENUGGU',
            self::DILAYANI => 'DILAYANI',
            self::SELESAI => 'SELESAI',
        };
    }
    public static function toArray(): array
    {
        return array_map(fn($case) => [
            'label' => $case->value,
            'value' => $case->value,
        ], self::cases());
    }
}
