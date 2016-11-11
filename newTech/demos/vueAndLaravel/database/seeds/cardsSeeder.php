<?php

use Illuminate\Database\Seeder;
use app\Card;

class cardsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	 
    	for ($i=0; $i < 100; $i++) { 
    		


    		 $newCard = new Card;
    		 $newCard->body =  str_random(30);
    		 $newCard->save();
    	}
         
    }
}
