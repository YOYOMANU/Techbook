<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TechnologyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->resource->id,
            'name'        => $this->resource->name,
            'description' => $this->resource->description,
            'favoris'     => $this->resource->favoris,
            'status' => $this->resource->status && is_object($this->resource->status)
            ? new StatusResource($this->resource->status)
            : null,
            'categories'  => CategoryResource::collection($this->categories),
            'level' => $this->resource->level && is_object($this->resource->level)
            ? new LevelResource($this->resource->level)
            : null,
            'image' => $this->when(
                $this->hasMedia('image'),
                fn() => $this->getFirstMediaUrl('image', 'thumb'),
                 null
                ),
        ];
    }
}
