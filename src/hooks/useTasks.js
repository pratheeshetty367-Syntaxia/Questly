
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadTasks, saveTasks } from '../storage/taskStorage';
import { generateId } from '../utils/helpers';
import {
  scheduleReminder,
  cancelReminder,
} from '../utils/reminders';

const XP_BY_PRIORITY = {
  High: 100,
  Medium: 60,
  Low: 30,
};

const DAILY_CHALLENGE_GOAL = 3;
const DAILY_CHALLENGE_BONUS = 150;
const XP_PER_LEVEL = 200;

function getLocalDay(timestamp) {
  const date = new Date(timestamp);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function getQuestStats(tasks) {
  const today = getLocalDay(Date.now());

  const completedToday = tasks.filter(
    (task) =>
      task.completed &&
      task.completedAt &&
      getLocalDay(task.completedAt) === today
  ).length;

  const questXP = tasks.reduce(
    (total, task) =>
      total +
      (task.completed
        ? Number(task.xpReward ?? XP_BY_PRIORITY[task.priority] ?? 0)
        : 0),
    0
  );

  const challengeCompleted =
    completedToday >= DAILY_CHALLENGE_GOAL;

  const totalXP =
    questXP +
    (challengeCompleted ? DAILY_CHALLENGE_BONUS : 0);

  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const currentLevelXP = totalXP % XP_PER_LEVEL;

  return {
    totalXP,
    level,
    currentLevelXP,
    xpToNextLevel: XP_PER_LEVEL - currentLevelXP,
    completedToday,
    dailyChallengeGoal: DAILY_CHALLENGE_GOAL,
    dailyChallengeBonus: DAILY_CHALLENGE_BONUS,
    challengeCompleted,
  };
}

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tasksRef = useRef([]);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const saved = await loadTasks();

        if (active) {
          const normalized = saved.map((task) => ({
            ...task,
            completed: Boolean(task.completed),
            xpReward:
              task.xpReward ??
              XP_BY_PRIORITY[task.priority] ??
              XP_BY_PRIORITY.Medium,
            completedAt: task.completedAt ?? null,
          }));

          tasksRef.current = normalized;
          setTasks(normalized);
        }
      } catch (e) {
        if (active) {
          setError('Could not load saved quests.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const commit = useCallback(async (next) => {
    tasksRef.current = next;
    setTasks(next);

    try {
      await saveTasks(next);
      setError('');
    } catch (e) {
      setError('Could not save quests. Please try again.');
    }
  }, []);

  const addTask = useCallback(
    async (data) => {
      const now = Date.now();

      const task = {
        id: generateId(),
        title: data.title.trim(),
        description: (data.description || '').trim(),
        priority: data.priority,
        dueDate: (data.dueDate || '').trim(),
        dueTime: (data.dueTime || '').trim(),
        reminder: data.reminder ?? 'none',
        completed: false,
        completedAt: null,
        xpReward: XP_BY_PRIORITY[data.priority] ?? 60,
        reminderId: null,
        createdAt: now,
        updatedAt: now,
      };

      task.reminderId = await scheduleReminder(task);

      await commit([task, ...tasksRef.current]);

      return task;
    },
    [commit]
  );

  const updateTask = useCallback(
    async (id, data) => {
      const existing = tasksRef.current.find(
        (task) => task.id === id
      );

      if (!existing) return;

      await cancelReminder(existing.reminderId);

      const updated = {
        ...existing,
        title: data.title.trim(),
        description: (data.description || '').trim(),
        priority: data.priority,
        dueDate: (data.dueDate || '').trim(),
        dueTime: (data.dueTime || '').trim(),
        reminder: data.reminder ?? existing.reminder ?? 'none',
        xpReward: existing.completed
          ? existing.xpReward
          : XP_BY_PRIORITY[data.priority] ?? 60,
        updatedAt: Date.now(),
      };

      updated.reminderId = updated.completed
        ? null
        : await scheduleReminder(updated);

      await commit(
        tasksRef.current.map((task) =>
          task.id === id ? updated : task
        )
      );
    },
    [commit]
  );

  const toggleTask = useCallback(
    async (id) => {
      const existing = tasksRef.current.find(
        (task) => task.id === id
      );

      if (!existing) return;

      await cancelReminder(existing.reminderId);

      const completing = !existing.completed;

      const updated = {
        ...existing,
        completed: completing,
        completedAt: completing ? Date.now() : null,
        xpReward:
          existing.xpReward ??
          XP_BY_PRIORITY[existing.priority] ??
          60,
        updatedAt: Date.now(),
      };

      updated.reminderId = completing
        ? null
        : await scheduleReminder(updated);

      await commit(
        tasksRef.current.map((task) =>
          task.id === id ? updated : task
        )
      );
    },
    [commit]
  );

  const deleteTask = useCallback(
    async (id) => {
      const existing = tasksRef.current.find(
        (task) => task.id === id
      );

      if (existing) {
        await cancelReminder(existing.reminderId);
      }

      await commit(
        tasksRef.current.filter((task) => task.id !== id)
      );
    },
    [commit]
  );

  const questStats = getQuestStats(tasks);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    ...questStats,
  };
}
