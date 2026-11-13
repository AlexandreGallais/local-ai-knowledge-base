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
| `AGENTS.md` | Le fichier d'entrée, chargé à chaque session : les règles vitales, une ligne par skill pour dire quand le charger, et la carte des sujets (une ligne par sujet). |
| `.agents/skills/<nom>/SKILL.md` | Un skill par dossier : une procédure pas à pas que l'IA charge pour une tâche précise. |
| `.agents/skills/<nom>/references/` | Les fiches détaillées d'un skill, une par cas : l'IA n'ouvre que celle dont elle a besoin. |
| `.agents/skills/<nom>/scripts/` | Les scripts d'un skill, en TypeScript, lancés par `node` sans paquet à installer. |
| `.agents/skills/<nom>/chat.md` | Le texte qui remplace, dans la version pour le chat, les étapes où l'IA lance une commande. |
| `.extract/` | Créé dans le projet par le skill `read-heavy-file` : les extraits des fichiers lourds. Git l'ignore. |
| `docs/template.md` | Le patron d'un document de la base : en-tête, sections, exemples faux et justes, sources. |
| `docs/<sujet>/` | Les documents de référence d'un sujet, un document par question. |
| `docs/<sujet>/index.md` | L'index du sujet, lu par l'IA : une ligne par document, avec son résumé. L'IA lit la carte d'`AGENTS.md`, puis l'index du sujet, puis seulement les documents utiles. |
| `docs/<sujet>/README.fr.md` | Le résumé en français du sujet, pour l'équipe : chaque fichier en une ligne. |
| `templates/<langage>/` | Des fichiers modèles, à copier et adapter. `templates/typescript-angular/` : la configuration ESLint, Prettier et `tsconfig` stricte d'un projet Angular 22, et les scripts `fix` et `check` à fusionner dans `package.json`. `templates/containers/` : `Dockerfile` .NET et Angular, dev container, Deployment et Service, réglages de hadolint. |
| `scripts/check-base.ts` | Le contrôle de la base, livré avec elle. |

## Les skills

| Skill | Ce qu'il fait |
| --- | --- |
| `analyze-csharp` | Écrit du C# conforme à l'analyse, puis lance le formatage et `dotnet build` jusqu'à zéro erreur. |
| `architecture-review` | Un agent qui revoit l'architecture d'une application .NET et Angular : il part des objectifs de qualité, liste les risques avec leur preuve et la plus petite correction, et ne change aucun fichier. |
| `code-review` | Un agent qui revoit une modification de code : ce que le lint ne voit pas, avec le fichier, la ligne et la correction, sans changer de fichier. |
| `explain-code` | Explique un extrait de C, C++, Java ou Rust, ou un fichier de build, à un développeur C# : ce que fait le code, pas à pas, les équivalents C#, les faux amis et ce que l'extrait ne permet pas de savoir. |
| `explain-equipment` | Un agent écrit comme un skill : il explique un équipement du bord par son fonctionnement réel, puis par son modèle, avec les noms de propriétés du catalogue. |
| `check-container-change` | Contrôle un `Dockerfile`, un `devcontainer.json`, un manifeste Kubernetes, un chart Helm ou une surcouche Kustomize avec l'outil de son type (hadolint, kubeconform, KubeLinter, `helm lint`), et dit ce qui n'a pas pu être contrôlé. |
| `look-up-api` | Cherche la signature exacte d'une API dans la doc installée avec le projet (types `.d.ts`, XML de .NET, `--help`), par recherche ciblée, sans lire de gros fichier. |
| `lint-typescript` | Écrit du TypeScript et de l'Angular conformes au lint, puis lance `npm run fix`, `npm run check` et `npm run build` jusqu'à zéro erreur. |
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

## Les sujets

| Dossier | Ce qu'il contient |
| --- | --- |
| `docs/angular/` | Ce qui a changé dans Angular de la 17 à la 22, pour écrire du code à la version du projet. |
| `docs/typescript/` | Ce qui a changé dans TypeScript (5.0 à 7.0), RxJS 7 et Node.js (22 à 26). |
| `docs/dotnet/` | Ce qui a changé dans C#, .NET, ASP.NET Core et EF Core de la 6 à la 11, et les bibliothèques devenues payantes. |
| `docs/containers/` | Les règles d'un `Dockerfile`, les images .NET et Angular, Podman, les dev containers et les problèmes de conteneur. |
| `docs/kubernetes/` | Les manifestes Kubernetes, les `apiVersion`, les sondes, les ressources et le temps réel, le déploiement, le contrôle sans cluster et le dépannage d'un Pod. |
| `docs/architecture/` | L'architecture d'une application .NET et Angular : découpage, contrat d'API, temps réel, messagerie, patrons .NET et Angular, bibliothèques et patrons dépassés, et les deux listes de revue. |
| `docs/reading-code/` | Lire du C, du C++, du Java et du Rust quand on connaît C# : un guide par langage, les idiomes de l'embarqué et les fichiers de build. |
| `docs/simulation/` | Les principes d'un simulateur d'entraînement, le temps et l'ordonnanceur, l'architecture, les fonctions d'entraînement (gel, instantané, rejeu, pannes), l'interface et les tests d'un modèle, HLA, DIS, DDS, FMI, le déploiement temps réel et la diffusion vers les synoptiques. |
| `docs/synoptics/` | Les règles pour représenter un équipement sur un synoptique, la convention de nommage des propriétés des symboles, la structure d'un composant symbole (gabarit `templates/typescript-angular/synoptic-symbol.ts`), et le catalogue des équipements de fluides avec son index français → anglais. |
| `docs/maintenance/` | La procédure pour mettre à jour les documents d'un outil qui change de version. |
| `docs/csharp-analysis/` | Les règles d'analyse C# que le build fait échouer, chacune avec un exemple faux et un juste. |
| `docs/typescript-lint/` | Les règles de lint TypeScript et Angular que l'outil ne corrige pas seul, chacune avec un exemple faux et un juste. |

## Écrire à la version du projet

- Avant d'écrire du code Angular, l'IA lit la version de `@angular/core` et de `typescript` dans
  `package.json`, et n'applique que les nouveautés de ces versions ou d'avant.
- `node scripts/check-versions.ts <dossier du projet>` liste les documents de la base en retard sur
  les versions d'un projet ; `docs/maintenance/update-a-tool.md` dit comment les mettre à jour.

## Lint TypeScript et Angular

- Copier dans le projet les fichiers de `templates/typescript-angular/`, fusionner
  `package.fragment.json` dans `package.json`, puis `npm install`.
- `npm run fix` corrige tout ce que l'outil sait corriger ; `npm run check` liste ce qui reste ;
  `npm run build` vérifie les types et les gabarits.
- Le formatage strict (ordre des imports, accolades, lignes vides) est actif par défaut ;
  `STRICT_FORMAT=0 npm run check` le coupe.
- Un commentaire `eslint-disable` n'a aucun effet : il faut corriger le code.

## Analyse C# et .NET

- Copier à la racine du projet .NET `Directory.Build.props` et `.editorconfig` de
  `templates/csharp/`, et `format-csharp.sh` dans son dossier `scripts/`.
- `bash scripts/format-csharp.sh` formate ; `dotnet build` lance l'analyse : chaque avertissement
  devient une erreur.
- La ligne `<StrictFormatting>true</StrictFormatting>` de `Directory.Build.props` passe au
  formatage strict avec CSharpier (à installer une fois : `dotnet tool install csharpier`).

## Conteneurs et dev container

- L'assistant de code tourne dans le dev container : il est installé dans son image, avec les outils
  de contrôle. Les commandes d'`AGENTS.md` sont donc celles d'un terminal ordinaire.
- Copier `templates/containers/devcontainer/` en `.devcontainer/` à la racine du projet ; mettre une
  fois dans `tools/` les binaires Linux de hadolint, kubeconform, kube-linter et helm, et dans
  `kubernetes-schemas/` les schémas JSON de la version du cluster ; donner le paquet npm de
  l'assistant dans `ASSISTANT_PACKAGE`.
- L'image installe aussi Poppler (`pdftotext`) et Tesseract (OCR en anglais et en français) pour
  lire les PDF et les images. Si le poste ne peut pas installer de paquets `apt`, mettre
  `EXTRACT_TOOLS` à `"false"` dans `devcontainer.json`.
- Ce qu'utilise le cluster de l'équipe (version, Ingress ou Gateway API, Helm ou Kustomize, dossier
  des schémas) s'écrit dans l'`AGENTS.md` du projet, pas dans la base.

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

## Amener la base sur un poste

- Dans le dépôt de la base, `node scripts/export.ts` écrit dans `export/` le fichier `import.ts`
  et quelques fichiers texte `base-1.txt`, `base-2.txt`… de 500 Ko au plus chacun (`--max-kb`
  change la limite).
- Sur le poste, on colle `import.ts` puis chaque partie dans un fichier du même nom, et on lance
  `node import.ts`. Le script vérifie chaque partie, dit laquelle a été abîmée par le collage, et
  n'écrit rien tant qu'elles ne sont pas toutes justes.
- `node import.ts --project` n'écrit que ce qu'il faut à la racine d'un projet : `AGENTS.md`,
  `.agents/`, `docs/`, `templates/`, les scripts de contrôle et les adaptateurs d'OpenCode.
- `--opencode 2` (ou `1` pour OpenCode 1.x) écrit en plus `opencode.json` à la racine : la lecture
  directe des fichiers lourds y est refusée, et les trois agents y sont déclarés.
- `node scripts/export.ts --trial` ajoute à l'export le matériel des essais sur le poste :
  le dossier `trials/` (guides d'essai), les projets exemples et le jeu d'évaluation. Le dossier
  `export/` du dépôt contient l'export de la dernière livraison.
- L'export produit aussi la version pour le chat : chaque skill sans ses étapes qui lancent des
  commandes, et les documents de chaque sujet, sans les résumés en français.

## La doc officielle (`library/`)

- `library/` contient la doc officielle complète des outils, en Markdown simple, à une version
  notée : TypeScript, Angular, ESLint et ses greffons, RxJS, MDN sur SVG, `DOMMatrix` et Web
  Animations, Dev Containers, Node.js, C#, .NET, ASP.NET Core, EF Core, Kubernetes, Docker, Podman
  et le livre de Rust. Environ 90 Mo, en fichiers de 16 Ko au plus.
- Chaque outil a son index, `library/<outil>/index.md`, une ligne par fichier. L'index est long :
  on y cherche avec grep, on ne le lit jamais en entier.
- Chaque fichier garde sa source, son commit et sa licence dans son en-tête ; la licence MIT de la
  base ne s'applique pas à ce dossier (`THIRD_PARTY_NOTICES.md`).
- `node scripts/fetch-library.ts` la reconstruit depuis les dépôts de doc (`library/sources.json`),
  `node scripts/check-library.ts` la contrôle.

## Dans le dépôt de la base, en plus

- `chat/` : le profil pour une interface de chat sans accès aux fichiers. Les consignes de base des
  modèles de chat sont dans `chat/models/` ; le reste est produit par l'export.
- `trials/README.md` : la séance d'essais sur le poste, dans l'ordre, avec les faits à relever d'abord
  (versions d'OpenCode et d'Open WebUI, fenêtre de contexte, appel d'outils).
- `research/` : les rapports de recherche d'où viennent les documents. Son `.gitignore` les garde
  hors de Git : ils ne sont jamais publiés.
- `chat/models/commit-assistant.md` : un assistant de commits pour les personnes qui ne sont pas
  développeurs. Il propose le message de commit, explique le type choisi, et refuse tout autre
  sujet en une phrase.
- `chat/models/` contient aussi quatre modèles par sujet : TypeScript et Angular, C# et .NET,
  conteneurs et Kubernetes, simulation et naval. Chacun cherche d'abord dans sa base documentaire
  et cite les documents utilisés sur une ligne `Sources:`.
- `adapters/` : ce qu'un logiciel précis exige en plus. Facultatif : la base marche sans.
- `adapters/opencode/v1/` et `v2/` : la configuration d'OpenCode pour ses versions 1.x et 2.x.
  Elle refuse la lecture directe des fichiers lourds et déclare les agents `architecture-review`,
  `code-review` et `explain-equipment`, qui ne modifient aucun fichier.
- `adapters/mcp/docs-server.ts` : un serveur de documentation en un seul fichier, sans paquet, à
  l'essai. Il cherche dans les index (`search_docs`) et rend une seule section d'un document
  (`read_doc`). Il est coupé par défaut ; on ne le garde que s'il fait au moins aussi bien que les
  fichiers seuls, sans plus de tokens.
- `scripts/check-public.ts` : avant de rendre le dépôt public, il vérifie qu'il ne contient que la
  base (ni `spec/`, ni rapport de recherche) et aucun terme d'une liste privée, dans les fichiers
  comme dans l'historique ; la liste reste hors du dépôt.
- `evaluation/` : le jeu de tâches et le protocole pour mesurer si l'IA réussit mieux avec la base
  que sans, sans plus de tokens ; `scripts/evaluation-summary.ts` en fait le bilan.
- `adapters/open-webui/push.ts` : sur le poste, après l'import, il crée ou met à jour dans Open WebUI
  les bases documentaires, les skills et les cinq modèles, lisibles par le groupe de l'équipe, sans
  aucun clic. L'adresse, le jeton, le modèle de base et le groupe se lisent dans l'environnement ;
  `--dry-run` montre ce qu'il ferait sans rien envoyer.
