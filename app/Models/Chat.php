<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Chat extends Model
{
    use ModelTrait;

    protected $guarded = ["id"];

    protected $appends = [    
        "get_human_created_at",
        "get_human_updated_at"
    ];
}
