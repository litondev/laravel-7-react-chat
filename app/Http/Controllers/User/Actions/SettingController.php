<?php

namespace App\Http\Controllers\User\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Http\Resources\User\SettingResourceCollection;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(new SettingResourceCollection(Setting::all()));
    }
}
