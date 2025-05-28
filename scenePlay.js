var scenePlay = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: 'scenePlay' });
    },

    preload: function () {
        this.load.image('chara', 'assets/images/chara.png');
        this.load.image('fg_loop', 'assets/images/fg_loop.png');
        this.load.image('fg_loop_back', 'assets/images/fg_loop_back.png');
        this.load.image('obstc', 'assets/images/obstc.png');
        this.load.image('panel_skor', 'assets/images/panel_skor.png');
        this.load.audio('snd_dead', 'assets/audio/dead.mp3');
        this.load.audio('snd_klik_1', 'assets/audio/klik_1.mp3');
        this.load.audio('snd_klik_2', 'assets/audio/klik_2.mp3');
        this.load.audio('snd_klik_3', 'assets/audio/klik_3.mp3');
    },

    create: function () {
        this.timerHalangan = 0;
        this.Halangan = [];
        this.background = [];
        this.isGameRunning = false;
        this.score = 0;

        this.chara = this.add.image(130, 768 / 2, 'chara');
        this.chara.setDepth(3);
        this.chara.setScale(0);

        this.tweens.add({
            targets: this.chara,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Back.Out',
            delay: 250,
            onComplete: () => {
                this.isGameRunning = true;
            }
        });

        this.input.on('pointerup', () => {
            if (!this.isGameRunning) return;

            // Gerakan lompat ke bawah
            this.tweens.add({
                targets: this.chara,
                y: this.chara.y + 200,
                duration: 750,
                ease: 'Power1'
            });

            // Mainkan suara klik acak
            const idx = Math.floor(Math.random() * this.snd_click.length);
            this.snd_click[idx].play();
        });

        let bg_x = 1366 / 2;
        for (let i = 0; i < 2; i++) {
            let bg_awal = [];
            let BG = this.add.image(bg_x, 768 / 2, 'fg_loop_back');
            let FG = this.add.image(bg_x, 768 / 2, 'fg_loop');
            BG.setData('kecepatan', 2);
            FG.setData('kecepatan', 4);
            FG.setDepth(2);
            bg_awal.push(BG);
            bg_awal.push(FG);
            this.background.push(bg_awal);
            bg_x += 1366;
        }

        this.panel_score = this.add.image(1024 / 2, 60, 'panel_skor').setDepth(10).setOrigin(0.5).setAlpha(0.8);

        this.label_score = this.add.text(this.panel_score.x + 25, this.panel_score.y, this.score)
            .setDepth(10)
            .setOrigin(0.5)
            .setFontSize(30)
            .setTint(0xff732e);

        this.textGameOver = this.add.text(1024 / 2, 768 / 2, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(20).setVisible(false);

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                if (!this.isGameRunning) return;
                let halangan = this.add.image(1024, Phaser.Math.Between(200, 568), 'obstc');
                halangan.setDepth(3);
                halangan.setData("status_aktif", true);
                this.Halangan.push(halangan);
            },
            loop: true
        });

        // Suara tabrakan & klik
        this.snd_dead = this.sound.add('snd_dead');
        this.snd_click = [
            this.sound.add('snd_klik_1'),
            this.sound.add('snd_klik_2'),
            this.sound.add('snd_klik_3')
        ];
        this.snd_click.forEach(snd => snd.setVolume(0.5));

        // Fungsi Game Over
        this.gameOver = () => {
            if (!this.isGameRunning) return;
            this.isGameRunning = false;

            this.snd_dead.play(); // Putar suara mati

            let highScore = parseInt(localStorage["highscore"]) || 0;
            if (this.score > highScore) {
                localStorage["highscore"] = this.score;
            }

            this.textGameOver.setVisible(true);

            this.time.delayedCall(2000, () => {
                this.scene.start("sceneMenu");
            });
        };
    },

    update: function () {
        if (!this.isGameRunning) return;

        this.chara.y -= 5;
        if (this.chara.y > 690) this.chara.y = 690;

        if (this.chara.y < 0) {
            this.gameOver();
            return;
        }

        this.background.forEach(pair => {
            pair.forEach(layer => {
                layer.x -= layer.getData('kecepatan');
                if (layer.x < -683) {
                    layer.x += 1366 * 2;
                }
            });
        });

        for (let i = this.Halangan.length - 1; i >= 0; i--) {
            const h = this.Halangan[i];
            h.x -= 5;

            if (this.chara.x > h.x + 50 && h.getData("status_aktif")) {
                h.setData("status_aktif", false);
                this.score++;
                this.label_score.setText(this.score);
            }

            if (h.x < -50) {
                h.destroy();
                this.Halangan.splice(i, 1);
            }

            if (Phaser.Math.Distance.Between(this.chara.x, this.chara.y, h.x, h.y) < 50) {
                this.gameOver();
            }
        }

        if (this.chara.y < -50) {
            this.isGameRunning = false;
             //memainkan suara karakter kalah
        this.snd_dead.play();
            if (this.charaTweens != null) {
                this.charaTweens.stop();
            }

            this.charaTweens = this.tweens.add({
                targets: this.chara,
                duration: 2000,
                ease: 'Elastic.easeOut',
                alpha: 0,
                onComplete: () => this.gameOver()
            });
        }

       

    }
});
