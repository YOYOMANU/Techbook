<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Override;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Technology extends Model implements HasMedia
{
    /** @use HasFactory<TechnologyFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'level_id',
        'favoris',
        'status_id',
    ];

    protected $casts = [
        'favoris' => 'boolean',
    ];

    // -------------------------------------------------------------------------
    // Media
    // -------------------------------------------------------------------------

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')
            ->singleFile();
    }

    #[Override]
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(200)
            ->height(200);
    }

    // -------------------------------------------------------------------------
    // Relations
    // -------------------------------------------------------------------------

    /** La technologie appartient à un utilisateur */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** Many-to-many avec Category */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_technology');
    }

    /** Le niveau de maîtrise (modèle Level séparé) */
    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'status_id');
    }
}
