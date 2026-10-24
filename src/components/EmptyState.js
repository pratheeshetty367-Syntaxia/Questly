
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../constants/theme';

export default function EmptyState({
  title = 'Your adventure begins!',
  message = 'Create your first quest and start earning rewards.',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.orbit}>
        <View style={styles.innerOrbit}>
          <Text style={styles.emoji}>🗺️</Text>
        </View>
        <Text style={styles.sparkleOne}>✦</Text>
        <Text style={styles.sparkleTwo}>✧</Text>
        <Text style={styles.sparkleThree}>✦</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>NEW ADVENTURE</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>💡</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>HERO TIP</Text>
          <Text style={styles.tipText}>
            Break big goals into small quests. Every little win
            moves you forward!
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        ✨ YOUR NEXT LEVEL STARTS HERE ✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 28,
    paddingBottom: 30,
  },

  orbit: {
    width: 142,
    height: 142,
    borderRadius: 71,
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.darkCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  innerOrbit: {
    width: 104,
    height: 104,
    borderRadius: 34,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emoji: {
    fontSize: 55,
  },

  sparkleOne: {
    position: 'absolute',
    top: 10,
    right: 15,
    fontSize: 23,
    color: COLORS.gold,
  },

  sparkleTwo: {
    position: 'absolute',
    bottom: 18,
    left: 7,
    fontSize: 25,
    color: COLORS.accent,
  },

  sparkleThree: {
    position: 'absolute',
    top: 34,
    left: 7,
    fontSize: 16,
    color: COLORS.gold,
  },

  badge: {
    backgroundColor: COLORS.darkCard,
    borderColor: COLORS.purple,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 13,
  },

  badgeText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  title: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },

  message: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 290,
  },

  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: COLORS.darkCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 15,
    marginTop: 25,
    width: '100%',
  },

  tipIcon: {
    fontSize: 25,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },

  tipText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
  },

  footer: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 24,
  },
});
