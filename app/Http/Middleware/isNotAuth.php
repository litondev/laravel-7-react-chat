<?php

namespace App\Http\Middleware;

use Closure;

class isNotAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->user()){
            if (request()->ajax() || request()->wantsJson()) {
                return response()->json([
                    'message' => 'Access Danied'
                ], 403);
            }

            abort(403);
        }

        return $next($request);
    }
}
