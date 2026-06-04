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

        // ✅ Scoping : on part toujours des techs de l'user connecté
        $query = $request->user()
            ->technologies()
            ->with(['categories', 'level', 'status']);

        if ($search) {
            // ✅ iLIKE au lieu de LIKE — PostgreSQL est case-sensitive par défaut
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($search) . '%']);
        }

        if ($sort) {
            // ✅ Filtre uniquement par name — pas de colonne slug en prod (PostgreSQL)
            $query->whereHas('categories', fn($q) =>
                $q->where('name', $sort)
            );
        }

        // ✅ orderBy created_at explicite — évite le réordonnancement
        // quand updated_at est touché (ex: upload image via Spatie)
        $technologies = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->appends($request->only(['sort', 'search']));

        // ✅ Stats et recents également scopés sur l'user connecté
        $userTechs = $request->user()->technologies();

        return TechnologyResource::collection($technologies)->additional([
            'recents' => TechnologyResource::collection(
                $request->user()
                    ->technologies()
                    ->with(['categories', 'level', 'status'])
                    ->orderBy('created_at', 'desc')
                    ->take(3)
                    ->get()
            ),
            'stats' => [
                'total' => (clone $userTechs)->count(),

                'maitrises' => (clone $userTechs)
                    ->whereHas('status', fn ($q) => $q->where('name', 'Maîtrisée'))
                    ->count(),

                'en_cours' => (clone $userTechs)
                    ->whereHas('status', fn ($q) => $q->where('name', 'En cour'))
                    ->count(),

                'a_explorer' => (clone $userTechs)
                    ->whereHas('status', fn ($q) => $q->where('name', 'À explorer'))
                    ->count(),
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

        // ✅ user_id assigné automatiquement via la relation
        $technology = $request->user()->technologies()->create($validated);

        $technology->categories()->attach($validated['category_ids']);

        if ($request->hasFile('image')) {
            $technology
                ->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }

        $technology->load(['categories', 'level', 'status']);

        return new TechnologyResource($technology);
    }

    /**
     * Display the specified resource.
     */
    public function show(Technology $technology)
    {
        // ✅ Vérifie que la tech appartient à l'user connecté
        $this->authorize('view', $technology);

        $technology->load(['categories', 'level', 'status']);

        return new TechnologyResource($technology);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TechnologyFormRequest $request, Technology $technology)
    {
        // ✅ Vérifie que la tech appartient à l'user connecté
        $this->authorize('update', $technology);

        $validated = $request->validated();
        $validated['favoris'] = $request->boolean('favoris');

        $technology->update($validated);

        // ✅ isset() pour ne sync que si category_ids est présent dans la requête
        if (isset($validated['category_ids'])) {
            $technology->categories()->sync($validated['category_ids']);
        }

        if ($request->hasFile('image')) {
            $technology
                ->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }

        $technology->load(['categories', 'level', 'status']);

        return new TechnologyResource($technology);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {
        // ✅ Vérifie que la tech appartient à l'user connecté
        $this->authorize('delete', $technology);

        $technology->categories()->detach();
        $technology->delete();

        return response()->noContent();
    }
}