// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDv4J09XPxG-4VYG_oCV5BAa_rsIszoBfM",
  authDomain: "family-todo-f1424.firebaseapp.com",
  databaseURL: "https://family-todo-f1424-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "family-todo-f1424",
  storageBucket: "family-todo-f1424.firebasestorage.app",
  messagingSenderId: "780204411967",
  appId: "1:780204411967:web:9c639f071fa67d610d3c8a"
};

// Connect to Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Test Firebase connection
const testConnection = async () => {
  try {
      const testRef = db.ref('test');
      await testRef.set({ status: 'connected' });
      console.log('Firebase connection successful.');
  } catch (error) {
      console.error('Firebase connection failed:', error);
  }
};

// Call the testConnection after Firebase is initialized
testConnection();

// Form elements
const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks');

// Add task to Firebase
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = document.getElementById('task-name').value;
  const taskPoints = document.getElementById('task-points').value;

  if (taskName && taskPoints) {
      const newTaskRef = db.ref('tasks').push();
      newTaskRef.set({
          name: taskName,
          points: parseInt(taskPoints),
          done: false
      });

      taskForm.reset();
  }
});

// Display tasks from Firebase
db.ref('tasks').on('value', (snapshot) => {
  tasksList.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
      const task = childSnapshot.val();
      const li = document.createElement('li');
      li.textContent = `${task.name} - ${task.points} points`;
      tasksList.appendChild(li);
  });
});
