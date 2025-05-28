var sceneMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: 'sceneMenu' });
    },

    preload: function () {
        this.load.image('bg_start', 'assets/images/bg_start.png');
        this.load.image('btn_play', 'assets/images/btn_play.png');
        this.load.image('title_game', 'assets/images/title_game.png');
        this.load.image('panel_skor', 'assets/images/panel_skor.png');
        this.load.audio('snd_ambience', 'assets/audio/ambience.mp3');
        this.load.audio('snd_touch', 'assets/audio/touch.mp3');
        this.load.audio('snd_transisi_menu', 'assets/audio/transisi_menu.mp3');
       this.load.spritesheet('sps_mummy', 'assets/sprite/mummy37x45.png', {
    frameWidth: 37,
    frameHeight: 45
        });
    },

    create: function () {
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;
        const bottomY = this.sys.game.config.height;

        // Musik latar
        if (typeof snd_ambience === 'undefined' || snd_ambience === null) {
            snd_ambience = this.sound.add('snd_ambience', { loop: true, volume: 0.35 });
            snd_ambience.play();
        }

        // Efek suara
        this.snd_touch = this.sound.add('snd_touch');
        let snd_transisi = this.sound.add('snd_transisi_menu');

        // Background
        this.add.image(centerX, centerY, 'bg_start');

        // Judul game
        this.titleGame = this.add.image(centerX, -200, 'title_game').setDepth(10);
        this.tweens.add({
            targets: this.titleGame,
            y: 200,
            ease: 'Bounce.easeOut',
            duration: 750,
            delay: 250,
            onComplete: () => {
                snd_transisi.play();
            }
        });

        // Tombol play
        let btnPlay = this.add.image(centerX, centerY + 75, 'btn_play')
            .setInteractive({ useHandCursor: true })
            .setScale(0);
        this.tweens.add({
            targets: btnPlay,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Back',
            delay: 750
        });

        // Panel skor
        let skorTertinggi = localStorage["highscore"] || 0;
        let panelSkor = this.add.image(centerX, bottomY - 120, 'panel_skor')
            .setOrigin(0.5)
            .setDepth(10)
            .setAlpha(0.8);

        this.add.text(panelSkor.x + 25, panelSkor.y, "High Score : " + skorTertinggi, {
            fontSize: '30px',
            color: '#ff732e'
        }).setOrigin(0.5).setDepth(10);

        // Tombol play interaktif
        let btnClicked = false;
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if (gameObject === btnPlay) {
                btnPlay.setTint(0x616161);
                btnClicked = true;
            }
        });

        this.input.on('gameobjectup', (pointer, gameObject) => {
            if (gameObject === btnPlay) {
                btnPlay.setTint(0xffffff);
                if (btnClicked) {
                    this.snd_touch.play();
                    this.scene.start('scenePlay');
                }
            }
            btnClicked = false;
        });

        // --- MUMMY SETUP ---
        // Pastikan animasi hanya dibuat satu kali!
        if (!this.anims.exists('walk')) {
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('sps_mummy', { start: 0, end: 17 }),
                frameRate: 16,
                repeat: -1
            });
        }

        // Tambahkan sprite mummy
        let mummy = this.add.sprite(centerX - 200, bottomY - 80, 'sps_mummy');
        mummy.setScale(3);
        mummy.setDepth(10);
        mummy.play('walk');

        // Tambahkan tween gerakan mummy bolak-balik
        this.tweens.add({
            targets: mummy,
            x: centerX + 200,
            duration: 4000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        
    },

    update: function () {}
});
