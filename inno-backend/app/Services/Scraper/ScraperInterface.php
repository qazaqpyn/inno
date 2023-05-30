<?php

namespace App\Services\Scraper;

interface ScraperInterface
{

    /**
     * Get the identifier (form database) of the news source
     *
     * @return Array $source
     */
    public function getSource();

    /**
     * Get the next article from the news source
     *
     * @return Array $article
     */
    public function getNextArticle();
}
