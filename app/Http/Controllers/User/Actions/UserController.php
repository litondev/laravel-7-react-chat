<?php

namespace App\Http\Controllers\User\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager as Image;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\User\Actions\{
  UserUpdateDataRequest,
  UserUpdatePhotoRequest
};
use App\Models\User;
use DB;

class UserController extends Controller
{    
  
  	public function __construct(){
  		$this->middleware("isUser")->only("update","show");
  	}
  	
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {    	    	
        return response()->json(auth()->check() ? new UserResource(auth()->user()) : Null);
    }

    public function update(UserUpdateDataRequest $request,User $user){
    	try{
    		DB::beginTransaction();

 			    if(!\Hash::check($request->password_confirm,$user->password)){
        		throw new \ErrorException("Password tidak sama");
        	}    	
		
			   $payload = (array) $request->validated();

        	if($request->filled('password')){
        		$payload['password'] = \Hash::make($payload['password']);
        	}

    		$user->update($payload);

    		DB::commit();

    		return response()->json([
    			"message" => "Success",
    			"user" => new UserResource($user)
    		],201);
    	}catch(\Throwable $th){
    		DB::rollback();

    		return response()->json([
    			"message" => "Failed",
    			"error" => $th->getMessage()
    		],422);
    	}
    }

    public function uploadPhoto(){ 
        $image = request()->file('photo');              

        $extension = $image->getClientOriginalExtension();

        $fileName = Str::random("20").'.' . $extension;

        $filePath = public_path() . "/assets/images/users/";
        
        $theImage = new Image();

        $imageChange = $theImage->make($image)->resize(null, 650, function($constraint){
            $constraint->aspectRatio();
        });

        $imageChange->save($filePath."".$fileName);

        return $fileName;
    }

    public function updatePhoto(UserUpdatePhotoRequest $request,User $user){
      try{
        DB::beginTransaction();
            
        $oldPhoto = $user->photo;

        $fileName = $this->uploadPhoto();

        $user->update([
          "photo" => $fileName
        ]);

        if($oldPhoto != "default.png"){             
          if(file_exists(public_path() . "/assets/images/users/"."".$oldPhoto)){
            unlink(public_path() . "/assets/images/users/"."".$oldPhoto);
          }
        }

        DB::commit();

        return response()->json([
          "message" => "Success",
          "user" => new UserResource($user)
        ],201);
      }catch(\Throwable $th){
        DB::rollback();

        return response()->json([
          "message" => "Failed",
          "error" => $th->getMessage()
        ],422);
      }
    }

    public function show($user){
      $user = User::where('username',$user)->whereNotIn('id',[auth()->user()->id])->first();
      return response()->json($user ? new UserResource($user) : Null);
    }
}
