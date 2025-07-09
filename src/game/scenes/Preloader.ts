import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // We loaded background in Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        // Loading text
        this.add.text(512, 300, 'Loading Game...', {
            fontFamily: 'Arial Black', 
            fontSize: 32, 
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // A simple progress bar outline
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // This is the progress bar itself
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // Simulate loading progress
        let progress = 0;
        const timer = this.time.addEvent({
            delay: 50,
            callback: () => {
                progress += 0.02;
                bar.width = 4 + (460 * progress);
                
                if (progress >= 1) {
                    timer.remove();
                    // Small delay before moving to main menu
                    this.time.delayedCall(500, () => {
                        this.scene.start('MainMenu');
                    });
                }
            },
            loop: true
        });
    }

    preload() {
        // Load any additional assets here if needed
        // For this template, we're creating everything programmatically
    }

    create() {
        // This will be called after preload completes
        // But we're handling scene transition in init() for this template
    }
}
