<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = ['debutant', 'intermediaire', 'senior'];

        foreach ($levels as $name) {
            Level::firstOrCreate(['name' => $name]);
        }
    }
}