export class MummySpriteGenerator {
    static generateMummySprites(scene: Phaser.Scene) {
        // Generate idle mummy sprite
        this.generateIdleSprite(scene);
        
        // Generate walking animation frames
        this.generateWalkSprites(scene);
        
        // Generate boss mummy sprites
        this.generateBossMummySprites(scene);
    }

    private static generateIdleSprite(scene: Phaser.Scene) {
        const graphics = scene.add.graphics();
        graphics.clear();
        
        // Offset to center the sprite properly
        const centerX = 24;
        const centerY = 24;
        
        // Body (wrapped mummy bandages)
        graphics.lineStyle(2, 0x8B7355); // Dark tan border
        graphics.fillStyle(0xF5DEB3); // Wheat color for aged bandages
        graphics.fillRoundedRect(centerX - 10, centerY - 5, 20, 30, 3);
        graphics.strokeRoundedRect(centerX - 10, centerY - 5, 20, 30, 3);
        
        // Arms (wrapped)
        graphics.fillStyle(0xF5DEB3);
        graphics.fillEllipse(centerX - 14, centerY + 5, 6, 12); // Left arm
        graphics.strokeEllipse(centerX - 14, centerY + 5, 6, 12);
        graphics.fillEllipse(centerX + 14, centerY + 5, 6, 12); // Right arm
        graphics.strokeEllipse(centerX + 14, centerY + 5, 6, 12);
        
        // Legs (wrapped)
        graphics.fillStyle(0xF5DEB3);
        graphics.fillRoundedRect(centerX - 8, centerY + 25, 6, 12, 2); // Left leg
        graphics.fillRoundedRect(centerX + 2, centerY + 25, 6, 12, 2); // Right leg
        
        // Head (wrapped)
        graphics.lineStyle(2, 0x8B7355);
        graphics.fillStyle(0xF5DEB3);
        graphics.fillCircle(centerX, centerY - 15, 10);
        graphics.strokeCircle(centerX, centerY - 15, 10);
        
        // Bandage wrapping details on body
        graphics.lineStyle(1.5, 0xDEB887); // Lighter bandage lines
        for (let i = 0; i < 6; i++) {
            graphics.beginPath();
            graphics.moveTo(centerX - 10, centerY - 3 + i * 5);
            graphics.lineTo(centerX + 10, centerY - 3 + i * 5);
            graphics.strokePath();
        }
        
        // Bandage wrapping on head
        graphics.beginPath();
        graphics.moveTo(centerX - 8, centerY - 20);
        graphics.lineTo(centerX + 8, centerY - 18);
        graphics.strokePath();
        graphics.beginPath();
        graphics.moveTo(centerX - 6, centerY - 12);
        graphics.lineTo(centerX + 6, centerY - 14);
        graphics.strokePath();
        
        // Glowing red eyes
        graphics.fillStyle(0xFF4444); // Bright red
        graphics.fillCircle(centerX - 4, centerY - 16, 2); // Left eye
        graphics.fillCircle(centerX + 4, centerY - 16, 2); // Right eye
        
        // Eye glow effect
        graphics.fillStyle(0xFF0000, 0.3);
        graphics.fillCircle(centerX - 4, centerY - 16, 4);
        graphics.fillCircle(centerX + 4, centerY - 16, 4);
        
        // Tattered bandage ends
        graphics.fillStyle(0xDEB887);
        graphics.fillRect(centerX - 12, centerY + 8, 3, 6); // Left arm tatter
        graphics.fillRect(centerX + 9, centerY + 12, 3, 6); // Right arm tatter
        
        graphics.generateTexture('mummy_idle', 48, 48);
        graphics.destroy();
    }

    private static generateWalkSprites(scene: Phaser.Scene) {
        // Generate 4 frames for walking animation
        for (let frame = 0; frame < 4; frame++) {
            const graphics = scene.add.graphics();
            graphics.clear();
            
            // Offset to center the sprite properly
            const centerX = 24;
            const centerY = 24;
            
            // Calculate animation offset (shambling movement)
            const legOffset = Math.sin(frame * Math.PI / 2) * 2;
            const armOffset = Math.sin(frame * Math.PI / 2) * 1.5;
            const bodyBob = Math.sin(frame * Math.PI / 2) * 0.8;
            const headTilt = Math.sin(frame * Math.PI / 2) * 0.5;
            
            // Body (shambling with bobbing)
            graphics.lineStyle(2, 0x8B7355);
            graphics.fillStyle(0xF5DEB3);
            graphics.fillRoundedRect(centerX - 10, centerY - 5 + bodyBob, 20, 30, 3);
            graphics.strokeRoundedRect(centerX - 10, centerY - 5 + bodyBob, 20, 30, 3);
            
            // Arms (swaying motion)
            graphics.fillStyle(0xF5DEB3);
            graphics.fillEllipse(centerX - 14 + armOffset, centerY + 5 + bodyBob, 6, 12);
            graphics.strokeEllipse(centerX - 14 + armOffset, centerY + 5 + bodyBob, 6, 12);
            graphics.fillEllipse(centerX + 14 - armOffset, centerY + 5 + bodyBob, 6, 12);
            graphics.strokeEllipse(centerX + 14 - armOffset, centerY + 5 + bodyBob, 6, 12);
            
            // Legs (shambling motion)
            graphics.fillStyle(0xF5DEB3);
            graphics.fillRoundedRect(centerX - 8, centerY + 25 + legOffset + bodyBob, 6, 12, 2);
            graphics.fillRoundedRect(centerX + 2, centerY + 25 - legOffset + bodyBob, 6, 12, 2);
            
            // Head (tilting as it shambles)
            graphics.lineStyle(2, 0x8B7355);
            graphics.fillStyle(0xF5DEB3);
            graphics.fillCircle(centerX + headTilt, centerY - 15 + bodyBob, 10);
            graphics.strokeCircle(centerX + headTilt, centerY - 15 + bodyBob, 10);
            
            // Bandage wrapping details
            graphics.lineStyle(1.5, 0xDEB887);
            for (let i = 0; i < 6; i++) {
                graphics.beginPath();
                graphics.moveTo(centerX - 10, centerY - 3 + i * 5 + bodyBob);
                graphics.lineTo(centerX + 10, centerY - 3 + i * 5 + bodyBob);
                graphics.strokePath();
            }
            
            // Head bandages
            graphics.beginPath();
            graphics.moveTo(centerX - 8 + headTilt, centerY - 20 + bodyBob);
            graphics.lineTo(centerX + 8 + headTilt, centerY - 18 + bodyBob);
            graphics.strokePath();
            graphics.beginPath();
            graphics.moveTo(centerX - 6 + headTilt, centerY - 12 + bodyBob);
            graphics.lineTo(centerX + 6 + headTilt, centerY - 14 + bodyBob);
            graphics.strokePath();
            
            // Glowing eyes (with slight intensity variation)
            const eyeIntensity = 0.8 + Math.sin(frame * Math.PI / 2) * 0.2;
            graphics.fillStyle(Phaser.Display.Color.GetColor(255 * eyeIntensity, 68 * eyeIntensity, 68 * eyeIntensity));
            graphics.fillCircle(centerX - 4 + headTilt, centerY - 16 + bodyBob, 2);
            graphics.fillCircle(centerX + 4 + headTilt, centerY - 16 + bodyBob, 2);
            
            // Eye glow
            graphics.fillStyle(0xFF0000, 0.3);
            graphics.fillCircle(centerX - 4 + headTilt, centerY - 16 + bodyBob, 4);
            graphics.fillCircle(centerX + 4 + headTilt, centerY - 16 + bodyBob, 4);
            
            // Tattered bandages (moving with animation)
            graphics.fillStyle(0xDEB887);
            graphics.fillRect(centerX - 12 + armOffset, centerY + 8 + bodyBob, 3, 6);
            graphics.fillRect(centerX + 9 - armOffset, centerY + 12 + bodyBob, 3, 6);
            
            graphics.generateTexture(`mummy_walk_${frame}`, 48, 48);
            graphics.destroy();
        }
    }

    private static generateBossMummySprites(scene: Phaser.Scene) {
        // Generate boss mummy idle
        const graphics = scene.add.graphics();
        graphics.clear();
        
        const centerX = 24;
        const centerY = 24;
        
        // Larger, more intimidating body
        graphics.lineStyle(3, 0x2F2F2F); // Dark border
        graphics.fillStyle(0x4A4A4A); // Dark gray aged bandages
        graphics.fillRoundedRect(centerX - 12, centerY - 8, 24, 35, 4);
        graphics.strokeRoundedRect(centerX - 12, centerY - 8, 24, 35, 4);
        
        // Bulkier arms
        graphics.fillStyle(0x4A4A4A);
        graphics.fillEllipse(centerX - 16, centerY + 3, 8, 15);
        graphics.strokeEllipse(centerX - 16, centerY + 3, 8, 15);
        graphics.fillEllipse(centerX + 16, centerY + 3, 8, 15);
        graphics.strokeEllipse(centerX + 16, centerY + 3, 8, 15);
        
        // Thicker legs
        graphics.fillStyle(0x4A4A4A);
        graphics.fillRoundedRect(centerX - 10, centerY + 27, 8, 15, 3);
        graphics.fillRoundedRect(centerX + 2, centerY + 27, 8, 15, 3);
        
        // Larger head
        graphics.lineStyle(3, 0x2F2F2F);
        graphics.fillStyle(0x4A4A4A);
        graphics.fillCircle(centerX, centerY - 18, 12);
        graphics.strokeCircle(centerX, centerY - 18, 12);
        
        // Dark bandage details
        graphics.lineStyle(2, 0x2F2F2F);
        for (let i = 0; i < 7; i++) {
            graphics.beginPath();
            graphics.moveTo(centerX - 12, centerY - 6 + i * 5);
            graphics.lineTo(centerX + 12, centerY - 6 + i * 5);
            graphics.strokePath();
        }
        
        // Menacing glowing eyes
        graphics.fillStyle(0xFF0000); // Intense red
        graphics.fillCircle(centerX - 5, centerY - 19, 3);
        graphics.fillCircle(centerX + 5, centerY - 19, 3);
        
        // Strong glow effect
        graphics.fillStyle(0xFF0000, 0.5);
        graphics.fillCircle(centerX - 5, centerY - 19, 6);
        graphics.fillCircle(centerX + 5, centerY - 19, 6);
        
        // Aura of evil
        graphics.lineStyle(3, 0xFF0000, 0.4);
        graphics.strokeCircle(centerX, centerY, 20);
        
        graphics.generateTexture('boss_mummy', 48, 48);
        graphics.destroy();
    }
}
