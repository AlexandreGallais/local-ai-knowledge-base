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
| `docs/template.md` | Le patron d'un document de la base : en-tête, sections, exemples faux et justes, sources. |
| `docs/<sujet>/` | Les documents de référence d'un sujet, un document par question. |
| `docs/<sujet>/README.fr.md` | Le résumé en français du sujet, pour l'équipe : chaque fichier en une ligne. |
| `templates/<langage>/` | Des fichiers de code modèles, à copier et adapter. Vide pour l'instant. |
| `scripts/check-base.ts` | Le contrôle de la base, livré avec elle. |

## Les skills de rédaction

| Skill | Ce qu'il fait |
| --- | --- |
| `write-agents-md` | Écrit ou raccourcit `AGENTS.md`. |
| `write-skill` | Écrit un skill au format `SKILL.md`. |
| `write-agent` | Écrit un agent : un skill avec un rôle et un format de réponse. |
| `write-base-document` | Écrit un document de la base à partir de sources fournies, sa ligne d'index, et met à jour le résumé français du sujet. |
| `write-chat-model` | Écrit la consigne de base d'un modèle de chat, pour un sujet. |

## Vérifier la base

- La commande `node scripts/check-base.ts` contrôle toute la base : taille de `AGENTS.md`, format
  des skills et des documents, aucune demande d'aller sur le Web, rien en français pour l'IA.
- Elle demande Node 22.18 ou plus, sans paquet à installer.
- L'IA la lance d'elle-même après chaque changement de la base, et corrige jusqu'à zéro erreur.

## Dans le dépôt de la base, en plus

- `chat/` : le profil pour une interface de chat sans accès aux fichiers. Les consignes de base des
  modèles de chat sont dans `chat/models/` ; le reste sera produit par l'export.
- `adapters/` : ce qu'un logiciel précis exige en plus. Facultatif : la base marche sans.
