<?php

namespace App\Events\User;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NewChannelEvent implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $channel;
    public $user;

    public function __construct($channel,$user)
    {
        $this->channel = $channel;
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('new-channel-'.$this->user);
    }

    public function broadcastAs()
    {
        return 'NewChannel'.$this->user;
    }

    public function broadcastWith()
    {
        return [
            "channel" => $this->channel
        ];
    }
}
