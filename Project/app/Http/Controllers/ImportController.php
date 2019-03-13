<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Excel;
use App\Definitions;
use App\CountryInfo;
use App\YearsValues;

class ImportController extends Controller
{
    public function importDefinitions()
    {
      $upload=base_path().'/public/assets/defini.csv';
      $file=fopen($upload,'r');
      $header=fgetcsv($file);
    //  dd( $header);

      while($columns=fgetcsv($file))
      {

        $code=$columns[0];
        $Indicator=$columns[1];
        $Long=$columns[2];
        $source=$columns[3];
        $definition=new Definitions(['Code'=>$code,'Indicator_name'=>$Indicator,'Long_definition'=>$Long,'Source'=>$source]);
        //$definition->Indicator_name=$Indicator;
        //$definition->Long_definition=$Long;
        //$definition->Source=$source;
        $definition->save();

      }
      dd("JOB DONE");
    }

    public function importCountrys()
    {
      $upload=base_path().'/public/assets/Data.csv';
      $file=fopen($upload,'r');
      $header=fgetcsv($file);
    //  dd( $header);

      while($columns=fgetcsv($file))
      {

        $Series_Name=$columns[0];
        $Series_Code=$columns[1];
        $Country_Name=$columns[2];
        $Country_Code=$columns[3];
        $country=new CountryInfo(['country'=>$Country_Name,'country_code'=>$Country_Code]);
        //$definition->Indicator_name=$Indicator;
        //$definition->Long_definition=$Long;
        //$definition->Source=$source;
        $definition=\DB::table('definitions')->where('Code', $Series_Code)->first();

        //$test=$definition->with('$Series_Code')->get();
      //  dd($definition->id);
        $country->source_id=$definition->id;
        //$test= new Definitions();
        //$test->addCountry($country);
        $country->save();
      }
      dd("JOB DONE");
    }
    public function importyears()
    {
      ini_set('max_execution_time', 1000);
      $upload=base_path().'/public/assets/Data.csv';
      $file=fopen($upload,'r');
      $header=fgetcsv($file);
      $test=[];
      for ($i=4; $i <61 ; $i++) {
          $test[$i]=($header[$i]);
      }
      //dd( $test);

      while($columns=fgetcsv($file))
      {

        $Series_Name=$columns[0];
        $Series_Code=$columns[1];
        $Country_Name=$columns[2];
        $Country_Code=$columns[3];
        for ($i=4; $i <61 ; $i++) {
          if($columns[$i]==".."){
            $year=new YearsValues(['years'=>$test[$i],'value'=>0]);

          }else{
            $year=new YearsValues(['years'=>$test[$i],'value'=>$columns[$i]]);

          }
          //$definition->Indicator_name=$Indicator;
          //$definition->Long_definition=$Long;
          //$definition->Source=$source;

          $definition=\DB::table('definitions')->where('Code', $Series_Code)->first();

          //$test=$definition->with('$Series_Code')->get();
        //  dd($definition->id);
          $year->source_id=$definition->id;
          $country=\DB::table('country_infos')->where('source_id', $definition->id)->where('country',$Country_Name)->first();
          //dd($country);
          //$test=$definition->with('$Series_Code')->get();
        //  dd($definition->id);
          $year->country_id=$country->id;
          //$test= new Definitions();
          //$test->addCountry($country);
          $year->save();
        }

      }
      dd("JOB DONE Done");
    }
}
