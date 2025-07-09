export class PharaohSpriteGenerator {
    static generatePharaohSprites(scene: Phaser.Scene) {
        // Generate idle pharaoh sprite
        this.generateIdleSprite(scene);
        
        // Generate running animation frames
        this.generateRunSprites(scene);
        
        // Generate jump sprite
        this.generateJumpSprite(scene);
    }

    private static generateIdleSprite(scene: Phaser.Scene) {
        const graphics = scene.add.graphics();
        graphics.clear();
        
        // Offset to center the sprite properly
        const centerX = 24;
        const centerY = 24;
        
        // Body outline (golden tunic with border)
        graphics.lineStyle(2, 0xB8860B); // Darker gold border
        graphics.fillStyle(0xFFD700); // Bright gold
        graphics.fillRoundedRect(centerX - 10, centerY - 5, 20, 25, 4);
        graphics.strokeRoundedRect(centerX - 10, centerY - 5, 20, 25, 4);
        
        // Belt
        graphics.fillStyle(0x8B4513);
        graphics.fillRect(centerX - 10, centerY + 8, 20, 3);
        
        // Arms (relaxed at sides)
        graphics.lineStyle(1.5, 0x8B7355);
        graphics.fillStyle(0xCD853F); // Warm skin tone
        graphics.fillEllipse(centerX - 14, centerY + 2, 6, 8); // Left arm
        graphics.strokeEllipse(centerX - 14, centerY + 2, 6, 8);
        graphics.fillEllipse(centerX + 14, centerY + 2, 6, 8); // Right arm
        graphics.strokeEllipse(centerX + 14, centerY + 2, 6, 8);
        
        // Legs (simple and clean)
        graphics.fillStyle(0x8B4513); // Brown
        graphics.fillRoundedRect(centerX - 8, centerY + 20, 6, 14, 2); // Left leg
        graphics.fillRoundedRect(centerX + 2, centerY + 20, 6, 14, 2); // Right leg
        
        // Sandals
        graphics.fillStyle(0xDAA520); // Goldenrod
        graphics.fillEllipse(centerX - 5, centerY + 36, 10, 5); // Left foot
        graphics.fillEllipse(centerX + 5, centerY + 36, 10, 5); // Right foot
        
        // Head (larger and more prominent)
        graphics.lineStyle(1.5, 0x8B7355);
        graphics.fillStyle(0xCD853F);
        graphics.fillCircle(centerX, centerY - 15, 10);
        graphics.strokeCircle(centerX, centerY - 15, 10);
        
        // Friendly eyes (larger and more expressive)
        graphics.fillStyle(0xFFFFFF); // White eye background
        graphics.fillEllipse(centerX - 4, centerY - 17, 4, 3);
        graphics.fillEllipse(centerX + 4, centerY - 17, 4, 3);
        graphics.fillStyle(0x000000); // Black pupils
        graphics.fillCircle(centerX - 4, centerY - 17, 1.5);
        graphics.fillCircle(centerX + 4, centerY - 17, 1.5);
        
        // Eye sparkles for friendliness
        graphics.fillStyle(0xFFFFFF);
        graphics.fillCircle(centerX - 3.5, centerY - 17.5, 0.5);
        graphics.fillCircle(centerX + 4.5, centerY - 17.5, 0.5);
        
        // Warm, friendly smile
        graphics.lineStyle(2, 0x000000);
        graphics.beginPath();
        graphics.arc(centerX, centerY - 12, 4, 0.3, Math.PI - 0.3, false);
        graphics.strokePath();
        
        // Pharaoh headdress (nemes)
        graphics.lineStyle(2, 0x1E3A8A); // Dark blue border
        graphics.fillStyle(0x3B82F6); // Royal blue
        graphics.fillRoundedRect(centerX - 13, centerY - 27, 26, 15, 2);
        graphics.strokeRoundedRect(centerX - 13, centerY - 27, 26, 15, 2);
        
        // Headdress side flaps
        graphics.fillTriangle(centerX - 13, centerY - 27, centerX - 17, centerY - 32, centerX - 10, centerY - 27);
        graphics.fillTriangle(centerX + 13, centerY - 27, centerX + 17, centerY - 32, centerX + 10, centerY - 27);
        
        // Gold stripes on headdress
        graphics.fillStyle(0xFFD700);
        for (let i = 0; i < 3; i++) {
            graphics.fillRect(centerX - 13, centerY - 25 + i * 4, 26, 1);
        }
        
        // Central jewel (larger and more prominent)
        graphics.fillStyle(0xFF6B6B); // Ruby red
        graphics.fillCircle(centerX, centerY - 19, 3);
        graphics.lineStyle(1, 0x8B0000);
        graphics.strokeCircle(centerX, centerY - 19, 3);
        
        // Cobra (uraeus) - simplified but clear
        graphics.fillStyle(0xFFA500); // Orange
        graphics.fillEllipse(centerX, centerY - 27, 4, 6);
        graphics.fillStyle(0xFF0000); // Red
        graphics.fillCircle(centerX, centerY - 29, 1.5);
        
        graphics.generateTexture('pharaoh_idle', 48, 48);
        graphics.destroy();
    }

    private static generateRunSprites(scene: Phaser.Scene) {
        // Generate 4 frames for running animation
        for (let frame = 0; frame < 4; frame++) {
            const graphics = scene.add.graphics();
            graphics.clear();
            
            // Offset to center the sprite properly
            const centerX = 24;
            const centerY = 24;
            
            // Calculate animation offset
            const legOffset = Math.sin(frame * Math.PI / 2) * 3;
            const armOffset = Math.cos(frame * Math.PI / 2) * 2;
            const bodyBob = Math.sin(frame * Math.PI / 2) * 1.5;
            
            // Body (with slight bobbing and forward lean)
            graphics.lineStyle(2, 0xB8860B);
            graphics.fillStyle(0xFFD700);
            graphics.fillRoundedRect(centerX - 10, centerY - 5 + bodyBob, 20, 25, 4);
            graphics.strokeRoundedRect(centerX - 10, centerY - 5 + bodyBob, 20, 25, 4);
            
            // Belt
            graphics.fillStyle(0x8B4513);
            graphics.fillRect(centerX - 10, centerY + 8 + bodyBob, 20, 3);
            
            // Arms (swinging motion)
            graphics.lineStyle(1.5, 0x8B7355);
            graphics.fillStyle(0xCD853F);
            graphics.fillEllipse(centerX - 14 + armOffset, centerY + 2 + bodyBob, 6, 8);
            graphics.strokeEllipse(centerX - 14 + armOffset, centerY + 2 + bodyBob, 6, 8);
            graphics.fillEllipse(centerX + 14 - armOffset, centerY + 2 + bodyBob, 6, 8);
            graphics.strokeEllipse(centerX + 14 - armOffset, centerY + 2 + bodyBob, 6, 8);
            
            // Legs (running motion with better positioning)
            graphics.fillStyle(0x8B4513);
            graphics.fillRoundedRect(centerX - 8, centerY + 20 + legOffset + bodyBob, 6, 14, 2);
            graphics.fillRoundedRect(centerX + 2, centerY + 20 - legOffset + bodyBob, 6, 14, 2);
            
            // Sandals (alternating positions)
            graphics.fillStyle(0xDAA520);
            graphics.fillEllipse(centerX - 5, centerY + 36 + legOffset + bodyBob, 10, 5);
            graphics.fillEllipse(centerX + 5, centerY + 36 - legOffset + bodyBob, 10, 5);
            
            // Head (same friendly design with bobbing)
            graphics.lineStyle(1.5, 0x8B7355);
            graphics.fillStyle(0xCD853F);
            graphics.fillCircle(centerX, centerY - 15 + bodyBob, 10);
            graphics.strokeCircle(centerX, centerY - 15 + bodyBob, 10);
            
            // Focused but friendly eyes
            graphics.fillStyle(0xFFFFFF);
            graphics.fillEllipse(centerX - 4, centerY - 17 + bodyBob, 4, 3);
            graphics.fillEllipse(centerX + 4, centerY - 17 + bodyBob, 4, 3);
            graphics.fillStyle(0x000000);
            graphics.fillCircle(centerX - 4, centerY - 17 + bodyBob, 1.5);
            graphics.fillCircle(centerX + 4, centerY - 17 + bodyBob, 1.5);
            
            // Eye sparkles
            graphics.fillStyle(0xFFFFFF);
            graphics.fillCircle(centerX - 3.5, centerY - 17.5 + bodyBob, 0.5);
            graphics.fillCircle(centerX + 4.5, centerY - 17.5 + bodyBob, 0.5);
            
            // Determined but friendly expression
            graphics.lineStyle(2, 0x000000);
            graphics.beginPath();
            graphics.arc(centerX, centerY - 12 + bodyBob, 3, 0.5, Math.PI - 0.5, false);
            graphics.strokePath();
            
            // Headdress (bobbing with head)
            graphics.lineStyle(2, 0x1E3A8A);
            graphics.fillStyle(0x3B82F6);
            graphics.fillRoundedRect(centerX - 13, centerY - 27 + bodyBob, 26, 15, 2);
            graphics.strokeRoundedRect(centerX - 13, centerY - 27 + bodyBob, 26, 15, 2);
            
            // Headdress side flaps
            graphics.fillTriangle(centerX - 13, centerY - 27 + bodyBob, centerX - 17, centerY - 32 + bodyBob, centerX - 10, centerY - 27 + bodyBob);
            graphics.fillTriangle(centerX + 13, centerY - 27 + bodyBob, centerX + 17, centerY - 32 + bodyBob, centerX + 10, centerY - 27 + bodyBob);
            
            // Gold stripes
            graphics.fillStyle(0xFFD700);
            for (let i = 0; i < 3; i++) {
                graphics.fillRect(centerX - 13, centerY - 25 + i * 4 + bodyBob, 26, 1);
            }
            
            // Central jewel
            graphics.fillStyle(0xFF6B6B);
            graphics.fillCircle(centerX, centerY - 19 + bodyBob, 3);
            graphics.lineStyle(1, 0x8B0000);
            graphics.strokeCircle(centerX, centerY - 19 + bodyBob, 3);
            
            // Cobra
            graphics.fillStyle(0xFFA500);
            graphics.fillEllipse(centerX, centerY - 27 + bodyBob, 4, 6);
            graphics.fillStyle(0xFF0000);
            graphics.fillCircle(centerX, centerY - 29 + bodyBob, 1.5);
            
            graphics.generateTexture(`pharaoh_run_${frame}`, 48, 48);
            graphics.destroy();
        }
    }

    private static generateJumpSprite(scene: Phaser.Scene) {
        const graphics = scene.add.graphics();
        graphics.clear();
        
        // Offset to center the sprite properly
        const centerX = 24;
        const centerY = 24;
        
        // Body (stretched upward with triumphant pose)
        graphics.lineStyle(2, 0xB8860B);
        graphics.fillStyle(0xFFD700);
        graphics.fillRoundedRect(centerX - 10, centerY - 8, 20, 28, 4);
        graphics.strokeRoundedRect(centerX - 10, centerY - 8, 20, 28, 4);
        
        // Belt
        graphics.fillStyle(0x8B4513);
        graphics.fillRect(centerX - 10, centerY + 8, 20, 3);
        
        // Arms (raised up in triumph/celebration)
        graphics.lineStyle(1.5, 0x8B7355);
        graphics.fillStyle(0xCD853F);
        graphics.fillEllipse(centerX - 12, centerY - 8, 6, 8); // Left arm raised
        graphics.strokeEllipse(centerX - 12, centerY - 8, 6, 8);
        graphics.fillEllipse(centerX + 12, centerY - 8, 6, 8); // Right arm raised
        graphics.strokeEllipse(centerX + 12, centerY - 8, 6, 8);
        
        // Legs (bent for jumping/tucked up)
        graphics.fillStyle(0x8B4513);
        graphics.fillRoundedRect(centerX - 8, centerY + 22, 6, 10, 2); // Left leg (bent)
        graphics.fillRoundedRect(centerX + 2, centerY + 22, 6, 10, 2); // Right leg (bent)
        
        // Sandals (tucked up)
        graphics.fillStyle(0xDAA520);
        graphics.fillEllipse(centerX - 5, centerY + 33, 10, 5); // Left foot
        graphics.fillEllipse(centerX + 5, centerY + 33, 10, 5); // Right foot
        
        // Head (excited and joyful)
        graphics.lineStyle(1.5, 0x8B7355);
        graphics.fillStyle(0xCD853F);
        graphics.fillCircle(centerX, centerY - 18, 10);
        graphics.strokeCircle(centerX, centerY - 18, 10);
        
        // Excited, wide eyes
        graphics.fillStyle(0xFFFFFF);
        graphics.fillEllipse(centerX - 4, centerY - 20, 5, 4); // Wider eyes
        graphics.fillEllipse(centerX + 4, centerY - 20, 5, 4);
        graphics.fillStyle(0x000000);
        graphics.fillCircle(centerX - 4, centerY - 20, 2); // Larger pupils
        graphics.fillCircle(centerX + 4, centerY - 20, 2);
        
        // Extra sparkles for excitement
        graphics.fillStyle(0xFFFFFF);
        graphics.fillCircle(centerX - 3, centerY - 21, 0.7);
        graphics.fillCircle(centerX + 5, centerY - 21, 0.7);
        
        // Joyful, open-mouth expression (yay!)
        graphics.fillStyle(0x000000);
        graphics.fillEllipse(centerX, centerY - 15, 3, 4); // Open mouth
        
        // Headdress (same design)
        graphics.lineStyle(2, 0x1E3A8A);
        graphics.fillStyle(0x3B82F6);
        graphics.fillRoundedRect(centerX - 13, centerY - 30, 26, 15, 2);
        graphics.strokeRoundedRect(centerX - 13, centerY - 30, 26, 15, 2);
        
        // Headdress side flaps
        graphics.fillTriangle(centerX - 13, centerY - 30, centerX - 17, centerY - 35, centerX - 10, centerY - 30);
        graphics.fillTriangle(centerX + 13, centerY - 30, centerX + 17, centerY - 35, centerX + 10, centerY - 30);
        
        // Gold stripes
        graphics.fillStyle(0xFFD700);
        for (let i = 0; i < 3; i++) {
            graphics.fillRect(centerX - 13, centerY - 28 + i * 4, 26, 1);
        }
        
        // Central jewel (glowing with excitement)
        graphics.fillStyle(0xFF6B6B);
        graphics.fillCircle(centerX, centerY - 22, 3);
        graphics.lineStyle(1, 0x8B0000);
        graphics.strokeCircle(centerX, centerY - 22, 3);
        
        // Extra glow effect around jewel
        graphics.lineStyle(2, 0xFF6B6B, 0.3);
        graphics.strokeCircle(centerX, centerY - 22, 5);
        
        // Cobra
        graphics.fillStyle(0xFFA500);
        graphics.fillEllipse(centerX, centerY - 30, 4, 6);
        graphics.fillStyle(0xFF0000);
        graphics.fillCircle(centerX, centerY - 32, 1.5);
        
        graphics.generateTexture('pharaoh_jump', 48, 48);
        graphics.destroy();
    }
}
