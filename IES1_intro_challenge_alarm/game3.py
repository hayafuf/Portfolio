
from pygame.locals import *
import pygame
import sys
import random
import sqlite3
import os

# pygameを初期化する
pygame.init()

choosement = {}

INSTRUCTION_PATH = "music/instruction.wav"
CORRECT_SOUND_PATH = "music/OK.mp3"
INCORRECT_SOUND_PATH = "music/NG.mp3"
TIMEUP_SOUND_PATH = "music/Timeup.mp3"

LIFE_SAVED = 3


CORRECT = pygame.mixer.Sound(CORRECT_SOUND_PATH)
INCORRECT = pygame.mixer.Sound(INCORRECT_SOUND_PATH)
TIMEUP = pygame.mixer.Sound(TIMEUP_SOUND_PATH)



LIFE = 3 # ライフの設定(ゲームの失敗回数（ゲーム難易度に相当）)
GAME_PROGRESS = 0 # ゲームの進行度（ゲームの成功回数（ゲーム難易度に相当）)
NORMA = 5 
TIMER = 1.4# タイマーの設定（ゲームの難易度に相当）


# 曲がローカルに保存されているパスと、その曲の情報が保存されているデータベース
# 三択クイズ用なので、操作は、ランダムにデータを辞書式で取得し、それを返すだけ
class MusicDatabase:
    def __init__(self):
        # 接続 music.dbがなければ作成
        self.conn = sqlite3.connect("music.db")
        self.cursor = self.conn.cursor()
        # テーブルがなければ作成
        self.cursor.execute("CREATE TABLE IF NOT EXISTS music (absolute_music_path TEXT, title TEXT)")


    # 曲の登録をする用のメソッド
    def insert(self, path, title):
        self.cursor.execute("INSERT INTO music (absolute_music_path, title) VALUES (?, ?)", (path, title))
        self.conn.commit()

    # 曲の情報を取得する用のメソッドもちろん3択クイズなので、同じ要素を取得しないようにする。
    def get_music(self):
        quiz_data = []
        # 曲が3つなければ、エラーを返す
        self.cursor.execute("SELECT * FROM music")
        if len(self.cursor.fetchall()) < 3:
            return -1
        # ランダムにデータを取得
        self.cursor.execute("SELECT absolute_music_path, title FROM music ORDER BY RANDOM() LIMIT 3")
        music_data = self.cursor.fetchall()
        for path, title in music_data:
            quiz_data.append((path, title))
        return quiz_data

    # 曲を削除する用のメソッド
    def delete(self, title):
        self.cursor.execute("DELETE FROM music WHERE title = ?", (title,))
        self.conn.commit()

    # データベースを閉じる
    def close(self):
        self.cursor.close()
        self.conn.close()


# クイズを作成するクラス
class MakeQuiz:
    def __init__(self):
        self.quiz_data = []
        self.quiz_flag = False

        # 3択イントロクイズ用のデータ
        self.music_data = MusicDatabase()
        self.answer = {}
        self.answer_num = 0

    def shuffle(self):
        #音楽データベースから、3つの曲を取得
        self.quiz_data = self.music_data.get_music()
        #正解をランダムに設定
        self.answer_num = random.randint(0, 2)
       # print(self.answer_num)
        self.answer = self.quiz_data[self.answer_num]

    def check_answer(self, selected_button):
        if self.answer_num == selected_button:
            return True
        else:
            return False

    def play_music(self):
        # 音楽を再生する
        music_path = os.path.abspath(self.answer[0])  # 絶対パスに変換
        pygame.mixer.music.load(music_path)
        pygame.mixer.music.play()

    def stop_music(self):
        # 音楽を停止する
        pygame.mixer.music.stop()


# 一番最初の説明する画面のクラス
class FirstScreen:
    def __init__(self, screen):
        self.screen = screen
        self.enable = True

        # フォントを設定する
        font = pygame.font.SysFont("hg正楷書体pro", 30)

        # 表示するメッセージ
        self.text_surface_title = font.render("イントロクイズを始めるよ!", True, (0, 0, 255))
        self.text_surface_explain = font.render("5秒間のイントロを聞いて、1, 2, 3からボタンかキーを押して選び、", True, (0, 0, 255))
        self.text_surface_explain2 = font.render("曲名を当てよう！", True, (0, 0, 255))
        self.text_surface_explain2 = font.render("5回成功すると、アラームが止まるよ！", True, (0, 0, 255))
        self.text_surface_explain3 = font.render("3回失敗すると、アラームがまた鳴るので気を付けて！", True, (0, 0, 255))

    def draw(self):
        pygame.display.set_caption("イントロクイズ!")
        # テキストを画面に描画する
        self.screen.blit(self.text_surface_title, (0, 0))
        self.screen.blit(self.text_surface_explain, (0, 100))
        self.screen.blit(self.text_surface_explain2, (0, 200))
        self.screen.blit(self.text_surface_explain3, (0, 300))
    
            # enable変数を設定する
    def set_enable(self, enable):
        self.enable = enable
class SecondScreen:
    global LIFE
    global GAME_PROGRESS
    
    def __init__(self, screen, button1, button2, button3):
        global TIMER
        self.screen = screen
        self.enable = False
        self.start_time = pygame.time.get_ticks()


        # ボタンの色のロック
        self.selected_button = 0

        # 答えを設定するためのボタン
        self.button1 = button1
        self.button2 = button2
        self.button3 = button3
        
        self.color1 = (30, 0, 255)
        self.color2 = (30, 0, 255)
        self.color3 = (30, 0, 255)

        # フォントを設定する
        font = pygame.font.SysFont("hg正楷書体pro", 30)

        # 表示するメッセージ
        self.text_surface_title = font.render("イントロクイズを始めるよ!", True, (0, 0, 255))
        self.text_surface_explain = font.render("この曲は何?", True, (0, 0, 255))
        self.time_limit = TIMER  # タイムリミット（秒）
        # クイズを作成するクラスのインスタンス化
        self.quiz_flag = False
        self.make_quiz = MakeQuiz()
        self.quiz_data = []
    

    def draw_text(self, text, x, y, color=(255, 255, 255), size=30):
        font = pygame.font.SysFont("hg正楷書体pro", size)
        text_surface = font.render(text, True, color)
        self.screen.blit(text_surface, (x, y))

    def draw(self, show_result=False):
        global choosement
        pygame.display.set_caption("イントロクイズ!")
        # テキストを画面に描画する
        self.screen.blit(self.text_surface_title, (0, 0))
        self.screen.blit(self.text_surface_explain, (0, 100))

        # ボタンを描画する
        pygame.draw.rect(self.screen, self.color1, self.button1)
        pygame.draw.rect(self.screen, self.color2, self.button2)
        pygame.draw.rect(self.screen, self.color3, self.button3)

        # クイズが実行されているかどうか
        if not self.quiz_flag and not show_result:
            self.make_quiz.shuffle()
            choosement = self.make_quiz.quiz_data
            self.make_quiz.play_music()  # 音楽を再生する
            self.quiz_flag = True

        # クイズの選択肢を描画する
        self.draw_text("%s" % choosement[0][1], self.button1.x + 10, self.button1.y + 10, size =30)
        self.draw_text("%s" % choosement[1][1], self.button2.x + 10, self.button2.y + 10, size = 30)
        self.draw_text("%s" % choosement[2][1], self.button3.x + 10, self.button3.y + 10, size = 30)
        # ライフを表示する
        font = pygame.font.SysFont("hg正楷書体pro", 30)
        life_surface = font.render(f"ライフ: {LIFE}", True, (255, 0, 0))
        self.screen.blit(life_surface, (0, 450))

        # ゲームの進行度を表示する
        game_progress_surface = font.render(f"進行度: {GAME_PROGRESS}", True, (0, 0, 255))
        self.screen.blit(game_progress_surface, (0, 500))

    # enable変数を設定する
    def set_enable(self, enable):
        self.enable = enable
        self.start_time = pygame.time.get_ticks()
        self.quiz_flag = False

    def timer(self):
  
        # タイムアップしたかどうかを判定する
        elapsed_time = (pygame.time.get_ticks() - self.start_time) / 1000
        remaining_time = self.time_limit - elapsed_time
        if remaining_time <= 0:
       
            self.make_quiz.stop_music()
            TIMEUP.play()
            return True  # タイムアップ
        else:
            # 残り時間を表示する
            font = pygame.font.SysFont("hg正楷書体pro", 30)
            timer_surface = font.render(f"残り時間: {int(remaining_time)}", True, (255, 0, 0))
            self.screen.blit(timer_surface, (0, 400))
            return False

    # ボタンの色を選択中に変更する関数
    def change_button_color(self, number):
        # 元々色が変更されていたら、元に戻す
        if self.selected_button != 0:
            if self.selected_button == 1:
                self.color1 = (30, 0, 255)
            elif self.selected_button == 2:
                self.color2 = (30, 0, 255)
            elif self.selected_button == 3:
                self.color3 = (30, 0, 255)

        if number == 1:
            self.color1 = (10, 254, 255)
        elif number == 2:
            self.color2 = (10, 254, 255)
        elif number == 3:
            self.color3 = (10, 254, 255)

        self.selected_button = number

    def check_answer(self, selected_button):
        global choosement
        global INCORRECT
        global CORRECT
        self.make_quiz.stop_music()  # 音楽を停止する

        if self.make_quiz.check_answer(selected_button - 1):
            CORRECT.play()
            return True
        else: # 間違っていた場合
            INCORRECT.play()

            return False

# タイムアップ表示用のクラス
class Message(SecondScreen):

    def __init__(self, screen, button1, button2, button3):
        super().__init__(screen, button1, button2, button3)
        self.time_up_start_time = None
        self.font = pygame.font.SysFont("hg正楷書体pro", 100)

    def set_enable(self, enable):
        self.enable = enable
        if enable:
            self.time_up_start_time = pygame.time.get_ticks()

    def draw(self, state):
        global LIFE
        global GAME_PROGRESS
        super().draw(show_result=True)
        if state == 1:

            text = "〇"
            text_surface = self.font.render(text, True, (0, 255, 0))
            text_rect = text_surface.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() // 2 - 50))
            self.screen.blit(text_surface, text_rect)
        elif state == -1:
 
            text = "×"
            text_surface = self.font.render(text, True, (255, 0, 0))
            text_rect = text_surface.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() // 2 - 50))
            self.screen.blit(text_surface, text_rect)
        elif state == 2:

            text = "Time up!"
            text_surface = self.font.render(text, True, (255, 0, 0))
            text_rect = text_surface.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() // 2 - 50))
            self.screen.blit(text_surface, text_rect)



def start_quiz():
    #メインループの設定
    global LIFE
    global NORMA
    global GAME_PROGRESS
    global INSTRUCTION_PATH
    running = True
    # ウィンドウの設定
    screen = pygame.display.set_mode((800, 600))
    clock = pygame.time.Clock()
    # スクリーンの設定
    first_screen = FirstScreen(screen)
    # ボタンの設定　メインで位置を決定する
    button_width = 300
    button_height = 50
    button_x = (screen.get_width() - button_width) // 2
    button_y = 200

    button1 = pygame.Rect(button_x, button_y, button_width, button_height)
    button2 = pygame.Rect(button_x, button_y + button_height + 10, button_width, button_height)
    button3 = pygame.Rect(button_x, button_y + 2 * (button_height + 10), button_width, button_height)
    # セカンドスクリーン　（実際のクイズ画面のクラス）のインスタンス化
        #ライフの設定

    second_screen = SecondScreen(screen, button1, button2, button3)
    message = Message(screen, button1, button2, button3)

    flag = 0
    answer = 0
    ONCE_PLAY = 1
    SKIP = 0 # 説明画面をスキップするかどうか
    is_correct = 0

    start_ticks = pygame.time.get_ticks()

    try:
        # ゲームループ
        while running:


            for event in pygame.event.get():
                # ウィンドウを閉じるボタンが押されたら修了

                # キーボードの入力を受け付ける
                if event.type == pygame.QUIT:
                    pygame.mixer.init()
                    return -2
                elif flag == 0 and event.type == pygame.KEYDOWN:
                    if event.key == K_RETURN:
                        first_screen.set_enable(False)
                        second_screen.set_enable(True)
                        start_ticks = pygame.time.get_ticks()
                        pygame.mixer.music.stop()
                        SKIP = 1
                        flag = 1
                elif flag == 1 and event.type == pygame.KEYDOWN:
                    if event.key == K_1:
                        second_screen.change_button_color(1)
                        answer = 1
                    elif event.key == K_2:
                        second_screen.change_button_color(2)
                        answer = 2
                    elif event.key == K_3:
                        second_screen.change_button_color(3)
                        answer = 3
                    if event.key == K_RETURN and answer != 0:
                        if second_screen.check_answer(answer):
                            is_correct = 1
                            GAME_PROGRESS += 1
                        else:
                            is_correct = -1
                            LIFE -= 1
                
                        answer = 0
                # マウスの入力を受け付ける
                elif flag == 1 and event.type == pygame.MOUSEBUTTONDOWN:
                    if button1.collidepoint(event.pos):
                        second_screen.change_button_color(1)
                        answer = 1
                    elif button2.collidepoint(event.pos):
                        second_screen.change_button_color(2)
                        answer = 2
                    elif button3.collidepoint(event.pos):
                        second_screen.change_button_color(3)
                        answer = 3

            screen.fill((255, 255, 255))

            if flag == 3 and LIFE == 0:
                pygame.mixer.init()
                print("Game Over")
                LIFE = LIFE_SAVED
                GAME_PROGRESS = 0
                return -1
            elif flag == 3 and GAME_PROGRESS == NORMA:
                print("Game Clear")
                LIFE = LIFE
                GAME_PROGRESS = GAME_PROGRESS
                return 1


            # 説明画面が、有効な場合
            if first_screen.enable:
                if ONCE_PLAY == 1:
                    pygame.mixer.music.load(INSTRUCTION_PATH)
                    pygame.mixer.music.play()
                    ONCE_PLAY = 0
                
                first_screen.draw()
                if (pygame.time.get_ticks() - start_ticks) / 1000 > 23 or SKIP == 1:

                    first_screen.set_enable(False)
                    second_screen.set_enable(True)
                    start_ticks = pygame.time.get_ticks()
                    flag = 1
            # クイズ画面が有効な場合
            elif second_screen.enable:
                second_screen.draw()
                #時間切れの場合
                if second_screen.timer():
                    LIFE -= 1
                    second_screen.set_enable(False)
                    message.set_enable(True)
                    start_ticks = pygame.time.get_ticks()
                    flag = 2
                    is_correct = 2
                elif is_correct != 0:

                    second_screen.set_enable(False)
                    message.set_enable(True)
                    start_ticks = pygame.time.get_ticks()
                    flag = 2
            # 何か入力されて、正解かどうかを判定する
            elif message.enable:
                message.draw(is_correct)
                if (pygame.time.get_ticks() - start_ticks) / 1000 > 2:
                    message.set_enable(False)
                    second_screen = SecondScreen(screen, button1, button2, button3)
                    second_screen.set_enable(True)
                    start_ticks = pygame.time.get_ticks()

                    if GAME_PROGRESS == NORMA or LIFE == 0:
                        
                        flag = 3

                    
                    else:
                        flag = 1
                        is_correct = 0
            


            pygame.display.update()
            clock.tick(60)
    except KeyboardInterrupt:
        LIFE = LIFE_SAVED
        GAME_PROGRESS = 0
        return -3

    pygame.quit()

