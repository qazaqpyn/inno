<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use App\Services\Scraper\NewsScraper;

class ScrapeNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:news {source} {--days-ago=5}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seaches for news articles from a given source';

    /**
     * The available options for the {source} parameter
     */
    protected $availableSources = [
        'Guardian', 'NYTimes', 'NewsData'
    ];

    /**
     * Create a new command instance.
     * @return void   
     */

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     * 
     * @return void
     */
    public function handle()
    {
        $this->line('Running scraper at ' . date('Y-m-d H:i:s'));
        try {
            $source = $this->argument('source');
            $daysAgo = \intval($this->option('days-ago'));
            $path = "App\\Services\\Scraper";
            $className = "{$path}\\{$source}";

            if (!\in_array($source, $this->availableSources)) {
                throw new Exception("The source {$source} is not available or not yet implemented");
            }

            if ($daysAgo < 0) {
                throw new Exception("The number of days ago must be a positive integer");
            }

            if (!\in_array("{$path}\\ScraperInterface", \class_implements($className))) {
                throw new Exception("The source {$source} is not properly implemented");
            }

            $scraper = new $className();
            $handler = new NewsScraper($scraper, $daysAgo);

            $handler->run();
        } catch (Exception $e) {
            $this->error("ERROR: " . $e->getMessage());
        }
        $this->line('Ending scraper at ' . date('Y-m-d H:i:s'));
    }
}
