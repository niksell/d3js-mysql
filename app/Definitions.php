<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CountryInfo;
use App\YearsValues;
class Definitions extends Model
{
    //
    protected $fillable=['id','Code','Indicator_name','Long_definition','Source'];
    public function countrys()
    {
      return $this->hasMany(CountryInfo::class);
    }
    public function years()
    {
      return $this->hasMany(YearsValues::class);
    }
    public function addCountry(CountryInfo $country)
    {

      return $this->countrys()->save($country);
    }
}
