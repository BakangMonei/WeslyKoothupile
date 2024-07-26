const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://weslykoothupile-a008f-default-rtdb.firebaseio.com'
});

const db = admin.firestore();
const app = express();

app.use(bodyParser.json());

app.get('/tasks', async (req, res) => {
  const snapshot = await db.collection('tasks').get();
  const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = req.body;
  const docRef = await db.collection('tasks').add(newTask);
  res.json({ id: docRef.id, ...newTask });
});

app.put('/tasks/:id', async (req, res) => {
  const task = req.body;
  await db.collection('tasks').doc(req.params.id).set(task, { merge: true });
  res.json({ id: req.params.id, ...task });
});

app.delete('/tasks/:id', async (req, res) => {
  await db.collection('tasks').doc(req.params.id).delete();
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
