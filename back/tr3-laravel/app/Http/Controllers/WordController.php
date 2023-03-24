<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;

class WordController extends Controller
{
    public function getWords(Request $request)
    {  
        $words = Word::inRandomOrder()->whereIn("category_id", $request -> category)->limit($request -> amount)->get(); 

        return response()->json($words);
    }
}