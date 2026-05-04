# Desktop Pet App (Electron + React + TypeScript + Vite)

A transparent always-on-top desktop companion with two draggable pets (Owl + Wolf), each with independent state, animation, and dialogue.

## Features

- Multi-pet rendering in one desktop window
- Independent drag position per pet
- Independent animation and mood state (`happy`, `sleepy`, `curious`)
- Click-to-interact expression and dialogue bubble
- Dialogue data from JSON files:
  - `src/data/dialogue/owl.json`
  - `src/data/dialogue/wolf.json`

## Setup

```bash
cd apps/desktop-pet
npm install
npm run dev
```

## Project structure

- `src/components/Pet.tsx`
- `src/components/Owl.tsx`
- `src/components/Wolf.tsx`
- `src/hooks/usePetState.ts`
- `src/data/dialogue/`
- `src/assets/`

## Notes

- Window is transparent, frameless, and always-on-top.
- SVG assets are original placeholder art.
