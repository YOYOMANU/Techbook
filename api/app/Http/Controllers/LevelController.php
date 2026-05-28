<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelFormRequest;
use App\Http\Resources\LevelResource;
use App\Models\Level;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LevelResource::collection(Level::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LevelFormRequest $request)
    {
        $level = Level::create($request->validated());

        return new LevelResource($level);
    }

    /**
     * Display the specified resource.
     */
    public function show(Level $level)
    {
        return new LevelResource($level);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LevelFormRequest $request, Level $level)
    {
        $level->update($request->validated());

        return new LevelResource($level);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Level $level)
    {
        $level->delete();

        return response()->json(['message' => 'Niveau supprimée'], 200);
    }
}
