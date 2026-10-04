# Task Tracker CLI

A simple command-line task tracker built with Node.js.
Tasks are stored in a local JSON file.

## project url 
https://roadmap.sh/projects/task-tracker

## Features

* Add tasks
* Update tasks
* Delete tasks
* Mark tasks as in-progress
* Mark tasks as done
* List all tasks
* List tasks by status

## Requirements

* Node.js

## Usage

Add a task:

```bash
node index.js add "Do homework"
```

Update a task:

```bash
node index.js update 1 "Do homework and study"
```

Delete a task:

```bash
node index.js delete 1
```

Mark a task as in-progress:

```bash
node index.js mark-in-progress 1
```

Mark a task as done:

```bash
node index.js mark-done 1
```

List all tasks:

```bash
node index.js list
```

List completed tasks:

```bash
node index.js list done
```

List todo tasks:

```bash
node index.js list todo
```

List in-progress tasks:

```bash
node index.js list in-progress
```

## Storage

Tasks are stored in `tasks.json`. The file is automatically created if it does not exist.

Each task contains:

* `id`
* `description`
* `status`
* `createdAt`
* `updatedAt`

## Technologies

* Node.js
* JavaScript
* Native Node.js File System (`fs`)
* JSON
