
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

// A row of buttons where exactly one is selected
export default function SegmentedControl({ options, selected, onSelect }) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = option === selected;

        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[
              styles.button,
              active && styles.buttonActive,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.textActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 3,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: COLORS.card,
  },
  text: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: '500',
  },
  textActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
