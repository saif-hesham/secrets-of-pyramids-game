import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        // Since we're creating graphics programmatically, we can skip asset loading here.
        
        // Create a simple background texture
        const graphics = this.add.graphics();
        graphics.fillStyle(0x2c3e50);
        graphics.fillRect(0, 0, 1024, 768);
        graphics.generateTexture('background', 1024, 768);
        graphics.destroy();
    }

    create() {
        this.scene.start('Preloader');
    }
}
