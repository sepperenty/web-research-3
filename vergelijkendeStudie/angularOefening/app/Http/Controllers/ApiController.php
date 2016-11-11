<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Card;

class ApiController extends Controller
{
   	public function cards()
   	{
   		$cards = Card::get();
   		return $cards;
   	}

   	public function show(Card $card)
   	{
   		return $card;
   	}

   	public function update(Card $card, Request $request)
   	{
        	$oldCard = $card;
   		$oldCard->update([
   				'title' => $request->title,
   				'body' => $request->body,
   			]);
   	}
}



