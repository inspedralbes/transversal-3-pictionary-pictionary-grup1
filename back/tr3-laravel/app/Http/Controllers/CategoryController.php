<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;
use App\Models\Word;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Cast\Object_;

class CategoryController extends Controller
{
    public function checkCategoryDuplicated($request, $privacy)
    {
        $canCreate = true;

        //If the user is logged we continue to check if the category is duplicated.
        $findDuplicated = Category::where('name', strtoupper($request -> name))
        ->where('creator_id', $request->session()->get('userId'))
        ->where('privacy', $privacy)
        ->count();
        
        //If the category is duplicated or -1 we can't create the category.
        if ($findDuplicated != 0) {
            $canCreate = false;
        }

        return $canCreate;
    }

    public function checkUserLogged($request)
    {
        $userId = null;

        //Check if the user is logged, returns 'null' if the user is not logged in.
        [$id, $token] = explode('|', $request -> token, 2);
        $accessToken = PersonalAccessToken::find($id);

        if (hash_equals($accessToken->token, hash('sha256', $token))) {
            $userId = $accessToken -> tokenable_id;
            $request->session()->put('userId', $userId);
        }

        return $userId;
    }

    public function addCategory(Request $request)
    {
        $wrongWords = [];
        $userRequest = $request;
        $privacy = 'private';
        $categoryAdded = (object)[];
        $repetido = false;
        //Set privacy
        if ($request -> public) {
            $privacy = 'public';
        } 
         
        $validator =  Validator::make($request->all(), [
            'name' => 'required',
        ]);

        //If the validation does not fail we continue.
        if ($validator->fails()) {
            $sendCategory = (object) 
            ["valid" => false,
            'message' => "Validation errors."
            ];
        } else {
            //Check if the user is logged in.
            $userId = $this->checkUserLogged($request);
            $createCategory = false;

            //If the user is logged in we check if we can create the category.
            if ($userId != null) {
                $createCategory = $this->checkCategoryDuplicated($request, $privacy);
            } else {
                $sendCategory = (object) 
                ["valid" => false,
                'message' => 'User is not logged in.',
                ];
            }
            
            //If we can create the category we add it with the user id after checking that all the words are valid.
            if ($createCategory) {

                //Check for each word if it already exists.
                $words = (json_decode($request -> words));
                for ($i = 0; $i < count ($words); $i++) { 
                    $currentWord = $words[$i] -> name;
                    for ($j = 0; $j < count ($words); $j++) { 
                        if (($i != $j) && (strcasecmp($currentWord, $words[$j] -> name) == 0)) {
                            if (!in_array(strtolower($currentWord), $wrongWords)) {
                                array_push($wrongWords, strtolower($currentWord));
                            }
                        }
                    }
                }

                if ((empty($wrongWords)))  {
                    $category = new Category;
                    $category -> name = strtoupper($request -> name);
                    $category -> creator_id = $request->session()->get('userId');
                    $category -> privacy = $privacy;
                    $category -> save();
                    $categoryAdded = $category;

                    for ($i = 0; $i < count ($words); $i++) { 
                        $word = new Word;
                        $word -> name = $words[$i] -> name;
                        $word -> description = $words[$i] -> description;
                        $word -> category_id = $categoryAdded -> id;
                        $word -> save();
                    }

                    $sendCategory = (object) 
                    ["valid" => true,
                    'message' => $category,
                    ];

                } else {
                    $sendCategory = (object) 
                    ["valid" => false,
                    'message' => 'One or more words are repeated.',
                    'wrongWords' => $wrongWords,
                    ];
                }

            } else {
                $sendCategory = (object) 
                ["valid" => false,
                'message' => "Category already exists."
                ];
            }
        } 

        return response() -> json($sendCategory);
    }

    public function getCategories ()
    {  
        //Request $request
        $privacy = 'public';
        $privateCategories = [];
        $publicCategories = [];
        $categories = (object) ['public'=> [], 'private' => []];

        //$request -> privacy == 'both'
        if ($privacy == 'both') {
            //Get all private categories where the user is the creator.
            $getPrivate = Category::where('privacy', 'private')
            -> where('creatorId', $request->session()->get('userId'))
            -> get();
                $creatorName = User::where('id', $request->session()->get('userId')) -> first();
                for ($i = 0; $i < count($getPrivate); $i ++) { 
                    $numberWords = Word::where('category_id', $getPrivate[$i] -> id) -> count();
                    $words = Word::where('category_id', $getPrivate[$i] -> id) -> get();
                    $category = (object) 
                    [
                        'categoryId'=> $getPrivate[$i] -> id,
                        'categoryName' => $getPrivate[$i] -> name,
                        'numberOfWords' => $numberWords,
                        'words' => $words,
                        'createdBy' => $creatorName,
                        'createdAt' => $getPrivate[$i] -> created_at -> format('d/m/Y')
                    ];
                    $privateCategories[$i] = $category;
                }
        }

        $getPublic = Category::where('privacy', 'public') -> get();
            for ($i = 0; $i < count($getPublic); $i ++) { 
                if ($getPublic[$i] -> creator_id != null) {
                    $creator = User::where('id', $getPublic[$i] -> creator_id) -> first();
                    $creatorName = $creator -> name;
                } else {
                    $creatorName = 'SYSTEM'; 
                }

                $numberWords = Word::where('category_id', $getPublic[$i] -> id) -> count();
                $words = Word::where('category_id', $getPublic[$i] -> id) -> get();
                $category = (object) 
                [
                    'categoryId'=> $getPublic[$i] -> id,
                    'categoryName' => $getPublic[$i] -> name,
                    'numberOfWords' => $numberWords,
                    'words' => $words,
                    'createdBy' => $creatorName,
                    'createdAt' => $getPublic[$i] -> created_at -> format('d/m/Y')
                ];
                $publicCategories[$i] = $category;
            }

        $categories -> private = $privateCategories;
        $categories -> public = $publicCategories;

        return response() -> json($categories);
    }
}