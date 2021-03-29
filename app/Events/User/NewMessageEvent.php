<?php

namespace App\Events\User;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NewMessageEvent implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $message;
    public $channel;
    public $user;

    public function __construct($channel,$message,$user)
    {
        $this->channel = $channel;
        $this->message = $message;
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('new-message-'.$this->user);
    }

    public function broadcastAs()
    {
        return 'NewMessage'.$this->user;
    }

    public function broadcastWith()
    {
        return [
            "message" => $this->message,
            "channel" => $this->channel
        ];
    }
}
