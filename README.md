# Snake Game

Classic Snake game that works both in the **browser** and as an **Android APK**.

## Play in Browser

Open `index.html` in any modern browser.

## Build Android APK (GitHub Actions)

1. Go to the **Actions** tab of this repository:  
   https://github.com/sohelgeminift07-cpu/snake-game/actions
2. Click **Build APK** on the left.
3. Click the **Run workflow** button → **Run workflow**.
4. Wait 2–4 minutes for the build to finish.
5. Download the APK from the **Artifacts** section (`snake-game-apk`).

The workflow also runs automatically on every push to `main`.

### Local Build (Optional)

```bash
gradle wrapper --gradle-version 8.5
./gradlew assembleDebug
```

APK location: `app/build/outputs/apk/debug/app-debug.apk`

## Features

### Browser
- Arrow keys / WASD
- Score + High Score

### Android
- Fullscreen WebView
- On-screen D-pad
- Swipe controls
- High score saved
- Portrait mode

## Project Structure

```
├── index.html, style.css, script.js     ← Browser version
├── app/
│   ├── build.gradle
│   └── src/main/
│       ├── assets/                      ← Game files (Android)
│       ├── java/com/snake/game/
│       └── res/
├── build.gradle
├── settings.gradle
└── .github/workflows/build-apk.yml      ← Auto builds APK
```

Enjoy!
