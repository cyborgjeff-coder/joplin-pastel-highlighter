# Pastel Highlighter — Plugin pour Joplin

**Pastel Highlighter** est un plugin pour [Joplin](https://joplinapp.org/) qui permet de surligner facilement du texte avec une palette de couleurs pastel, directement depuis l'éditeur visuel (Rich Text Editor).

Développé et testé avec **Joplin 3.7.21**, il propose une alternative plus douce aux couleurs de surlignage traditionnelles.

## Fonctionnalités

- **Surlignage rapide** : un bouton dans la barre d'outils permet d'appliquer immédiatement la dernière couleur sélectionnée.
- **Palette de couleurs** : un second bouton ouvre un sélecteur proposant six couleurs pastel : jaune, vert, rose, bleu, lavande et pêche.
- **Suppression du surlignage** : une option permet de retirer le surlignage d'un passage sans effacer le texte ni ses autres mises en forme.
- **Menu Outils → Surligner** : les différentes couleurs et l'option de suppression sont également accessibles depuis un sous-menu dédié.

La couleur choisie est mémorisée pendant la session de Joplin. Au redémarrage, le vert pastel redevient la couleur par défaut.

## Installation dans Joplin

1. Téléchargez le fichier `.jpl` depuis les versions publiées du projet ou depuis les artefacts de compilation GitHub Actions.
2. Ouvrez **Joplin** sur votre ordinateur.
3. Accédez à **Outils → Options → Plugins** (ou **Joplin → Préférences → Plugins** sur macOS).
4. Cliquez sur l'icône permettant d'installer un plugin depuis un fichier.
5. Sélectionnez le fichier `.jpl` téléchargé.
6. Redémarrez Joplin si nécessaire.

Les deux boutons du plugin apparaissent dans la barre d'outils de l'éditeur. Sélectionnez du texte, puis cliquez sur le surligneur pour appliquer une couleur ou sur la palette pour en choisir une autre.

## Compilation depuis GitHub

Le projet utilise **GitHub Actions** pour compiler et empaqueter le plugin. Aucune installation de Node.js n'est nécessaire sur votre ordinateur.

Pour générer le fichier `.jpl` :

1. Ouvrez l'onglet **Actions** du dépôt GitHub.
2. Sélectionnez **Compiler le plugin Joplin**.
3. Cliquez sur **Run workflow**.
4. Une fois la compilation terminée, téléchargez l'artefact **pastel-highlighter-jpl**.
5. Extrayez le fichier `.jpl` de l'archive ZIP obtenue.

Ce fichier peut ensuite être installé directement dans Joplin.

## Compatibilité

Le plugin a été développé et testé avec **Joplin 3.7.21**, dans son éditeur visuel.

Le fonctionnement des commandes de surlignage et de suppression a été validé sur ordinateur. La conservation des couleurs lors de la synchronisation entre plusieurs ordinateurs, ainsi que leur affichage sur Android et iPad, restent à vérifier.

## Développement

**Pastel Highlighter** est un petit projet personnel, né du souhait de retrouver dans Joplin un outil de surlignage simple et agréable à utiliser.

Le plugin a été **développé avec l'aide de ChatGPT (OpenAI)**, notamment pour l'écriture du code, l'intégration à Joplin, la compilation via GitHub Actions et les différentes phases de correction et de test.
