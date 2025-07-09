import { Scene } from 'phaser';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameoverText: Phaser.GameObjects.Text;
    subtitleText: Phaser.GameObjects.Text;
    restartButton: Phaser.GameObjects.Text;
    menuButton: Phaser.GameObjects.Text;

    constructor() {
        super('GameOver');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#8B0000'); // Dark red (cursed)

        // Create Egyptian death imagery
        this.createDeathEffects();

        // Game Over title with Egyptian styling
        this.gameoverText = this.add.text(512, 200, '💀 THE PHARAOH HAS FALLEN 💀', {
            fontFamily: 'serif', 
            fontSize: 48, 
            color: '#FFD700',
            stroke: '#8B0000', 
            strokeThickness: 6,
            align: 'center',
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#000000',
                blur: 8
            }
        }).setOrigin(0.5);

        // Subtitle with Egyptian flavor
        this.subtitleText = this.add.text(512, 280, 'The ancient curse has claimed another soul...', {
            fontFamily: 'serif', 
            fontSize: 24, 
            color: '#CD853F',
            align: 'center',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Additional flavor text
        this.add.text(512, 320, 'But legends speak of those who rise again...', {
            fontFamily: 'serif', 
            fontSize: 18, 
            color: '#A0522D',
            align: 'center'
        }).setOrigin(0.5);

        // Restart button with Egyptian theming
        this.restartButton = this.add.text(512, 420, '🔄 Rise from the Dead 🔄', {
            fontFamily: 'serif', 
            fontSize: 28, 
            color: '#32CD32', // Lime green (resurrection)
            stroke: '#006400', // Dark green
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        // Menu button
        this.menuButton = this.add.text(512, 480, '🏺 Return to the Temple 🏺', {
            fontFamily: 'serif', 
            fontSize: 28, 
            color: '#4169E1', // Royal blue
            stroke: '#000080', // Navy
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        // Make buttons interactive
        this.restartButton.setInteractive({ useHandCursor: true });
        this.menuButton.setInteractive({ useHandCursor: true });

        // Restart button effects
        this.restartButton.on('pointerover', () => {
            this.restartButton.setStyle({ color: '#00FF00' }); // Bright green
            this.restartButton.setScale(1.1);
            this.add.text(512, 460, '⚡', { fontSize: '20px', color: '#FFFF00' }).setOrigin(0.5);
        });

        this.restartButton.on('pointerout', () => {
            this.restartButton.setStyle({ color: '#32CD32' });
            this.restartButton.setScale(1);
        });

        this.restartButton.on('pointerdown', () => {
            // Flash resurrection effect
            this.cameras.main.flash(500, 255, 255, 255);
            this.time.delayedCall(500, () => {
                this.scene.start('Level1');
            });
        });

        // Menu button effects
        this.menuButton.on('pointerover', () => {
            this.menuButton.setStyle({ color: '#6495ED' }); // Cornflower blue
            this.menuButton.setScale(1.1);
        });

        this.menuButton.on('pointerout', () => {
            this.menuButton.setStyle({ color: '#4169E1' });
            this.menuButton.setScale(1);
        });

        this.menuButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // Instructions with Egyptian flavor
        this.add.text(512, 580, 'The gods offer you another chance to prove your worth', {
            fontFamily: 'serif', 
            fontSize: 16, 
            color: '#DEB887',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 620, 'Click above or press any key to choose your fate', {
            fontFamily: 'serif', 
            fontSize: 14, 
            color: '#8B7355',
            align: 'center'
        }).setOrigin(0.5);

        // Add mystical effects
        this.createMysticalEffects();

        // Also allow any key press to restart
        this.input.keyboard!.once('keydown', () => {
            this.scene.start('MainMenu');
        });

        // Click anywhere fallback
        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }

    private createDeathEffects() {
        // Create tomb walls
        const wallGraphics = this.add.graphics();
        wallGraphics.fillStyle(0x2F4F4F, 0.8);
        wallGraphics.fillRect(0, 0, 1024, 768);
        
        // Add hieroglyphic decorations
        wallGraphics.fillStyle(0xFFD700, 0.3);
        for (let i = 0; i < 10; i++) {
            const x = Phaser.Math.Between(50, 974);
            const y = Phaser.Math.Between(50, 718);
            wallGraphics.fillRect(x, y, 20, 30);
            wallGraphics.fillCircle(x + 10, y - 10, 8);
        }

        // Create floating spirits
        for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(0, 1024);
            const y = Phaser.Math.Between(0, 768);
            const spirit = this.add.text(x, y, '👻', { 
                fontSize: Phaser.Math.Between(20, 40) + 'px'
            });
            spirit.setAlpha(0.3);
            
            this.tweens.add({
                targets: spirit,
                x: x + Phaser.Math.Between(-100, 100),
                y: y + Phaser.Math.Between(-50, 50),
                alpha: 0.1,
                duration: Phaser.Math.Between(3000, 8000),
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        }
    }

    private createMysticalEffects() {
        // Create mystical orbs
        for (let i = 0; i < 8; i++) {
            const x = Phaser.Math.Between(100, 924);
            const y = Phaser.Math.Between(100, 668);
            
            const orb = this.add.graphics();
            orb.fillStyle(0x9400D3, 0.6); // Dark violet
            orb.fillCircle(0, 0, 8);
            orb.x = x;
            orb.y = y;
            
            this.tweens.add({
                targets: orb,
                scaleX: 1.5,
                scaleY: 1.5,
                alpha: 0.2,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
                repeat: -1,
                delay: i * 250
            });
        }

        // Add floating ankh symbols
        for (let i = 0; i < 5; i++) {
            const ankh = this.add.text(
                Phaser.Math.Between(0, 1024), 
                Phaser.Math.Between(0, 768), 
                '☥', 
                { 
                    fontSize: '24px', 
                    color: '#FFD700'
                }
            );
            ankh.setAlpha(0.4);
            
            this.tweens.add({
                targets: ankh,
                rotation: Math.PI * 2,
                duration: 10000,
                repeat: -1,
                ease: 'Linear'
            });
        }
    }
}
