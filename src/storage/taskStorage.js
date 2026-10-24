
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@smart_todo_tasks_v1';

export async function loadTasks() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  const parsed = JSON.parse(raw);

  return Array.isArray(parsed) ? parsed : [];
}

export async function saveTasks(tasks) {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
}
