import json
import requests

datasets = ["datasets/dataset-extra1.json",
            "datasets/dataset-extra2.json", 
            "datasets/dataset-extra3.json"]

api_url = "http://localhost:7777/pessoas"

for dataset in datasets:
    with open(dataset, 'r', encoding='utf-8') as file:
        pessoas = json.load(file)['pessoas']
        
        for pessoa in pessoas:
            response = requests.post(api_url, json=pessoa)
            print(f"POST {pessoa['nome']}, Response: {response.status_code}")