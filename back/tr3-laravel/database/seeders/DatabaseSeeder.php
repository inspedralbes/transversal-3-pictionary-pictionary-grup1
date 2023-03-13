<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Word;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Categories
        {
            $category = new Category;
            $category -> name = "General Knowledge";
            $category -> save();
    
            $category = new Category;
            $category -> name = "History";
            $category -> save();
    
            $category = new Category;
            $category -> name = "Art";
            $category -> save();
    
            $category = new Category;
            $category -> name = "Science";
            $category -> save();
    
            $category = new Category;
            $category -> name = "Sports";
            $category -> save();
    
            $category = new Category;
            $category -> name = "Geography";
            $category -> save();
    
            $category = new Category;
            $category -> name = "Computer Science";
            $category -> save();
        }

        //General Knowledge

        //History

        //Art

        //Science

        //Sports
        {
            $word = new Word;
            $word -> name = "Basketball";
            $word -> description = "A 5vs5 game in which each team tries to score points by throwing a ball through a hoop/basket";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Football";
            $word -> description = "A 11vs11 game in which the objective is to score points by carrying or kicking the ball into the opposing team's net";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Tennis";
            $word -> description = "A racket sport played between two players or pairs of players";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Cricket";
            $word -> description = "The objective is to score runs by hitting the ball and running around the field while the other team tries to get them out";
            $word -> category_id = 5;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Swimming";
            $word -> description = "A sport in which individuals or teams compete by swimming various distances using different strokes, typically in a pool or open water";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Golf";
            $word -> description = "Players use clubs to hit a small ball into a series of holes in as few strokes as possible";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Hockey";
            $word -> description = "A 11vs11 game in which players use sticks to hit a ball into the opposing team's goal";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Volleyball";
            $word -> description = "A 6vs6 game in which a ball is hit back and forth over a net with the objective of making the ball land on the opposing team's court";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Baseball";
            $word -> description = "a 9vs9 bat game in which players try to hit a ball thrown by the opposing team's pitcher and then run around four bases";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Boxing";
            $word -> description = "A combat sport in which two people, usually wearing gloves, fight each other";
            $word -> category_id = 5;
            $word -> save();
        }
        //Geography

        //Computer Science
        {
            $word = new Word;
            $word -> name = "monitor";
            $word -> description = "Display device used to visually the output of a computer";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "keyboard";
            $word -> description = "Input device that allows the user to input characters into the computer by pressing keys";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "mouse";
            $word -> description = "A pointing device that allows the user to control the movement of the cursor on the computer screen";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "printer";
            $word -> description = "Device that produces a physical copy of electronic documents or images";
            $word -> category_id = 7;
            $word -> save();
            
            $word = new Word;
            $word -> name = "scanner";
            $word -> description = "Input device that captures images, documents, or other physical objects and converts them into digital images";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "webcam";
            $word -> description = "A camera that captures video and audio and sends it over the internet in real-time";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "headset";
            $word -> description = "A combination of headphones and microphone";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "speaker";
            $word -> description = "A device that produces audio output from a computer";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "external hard drive";
            $word -> description = "A portable storage device that provides additional storage capacity";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "joystick";
            $word -> description = "Input gaming device that allows the user to control the movement";
            $word -> category_id = 7;
            $word -> save();
        }
    }
}
