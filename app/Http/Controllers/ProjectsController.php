<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    /**
     * Show the page to create a new project.
     */
    public function create()
    {
        return view('projects.create', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Store a new project in the database.
     *
     * @param Request $request
     * @return array
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        Project::forceCreate([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);

        return ['message' => 'Project Created!'];
    }
}
