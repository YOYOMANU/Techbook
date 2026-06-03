<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatusRequest;
use App\Http\Resources\StatusResource;
use App\Models\Status;

class StatusController extends Controller
{
     public function index()
    {
        return StatusResource::collection(Status::all());
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
    public function store(StatusRequest $request)
    {
        $status = Status::create($request->validated());

        return new StatusResource($status);
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $status)
    {
        return new StatusResource($status);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StatusRequest $request, Status $status)
    {
        $status->update($request->validated());

        return new StatusResource($status);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Status $status)
    {
        $status->delete();

        return response()->json(['message' => 'Status supprimée'], 200);
    }
}
