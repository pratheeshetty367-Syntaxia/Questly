
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../constants/theme';
import {
  FILTERS,
  SORTS,
  filterTasks,
  getStats,
  sortTasks,
} from '../utils/helpers';

import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';

export default function HomeScreen({
  tasks,
  loading,
  error,
  onAdd,
  onOpen,
  onToggle,
  totalXP = 0,
  level = 1,
  currentLevelXP = 0,
  xpToNextLevel = 200,
  completedToday = 0,
  dailyChallengeGoal = 3,
  dailyChallengeBonus = 150,
  challengeCompleted = false,
}) {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Priority');

  const stats = useMemo(() => getStats(tasks), [tasks]);

  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, filter), sortBy),
    [tasks, filter, sortBy]
  );

  const xp = totalXP;
const levelXP = currentLevelXP;
const progress = Math.min(levelXP / 200, 1);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingEmoji}>🎮</Text>
        <ActivityIndicator
          size="large"
          color={COLORS.secondary}
        />
        <Text style={styles.muted}>Loading your quests...</Text>
      </View>
    );
  }

  const header = (
    <View>
      {/* PLAYER HEADER */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>✦ QUESTLY</Text>
          <Text style={styles.greeting}>READY, PLAYER?</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🧙</Text>
        </View>
      </View>

      {/* LEVEL CARD */}
      <View style={styles.levelCard}>
        <View style={styles.levelTop}>
          <View>
            <Text style={styles.smallLabel}>YOUR CURRENT RANK</Text>
            <Text style={styles.levelTitle}>Level {level} Hero</Text>
            <Text style={styles.levelSubtitle}>
              Every completed task makes you stronger.
            </Text>
          </View>

          <View style={styles.xpBadge}>
            <Text style={styles.xpNumber}>{xp}</Text>
            <Text style={styles.xpLabel}>TOTAL XP</Text>
          </View>
        </View>

        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>
            LEVEL {level}
          </Text>
          <Text style={styles.progressText}>
            {levelXP} / 200 XP
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.nextLevel}>
          ✨ {200 - levelXP} XP to your next level
        </Text>
      </View>

      {/* DAILY QUEST */}
      <View style={styles.questCard}>
        <View style={styles.questHeading}>
          <Text style={styles.questIcon}>⚡</Text>
          <View style={styles.questHeadingText}>
            <Text style={styles.questEyebrow}>DAILY CHALLENGE</Text>
            <Text style={styles.questTitle}>
              Complete 3 quests
            </Text>
          </View>
          <Text style={styles.reward}>+150 XP</Text>
        </View>

        <View style={styles.questBottom}>
          <View style={styles.questTrack}>
            <View
              style={[
                styles.questFill,
                {
                  width: `${
                    Math.min(stats.completed, 3) / 3 * 100
                  }%`,
                },
              ]}
            />
          </View>
          <Text style={styles.questCount}>
            {Math.min(stats.completed, 3)}/3
          </Text>
        </View>

        <Text style={styles.questNote}>
          Complete any 3 tasks to conquer this challenge!
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Your Arena</Text>
        <Text style={styles.sectionCaption}>
          PLAYER STATS
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.purpleStat]}>
          <Text style={styles.statEmoji}>📜</Text>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total quests</Text>
        </View>

        <View style={[styles.statCard, styles.orangeStat]}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{stats.pending}</Text>
          <Text style={styles.statLabel}>In progress</Text>
        </View>

        <View style={[styles.statCard, styles.greenStat]}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statValue}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* QUEST LIST */}
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Quest Board</Text>
        <Text style={styles.taskCount}>
          {visibleTasks.length} QUESTS
        </Text>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((item) => {
          const active = item === filter;

          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filterButton,
                active && styles.filterActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  active && styles.filterTextActive,
                ]}
              >
                {item === 'All'
                  ? '🌟 All'
                  : item === 'Pending'
                  ? '⚡ Pending'
                  : '🏆 Completed'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>SORT BY</Text>

        {SORTS.map((item) => {
          const active = item === sortBy;

          return (
            <Pressable
              key={item}
              onPress={() => setSortBy(item)}
              style={[
                styles.sortButton,
                active && styles.sortActive,
              ]}
            >
              <Text
                style={[
                  styles.sortText,
                  active && styles.sortTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => onOpen(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title={
              tasks.length === 0
                ? 'Your adventure begins!'
                : 'No quests found'
            }
            message={
              tasks.length === 0
                ? 'Tap the glowing + button to create your first quest.'
                : 'Try another filter or add a new quest.'
            }
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      <Pressable
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel="Add a new quest"
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed,
        ]}
      >
        <Text style={styles.fabText}>＋</Text>
        <Text style={styles.fabLabel}>NEW QUEST</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 120,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  loadingEmoji: {
    fontSize: 42,
    marginBottom: 16,
  },

  muted: {
    color: COLORS.muted,
    marginTop: 12,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  brand: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },

  greeting: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 7,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 29,
  },

  levelCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },

  levelTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  smallLabel: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.3,
  },

  levelTitle: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 8,
  },

  levelSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
    maxWidth: 200,
  },

  xpBadge: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    minWidth: 75,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  xpNumber: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: '900',
  },

  xpLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '900',
    marginTop: 3,
  },

  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 9,
  },

  progressText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '800',
  },

  progressTrack: {
    height: 9,
    backgroundColor: COLORS.progressTrack,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
  },

  nextLevel: {
    color: COLORS.purple,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 12,
  },

  questCard: {
    backgroundColor: '#27213F',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#514078',
    padding: 17,
    marginBottom: 25,
  },

  questHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  questIcon: {
    fontSize: 28,
  },

  questHeadingText: {
    flex: 1,
  },

  questEyebrow: {
    color: COLORS.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  questTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 5,
  },

  reward: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '900',
  },

  questBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 17,
  },

  questTrack: {
    flex: 1,
    height: 7,
    backgroundColor: '#43385F',
    borderRadius: 8,
    overflow: 'hidden',
  },

  questFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 8,
  },

  questCount: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '900',
  },

  questNote: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 10,
  },

  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '900',
  },

  sectionCaption: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    borderRadius: 17,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: 'center',
  },

  purpleStat: {
    backgroundColor: '#29234D',
    borderColor: '#5143A0',
  },

  orangeStat: {
    backgroundColor: '#392A24',
    borderColor: '#8D5B36',
  },

  greenStat: {
    backgroundColor: '#19392F',
    borderColor: '#28785B',
  },

  statEmoji: {
    fontSize: 22,
  },

  statValue: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 7,
  },

  statLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 5,
    textAlign: 'center',
  },

  taskCount: {
    color: COLORS.secondary,
    fontSize: 10,
    fontWeight: '900',
  },

  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  filterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '800',
  },

  filterTextActive: {
    color: '#FFFFFF',
  },

  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },

  sortLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '900',
  },

  sortButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sortActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.card,
  },

  sortText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
  },

  sortTextActive: {
    color: COLORS.secondary,
  },

  error: {
    color: COLORS.danger,
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.purple,
  },

  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  fabText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  fabLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
});
