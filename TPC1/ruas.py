import os
import xml.etree.ElementTree as ET

nome_pasta = "html"

if not os.path.exists(nome_pasta):
    os.makedirs(nome_pasta)

html = '''
<!DOCTYPE html>
<html>
<head>
    <title>EngWeb2023</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="../rua.css">
</head>
<body>
    <a href="../index.html" style="text-decoration: none; color: black;"><h1>Ruas de Braga</h1></a>
'''

template = html

path_xml_ruas = "./MapaRuas-materialBase/texto/"

html += "<ul>"

ruas = {}
for file in os.listdir(path_xml_ruas):
    if file.endswith(".xml"):
        file_path = os.path.join(path_xml_ruas, file)

        # Ler o ficheiro e substituir o encoding
        with open(path_xml_ruas + file, 'r', encoding='utf-8') as f:
            data = f.read()
            data = data.replace("encoding=\"ISO-8859-1\"", "encoding=\"UTF-8\"")
        with open(path_xml_ruas + file, 'w', encoding='utf-8') as f:
            f.write(data)

        # Parse do xml
        tree = ET.parse(path_xml_ruas + file)
        root = tree.getroot()

        # Extrair as ruas 
        rua_element = root.find('.//nome')
        if rua_element is not None:
            rua_name = rua_element.text.strip()
            ruas[rua_name] = file_path

            # caminho das imagens
            rua_imagens = {}
            for figura in root.findall('.//figura'):
                imagem = figura.find('imagem')
                path = imagem.get('path')
                filename, file_extension = os.path.splitext(os.path.basename(path))
                image_path = f"../MapaRuas-materialBase/imagem/{filename}{file_extension}"

                # legenda de cada imagem
                legenda = figura.find('legenda').text
                rua_imagens[image_path] = legenda

            # imagens da vista atual
            path_vistas_atuais = "./MapaRuas-materialBase/atual/"
            for img in os.listdir(path_vistas_atuais):
                if rua_name.replace(" ", "") in img:
                    vista_atual_path = f"{path_vistas_atuais}{img}"
                    if "Vista1" in vista_atual_path: 
                        legenda = f"{rua_name} - Vista 1"
                    elif "Vista2" in vista_atual_path: 
                        legenda = f"{rua_name} - Vista 2"
                    else: 
                        legenda = rua_name
                    rua_imagens['.' + vista_atual_path] = legenda

            # descricao da rua
            rua_paragrafos = []
            for paragrafo in root.findall('.//para'):
                para_text = paragrafo.text.strip() if paragrafo.text else ''

                for child_elem in paragrafo:
                    if child_elem.tag == 'lugar':
                        lugar_text = child_elem.text.strip() if child_elem.text else ''
                        if os.path.exists(f"./html/{lugar_text}.html"):  # verifica se existe um ficheiro html para o lugar
                            para_text += f' <a href="{lugar_text}.html">{lugar_text}</a> '
                        else:
                            para_text += f' {lugar_text} '
                        if child_elem.tail:
                            para_text += child_elem.tail.strip()

                    elif child_elem.tag == 'data':
                        data_text = child_elem.text.strip() if child_elem.text else ''
                        para_text += f' {data_text} '
                        if child_elem.tail:
                            para_text += child_elem.tail.strip()

                    elif child_elem.tag == 'entidade' and child_elem.get('tipo') == 'instituição':
                        entidade_text = child_elem.text.strip() if child_elem.text else ''
                        para_text += f' {entidade_text}'
                        if child_elem.tail:
                            para_text += child_elem.tail.strip()

                    else:
                        para_text += f' {child_elem.text.strip()}'
                        if child_elem.tail:
                            para_text += child_elem.tail.strip()

                rua_paragrafos.append(para_text)
            
            # lista de casas
            rua_casas = []
            for casa in root.findall('.//casa'):
                casa_info = []
                casa_info.append(casa.find('número').text)
                casa_info.append(casa.find('enfiteuta'))
                if casa_info[1] is not None:
                    casa_info[1] = casa_info[1].text
                rua_casas.append(casa_info)

            # criar pagina para cada rua
            rua_html = template
            rua_html += f'<h1>{rua_name}</h1>'

            rua_html += '<div class="imagens-container">'
            for imagem, legenda in rua_imagens.items():
                rua_html += '<div class="imagem-container">'
                rua_html += f'<img src="{imagem}" alt="{rua_name}">'
                rua_html += f'<p>{legenda}</p>'
                rua_html += '</div>'
            rua_html += '</div>'

            rua_html += "<h2>Descrição</h2>"
            for paragrafo in rua_paragrafos:
                rua_html += f'<p class="rua-paragrafo">{paragrafo}</p>'

            rua_html += "<h2>Casas</h2>"
            rua_html += "<div class='table-container'>"
            rua_html += "<table>"
            rua_html += "<tr>"
            rua_html += '<th class="header"><b>Número de porta</b></th>'
            rua_html += '<th class="header"><b>Enfiteuta</b></th>'
            rua_html += "</tr>"
            for casa in rua_casas:
                rua_html += "<tr>"
                rua_html += f"<th>{casa[0]}</th>"
                rua_html += f"<th>{casa[1]}</th>"
                rua_html += "</tr>"
            rua_html += "</table>"
            rua_html += "</div>"

            rua_html += "</body>"
            rua_html += "</html>"
            file_path = f"{nome_pasta}/{rua_name}.html"

            if os.path.exists(file_path):
                os.remove(file_path)

            file = open(file_path, "w", encoding="utf-8")
            file.write(rua_html)
            file.close()

ruas = sorted(ruas.keys())

for rua in ruas:
    html += f"<li><a href=\"./html/{rua}.html\">{rua}</a></li>"

html += "</ul>"

html += "</body>"
html += "</html>"

file = open("index.html", "w", encoding="utf-8")
file.write(html)
file.close()