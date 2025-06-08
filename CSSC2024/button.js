function init_button()
{
    easy_Button = new createjs.Container();
    let easy_Button_color = new createjs.Shape();
    easy_Button_color.graphics.beginFill("green").drawRect(0, 0, 200, 50);
    easy_Button.x = STAGE_W / 2 - 200/2;
    easy_Button.y = 200;
    mode_label = new createjs.Text("Easy", "40px sans-serif", "white");

    mode_label.x = 100 - mode_label.getMeasuredWidth() / 2;
    mode_label.y = 25 - mode_label.getMeasuredHeight() / 2;
    easy_Button.addChild(easy_Button_color);
    easy_Button.addChild(mode_label);
    stage.addChild(easy_Button);

    easy_Button.addEventListener("click", function() {
        mode = 'easy';
        //startGame();
        game_init();
        change_bgm();
        scene_id = 1;
        time = new Date();
  
    });

    normal_Button = new createjs.Container();
    let normal_Button_color = new createjs.Shape();
    normal_Button_color.graphics.beginFill("blue").drawRect(0, 0, 200, 50);
    normal_Button.x = STAGE_W / 2 - 200 / 2;
    normal_Button.y = 300;
    stage.addChild(normal_Button);
    mode_label = new createjs.Text("Medium", "40px sans-serif", "white");
    // normalButtonColorの中心に持ってくる
    mode_label.x = 100 - mode_label.getMeasuredWidth() / 2;
    mode_label.y = 25 - mode_label.getMeasuredHeight() / 2;
    normal_Button.addChild(normal_Button_color);
    normal_Button.addChild(mode_label);
    normal_Button.addEventListener("click", function() {
        mode = 'normal';

        //startGame();
        game_init();
        change_bgm();
        scene_id = 1;
        time = new Date();
    });

    hard_Button = new createjs.Container();
    let hard_Button_color = new createjs.Shape();
    hard_Button_color.graphics.beginFill("red").drawRect(0, 0, 200, 50);
    hard_Button.x = STAGE_W / 2 - 200 / 2;
    hard_Button.y = 400;
    stage.addChild(hard_Button);
    mode_label = new createjs.Text("Hard", "40px sans-serif", "white");
    mode_label.x = 100 - mode_label.getMeasuredWidth() / 2;
    mode_label.y = 25 - mode_label.getMeasuredHeight() / 2;
  

    hard_Button.addChild(hard_Button_color);
    hard_Button.addChild(mode_label);

    hard_Button.addEventListener("click", function() {
        mode = 'hard';

        //startGame();
        game_init();
        change_bgm();
        scene_id = 1;
        time = new Date();
    });

    //裏モード
    ura_mode_button = new createjs.Container();
    let ura_mode_button_color = new createjs.Shape();
    ura_mode_button_color.graphics.beginFill("black").drawRect(0, 0, 200, 50);
    ura_mode_button.x = STAGE_W / 2  + 150;
    
    ura_mode_button.y = 85;
    ura_mode_button.alpha = 0.01;
    stage.addChild(ura_mode_button);
    mode_label = new createjs.Text("裏モード", "40px sans-serif", "white");
    mode_label.x = 10
    mode_label.y = 25 - mode_label.getMeasuredHeight() / 2;
    ura_mode_button.addChild(ura_mode_button_color);
    ura_mode_button.addChild(mode_label);
    ura_mode_button.addEventListener("click", function() {
        
        mode = 'ura';
        game_init();
        change_bgm();
        scene_id = 1;
        time = new Date();
            
    });


}

function make_retry_Button() {
    retry_Button = new createjs.Container();
    
    let retry_Button_color = new createjs.Shape();
    retry_Button_color.graphics.beginFill("green").drawRect(0, 0, 300, 50);
    
    retry_Button.x = STAGE_W / 2 - 300 / 2; // 幅300に修正
    retry_Button.y = 400;
    
    mode_label = new createjs.Text("もう一度戦う...?", "40px sans-serif", "white");

    // ボタンの中央にラベルを配置
    mode_label.x = 300 / 2 - mode_label.getMeasuredWidth() / 2; // ボタンの幅300を使用
    mode_label.y = 50 / 2 - mode_label.getMeasuredHeight() / 2; // ボタンの高さ50を使用
    
    retry_Button.addChild(retry_Button_color);
    retry_Button.addChild(mode_label);
    
    stage.addChild(retry_Button);

    retry_Button.addEventListener("click", function() {
        // 画面を初期化
        gameover_bgm_instance.stop();
        createjs.Sound.play("decide");

        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
        stage.removeAllChildren();
        
        init();
        scene_id = 0;
    });
}

function make_next_Button()
{   
    let next_Button = new createjs.Container();
    let next_Button_color = new createjs.Shape();

    next_Button_color.graphics.beginFill("green").drawRect(0, 0, 300, 50);
    next_Button.x = STAGE_W / 2 - 300 / 2;

    next_Button.y = 400;
    mode_label = new createjs.Text("もっと戦おう！", "40px sans-serif", "white");
    mode_label.x = 300 / 2 - mode_label.getMeasuredWidth() / 2;
    mode_label.y = 50 / 2 - mode_label.getMeasuredHeight() / 2;
    next_Button.addChild(next_Button_color);

    next_Button.addChild(mode_label);
    stage.addChild(next_Button);
    next_Button.addEventListener("click", function() {

        gameclear_bgm_instance.stop();
        createjs.Sound.play("decide");
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
        stage.removeAllChildren();
        init();
        scene_id = 0;
    });
}
