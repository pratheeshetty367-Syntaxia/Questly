
import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../constants/theme';
import { formatDue, isOverdue } from '../utils/helpers';
import PriorityBadge from '../components/PriorityBadge';

export default function TaskDetailScreen({
  task,
  onBack,
  onEdit,
  onToggle,
  onDelete,
}) {
  const overdue = isOverdue(task);

  const confirmDelete = () => {
    Alert.alert(
      'Delete task',
      'Are you sure you want to delete "' + task.title + '"?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable onPress={onBack} hitSlop={10}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <Text
        style={[
          styles.title,
          task.completed && styles.titleDone,
        ]}
      >
        {task.title}
      </Text>

      <View style={styles.row}>
        <PriorityBadge priority={task.priority} />

        <Text
          style={[
            styles.status,
            {
              color: task.completed
                ? COLORS.success
                : COLORS.warning,
            },
          ]}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>

      <Text style={styles.label}>Description</Text>
      <Text style={styles.value}>
        {task.description || 'No description'}
      </Text>

      <Text style={styles.label}>Due</Text>
      <Text
        style={[
          styles.value,
          overdue && styles.overdue,
        ]}
      >
        {formatDue(task)}
        {overdue ? ' (overdue)' : ''}
      </Text>

      <Text style={styles.label}>Reminder</Text>
<Text style={styles.value}>
  {{
    none: 'No reminder',
    at_time: 'At due time',
    '5': '5 minutes before',
    '10': '10 minutes before',
    '30': '30 minutes before',
    '60': '1 hour before',
  }[task.reminder ?? 'none'] ?? 'No reminder'}
</Text>

      <Text style={styles.label}>Created</Text>
      <Text style={styles.value}>
        {new Date(task.createdAt).toLocaleString()}
      </Text>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: task.completed
              ? COLORS.warning
              : COLORS.success,
          },
        ]}
        onPress={() => onToggle(task.id)}
      >
        <Text style={styles.buttonText}>
          {task.completed
            ? 'Mark as Pending'
            : 'Mark as Completed'}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: COLORS.primary },
        ]}
        onPress={onEdit}
      >
        <Text style={styles.buttonText}>Edit Task</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: COLORS.danger },
        ]}
        onPress={confirmDelete}
      >
        <Text style={styles.buttonText}>Delete Task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  back: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 18,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 4,
  },
  overdue: {
    color: COLORS.danger,
    fontWeight: '600',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
