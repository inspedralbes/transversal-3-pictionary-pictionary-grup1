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
            $category -> name = "Places";
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
        {
            $word = new Word;
            $word -> name = "Dog";
            $word -> description = "A common household pet and loyal companion to humans";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Rain";
            $word -> description = "Water falling from the sky in droplets";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Tree";
            $word -> description = "A perennial plant with a single stem or trunk";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Sun";
            $word -> description = "The star at the center of the solar system";
            $word -> category_id = 1;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Mathematics";
            $word -> description = "The study of numbers";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Car";
            $word -> description = "A vehicle with four wheels, designed for transportation on roads";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Book";
            $word -> description = "A written or printed work consisting of pages bound together";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Bird";
            $word -> description = "A warm-blooded, egg-laying vertebrate with feathers and wings";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "Clock";
            $word -> description = "A device that tells time by means of a dial or digital display";
            $word -> category_id = 1;
            $word -> save();

            $word = new Word;
            $word -> name = "House";
            $word -> description = "A building designed for people to live in";
            $word -> category_id = 1;
            $word -> save();
        }

        //Places
        {
            $word = new Word;
            $word -> name = "Museum";
            $word -> description = "A building or institution that exhibits objects of historical, cultural, or scientific significance";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "Park";
            $word -> description = "A public area designed for recreation and leisure   ";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "Forest";
            $word -> description = "A large area covered with trees and undergrowth";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "Airport";
            $word -> description = "A place where airplanes take off and land";
            $word -> category_id = 2;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Office";
            $word -> description = "A place where people work";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "City";
            $word -> description = "A large urban area with a high population density";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "Hospital";
            $word -> description = "A place where people go for medical treatment";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "Church";
            $word -> description = "A place of worship for Christians";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "Temple";
            $word -> description = "A place of worship";
            $word -> category_id = 2;
            $word -> save();

            $word = new Word;
            $word -> name = "School";
            $word -> description = "A place where children go to learn";
            $word -> category_id = 2;
            $word -> save();
        }

        //Art
        {
            $word = new Word;
            $word -> name = "Color";
            $word -> description = "Property of an object, result of the way it reflects or emits light";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Brush";
            $word -> description = "A tool used to apply paint to a surface";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Canvas";
            $word -> description = "A fabric used for painting";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Palette";
            $word -> description = "A flat board used by artists to mix and hold paint";
            $word -> category_id = 3;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Sketch";
            $word -> description = "A quick drawing or outline intended to capture the basic elements of a subject";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Portrait";
            $word -> description = "A representation of a person, typically the face";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Sculpture";
            $word -> description = "A three-dimensional work of art created by shaping or combining materials";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Design";
            $word -> description = "The process of creating a plan or layout for something";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Poem";
            $word -> description = "A piece of writing in which the words rhyme";
            $word -> category_id = 3;
            $word -> save();

            $word = new Word;
            $word -> name = "Song";
            $word -> description = "Short poem or other set of words set to music or meant to be sung.";
            $word -> category_id = 3;
            $word -> save();
        }

        //Science
        {
            $word = new Word;
            $word -> name = "Atom";
            $word -> description = "The basic unit of a chemical element";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Gravity";
            $word -> description = "The force that attracts two bodies toward each other";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Magnet";
            $word -> description = "An object that produces a magnetic field";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Fossil";
            $word -> description = "The remains of a prehistoric organism preserved in rock";
            $word -> category_id = 4;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Solar";
            $word -> description = "Related to the sun or utilizing its energy";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Molecule";
            $word -> description = "A group of atoms bonded together";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Ecosystem";
            $word -> description = "A community of living and nonliving things interacting in a specific area";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Laser";
            $word -> description = "A device that emits a narrow, intense beam of light";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Electricity";
            $word -> description = "A form of energy resulting from the flow of electrons";
            $word -> category_id = 4;
            $word -> save();

            $word = new Word;
            $word -> name = "Sound";
            $word -> description = "A type of energy that travels through the air in the form of waves";
            $word -> category_id = 4;
            $word -> save();
        }

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
            $word -> description = "A 9vs9 bat game in which players try to hit a ball thrown by the opposing team's pitcher and then run around four bases";
            $word -> category_id = 5;
            $word -> save();

            $word = new Word;
            $word -> name = "Boxing";
            $word -> description = "A combat sport in which two people, usually wearing gloves, fight each other";
            $word -> category_id = 5;
            $word -> save();
        }

        //Geography
        {
            $word = new Word;
            $word -> name = "Continent";
            $word -> description = "One of the seven large land masses on Earth";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "River";
            $word -> description = "A natural flowing watercourse, often emptying into an ocean";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Mountain";
            $word -> description = "A large natural elevation of the earth's surface";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Island";
            $word -> description = "A piece of land surrounded by water";
            $word -> category_id = 6;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Desert";
            $word -> description = "A barren area of land where little precipitation occurs";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Ocean";
            $word -> description = "A vast body of saltwater that covers almost 71 percent of the earth's surface";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Volcano";
            $word -> description = "A mountain that opens downward to a pool of molten rock";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Peninsula";
            $word -> description = "A piece of land almost surrounded by water";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Tundra";
            $word -> description = "A vast, flat, treeless Arctic region of Europe, Asia, and North America";
            $word -> category_id = 6;
            $word -> save();

            $word = new Word;
            $word -> name = "Coast";
            $word -> description = "The land near the sea or ocean";
            $word -> category_id = 6;
            $word -> save();
        }

        //Computer Science
        {
            $word = new Word;
            $word -> name = "Monitor";
            $word -> description = "Display device used to visually the output of a computer";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Keyboard";
            $word -> description = "Input device that allows the user to input characters into the computer by pressing keys";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Mouse";
            $word -> description = "A pointing device that allows the user to control the movement of the cursor on the computer screen";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Printer";
            $word -> description = "Device that produces a physical copy of electronic documents or images";
            $word -> category_id = 7;
            $word -> save();
            
            $word = new Word;
            $word -> name = "Scanner";
            $word -> description = "Input device that captures images, documents, or other physical objects and converts them into digital images";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Webcam";
            $word -> description = "A camera that captures video and audio and sends it over the internet in real-time";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Headset";
            $word -> description = "A combination of headphones and microphone";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Speaker";
            $word -> description = "A device that produces audio output from a computer";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "USB";
            $word -> description = "A portable storage device that provides additional storage capacity and to transfer data";
            $word -> category_id = 7;
            $word -> save();

            $word = new Word;
            $word -> name = "Joystick";
            $word -> description = "Input gaming device that allows the user to control the movement";
            $word -> category_id = 7;
            $word -> save();
        }
    }
}
