<?php

namespace App\Services\Scraper;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class NYTimes implements ScraperInterface
{
    /**
     * The base URL of the news source
     */
    protected $baseUrl = 'https://api.nytimes.com/svc/news/v3/';

    /**
     * State Control for the method getNextArticle()
     */
    protected $next = 0;

    /**
     * The articles loaded from API
     */
    protected $articles = [];

    /**
     * GuzzleHttp Client used to make the requests
     */
    protected $client;

    /**
     * Constructor to initialize the http client and load the articles
     */
    public function __construct()
    {
        // Initialize the http client
        $this->client = new Client(['http_errors' => false]);

        // Load the articles
        $this->_loadArticles();
    }

    /**
     * Create Source object
     *
     * @return Array $source
     */
    public function getSource()
    {
        $source = [
            'name' => 'The New York Times',
            'url' => $this->baseUrl,
        ];
        return $source;
    }

    /**
     * Get the next article from the news source
     *
     * @return Array $article
     */
    public function getNextArticle()
    {
        Log::info('NY: articles=' . $this->next . '/' . count($this->articles));
        // If there are articles and the next index is valid
        if (count($this->articles) && isset($this->articles[$this->next])) {
            return $this->_prepareResponse($this->articles[$this->next++]);
        } elseif (!count($this->articles)) {
            // If there are no articles, load them again and reset the index
            $this->next = 0;
            $this->_loadArticles();
            return $this->getNextArticle();
        }
        return null;
    }

    /**
     * Prepare the response to be returned
     *
     * @param Array $article
     * @return Array $response
     */
    private function _prepareResponse($article)
    {
        return [
            'title' => $article['title'],
            'description' => $article['abstract'],
            'url' => $article['url'],
            'image_url' => array_key_exists("thumbnail_standard", $article) ? $article['thumbnail_standard'] : null,
            'published_at' => $article['published_date'],
            'author' => $article['byline'],
            'category' => $article['section'],
        ];
    }

    /**
     * Load the articles from the API
     */
    public function _loadArticles()
    {
        $response = $this->client->request('GET', $this->_getArticlesUrl());
        if ($response->getStatusCode() == 200) {
            $this->articles = json_decode($response->getBody(), true)["results"];
        } else {
            $this->articles = [];
        }
    }

    /**
     * Get the URL to fetch the articles from
     *
     * @return String $url
     */
    public function _getArticlesUrl()
    {
        return $this->baseUrl . 'content/all/all.json?api-key=' . env('NYTIMES_API_KEY');
    }
}
