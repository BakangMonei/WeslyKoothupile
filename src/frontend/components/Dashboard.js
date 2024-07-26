// Dashboard.js
import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
// tasks.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { getTasks, addTask, updateTask, deleteTask } from '../components/Task';
import { auth, firestore } from '../database/firebase';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                const usersCollection = collection(firestore, 'users');
                const getUserData = async () => {
                    const querySnapshot = await getDocs(usersCollection);
                    const userData = querySnapshot.docs.find((doc) => doc.data().uid === user.uid);
                    if (userData) {
                        setUserData(userData.data());
                    }
                };
                getUserData();
                getTasks(user.email).then((tasks) => setTasks(tasks));
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const handleAddTask = (task) => {
        addTask({ ...task, email: user.email }).then(() => {
            getTasks(user.email).then((tasks) => setTasks(tasks));
        });
    };

    const handleUpdateTask = (task) => {
        updateTask(task).then(() => {
            getTasks(user.email).then((tasks) => setTasks(tasks));
        });
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId).then(() => {
            getTasks(user.email).then((tasks) => setTasks(tasks));
        });
    };

    return (
        <div>
            {userData && (
                <h1>
                    Welcome, {userData.firstName} {userData.lastName}!
                </h1>
            )}
            <TaskForm
                addTask={handleAddTask}
                updateTask={handleUpdateTask}
                editingTask={editingTask}
            />
            <TaskList
                tasks={tasks}
                deleteTask={handleDeleteTask}
                setEditingTask={setEditingTask}
            />
        </div>
    );
};

export default Dashboard;