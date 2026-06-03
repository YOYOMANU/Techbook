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
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'favoris' => $this->resource->favoris,
            'status' => new StatusResource($this->resource->status),
            'categories' => CategoryResource::collection($this->categories),
            'level' => new LevelResource($this->resource->level),
            'image' => $this->getFirstMediaUrl('image', 'thumb'),
        ];
    }
}
