import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    subtitle: GameObjects.Text;
    startButton: GameObjects.Text;
    pyramid1: GameObjects.Image;
    pyramid2: GameObjects.Image;

    constructor() {
        super('MainMenu');
    }

    create() {
        // Create Egyptian desert background
        this.cameras.main.setBackgroundColor('#DAA520'); // Golden sand color

        // Create decorative pyramids
        this.createPyramidGraphics();
        
        this.pyramid1 = this.add.image(150, 600, 'pyramid');
        this.pyramid1.setScale(0.8);
        
        this.pyramid2 = this.add.image(900, 650, 'pyramid');
        this.pyramid2.setScale(0.6);

        // Create sun
        this.createSunGraphics();
        this.add.image(100, 100, 'sun').setScale(0.7);

        // Create Egyptian-style logo/cartouche
        this.createCartoucheGraphics();
        this.logo = this.add.image(512, 200, 'cartouche');

        // Main title with Egyptian styling
        this.title = this.add.text(512, 320, 'SUPER PHARAOH', {
            fontFamily: 'serif', 
            fontSize: 64, 
            color: '#FFD700', // Gold
            stroke: '#8B4513', // Saddle brown
            strokeThickness: 8,
            align: 'center',
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#000000',
                blur: 2
            }
        }).setOrigin(0.5);

        // Subtitle
        this.subtitle = this.add.text(512, 380, 'Escape the Ancient Pyramid', {
            fontFamily: 'serif', 
            fontSize: 24, 
            color: '#CD853F', // Peru color
            stroke: '#000000', 
            strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5);

        // Start button
        this.startButton = this.add.text(512, 480, '🏺 Begin Your Quest 🏺', {
            fontFamily: 'serif', 
            fontSize: 32, 
            color: '#FF6347', // Tomato
            stroke: '#8B0000', // Dark red
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        // Make start button interactive
        this.startButton.setInteractive({ useHandCursor: true });
        
        // Hover effects
        this.startButton.on('pointerover', () => {
            this.startButton.setStyle({ color: '#FF4500' }); // Orange red
            this.startButton.setScale(1.1);
        });

        this.startButton.on('pointerout', () => {
            this.startButton.setStyle({ color: '#FF6347' });
            this.startButton.setScale(1);
        });

        // Start game on click
        this.startButton.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        // Instructions with Egyptian theme
        this.add.text(512, 580, 'Help the Pharaoh collect magical pyramids 🔺 and avoid mummies 🧟\nUse arrow keys to move and jump', {
            fontFamily: 'serif', 
            fontSize: 18, 
            color: '#8B4513',
            align: 'center'
        }).setOrigin(0.5);

        // Credits
        this.add.text(512, 720, 'May the gods guide your path...', {
            fontFamily: 'serif', 
            fontSize: 16, 
            color: '#A0522D',
            align: 'center',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Also allow click anywhere to start
        this.input.once('pointerdown', () => {
            this.scene.start('Level1');
        });
    }

    private createPyramidGraphics() {
        const graphics = this.add.graphics();
        
        // Create pyramid shape
        graphics.fillStyle(0xCD853F); // Peru color
        graphics.beginPath();
        graphics.moveTo(0, 100); // Base left
        graphics.lineTo(100, 100); // Base right
        graphics.lineTo(50, 0); // Top
        graphics.closePath();
        graphics.fillPath();
        
        // Add pyramid details
        graphics.lineStyle(3, 0x8B4513); // Saddle brown
        graphics.strokePath();
        
        // Add inner lines for texture
        graphics.lineStyle(1, 0x8B4513);
        graphics.lineBetween(25, 50, 50, 0);
        graphics.lineBetween(75, 50, 50, 0);
        
        graphics.generateTexture('pyramid', 100, 100);
        graphics.destroy();
    }

    private createSunGraphics() {
        const graphics = this.add.graphics();
        
        // Sun circle
        graphics.fillStyle(0xFFD700); // Gold
        graphics.fillCircle(50, 50, 40);
        
        // Sun rays
        graphics.lineStyle(4, 0xFFA500); // Orange
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const startX = 50 + Math.cos(angle) * 45;
            const startY = 50 + Math.sin(angle) * 45;
            const endX = 50 + Math.cos(angle) * 60;
            const endY = 50 + Math.sin(angle) * 60;
            graphics.lineBetween(startX, startY, endX, endY);
        }
        
        graphics.generateTexture('sun', 100, 100);
        graphics.destroy();
    }

    private createCartoucheGraphics() {
        const graphics = this.add.graphics();
        
        // Cartouche outline (Egyptian royal nameplate)
        graphics.lineStyle(6, 0xFFD700); // Gold
        graphics.fillStyle(0x8B4513, 0.3); // Semi-transparent brown
        
        // Rounded rectangle for cartouche
        graphics.fillRoundedRect(0, 0, 300, 80, 40);
        graphics.strokeRoundedRect(0, 0, 300, 80, 40);
        
        // Inner decoration
        graphics.lineStyle(2, 0xFFD700);
        graphics.strokeRoundedRect(10, 10, 280, 60, 30);
        
        // Hieroglyphic-style decorations
        graphics.fillStyle(0xFFD700);
        graphics.fillCircle(50, 40, 8);
        graphics.fillCircle(250, 40, 8);
        
        graphics.generateTexture('cartouche', 300, 80);
        graphics.destroy();
    }
}
