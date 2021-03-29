<?php

namespace App\Http\Controllers\User\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{
    Chat,
    Channel
};
use App\Http\Resources\User\{
    ChatResource,
    ChatResourceCollection
};
use App\Http\Requests\User\Actions\ChatRequest;
use DB;

class ChatController extends Controller
{    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChatRequest $request)
    {
        try{
            DB::beginTransaction();

            $channel = Channel::findOrFail($request->channel_id);

            if(!in_array(auth()->user()->id,[$channel->sender_id,$channel->accepeter_id])){
                throw new \ErrorException("Terjadi Kesalahan");
            }

            $message = $channel->chats()->create([
                "sender" => auth()->user()->id == $channel->sender_id ? 'sender' : 'accepeter',
                "message" => $request->message,
                "type" => "text",
                "status" => "active"
            ]);

            $channel->update([
                "time" => now()
            ]);
        
            event(new \App\Events\User\NewMessageEvent($channel,$message,$channel->sender_id));
            event(new \App\Events\User\NewMessageEvent($channel,$message,$channel->accepeter_id));
            event(new \App\Events\User\NewMessagePrivateEvent($message));

            DB::commit();
            
            return response()->json([
                "message" => "Success"
            ],201);
        }catch(\Throwable $th){
            DB::rollback();

            return response()->json([
                "message" => "Failed",
                "error" => "Terjadi Kesalahan"
            ],500);
        }
    }  

    public function getByChannel(Channel $channel){
        if(!in_array(auth()->user()->id,[$channel->sender_id,$channel->accepeter_id])){
            return response()->json([
                "message" => "Failed",
                "error" => "Terjadi Kesalahan"
            ],500);
        }

        $chats = Chat::where('channel_id',$channel->id)
            ->where('status','active')
            ->orderBy('id','desc')
            ->paginate(10);

        return response()->json(new ChatResourceCollection($chats));
    }
}
