<?php

namespace App\Flysystem;

use Illuminate\Filesystem\FilesystemAdapter;
use League\Flysystem\Config;

class CloudinaryFilesystemAdapter extends FilesystemAdapter
{
    public function url($path): string
    {
        /** @var CloudinaryAdapter $adapter */
        $adapter = $this->adapter;

        return $adapter->publicUrl($path, new Config());
    }
}