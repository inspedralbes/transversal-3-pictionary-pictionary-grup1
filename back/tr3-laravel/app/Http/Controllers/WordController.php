<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;

class WordController extends Controller
{
    public function getWord(Request $request)
    {  
        $category = $request -> category;
        $difficulty = $request -> difficulty;
        $amount = $request -> amount;

        if ($category != "null" && $difficulty == "null") {
            $word = Word::inRandomOrder()->where("category_id", $category)->limit($amount)->get(); 
        } else if ($category == "" && $difficulty != "") {
            $word = Word::inRandomOrder()->where("difficulty", $difficulty)->limit($amount)->get();  
        } else {
            $word = Word::inRandomOrder()->limit($amount)->get();  
        }
        
        return response()->json(['wordToCheck' => $word]);
    }
}