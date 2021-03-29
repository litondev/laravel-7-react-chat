<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Channel extends Model
{
    use ModelTrait;

    protected $guarded = ["id"];

    protected $appends = [    
        "get_human_created_at",
        "get_human_updated_at"
    ];

    public function sender(){
    	return $this->hasOne(User::class,'id','sender_id');
    }

    public function accepeter(){
    	return $this->hasOne(User::class,'id','accepeter_id');
    }

    public function last_message(){
        return $this->hasOne(Chat::class,'channel_id','id')->where('status','active')->orderBy('id','desc');
    }

    public function chats(){
        return $this->hasMany(Chat::class,'channel_id','id');
    }
}
