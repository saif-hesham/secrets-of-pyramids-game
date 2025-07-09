import { PharaohSpriteGenerator } from './PharaohSpriteGenerator';

export class PharaohSprite extends Phaser.Physics.Arcade.Sprite {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private isGrounded: boolean = false;
    private moveSpeed: number = 150;
    private jumpSpeed: number = 750; // Significantly increased for higher platforms

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Generate the pharaoh sprites first
        PharaohSpriteGenerator.generatePharaohSprites(scene);
        
        // Create sprite with idle texture
        super(scene, x, y, 'pharaoh_idle');
        
        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics
        this.setCollideWorldBounds(true);
        this.setBounce(0.1);
        this.setGravityY(450); // Reduced gravity for better jumping
        
        // Create animations
        this.createAnimations();
        
        // Set up input
        this.cursors = scene.input.keyboard!.createCursorKeys();
        
        // Start with idle animation
        this.play('pharaoh_idle');
    }

    private createAnimations() {
        const scene = this.scene;
        
        // Idle animation (just the single frame, but we can make it breathe)
        if (!scene.anims.exists('pharaoh_idle')) {
            scene.anims.create({
                key: 'pharaoh_idle',
                frames: [{ key: 'pharaoh_idle' }],
                frameRate: 1,
                repeat: -1
            });
        }
        
        // Running animation (4 frames)
        if (!scene.anims.exists('pharaoh_run')) {
            scene.anims.create({
                key: 'pharaoh_run',
                frames: [
                    { key: 'pharaoh_run_0' },
                    { key: 'pharaoh_run_1' },
                    { key: 'pharaoh_run_2' },
                    { key: 'pharaoh_run_3' }
                ],
                frameRate: 8,
                repeat: -1
            });
        }
        
        // Jump animation (single frame)
        if (!scene.anims.exists('pharaoh_jump')) {
            scene.anims.create({
                key: 'pharaoh_jump',
                frames: [{ key: 'pharaoh_jump' }],
                frameRate: 1,
                repeat: 0
            });
        }
    }

    update() {
        // Check if grounded
        this.isGrounded = this.body!.touching.down;
        
        // Handle horizontal movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.moveSpeed);
            this.setFlipX(true); // Face left
            
            if (this.isGrounded && this.anims.currentAnim?.key !== 'pharaoh_run') {
                this.play('pharaoh_run');
            }
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.moveSpeed);
            this.setFlipX(false); // Face right
            
            if (this.isGrounded && this.anims.currentAnim?.key !== 'pharaoh_run') {
                this.play('pharaoh_run');
            }
        } else {
            this.setVelocityX(0);
            
            if (this.isGrounded && this.anims.currentAnim?.key !== 'pharaoh_idle') {
                this.play('pharaoh_idle');
            }
        }
        
        // Handle jumping
        if (this.cursors.up.isDown && this.isGrounded) {
            this.setVelocityY(-this.jumpSpeed);
            this.play('pharaoh_jump');
        }
        
        // Auto-switch back to appropriate animation when landing
        if (this.isGrounded && this.anims.currentAnim?.key === 'pharaoh_jump') {
            if (Math.abs(this.body!.velocity.x) > 0) {
                this.play('pharaoh_run');
            } else {
                this.play('pharaoh_idle');
            }
        }
    }

    // Public methods for external control
    public moveLeft() {
        this.setVelocityX(-this.moveSpeed);
        this.setFlipX(true);
        if (this.isGrounded) this.play('pharaoh_run');
    }

    public moveRight() {
        this.setVelocityX(this.moveSpeed);
        this.setFlipX(false);
        if (this.isGrounded) this.play('pharaoh_run');
    }

    public stopMoving() {
        this.setVelocityX(0);
        if (this.isGrounded) this.play('pharaoh_idle');
    }

    public jump() {
        if (this.isGrounded) {
            this.setVelocityY(-this.jumpSpeed);
            this.play('pharaoh_jump');
        }
    }

    public getIsGrounded(): boolean {
        return this.isGrounded;
    }

    public setMoveSpeed(speed: number) {
        this.moveSpeed = speed;
    }

    public setJumpSpeed(speed: number) {
        this.jumpSpeed = speed;
    }
}
