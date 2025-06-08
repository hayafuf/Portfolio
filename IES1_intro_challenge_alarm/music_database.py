import sqlite3
import os

class MusicDatabase:
    def __init__(self):
        self.conn = sqlite3.connect("music.db")
        self.cursor = self.conn.cursor()
        self.cursor.execute("CREATE TABLE IF NOT EXISTS music (absolute_music_path TEXT PRIMARY KEY, title TEXT)")

    def insert(self, path, title):
        path = path.strip().strip('"')
        if not os.path.exists(path):
            print(f"Warning we cannot find the music path: {path}")
            return
            
        absolute_path = os.path.abspath(path)
        self.cursor.execute("INSERT OR IGNORE INTO music (absolute_music_path, title) VALUES (?, ?)", (absolute_path, title))
        self.conn.commit()
        print("Music inserted successfully!")

    def get_music(self):

        pass
    
    def delete(self, path):
        path = path.strip().strip('"')
        absolute_path = os.path.abspath(path)
        self.cursor.execute("DELETE FROM music WHERE absolute_music_path = ?", (absolute_path,))
        self.conn.commit()
        print("Music deleted successfully!")

    def close(self):
        self.cursor.close()
        self.conn.close()

def main():
    music_db = MusicDatabase()

    while True:
        print("\n--- Music DB Manager ---")
        print("1. Insert music")
        print("2. Get music")
        print("3. Delete music")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            path = input("Please enter the path of the music file: ")
            title = input("Please enter the title of the music: ")
            music_db.insert(path, title)

        elif choice == "2":
            music_db.cursor.execute("SELECT * FROM music")
            all_music = music_db.cursor.fetchall()
            if not all_music:
                print("There are no registered music files.")
            else:
                print("Registered music files:")
                for i, (path, title) in enumerate(all_music, 1):
                    print(f"{i}. Title: {title}\n   Path: {path}")
                print("-------------------------")

        elif choice == "3":
            path = input("Please enter the absolute path of the music file to delete: ")
            music_db.delete(path)

        elif choice == "4":
            music_db.close()
            print("Bye!")
            break

        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()