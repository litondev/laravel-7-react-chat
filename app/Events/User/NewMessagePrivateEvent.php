<?php

namespace App\Events\User;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NewMessagePrivateEvent implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('new-message-private-'.$this->message->channel_id);
    }

    public function broadcastAs()
    {
        return 'NewMessagePrivate'.$this->message->channel_id;
    }

    public function broadcastWith()
    {
        return [
            "message" => [$this->message]
        ];
    }
}
