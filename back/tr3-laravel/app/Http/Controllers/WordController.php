<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WordController extends Controller
{
    public function getWord()
    {
        $jsonFile = json_decode(file_get_contents('C:\Users\Jaume\Desktop\Pictionary\transversal-3-pictionary-pictionary-grup1\back\food.json'), true);
        $randomIndex = rand(0, count($jsonFile['food']) - 1);
        $wordToCheck = $jsonFile['food'][$randomIndex]['name'];

        return response()->json(['wordToCheck' => $wordToCheck]);
        
    }

    public function checkWord(Request $request)
    {
        $userWord = strtolower($request->input('word'));
        $wordToCheck = strtolower($request->input('wordToCheck'));

        if ($wordToCheck == $userWord) {
            return response()->json(['result' => 'Correct!!!!', 'wordToCheck' => $wordToCheck]);
        } else {
            return response()->json(['result' => 'Incorrect.', 'wordToCheck' => $wordToCheck]);
        }
    }
}
