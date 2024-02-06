import os 

for i in range(1, 9):
    # criar pasta
    nome_pasta = f'TPC{i}'
    os.mkdir(nome_pasta) 
    # criar ficheiro .gitkeep
    open(f"{nome_pasta}/.gitkeep", "w")
    # criar readme.md
    open(f"{nome_pasta}/README.md", "w")


# criar pasta Projeto
os.mkdir("Projeto")
open("Projeto/.gitkeep", "w")
open("Projeto/README.md", "w")

# criar pasta Teste
os.mkdir("Teste")
open("Teste/.gitkeep", "w")
open("Teste/README.md", "w")
