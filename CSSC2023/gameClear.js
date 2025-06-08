function showGameClear()
{
    if(is_already_show_gameclear === false)
    {
        stage.removeChild(bg);
        stage.removeChild(player);
        stage.removeChild(scoreBoard);
        stage.removeChild(lifeBoard);
        bg = new createjs.Bitmap(loader.getResult("gameclearBG"));
        bg.scaleX = STAGE_W / 1024;
        bg.scaleY = STAGE_H / 683;
        stage.addChild(bg);
        stage.addChild(lifeBoard);
        
        var go = new createjs.Text(
            "勝利！！！！",
            "50px gothic", 
            "red"
        );

        go.textAlign = "center";
        go.x = STAGE_W / 2;
        go.y = STAGE_H / 2 - go.getMeasuredHeight() / 2;

        stage.addChild(go);
        make_next_Button();
        sound_gameclear();
    }
}