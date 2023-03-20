<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;

class CategoryController extends Controller
{
    public function checkCategoryDuplicated($categoryData)
    {
        $canCreate = true;
        $userId = null;
        $findDuplicated = -1;

        //Check if the user is logged.
        [$id, $token] = explode('|', $categoryData -> token, 2);
        $accessToken = PersonalAccessToken::find($id);

        if (hash_equals($accessToken->token, hash('sha256', $token))) {
            $userId = $accessToken -> tokenable_id;
        }

        //If the user is logged we continue to check if the category is duplicated.
        if ($userId != null) {
            $findDuplicated = Category::where('name', strtoupper($categoryData -> name))
            ->where('creator_id', $userId)
            ->count();
        } else {
            $canCreate = false;
        }

        //If the category is duplicated or -1 we can't create the category.
        if ($findDuplicated != 0) {
            $canCreate = false;
        }

        return $canCreate;
    }

    public function register(Request $request)
    {
        $validator =  Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:25'
        ]);

        if ($validator->fails()) {
            $sendCategory = (object) 
            ["valid" => false,
            'message' => "Validation errors."
            ];
        } else {
            $createCategory = $this->checkCategoryDuplicated($request);

            if ($createCategory) {
                $category = new Category;
                $category -> name = strtoupper($request -> name);
                $category -> creator_id = $request -> creator_id;
                $category -> save();

                $sendCategory = (object) 
                ["valid" => true,
                'message' => $category,
                ];
            } else {
                $sendCategory = (object) 
                ["valid" => false,
                'message' => "Category already created."
                ];
            }
        } 

        return response() -> json($sendCategory);
    }
}