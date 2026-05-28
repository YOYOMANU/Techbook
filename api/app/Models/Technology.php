<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Override;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Technology extends Model implements HasMedia
{
    /** @use HasFactory<TechnologyFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
        'level_id',
        'favoris'
    ];

    protected $casts = [
        'favoris' => 'boolean'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')
            ->singleFile(); // remplace l'ancienne image automatiquement
    }

    #[Override]
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(200)
            ->height(200);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_technology');
    }

    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }
}
