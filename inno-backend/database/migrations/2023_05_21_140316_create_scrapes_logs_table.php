<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scrapes_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('source_id')->constrained('sources')->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('finished_at');
            $table->integer('articles_analyzed');
            $table->integer('articles_imported');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scrapes_logs');
    }
};
