# Angular à la version du projet

Ce qui a changé dans Angular de la version 17 à la 22, pour que l'IA écrive du code à la version
du projet, lue dans `package.json`, et non à celle de sa mémoire.

| Fichier | Ce qu'il contient |
| --- | --- |
| `old-to-new.md` | Le tableau « ancienne façon → nouvelle façon », avec la version à partir de laquelle chaque nouveauté vaut, et les commandes de migration. |
| `v22-changes.md` | Angular 22 : versions demandées, OnPush par défaut, ce qui est retiré, les API devenues stables (`@Service`, `resource`, Signal Forms). |

Quand Angular sort une nouvelle version majeure, la procédure `docs/maintenance/update-a-tool.md`
dit comment mettre ces documents à jour, et `node scripts/check-versions.ts <projet>` liste ceux
qui sont en retard sur un projet.
