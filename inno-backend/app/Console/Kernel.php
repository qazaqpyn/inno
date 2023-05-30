<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use GuzzleHttp\Promise;


class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('scrape:news NewsData --days-ago=1')
            ->dailyAt('00:00')
            ->runInBackground();
        $schedule->command('scrape:news Guardian --days-ago=1')
            ->dailyAt('00:00')
            ->runInBackground();
        $schedule->command('scrape:news NYTimes --days-ago=1')
            ->dailyAt('00:00')
            ->runInBackground();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
