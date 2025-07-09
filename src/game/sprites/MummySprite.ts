import { MummySpriteGenerator } from './MummySpriteGenerator';

export class MummySprite extends Phaser.Physics.Arcade.Sprite {
    private moveSpeed: number = 50;
    private direction: number = 1; // 1 for right, -1 for left
    private isBoss: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, isBoss: boolean = false) {
        // Generate the mummy sprites first
        MummySpriteGenerator.generateMummySprites(scene);
        
        // Create sprite with appropriate texture
        const texture = isBoss ? 'boss_mummy' : 'mummy_idle';
        super(scene, x, y, texture);
        
        this.isBoss = isBoss;
        
        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setGravityY(500);
        
        // Make sure the physics body is properly sized
        if (this.body) {
            const body = this.body as Phaser.Physics.Arcade.Body;
            body.setSize(this.displayWidth * 0.8, this.displayHeight * 0.9);
            body.setOffset(this.displayWidth * 0.1, this.displayHeight * 0.1);
        }
        
        // Boss mummies are bigger and tougher
        if (isBoss) {
            this.setScale(1.2);
            this.moveSpeed = 30; // Slower but more menacing
        }
        
        // Create animations
        this.createAnimations();
        
        // Randomize initial direction for variety
        this.direction = Math.random() < 0.5 ? -1 : 1;
        
        // Start with appropriate animation
        if (isBoss) {
            this.play('boss_mummy_idle');
        } else {
            this.play('mummy_walk');
        }
        
        // Set initial movement
        this.setVelocityX(this.direction * this.moveSpeed);
    }

    private createAnimations() {
        const scene = this.scene;
        
        // Regular mummy walking animation
        if (!scene.anims.exists('mummy_walk')) {
            scene.anims.create({
                key: 'mummy_walk',
                frames: [
                    { key: 'mummy_walk_0' },
                    { key: 'mummy_walk_1' },
                    { key: 'mummy_walk_2' },
                    { key: 'mummy_walk_3' }
                ],
                frameRate: 4, // Slow shambling pace
                repeat: -1
            });
        }
        
        // Regular mummy idle animation
        if (!scene.anims.exists('mummy_idle')) {
            scene.anims.create({
                key: 'mummy_idle',
                frames: [{ key: 'mummy_idle' }],
                frameRate: 1,
                repeat: -1
            });
        }
        
        // Boss mummy idle (could add more frames later)
        if (!scene.anims.exists('boss_mummy_idle')) {
            scene.anims.create({
                key: 'boss_mummy_idle',
                frames: [{ key: 'boss_mummy' }],
                frameRate: 1,
                repeat: -1
            });
        }
    }

    update() {
        if (!this.body) return;
        
        const worldBounds = this.scene.physics.world.bounds;
        const bodyBounds = this.body as Phaser.Physics.Arcade.Body;
        
        // Only check for world border collision - we want mummies to walk all the way to edges
        // and then come back - no other turning conditions
        if ((bodyBounds.x <= 10 && this.direction < 0) || 
            (bodyBounds.right >= worldBounds.width - 10 && this.direction > 0)) {
            // Reached screen border, change direction
            this.direction *= -1;
        }
        
        // Always apply movement based on current direction
        this.setVelocityX(this.direction * this.moveSpeed);
        
        // Face the direction of movement
        this.setFlipX(this.direction < 0);
        
        // Play appropriate animation based on movement
        if (!this.isBoss) {
            if (Math.abs(bodyBounds.velocity.x) > 0) {
                if (this.anims.currentAnim?.key !== 'mummy_walk') {
                    this.play('mummy_walk');
                }
            } else {
                if (this.anims.currentAnim?.key !== 'mummy_idle') {
                    this.play('mummy_idle');
                }
            }
        }
    }

    // Direction is now changed directly in the update method

    // Public methods for external control
    public setMoveSpeed(speed: number) {
        this.moveSpeed = speed;
    }

    public getMoveSpeed(): number {
        return this.moveSpeed;
    }

    public getDirection(): number {
        return this.direction;
    }

    public setDirection(direction: number) {
        this.direction = direction;
        this.setVelocityX(this.direction * this.moveSpeed);
    }

    public getIsBoss(): boolean {
        return this.isBoss;
    }

    // Method to make mummy more aggressive (for higher levels)
    public makeAggressive() {
        this.moveSpeed = this.isBoss ? 50 : 80;
        this.setTint(0xFF4444); // Reddish tint for aggression
    }

    // Method to add glowing effect
    public addGlowEffect() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0.7,
            duration: 800,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
}
