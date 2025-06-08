# ラズベリーパイで動作するイントロクイズ式目覚まし

こちらは、大学の授業システム総合演習Iの授業で作成したラズベリーパイ上で動くイントロクイズ式目覚ましとなっております。

添付しているのは、イントロクイズ式目覚ましをパソコンでも動かせるようにしたものです。

##使い方
必要なライブラリ: PyGame, SQLite3
まず、music_database.pyで、曲のパスとタイトルを入力しイントロクイズに設定したい曲を決めます(3曲以上登録しないと、動きませんのでご注意ください。)
```
C:XXXXX> python music_database.py   

--- Music DB Manager ---
1. Insert music
2. Get music
3. Delete music
4. Exit
Enter your choice: 1
Please enter the path of the music file: music/instruction.wav
Please enter the title of the music: Inst
Music inserted successfully!
```
続いて、alarm.pyで、起きたい時刻を設定します.
```
C: XXXXXX> python alarm.py
pygame 2.5.2 (SDL 2.28.3, Python 3.12.3)
Hello from the pygame community. https://www.pygame.org/contribute.html
設定する時間と分を空白区切り 24時間換算で入力してください。 例: 22 30 21 30
おやすみなさい
```

こちらで指定時刻になったら、アラームが鳴る響くようになります。アラームの画面でキーを押下すると、イントロクイズが始まります。
![image](https://github.com/user-attachments/assets/12b983e5-9518-4589-b09e-dc1966d591af)

ユーザーがクイズを強制終了しようとしたり、GameOverになったりすると、再度アラームが鳴ります
![image](https://github.com/user-attachments/assets/738ae7f8-001d-44d4-948a-801800c2cb49)

## 背景
従来の目覚まし時計では、アラームを止めた後に再度寝てしまう可能性があります。また、大音量の目覚ましや振動式のものもありますが、アパートなどで使用する際、近所迷惑になることや、目覚ましが鳴ったとしても再度寝てしまう恐れがあるという課題が存在します。
そこで、二度寝を防ぎつつ辛い朝の目覚めを楽しくしたいと思い、目覚ましに自分の好きな曲のイントロクイズを導入できれば楽しくなるのではないかと思い、作成に至ったのが背景です
## 機能
最終的に実装したい機能は、以下のようになります:
1. 既存の目覚まし同様、アラームが鳴ったらボタンで止めることが出来ます
2. 自分の好きな曲をイントロクイズに設定することが出来ます。
3. 目覚ましが鳴ったとき、目覚ましを切る代わりに、好きな曲のイントロクイズを出題します。
4. クイズに5回正解したら、アラームが止まります。
5. 朝確実に起きられるように、イントロクイズがゲームオーバーになるか、意図的にユーザーが目覚ましを止めた場合、再度アラームを鳴る仕組みを作ります

## 新規性
目覚ましにクイズ機能つけるという点に関しては、ほかにない発想だと考えています。
また、スヌーズ機能自体、撤廃し確実に朝を起きられるようにしました。


## 追加する機能(ハード側)
![image](https://github.com/user-attachments/assets/35055647-f748-4d6f-b08b-5aa642c03e61)
Pythonのパッケージを使いアラームを設定し、指定時間になったら、ブザーと目覚まし音源を鳴らします。
ブザーとは別にスピーカーも接続し、ボタンを押すまでアラーム音を鳴らし続けます。
アラームが設定された際には、GPIOでつないだLEDでアラームが設定状況を通知し、現在時刻を表示する仕組みも組み込みます。


## 追加する機能(ソフト側)
![image](https://github.com/user-attachments/assets/2482a3e2-611f-4dc8-91f1-f216ca73fcf3)

Pythonのパッケージ: pygameと、SQLiteを使いアラームを流します。また、3回失敗した再度スピーカーとアラームから音を流すようにします。


## 使用した素子
使用した素子は、
Raspberry Pi3 モデルB

スピーカー

ブレッドボード 

ブザー(Mcp 3008-I/P) 

抵抗(公称値 200 +- 1%)

ジャンパー線

I2C LCD(液晶)モジュール

です。

## 動作フロー
動作フローは以下のようになっています。
![image](https://github.com/user-attachments/assets/54e20e1e-6f02-4eca-b3e1-830b9dcafb1f)

## システムアーキテクチャ
システムアーキテクチャは以下のようになっています。
![image](https://github.com/user-attachments/assets/73dca288-9f87-4a36-a412-b8f170d381d1)

ブザー素子: 14番ピン, 12番ピンに接続

LED: 20番ピン, 18番ピンに接続

クイズを止めるためのボタン: 1番ピン, 22番ピンに接続

I2C LCD(液晶)モジュール: GND:6番ピン, VDD:2番ピン, SDA:3番ピン, SCL:5番ピン

## デモ動画
https://www.youtube.com/watch?v=5f6MvzREQP0&feature=youtu.be

## 学んだこと

この目覚ましを作る作業を通じて、ユーザーに喜ばれる目覚まし機能を作成するために、どのようにインタラクションを工夫し、ユーザー体験を向上させるかについて多くを学びました。


