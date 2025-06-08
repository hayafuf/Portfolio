function originalhitTest(rect1, rect2) {
  

    // rect1の位置とサイズ（プレイヤーの当たり判定エリア）
    let r1x = player.x + player_judge.x;
    let r1y = player.y + player_judge.y;
    let r1w = 50;  // プレイヤーの当たり判定エリアの幅
    let r1h = 80; // プレイヤーの当たり判定エリアの高さ

    // rect2の位置とサイズ（敵の当たり判定エリア）
    let r2x = rect2.x;
    let r2y = rect2.y;
    let r2w = rect2.graphics.command.w;  // 敵の幅
    let r2h = rect2.graphics.command.h;  // 敵の高さ

    // 長方形同士の当たり判定
    return (r1x < r2x + r2w && 
            r1x + r1w > r2x &&
            r1y < r2y + r2h && 
            r1y + r1h > r2y);
}


function originalhitTest2(enemy)
{
    let r1x = player.x + player_judge.x;
    let r1y = player.y + player_judge.y;
    let r1w = 50;
    let r1h = 80;

    //敵の当たり判定
    let r2x = enemy.x + enemy_judge.x;
    let r2y = enemy.y + enemy_judge.y;
    let r2w = 50;
    let r2h = 50;

      // 長方形同士の当たり判定
      return (r1x < r2x + r2w && 
        r1x + r1w > r2x &&
        r1y < r2y + r2h && 
        r1y + r1h > r2y);
}

function originalhitTest3(strong_enemy)
{
    let r1x = player.x + player_judge.x;
    let r1y = player.y + player_judge.y;
    let r1w = 50;
    let r1h = 80;

    //敵の当たり判定
    let r2x = strong_enemy.x + strong_enemy_judge.x;
    let r2y = strong_enemy.y + strong_enemy_judge.y;
    let r2w = 50;
    let r2h = 50;

      // 長方形同士の当たり判定
      return (r1x < r2x + r2w && 
        r1x + r1w > r2x &&
        r1y < r2y + r2h && 
        r1y + r1h > r2y);

}