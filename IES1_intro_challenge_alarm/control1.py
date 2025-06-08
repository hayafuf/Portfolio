import game3
import pygame
import time
import sys
# 定数を定義
ALARM_PATH2 = "music/alarm2.mp3"
pygame.init()
FONT = pygame.font.SysFont("hg正楷書体pro", 30)
def draw_text(state, screen, color=(255, 75, 0), size=30):
    font = pygame.font.SysFont("hg正楷書体pro", size)
    text = []
    if state == 0:
        text.append(font.render("警告！！朝だ", True, color))
        text.append(font.render("速やかに、ボタンを押しイントロクイズを受けよ！！", True, color))
    elif state == -1:
        text.append(font.render("GAME OVER!! ", True, color))
        text.append(font.render("再度ボタンを押して、イントロクイズを受けよ！！", True, color))
    elif state == -2:
        text.append(font.render("画面を消しただけで、目覚ましを止められると...?", True, color))
    elif state == -3:
        text.append(font.render("強制終了はできません！！！！クイズを受けよ！", True, color))

    for i, t in enumerate(text):
        if i == 0:
            screen.blit(t, (400 - t.get_width() // 2, 20))
        else:
            screen.blit(t, (400 - t.get_width() // 2, i * size + 20))

def alarm(state, screen):
    pygame.mixer.init()
    pygame.mixer.music.set_volume(1.0)
    pygame.mixer.music.load(ALARM_PATH2)
    pygame.font.init()
    pygame.display.set_caption("Alarm")

    screen.fill((0, 0, 0))
    draw_text(state, screen)
    pygame.display.flip()

    layered_alarm_are_playing = False
    start = pygame.time.get_ticks()
    try:
        pygame.mixer.music.play(-1)
        while True:
            current_time = pygame.time.get_ticks()
   
            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    pygame.mixer.music.stop()
                    return True

    except pygame.error:
        print("ファイルが見つかりません")
    
    except KeyboardInterrupt:
        pass
    finally:
        pygame.mixer.quit()

def main():
    pygame.init()
    flag = 0
    screen = pygame.display.set_mode((800, 200))

    while True:
        alarm(flag, screen)
        pygame.init()

        flag = game3.start_quiz()
        if flag == 1:
            pygame.mixer.init()
            pygame.mixer.music.load("music/alarm_instruction3.wav")
            pygame.mixer.music.play()
            break

        screen = pygame.display.set_mode((800, 200))

