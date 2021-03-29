<?php

namespace App\Http\Controllers\User\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{
    Channel,
    User
};
use DB;
use App\Http\Resources\User\{
    ChannelResource,
    ChannelResourceCollection
};

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $channel = Channel::with('sender','accepeter','last_message');                 

        if(!empty(request()->search)){
            $channel = $channel->orWhereHas('accepeter',function($q){
                return $q->where('username',request()->search);
            })
            ->where('sender_id',auth()->user()->id)
            ->orWhereHas('sender',function($q){
                return $q->where('username',request()->search);            
            })
            ->where('accepeter_id',auth()->user()->id);    
        }else{
            $channel = $channel->where(function($q){
                return $q->orWhere('sender_id',auth()->user()->id)
                    ->orWhere('accepeter_id',auth()->user()->id);
            });
        }

        $channel = $channel->orderBy('time','desc')
                ->paginate(10);

        return response()->json(new ChannelResourceCollection($channel));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            DB::beginTransaction();

            if(intval($request->id) < 1 || !User::where('id',$request->id)->first()){
                throw new \ErrorException("Terjadi Kesalahan");
            }

            $channel = Channel::where('sender_id',$request->id)->where('accepeter_id',auth()->user()->id)->first();
            if($channel){
                $channel->update([
                    "time" => now()
                ]);

                event(new \App\Events\User\NewChannelEvent($channel,$channel->sender_id));
                event(new \App\Events\User\NewChannelEvent($channel,$channel->accepeter_id));
                
                DB::commit();
                return response()->json([
                    "message" => "Success"
                ],201); 
            }

            $channel = Channel::where('sender_id',auth()->user()->id)->where('accepeter_id',$request->id)->first();
            if($channel){
                $channel->update([
                    "time" => now()
                ]);

                event(new \App\Events\User\NewChannelEvent($channel,$channel->sender_id));
                event(new \App\Events\User\NewChannelEvent($channel,$channel->accepeter_id));

                DB::commit();
                return response()->json([
                    "message" => "Success"
                ],201);
            }

            // Using firstOrUpdate maybe more short
            $channel = Channel::create([
                'sender_id' => auth()->user()->id,
                'accepeter_id' => $request->id,
                'time' => now()
            ]);

            event(new \App\Events\User\NewChannelEvent($channel,$channel->sender_id));
            event(new \App\Events\User\NewChannelEvent($channel,$channel->accepeter_id));

            DB::commit();

            return response()->json([
                "message" => "Success"
            ],201);            
        }catch(\Throwable $th){        
            \Log::info($th->getMessage());
            
            DB::rollback();

            return response()->json([
                "message" => "Failed",
                "error" => "Terjadi Kesalahan"
            ],500);
        }
    }    
}
