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


https://github.com/user-attachments/assets/a3df445b-ef1b-4ee0-8e32-4919e14811cb


