# Questly 🎯

**Turn your tasks into quests. Build habits, earn XP, and level up your productivity.**

Questly is a gamified task management mobile application built with React Native and Expo. It makes everyday productivity more engaging through quests, experience points, priorities, and reminders.

## 🚀 Android Build

**Expo EAS Build:** [View Questly Android Build](https://expo.dev/accounts/pratheeksha2903/projects/SmartToDoApp/builds/386254e0-4fcc-4878-bc95-babccb77fe13)

Visit the build page to view the Android build status and available artifacts. If an APK artifact is available, you can download it for installation on a compatible Android device.

## ✨ Features

- **Quest Management** — Create, edit, and delete quests.
- **Priority Levels** — Organize quests by High, Medium, and Low priority.
- **XP Rewards** — Earn experience points by completing quests.
- **Level Progression** — Track your progress as you gain XP.
- **Due Dates and Times** — Set deadlines for quests.
- **Reminders** — Configure notifications for upcoming deadlines.
- **Progress Tracking** — View quest completion and productivity statistics.
- **Dark UI** — A dark-themed interface with a gamified visual design.

## 🛠️ Tech Stack

- React Native
- Expo
- JavaScript
- Expo Notifications
- Android

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Git
- Android Studio with an Android emulator, or an Android device
- Expo CLI / EAS CLI as needed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pratheeshetty367-Syntaxia/Questly.git
   ```

2. Enter the project directory:

   ```bash
   cd Questly
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npx expo start --dev-client
   ```

Follow the terminal instructions to open the app in your configured Android development environment.

## 📱 Android Build

Questly uses Expo Application Services (EAS) to build Android applications.

To create a new preview build:

```bash
npm install --global eas-cli
eas login
eas build --platform android --profile preview
```

Ensure that `eas.json` is configured with an appropriate Android build profile. Set `"buildType": "apk"` if you want an APK for direct installation.

## 📂 Project Structure

```text
Questly/
├── assets/          # Images and other static assets
├── src/             # Application screens, hooks, and utilities
├── App.js           # Application entry component
├── app.json         # Expo configuration
├── eas.json         # EAS build configuration
├── index.js         # Entry point
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

## 🎯 Project Goal

Questly explores how gamification can make everyday task management more engaging by combining quest completion, XP rewards, progression, and deadline reminders in a mobile application.

## 👩‍💻 Author

**Pratheeksha Shetty**

GitHub: [@pratheeshetty367-Syntaxia](https://github.com/pratheeshetty367-Syntaxia)

---

*Built as a mobile application development project.*
