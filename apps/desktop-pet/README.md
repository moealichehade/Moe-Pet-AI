# Moe Pet AI — Desktop Companion App

A multi-pet desktop companion that lives on your Mac screen.
Built with Electron + React + TypeScript + Vite.

## Pets in v1

| Pet  | Personality          | Behaviour                        |
|------|----------------------|----------------------------------|
| Owl  | Calm, mindful        | Slow float, soft expressions     |
| Wolf | Focused, protective  | Faster float, sharper reactions  |

## Setup

```bash
cd apps/desktop-pet
npm install
npm run dev
```

## What you will see

- Both Owl and Wolf on your desktop
- Transparent, frameless, always-on-top window
- Each pet floats independently
- Click any pet → changes mood + shows new dialogue line
- Drag any pet → reposition anywhere on screen

## Project structure

```
apps/desktop-pet/
├── src/
│   ├── main/
│   │   └── main.ts              # Electron main process
│   └── renderer/
│       ├── App.tsx              # Root — mounts both pets
│       ├── main.tsx             # React entry
│       ├── components/
│       │   ├── Pet.tsx          # Base pet wrapper (drag, click, bubble)
│       │   ├── Owl.tsx          # Owl SVG + mood expressions
│       │   └── Wolf.tsx         # Wolf SVG + mood expressions
│       ├── hooks/
│       │   └── usePetState.ts   # Mood, dialogue, position state
│       ├── data/dialogue/
│       │   ├── owl.json         # 10 mindful Owl lines
│       │   └── wolf.json        # 10 focused Wolf lines
│       └── styles/
│           └── app.css          # Animations, layout, speech bubble
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tsconfig.main.json
```
