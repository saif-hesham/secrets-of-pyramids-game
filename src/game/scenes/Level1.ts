import { Scene } from 'phaser';
import { PharaohSprite } from '../sprites/PharaohSprite';
import { MummySprite } from '../sprites/MummySprite';

export class Level1 extends Scene {
    private pharaoh!: PharaohSprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private pyramids!: Phaser.Physics.Arcade.Group;
    private mummies!: MummySprite[];
    private score: number = 0;
    private lives: number = 3;
    private scoreText!: Phaser.GameObjects.Text;
    private livesText!: Phaser.GameObjects.Text;

    constructor() {
        super('Level1');
    }

    create() {
        // Egyptian desert background
        this.cameras.main.setBackgroundColor('#F4A460'); // Sandy brown

        // Create Egyptian-themed graphics
        this.createEgyptianAssets();
        
        // Create platforms group
        this.platforms = this.physics.add.staticGroup();

        // Create ground (sand dunes)
        this.createSandDunes();

        // Create pyramid platforms
        this.createPyramidPlatforms();

        // Create pharaoh player
        this.createPharaoh();

        // Create magical pyramids (collectibles)
        this.createMagicalPyramids();

        // Create mummies (enemies)
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
        // Create magical pyramid (collectible)
        const magicPyramidGraphics = this.add.graphics();
        magicPyramidGraphics.fillStyle(0xFFD700); // Gold
        magicPyramidGraphics.beginPath();
        magicPyramidGraphics.moveTo(0, 20);
        magicPyramidGraphics.lineTo(20, 20);
        magicPyramidGraphics.lineTo(10, 0);
        magicPyramidGraphics.closePath();
        magicPyramidGraphics.fillPath();
        magicPyramidGraphics.lineStyle(2, 0xFFA500); // Orange outline
        magicPyramidGraphics.strokePath();
        // Add magical glow effect
        magicPyramidGraphics.fillStyle(0xFFFFFF, 0.3);
        magicPyramidGraphics.fillCircle(10, 10, 15);
        magicPyramidGraphics.generateTexture('magicPyramid', 20, 20);
        magicPyramidGraphics.destroy();

        // Create sand block texture
        const sandBlockGraphics = this.add.graphics();
        sandBlockGraphics.fillStyle(0xDAA520); // Goldenrod
        sandBlockGraphics.fillRect(0, 0, 64, 32);
        sandBlockGraphics.lineStyle(1, 0xCD853F); // Peru outline
        sandBlockGraphics.strokeRect(0, 0, 64, 32);
        // Add sand texture
        for (let i = 0; i < 20; i++) {
            sandBlockGraphics.fillStyle(0xF4A460, 0.5);
            sandBlockGraphics.fillCircle(Math.random() * 64, Math.random() * 32, 1);
        }
        sandBlockGraphics.generateTexture('sandBlock', 64, 32);
        sandBlockGraphics.destroy();
    }

    private createSandDunes() {
        // Ground platforms (sand dunes)
        for (let x = 0; x < 1024; x += 64) {
            const ground = this.add.rectangle(x + 32, 750, 64, 32, 0xDAA520);
            this.platforms.add(ground);
        }
    }

    private createPyramidPlatforms() {
        // Pyramid-shaped platforms
        const platformPositions = [
            { x: 200, y: 600 },
            { x: 400, y: 500 },
            { x: 650, y: 400 },
            { x: 850, y: 300 }
        ];

        platformPositions.forEach(pos => {
            const platform = this.add.rectangle(pos.x, pos.y, 128, 32, 0xCD853F);
            this.platforms.add(platform);
        });
    }

    private createPharaoh() {
        this.pharaoh = new PharaohSprite(this, 100, 500);
    }

    private createMagicalPyramids() {
        this.pyramids = this.physics.add.group();

        const pyramidPositions = [
            { x: 200, y: 550 },
            { x: 400, y: 450 },
            { x: 650, y: 350 },
            { x: 850, y: 250 },
            { x: 300, y: 200 },
            { x: 500, y: 150 }
        ];

        pyramidPositions.forEach(pos => {
            const pyramid = this.pyramids.create(pos.x, pos.y, 'magicPyramid');
            pyramid.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            pyramid.setScale(1.5);
            
            // Add glow animation
            this.tweens.add({
                targets: pyramid,
                alpha: 0.6,
                duration: 1000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        });
    }

    private createMummies() {
        this.mummies = [];

        const mummyPositions = [
            { x: 300, y: 600, direction: 1 },
            { x: 550, y: 400, direction: -1 },
            { x: 750, y: 300, direction: 1 }
        ];

        mummyPositions.forEach(pos => {
            const mummy = new MummySprite(this, pos.x, pos.y, false);
            mummy.setDirection(pos.direction);
            this.mummies.push(mummy);
        });
    }

    private createUI() {
        this.add.text(512, 30, 'LEVEL 1 - The Great Pyramid', {
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

        this.add.text(512, 60, 'Collect all magical pyramids! Avoid the mummies!', {
            fontSize: '16px',
            color: '#8B4513',
            fontFamily: 'serif'
        }).setOrigin(0.5);
    }

    private setupPhysics() {
        // Pharaoh physics
        this.physics.add.collider(this.pharaoh, this.platforms);
        
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
        this.score += 100;
        this.scoreText.setText('Pyramids: ' + (this.score / 100));

        // Play collect effect
        this.tweens.add({
            targets: this.scoreText,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true
        });

        // Check if all pyramids collected
        const remainingPyramids = this.pyramids.children.entries.filter((child: any) => child.active);
        if (remainingPyramids.length === 0) {
            this.completeLevel();
        }
    }

    private hitMummy(_pharaoh: any, _mummy: any) {
        // Flash effect
        this.cameras.main.flash(200, 255, 0, 0);
        
        this.loseLife();
    }

    private loseLife() {
        this.lives--;
        this.livesText.setText('♥'.repeat(this.lives) + ' Lives: ' + this.lives);

        if (this.lives <= 0) {
            this.scene.start('GameOver');
        } else {
            // Respawn pharaoh
            this.pharaoh.setPosition(100, 500);
            this.pharaoh.setVelocity(0, 0);
        }
    }

    private completeLevel() {
        this.add.text(512, 384, 'LEVEL COMPLETE!', {
            fontSize: '48px',
            color: '#FFD700',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        this.add.text(512, 440, 'Proceeding to Level 2...', {
            fontSize: '24px',
            color: '#8B4513',
            fontFamily: 'serif'
        }).setOrigin(0.5);

        // Disable input temporarily
        this.physics.pause();

        // Move to next level after delay
        this.time.delayedCall(3000, () => {
            this.scene.start('Level2');
        });
    }
}
