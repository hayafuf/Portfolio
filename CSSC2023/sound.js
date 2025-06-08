function init_play_sound()
{

    createjs.Sound.registerSound("bgm/easy.mp3", "easymode");
    createjs.Sound.registerSound("bgm/normal.mp3", "normalmode");
    createjs.Sound.registerSound("bgm/hard.mp3", "hardmode");
    createjs.Sound.registerSound("bgm/ura.mp3", "uramode");
    createjs.Sound.registerSound("bgm/title.mp3", "title"); 
    createjs.Sound.registerSound("bgm/gameover.mp3", "gameover");
    createjs.Sound.registerSound("bgm/gameclear.mp3", "gameclear");

    //ウィンドウ上にマウスがあるときに、音楽を再生するようにする

}

function change_bgm()
{
    if(title_bgm_instance !== undefined)
            title_bgm_instance.stop();
   
    if(scene_id === 2)
        {
           gameover_bgm_instance = createjs.Sound.play("gameover");
    }

    if(scene_id === 3)
    {
        gameclear_bgm_instance = createjs.Sound.play("gameclear");
        
    }
    
    else
    {

    
        if(mode === 'easy')
        {
            //音量を調整する
            createjs.Sound.play("easymode", {loop: -1}, {volume: 2});
            
        }

        if(mode === 'normal')
        {
            createjs.Sound.play("normalmode", {loop: -1}, {volume: 2});
            
        }
        if(mode === 'hard')
        {
            createjs.Sound.play("hardmode", {loop: -1}, {volume: 2});
        }
        if(mode === 'ura')
        {
            createjs.Sound.play("uramode", {loop: -1}, {volume: 2});
        }
    
    }
  
}

function sound_gameover()
{
    //ここを完成！！
    //ゲームオーバー時の音楽を再生するようにする
    createjs.Sound.stop();
    gameover_damage_instance = createjs.Sound.play("gameover_damage");
    gameover_damage_instance2  = createjs.Sound.play("gameover_damage2");
    gameover_bgm_instance = createjs.Sound.play("gameover");


}

function sound_gameclear()
{
    createjs.Sound.stop();
    game_clear_instance = createjs.Sound.play("gameclear_effect");
    hit_instance = createjs.Sound.play("hit");
    gameclear_bgm_instance = createjs.Sound.play("gameclear", {volume: 2});
}

function sound_title()
{
    mute = !mute;
    if(mute)
    {
        createjs.Sound.stop();
    }
    else if(scene_id === 0)
    {
        title_bgm_instance = createjs.Sound.play("title", {loop: -1});
        if(is_already_played_title_bgm === false)
        {
            howToText.text = "操作方法:自機を動かす(←↑↓→)\n、弾を撃つ(スペースキー)"
        }
    }
    else
    {
        change_bgm();
    }
 
}