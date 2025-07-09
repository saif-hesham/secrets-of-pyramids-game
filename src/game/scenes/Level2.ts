import { Scene } from 'phaser';
import { PharaohSprite } from '../sprites/PharaohSprite';
import { MummySprite } from '../sprites/MummySprite';

export class Level2 extends Scene {
    private pharaoh!: PharaohSprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private pyramids!: Phaser.Physics.Arcade.Group;
    private mummies!: MummySprite[];
    private spikes!: Phaser.Physics.Arcade.StaticGroup;
    private score: number = 0;
    private lives: number = 3;
    private scoreText!: Phaser.GameObjects.Text;
    private livesText!: Phaser.GameObjects.Text;

    constructor() {
        super('Level2');
    }

    create() {
        // Darker desert background for level 2
        this.cameras.main.setBackgroundColor('#CD853F'); // Peru color

        // Create Egyptian-themed graphics
        this.createEgyptianAssets();
        
        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        // Create more complex level geometry
        this.createComplexLevel();

        // Create pharaoh player
        this.createPharaoh();

        // Create magical pyramids (more scattered)
        this.createMagicalPyramids();

        // Create more mummies
        this.createMummies();

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
        // Update pharaoh (handles input automatically)
        this.pharaoh.update();

        // Check if pharaoh fell off the world
        if (this.pharaoh.y > 800) {
            this.loseLife();
        }

        // Update mummy AI
        this.updateMummies();
    }

    private createEgyptianAssets() {
        // Create magical pyramid (enhanced glow)
        const magicPyramidGraphics = this.add.graphics();
        magicPyramidGraphics.fillStyle(0xFFD700);
        magicPyramidGraphics.beginPath();
        magicPyramidGraphics.moveTo(0, 20);
        magicPyramidGraphics.lineTo(20, 20);
        magicPyramidGraphics.lineTo(10, 0);
        magicPyramidGraphics.closePath();
        magicPyramidGraphics.fillPath();
        magicPyramidGraphics.lineStyle(2, 0x00FFFF); // Cyan glow
        magicPyramidGraphics.strokePath();
        magicPyramidGraphics.fillStyle(0x00FFFF, 0.4);
        magicPyramidGraphics.fillCircle(10, 10, 18);
        magicPyramidGraphics.generateTexture('magicPyramid', 20, 20);
        magicPyramidGraphics.destroy();

        // Create stone block texture
        const stoneBlockGraphics = this.add.graphics();
        stoneBlockGraphics.fillStyle(0x696969); // Dim gray
        stoneBlockGraphics.fillRect(0, 0, 64, 32);
        stoneBlockGraphics.lineStyle(1, 0x2F4F4F); // Dark slate gray
        stoneBlockGraphics.strokeRect(0, 0, 64, 32);
        stoneBlockGraphics.generateTexture('stoneBlock', 64, 32);
        stoneBlockGraphics.destroy();

        // Create spike trap
        const spikeGraphics = this.add.graphics();
        spikeGraphics.fillStyle(0x8B4513); // Saddle brown
        for (let i = 0; i < 4; i++) {
            spikeGraphics.fillTriangle(i * 16, 16, i * 16 + 8, 0, i * 16 + 16, 16);
        }
        spikeGraphics.generateTexture('spikes', 64, 16);
        spikeGraphics.destroy();
    }

    private createComplexLevel() {
        // Ground platforms
        for (let x = 0; x < 1024; x += 64) {
            const ground = this.add.rectangle(x + 32, 750, 64, 32, 0x696969);
            this.platforms.add(ground);
        }

        // More complex platform layout
        const platformData = [
            { x: 128, y: 650, w: 128, h: 32 },
            { x: 350, y: 580, w: 96, h: 32 },
            { x: 200, y: 480, w: 64, h: 32 },
            { x: 500, y: 450, w: 128, h: 32 },
            { x: 750, y: 380, w: 96, h: 32 },
            { x: 400, y: 320, w: 64, h: 32 },
            { x: 650, y: 250, w: 128, h: 32 },
            { x: 150, y: 200, w: 96, h: 32 },
            { x: 850, y: 150, w: 128, h: 32 }
        ];

        platformData.forEach(data => {
            const platform = this.add.rectangle(data.x, data.y, data.w, data.h, 0x696969);
            this.platforms.add(platform);
        });

        // Add spike traps
        const spikePositions = [
            { x: 300, y: 734 },
            { x: 600, y: 734 },
            { x: 450, y: 434 },
            { x: 700, y: 234 }
        ];

        spikePositions.forEach(pos => {
            const spike = this.add.rectangle(pos.x, pos.y, 64, 16, 0x8B4513);
            this.spikes.add(spike);
        });
    }

    private createPharaoh() {
        this.pharaoh = new PharaohSprite(this, 100, 500);
        // Slightly faster speed and higher jump for level 2
        this.pharaoh.setMoveSpeed(180);
        this.pharaoh.setJumpSpeed(800); // Much higher jump for level 2 platforms
    }

    private createMagicalPyramids() {
        this.pyramids = this.physics.add.group();

        const pyramidPositions = [
            { x: 128, y: 600 },
            { x: 350, y: 530 },
            { x: 200, y: 430 },
            { x: 500, y: 400 },
            { x: 750, y: 330 },
            { x: 400, y: 270 },
            { x: 650, y: 200 },
            { x: 150, y: 150 },
            { x: 850, y: 100 }
        ];

        pyramidPositions.forEach(pos => {
            const pyramid = this.pyramids.create(pos.x, pos.y, 'magicPyramid');
            pyramid.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            pyramid.setScale(1.0); // New texture is already sized appropriately
            
            // Add cyan tint for Level 2 - more magical look
            pyramid.setTint(0x80FFFF);
            
            // Enhanced animations for Level 2
            
            // Pulsing glow effect
            this.tweens.add({
                targets: pyramid,
                alpha: 0.7,
                duration: 1000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
            
            // Floating effect
            this.tweens.add({
                targets: pyramid,
                y: pos.y - 12,  // More pronounced floating
                duration: 1500,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
            
            // Rotation effect
            this.tweens.add({
                targets: pyramid,
                angle: 8,  // More rotation than Level 1
                duration: 1800,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        });
    }

    private createMummies() {
        this.mummies = [];

        const mummyPositions = [
            { x: 250, y: 650, direction: 1, speed: 70 },
            { x: 400, y: 580, direction: -1, speed: 80 },
            { x: 600, y: 450, direction: 1, speed: 60 },
            { x: 300, y: 320, direction: -1, speed: 90 },
            { x: 750, y: 250, direction: 1, speed: 75 }
        ];

        mummyPositions.forEach(pos => {
            const mummy = new MummySprite(this, pos.x, pos.y, false);
            mummy.setDirection(pos.direction);
            mummy.setMoveSpeed(pos.speed);
            mummy.makeAggressive(); // Level 2 mummies are more aggressive
            this.mummies.push(mummy);
        });
    }

    private createUI() {
        this.add.text(512, 30, 'LEVEL 2 - The Cursed Chamber', {
            fontSize: '24px',
            color: '#8B4513',
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

        this.add.text(512, 60, 'Beware the spikes and faster mummies!', {
            fontSize: '16px',
            color: '#8B4513',
            fontFamily: 'serif'
        }).setOrigin(0.5);
    }

    private setupPhysics() {
        // Pharaoh physics
        this.physics.add.collider(this.pharaoh, this.platforms);
        this.physics.add.overlap(this.pharaoh, this.spikes, this.hitSpike, undefined, this);
        
        // Pyramid physics
        this.physics.add.collider(this.pyramids, this.platforms);
        this.physics.add.overlap(this.pharaoh, this.pyramids, this.collectPyramid, undefined, this);

        // Mummy physics (setup for each individual mummy)
        this.mummies.forEach(mummy => {
            this.physics.add.collider(mummy, this.platforms);
            this.physics.add.overlap(this.pharaoh, mummy, this.hitMummy, undefined, this);
        });
    }

    private updateMummies() {
        this.mummies.forEach((mummy: MummySprite) => {
            mummy.update();
        });
    }

    private collectPyramid(_pharaoh: any, pyramid: any) {
        pyramid.disableBody(true, true);
        this.score += 150; // Higher score for level 2
        this.scoreText.setText('Pyramids: ' + (this.score / 150));

        this.tweens.add({
            targets: this.scoreText,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true
        });

        const remainingPyramids = this.pyramids.children.entries.filter((child: any) => child.active);
        if (remainingPyramids.length === 0) {
            this.completeLevel();
        }
    }

    private hitMummy(_pharaoh: any, _mummy: any) {
        this.cameras.main.flash(200, 255, 0, 0);
        this.loseLife();
    }

    private hitSpike(_pharaoh: any, _spike: any) {
        this.cameras.main.flash(300, 255, 100, 0);
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

    private completeLevel() {
        this.add.text(512, 384, 'LEVEL 2 COMPLETE!', {
            fontSize: '48px',
            color: '#FFD700',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.add.text(512, 440, 'Final challenge awaits...', {
            fontSize: '24px',
            color: '#8B4513',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.physics.pause();

        this.time.delayedCall(3000, () => {
            this.scene.start('Level3');
        });
    }
}
