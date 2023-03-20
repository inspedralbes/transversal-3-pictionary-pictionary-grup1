<?php

namespace App\Http\Controllers;

use App\Models\PrivateCategory;
use Illuminate\Http\Request;

class PrivateCategoryController extends Controller
{
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
            $createCategory = $this->checkUserDuplicated($request);

            if ($createCategory) {
                $user = new User;
                $user -> name = strtolower($request -> name);
                $user -> email = strtolower($request -> email);
                $user -> password = Hash::make($request -> password);
                $user -> save();

                $request->session()->put('userId', $user -> id);
                $request->session()->save();
                $token = $user->createToken('token')->plainTextToken;
                $sendCategory = (object) 
                ["valid" => true,
                'message' => $request->session()->get("userId"),
                'token' => $token
                ];
            } else {
                $duplicated = $this->findWhatIsDuplicated($request);
                $sendCategory = (object) 
                ["valid" => false,
                'message' => "Name already in use."
                ];
                
                if ($duplicated == 'email') {
                    $sendCategory = (object) 
                    ["valid" => false,
                    'message' => "Email already registered."
                    ];
                }
                
            }
        } 

        return response() -> json($sendCategory);
    }
}
