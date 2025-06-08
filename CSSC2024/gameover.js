function showGameOver() {
    // ゲームオーバー画面を表示
    if(is_already_show_gameover == false)
    {
        stage.removeChild(bg);
        stage.removeChild(player);
        stage.removeChild(scoreBoard);
        stage.removeChild(lifeBoard);
        bg = new createjs.Bitmap(loader.getResult("gameoverBG"));
        bg.scaleX = STAGE_W / 1060;
        bg.scaleY = STAGE_H / 596;
        stage.addChild(bg);
        stage.addChild(lifeBoard);
        

        var go = new createjs.Text(
            "GAME OVER\n あなたは負けてしまった....",
            "50px gothic", 
            "red"
        );

        // 位置調整 (中央揃え)
        go.textAlign = "center";
        go.x = STAGE_W / 2;
        go.y = STAGE_H / 2 - go.getMeasuredHeight() / 2;
        stage.addChild(go);

        // スコアのテキストを作成
        var sc = new createjs.Text(
            "残念！！後目標まで、" + String(enemy_norma) + "体",
            "40px serif",
            "white"
        );

        // 位置調整 (中央揃え)
        sc.textAlign = "center";
        sc.x = STAGE_W / 2;
        sc.y = STAGE_H / 2 + go.getMeasuredHeight() - 20;
        stage.addChild(sc);

        
        sound_gameover();
        scene_id = 2;
        is_already_show_gameover = true;
        make_retry_Button();
    }

    // 各種イベントをまとめて解除

}


