<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScrapesLog extends Model
{
    public $timestamps = false;

    protected $table = 'scrapes_logs';


    /**
     * Define the many-to-one relationship between Article and Category
     *
     */
    public function source()
    {
        return $this->belongsTo('App\Models\Sources', 'source_id');
    }
}
