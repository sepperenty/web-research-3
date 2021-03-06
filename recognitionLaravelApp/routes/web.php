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



Route::get('/', "PublicController@index");

Route::post('/store', 'PublicController@storePicture');

Route::get('/test', 'PublicController@pythonTest');

Route::post('/newName', 'PublicController@newName');

Route::post('/comparePictureOpenCv', 'PublicController@comparePictureOpenCv');

Route::get('/randomCharacters', 'PublicController@randomCharacters');
