# Lint TypeScript et Angular

Les règles de lint que l'outil ne corrige pas seul et que les modèles enfreignent le plus. Chaque
règle a un exemple faux et un exemple juste, vérifiés par les tests de la base avec ESLint et le
compilateur. La configuration à copier est dans `templates/typescript-angular/`.

| Fichier | Ce qu'il contient |
| --- | --- |
| `ts-types.md` | `any` et `unknown`, conversions forcées (`as`), `!` après une valeur, erreurs lancées. |
| `ts-null-and-conditions.md` | Accès par index, conditions inutiles, `switch` complet, chaînes de modèle, `??`. |
| `ts-async.md` | Promesses : toujours les traiter, attendre avant de tester, `async` seulement avec `await`. |
| `angular-components-v22.md` | `inject()`, entrées et sorties à signaux, méthodes de cycle de vie, `host`, composants autonomes. |
| `angular-templates-v22.md` | `@if` et `@for`, liaisons de classe, type des boutons, clavier, listes vides. |
| `angular-rxjs.md` | Fin des abonnements avec le composant, flux transformés en signaux. |
| `ts-angular-strict-format.md` | Ordre des membres d'une classe, et ce que la commande de correction range seule. |

Les deux commandes : `npm run fix` corrige tout ce que l'outil sait corriger, puis `npm run check`
liste ce qui reste. `STRICT_FORMAT=0 npm run check` contrôle sans le formatage strict.
