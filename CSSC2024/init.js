

let manifest = [
    { src: "picture/player.png", id: "player" },
    { src: "picture/enemy.png", id: "enemy" },
    { src: "picture/strong_enemy.png", id: "stenemy" },
    { src: "picture/titlebg.png", id: "titleBG" },
    { src: "picture/playbg.jpg", id: "gameBG" },
    { src: "picture/gameover_bg.jpg", id: "gameoverBG" },
    { src: "picture/gameclear_bg.jpg", id: "gameclearBG"},
    { src: "effect/shoot.mp3", id: "shoot" },
    { src: "effect/hit.mp3", id: "hit" },
    { src: "effect/decide.mp3", id: "decide" },
    { src: "effect/ura_decide.mp3", id: "ultimate_decide" },
    { src: "effect/damage.mp3", id: "damage" },
    { src: "effect/gameover_damage.mp3", id: "gameover_damage" }, 
    { src: "effect/gameover_damage2.mp3", id: "gameover_damage2" },
    { src: "effect/game_clear.mp3", id: "gameclear_effect" },
    { src: "bgm/easy.mp3", id: "easymode" },
    { src: "bgm/hard.mp3", id: "hardmode" },
    { src: "bgm/normal.mp3", id: "normalmode" },
    { src: "bgm/ura.mp3", id: "uramode" },
    { src: "bgm/title.mp3", id: "title" },
    { src: "bgm/gameover.mp3", id: "gameover" },
];

loader = new createjs.LoadQueue(true);
loader.installPlugin(createjs.Sound);
loader.addEventListener("complete", init);
loader.loadManifest(manifest, true, "./");


function init() {
    stage = new createjs.Stage("myCanvas");

    enemyList2_hobbor_timer = [];
    enemyList3_hobbor_timer = [];
    enemyList4_hobbor_timer = [];

    damage_flag = false;
    mute = false;

    is_already_show_gameover = false;
    is_already_played_title_bgm = false;
    scene_id = 0;
    frame_cnt = 0;
    score = 0;

    bulletList = [];
    enemyList = [];
    enemyList2 = [];
    enemyList3 = [];
    enemyList4 = [];


    bg = new createjs.Bitmap(loader.getResult("titleBG"));
    bg.scaleX = STAGE_W / 1060;
    bg.scaleY = STAGE_H / 596;



    stage.addChild(bg);




    //プレイヤー作成
    make_player_image();

    playerSpeed = 3;
    enemySpeed = 3;
    bulletSpeed = 10;

    // スコア欄を作成





    init_button();
    initTitle();

    red_screen = new createjs.Shape();
    red_screen.graphics.beginFill("red").drawRect(0, 0, STAGE_W, STAGE_H);


    // tickイベントの登録
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function initTitle() {
    // タイトル
    titleText = new createjs.Text("UniverseMisson", "40px sans-serif",
        "yellow");
    titleText.x = STAGE_W / 2 - titleText.getMeasuredWidth() / 2
    titleText.y = 50;
    stage.addChild(titleText);
    // 操作説明
    howToText = new createjs.Text(
        "VキーでBGMのON/OFF",
        "30px sans-serif", "red"
    );
    // 位置調整 (中央揃え)
    howToText.textAlign = "center";
    howToText.x = STAGE_W / 2;
    howToText.y = 100;
    stage.addChild(howToText);



    init_play_sound();




}

function game_init() {
    if(mode === 'ura'){
        createjs.Sound.play("ultimate_decide");
    }

    else{
        createjs.Sound.play("decide");
    }
    
    time_label = new createjs.Text("", "20px sans-serif", "white");
    time_label.x = 10;
    time_label.y = STAGE_H - 30;
    stage.addChild(time_label);
  

    //タイトル画面と、難易度画面などのテキストを削除

    stage.removeChild(bg);
    bg = new createjs.Bitmap(loader.getResult("gameBG"));
    bg.scaleX = STAGE_W / 1060;
    bg.scaleY = STAGE_H / 596;
    stage.addChild(bg);

    stage.removeChild(titleText);
    stage.removeChild(howToText);
    stage.removeChild(pressSpaceText);

    //____________________________________________________________________________________
    stage.removeChild(easy_Button);
    stage.removeChild(normal_Button);
    stage.removeChild(hard_Button);
    stage.removeChild(ura_mode_button);
    stage.removeChild(mode_label);
    stage.addChild(player);

    if (mode === 'easy') {
        enemy_spown_time = 60;
        strong_enemy_spown_time = 150;
        normal_enemy_spown_time = 80;
        strong_enemy_Speed_difficulty = 2;
        strong_enemy_hobbor_frame = 120;
        life = 5;
        shoot_speed = 15;
        remain_ballet = 5;
        enemy_norma = 20;
        remain_time = 25;

    }

    else if (mode === 'normal') {
        enemy_spown_time = 50;
        strong_enemy_spown_time = 130
        normal_enemy_spown_time = 60
        strong_enemy_Speed_difficulty = 3;
        strong_enemy_hobbor_frame = 130;
        life = 4;
        shoot_speed = 15;
        remain_ballet = 4;
        enemy_norma = 20;
        remain_time = 25;

    }

    else if(mode === 'hard'){
        enemy_spown_time = 35;
        strong_enemy_spown_time = 60;
        normal_enemy_spown_time = 40;
        strong_enemy_Speed_difficulty = 3;
        strong_enemy_hobbor_frame = 145;
        life = 3;
        shoot_speed = 20;
        remain_ballet = 3;
        enemy_norma = 20;
        remain_time = 25;
    }

    else if(mode === 'ura'){
        enemy_spown_time = 45;
        strong_enemy_spown_time = 50;
        normal_enemy_spown_time = 30;
        strong_enemy_Speed_difficulty = 1;
        strong_enemy_hobbor_frame = 150;
        life = 2;
        shoot_speed = 20;
        remain_ballet = 2;
        enemy_norma = 15;
        remain_time = 50;
    }
    background = new createjs.Shape();
    background.graphics.beginFill("rgba(0, 0, 0, 0.5)").drawRect(0, 0, 180, 120);
    background.x = 5;
    background.y = 5;
    stage.addChild(background);

    // スコアボード
    scoreBoard = new createjs.Text("", "24px sans-serif", "white");
    scoreBoard.x = 15;
     scoreBoard.y = 35;
    stage.addChild(scoreBoard);

    // ライフ欄
    lifeBoard = new createjs.Text("", "24px sans-serif", "white");
    lifeBoard.x = 15;
    lifeBoard.y = 55;
    lifeBoard.text = "Life: " + life;
    stage.addChild(lifeBoard);

    // タイムボード
    timeBoard = new createjs.Text("", "24px sans-serif", "white");
    timeBoard.x = 15;
    timeBoard.y = 15;
    stage.addChild(timeBoard);

    // 残り敵の数ボード
    remainBoard = new createjs.Text("", "24px sans-serif", "white");
    remainBoard.x = 15;
    remainBoard.y = 75;
    stage.addChild(remainBoard);

    // 目標ボード
    enemy_norma_board = new createjs.Text("", "24px sans-serif", "white");
    enemy_norma_board.x = 15;
    enemy_norma_board.y = 95;
    enemy_norma_board.text = "目標まであと: " + String(enemy_norma) + "体!";
    stage.addChild(enemy_norma_board);

    stage.update();

}