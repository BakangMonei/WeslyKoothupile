// tasks.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { firestore } from "../database/firebase";

const tasksCollection = collection(firestore, 'tasks');

async function getTasks(email) {
  const q = query(tasksCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return tasks;
}

async function addTask(task) {
  await addDoc(tasksCollection, task);
}

async function updateTask(task) {
  const taskDoc = doc(firestore, 'tasks', task.id);
  await updateDoc(taskDoc, task);
}

async function deleteTask(taskId) {
  const taskDoc = doc(firestore, 'tasks', taskId);
  await deleteDoc(taskDoc);
}

export { getTasks, addTask, updateTask, deleteTask };