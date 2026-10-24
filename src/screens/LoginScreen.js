
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/theme';

export default function LoginScreen({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Almost there!', 'Enter your email and password.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak password',
        'Your password must have at least 6 characters.'
      );
      return;
    }

    if (isSignup && !username.trim()) {
      Alert.alert('Choose a username', 'Enter your player name.');
      return;
    }

    // Demo-only login. Real authentication comes later.
    onLogin?.({
      username: isSignup
        ? username.trim()
        : email.split('@')[0],
      email: email.trim(),
    });
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
      >
        <View style={styles.topRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>✦</Text>
          </View>
          <Text style={styles.brand}>QUESTLY</Text>
          <View style={styles.beta}>
            <Text style={styles.betaText}>BETA</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.emoji}>🎮</Text>
          <Text style={styles.eyebrow}>YOUR LIFE, YOUR QUEST</Text>

          <Text style={styles.title}>
            Every task{'\n'}
            <Text style={styles.highlight}>levels you up.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Turn everyday goals into epic achievements.
            Your next level starts here.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Pressable
              style={[
                styles.switchButton,
                !isSignup && styles.activeSwitch,
              ]}
              onPress={() => setIsSignup(false)}
            >
              <Text
                style={[
                  styles.switchText,
                  !isSignup && styles.activeSwitchText,
                ]}
              >
                Log in
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.switchButton,
                isSignup && styles.activeSwitch,
              ]}
              onPress={() => setIsSignup(true)}
            >
              <Text
                style={[
                  styles.switchText,
                  isSignup && styles.activeSwitchText,
                ]}
              >
                Sign up
              </Text>
            </Pressable>
          </View>

          <Text style={styles.formTitle}>
            {isSignup ? 'Create your player profile' : 'Welcome back, player!'}
          </Text>

          <Text style={styles.formSubtitle}>
            {isSignup
              ? 'Your adventure begins with you.'
              : 'Ready to continue your quest?'}
          </Text>

          {isSignup && (
            <>
              <Text style={styles.label}>PLAYER NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Choose your username"
                placeholderTextColor={COLORS.muted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                maxLength={24}
              />
            </>
          )}

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={COLORS.muted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="At least 6 characters"
              placeholderTextColor={COLORS.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={10}
            >
              <Text style={styles.showText}>
                {showPassword ? 'HIDE' : 'SHOW'}
              </Text>
            </Pressable>
          </View>

          {!isSignup && (
            <Text style={styles.hint}>
              Demo mode · No account required yet
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.pressed,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>
              {isSignup ? 'CREATE MY CHARACTER  →' : 'START MY QUEST  →'}
            </Text>
          </Pressable>

          <Text style={styles.footer}>
            {isSignup
              ? 'Already have a profile? '
              : "New to the adventure? "}
            <Text
              style={styles.link}
              onPress={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </Text>
          </Text>
        </View>

        <Text style={styles.bottomText}>
          ✦  SMALL STEPS. BIG ACHIEVEMENTS.  ✦
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
  },
  brand: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 2,
  },
  beta: {
    backgroundColor: '#302650',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  betaText: {
    color: COLORS.purple,
    fontSize: 10,
    fontWeight: '900',
  },
  hero: {
    marginTop: 34,
    marginBottom: 28,
  },
  emoji: {
    fontSize: 46,
    marginBottom: 12,
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '900',
  },
  highlight: {
    color: COLORS.accent,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 310,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  switchRow: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 13,
    backgroundColor: COLORS.background,
    marginBottom: 25,
  },
  switchButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  activeSwitch: {
    backgroundColor: COLORS.primary,
  },
  switchText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  activeSwitchText: {
    color: '#FFFFFF',
  },
  formTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '900',
  },
  formSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 7,
    marginBottom: 22,
  },
  label: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 9,
    marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.darkCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  showText: {
    color: COLORS.secondary,
    fontSize: 10,
    fontWeight: '900',
    paddingLeft: 8,
  },
  hint: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 12,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 24,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 22,
  },
  link: {
    color: COLORS.secondary,
    fontWeight: '900',
  },
  bottomText: {
    color: COLORS.muted,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 24,
  },
});
