import sys
import json

def fix_json(data):
    lines = data.strip().split('\n')

    new_data = []
    atores_set = set()
    generos_set = set()

    for line in lines:
        try:
            entry = json.loads(line)

            if 'genres' in entry:
                generos_set.update(genre for genre in entry['genres'] if genre)

            if 'cast' in entry:
                atores_set.update(actor for actor in entry['cast'] if actor)

            if entry.get('cast') and entry.get('genres'):
                new_data.append(entry)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}. Skipping line: {line}")

    atores = [{"nome": actor} for actor in atores_set]
    generos = [{"nome": genre} for genre in generos_set]

    return new_data, atores, generos

def main(imp):
    file_path = imp[1]

    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        fixed_json, atores, generos = fix_json(''.join(lines))

    new_json = {
        "filmes": fixed_json,
        "atores": atores,
        "generos": generos
    }

    with open("new_filmes.json", 'w', encoding='utf-8') as file:
        json.dump(new_json, file, indent=2)

if __name__ == "__main__":
    main(sys.argv)

