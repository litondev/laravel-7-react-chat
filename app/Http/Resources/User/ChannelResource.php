<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class ChannelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            "id" => $this->id,        
            "last_message" => Null,
            "username" => auth()->user()->id === $this->sender->id ? $this->accepeter->username : $this->sender->username,
            "photo" => auth()->user()->id === $this->sender->id ? $this->accepeter->photo : $this->sender->photo,
            'sender_id' => $this->sender_id,
            'accepeter_id' => $this->accepeter_id
        ];    
    
        if(isset($this->last_message)){
            $data = array_merge($data,[
                "last_message" => $this->last_message->message,
            ]);
        }

        return $data;
    }
}
