<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;

class WordController extends Controller
{
    public function getWord($category, $difficulty)
    {  
        if ($category == "" || $difficulty == "") {
            if ($category == "") {
                $word = Word::inRandomOrder()->where("category_id", $category)->limit(1)->get(); 
            } else {
                $word = Word::inRandomOrder()->where("difficulty", $difficulty)->limit(1)->get();  
            }
        } else {
            $word = Word::inRandomOrder()->limit(1)->get();    
        }

        return response()->json(['wordToCheck' => $word]);
    }
}