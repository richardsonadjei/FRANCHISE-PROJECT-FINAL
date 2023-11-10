import React, { useState, useEffect } from 'react';

const ToDoTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks'); // Assuming your backend has an endpoint for tasks
      if (response.ok) {
        const result = await response.json();
        setTasks(result.tasks);
      } else {
        console.error('Error fetching tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask,
          completed: false,
        }),
      });

      if (response.ok) {
        console.log('Task added successfully');
        setNewTask('');
        fetchTasks();
      } else {
        console.error('Error adding task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const toggleTaskStatus = async (taskId, completed) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      if (response.ok) {
        console.log('Task status updated successfully');
        fetchTasks();
      } else {
        console.error('Error updating task status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task status:', error.message);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Task removed successfully');
        fetchTasks();
      } else {
        console.error('Error removing task:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing task:', error.message);
    }
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans mx-auto overflow-y-auto max-h-screen mt-28 px-4 my-8">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              onClick={addTask}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {tasks.map((task) => (
            <div key={task._id} className="flex mb-4 items-center">
              <p className={`w-full ${task.completed ? 'line-through text-green' : 'text-grey-darkest'}`}>
                {task.title}
              </p>
              <button
                className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white ${
                  task.completed ? 'text-grey border-grey hover:bg-grey' : 'text-green border-green hover:bg-green'
                }`}
                onClick={() => toggleTaskStatus(task._id, task.completed)}
              >
                {task.completed ? 'Not Done' : 'Done'}
              </button>
              <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                onClick={() => removeTask(task._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoTask;
