// import React, { useEffect, useState } from 'react';
// import './style.css';

// const Main = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/post');
//       if (response.ok) {
//         const tasksData = await response.json();
//         setTasks(tasksData);
//       } else {
//         throw new Error('Failed to fetch tasks');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error scenarios (e.g., show an error message to the user)
//     }
//   };

//   const handleAddTask = async (event) => {
//     event.preventDefault();
  
//     const title = event.target.title.value;
//     const description = event.target.description.value;
  
//     if (title && description) {
//       const newTask = {
//         title: title,
//         description: description,
//         status: 'pending',
//       };
  
//       try {
//         const response = await fetch('http://localhost:5000/post', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newTask),
//         });
  
//         if (response.ok) {
//           event.target.reset();
//           fetchTasks(); // Fetch the updated task list
//         } else {
//           throw new Error('Failed to add task');
//         }
//       } catch (error) {
//         console.error(error);
//         // Handle error scenarios (e.g., show an error message to the user)
//       }
//     }
//   };
  
//   const handleUpdateTaskStatus = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/post/${taskId}`, {
//         method: 'PUT',
//       });
  
//       if (response.ok) {
//         const updatedTask = await response.json();
//         const updatedTasks = tasks.map((task) =>
//           task._id === updatedTask._id ? updatedTask : task
//         );
//         setTasks(updatedTasks);
//         window.alert('Task status updated successfully');
//         fetchTasks()
//       } else {
//         throw new Error('Failed to update task status');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error scenarios (e.g., show an error message to the user)
//     }
//   };
  
  
  
  
  
  
  
  

//   const handleDeleteTask = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/post/${taskId}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         const deletedTask = await response.json();
//         // Remove the deleted task from the tasks state
//         const updatedTasks = tasks.filter((task) => task._id !== taskId);
//         setTasks(updatedTasks);
//         window.alert('Task deleted successfully');
//       } else {
//         throw new Error('Failed to delete task');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error scenarios (e.g., show an error message to the user)
//     }
//   };
  

//   return (
//     <div>
//       <h1>Task Management</h1>

//       <div className="add-task">
//         <h2>Add Task</h2>
//         <form onSubmit={handleAddTask}>
//           <label htmlFor="title">Title:</label>
//           <input type="text" id="title" name="title" required /><br />

//           <label htmlFor="description">Description:</label>
//           <textarea id="description" name="description" required></textarea><br />

//           <input type="submit" value="Add Task" />
//         </form>
//       </div>

//       <div className="task-list">
//         <h2>Task List</h2>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
//               <h3>{task.title}</h3>
//               <p>{task.description}</p>
//               <p>Status: {task.status}</p>
//               <div>
//                   <button onClick={() => handleUpdateTaskStatus(task._id)}>Mark as Completed</button>
//                 <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Main;


import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './style.css';
import { Badge, Button } from 'react-bootstrap';

const Main = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/post');
      if (response.ok) {
        const tasksData = await response.json();
        setTasks(tasksData);
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error(error);
      // Handle error scenarios (e.g., show an error message to the user)
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
  
    const title = event.target.title.value;
    const description = event.target.description.value;
  
    if (title && description) {
      const newTask = {
        title: title,
        description: description,
        status: 'pending',
      };
  
      try {
        const response = await fetch('http://localhost:5000/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
  
        if (response.ok) {
          event.target.reset();
          fetchTasks(); // Fetch the updated task list
          Swal.fire({
            icon: 'success',
            title: 'Task Added',
            text: 'New task has been added successfully!',
          });
        } else {
          throw new Error('Failed to add task');
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add task',
        });
      }
    }
  };
  
  const handleUpdateTaskStatus = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${taskId}`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        const updatedTask = await response.json();
        const updatedTasks = tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
        Swal.fire({
          icon: 'success',
          title: 'Task Updated',
          text: 'Task status updated successfully!',
        });
        fetchTasks();
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task status',
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const deletedTask = await response.json();
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
        Swal.fire({
          icon: 'success',
          title: 'Task Deleted',
          text: 'Task deleted successfully!',
        });
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete task',
      });
    }
  };

  return (
    <div>
      <h1>Task Management</h1>

      <div className="add-task">
        <h2>Add Task</h2>
        <form onSubmit={handleAddTask}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required /><br />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required></textarea><br />

          <input type="submit" value="Add Task" />
        </form>
      </div>

      <div className="task-list">
        <h2>Task List</h2>
        <ul className='list-unstyled'>
          {tasks.map((task) => (
            <li key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><span className='text-lg fw-bold'>Status:</span> <Badge bg='success'>{task.status}</Badge></p>
              <div>
                <Button className='btn btn-success'  disabled={task.status=="completed"} onClick={() => handleUpdateTaskStatus(task._id)}>Mark as Completed</Button>
                <Button className='btn btn-danger ms-3' onClick={() => handleDeleteTask(task._id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
