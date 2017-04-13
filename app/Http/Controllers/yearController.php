<?php

namespace App\Http\Controllers;

use App\YearsValues;
use DB;
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

  public function getAvgValues5YRS(Request $request)
  {

    try {
        $data['status'] = 1;
      /*  for ($i=0; $i <sizeof($request->input('countryId')) ; $i++) {
          $values[$i] = YearsValues::select('5YRS',DB::raw('avg(value) as avg_value'))->where('source_id', $request->input('definitionId'))
          ->where('country_id',$request->input('countryId')[$i])->groupBy('5YRS')->get()->toArray();


        }
        $data['data'] = $values;*/
        if(sizeof($request->input('countryId'))>=1){
          for ($i=0; $i <sizeof($request->input('countryId')) ; $i++) {
            $values[$i] = YearsValues::select('5YRS',DB::raw('avg(value) as avg_value'))->where('source_id', $request->input('definitionId'))
            ->where('country_id',$request->input('countryId')[$i])->groupBy('5YRS')->get()->toArray();
            $temp=$request->input('countryId')[$i];
            array_push($values[$i], $temp);

          }
          $data['data'] = $values;
        }elseif (sizeof($request->input('definitionId'))>1) {
          for ($i=0; $i <sizeof($request->input('definitionId')) ; $i++) {
            $values[$i] = YearsValues::select('5YRS',DB::raw('avg(value) as avg_value'))->where('source_id', $request->input('definitionId')[$i])
            ->where('country_id',$request->input('countryId'))->groupBy('5YRS')->get()->toArray();


          }
          $data['data'] = $values;
        }

    }
    catch(\Illuminate\Database\QueryException $e)
    {
        $data['status'] = 0;
        $data['message'] = 'Error: An error occurred. Please try again.';
    }
    return response()->json($data);
    //return ($request->input('countryId'));
  }

  public function getAvgValues10YRS(Request $request)
  {

    try {
        $data['status'] = 1;
        /*for ($i=0; $i <sizeof($request->input('countryId')) ; $i++) {
          $values[$i] = YearsValues::select('10YRS',DB::raw('avg(value) as avg_value'))->where('source_id', $request->input('definitionId'))
          ->where('country_id',$request->input('countryId')[$i])->groupBy('10YRS')->get()->toArray();


        }
        $data['data'] = $values;*/
        if(sizeof($request->input('countryId'))>=1){
          for ($i=0; $i <sizeof($request->input('countryId')) ; $i++) {
            $values[$i] = YearsValues::select('10YRS',DB::raw('avg(value) as avg_value'))->where('source_id', $request->input('definitionId'))
            ->where('country_id',$request->input('countryId')[$i])->groupBy('10YRS')->get()->toArray();
            $temp=$request->input('countryId')[$i];
            array_push($values[$i], $temp);


          }
          $data['data'] = $values;
        }elseif (sizeof($request->input('definitionId'))>1) {
          for ($i=0; $i <sizeof($request->input('definitionId')) ; $i++) {
            $values[$i] = YearsValues::select('10YRS',DB::raw('avg(value) as avg_value'))->where('source_id', $request->input('definitionId')[$i])
            ->where('country_id',$request->input('countryId'))->groupBy('10YRS')->get()->toArray();


          }
          $data['data'] = $values;
        }

    }
    catch(\Illuminate\Database\QueryException $e)
    {
        $data['status'] = 0;
        $data['message'] = 'Error: An error occurred. Please try again.';
    }
    return response()->json($data);
    //return ($request->input('countryId'));
  }

  public function getSingleYears(Request $request)
  {

    try {
        $data['status'] = 1;
        if(sizeof($request->input('countryId'))>=1){
          for ($i=0; $i <sizeof($request->input('countryId')) ; $i++) {
            $values[$i] = YearsValues::select('years','value')->where('source_id', $request->input('definitionId'))
            ->where('country_id',$request->input('countryId')[$i])->get()->toArray();
            $temp=$request->input('countryId')[$i];
            array_push($values[$i], $temp);

          }
          $data['data'] = $values;
        }elseif (sizeof($request->input('definitionId'))>1) {
          for ($i=0; $i <sizeof($request->input('definitionId')) ; $i++) {
            $values[$i] = YearsValues::select('years','value')->where('source_id', $request->input('definitionId')[$i])
            ->where('country_id',$request->input('countryId'))->get()->toArray();


          }
          $data['data'] = $values;
        }

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
