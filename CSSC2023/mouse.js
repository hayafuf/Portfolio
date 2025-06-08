// マウスイベントの登録
window.addEventListener("click", handleClick);
window.addEventListener("dblclick", handleDblClick);


//ウィンドウ上からマウスが離れた時の処理

// クリックした時の処理
function handleClick(event) {
    //console.log( event.offsetX + " " + event.offsetY );
    if(scene_id === 1)
    {
        isClick = true;
    }
}

// ダブルクリックした時の処理
function handleDblClick(event) {
    stage.update();
}




