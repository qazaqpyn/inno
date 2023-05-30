<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    /**
     * @var UserService $userService
     */
    protected $userService;

    /**
     * UserController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Get the user's information
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $response = [
            'user' => $this->userService->getPreferences($request->user())
        ];

        return response($response, 200);
    }

    /**
     * Update the user's information
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
        ]);

        $user = $request->user();

        $response = [
            'user' => $this->userService->updatePreferences($user, $fields)
        ];

        return response($response, 201);
    }

    /**
     * Delete the user
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->user()->delete();

        $response =  [
            'message' => 'User deleted'
        ];

        return response($response, 200);
    }

    /**
     * Update the user's preferences
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function updatePreferences(Request $request)
    {
        // categories should be an array of category ids
        $fields = $request->validate([
            'categories' => 'array',
            'sources' => 'array',
            'authors' => 'array',
        ]);

        $user = $request->user();

        $response = [
            'user' => $this->userService->updatePreferences($user, $fields)
        ];

        return response($response, 201);
    }

    /**
     * Register a new user
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string',
        ]);

        $user = $this->userService->register($fields);

        $token = $this->userService->generateToken($user);

        $response = [
            'user' => $this->userService->getPreferences($user),
            'token' => $token
        ];

        return response($response, 201);
    }

    /**
     * Logout the user
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $response = [
            'message' => 'Logged out'
        ];

        return response($response, 201);
    }

    /**
     * Login the user
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = $this->userService->login($fields);

        if (!$user) {
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $this->userService->generateToken($user);

        $response = [
            'user' => $this->userService->getPreferences($user),
            'token' => $token
        ];

        return response($response, 201);
    }
}
