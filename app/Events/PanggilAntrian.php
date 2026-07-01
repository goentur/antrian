<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast; // CRITICAL: Wajib ada!
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PanggilAntrian implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // Properti harus PUBLIC agar bisa terbaca di React Frontend
    public $nomorAntrian;
    public $nomorLoket;

    public function __construct($nomorAntrian, $nomorLoket)
    {
        $this->nomorAntrian = $nomorAntrian;
        $this->nomorLoket = $nomorLoket;
    }

    public function broadcastOn(): array
    {
        // Pastikan nama channel di sini sama persis dengan yang di React
        return [
            new Channel('jalur-antrian'),
        ];
    }
}
