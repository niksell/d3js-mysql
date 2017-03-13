<?php

namespace App\Http\Controllers;

use App\CountryInfo;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class countryController extends Controller
{
  public function getCountrys()
  {
      try {
          $data['status'] = 1;
          $country = CountryInfo::get();
          $data['data'] = $country;
      }
      catch(\Illuminate\Database\QueryException $e)
      {
          $data['status'] = 0;
          $data['message'] = 'Error: An error occurred. Please try again.';
      }
      return response()->json($data);
  }
}
