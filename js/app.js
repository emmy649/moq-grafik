// === ПРЕМИНАВАНЕ МЕЖДУ ТАБОВЕ ===
function formatDate(dateString) {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
  
    // Преобразуваме на български
    return date.toLocaleDateString('bg-BG', options);
  }
  

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.add('hidden'));
  
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.remove('hidden');
  }
  
  // === ЗАДАЧИ ===
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    let taskText = task.text;

    if (task.date) {
        taskText += ` 📅 ${formatDate(task.date)}`;
      }
      

    li.textContent = taskText;

    if (task.completed) {
      li.classList.add('completed');
    }

    li.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Изтрий';
    delBtn.classList.add('delete');
    delBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = taskDate.value;

  if (text !== '') {
    tasks.push({ text, date: date || null, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskDate.value = '';
  }
}

renderTasks();


  // === ГРАФИК ПО ЧАСОВЕ ===
const scheduleTime = document.getElementById('scheduleTime');
const scheduleText = document.getElementById('scheduleText');
const scheduleList = document.getElementById('scheduleList');

let schedule = JSON.parse(localStorage.getItem('schedule')) || [];

function saveSchedule() {
  localStorage.setItem('schedule', JSON.stringify(schedule));
}

function renderSchedule() {
  scheduleList.innerHTML = '';
  schedule.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.time} – ${item.text}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Изтрий';
    delBtn.classList.add('delete');
    delBtn.onclick = () => {
      schedule.splice(index, 1);
      saveSchedule();
      renderSchedule();
    };

    li.appendChild(delBtn);
    scheduleList.appendChild(li);
  });
}

function addSchedule() {
  const time = scheduleTime.value;
  const text = scheduleText.value.trim();
  if (time && text) {
    schedule.push({ time, text });
    saveSchedule();
    renderSchedule();
    scheduleTime.value = '';
    scheduleText.value = '';
  }
}

// Първоначално зареждане:
renderSchedule();

// === РЕЖИМ / НАВИЦИ ===
const habitInput = document.getElementById('habitInput');
const habitList = document.getElementById('habitList');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = '';
  habits.forEach((habit, index) => {
    const li = document.createElement('li');
    li.textContent = habit.text;

    if (habit.done) {
      li.classList.add('completed');
    }

    li.onclick = () => {
      habit.done = !habit.done;
      saveHabits();
      renderHabits();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Изтрий';
    delBtn.classList.add('delete');
    delBtn.onclick = (e) => {
      e.stopPropagation();
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    };

    li.appendChild(delBtn);
    habitList.appendChild(li);
  });
}

function addHabit() {
  const text = habitInput.value.trim();
  if (text) {
    habits.push({ text, done: false });
    saveHabits();
    renderHabits();
    habitInput.value = '';
  }
}

// Първоначално зареждане
renderHabits();

  