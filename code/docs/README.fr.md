# La base documentaire, en bref

Ce fichier est pour les humains de l'équipe. L'IA ne le lit pas : tout ce qu'elle lit est en
anglais.

## À quoi sert la base

- Elle aide une IA de code à travailler mieux sur un projet : des règles, des skills et des
  documents de référence qu'elle lit au bon moment.
- On la copie à la racine d'un projet. L'assistant de code lit alors `AGENTS.md` dès qu'on ouvre le
  projet, sans autre consigne.
- L'IA répond dans la langue de la question : en français si on lui écrit en français, en anglais
  si on lui écrit en anglais. Elle ne mélange jamais les deux.

## Ce que contient chaque dossier

| Chemin | Rôle |
| --- | --- |
| `AGENTS.md` | Le fichier d'entrée, chargé à chaque session : les règles vitales, une ligne par skill pour dire quand le charger, et l'index des documents. |
| `.agents/skills/<nom>/SKILL.md` | Un skill par dossier : une procédure pas à pas que l'IA charge pour une tâche précise. |
| `.agents/skills/<nom>/references/` | Les fiches détaillées d'un skill, une par cas : l'IA n'ouvre que celle dont elle a besoin. |
| `.agents/skills/<nom>/scripts/` | Les scripts d'un skill, en TypeScript, lancés par `node` sans paquet à installer. |
| `.agents/skills/<nom>/chat.md` | Le texte qui remplace, dans la version pour le chat, les étapes où l'IA lance une commande. |
| `.extract/` | Créé dans le projet par le skill `read-heavy-file` : les extraits des fichiers lourds. Git l'ignore. |
| `docs/template.md` | Le patron d'un document de la base : en-tête, sections, exemples faux et justes, sources. |
| `docs/<sujet>/` | Les documents de référence d'un sujet, un document par question. |
| `docs/<sujet>/README.fr.md` | Le résumé en français du sujet, pour l'équipe : chaque fichier en une ligne. |
| `templates/<langage>/` | Des fichiers de code modèles, à copier et adapter. Vide pour l'instant. |
| `scripts/check-base.ts` | Le contrôle de la base, livré avec elle. |

## Les skills

| Skill | Ce qu'il fait |
| --- | --- |
| `read-heavy-file` | Fait lire un fichier lourd par son extrait, jamais tel quel. |
| `write-commit-message` | Écrit un message de commit au format Conventional Commits, qui passe commitlint. |
| `choose-version` | Choisit le prochain numéro de version (SemVer) d'après les commits depuis la dernière version. |
| `name-branch` | Nomme une branche au format Conventional Branch (`feature/…`, `bugfix/…`). |

## Les skills de rédaction

| Skill | Ce qu'il fait |
| --- | --- |
| `write-agents-md` | Écrit ou raccourcit `AGENTS.md`. |
| `write-skill` | Écrit un skill au format `SKILL.md`. |
| `write-agent` | Écrit un agent : un skill avec un rôle et un format de réponse. |
| `write-base-document` | Écrit un document de la base à partir de sources fournies, sa ligne d'index, et met à jour le résumé français du sujet. |
| `write-chat-model` | Écrit la consigne de base d'un modèle de chat : pour un sujet, avec sa base documentaire, ou pour une seule tâche (assistant restreint, qui refuse le reste). |

## Lire les fichiers lourds

- L'IA ne lit jamais tel quel un fichier lourd ou binaire : Word, Excel, PowerPoint, OpenDocument,
  PDF, images, Adobe XD, Sketch, Visio, draw.io, notebooks, archives, e-mails, binaires. La liste
  complète est dans `AGENTS.md`.
- Un fichier texte de plus de 100 Ko ou de plus de 2 000 lignes compte aussi comme lourd.
- Le skill `read-heavy-file` lance d'abord une commande d'extraction, qui écrit un texte court dans
  `.extract/`, puis l'IA ne lit que ce texte, par morceaux de 200 lignes au plus.
- Le script `extract.ts` lit sans rien installer Word, Excel (feuilles, valeurs, formules),
  PowerPoint (diapositives et notes), OpenDocument, Adobe XD (écrans et textes), Sketch, Visio,
  draw.io, les notebooks, la structure d'un gros JSON et la liste d'une archive.
- Pour un PDF, une image ou un vieux fichier Office (`.doc`, `.xls`, `.ppt`), il donne la commande
  à lancer à la place : `pdftotext`, `tesseract` ou `soffice`, si ces outils sont installés.
- Sécurité : le script n'exécute rien de ce qu'il lit, n'écrit rien sur le disque depuis une
  archive, refuse les fichiers chiffrés et limite la taille de ce qu'il décompresse.
- Le script s'essaie à la main sur un fichier :
  `node .agents/skills/read-heavy-file/scripts/extract.ts mon-fichier.xlsx`.

## Vérifier la base

- La commande `node scripts/check-base.ts` contrôle toute la base : taille de `AGENTS.md`, format
  des skills et des documents, aucune demande d'aller sur le Web, rien en français pour l'IA.
- Elle demande Node 22.18 ou plus, sans paquet à installer.
- L'IA la lance d'elle-même après chaque changement de la base, et corrige jusqu'à zéro erreur.

## Dans le dépôt de la base, en plus

- `chat/` : le profil pour une interface de chat sans accès aux fichiers. Les consignes de base des
  modèles de chat sont dans `chat/models/` ; le reste sera produit par l'export.
- `chat/models/commit-assistant.md` : un assistant de commits pour les personnes qui ne sont pas
  développeurs. Il propose le message de commit, explique le type choisi, et refuse tout autre
  sujet en une phrase.
- `adapters/` : ce qu'un logiciel précis exige en plus. Facultatif : la base marche sans.
