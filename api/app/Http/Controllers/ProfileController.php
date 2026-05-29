<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($data);

        return response()->json(['user' => $user->fresh()]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return response()->json([
                'message' => 'Mot de passe actuel incorrect.',
                'errors'  => ['current_password' => ['Mot de passe actuel incorrect.']],
            ], 422);
        }

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Mot de passe mis à jour.']);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        if (!Hash::check($request->password, $request->user()->password)) {
            return response()->json([
                'message' => 'Mot de passe incorrect.',
                'errors'  => ['password' => ['Mot de passe incorrect.']],
            ], 422);
        }

        $user = $request->user();
        $request->user()->currentAccessToken()->delete();
        $user->delete();

        return response()->noContent();
    }
}
