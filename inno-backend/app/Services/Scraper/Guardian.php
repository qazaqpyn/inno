<?php

namespace App\Services\Scraper;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;


class Guardian implements ScraperInterface
{
    /**
     * The base URL of the news source
     */
    protected $baseUrl = 'https://content.guardianapis.com/';

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
            'name' => 'The Guardian',
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
        Log::info('Gu: articles=' . $this->next . '/' . count($this->articles));
        // If there are articles and the next index is set
        if (count($this->articles) && isset($this->articles[$this->next])) {
            return $this->_prepareResponse($this->articles[$this->next++]);
        } elseif (!count($this->articles)) {
            // If there are no articles, load them again
            $this->next = 0;
            $this->_loadArticles();
            return $this->getNextArticle();
        }
        return null;
    }

    /**
     * Prepare the response to be saved in the database
     *
     * @param Array $article
     * @return Array $article
     */
    private function _prepareResponse($article)
    {
        return [
            'title' => $article['webTitle'],
            'description' => "",
            'url' => $article['webUrl'],
            'image_url' => null,
            'published_at' => Carbon::parse($article['webPublicationDate'])->format('Y-m-d H:i:s'),
            'author' => "Guardian",
            'category' => $article['sectionName'],
        ];
    }

    /**
     * Load the articles from the API
     */
    public function _loadArticles()
    {
        $response = $this->client->request('GET', $this->_getArticlesUrl());
        if ($response->getStatusCode() == 200) {
            $this->articles = json_decode($response->getBody(), true)["response"]["results"];
        } else {
            $this->articles = [];
        }
    }

    /**
     * Get the URL of the articles endpoint
     *
     * @return String $url
     */
    public function _getArticlesUrl()
    {
        return $this->baseUrl . 'search?api-key=' . env('GUARDIAN_API_KEY');
    }
}
