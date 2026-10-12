# Pastel Highlighter — prototype 0.3

Test de surlignage vert pastel pour l'éditeur riche de Joplin 3.7.21.

Le fichier `.github/workflows/build.yml` lance une compilation sur GitHub Actions en utilisant le modèle de plugin Joplin. Aucun Node.js n'est nécessaire sur votre ordinateur.

**Attention :** compilation et fonctionnement dans TinyMCE non encore validés. Faire les essais sur une copie d'une note. Les couleurs peuvent être perdues à l'enregistrement.

Après avoir envoyé tous les fichiers sur GitHub, aller dans **Actions → Compiler le plugin Joplin → Run workflow**. Si la compilation réussit, récupérer l'artefact **pastel-highlighter-jpl** dans le détail de l'exécution, puis extraire le `.jpl` du ZIP téléchargé.
