<?php

namespace App\Services\Scraper;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Models\ScrapesLog;

class NewsScraper
{
    /**
     * ScraperInterface object that is injected in the constructor
     */
    private $scraper;

    /**
     * $daysAgo is the number of days ago from today that the scraper will scrape
     */
    private $daysAgo;

    /**
     * $sourceID is the ID of the source that the scraper will scrape
     */
    private $sourceID;

    /**
     * Constructor to initialize the interface and the number of days ago
     */
    public function __construct(ScraperInterface $scraper, $daysAgo)
    {
        $this->scraper = $scraper;
        $this->daysAgo = $daysAgo;
        $this->sourceID = $this->getSourceID($scraper->getSource());
    }


    /**
     * Get the identifier (form database) of the news source
     *
     * @param Array $source
     * @return String $url
     */
    public function getSourceID($source)
    {
        return Source::firstOrCreate($source)->id;
    }

    /**
     * The method to run the scraper fo the articles and save them in the database
     */
    public function run()
    {
        // Save the start time and initialize the variables
        $started_Date = date('Y-m-d H:i:s');
        $log_total = 0;
        $log_imported = 0;

        // Fetch the first article
        $data = $this->scraper->getNextArticle();
        // Iterates until the range of days is 0 or until there are no more articles
        while ($data && $this->_shouldBeAnalyzed($data['published_at'])) {
            // Increment the total articles
            $log_total++;

            // Check if the article already exists in the database
            $article = Article::where('url', $data['url'])->first();

            // If the article doesn't exist, create it
            if (!$article) {
                // Create the article
                $article = $this->createArticle($data);
                // Increment the imported articles
                $log_imported++;
            }

            // Fetch the next article
            $data = $this->scraper->getNextArticle();
        }
        // Save Log information about scraping
        $this->logger($started_Date, $log_total, $log_imported);
    }

    /**
     * Check if the article should be analyzed by checking the range of days
     * 
     * @param String $date
     * @return Boolean
     */
    private function _shouldBeAnalyzed($date)
    {
        $now = new \DateTime(date('Y-m-d'));
        $pub = new \DateTime(date('Y-m-d', strtotime($date)));

        $diff = $pub->diff($now);
        // The format('%r%a') return as string sign and absolute value of the difference in days and compares with the daysAgo
        return $diff->format('%r%a') <= $this->daysAgo;
    }

    /**
     * Create the article and attach the category
     * 
     * @param Array $data
     * @return Article $article
     */
    private function createArticle($data)
    {
        // Get the author details
        $author = Author::firstOrCreate(['name' => $data['author']]);

        // Create the article
        $article = new Article;
        $article->source_id = $this->sourceID;
        $article->author_id = $author->id;
        $article->title = $data['title'];
        $article->description = $data['description'];
        $article->url = $data['url'];
        $article->image_url = $data['image_url'];
        $article->published_at = $data['published_at'];

        $article->save();

        // Get the category details
        $category = Category::firstOrCreate(['name' => $data['category']]);

        // Attach the category to the article
        $article->categories()->attach($category->id);
    }

    /**
     * Save Log information about scraping
     * 
     * @param String $started_at
     * @param Integer $articles_analyzed
     * @param Integer $articles_imported
     */
    private function logger($started_at, $articles_analyzed, $articles_imported)
    {
        $log = new ScrapesLog;
        $log->source_id = $this->sourceID;
        $log->started_at = $started_at;
        $log->articles_analyzed = $articles_analyzed;
        $log->articles_imported = $articles_imported;
        $log->finished_at = date('Y-m-d H:i:s');
        $log->save();
    }
}
