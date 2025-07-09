# 🏺 Super Pharaoh - Egyptian Adventure Game

An exciting Egyptian-themed platformer built with Phaser 3 and TypeScript, where you play as a mighty pharaoh on a quest to collect magical pyramids while avoiding ancient mummies across three challenging levels!

![Super Pharaoh Game](screenshot.png)

## 🎮 Game Overview

**Super Pharaoh** is inspired by classic platformers like Super Mario, but with a rich Egyptian theme. Navigate through ancient pyramids, dodge mummies, avoid deadly traps, and collect magical artifacts to prove your worth as a true pharaoh!

### 🎯 Game Features

#### **Epic Egyptian Adventure**
- **3 Progressive Levels**: From the Great Pyramid to the Cursed Chamber to the Pharaoh's Tomb
- **Egyptian Mythology**: Immerse yourself in ancient Egyptian lore and imagery
- **Pharaoh Protagonist**: Play as a golden pharaoh with royal powers
- **Magical Artifacts**: Collect glowing pyramids with mystical properties

#### **Challenging Gameplay**
- **Mummy Enemies**: Avoid bandaged undead with varying speeds and AI
- **Boss Mummies**: Face enhanced enemies with special abilities in later levels
- **Deadly Traps**: Navigate spike traps and environmental hazards
- **Moving Platforms**: Master timing and precision in Level 3
- **Physics-Based**: Realistic jumping, gravity, and collision detection

#### **Progressive Difficulty**
- **Level 1**: Learn the basics in the Great Pyramid
- **Level 2**: Face increased challenges in the Cursed Chamber  
- **Level 3**: Master the ultimate test in the Pharaoh's Tomb

## 🎮 How to Play

### **Controls**
| Input | Action |
|-------|--------|
| **←/→ Arrow Keys** | Move left/right |
| **↑ Arrow Key** | Jump (when on ground) |
| **ESC** | Return to main menu |
| **Mouse** | Navigate menus and click buttons |

### **Objectives**
1. **Collect all magical pyramids** 🔺 in each level
2. **Avoid mummies** 🧟 - they will drain your life force
3. **Dodge spike traps** - instant death awaits the careless
4. **Navigate platforms** - jump precisely to reach higher areas
5. **Complete all 3 levels** to achieve ultimate victory!

### **Power System**
- **Lives**: Start with 3 lives per level
- **Score**: Earn points for each pyramid collected (100/150/200 per level)
- **Progression**: Must complete levels in order

## 🏗️ Technical Features

### **Built With Modern Technology**
- **Phaser 3.90.0**: Cutting-edge 2D game framework
- **TypeScript 5.7.2**: Type-safe development
- **Vite 6.3.1**: Lightning-fast build system
- **SVG Graphics**: Programmatically generated, scalable artwork

### **No External Assets Required**
- All graphics generated via code using Phaser's Graphics API
- Egyptian-themed sprites created programmatically
- Scalable vector-style artwork
- Fast loading with zero asset dependencies

### **Advanced Game Features**
- **Arcade Physics**: Realistic movement and collisions
- **Animation System**: Smooth tweening and effects
- **Scene Management**: Seamless transitions between game states
- **Audio-Ready**: Framework in place for sound effects and music
- **Responsive Design**: Works on various screen sizes

## 🚀 Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org) (version 16+)
- npm (included with Node.js)
- Modern web browser

### **Installation**
```bash
# Clone the repository
git clone [repository-url]
cd super-pharaoh-game

# Install dependencies
npm install
```

### **Development**
```bash
# Start development server
npm run dev

# Or start without analytics
npm run dev-nolog
```

Visit `http://localhost:8080` to play the game!

### **Building for Production**
```bash
# Create optimized build
npm run build

# Or build without analytics
npm run build-nolog
```

## 🎨 Game Design & Art Style

### **Egyptian Aesthetic**
- **Color Palette**: Golds, browns, desert tones, and royal blues
- **Hieroglyphic Elements**: Ancient Egyptian symbols and decorations
- **Pyramid Architecture**: Multi-tiered level designs inspired by ancient monuments
- **Mystical Effects**: Glowing artifacts and magical auras

### **Character Design**
- **Pharaoh**: Golden-armored ruler with blue crown and royal regalia
- **Mummies**: Bandaged undead with glowing red eyes
- **Boss Mummies**: Enhanced ancient guardians with dark auras

### **Environmental Design**
- **Desert Landscapes**: Sandy platforms and dunes
- **Pyramid Interiors**: Stone blocks and ancient architecture
- **Mystical Elements**: Floating spirits, magical orbs, and glowing symbols

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
└── game/
    ├── main.ts             # Game configuration
    └── scenes/
        ├── Boot.ts         # Initial loading and asset generation
        ├── Preloader.ts    # Loading screen with Egyptian theme
        ├── MainMenu.ts     # Egyptian-styled main menu
        ├── Level1.ts       # The Great Pyramid (beginner)
        ├── Level2.ts       # The Cursed Chamber (intermediate)  
        ├── Level3.ts       # The Pharaoh's Tomb (expert)
        └── GameOver.ts     # Egyptian death/resurrection theme
```

## 🎮 Level Design

### **Level 1: The Great Pyramid**
- **Theme**: Introduction to gameplay mechanics
- **Platforms**: Simple stone and sand platforms
- **Enemies**: 3 basic mummies with predictable movement
- **Collectibles**: 6 magical pyramids with golden glow
- **Difficulty**: Beginner-friendly

### **Level 2: The Cursed Chamber**
- **Theme**: Increased challenge with environmental hazards
- **Platforms**: Complex stone architecture with gaps
- **Enemies**: 5 faster mummies with varied AI patterns
- **Hazards**: Spike traps strategically placed
- **Collectibles**: 9 enhanced magical pyramids
- **Difficulty**: Intermediate

### **Level 3: The Pharaoh's Tomb**
- **Theme**: Ultimate challenge requiring mastery
- **Platforms**: Multi-tiered pyramid structure with moving platforms
- **Enemies**: 7 mummies including powerful boss variants
- **Hazards**: Enhanced spike traps and complex navigation
- **Special**: Moving platforms add timing challenges
- **Collectibles**: 7 ultimate magical pyramids
- **Difficulty**: Expert

## 🔧 Customization Guide

### **Modifying Graphics**
All graphics are created programmatically - easily change colors, sizes, and effects:

```typescript
// Example: Change pharaoh color in any level scene
pharaohGraphics.fillStyle(0x00FF00); // Change to green
```

### **Adjusting Difficulty**
Modify game balance in level files:

```typescript
// Change mummy speed
mummy.speed = 100; // Increase for harder difficulty

// Adjust player jump height
this.pharaoh.setVelocityY(-700); // Higher numbers = higher jumps

// Modify collectible count
// Add/remove positions in pyramidPositions arrays
```

### **Adding New Levels**
1. Create new scene file (e.g., `Level4.ts`)
2. Add to scene list in `main.ts`
3. Update level completion logic to chain to new level

## 🎵 Audio Integration (Ready for Enhancement)

The game framework is ready for audio enhancement:

```typescript
// Add sound effects
this.load.audio('collect', ['sounds/collect.mp3']);
this.load.audio('jump', ['sounds/jump.mp3']);
this.load.audio('mummy', ['sounds/mummy.mp3']);

// Play sounds
this.sound.play('collect');
```

## 📱 Mobile Support

The game can be enhanced for mobile devices:

```typescript
// Add touch controls
this.input.addPointer(3);

// Create on-screen buttons
const jumpButton = this.add.text(900, 650, '⬆️', { fontSize: '48px' })
    .setInteractive()
    .on('pointerdown', () => this.jump());
```

## 🏆 Achievements & Future Features

### **Potential Enhancements**
- **🎵 Audio System**: Egyptian-themed music and sound effects
- **🏆 Achievement System**: Unlock rewards for special accomplishments
- **💾 Save System**: Local storage for progress and high scores
- **⭐ Power-ups**: Temporary abilities and special items
- **🌟 Particle Effects**: Enhanced visual feedback and magic effects
- **📱 Mobile Controls**: Touch-friendly interface
- **🌐 Leaderboards**: Online score tracking
- **🎨 Animation System**: Character walking and jumping animations

### **Level Expansion Ideas**
- **Bonus Levels**: Secret areas with unique challenges
- **Time Attack Mode**: Speed-run challenges
- **Survival Mode**: Endless mummy waves
- **Puzzle Levels**: Brain-teasing Egyptian riddles

## 🛠️ Development & Contribution

### **Code Quality**
- TypeScript for type safety
- Clean, documented code structure
- Modular scene-based architecture
- Consistent naming conventions

### **Performance**
- Optimized graphics generation
- Efficient physics calculations
- Memory-conscious asset management
- Fast loading times

## 📜 Egyptian Mythology References

The game draws inspiration from:
- **Pharaohs**: Divine rulers of ancient Egypt
- **Mummies**: Preserved guardians of the afterlife  
- **Pyramids**: Sacred monuments and tombs
- **Ankh Symbols**: Egyptian symbols of life
- **Hieroglyphics**: Ancient Egyptian writing system

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🤝 Credits

- **Game Engine**: Phaser 3 Community
- **Build System**: Vite.js
- **Typography**: System fonts optimized for Egyptian aesthetic
- **Inspiration**: Classic platformers and Egyptian mythology

---

## 🎮 **Ready to Begin Your Egyptian Adventure?**

```bash
npm run dev
```

**Visit http://localhost:8080 and help the Super Pharaoh reclaim the ancient magical pyramids!**

*May the gods of Egypt guide your path to victory!* 🏺⭐🔺

---

**Created with ❤️ for fans of platformer games and Egyptian mythology**
