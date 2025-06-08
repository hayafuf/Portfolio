# はじめに
本ポートフォリオをご覧いただき、誠にありがとうございます。これまでに作成した主要な成果物をまとめています。さらに詳細な技術的な仕様に関しては、各フォルダ内のREADNE.md, または、pdfファイルから見る事ができます。/Thank you very much for visiting my portfolio. This portfolio highlights the key project that I have developed. For more detailed technical specification please refer to the READ files or documentation files within each foloder.

## 1.エッジAI搭載　自動走行ラズベリーパイカー / Raspberry Pi autonomous driving car 
```
フォルダ(Foloder): autonomous_driving
```
##  概要(Overview)
大学の課外プロジェクトに参加し、量子化畳み込みニューラルネットワークモデルをラズベリーパイ上に搭載し、決められたコース上を自動走行させました。具体的には、ステアリング操作のデータセットに対し、量子化によるモデル圧縮と、不均衡データ誤分類コストの最適化を同時に行う手法を考案・実装しました。この手法によって、エッジデバイス上での軽量な動作と、より精度の高い安定した自動走行を両立させる事に成功しました。/ This is an autonomous driving robot powered by an Edge AI model, which I developed as part of the university's extracurricular project. The model learns both aspects of quantization error and the cost of misclassification of imbalanced data. By applying this method, accuracy improved, leading to safer driving.

## 使用技術(Technology and used framework)
使用言語(Programming Language)Python

フレームワーク(Framework): TensorFlow

ハードウェア(Hardware): Raspberry Pi4 Model B, Camera Module



## デモ動画

https://github.com/user-attachments/assets/d50bd8a1-6090-4ec6-b733-2d74e22c60cd


##  2.ラズベリーパイ イントロチャレンジアラーム / Raspberry pi Intro-challenge alarm 
```
フォルダ(Folder): IES1_intro_challenge_alarm
```
##  概要(Outline)
大学の授業「システム総合演習I」にて、二度寝防止と効果的な覚醒を目的とした、ラズパイ上で動く「イントロ目覚まし時計」を開発しました。設定時間になると、スピーカーとブザーからアラームが鳴り、ボタンを押すことでイントロクイズを受けられます。ゲームオーバーまたは、意図的にイントロクイズを中断しようとすると、自動的に再度ブザーとアラームが鳴る仕組みです。これにより、単に音を止めるだけでなく、楽しく、そして頭を使って効果的に覚醒をできるように工夫しました。 /  For my "Integrated Exercise for System I" class, I developed an alarm clock that makes us take a music intro quiz and turn it off. If the user quits the game or gets a game over, the alarm and buzzer automatically sound again. This system lets the user think and have fun, and effectively prevents them from falling back asleep.
## 技術(Technology and used framework)
使用言語(Programming Language)Python

フレームワーク(Framework): PyGame

使用した物品(Used elements): Raspberry Pi3 ModelB, Speaker,BreadBoard, Buzzer, Register, Jumper wire, LCD


イントロクイズのナレーション(Narration of Intro quiz): VOICEVOX:ずんだもん　https://icevox.hiroshiba.jp/

音源使用素材(BGM & SE): 〇正解, アルスパーク様, 【無料】 効果音のフリー音源素材, https://arspark.jp/material/

×不正解, アルスパーク様,　【無料】 効果音のフリー音源素材, https://arspark.jp/material/

Time up音源, 魔王魂様, システム08, https://maou.audio/

アラーム音, エスフェクツ：無料効果音素材配信様, エヴァンゲリオン風警告音, https://esffects.net/kiyaku.html

## デモ動画

https://youtu.be/5f6MvzREQP0



## 3.JavaScriptゲーム制作(インストラクター担当) / JavaScript Game Development Instructor
高校生向けの「コンピュータサイエンス・サマーキャンプ」において、JavaScriptを使用したゲームプログラミングコースのインストラクターとして参加し、参加者にプログラミングの基礎をサポートしながら、ものづくりの楽しさを伝えました。このキャンプでは、3泊4日という短期間で、参加者のコンピュータスキルに差がある中での指導が求められました。この経験を通じて、限られた時間の中で最良の解決策を見つける発想力・遊び心、相手のスキルに対してアドバイスを伝える力そして、グループをゴールに導くプロジェクト推進力を養いました。/ I participated as an instructor in the "Computer Science Summer Camp" JavaScript game programming course. I taught the basics of programming to the participants and demonstrated how manufacturing can be fun. The game development course lasted only three nights and four days, so I had to adapt my instruction to participants with varying computer skills. From this experience, I gained optimal solutions for fostering creativity, playfulness, providing teaching advice on partners' skills, and promoting projects. 

```
フォルダー(Folder)
CSSC2024
CSSC2023
```
## 技術
使用言語(Programming Language)JavaScript, HTML

フレームワーク(Framework): CreateJS

2024年度作品(読み込みに時間がかかります):https://hayafuf.github.io/CSSC2024_our_contribute/

2023年度作品(読み込まれたときに画面クリックでゲームが始まります): https://hayafuf.github.io/CSSC2023_our_contribute/
