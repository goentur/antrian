<?php

namespace App\Enums;

enum AntrianStatus: string
{
    case MENUNGGU = 'MENUNGGU';
    case DILAYANI = 'DILAYANI';
    case SELESAI = 'SELESAI';

    public function label(): string
    {
        return match ($this) {
            self::MENUNGGU => 'MENUNGGU',
            self::DILAYANI => 'DILAYANI',
            self::SELESAI => 'SELESAI',
        };
    }
    public function color(): string
    {
        return match ($this) {
            self::MENUNGGU => 'yellow', // atau warna hex seperti '#FFA500'
            self::DILAYANI => 'blue',   // atau '#0000FF'
            self::SELESAI  => 'green',  // atau '#008000'
        };
    }

    public static function toArray(): array
    {
        return array_map(fn($case) => [
            'label' => $case->label(),
            'value' => $case->value,
            'color' => $case->color(),
        ], self::cases());
    }
}
