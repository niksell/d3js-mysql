<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Definitions;
use App\CountryInfo;

class YearsValues extends Model
{
  protected $fillable=['source_id','country_id','years','value'];
  public function defin()
  {
    return $this->belongsTo(Definitions::class);
  }
  public function country()
  {
    return $this->belongsTo(CountryInfo::class);
  }
}
