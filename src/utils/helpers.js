
export const PRIORITIES = ['High', 'Medium', 'Low'];
export const FILTERS = ['All', 'Pending', 'Completed'];
export const SORTS = ['Priority', 'Due date'];

const PRIORITY_WEIGHT = { High: 0, Medium: 1, Low: 2 };

export function generateId() {
  return Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8);
}

// Validate a real date written as YYYY-MM-DD
export function isValidDate(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;

  const [y, m, d] = text.split('-').map(Number);
  const dt = new Date(y, m - 1, d);

  return dt.getFullYear() === y &&
    dt.getMonth() === m - 1 &&
    dt.getDate() === d;
}

// Validate a 24-hour time written as HH:MM
export function isValidTime(text) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(text);
}

// Return validation errors; an empty object means valid
export function validateTask({ title, dueDate, dueTime }) {
  const errors = {};

  if (!title.trim()) {
    errors.title = 'Title is required.';
  } else if (title.trim().length > 80) {
    errors.title = 'Title must be 80 characters or less.';
  }

  if (dueDate.trim() && !isValidDate(dueDate.trim())) {
    errors.dueDate =
      'Use YYYY-MM-DD format, for example 2026-10-25.';
  }

  if (dueTime.trim()) {
    if (!isValidTime(dueTime.trim())) {
      errors.dueTime =
        'Use 24-hour format HH:MM, for example 18:30.';
    } else if (!dueDate.trim()) {
      errors.dueTime = 'Enter a due date before adding a time.';
    }
  }

  return errors;
}

// Convert a task's due date and time to a Date object
export function getDueDateTime(task) {
  if (!task.dueDate) return null;

  const [y, m, d] = task.dueDate.split('-').map(Number);
  let hours = 23;
  let minutes = 59;

  if (task.dueTime) {
    [hours, minutes] = task.dueTime.split(':').map(Number);
  }

  return new Date(y, m - 1, d, hours, minutes, 0, 0);
}

// Check whether a pending task is overdue
export function isOverdue(task, now = new Date()) {
  if (task.completed) return false;

  const due = getDueDateTime(task);

  return due !== null && due.getTime() < now.getTime();
}

// Display the due date and time
export function formatDue(task) {
  if (!task.dueDate) return 'No due date';

  return task.dueTime
    ? task.dueDate + ' ' + task.dueTime
    : task.dueDate;
}

// Calculate dashboard statistics
export function getStats(tasks) {
  const completed = tasks.filter((t) => t.completed).length;

  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
  };
}

// Filter tasks by their completion status
export function filterTasks(tasks, filter) {
  if (filter === 'Pending') {
    return tasks.filter((t) => !t.completed);
  }

  if (filter === 'Completed') {
    return tasks.filter((t) => t.completed);
  }

  return tasks;
}

function dueMillis(task) {
  const due = getDueDateTime(task);

  return due ? due.getTime() : null;
}

// Sort pending tasks first, then by priority or due date
export function sortTasks(tasks, sortBy) {
  const list = [...tasks];

  list.sort((a, b) => {
    const doneDiff =
      Number(a.completed) - Number(b.completed);

    if (doneDiff !== 0) return doneDiff;

    const priorityDiff =
      PRIORITY_WEIGHT[a.priority] -
      PRIORITY_WEIGHT[b.priority];

    if (sortBy === 'Due date') {
      const da = dueMillis(a);
      const db = dueMillis(b);

      if (da !== null && db !== null && da !== db) {
        return da - db;
      }

      if (da !== null && db === null) return -1;
      if (da === null && db !== null) return 1;

      if (priorityDiff !== 0) return priorityDiff;

      return b.createdAt - a.createdAt;
    }

    if (priorityDiff !== 0) return priorityDiff;

    return b.createdAt - a.createdAt;
  });

  return list;
}
