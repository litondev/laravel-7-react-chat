<?php

namespace App\Http\Controllers\User\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\Actions\{
	SignupRequest,
	SigninRequest
};
use App\Http\Resources\User\UserResource;
use App\Models\User;

class AuthController extends Controller
{
	public function signup(SignupRequest $request){
		if(User::create($request->validated())){
			return response()->json([
				"message" => "Success"
			],201);
		}

		return response()->json([
			"message" => "Failed",
			"error" => "Terjadi Kesalahan"
		],422);
	}

    public function signin(SigninRequest $request){		
		if(auth()->attempt($request->validated())){
			return response()->json(new UserResource(auth()->user()),201);
		}    	

		return response()->json([
			"message" => "Failed",
			"error" => "Data tidak ditemukan"
		],422);
    }

    public function logout(){
    	auth()->logout();
    	
    	return response()->json([
    		"message" => "Success"
    	],201);
    }
}
