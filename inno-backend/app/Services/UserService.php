<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Update the user with the given fields
     *
     * @param User $user
     * @param Array $fields
     * @return User $user
     */
    public function update(User $user, $fields)
    {
        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->save();

        return $user;
    }

    /**
     * Update the user's preferences with the given fields
     *
     * @param User $user
     * @param Array $fields
     * @return User $user
     */
    public function updatePreferences(User $user, $fields)
    {
        $user->categories()->sync($fields['categories']);
        $user->sources()->sync($fields['sources']);
        $user->authors()->sync($fields['authors']);

        return $this->getPreferences($user);
    }

    /**
     * Get the user's preferences
     *
     * @param User $user
     * @return User $user
     */
    public function getPreferences(User $user)
    {
        $user->load('categories:id,name');
        $user->load('sources:id,name');
        $user->load('authors:id,name');

        $user->categories->makeHidden('pivot');
        $user->sources->makeHidden('pivot');
        $user->authors->makeHidden('pivot');

        return $user;
    }

    /**
     * Register a new user
     *
     * @param Array $fields
     * @return User $user
     */
    public function register($fields)
    {
        $user = new User();
        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->password = Hash::make($fields['password']);
        $user->save();

        return $user;
    }

    /**
     * Generate a token for the user
     *
     * @param User $user
     * @return String $token
     */
    public function generateToken(User $user)
    {
        $token = $user->createToken('auth_token')->plainTextToken;

        return $token;
    }

    /**
     * Login the user with the given credentials
     *
     * @param Array $fields
     * @return User $user
     */
    public function login($fields)
    {
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return null;
        }

        return $user;
    }
}
