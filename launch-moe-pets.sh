#!/bin/bash
cd ~/Documents/GitHub/moe-pet-ai/apps/desktop-pet

# Kill any existing session cleanly
pkill -f "moe-pet-ai" 2>/dev/null
pkill -9 -f Electron 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
sleep 1

# Pre-compile main process if needed
if [ ! -f dist/main/main/main.js ]; then
  npx tsc -p tsconfig.main.json
fi

# Launch
npm run dev
