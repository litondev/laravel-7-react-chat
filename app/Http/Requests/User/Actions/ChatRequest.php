<?php

namespace App\Http\Requests\User\Actions;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\RequestTrait;

class ChatRequest extends FormRequest
{
    use RequestTrait;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "channel_id" => "required|integer",
            "message" => "required"
        ];
    }
}
