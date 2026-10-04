import fs from "fs";
function loadTasks() {
    if (!fs.existsSync("tasks.json")) {
        fs.writeFileSync("tasks.json", "[]");
        return [];

    }

    return JSON.parse(fs.readFileSync("tasks.json", "utf8"));
}
let data = loadTasks();
function saveTasks() {
    fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
}

//=========================
// functions 
function addTask(name) {
    if (!name) {
        console.log("Task description is required.");
        return;
    }
    let taskId = Math.max(...data.map((task) => task.id), 0) + 1;

    const now = new Date().toISOString();
    data.push({
    id: taskId,
    description: name,
    status: "todo",
    createdAt: now,
    updatedAt: now
});
    saveTasks();
    console.log(`Task "${taskId}" added successfully.`);
}
function listTasks() {
    console.log("Task List:");
    data.forEach((task) => {
        console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`);
    });
}
function updateTask(id, name) {
    if (!id) {
        console.log("Task ID is required.");
        return;
    }

    if (!name) {
        console.log("Task description is required for update.");
        return;
    }

    let task = data.find((task) => task.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.description = name;
    task.updatedAt = new Date().toISOString();

    saveTasks();

    console.log(`Task "${id}" updated successfully.`);
}
function deleteTask(id) {
    if (!id) {
        console.log("Task ID is required.");
        return;
    }
    let taskIndex = data.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    data.splice(taskIndex, 1);
    saveTasks();

    console.log(`Task "${id}" deleted successfully.`);
}
function markInProgress(id) {
    if (!id) {
        console.log("Task ID is required.");
        return;
    }
    let task = data.find((task) => task.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = "in-progress";
    task.updatedAt = new Date().toISOString();

    saveTasks();

    console.log(`Task "${id}" marked as In Progress.`);
}
function markCompleted(id) {
    if (!id) {
        console.log("Task ID is required.");
        return;
    }
    let task = data.find((task) => task.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = "done";
    task.updatedAt = new Date().toISOString();

    saveTasks();

    console.log(`Task "${id}" marked as done.`);
}
function listDone() {
    console.log("Completed Tasks:");
    let tasks = data.filter((task) => task.status === "done");
    tasks.forEach((task) => {
        console.log(`ID: ${task.id}, Description: ${task.description}`);
    });
}
function listInProgress() {
    console.log("In Progress Tasks:");
    let tasks = data.filter((task) => task.status === "in-progress");
    tasks.forEach((task) => {
        console.log(`ID: ${task.id}, Description: ${task.description}`);
    });
}
function listTodo(){
    console.log("To Do Tasks:");
    let tasks = data.filter((task) => task.status === "todo");
    tasks.forEach((task) => {
        console.log(`ID: ${task.id}, Description: ${task.description}`);
    }     )  

}
// =====================
const command = process.argv[2];
if (command === "add") {
    addTask(process.argv[3]);
} else if (command === "list") {
    if (process.argv[3] === "done") {
        listDone();
    } else if (process.argv[3] === "in-progress") {
        listInProgress();

    } else if (process.argv[3] === "todo") {
        listTodo();
    } else {
        listTasks();
    }

} else if (command === "update") {
    let id = Number(process.argv[3]);
    let name = process.argv[4];
    updateTask(id, name);
} else if (command === "delete") {
    let id = Number(process.argv[3]);
    deleteTask(id);
} else if (command === "mark-in-progress") {
    let id = Number(process.argv[3]);
    markInProgress(id);
} else if (command === "mark-done") {
    let id = Number(process.argv[3]);
    markCompleted(id);
}
