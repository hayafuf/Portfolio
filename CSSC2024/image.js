function make_player_image() {
    // 自機の画像を作成
    player = new createjs.Container();
    let player_img = new createjs.Bitmap(loader.getResult("player"));
    player_img.crossOrigin = "Anonymous";
    player_img.scaleX = 0.15;  // 通常のサイズで表示
    player_img.scaleY = 0.15;  // 通常のサイズで表示

    player.addChild(player_img);

    player_judge = new createjs.Shape();
    player_judge.visible = false;
    player_judge.graphics.beginFill("red").drawRect(0, 0, 60, 80);
    player.addChild(player_judge);

}


function make_enemy_image() {
    // 敵の画像を作成
    enemy = new createjs.Container();
    let enemy_img = new createjs.Bitmap(loader.getResult("enemy"));
    enemy_img.crossOrigin = "Anonymous";
    enemy_img.scaleX = 0.1;  // 通常のサイズで表示
    enemy_img.scaleY = 0.1;  // 通常のサイズで表示

    enemy.x = STAGE_W;
    enemy.y = STAGE_H * Math.random();
    enemy.addChild(enemy_img);

    enemy_judge = new createjs.Shape();
    enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);
    enemy_judge.visible = false;
    

    enemy.addChild(enemy_judge);
    stage.addChild(enemy);


    enemyList.push(enemy);
    
}

