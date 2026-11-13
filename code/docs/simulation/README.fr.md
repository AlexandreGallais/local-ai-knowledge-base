# Sujet « simulation » : comprendre où l'on travaille

Ce dossier explique à l'IA ce qu'est un simulateur d'entraînement, comment il tient le temps, de
quoi il est fait et comment on écrit et teste le modèle d'un équipement.

| Fichier | Ce qu'il contient |
| --- | --- |
| `principles.md` | Les sortes de simulation, le temps simulé, le pas fixe, la stabilité, le déterminisme, la fidélité, la vérification et la validation. |
| `time-management.md` | La boucle de l'ordonnanceur en C# : temps en entiers, trames, dépassement, gel, temps ralenti et accéléré. |
| `simulator-architecture.md` | Les parties d'un simulateur : exécutif, modèles, données partagées, poste instructeur, enregistreur, passerelles. |
| `training-functions.md` | Gel, instantané, restauration, retour arrière, rejeu, scénarios, pannes : ce qu'ils font et ce que les modèles doivent fournir. |
| `real-equipment.md` | Stimulation, émulation, simulation et matériel dans la boucle. |
| `component-models.md` | L'interface d'un modèle d'équipement (paramètres, entrées, sorties, état, pas, sauvegarde) et un gabarit C#. |
| `model-testing.md` | Les tests d'un modèle, dont déterminisme, sauvegarde puis restauration, et gel. |
| `distributed-simulation.md` | HLA, DIS et DDS : ce que chacun apporte et quand l'employer. |
| `co-simulation-fmi-ssp.md` | FMI 3.0, SSP 2.0.1 et la co-simulation. |
| `realtime-deployment.md` | Le temps réel dans des conteneurs et Kubernetes : isoler le cœur cadencé. |
| `web-data-streaming.md` | Alimenter les synoptiques : état réduit à la cadence de l'écran, état complet puis changements. |
| `vocabulary-fr-en.md` | Le terme anglais de chaque terme français de la simulation. |

Le skill `explain-equipment` explique un équipement par son fonctionnement réel, puis par son modèle,
avec les noms de propriétés du catalogue des synoptiques.
