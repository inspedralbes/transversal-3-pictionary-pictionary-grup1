<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrivateCategory;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;

class PrivateCategoryController extends Controller
{
    public function checkCategoryDuplicated($categoryData)
    {
        $canCreate = true;

        //If the user is logged we continue to check if the category is duplicated.
        $findDuplicated = Category::where('name', strtoupper($categoryData -> name))
        ->where('creator_id', $request->session()->get('userId'))
        ->count();

        //If the category is duplicated or -1 we can't create the category.
        if ($findDuplicated != 0) {
            $canCreate = false;
        }

        return $canCreate;
    }

    public function checkUserLogged($categoryData)
    {
        $userId = null;

        //Check if the user is logged.
        [$id, $token] = explode('|', $categoryData -> token, 2);
        $accessToken = PersonalAccessToken::find($id);

        if (hash_equals($accessToken->token, hash('sha256', $token))) {
            $userId = $accessToken -> tokenable_id;
            $request->session()->put('userId', $user -> id);
        }

        return $userId;
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
            $userId = $this->checkUserLogged($request);
            $createCategory = false;

            if ($userId != null) {
                $createCategory = $this->checkCategoryDuplicated($request);
            } else {
                $sendCategory = (object) 
                ["valid" => false,
                'message' => 'User is not logged in.',
                ];
            }
            
            if ($createCategory) {
                $category = new PrivateCategory;
                $category -> name = strtoupper($request -> name);
                $category -> creator_id = $request->session()->get('userId');
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