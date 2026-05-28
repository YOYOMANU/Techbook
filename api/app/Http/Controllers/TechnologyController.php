<?php

namespace App\Http\Controllers;

use App\Http\Requests\TechnologyFormRequest;
use App\Http\Resources\TechnologyResource;
use App\Models\Technology;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sort   = $request->query('sort');
        $search = $request->query('search');

        $query = Technology::with(['categories', 'level']);

        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%");
        }

        if ($sort) {
            $query->whereHas('categories', fn ($q) =>
                $q->where('slug', $sort)->orWhere('name', $sort)
            );
        }

        $technologies = $query->latest()
            ->paginate(10)
            ->appends($request->only(['sort', 'search']));

        return TechnologyResource::collection($technologies)->additional([
            'recents' => TechnologyResource::collection(
                Technology::with(['categories', 'level'])
                    ->latest()->take(3)->get()
            ),
            'stats' => [
                'total'      => Technology::count(),
                'maitrises'  => Technology::whereHas('level', fn ($q) => $q->where('name', 'senior'))->count(),
                'en_cours'   => Technology::whereHas('level', fn ($q) => $q->where('name', 'intermediaire'))->count(),
                'a_explorer' => Technology::whereHas('level', fn ($q) => $q->where('name', 'debutant'))->count(),
            ],
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(TechnologyFormRequest $request)
    {

        $validated = $request->validated();
        $validated['favoris'] = $request->boolean('favoris');
        $technology = Technology::create($validated);

        $technology->categories()->attach($validated['category_ids']);
        if ($request->hasFile('image')) {
            $technology
                ->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }
        $technology->load(['categories', 'level']);

        return new TechnologyResource($technology);
    }

    /**
     * Display the specified resource.
     */
    public function show(Technology $technology)
    {

        $technology->load(['categories', 'level']);

        return new TechnologyResource($technology);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TechnologyFormRequest $request, Technology $technology)
    {

        $validated = $request->validated();
        $validated['favoris'] = $request->boolean('favoris');

        $technology->update($validated);
        if ($validated['category_ids']) {
            $technology->categories()->sync($validated['category_ids']);
        }

        if ($request->hasFile('image')) {
            $technology
                ->addMediaFromRequest('image')
                ->toMediaCollection('image'); // singleFile() supprime l'ancienne
        }

        return new TechnologyResource($technology);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {
        $technology->categories()->detach();
        $technology->delete();

        return response()->noContent();
    }
}
