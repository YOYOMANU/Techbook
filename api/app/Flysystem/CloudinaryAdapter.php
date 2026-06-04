<?php

namespace App\Flysystem;

use Cloudinary\Cloudinary;
use League\Flysystem\Config;
use League\Flysystem\FileAttributes;
use League\Flysystem\FilesystemAdapter;
use League\Flysystem\UrlGeneration\PublicUrlGenerator;

class CloudinaryAdapter implements FilesystemAdapter, PublicUrlGenerator
{
    public function __construct(protected Cloudinary $cloudinary) {}

    private function upload(string $tmpFile, string $path): void
    {
        $folder   = pathinfo($path, PATHINFO_DIRNAME);
        $publicId = pathinfo($path, PATHINFO_FILENAME);

        $options = [
            'public_id'     => $publicId,
            'resource_type' => 'auto',
        ];

        if ($folder && $folder !== '.') {
            $options['folder'] = $folder;
        }

        $this->cloudinary->uploadApi()->upload($tmpFile, $options);
    }

    public function write(string $path, string $contents, Config $config): void
    {
        $tmpFile = tempnam(sys_get_temp_dir(), 'cld') . '.jpg';
        file_put_contents($tmpFile, $contents);
        $this->upload($tmpFile, $path);
        unlink($tmpFile);
    }

    public function writeStream(string $path, $contents, Config $config): void
    {
        $tmpFile = tempnam(sys_get_temp_dir(), 'cld') . '.jpg';
        $out     = fopen($tmpFile, 'wb');
        stream_copy_to_stream($contents, $out);
        fclose($out);
        $this->upload($tmpFile, $path);
        unlink($tmpFile);
    }

    public function publicUrl(string $path, Config $config): string
    {
        $folder   = pathinfo($path, PATHINFO_DIRNAME);
        $publicId = pathinfo($path, PATHINFO_FILENAME);
        $fullId   = ($folder && $folder !== '.') ? "$folder/$publicId" : $publicId;

        return 'https://res.cloudinary.com/'
            . $this->cloudinary->configuration->cloud->cloudName
            . '/image/upload/'
            . $fullId;
    }

    public function read(string $path): string
    {
        return file_get_contents($this->publicUrl($path, new Config()));
    }

    public function readStream(string $path)
    {
        return fopen($this->publicUrl($path, new Config()), 'rb');
    }

    public function delete(string $path): void
    {
        $folder   = pathinfo($path, PATHINFO_DIRNAME);
        $publicId = pathinfo($path, PATHINFO_FILENAME);
        $fullId   = ($folder && $folder !== '.') ? "$folder/$publicId" : $publicId;
        $this->cloudinary->uploadApi()->destroy($fullId);
    }

    public function deleteDirectory(string $path): void {}
    public function createDirectory(string $path, Config $config): void {}
    public function setVisibility(string $path, string $visibility): void {}

    public function visibility(string $path): FileAttributes   { return new FileAttributes($path); }
    public function mimeType(string $path): FileAttributes     { return new FileAttributes($path); }
    public function lastModified(string $path): FileAttributes { return new FileAttributes($path); }
    public function fileSize(string $path): FileAttributes     { return new FileAttributes($path); }
    public function listContents(string $path, bool $deep): iterable { return []; }
    public function move(string $source, string $destination, Config $config): void {}
    public function copy(string $source, string $destination, Config $config): void {}
    public function fileExists(string $path): bool      { return true; }
    public function directoryExists(string $path): bool { return true; }
    
    public function getUrl(string $path): string
    {
        $folder   = pathinfo($path, PATHINFO_DIRNAME);
        $publicId = pathinfo($path, PATHINFO_FILENAME);
        $fullId   = ($folder && $folder !== '.') ? "$folder/$publicId" : $publicId;

        return 'https://res.cloudinary.com/'
            . $this->cloudinary->configuration->cloud->cloudName
            . '/image/upload/'
            . $fullId;
    }
}