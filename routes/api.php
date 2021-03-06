<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaDed by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('definition', 'definitionController@getDefinitions');
Route::get('years', 'yearController@getYears');
Route::get('countrys', 'countryController@getCountrys');
Route::post('years', 'yearController@getValues');
Route::post('avg5YRS', 'yearController@getAvgValues5YRS');
Route::post('avg10YRS', 'yearController@getAvgValues10YRS');
Route::post('singleYears', 'yearController@getSingleYears');
