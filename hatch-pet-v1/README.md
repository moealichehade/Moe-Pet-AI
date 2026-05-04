# Hatch Pet V1 🐶

Original desktop pet built with Electron + React + TypeScript.

## Features

- Transparent always-on-top desktop pet window
- Original anime-style dog mascot rendered as SVG
- Idle floating/breathing animation
- Speech bubble with random witty one-liners
- Click mascot to change expression and show a new line
- Local JSON dialogue file for easy editing

## Setup

1. Install Node.js 20+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start in development mode:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
npm start
```

## Project structure

```text
hatch-pet-v1/
├─ src/
│  ├─ main/        # Electron main process
│  └─ renderer/    # React app
│     ├─ components/
│     ├─ data/
│     └─ styles/
├─ index.html
├─ vite.config.ts
└─ tsconfig*.json
```

All character visuals and dialogue are original placeholders created for this project.
