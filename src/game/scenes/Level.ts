import { Scene } from 'phaser';

export class Level extends Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super('Level');
    }

    create() {
        // Create a simple colored background
        this.cameras.main.setBackgroundColor('#87CEEB');

        // Create platforms group
        this.platforms = this.physics.add.staticGroup();

        // Create ground platform
        const ground = this.add.rectangle(512, 750, 1024, 64, 0x228B22);
        this.platforms.add(ground);

        // Create some floating platforms
        const platform1 = this.add.rectangle(400, 568, 200, 32, 0x228B22);
        const platform2 = this.add.rectangle(750, 400, 200, 32, 0x228B22);
        const platform3 = this.add.rectangle(150, 300, 200, 32, 0x228B22);
        
        this.platforms.add(platform1);
        this.platforms.add(platform2);
        this.platforms.add(platform3);

        // Create a simple colored rectangle for the player
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0xFF0000);
        playerGraphics.fillRect(-16, -24, 32, 48);
        playerGraphics.generateTexture('player', 32, 48);
        playerGraphics.destroy();

        // Create player
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Player physics
        this.physics.add.collider(this.player, this.platforms);

        // Create cursor keys
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Create UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            color: '#000'
        });

        this.add.text(512, 50, 'Use arrow keys to move. Press ESC to return to menu.', {
            fontSize: '20px',
            color: '#000'
        }).setOrigin(0.5);

        // ESC key to return to main menu
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.start('MainMenu');
        });

        // Game timer - go to game over after 30 seconds
        this.time.delayedCall(30000, () => {
            this.scene.start('GameOver');
        });

        // Create some collectible items
        this.createCollectibles();
    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        // Player jumping
        if (this.cursors.up.isDown && this.player.body!.touching.down) {
            this.player.setVelocityY(-530);
        }

        // Check if player fell off the world
        if (this.player.y > 800) {
            this.scene.start('GameOver');
        }
    }

    private createCollectibles() {
        // Create some collectible stars
        const stars = this.physics.add.group();

        // Star positions
        const starPositions = [
            { x: 400, y: 500 },
            { x: 750, y: 330 },
            { x: 150, y: 230 },
            { x: 600, y: 200 },
            { x: 200, y: 600 }
        ];

        starPositions.forEach(pos => {
            // Create a simple star graphic (using circle for simplicity)
            const starGraphics = this.add.graphics();
            starGraphics.fillStyle(0xFFD700);
            starGraphics.fillCircle(0, 0, 16);
            starGraphics.generateTexture('star', 32, 32);
            starGraphics.destroy();

            const star = stars.create(pos.x, pos.y, 'star');
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Star physics
        this.physics.add.collider(stars, this.platforms);
        this.physics.add.overlap(this.player, stars, this.collectStar, undefined, this);
    }

    private collectStar(_player: any, star: any) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Check if all stars collected
        const remainingStars = star.body.parent.children.entries.filter((child: any) => child.active);
        if (remainingStars.length === 0) {
            // All stars collected - go to game over with victory
            this.time.delayedCall(500, () => {
                this.scene.start('GameOver');
            });
        }
    }
}
