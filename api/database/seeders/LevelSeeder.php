<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = ['debutant', 'intermediaire', 'senior'];

        foreach ($levels as $level) {
            Level::create(['name' => $level]);
        }
    }
}
