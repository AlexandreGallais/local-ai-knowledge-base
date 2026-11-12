# Sujet « synoptics » : représenter et nommer les symboles d'un synoptique

Ce dossier donne à l'IA les règles pour dessiner ou coder un symbole de synoptique, et la convention
de nommage des propriétés que suivent aussi les catalogues de symboles.

| Fichier | Ce qu'il contient |
| --- | --- |
| `synoptic-rules.md` | La mise en page d'une vue, la couleur réservée à l'anormal, les états codés par un remplissage et un mot (jamais rouge et vert pour ouvert et fermé), les quatre priorités d'alerte, le clignotement à 1 Hz jusqu'à l'acquittement. |
| `symbol-property-naming.md` | La convention de nommage : camelCase, unité en suffixe tirée d'une liste fermée, booléens en `is`, `has` ou `can`, une énumération par groupe d'états, `commanded` et `actual`, `Setpoint`, les seuils d'alarme d'OPC UA, la position à quatre valeurs des organes de coupure. |
| `symbol-component.md` | Un symbole réutilisable comme fonction pure : entrées typées, attributs `data-*`, couleurs en variables CSS, une seule horloge de clignotement par vue. |

Le gabarit TypeScript du symbole est `templates/typescript-angular/synoptic-symbol.ts`. Le contrôle de
la base refuse, dans les exemples TypeScript de ce dossier, un nombre sans suffixe d'unité de la
liste et un booléen qui ne commence pas par `is`, `has` ou `can`.
