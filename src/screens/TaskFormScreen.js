import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COLORS, PRIORITY_COLORS } from '../constants/theme';
import { PRIORITIES, validateTask } from '../utils/helpers';

const GAME = {
  background: '#101124',
  card: '#20213E',
  border: '#383A63',
  cyan: '#00E5FF',
  purple: '#7048FF',
  muted: '#A6ACCC',
  white: '#F7F7FF',
};

const PRIORITY_ICONS = {
  High: '🔥',
  Medium: '⚡',
  Low: '🌱',
};

export default function TaskFormScreen({ task, onSave, onCancel }) {
  const isEdit = Boolean(task);
const [title, setTitle] = useState(task?.title ?? '');
const [description, setDescription] = useState(task?.description ?? '');
const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
const [dueTime, setDueTime] = useState(task?.dueTime ?? '');
const [reminder, setReminder] = useState(
  task?.reminder ?? 'none'
);
const [showDatePicker, setShowDatePicker] = useState(false);
const [showTimePicker, setShowTimePicker] = useState(false);
  const [priority, setPriority] = useState(
    task ? task.priority : 'Medium'
  );
  
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;

    const data = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate.trim(),
      dueTime: dueTime.trim(),
      reminder,
    };

    const found = validateTask(data);
    setErrors(found);

    if (Object.keys(found).length > 0) return;

    setSaving(true);

    try {
      await onSave(data);
    } catch (error) {
      console.error('Unable to save quest:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.brand}>✦ QUESTLY</Text>
            <Text style={styles.subtitle}>
              {isEdit ? 'UPGRADE YOUR QUEST' : 'A NEW ADVENTURE AWAITS'}
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🧙</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            {isEdit ? '✏️ QUEST EDITOR' : '✨ QUEST GENERATOR'}
          </Text>

          <Text style={styles.heading}>
            {isEdit ? 'Edit Quest' : 'Create a Quest'}
          </Text>

          <Text style={styles.heroDescription}>
            {isEdit
              ? 'Refine your mission and keep moving forward.'
              : 'Every great achievement starts with one small mission.'}
          </Text>

          <View style={styles.reward}>
            <Text style={styles.rewardIcon}>🏆</Text>
            <View style={styles.rewardTextContainer}>
              <Text style={styles.rewardTitle}>QUEST REWARD</Text>
              <Text style={styles.rewardValue}>
                {priority === 'High'
                  ? '+100 XP'
                  : priority === 'Medium'
                    ? '+60 XP'
                    : '+30 XP'}
              </Text>
            </View>
            <Text style={styles.rewardSparkle}>✦</Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>01 / Mission Details</Text>
          <Text style={styles.required}>* REQUIRED</Text>
        </View>

        <Text style={styles.label}>Quest title *</Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Conquer the DBMS assignment"
          placeholderTextColor={GAME.muted}
          maxLength={80}
          returnKeyType="next"
        />
        {errors.title ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}

        <Text style={styles.label}>Mission briefing</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={description}
          onChangeText={setDescription}
          placeholder="Add your strategy or mission details..."
          placeholderTextColor={GAME.muted}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>02 / Difficulty Level</Text>
        </View>

        <Text style={styles.label}>Choose your difficulty</Text>
        <View style={styles.priorityRow}>
          {PRIORITIES.map((p) => {
            const active = p === priority;
            const color = PRIORITY_COLORS[p];

            return (
              <Pressable
                key={p}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setPriority(p)}
                style={[
                  styles.priorityButton,
                  { borderColor: color },
                  active && { backgroundColor: `${color}25` },
                  active && styles.selectedPriority,
                ]}
              >
                <Text style={styles.priorityIcon}>
                  {PRIORITY_ICONS[p]}
                </Text>
                <Text style={[styles.priorityText, { color }]}>
                  {p}
                </Text>
                <Text style={styles.priorityXP}>
                  {p === 'High' ? '100 XP' : p === 'Medium' ? '60 XP' : '30 XP'}
                </Text>
                {active ? (
                  <Text style={[styles.selectedMark, { color }]}>
                    ✓ SELECTED
                  </Text>
                ) : (
                  <Text style={styles.unselectedMark}>TAP TO SELECT</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>03 / Deadline</Text>
          <Text style={styles.required}>OPTIONAL</Text>
        </View>

                <Text style={styles.label}>Due date</Text>

        <Pressable
          style={[
            styles.input,
            errors.dueDate && styles.inputError,
          ]}
          onPress={() => setShowDatePicker(true)}
          accessibilityRole="button"
        >
          <Text
            style={{
              color: dueDate ? GAME.white : GAME.muted,
              fontSize: 15,
            }}
          >
            {dueDate || '📅  Choose a date'}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={
              dueDate && !Number.isNaN(Date.parse(dueDate))
                ? new Date(`${dueDate}T12:00:00`)
                : new Date()
            }
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);

              if (event.type === 'set' && selectedDate) {
                const year = selectedDate.getFullYear();
                const month = String(
                  selectedDate.getMonth() + 1
                ).padStart(2, '0');
                const day = String(
                  selectedDate.getDate()
                ).padStart(2, '0');

                setDueDate(`${year}-${month}-${day}`);
                setErrors((previous) => ({
                  ...previous,
                  dueDate: undefined,
                }));
              }
            }}
          />
        )}

        {errors.dueDate ? (
          <Text style={styles.errorText}>{errors.dueDate}</Text>
        ) : null}

        <Text style={styles.label}>Due time</Text>

        <Pressable
          style={[
            styles.input,
            errors.dueTime && styles.inputError,
          ]}
          onPress={() => setShowTimePicker(true)}
          accessibilityRole="button"
        >
          <Text
            style={{
              color: dueTime ? GAME.white : GAME.muted,
              fontSize: 15,
            }}
          >
            {dueTime || '🕒  Choose a time'}
          </Text>
        </Pressable>

        {showTimePicker && (
          <DateTimePicker
            value={(() => {
              const date = new Date();

              if (/^\d{2}:\d{2}$/.test(dueTime)) {
                const [hours, minutes] = dueTime
                  .split(':')
                  .map(Number);

                date.setHours(hours, minutes, 0, 0);
              }

              return date;
            })()}
            mode="time"
            display="default"
           onValueChange={(selectedTime) => {
  setShowTimePicker(false);

  if (selectedTime) {
    const hours = String(
      selectedTime.getHours()
    ).padStart(2, '0');

    const minutes = String(
      selectedTime.getMinutes()
    ).padStart(2, '0');

    setDueTime(`${hours}:${minutes}`);

    setErrors((previous) => ({
      ...previous,
      dueTime: undefined,
    }));
  }
}}
onDismiss={() => setShowTimePicker(false)}
          />
        )}

        {errors.dueTime ? (
          <Text style={styles.errorText}>{errors.dueTime}</Text>
        ) : null}
        <View style={styles.sectionHeading}>
  <Text style={styles.sectionTitle}>04 / Reminder</Text>
  <Text style={styles.required}>OPTIONAL</Text>
</View>

<Text style={styles.label}>Remind me</Text>

{[
  { label: 'No reminder', value: 'none' },
  { label: 'At due time', value: 'at_time' },
  { label: '5 minutes before', value: '5' },
  { label: '10 minutes before', value: '10' },
  { label: '30 minutes before', value: '30' },
  { label: '1 hour before', value: '60' },
].map((option) => {
  const selected = reminder === option.value;

  return (
    <Pressable
      key={option.value}
      onPress={() => setReminder(option.value)}
      style={[
        styles.input,
        {
          marginBottom: 8,
          borderColor: selected ? GAME.purple : GAME.border,
          backgroundColor: selected ? '#292044' : GAME.card,
        },
      ]}
    >
      <Text style={{ color: GAME.white, fontSize: 14 }}>
        {selected ? '✓  ' : '    '}
        {option.label}
      </Text>
    </Pressable>
  );
})}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>HERO TIP</Text>
            <Text style={styles.tipDescription}>
              Break big goals into smaller quests. Every completed mission
              brings you closer to your next level!
            </Text>
          </View>
        </View>

        <Pressable
          style={[styles.saveButton, saving && styles.disabledButton]}
          onPress={handleSave}
          disabled={saving}
          accessibilityRole="button"
        >
          <Text style={styles.saveText}>
            {saving
              ? '⏳ SAVING QUEST...'
              : isEdit
                ? '⚔️  SAVE QUEST CHANGES'
                : '⚡  ACCEPT THIS QUEST'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={onCancel}
          accessibilityRole="button"
        >
          <Text style={styles.cancelText}>← Return to the arena</Text>
        </Pressable>

        <Text style={styles.footer}>YOUR NEXT LEVEL STARTS HERE ✦</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GAME.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 36,
    flexGrow: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  brand: {
    color: GAME.cyan,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 3,
  },
  subtitle: {
    color: GAME.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 8,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: GAME.card,
    borderWidth: 1,
    borderColor: GAME.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  hero: {
    backgroundColor: GAME.card,
    borderColor: GAME.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
  },
  eyebrow: {
    color: GAME.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  heading: {
    color: GAME.white,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
  },
  heroDescription: {
    color: GAME.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171831',
    borderColor: '#51428A',
    borderWidth: 1,
    borderRadius: 15,
    padding: 13,
    marginTop: 20,
  },
  rewardIcon: {
    fontSize: 30,
    marginRight: 12,
  },
  rewardTextContainer: {
    flex: 1,
  },
  rewardTitle: {
    color: GAME.muted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  rewardValue: {
    color: '#FFD166',
    fontSize: 21,
    fontWeight: '900',
    marginTop: 3,
  },
  rewardSparkle: {
    color: GAME.cyan,
    fontSize: 25,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    color: GAME.cyan,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  required: {
    color: GAME.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: GAME.white,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: GAME.card,
    borderWidth: 1,
    borderColor: GAME.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: GAME.white,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF4D78',
  },
  errorText: {
    color: '#FF6B8A',
    fontSize: 12,
    marginTop: 5,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPriority: {
    borderWidth: 2,
  },
  priorityIcon: {
    fontSize: 22,
    marginBottom: 7,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '900',
  },
  priorityXP: {
    color: GAME.white,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 5,
  },
  selectedMark: {
    fontSize: 7,
    fontWeight: '900',
    marginTop: 7,
  },
  unselectedMark: {
    color: GAME.muted,
    fontSize: 7,
    fontWeight: '800',
    marginTop: 7,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#20213E',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GAME.border,
    padding: 14,
    marginTop: 24,
  },
  tipIcon: {
    fontSize: 23,
    marginRight: 12,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    color: '#FFD166',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  tipDescription: {
    color: GAME.muted,
    fontSize: 12,
    lineHeight: 19,
  },
  saveButton: {
    backgroundColor: GAME.purple,
    borderColor: '#967EFF',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  cancelButton: {
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 4,
  },
  cancelText: {
    color: GAME.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  footer: {
    color: '#777CA5',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
});
