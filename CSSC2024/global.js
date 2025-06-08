// 画面サイズ
const STAGE_W = 960;
const STAGE_H = 540;

let stage;
let scene_id; // シーンID
let frame_cnt; // フレーム番号
let score; // スコア
let scoreBoard; // スコア欄

let player; // 自機
let playerSpeed; // 自機の速さ
let bulletList; // 発射弾の配列
let bulletSpeed; // 弾の速さ
let enemyList; // 敵の配列
let enemyList2; // 敵の配列
let enemyList3 = []; // 敵の配列
let enemyList4 = []; // 敵の配列
let enemySpeed; // 敵の速さ

let titleText; // タイトル
let howToText; // 操作説明
let pressSpaceText;

let isPressLeft = false;
let isPressRight = false;
let isPressUp = false;
let isPressDown = false;
let isPressV = false;
let isPressSpace = false;
let isPressEnter = false;
let isClick = false;

//自分の変数宣言

let loader;
let mode;
let easy_Button;
let normal_Button;
let hard_Button;


let enemyList2_hobbor_timer = [];
let enemyList3_hobbor_timer = [];
let enemyList4_hobbor_timer = [];

let modelabel; //難易度を選択するラベル

let player_judge; //プレイヤーに対しての、当たり判定用の変数
let enemy_judge; //敵に対しての、当たり判定用の変数
let strong_enemy_judge; //強い敵に対しての、当たり判定用の変数

let time;//時間を計測する変数
let con_time;

let timeBoard; //時間を表示するラベル


 //連射速度
let shoot_speed = 10;
let enemy_spown_time;
let strong_enemy_spown_time;
let normal_enemy_spown_time;

let strong_enemy_Speed_difficulty;
let strong_enemy_hobbor_frame;
let bg;
let title_bgm_instance;
let gameover_bgm_instance;
let gameclear_bgm_instance;
let is_already_played_title_bgm = false;

let life;
let lifeBoard;


let mute = true;
let damage_flag = false;
let red_screen;
let damaged_frame;

let remain_ballet;//残りの弾数
let remainBoard;//残りの弾数を表示するラベル

let enemy_norma; //敵を倒す目標数
let enemy_norma_board; //敵を倒す目標数を表示するラベル


let background;
let is_already_show_gameover = false;
let retryButton;

let is_already_show_gameclear = false;
let nextButton; //次のステージに進むボタン

let remain_time; //残り時間

let ura_mode;
let ura_mode_button; //裏モードに移行するボタン
let ura_mode_button_label; //裏モードに移行するボタンのラベル
let ura_click;

