
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS, PRIORITY_COLORS } from '../constants/theme';

export default function TaskCard({ task, onPress, onToggle }) {
  if (!task) return null;

  const completed = Boolean(task.completed);
  const priority = ['High', 'Medium', 'Low'].includes(task.priority)
    ? task.priority
    : 'Medium';

  const priorityColor = PRIORITY_COLORS[priority];
  const reward = priority === 'High' ? 100 : priority === 'Medium' ? 50 : 25;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${task.title || 'Untitled quest'}, ${completed ? 'completed' : 'pending'}`}
      style={({ pressed }) => [
        styles.card,
        completed && styles.completedCard,
        pressed && styles.pressed,
      ]}
    >
      {/* Priority accent */}
      <View
        style={[
          styles.accent,
          { backgroundColor: priorityColor },
        ]}
      />

      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: `${priorityColor}20`,
                borderColor: priorityColor,
              },
            ]}
          >
            <Text style={[styles.priorityText, { color: priorityColor }]}>
              {priority === 'High'
                ? '🔥 HIGH'
                : priority === 'Medium'
                ? '⚡ MEDIUM'
                : '🌱 LOW'}
            </Text>
          </View>

          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{reward} XP</Text>
          </View>
        </View>

        {/* Title and completion button */}
        <View style={styles.mainRow}>
          <View style={styles.taskInfo}>
            <Text
              numberOfLines={2}
              style={[
                styles.title,
                completed && styles.completedTitle,
              ]}
            >
              {task.title || 'Untitled quest'}
            </Text>

            {task.description ? (
              <Text numberOfLines={2} style={styles.description}>
                {task.description}
              </Text>
            ) : null}
          </View>

          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              onToggle?.();
            }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
            accessibilityLabel={
              completed ? 'Mark quest as pending' : 'Complete quest'
            }
            hitSlop={8}
            style={[
              styles.checkbox,
              completed && styles.checkboxDone,
            ]}
          >
            {completed ? (
              <Text style={styles.checkmark}>✓</Text>
            ) : (
              <Text style={styles.checkboxIcon}>＋</Text>
            )}
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.status}>
            <Text style={styles.statusEmoji}>
              {completed ? '🏆' : '🗡️'}
            </Text>
            <Text
              style={[
                styles.statusText,
                completed && styles.completedStatus,
              ]}
            >
              {completed ? 'QUEST CLEARED' : 'QUEST IN PROGRESS'}
            </Text>
          </View>

          {task.dueDate ? (
            <Text style={styles.dueDate}>
              📅 {task.dueDate}
              {task.dueTime ? ` · ${task.dueTime}` : ''}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 13,
    overflow: 'hidden',
  },

  completedCard: {
    opacity: 0.78,
    borderColor: COLORS.success,
  },

  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.9,
  },

  accent: {
    width: 5,
  },

  content: {
    flex: 1,
    padding: 15,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },

  priorityText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  xpBadge: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  xpText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '900',
  },

  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  taskInfo: {
    flex: 1,
  },

  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },

  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.muted,
  },

  description: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },

  checkbox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxDone: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  checkboxIcon: {
    color: COLORS.secondary,
    fontSize: 21,
    fontWeight: '800',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 11,
    marginTop: 14,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusEmoji: {
    fontSize: 12,
  },

  statusText: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  completedStatus: {
    color: COLORS.success,
  },

  dueDate: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '600',
  },
});
