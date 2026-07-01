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

    public function __construct(
        public string $nomorAntrian,
        public int $nomorLoket
    ) {
        $this->nomorAntrian = $nomorAntrian;
        $this->nomorLoket = $nomorLoket;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('jalur-antrian'),
        ];
    }
}
