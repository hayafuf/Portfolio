// キーイベントの登録
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

// キーが押されたとき
function handleKeyDown(event) {

    //console.log( event.key )
    //console.log( event.altKey )
    //console.log( event.ctrlKey )
    //console.log( event.shiftKey )

    let keyCode = event.keyCode;

    switch ( keyCode ) {
    case 32 : // space
        
        if ( scene_id === 1 ) {
            isPressSpace = true;

        }
        break;
    case 37 : isPressLeft = true; break;
    case 38 : isPressUp = true; break;
    case 39 : isPressRight = true; break;
    case 40 : isPressDown = true; break;
    case 13 : //リロード
        isPressEnter = true;
        break;
    case 86 : //ミュート    
        isPressV = true;
        sound_title();
        break

    
    default : break;
    }

  
        
}

// キーを離したとき
function handleKeyUp(event) {
    let keyCode = event.keyCode;

    switch ( keyCode ) {
    case 32 : isPressSpace = false; break;
    case 37 : isPressLeft = false; break;
    case 38 : isPressUp = false; break;
    case 39 : isPressRight = false; break;
    case 40 : isPressDown = false; break;
    case 13 : isPressEnter = false; break;
    case 86 : isPressV = false; break;
    default : break;
    }
}
