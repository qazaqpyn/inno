<?php

namespace App\Services\Scraper;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class NewsData implements ScraperInterface
{
    /**
     * The base URL of the news source
     */
    protected $baseUrl = 'https://newsdata.io/api/1/';

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
            'name' => 'NEWSDATA.io',
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
        Log::info('ND: articles=' . $this->next . '/' . count($this->articles));
        // If there are articles and the next index is valid
        if (count($this->articles) && isset($this->articles[$this->next])) {
            return $this->_prepareResponse($this->articles[$this->next++]);
        } elseif (!count($this->articles)) {
            // If there are no articles, reset the index and load the articles
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
     * @return Array $article
     */
    private function _prepareResponse($article)
    {
        return [
            'title' => $article['title'],
            'description' => !is_null($article['description']) ? $article['description'] : "",
            'url' => $article['link'],
            'image_url' => $article['image_url'],
            'published_at' => $article['pubDate'],
            'author' => !is_null($article['creator']) ? $article['creator'][0] : "",
            'category' => $article['category'][0],
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
     * Get the URL to get the articles from the API
     *
     * @return String $url
     */
    public function _getArticlesUrl()
    {
        return $this->baseUrl . 'news?apikey=' . env('NEWSDATA_API_KEY') . '&language=en';
    }
}
