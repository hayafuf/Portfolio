function strong_enemy_move() {
    for (let i = 0; i < enemyList2.length; i++) {


        moveEnemy2(enemyList2[i], enemyList2_hobbor_timer[i]);
        //四隅の画面外に出たら削除

        if (enemyList2[i].x < 0 || enemyList2[i].x > STAGE_W || enemyList2[i].y < 0 || enemyList2[i].y > STAGE_H) {
            stage.removeChild(enemyList2[i]);
            enemyList2.splice(i, 1);
            enemyList2_hobbor_timer.splice(i, 1);
    
        }
    }

    for (let i = 0; i < enemyList3.length; i++) {
        moveEnemy3(enemyList3[i], enemyList3_hobbor_timer[i]);
        //四隅の画面外に出たら削除
        if (enemyList3[i].x < 0 || enemyList3[i].x > STAGE_W || enemyList3[i].y < 0 || enemyList3[i].y > STAGE_H) {
            stage.removeChild(enemyList3[i]);
            enemyList3.splice(i, 1);
            enemyList3_hobbor_timer.splice(i, 1);
        }
    }

    for (let i = 0; i < enemyList4.length; i++) {
        moveEnemy4(enemyList4[i], enemyList4_hobbor_timer[i]);
        //四隅の画面外に出たら削除
        if (enemyList4[i].x < 0 || enemyList4[i].x > STAGE_W || enemyList4[i].y < 0 || enemyList4[i].y > STAGE_H) {
            stage.removeChild(enemyList4[i]);
            enemyList4.splice(i, 1);
            enemyList4_hobbor_timer.splice(i, 1);
            //console.log("spliced" + i);
            //console.log(enemyList4_hobbor_timer);   
        }
    }

}



function make3_strong_enemy() {


    let enemy2 = new createjs.Container();
    enemy2.scaleX = 0.1;  // 通常のサイズで表示
    enemy2.scaleY = 0.1;  // 通常のサイズで表示

    strong_enemy_judge = new createjs.Shape();
    //strong_enemy_judge.visible = false;
    strong_enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);

    enemy2.addChild(strong_enemy_judge);
    enemy2.addChild(new createjs.Bitmap(loader.getResult("stenemy")));

    enemy2.x = STAGE_W;
    enemy2.y = STAGE_H * Math.random();
    enemyList2_hobbor_timer.push(frame_cnt);
    stage.addChild(enemy2); // 画面に表示
    enemyList2.push(enemy2); // 配列に保存


    let enemy3 = new createjs.Container();
    enemy3.scaleX = 0.1;  // 通常のサイズで表示
    enemy3.scaleY = 0.1;  // 通常のサイズで表示

    strong_enemy_judge = new createjs.Shape();
    //strong_enemy_judge.visible = false;

    strong_enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);
    enemy3.addChild(strong_enemy_judge);
    enemy3.addChild(new createjs.Bitmap(loader.getResult("stenemy")));

    enemy3.x = STAGE_W;
    enemy3.y = STAGE_H * Math.random();
    enemyList3_hobbor_timer.push(frame_cnt);
    //console.log(enemyList3_hobbor_timer );
    stage.addChild(enemy3); // 画面に表示
    enemyList3.push(enemy3); // 配列に保存

    let enemy4 = new createjs.Container();
    enemy4.scaleX = 0.1;  // 通常のサイズで表示
    enemy4.scaleY = 0.1;  // 通常のサイズで表示

    strong_enemy_judge = new createjs.Shape();
    //strong_enemy_judge.visible = false;
    strong_enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);
    enemy4.addChild(strong_enemy_judge);
    enemy4.addChild(new createjs.Bitmap(loader.getResult("stenemy")));

    enemy4.x = STAGE_W;
    enemy4.y = STAGE_H * Math.random();
    enemyList4_hobbor_timer.push(frame_cnt);
    stage.addChild(enemy4); // 画面に表示
    enemyList4.push(enemy4); // 配列に保存

}


function make1_strong_enemy() {
    //乱数で、2から4の値を取得
    let random = Math.floor(Math.random() * 3) + 2;
    if (random == 2) {
        let enemy2 = new createjs.Container();
        enemy2.scaleX = 0.1;  // 通常のサイズで表示
        enemy2.scaleY = 0.1;  // 通常のサイズで表示

        strong_enemy_judge = new createjs.Shape();
        strong_enemy_judge.visible = false;
        strong_enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);

        enemy2.addChild(strong_enemy_judge);
        enemy2.addChild(new createjs.Bitmap(loader.getResult("stenemy")));

        enemy2.x = STAGE_W;
        enemy2.y = STAGE_H * Math.random();
        enemyList2_hobbor_timer.push(frame_cnt);
        stage.addChild(enemy2); // 画面に表示
        enemyList2.push(enemy2); // 配列に保存
    }
    else if (random == 3) {
        let enemy3 = new createjs.Container();
        enemy3.scaleX = 0.1;  // 通常のサイズで表示
        enemy3.scaleY = 0.1;  // 通常のサイズで表示

        strong_enemy_judge = new createjs.Shape();
        strong_enemy_judge.visible = false;

        strong_enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);
        enemy3.addChild(strong_enemy_judge);
        enemy3.addChild(new createjs.Bitmap(loader.getResult("stenemy")));

        enemy3.x = STAGE_W;
        enemy3.y = STAGE_H * Math.random();
        enemyList3_hobbor_timer.push(frame_cnt);
        stage.addChild(enemy3); // 画面に表示
        enemyList3.push(enemy3); // 配列に保存

    }
    else {
        let enemy4 = new createjs.Container();
        enemy4.scaleX = 0.1;  // 通常のサイズで表示
        enemy4.scaleY = 0.1;  // 通常のサイズで表示

        strong_enemy_judge = new createjs.Shape();
        strong_enemy_judge.visible = false;
        strong_enemy_judge.graphics.beginFill("red").drawRect(0, 0, 50, 50);
        enemy4.addChild(strong_enemy_judge);
        enemy4.addChild(new createjs.Bitmap(loader.getResult("stenemy")));

        enemy4.x = STAGE_W;
        enemy4.y = STAGE_H * Math.random();
        enemyList4_hobbor_timer.push(frame_cnt);
        stage.addChild(enemy4); // 画面に表示
        enemyList4.push(enemy4); // 配列に保存

    }
}

function moveEnemy2(enemy, hobbor_timer) {
    // 自機と敵の座標を取得
    let playerX = player.x;
    let playerY = player.y;
    let enemyX = enemy.x;
    let enemyY = enemy.y;

    // ランダム移動の確率を設定（例: 50%の確率でランダム移動）
    //let randomMoveChance = 0.5;
    //console.log(frame_cnt - hobbor_timer);
    // ランダム移動を行うかどうかを決定
    if (frame_cnt - hobbor_timer > strong_enemy_hobbor_frame) {
        enemy.x -= enemySpeed * strong_enemy_Speed_difficulty;

    } else {
        // 自機の方向に移動
        let deltaX = playerX - enemyX;
        let deltaY = playerY - enemyY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance !== 0) {
            enemy.x += (deltaX / distance) * enemySpeed;
            enemy.y += (deltaY / distance) * enemySpeed;
        }
    }
}


function moveEnemy3(enemy, hobbor_timer) {
    // 自機と敵の座標を取得
    let playerX = player.x;
    let playerY = player.y;
    let enemyX = enemy.x;
    let enemyY = enemy.y;


    // ランダム移動を行うかどうかを決定
    if (frame_cnt - hobbor_timer > strong_enemy_hobbor_frame) {
        enemy.x -= enemySpeed * strong_enemy_Speed_difficulty;
        enemy.y -= enemySpeed * strong_enemy_Speed_difficulty;

    } else {
        // 自機の方向に移動
        let deltaX = playerX - enemyX;
        let deltaY = playerY - enemyY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance !== 0) {
            enemy.x += (deltaX / distance) * enemySpeed;
            enemy.y += (deltaY / distance) * enemySpeed;
        }
    }


}

function moveEnemy4(enemy, hobbor_timer) {
    // 自機と敵の座標を取得
    let playerX = player.x;
    let playerY = player.y;
    let enemyX = enemy.x;
    let enemyY = enemy.y;




    if (frame_cnt - hobbor_timer > strong_enemy_hobbor_frame) {
        enemy.x -= enemySpeed * strong_enemy_Speed_difficulty;
        enemy.y += enemySpeed * strong_enemy_Speed_difficulty;

    } else {
        // 自機の方向に移動
        let deltaX = playerX - enemyX;
        let deltaY = playerY - enemyY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance !== 0) {
            enemy.x += (deltaX / distance) * enemySpeed;
            enemy.y += (deltaY / distance) * enemySpeed;
        }
    }
}
function strong_enemy_hittest() {

    //自分と、enemyList2の当たり判定
    for (let i = 0; i < enemyList2.length; i++) {
        let strong_enemy = enemyList2[i];

        if (originalhitTest3(enemyList2[i])) {
            stage.removeChild(enemyList2[i]);
            enemyList2.splice(i, 1);
            enemyList2_hobbor_timer.splice(i, 1);
            life -= 1;
            damage_flag = true;
            damaged_frame = frame_cnt
            createjs.Sound.play("damage");
        }
    }

    //自分と、enemyList3の当たり判定
    for (let i = 0; i < enemyList3.length; i++) {

        if (originalhitTest3(enemyList3[i])) {
            stage.removeChild(enemyList3[i]);
            enemyList3.splice(i, 1);
            enemyList3_hobbor_timer.splice(i, 1);
            life -= 1;
            damage_flag = true;
            damaged_frame = frame_cnt;
            createjs.Sound.play("damage");
        }
    }

    //自分と、enemyList4の当たり判定
    for (let i = 0; i < enemyList4.length; i++) {
  
        if (originalhitTest3(enemyList4[i])) {
            stage.removeChild(enemyList4[i]);
            enemyList4.splice(i, 1);
            enemyList4_hobbor_timer.splice(i, 1);
            life -= 1;
            damage_flag = true;
            damaged_frame = frame_cnt;
            createjs.Sound.play("damage");
        }
    }
}

function strong_enemy_bullet_hittest()
{
    //強い敵と発射玉の当たり判定
    for (let i = 0; i < enemyList2.length; i++) {
        let enemy = enemyList2[i];
        for (let j = 0; j < bulletList.length; j++) {
            let bullet = bulletList[j];
            let pt = bullet.localToLocal(0, 0, enemy);
            if (enemy.hitTest(pt.x, pt.y) == true) {
                stage.removeChild(bullet);
                bulletList.splice(j, 1);
                stage.removeChild(enemy);
                enemyList2.splice(i, 1);
                enemyList2_hobbor_timer.splice(i, 1);
                createjs.Sound.play("hit");
                enemy_norma -= 1;
                
                score += 100;
                scoreBoard.text = String(score);
                break;
            }
        }
    }

    //強い敵と発射玉の当たり判定
    for (let i = 0; i < enemyList3.length; i++) {
        let enemy = enemyList3[i];
        for (let j = 0; j < bulletList.length; j++) {
            let bullet = bulletList[j];
            let pt = bullet.localToLocal(0, 0, enemy);
            if (enemy.hitTest(pt.x, pt.y) == true) {
                stage.removeChild(bullet);
                bulletList.splice(j, 1);
                stage.removeChild(enemy);
                enemyList3.splice(i, 1);
                enemyList3_hobbor_timer.splice(i, 1);
                enemy_norma -= 1;
                createjs.Sound.play("hit");
                score += 100;
                scoreBoard.text = String(score);
                break;
            }
        }
    }

    //強い敵と発射玉の当たり判定
    for (let i = 0; i < enemyList4.length; i++) {
        let enemy = enemyList4[i];
        for (let j = 0; j < bulletList.length; j++) {
            let bullet = bulletList[j];
            let pt = bullet.localToLocal(0, 0, enemy);
            if (enemy.hitTest(pt.x, pt.y) == true) {
                stage.removeChild(bullet);
                bulletList.splice(j, 1);
                stage.removeChild(enemy);
                createjs.Sound.play("hit");
                enemyList4.splice(i, 1);
                enemyList4_hobbor_timer.splice(i, 1);
                enemy_norma -= 1;
                score += 100;
                scoreBoard.text = String(score);
                break;
            }
        }
    }


}