import { Scene } from 'phaser';
import { PharaohSprite } from '../sprites/PharaohSprite';
import { MummySprite } from '../sprites/MummySprite';

export class Level3 extends Scene {
    private pharaoh!: PharaohSprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private pyramids!: Phaser.Physics.Arcade.Group;
    private mummies!: MummySprite[];
    private spikes!: Phaser.Physics.Arcade.StaticGroup;
    private movingPlatforms!: Phaser.Physics.Arcade.Group;
    private score: number = 0;
    private lives: number = 3;
    private scoreText!: Phaser.GameObjects.Text;
    private livesText!: Phaser.GameObjects.Text;

    constructor() {
        super('Level3');
    }

    create() {
        // Dark tomb background for final level
        this.cameras.main.setBackgroundColor('#8B4513'); // Saddle brown

        // Create Egyptian-themed graphics
        this.createEgyptianAssets();
        
        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        this.movingPlatforms = this.physics.add.group();

        // Create the ultimate challenge level
        this.createFinalLevel();

        // Create pharaoh player
        this.createPharaoh();

        // Create magical pyramids (final collection)
        this.createMagicalPyramids();

        // Create boss-level mummy army
        this.createMummyArmy();

        // Create moving platforms
        this.createMovingPlatforms();

        // Create UI
        this.createUI();

        // Setup physics collisions
        this.setupPhysics();

        // ESC key to return to main menu
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.start('MainMenu');
        });
    }

    update() {
        // Update pharaoh (handles input automatically with enhanced stats)
        this.pharaoh.update();

        // Check if pharaoh fell off the world
        if (this.pharaoh.y > 800) {
            this.loseLife();
        }

        // Update mummy AI
        this.updateMummies();

        // Update moving platforms
        this.updateMovingPlatforms();
    }

    private createEgyptianAssets() {
        // Ultimate magical pyramid
        const magicPyramidGraphics = this.add.graphics();
        magicPyramidGraphics.fillStyle(0xFFD700);
        magicPyramidGraphics.beginPath();
        magicPyramidGraphics.moveTo(0, 20);
        magicPyramidGraphics.lineTo(20, 20);
        magicPyramidGraphics.lineTo(10, 0);
        magicPyramidGraphics.closePath();
        magicPyramidGraphics.fillPath();
        magicPyramidGraphics.lineStyle(3, 0xFF00FF); // Magenta glow
        magicPyramidGraphics.strokePath();
        magicPyramidGraphics.fillStyle(0xFF00FF, 0.5);
        magicPyramidGraphics.fillCircle(10, 10, 20);
        magicPyramidGraphics.generateTexture('magicPyramid', 20, 20);
        magicPyramidGraphics.destroy();

        // Ancient stone block
        const ancientStoneGraphics = this.add.graphics();
        ancientStoneGraphics.fillStyle(0x2F4F4F);
        ancientStoneGraphics.fillRect(0, 0, 64, 32);
        ancientStoneGraphics.lineStyle(2, 0x000000);
        ancientStoneGraphics.strokeRect(0, 0, 64, 32);
        // Add hieroglyphic details
        ancientStoneGraphics.fillStyle(0xFFD700, 0.7);
        ancientStoneGraphics.fillRect(8, 8, 8, 16);
        ancientStoneGraphics.fillRect(24, 8, 8, 16);
        ancientStoneGraphics.fillRect(40, 8, 8, 16);
        ancientStoneGraphics.generateTexture('ancientStone', 64, 32);
        ancientStoneGraphics.destroy();

        // Enhanced spikes
        const enhancedSpikeGraphics = this.add.graphics();
        enhancedSpikeGraphics.fillStyle(0x8B0000); // Dark red (blood-tipped)
        for (let i = 0; i < 4; i++) {
            enhancedSpikeGraphics.fillTriangle(i * 16, 20, i * 16 + 8, 0, i * 16 + 16, 20);
        }
        enhancedSpikeGraphics.generateTexture('enhancedSpikes', 64, 20);
        enhancedSpikeGraphics.destroy();

        // Moving platform
        const movingPlatformGraphics = this.add.graphics();
        movingPlatformGraphics.fillStyle(0x4682B4); // Steel blue
        movingPlatformGraphics.fillRect(0, 0, 96, 24);
        movingPlatformGraphics.lineStyle(2, 0x00FFFF);
        movingPlatformGraphics.strokeRect(0, 0, 96, 24);
        movingPlatformGraphics.generateTexture('movingPlatform', 96, 24);
        movingPlatformGraphics.destroy();
    }

    private createFinalLevel() {
        // Ground platforms
        for (let x = 0; x < 1024; x += 64) {
            const ground = this.add.rectangle(x + 32, 750, 64, 32, 0x2F4F4F);
            this.platforms.add(ground);
        }

        // Complex pyramid-shaped level structure
        const platformData = [
            // Bottom tier
            { x: 100, y: 680, w: 64, h: 32 },
            { x: 300, y: 650, w: 96, h: 32 },
            { x: 600, y: 680, w: 64, h: 32 },
            { x: 850, y: 650, w: 96, h: 32 },
            
            // Second tier
            { x: 200, y: 580, w: 80, h: 32 },
            { x: 450, y: 550, w: 128, h: 32 },
            { x: 750, y: 580, w: 80, h: 32 },
            
            // Third tier
            { x: 150, y: 480, w: 64, h: 32 },
            { x: 350, y: 450, w: 96, h: 32 },
            { x: 550, y: 420, w: 64, h: 32 },
            { x: 800, y: 480, w: 64, h: 32 },
            
            // Fourth tier
            { x: 250, y: 350, w: 80, h: 32 },
            { x: 500, y: 320, w: 128, h: 32 },
            { x: 700, y: 380, w: 64, h: 32 },
            
            // Top tier
            { x: 200, y: 220, w: 64, h: 32 },
            { x: 400, y: 180, w: 96, h: 32 },
            { x: 650, y: 250, w: 64, h: 32 },
            
            // Summit
            { x: 512, y: 100, w: 128, h: 32 }
        ];

        platformData.forEach(data => {
            const platform = this.add.rectangle(data.x, data.y, data.w, data.h, 0x2F4F4F);
            this.platforms.add(platform);
        });

        // Deadly spike traps throughout
        const spikePositions = [
            { x: 200, y: 730 },
            { x: 500, y: 730 },
            { x: 800, y: 730 },
            { x: 350, y: 630 },
            { x: 650, y: 630 },
            { x: 250, y: 530 },
            { x: 550, y: 530 },
            { x: 400, y: 430 },
            { x: 600, y: 330 }
        ];

        spikePositions.forEach(pos => {
            const spike = this.add.rectangle(pos.x, pos.y, 64, 20, 0x8B0000);
            this.spikes.add(spike);
        });
    }

    private createPharaoh() {
        this.pharaoh = new PharaohSprite(this, 100, 500);
        // Fastest movement and highest jump for final level
        this.pharaoh.setMoveSpeed(250);
        this.pharaoh.setJumpSpeed(850); // Maximum jump for highest platforms
        
        // Add power glow effect
        this.tweens.add({
            targets: this.pharaoh,
            alpha: 0.7,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }

    private createMagicalPyramids() {
        this.pyramids = this.physics.add.group();

        // Final pyramid locations (fewer but more rewarding)
        const pyramidPositions = [
            { x: 100, y: 630 },
            { x: 300, y: 600 },
            { x: 600, y: 630 },
            { x: 450, y: 500 },
            { x: 350, y: 400 },
            { x: 700, y: 330 },
            { x: 400, y: 130 }, // Summit prize
        ];

        pyramidPositions.forEach(pos => {
            const pyramid = this.pyramids.create(pos.x, pos.y, 'magicPyramid');
            pyramid.setBounceY(Phaser.Math.FloatBetween(0.3, 0.7));
            pyramid.setScale(1.8);
            
            // Epic glow animation
            this.tweens.add({
                targets: pyramid,
                alpha: 0.4,
                scaleX: 2.2,
                scaleY: 2.2,
                rotation: Math.PI * 2,
                duration: 1200,
                ease: 'Power2',
                yoyo: true,
                repeat: -1
            });
        });
    }

    private createMummyArmy() {
        this.mummies = [];

        // Boss-level mummy army
        const mummyPositions = [
            { x: 200, y: 650, direction: 1, speed: 100, type: 'boss' },
            { x: 400, y: 550, direction: -1, speed: 90, type: 'normal' },
            { x: 600, y: 650, direction: 1, speed: 110, type: 'boss' },
            { x: 300, y: 450, direction: -1, speed: 85, type: 'normal' },
            { x: 500, y: 380, direction: 1, speed: 95, type: 'normal' },
            { x: 250, y: 320, direction: -1, speed: 120, type: 'boss' },
            { x: 700, y: 450, direction: 1, speed: 100, type: 'boss' }
        ];

        mummyPositions.forEach(pos => {
            const isBoss = pos.type === 'boss';
            const mummy = new MummySprite(this, pos.x, pos.y, isBoss);
            mummy.setDirection(pos.direction);
            mummy.setMoveSpeed(pos.speed);
            mummy.makeAggressive(); // All Level 3 mummies are aggressive
            
            if (isBoss) {
                // Boss mummies have evil aura
                mummy.addGlowEffect();
            }
            
            this.mummies.push(mummy);
        });
    }

    private createMovingPlatforms() {
        const movingPlatformData = [
            { x: 150, y: 400, endX: 300, speed: 60 },
            { x: 550, y: 280, endX: 700, speed: 80 },
            { x: 300, y: 160, endX: 500, speed: 70 }
        ];

        movingPlatformData.forEach(data => {
            const platform = this.movingPlatforms.create(data.x, data.y, 'movingPlatform');
            platform.setImmovable(true);
            platform.body.setSize(96, 24);
            platform.startX = data.x;
            platform.endX = data.endX;
            platform.speed = data.speed;
            platform.direction = 1;
        });
    }

    private createUI() {
        this.add.text(512, 30, 'LEVEL 3 - The Pharaoh\'s Tomb', {
            fontSize: '24px',
            color: '#FFD700',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.scoreText = this.add.text(16, 16, 'Pyramids: 0', {
            fontSize: '20px',
            color: '#FFD700',
            fontFamily: 'serif'
        });

        this.livesText = this.add.text(16, 50, '♥♥♥ Lives: 3', {
            fontSize: '20px',
            color: '#FF0000',
            fontFamily: 'serif'
        });

        this.add.text(512, 60, 'The ultimate challenge! Reach the summit!', {
            fontSize: '16px',
            color: '#FFD700',
            fontFamily: 'serif'
        }).setOrigin(0.5);
    }

    private setupPhysics() {
        // Pharaoh physics
        this.physics.add.collider(this.pharaoh, this.platforms);
        this.physics.add.collider(this.pharaoh, this.movingPlatforms);
        this.physics.add.overlap(this.pharaoh, this.spikes, this.hitSpike, undefined, this);
        
        // Pyramid physics
        this.physics.add.collider(this.pyramids, this.platforms);
        this.physics.add.overlap(this.pharaoh, this.pyramids, this.collectPyramid, undefined, this);

        // Mummy physics (setup for each individual mummy)
        this.mummies.forEach(mummy => {
            this.physics.add.collider(mummy, this.platforms);
            this.physics.add.collider(mummy, this.movingPlatforms);
            this.physics.add.overlap(this.pharaoh, mummy, this.hitMummy, undefined, this);
        });
    }

    private updateMummies() {
        this.mummies.forEach((mummy: MummySprite) => {
            mummy.update();
        });
    }

    private updateMovingPlatforms() {
        this.movingPlatforms.children.entries.forEach((platform: any) => {
            if (platform.direction === 1 && platform.x >= platform.endX) {
                platform.direction = -1;
            } else if (platform.direction === -1 && platform.x <= platform.startX) {
                platform.direction = 1;
            }
            platform.setVelocityX(platform.direction * platform.speed);
        });
    }

    private collectPyramid(_pharaoh: any, pyramid: any) {
        pyramid.disableBody(true, true);
        this.score += 200; // Highest score for final level
        this.scoreText.setText('Pyramids: ' + (this.score / 200));

        this.tweens.add({
            targets: this.scoreText,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 150,
            yoyo: true
        });

        const remainingPyramids = this.pyramids.children.entries.filter((child: any) => child.active);
        if (remainingPyramids.length === 0) {
            this.victoryComplete();
        }
    }

    private hitMummy(_pharaoh: any, mummy: any) {
        this.cameras.main.flash(200, 255, 0, 0);
        // Boss mummies deal double damage
        if (mummy.isBoss) {
            this.loseLife();
        }
        this.loseLife();
    }

    private hitSpike(_pharaoh: any, _spike: any) {
        this.cameras.main.flash(400, 255, 50, 0);
        this.loseLife();
    }

    private loseLife() {
        this.lives--;
        this.livesText.setText('♥'.repeat(this.lives) + ' Lives: ' + this.lives);

        if (this.lives <= 0) {
            this.scene.start('GameOver');
        } else {
            this.pharaoh.setPosition(100, 500);
            this.pharaoh.setVelocity(0, 0);
        }
    }

    private victoryComplete() {
        this.add.text(512, 300, '🏆 VICTORY! 🏆', {
            fontSize: '64px',
            color: '#FFD700',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.add.text(512, 380, 'You have conquered the Pharaoh\'s Tomb!', {
            fontSize: '28px',
            color: '#FFD700',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.add.text(512, 420, 'The ancient powers are yours!', {
            fontSize: '20px',
            color: '#FF6347',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.physics.pause();

        // Victory celebration effects
        for (let i = 0; i < 50; i++) {
            this.time.delayedCall(i * 100, () => {
                const x = Phaser.Math.Between(0, 1024);
                const y = Phaser.Math.Between(0, 400);
                const star = this.add.text(x, y, '⭐', { fontSize: '20px' });
                this.tweens.add({
                    targets: star,
                    alpha: 0,
                    scaleX: 2,
                    scaleY: 2,
                    duration: 2000,
                    ease: 'Power2'
                });
            });
        }

        this.time.delayedCall(5000, () => {
            this.scene.start('MainMenu');
        });
    }
}
