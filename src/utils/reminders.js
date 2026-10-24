
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function setupReminders() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('quest-reminders', {
      name: 'Quest Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#7048FF',
    });
  }

  let { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const permission = await Notifications.requestPermissionsAsync();
    status = permission.status;
  }

  if (status !== 'granted') {
    console.warn('Notification permission was not granted.');
    return false;
  }

  return true;
}

export async function scheduleReminder(task) {
  if (
    !task?.dueDate ||
    !task?.dueTime ||
    task.completed ||
    !task.reminder ||
    task.reminder === 'none'
  ) {
    return null;
  }

  const offsets = {
    at_time: 0,
    '5': 5,
    '10': 10,
    '30': 30,
    '60': 60,
  };

  const offset = offsets[task.reminder];

  if (offset === undefined) return null;

  const [year, month, day] = task.dueDate.split('-').map(Number);
  const [hours, minutes] = task.dueTime.split(':').map(Number);

  const dueDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
  const reminderDate = new Date(dueDate.getTime() - offset * 60_000);

  if (
    Number.isNaN(dueDate.getTime()) ||
    reminderDate <= new Date()
  ) {
    return null;
  }

  const allowed = await setupReminders();
  if (!allowed) return null;

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Quest Reminder',
      body:
        offset === 0
          ? `"${task.title}" is due now. Complete your quest!`
          : `"${task.title}" is due in ${offset} minutes. Complete your quest!`,
      sound: 'default',
      data: { taskId: task.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
      ...(Platform.OS === 'android'
        ? { channelId: 'quest-reminders' }
        : {}),
    },
  });
}

export async function cancelReminder(reminderId) {
  if (!reminderId) return;

  try {
    await Notifications.cancelScheduledNotificationAsync(reminderId);
  } catch (error) {
    console.warn('Could not cancel quest reminder:', error);
  }
}
