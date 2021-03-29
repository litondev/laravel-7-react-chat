<?php

namespace App\Http\Requests\User\Actions;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\RequestTrait;

class UserUpdateDataRequest extends FormRequest
{
    use RequestTrait;
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
       $validated = [
            'username' => 'required|unique:users,username,'.auth()->user()->id,
            'email' => 'required|email|unique:users,email,'.auth()->user()->id,          
            "password_confirm" => "required|min:8",
        ];

        if(request()->filled("password")){
            return array_merge($validated,[
                "password" => "min:8"
            ]);
        }

        return $validated;
    }
}
