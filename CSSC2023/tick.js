function handleTick() {

    if (scene_id === 0) {
        stage.update();
        if(ura_click == 5)
        {
            window.alert("裏モード発動！！");
        }
        stage.update();
    }
    else if (scene_id === 1) {
        frame_cnt = frame_cnt + 1;

        // 自機の移動処理
        if (isPressLeft) {
            player.x -= playerSpeed;
            if(player.x < 0)
            {
                player.x = 0;
            }
        }
        if (isPressRight) {
            player.x += playerSpeed;
            if(player.x + 50> STAGE_W)
            {
                player.x = STAGE_W;
            }
        }
        if (isPressUp) {
            player.y -= playerSpeed;
            if(player.y < 0)
            {
                player.y = 0;
            }
        }
        if (isPressDown) {
            player.y += playerSpeed;
            if(player.y + 80 > STAGE_H)
            {
                player.y = STAGE_H - 80;
            }
        }
        //リロード処理
        if(isPressEnter && isClick)  //リロードキーと左クリックが押された時
        {

            isClick = false;
            switch(mode)
            {
                case 'easy':
                    remain_ballet = 5;
                    break;v
                case 'normal':
                    remain_ballet = 4;
                    break;
                case 'hard':
                    remain_ballet = 3;
                    break;
                default:
                    remain_ballet = 2;
                    break;
            }
        }

        else if(isClick)
        {
            isClick = false;
        }

        // 敵の生成処理
        if (frame_cnt % enemy_spown_time === 0) {
            make_enemy_image();
        }
        
        if(frame_cnt % normal_enemy_spown_time === 0)
        {
            make3_strong_enemy();
        }

        if (frame_cnt % strong_enemy_spown_time === 0) {
            make1_strong_enemy();
        }

        //console.log(enemyList.length);
        // 敵の移動処理
        for (let i = 0; i < enemyList.length; i++) {
            enemyList[i].x -= enemySpeed;
            // 画面左端まで移動したら
            if (enemyList[i].x < 0) {
                stage.removeChild(enemyList[i]); // 画面から削除
                enemyList.splice(i, 1); // 配列から削除
                
            }
        }

        strong_enemy_move();

        // 発射弾の移動処理
        for (let i = 0; i < bulletList.length; i++) {
            bulletList[i].x += bulletSpeed;
            // 画面右端まで移動したら
            if (bulletList[i].x > STAGE_W) {
                stage.removeChild(bulletList[i]); // 画面から削除
                bulletList.splice(i, 1); // 配列から削除
            }
        }

        // 自機と敵の当たり判定
        for (let i = 0; i < enemyList.length; i++) {
            let enemy = enemyList[i];
            if(originalhitTest2(enemy) == true)
            {
                createjs.Sound.play("damage");
                life -= 1;
                stage.removeChild(enemyList[i]); // 画面から削除
                enemyList.splice(i, 1); // 配列から削除
                //ダメージフラグを立ち上げる
                damage_flag = true;
                damaged_frame = frame_cnt;
    
           }
        }

        strong_enemy_hittest();

        // 発射弾と敵の当たり判定
        for (let i = 0; i < enemyList.length; i++) {
            let enemy = enemyList[i];

            for (let j = 0; j < bulletList.length; j++) {
                let bullet = bulletList[j];

                // 敵を基準(原点)とした発射弾の座標を取得
                let pt = bullet.localToLocal(0, 0, enemy);

                // 当たり判定を行う
                if (enemy.hitTest(pt.x, pt.y) == true) {
                    // 発射弾の削除
                    stage.removeChild(bullet);
                    bulletList.splice(j, 1);

                    // 敵の削除
                    stage.removeChild(enemy);
                    enemyList.splice(i, 1);
                    
                    enemy_norma -= 1;
                    // スコアの更新
                    score += 100;
                    scoreBoard.text = String(score);
                    createjs.Sound.play("hit");

                    break;
                }
            }
        }

        //強い敵と発射玉の当たり判定
        strong_enemy_bullet_hittest();

        //タイムの表示

        con_time = new Date();
        diff_time = con_time - time;
        let sec = Math.floor(diff_time / 1000);
        let msec = Math.floor((diff_time % 1000) / 10); // ミリ秒を10で割った後に四捨五入
        
        // 小数点以下を削除
        let count_down = remain_time - (sec + msec / 100);
        count_down = Math.floor(count_down * 100) / 100;
        timeBoard.text = "残り酸素量: " + String(count_down) + "リットル！";

        if(remain_time - (sec + msec / 100) <= 0)
        {
            scene_id = 2;
            showGameOver();
        }
        print_life();

        if(damage_flag === true && frame_cnt - damaged_frame < 2)
        {
            //画面を赤く点滅させる
            stage.addChild(red_screen);
        }

        else
        {
            stage.removeChild(red_screen);
            damage_flag = false;
        }
  

        if(life <= 0)
        {
            lifeBoard.text = "life: ☆☆☆☆☆";
            scene_id = 2;
            showGameOver();
        }

        if(isPressSpace && frame_cnt % shoot_speed  === 0 && remain_ballet > 0)
        {

            remain_ballet -= 1;
            let bullet = new createjs.Shape();
            bullet.graphics.beginFill("white").drawCircle(0, 0, 3);
            bullet.x = player.x + 50;
            bullet.y = player.y + 10;
            bulletList.push(bullet);
            stage.addChild(bullet);
            createjs.Sound.play("shoot");
        }

        enemy_norma_board.text = "目標まであと: " + String(enemy_norma) + "体!";


        print_remain_ballet();

        

        if(enemy_norma <= 0)
        {
            scene_id = 3;
            showGameClear();
        }
        
        stage.update();

        
    }
    if(scene_id === 2)
    {
        stage.update();
    }

    if(scene_id === 3)
    {
        stage.update();
    }
}

function print_life()
{
    switch(life)
    {
        case 5:
            lifeBoard.text = "life: ★★★★★";
            break;
        case 4:
            lifeBoard.text = "life: ★★★★☆";
            break;
        case 3:
            lifeBoard.text = "life: ★★★☆☆";
            break;
        case 2:
            lifeBoard.text = "life: ★★☆☆☆";
            break;
        case 1:
            lifeBoard.text = "life: ★☆☆☆☆";
            break;
   
    }
}

function print_remain_ballet()
{
    switch(mode)
    {
        case 'easy':
            switch(remain_ballet)
            {
                case 5:
                    remainBoard.text = "残弾: ▶ ▶ ▶ ▶ ▶";
                    break;
                case 4:
                    remainBoard.text = "残弾: ▶ ▶ ▶ ▶ ";
                    break;
                case 3:
                    remainBoard.text = "残弾: ▶ ▶ ▶ ";
                    break;
                case 2:
                    remainBoard.text = "残弾: ▶ ▶ ";
                    break;
                case 1:
                    remainBoard.text = "残弾: ▶ ";
                    break;
                case 0:
                    remainBoard.text = "残弾: リロードせよ!!(ENTERキー+ 左クリック)";
                    break;
                
            }
            break;
        case 'normal':
            switch(remain_ballet)
            {
                case 4:
                    remainBoard.text = "残弾: ▶ ▶ ▶ ▶ ";
                    break;
                case 3:
                    remainBoard.text = "残弾: ▶ ▶ ▶ ";
                    break;
                case 2:
                    remainBoard.text = "残弾: ▶ ▶ ";
                    break;
                case 1:
                    remainBoard.text = "残弾: ▶ ";
                    break;
                case 0:
                    remainBoard.text = "残弾: リロードせよ!!(ENTERキー+ 左クリック)";
                    break;
            }
            break;
        case 'hard':
            switch(remain_ballet)
            {
                case 3:
                    remainBoard.text = "残弾: ▶ ▶ ▶ ";
                    break;
                case 2:
                    remainBoard.text = "残弾: ▶ ▶ ";
                    break;
                case 1:
                    remainBoard.text = "残弾: ▶ ";
                    break;
                case 0:
                    remainBoard.text = "残弾: リロードせよ!!(ENTERキー+ 左クリック)";
                    break;
            }
            break;
        default:
            switch(remain_ballet)
            {
                case 2:
                    remainBoard.text = "残弾: ▶ ▶ ";
                    break;
                case 1:
                    remainBoard.text = "残弾: ▶ ";
                    break;
                case 0:
                    remainBoard.text = "残弾: リロードせよ!!(ENTERキー+ 左クリック)";
                    break;
            }
            break;
    }
}