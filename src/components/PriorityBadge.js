
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PRIORITY_COLORS } from '../constants/theme';

export default function PriorityBadge({ priority }) {
  const color = PRIORITY_COLORS[priority] || '#6B7280';

  return (
    <View style={[styles.badge, { backgroundColor: color + '20' }]}>
      <Text style={[styles.text, { color }]}>{priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
