<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $csvFile='public/assets/defini.csv'
      $areas = Excel::load($csvFile, function ($reader) {
           return $reader->ignoreEmpty()->toArray();
       })->get();
       foreach ($areas as $area) {
         $area = $area->all();
         DB::table('definitions')->insert($area);
       }
        // $this->call(UsersTableSeeder::class);
    }
}
