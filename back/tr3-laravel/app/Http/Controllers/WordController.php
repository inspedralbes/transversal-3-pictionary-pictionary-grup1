<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WordController extends Controller
{
    public function getWord()
    {  
        $jsonFile = json_decode(file_get_contents('food.json'), true);
        $randomIndex = rand(0, count($jsonFile['food']) - 1);
        $wordToCheck = $jsonFile['food'][$randomIndex]['name'];

        return response()->json(['wordToCheck' => $wordToCheck]);
        
    }
}