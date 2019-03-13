<?php

namespace App\Http\Controllers;
use App\Definitions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class definitionController extends Controller
{
  public function getDefinitions()
  {
      try {
          $data['status'] = 1;
          $definitions = Definitions::get();
          $data['data'] = $definitions;
      }
      catch(\Illuminate\Database\QueryException $e)
      {
          $data['status'] = 0;
          $data['message'] = 'Error: An error occurred. Please try again.';
      }
      return response()->json($data);
  }
}
