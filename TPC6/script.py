import json

def main():
    with open('new_dataset.json', encoding='utf-8') as f:
        data = json.load(f)
    
        for entry in data:
            del entry['id']

        result_json = json.dumps(data, indent=4)

        with open('new_dataset.json', 'w', encoding='utf-8') as f:
            f.write(result_json)

        print("done")

if __name__ == "__main__":
    main()