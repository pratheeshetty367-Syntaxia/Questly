import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import useTasks from './src/hooks/useTasks';
import { setupReminders } from './src/utils/reminders';
import { COLORS } from './src/constants/theme';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const {
  tasks,
  loading,
  error,
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  totalXP,
  level,
  currentLevelXP,
  xpToNextLevel,
  completedToday,
  dailyChallengeGoal,
  dailyChallengeBonus,
  challengeCompleted,
} = useTasks();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [route, setRoute] = useState({ name: 'home' });

  useEffect(() => {
    setupReminders();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (route.name === 'home') return false;

        if (route.name === 'edit') {
          setRoute({ name: 'detail', id: route.id });
        } else {
          setRoute({ name: 'home' });
        }

        return true;
      }
    );

    return () => subscription.remove();
  }, [route, isLoggedIn]);

  const goHome = () => setRoute({ name: 'home' });

  const currentTask = route.id
    ? tasks.find((t) => t.id === route.id)
    : undefined;

  let screen;

  if (!isLoggedIn) {
    screen = (
      <LoginScreen
        onLogin={() => {
          setIsLoggedIn(true);
          setRoute({ name: 'home' });
        }}
      />
    );
  } else if (route.name === 'add') {
    screen = (
      <TaskFormScreen
        onCancel={goHome}
        onSave={async (data) => {
          await addTask(data);
          goHome();
        }}
      />
    );
  } else if (route.name === 'edit' && currentTask) {
    screen = (
      <TaskFormScreen
        task={currentTask}
        onCancel={() =>
          setRoute({ name: 'detail', id: currentTask.id })
        }
        onSave={async (data) => {
          await updateTask(currentTask.id, data);
          setRoute({ name: 'detail', id: currentTask.id });
        }}
      />
    );
  } else if (route.name === 'detail' && currentTask) {
    screen = (
      <TaskDetailScreen
        task={currentTask}
        onBack={goHome}
        onEdit={() =>
          setRoute({ name: 'edit', id: currentTask.id })
        }
        onToggle={toggleTask}
        onDelete={async (id) => {
          await deleteTask(id);
          goHome();
        }}
      />
    );
  } else {
    screen = (
      <HomeScreen
  tasks={tasks}
  loading={loading}
  error={error}
  onAdd={() => setRoute({ name: 'add' })}
  onOpen={(id) => setRoute({ name: 'detail', id })}
  onToggle={toggleTask}
  totalXP={totalXP}
  level={level}
  currentLevelXP={currentLevelXP}
  xpToNextLevel={xpToNextLevel}
  completedToday={completedToday}
  dailyChallengeGoal={dailyChallengeGoal}
  dailyChallengeBonus={dailyChallengeBonus}
  challengeCompleted={challengeCompleted}
/>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
      >
        <StatusBar style="light" />
        {screen}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
