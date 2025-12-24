# Groq Chat - GPT Clone

A ChatGPT-like mobile application built with React Native CLI and the Groq API.

## Features
- **Real-time AI Chat**: Interact with Groq's high-performance LLMs (llama-3.3-70b-versatile).
- **Dark / Light Mode**: Automatically switches based on system settings.
- **Message Bubbles**: Styled user and AI messages with theme-aware colors.
- **Typed Input**: Multi-line message input with auto-scroll logic.
- **Clear Chat**: Easily reset the conversation history and local storage.
- **Typing Animation**: Smooth animated dots to indicate AI is processing.
- **Local History**: Chat history is persisted locally using Async Storage.
- **Environment Driven**: API keys and models are managed via environment variables.

## Tech Stack
- **Frontend**: React Native (CLI)
- **Language**: JavaScript
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Networking**: Axios
- **Environment**: react-native-dotenv

## Setup Instructions

### Prerequisites
- Node.js (v20+)
- JDK 17
- Android SDK & Emulator (for Android)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   GROQ_MODEL=llama3-8b-8192
   ```

### Running the App
- **Android**:
  ```bash
  npx react-native run-android
  ```
- **iOS** (Requires Mac):
  ```bash
  npx react-native run-ios
  ```

## Credentials
This app does not require a login by default, but it requires a valid **Groq API Key** to be placed in the `.env` file.

## Developer Notes
- The app uses `react-native-dotenv` for managing the API key.
- Conversation history is maintained in the local component state during the session.
- To use dynamic icons, `react-native-vector-icons` is installed but basic text labels are used for standard setup.

---

## 🚀 Step-by-Step Submission Guide

Follow these steps to complete your assignment submission:

### 1. Push to GitHub
- Initialize a git repository if you haven't: `git init`
- Add all files: `git add .`
- Commit: `git commit -m "Final: GPTClone with Groq API"`
- Create a new repo on GitHub and push:
  ```bash
  git remote add origin YOUR_REPO_URL
  git branch -M main
  git push -u origin main
  ```

### 2. Generate Working APK (Android)
- Open a terminal in the project root.
- Navigate to the android folder: `cd android`
- Run the build command:
  ```bash
  ./gradlew assembleDebug
  ```
- Your APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

### 3. Upload and Share
- **Google Drive**: Upload the `app-debug.apk` to your Google Drive.
- **Permissions**: Right-click the file -> "Share" -> Change to "Anyone with the link".
- **Form**: Copy the link and paste it into the shared Google Form along with your GitHub repo link.

### 4. Final Checklist
- [ ] GitHub repo is public.
- [ ] README contains App description and Setup instructions.
- [ ] `.env` file example is provided (or credentials included in README if required).
- [ ] APK link is publicly accessible.
