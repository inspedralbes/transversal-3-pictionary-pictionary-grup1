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

        if ($category != "null" && $difficulty == "null") {
            $word = Word::inRandomOrder()->where("category_id", $category)->limit(1)->get(); 
        } else if ($category == "" && $difficulty != "") {
            $word = Word::inRandomOrder()->where("difficulty", $difficulty)->limit(1)->get();  
        } else {
            $word = Word::inRandomOrder()->first();  
        }
        
        return response()->json(['wordToCheck' => $word]);
    }
}