<?php

namespace App\Providers;

use Cloudinary\Cloudinary;
use App\Flysystem\CloudinaryAdapter;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\Filesystem;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
{
    Storage::extend('cloudinary', function ($app, $config) {
        $cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => $config['cloud_name'],
                'api_key'    => $config['api_key'],
                'api_secret' => $config['api_secret'],
            ],
        ]);

        $adapter    = new CloudinaryAdapter($cloudinary);
        $filesystem = new Filesystem($adapter);

        return new FilesystemAdapter(
            $filesystem,
            $adapter,
            $config,
        );
    });
}
}
