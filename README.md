# Snake Game

Classic Snake game that works both in the **browser** and as an **Android APK**.

## Play in Browser

Just open `index.html` in any modern browser.

## Android APK

This project includes a full **Gradle-based Android app** that wraps the game in a WebView.

### Build APK with GitHub Actions (Recommended)

1. Go to the **Actions** tab of this repository.
2. Select **Build APK** workflow.
3. Click **Run workflow** → **Run workflow**.
4. After it finishes, download the APK from the **Artifacts** section (`snake-game-apk`).

The workflow also runs automatically on every push to `main`.

### Build Locally

Requirements:
- Android Studio or JDK 17 +
- Android SDK

```bash
# Generate wrapper (first time)
gradle wrapper

# Build debug APK
./gradlew assembleDebug
```

The APK will be at:
`app/build/outputs/apk/debug/app-debug.apk`

### Features (Android)
- Fullscreen WebView
- On-screen D-pad buttons
- Swipe controls
- High score saved
- Portrait lock

## Project Structure

```
├── index.html / style.css / script.js   ← Browser version
├── app/
│   ├── build.gradle
│   └── src/main/
│       ├── assets/                      ← Game files for Android
│       ├── java/com/snake/game/
│       └── res/
├── build.gradle
├── settings.gradle
└── .github/workflows/build-apk.yml      ← Auto-build APK
```

## Controls

| Input              | Action          |
|--------------------|-----------------|
| Arrow Keys / WASD  | Move (browser)  |
| Swipe              | Move (Android)  |
| On-screen buttons  | Move (Android)  |

Enjoy the game!
