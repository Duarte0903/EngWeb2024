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
            new_data.append(entry)

            if 'genres' in entry:
                generos_set.update(genre for genre in entry['genres'] if genre and genre not in generos_set)

            if 'cast' in entry:
                atores_set.update(actor for actor in entry['cast'] if actor and actor not in atores_set)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}. Skipping line: {line}")

    atores = [{"id": f"a{i}", "nome": actor} for i, actor in enumerate(atores_set, 1)]
    generos = [{"id": f"g{i}", "nome": genre} for i, genre in enumerate(generos_set, 1)]

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

