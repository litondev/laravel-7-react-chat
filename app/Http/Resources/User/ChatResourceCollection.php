<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ChatResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "data" => ChatResource::collection($this->collection),
            "pagination" => [
                "total" => $this->total(),
                "perPage" => $this->perPage(),
                "currentPage" => $this->currentPage(),
                "lastPage" => $this->lastPage()
            ]
        ];    
    }
}
