<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * Define the many-to-many relationship between User and Category
     *
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_user_preference');
    }

    /**
     * Define the many-to-many relationship between User and Source
     *
     */
    public function sources()
    {
        return $this->belongsToMany(Source::class, 'source_user_preference');
    }

    /**
     * Define the many-to-many relationship between User and Author
     *
     */
    public function authors()
    {
        return $this->belongsToMany(Author::class, 'author_user_preference');
    }
}
