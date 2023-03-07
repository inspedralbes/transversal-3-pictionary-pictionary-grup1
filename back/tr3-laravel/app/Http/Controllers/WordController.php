<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WordController extends Controller
{
    public function checkWord(Request $request)
    {
        $wordToCheck = "example"; // Replace with the word you want to check
        $userWord = $request->input('word');

        if ($wordToCheck == $userWord) {
            return "Correct!!!!";
        } else {
            return "Incorrect.";
        }
    }
}
