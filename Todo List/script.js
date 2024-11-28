document.addEventListener("DOMContentLoaded", () => {
    const addModal = document.getElementById("task-modal");
    const inProgressModal = document.getElementById("inprogress-modal");
    const completedModal = document.getElementById("completed-modal");
    const closeModalBtns = document.querySelectorAll(".close-btn");
    const saveTaskBtn = document.getElementById("save-task-btn");
    const completeTaskBtn = document.getElementById("complete-task-btn");
    const inProgressBtn = document.getElementById("inprogress-task-btn");
    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    let currentColumn = "";
    let selectedTask = null;
    let selectedTaskForProgress = null;

    // Open the Add Task modal
    addTaskBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            currentColumn = e.target.dataset.column;
            addModal.style.display = "flex";
        });
    });

    // Close modals
    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            addModal.style.display = "none";
            inProgressModal.style.display = "none";
            completedModal.style.display = "none";
            taskTitleInput.value = "";
            taskDescInput.value = "";
        });
    });

// Save the task
saveTaskBtn.addEventListener("click", () => {
    const title = taskTitleInput.value.trim();
    const desc = taskDescInput.value.trim();

    if (!title) {
        alert("Task title is required.");
        return;
    }

    const taskList = document.getElementById(`${currentColumn}-tasks`);
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <h4>${title}</h4>
        <p>${desc}</p>
    `;

    // Handle different cases based on the column the task is added to
    if (currentColumn === "todo") {
        // If the task is in the todo column, add the "Mark as In Progress" button
        const markInProgressBtn = document.createElement("button");
        markInProgressBtn.classList.add("mark-inprogress-btn");
        markInProgressBtn.textContent = "Mark as In Progress";
        taskItem.appendChild(markInProgressBtn);

        markInProgressBtn.addEventListener("click", () => {
            selectedTaskForProgress = taskItem;
            inProgressModal.style.display = "flex";
        });
    } else if (currentColumn === "inprogress") {
        // If the task is in the in-progress column, add the "Mark as Completed" button
        const markCompletedBtn = document.createElement("button");
        markCompletedBtn.classList.add("mark-completed-btn");
        markCompletedBtn.textContent = "Mark as Completed";
        taskItem.appendChild(markCompletedBtn);

        markCompletedBtn.addEventListener("click", () => {
            const completedTasks = document.getElementById("completed-tasks");

            // Remove the task from the In Progress column
            taskItem.remove();

            // Add the task to the Completed column with crossed-out text
            const completedTaskItem = document.createElement("div");
            completedTaskItem.classList.add("task-item");
            completedTaskItem.innerHTML = `
                <h4 style="text-decoration: line-through;">${taskItem.querySelector('h4').textContent}</h4>
                <p style="text-decoration: line-through;">${taskItem.querySelector('p').textContent}</p>
            `;
            completedTasks.appendChild(completedTaskItem);
        });
    } else if (currentColumn === "completed") {
        // If the task is in the completed column, apply the strike-through immediately
        const taskTitle = taskItem.querySelector("h4");
        const taskDesc = taskItem.querySelector("p");

        // Apply line-through style to both title and description
        taskTitle.style.textDecoration = "line-through";
        taskDesc.style.textDecoration = "line-through";
    }

        // Append the task to the appropriate column
        taskList.appendChild(taskItem);

        // Close the modal after adding the task
        addModal.style.display = "none";
        taskTitleInput.value = "";
        taskDescInput.value = "";
    });

    // Complete the task and move it to the Completed column (if from In Progress)
    completeTaskBtn.addEventListener("click", () => {
        if (selectedTask) {
            const completedTasks = document.getElementById("completed-tasks");

            // Remove the task from the current column
            selectedTask.remove();

            // Add the task to the Completed column with crossed-out style
            const completedTaskItem = document.createElement("div");
            completedTaskItem.classList.add("task-item");
            completedTaskItem.innerHTML = `
                <h4 style="text-decoration: line-through;">${selectedTask.querySelector('h4').textContent}</h4>
                <p style="text-decoration: line-through;">${selectedTask.querySelector('p').textContent}</p>
            `;
            completedTasks.appendChild(completedTaskItem);

            // Close the completed modal
            completedModal.style.display = "none";
        }
    });

    // Move task to In Progress column
    inProgressBtn.addEventListener("click", () => {
        if (selectedTaskForProgress) {
            const inProgressTasks = document.getElementById("inprogress-tasks");

            // Remove the task from the current column
            selectedTaskForProgress.remove();

            // Add the task to the In Progress column
            const inProgressTaskItem = document.createElement("div");
            inProgressTaskItem.classList.add("task-item");
            inProgressTaskItem.innerHTML = `
                <h4>${selectedTaskForProgress.querySelector('h4').textContent}</h4>
                <p>${selectedTaskForProgress.querySelector('p').textContent}</p>
                <button class="mark-completed-btn">Mark as Completed</button>
            `;
            inProgressTasks.appendChild(inProgressTaskItem);

            // Add event listener for marking tasks as completed
            const markCompletedBtn = inProgressTaskItem.querySelector(".mark-completed-btn");
            markCompletedBtn.addEventListener("click", () => {
                const completedTasks = document.getElementById("completed-tasks");

                // Remove the task from the In Progress column
                inProgressTaskItem.remove();

                // Add the task to the Completed column with crossed out text
                const completedTaskItem = document.createElement("div");
                completedTaskItem.classList.add("task-item");
                completedTaskItem.innerHTML = `
                    <h4 style="text-decoration: line-through;">${inProgressTaskItem.querySelector('h4').textContent}</h4>
                    <p style="text-decoration: line-through;">${inProgressTaskItem.querySelector('p').textContent}</p>
                `;
                completedTasks.appendChild(completedTaskItem);
            });

            // Close the In Progress modal
            inProgressModal.style.display = "none";
        }
    });

    // Manually add tasks to Completed with strikethrough
    document.getElementById("add-to-completed-btn").addEventListener("click", () => {
        const title = prompt("Enter task title:");
        const description = prompt("Enter task description:");
        if (title && description) {
            const completedTasks = document.getElementById("completed-tasks");

            // Create a new task item and apply strikethrough style
            const completedTaskItem = document.createElement("div");
            completedTaskItem.classList.add("task-item");
            completedTaskItem.innerHTML = `
                <h4 style="text-decoration: line-through;">${title}</h4>
                <p style="text-decoration: line-through;">${description}</p>
            `;
            completedTasks.appendChild(completedTaskItem);
        }
    });
});