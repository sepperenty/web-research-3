<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', "HomeController@index");

Route::get('/api/cards', "ApiController@cards");

Route::get('/api/cards/{card}', "ApiController@show");

Route::post('/api/cards/{card}/update', "ApiController@update");