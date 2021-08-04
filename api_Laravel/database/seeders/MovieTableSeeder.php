<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Movie;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Movie::truncate();

        $faker =\Faker\Factory::create();

        for($i =0; $i<10; $i++){
            Movie::create ([
                'title' => $faker->sentence,
                'synopsis' => $faker->paragraph,
                'year' => $faker->randomDigit,
                'cover' => $faker->sentence
            ]);
        }
    }
}
