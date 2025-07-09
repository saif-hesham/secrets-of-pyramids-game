# Phaser 3 Minimal Game Template

A complete, minimal Phaser 3 game template built with TypeScript and Vite, featuring a full scene flow and programmatically generated graphics - no external assets required!

## 🎮 Features

- **Complete Game Flow**: Boot → Preloader → Main Menu → Level → Game Over
- **TypeScript**: Full type safety and modern development experience
- **Vite**: Lightning-fast development server and optimized builds
- **Zero Assets**: All graphics generated programmatically - no external images needed
- **Physics**: Arcade Physics with gravity, collisions, and platformer mechanics
- **Interactive UI**: Hover effects, click interactions, and responsive design
- **Platformer Gameplay**: Jump, run, collect items, and avoid falling

## 🎯 Game Features

### Gameplay Mechanics
- **Player Movement**: Smooth arrow key controls with responsive jumping
- **Physics**: Realistic gravity and collision detection
- **Platforms**: Multiple levels to jump between
- **Collectibles**: Golden circles to gather for points
- **Timer**: 30-second gameplay sessions
- **Win Condition**: Collect all items to complete the level

### Scene System
1. **Boot Scene**: Initial setup and programmatic asset generation
2. **Preloader Scene**: Animated loading screen with progress bar
3. **Main Menu**: Interactive menu with hover effects and instructions
4. **Level Scene**: Main gameplay with physics and collectibles
5. **Game Over**: Results screen with restart and menu options

## 🎯 Controls

| Input | Action |
|-------|--------|
| **←/→ Arrow Keys** | Move left/right |
| **↑ Arrow Key** | Jump (when touching ground) |
| **ESC** | Return to main menu (during gameplay) |
| **Mouse** | Navigate menus and interact with buttons |

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (version 16 or higher)
- npm (comes with Node.js)

### Installation
```bash
# Clone or download this template
cd your-game-project

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev

# Start without analytics (optional)
npm run dev-nolog
```

Visit `http://localhost:8080` to see your game in action!

### Building for Production
```bash
# Create optimized build
npm run build

# Build without analytics (optional)
npm run build-nolog
```

The built game will be in the `dist` folder, ready to deploy to any web server.

## 📁 Project Structure

```
├── index.html                 # Main HTML file
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite/                     # Vite configuration files
│   ├── config.dev.mjs        # Development settings
│   └── config.prod.mjs       # Production settings
├── public/                   # Static assets (optional)
│   ├── style.css            # Global styles
│   └── favicon.png          # Game icon
└── src/                     # Source code
    ├── main.ts              # Application entry point
    └── game/                # Game-specific code
        ├── main.ts          # Game configuration
        └── scenes/          # All game scenes
            ├── Boot.ts      # Initial loading
            ├── Preloader.ts # Loading screen
            ├── MainMenu.ts  # Main menu
            ├── Level.ts     # Gameplay scene
            └── GameOver.ts  # End screen
```

## 🎨 Customization Guide

### Modifying Graphics
All graphics are generated programmatically using Phaser's Graphics API:

```typescript
// Example: Changing player color in Level.ts
const playerGraphics = this.add.graphics();
playerGraphics.fillStyle(0x00FF00); // Change to green
playerGraphics.fillRect(-16, -24, 32, 48);
```

### Adjusting Physics
Modify game physics in `src/game/main.ts`:

```typescript
physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 600, x: 0 }, // Adjust gravity
        debug: false // Set to true for debug visuals
    }
}
```

### Gameplay Settings
Customize gameplay in `src/game/scenes/Level.ts`:

```typescript
// Player movement speed
this.player.setVelocityX(-160); // Change speed

// Jump height
this.player.setVelocityY(-530); // Adjust jump power

// Game timer
this.time.delayedCall(45000, () => { // Change timer duration
    this.scene.start('GameOver');
});
```

### UI Styling
Modify text styles and colors throughout the scenes:

```typescript
// Example: Changing title style in MainMenu.ts
this.title = this.add.text(512, 320, 'Your Game Title', {
    fontFamily: 'Arial Black',
    fontSize: 48,
    color: '#ff6b6b', // Custom color
    stroke: '#2c2c2c',
    strokeThickness: 6
});
```

## 🔧 Advanced Customization

### Adding New Scenes
1. Create a new scene file in `src/game/scenes/`
2. Import and add it to the scene list in `src/game/main.ts`
3. Use `this.scene.start('YourSceneName')` to transition

### Adding Sound Effects
```typescript
// In preload method
this.load.audio('jump', ['assets/jump.mp3']);

// In game code
this.sound.play('jump');
```

### Mobile Support
Add touch controls by extending the existing input system:

```typescript
// Add touch/mobile support
this.input.addPointer(3); // Support multiple touches
```

## 🛠️ Technical Details

### Built With
- **Phaser 3.90.0**: 2D game framework
- **TypeScript 5.7.2**: Type-safe JavaScript
- **Vite 6.3.1**: Next-generation build tool

### Performance
- Lightweight: No external assets to load
- Fast startup: Programmatic graphics generation
- Optimized: Vite's efficient bundling and hot-reload

### Browser Support
- Modern browsers with ES6+ support
- WebGL and Canvas rendering fallback
- Mobile and desktop compatible

## 📚 Learning Resources

### Phaser 3 Resources
- [Official Documentation](https://docs.phaser.io)
- [Examples](https://labs.phaser.io)
- [Community Forum](https://phaser.discourse.group/)

### Game Development
- [Phaser 3 Tutorials](https://phaser.io/tutorials)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🚀 Next Steps

This template provides a solid foundation. Consider adding:

- **🎵 Audio**: Sound effects and background music
- **🎨 Sprites**: Custom character and environment art
- **🏆 Progression**: Multiple levels and difficulty scaling
- **💾 Storage**: Save progress and high scores
- **🤖 AI**: Enemy behaviors and patterns
- **⭐ Effects**: Particles, animations, and visual polish
- **📱 Mobile**: Touch controls and responsive design
- **🌐 Multiplayer**: Online features and leaderboards

## 📄 License

MIT License - Use this template freely for your projects!

## 🤝 Contributing

Feel free to submit issues, suggestions, or improvements. This template is designed to help developers get started quickly with Phaser 3 game development.

---

**Happy Game Development! 🎮**

*Created with ❤️ for the Phaser community*
