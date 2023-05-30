<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'url',
        'image_url',
        'published_at',
        'source_id',
        'author_id',
    ];

    /**
     * Define the many-to-many relationship between Article and Category
     *
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Define the many-to-one relationship between Article and Source
     *
     */
    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    /**
     * Define the many-to-one relationship between Article and Author
     *
     */
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
