<?php

use Illuminate\Database\Seeder;
use App\Models\{
	User,
	Setting,
  Channel
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      User::create([
      	"username" => "admin",
      	"email" => "admin@admin.com",
      	"password" => \Hash::make("12345678"),      	
      	"photo" => "default.png",
      	"role" => "admin"
      ]);  

       User::create([
      	"username" => "user",
      	"email" => "user@user.com",
      	"password" => \Hash::make("12345678"),      	
      	"photo" => "default.png",
      	"role" => "user"
       ]);   

       for($i=0;$i<100;$i++){
       	    User::create([
		      	"username" => "user".$i,
		      	"email" => "user".$i."@user.com",
		      	"password" => \Hash::make("12345678"),		      
		      	"photo" => "default.png",
		      	"role" => "user"
       		]);   
       }

       Setting::create([
        "name" => "site_name",
        "value" => "simpus"
       ]);

       for($i=1;$i<99;$i++){
          Channel::create([
              "sender_id" => 2,
              "accepeter_id" => $i,
              "time" => now()->addSeconds($i+10)
          ]); 
        }
    }
}
