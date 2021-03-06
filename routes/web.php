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

Route::get('/', ['as' => 'home', function () {
    return view('index');
}]);
Route::get('/import_definitions','ImportController@importDefinitions');
Route::get('/import_countrys','ImportController@importCountrys');
Route::get('/import_years','ImportController@importyears');
