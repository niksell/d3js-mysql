<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateYearsValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('years_values', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('source_id')->unsigned()->index();

            $table->foreign('source_id')
                  ->references('id')
                  ->on('definitions')
                  ->onDelete('cascade');
            $table->integer('country_id')->unsigned()->index();

            $table->foreign('country_id')
                  ->references('id')
                  ->on('country_infos')
                  ->onDelete('cascade');
            $table->string('years');
            $table->decimal('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('years_values');
    }
}
