<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Definitions;
use App\YearsValues;

class CountryInfo extends Model
{
  protected $fillable=['source_id','country','country_code'];
  public function years()
  {
    return $this->hasMany(YearsValues::class);
  }
  public function defin()
  {
    return $this->belongsTo(Definitions::class);
  }
}
