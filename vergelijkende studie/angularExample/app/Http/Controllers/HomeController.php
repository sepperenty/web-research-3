<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Card;

class HomeController extends Controller
{
    public function index()
    {	

    	return view('welcomeVue');
    }

    public function angularIndex()
    {
    	return view('welcomeAngular');
    }
}
