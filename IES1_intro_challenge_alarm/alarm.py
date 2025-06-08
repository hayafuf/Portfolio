import time
import datetime
import control1
import pygame
import sys
def alarm_check(hour, minute): 
    while True:
        now = datetime.datetime.now()
        if now.hour == hour and now.minute == minute:
            
            control1.main()
            break
        else:
            time.sleep(1)



def main():
    pygame.mixer.init()
    pygame.mixer.music.set_volume(1.0)
    pygame.mixer.music.load("music/alarm_instruction.wav")
    pygame.mixer.music.play()
    

    # 寝る時間の指示
    while True:
        wake_time = 0
        wake_time = input("設定する時間と分を空白区切り 24時間換算で入力してください。 例: 22 30")
        #入力のチェック
        if not wake_time:
            print("時間が入力されていません")
            continue
            
        try:
            tmp = wake_time.split()
            hour = int(tmp[0])
            minute = int(tmp[1])

            if not (0 <= hour < 24 and 0 <= minute < 60):
                print("時間または分が間違っています")
                continue
                
        except ValueError:
            print("時間または分が不正です")
            continue
            
        else:
            print("おやすみなさい")
            pygame.mixer.music.stop()
            pygame.mixer.music.load("music/alarm_instruction2.wav")
            pygame.mixer.music.play()
            alarm_check(hour, minute)
            break
    time.sleep(4)
    pygame.quit()
main()