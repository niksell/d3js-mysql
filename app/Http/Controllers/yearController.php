<?php

namespace App\Http\Controllers;

use App\YearsValues;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class yearController extends Controller
{
  public function getValues(Request $request)
  {
    try {
        $data['status'] = 1;
        $values = YearsValues::select('years','value','5YRS','10YRS')->where('source_id', $request->input('definitionId'))->where('country_id',$request->input('countryId'))->get();
        $data['data'] = $values;
    }
    catch(\Illuminate\Database\QueryException $e)
    {
        $data['status'] = 0;
        $data['message'] = 'Error: An error occurred. Please try again.';
    }
    return response()->json($data);
    //return ($request->input('countryId'));
  }
  public function getYears()
  {
      try {
          $data['status'] = 1;
          $years = YearsValues::select('years')->groupBy('years')->get()->toArray() ;

          $data1['years'] = $years;
          $fiveYrs = YearsValues::select('5YRS')->groupBy('5YRS')->get()->toArray() ;
          $data1['5yrs']=$fiveYrs;
          $tenYrs = YearsValues::select('10YRS')->groupBy('10YRS')->get()->toArray() ;
          $data1['10yrs']=$tenYrs;
          $data['data']=$data1;
      }
      catch(\Illuminate\Database\QueryException $e)
      {
          $data['status'] = 0;
          $data['message'] = 'Error: An error occurred. Please try again.';
      }
      return response()->json($data);
  }
}
