<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['front-end', 'back-end', 'bdd', 'ia & ml', 'cloud & devops'];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
