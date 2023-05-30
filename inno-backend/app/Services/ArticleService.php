<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;

class ArticleService
{
    /**
     * Get articles based on the search query and filters
     *
     * @param String $searchQuery The search query to search for in the articles title, description and author name fields (optional)
     * @param String $category The category to filter the articles by (optional)
     * @param String $source The source to filter the articles by (optional)
     * @param String $from The date to filter the articles from (optional)
     * @param String $to The date to filter the articles to (optional)
     * @return Array $articles
     */
    public function search($searchQuery, $category, $source, $from, $to)
    {
        $query = Article::query();

        // Apply search query filter
        if ($searchQuery) {
            $query->where('title', 'like', "%$searchQuery%")
                ->orWhere('description', 'like', "%$searchQuery%")
                ->orWhereHas('author', function ($query) use ($searchQuery) {
                    $query->where('id', 'like', "%$searchQuery%");
                });
        }

        // Apply category filter
        if ($category) {
            $category = explode(',', $category);
            $query->whereHas('categories', function ($query) use ($category) {
                $query->whereIn('id', $category);
            });
        }
        // Apply source filter
        if ($source) {
            $source = explode(',', $source);
            $query->whereHas('source', function ($query) use ($source) {
                $query->whereIn('id', $source);
            });
        }

        if ($from) {
            $query->where('published_at', '>=', $from);
        }

        if ($to) {
            $query->where('published_at', '<=', $to);
        }

        $query->orderBy('published_at', 'desc');

        return $this->getArticleNestedDetails($query->get());
    }

    /**
     * Personalize the articles based on the user's preferred categories, sources and authors
     *
     * @param User $user The user to personalize the articles for
     * @return Array $articles
     */
    public function personalize(User $user)
    {
        // Get the user's preferred categories
        $categories = $user->categories->pluck('name')->toArray();

        // Get the user's preferred sources
        $sources = $user->sources->pluck('name')->toArray();

        // Get the user's preferred authors
        $authors = $user->authors->pluck('name')->toArray();

        // Start building the query
        $query = Article::query();

        // Apply category filter
        if ($categories) {
            $query->orWhereHas('categories', function ($query) use ($categories) {
                $query->whereIn('name', $categories);
            });
        }

        // Apply source filter
        if ($sources) {
            $query->orWhereHas('source', function ($query) use ($sources) {
                $query->whereIn('name', $sources);
            });
        }

        // Apply author filter
        if ($authors) {
            $query->orWhereHas('author', function ($query) use ($authors) {
                $query->whereIn('name', $authors);
            });
        }

        $query->orderBy('published_at', 'desc');

        return $this->getArticleNestedDetails($query->get());
    }

    /**
     * Get the Authors list of articles
     * 
     * @return Array $articles
     */
    public function getAuthors()
    {
        return Author::query()->select('id', 'name')->get()->toArray();
    }

    /**
     * Get the Sources list from source table
     * 
     * @return Array $articles
     */
    public function getSources()
    {
        return Source::query()->select('id', 'name')->get()->toArray();
    }

    /**
     * Get the Categories list of articles
     * 
     * @return Array $articles
     */
    public function getCategories()
    {
        return Category::query()->select('id', 'name')->get()->toArray();
    }

    /**
     * Get the article details for the given articles
     *
     * @param Array $articles The articles to get the details for
     * @return Array $articles
     */
    private function getArticleNestedDetails($articles)
    {
        foreach ($articles as $article) {
            $article->load('categories:id,name');
            $article->load('source:id,name');
            $article->load('author:id,name');

            $article->categories->makeHidden('pivot');
            $article->makeHidden('source_id');
            $article->makeHidden('author_id');
        }

        return $articles;
    }

    /**
     * Get all articles
     *
     * @return Array $articles
     */
    public function getArticles()
    {
        $articles = Article::query()->with('categories')->orderBy('published_at', 'desc');

        return $this->getArticleNestedDetails($articles->get());
    }

    /**
     * Get the articles for the given page
     *
     * @param Query $articles The articles to get the details for
     * @param Integer $page The page to get the articles for
     * @return Array $articles
     */
    public function paginatedArticles($articles, $page)
    {
        $articles = $articles->paginate(10, ['*'], 'page', $page);

        return $this->getArticleNestedDetails($articles);
    }
}
