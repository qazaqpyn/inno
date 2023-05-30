<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * @var ArticleService $articleService
     */
    protected $articleService;

    /**
     * ArticleController constructor.
     * @param ArticleService $articleService
     */
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Get all articles and return results
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get articles using the ArticleService
        $articles = $this->articleService->getArticles();

        $response = [
            'articlesNumber' => count($articles),
            'articles' => $articles
        ];

        return response($response, 200);
    }

    /**
     * Get categories, sources and authors to be used as filter options
     * 
     * @return \Illuminate\Http\Response
     */
    public function getFilterOptions()
    {
        $categories = $this->articleService->getCategories();
        $sources = $this->articleService->getSources();
        $authors = $this->articleService->getAuthors();

        $response = [
            'categories' => $categories,
            'sources' => $sources,
            'authors' => $authors
        ];

        return response($response, 200);
    }

    /**
     * Search for articles and return results
     *
     * @param Request $request
     * @param String $id
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        // Get the search query parameter from the request
        $searchQuery = $request->input('query');

        // Get the filter parameters from the request
        $category = $request->input('category');
        $source = $request->input('source');
        $from = $request->input('from');
        $to = $request->input('to');

        // Search for articles using the ArticleService
        $articles = $this->articleService->search($searchQuery, $category, $source, $from, $to);

        $response = [
            'articlesNumber' => count($articles),
            'articles' => $articles
        ];

        // Return the articles as a JSON response
        return response($response, 200);
    }

    /**
     * Get the user's personalized articles and return results
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function personalize(Request $request)
    {
        // Get the user from the request
        $user = $request->user();

        // Personalize the articles using the ArticleService
        $articles = $this->articleService->personalize($user);

        $response = [
            'articlesNumber' => count($articles),
            'articles' => $articles
        ];

        // Return the articles as a JSON response
        return response($response, 200);
    }
}
