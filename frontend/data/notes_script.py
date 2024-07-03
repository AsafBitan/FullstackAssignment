import json
import os

def generate_notes(n):
    notes = []
    for i in range(1, n + 1):
        note = {
            "id": i,
            "title": f"Note {i}",
            "author": {
                "name": f"Author {i}",
                "email": f"mail_{i}@gmail.com"
            },
            "content": f"Content for note {i}"
        }
        notes.append(note)
    return notes

def create_json_file(n, filename="notes.json"):
    notes = generate_notes(n)
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Create the full path to the output file
    file_path = os.path.join(script_dir, filename)
    with open(file_path, "w") as json_file:
        json.dump({"notes": notes}, json_file, indent=4)

if __name__ == "__main__":
    n = int(input("Enter the number of notes: "))
    create_json_file(n, filename="notes.json")
    print(f"Created {n} notes in 'notes.json' in the script's directory")