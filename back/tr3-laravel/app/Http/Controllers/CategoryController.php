<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function newCategory($userData) {
        
        
        return response() -> json($categoryAdded);
    }
}
