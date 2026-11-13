# Sujet « synoptics » : représenter, nommer et modéliser les équipements

Ce dossier donne à l'IA les règles pour dessiner ou coder un symbole de synoptique, la convention de
nommage des propriétés, et un catalogue d'équipements : pour chacun, son symbole, son fonctionnement
réel, ses états, les noms de ses propriétés et un modèle simple de simulation.

| Fichier | Ce qu'il contient |
| --- | --- |
| `synoptic-rules.md` | La mise en page d'une vue, la couleur réservée à l'anormal, les états codés par un remplissage et un mot (jamais rouge et vert pour ouvert et fermé), les quatre priorités d'alerte, le clignotement à 1 Hz jusqu'à l'acquittement. |
| `symbol-property-naming.md` | La convention de nommage : camelCase, unité en suffixe tirée d'une liste fermée, booléens en `is`, `has` ou `can`, une énumération par groupe d'états, `commanded` et `actual`, `Setpoint`, les seuils d'alarme d'OPC UA, la position à quatre valeurs des organes de coupure. |
| `symbol-component.md` | Un symbole réutilisable comme fonction pure : entrées typées, attributs `data-*`, couleurs en variables CSS, une seule horloge de clignotement par vue. |
| `fluid-common.md` | Les rôles d'une propriété (paramètre, consigne, mesure, défaut, dérivée), les sept jeux de propriétés communs des équipements de fluides, et le calcul des états d'une vanne et d'une pompe. |
| `fluid-model-laws.md` | Les lois pour animer un synoptique de fluides (coefficient de débit, courbe de pompe, bilan de caisse, perte de charge) et les trois niveaux de détail d'un modèle. |
| `catalog-hydraulics.md` | 14 fiches d'hydraulique : pompes, moteur, vérin, distributeurs, clapets, limiteurs, accumulateur, filtre, réservoir, servovalve, refroidisseur. |
| `catalog-compressed-air.md` | 6 fiches d'air comprimé et les niveaux de pression d'un navire. |
| `catalog-piping-valves.md` | 8 fiches de robinetterie manuelle et automatique : vannes d'isolement, pointeau, clapets, soupapes, détendeur. |
| `catalog-actuated-valves.md` | 7 fiches : vannes motorisée, hydraulique, électrovanne, vanne de régulation, vanne trois voies, filtres, collecteur. |
| `catalog-ship-equipment.md` | 10 fiches d'équipements de bord : pompes, éjecteur, caisse, échangeur, réchauffeur, séparateurs, prise d'eau de mer, purgeur. |
| `catalog-ship-circuits.md` | 5 circuits d'un navire de surface (combustible, huile, refroidissement, assèchement, ballastage) et 4 fiches de sous-marin au niveau d'un manuel public. |
| `catalog-hvac.md` | 7 fiches de ventilation et de climatisation. |
| `index-fr-en-fluids.md` | Le nom anglais de chaque terme français des catalogues de fluides, avec le document qui le décrit. |
| `catalog-electrical-power.md` | 9 fiches électriques : groupe électrogène, alternateur, tableaux principal et de secours, disjoncteur, contacteur, sectionneur, transformateur, convertisseur. |
| `catalog-electrical-loads.md` | 6 fiches : batterie, chargeur, moteur et démarreur, prise de quai, délestage, couplage. |
| `catalog-fire-detection.md` | Les symboles des plans de lutte contre l'incendie (résolution OMI A.952(23)) et 6 fiches de détection : détecteurs, déclencheur manuel, sirène, centrale. |
| `catalog-fire-extinguishing.md` | 5 fiches : extinction au CO2, brouillard d'eau, mousse, sprinkleurs, porte coupe-feu ; le clapet coupe-feu renvoie à la ventilation. |
| `catalog-propulsion.md` | 11 fiches : moteur diesel, turbines, moteur de propulsion, ligne d'arbres, réducteur, hélices, appareil à gouverner, propulseur d'étrave, propulsion d'un sous-marin au niveau public. |
| `catalog-instrumentation.md` | Les lettres de repérage ISA 5.1 et 10 fiches : six transmetteurs, contacts, boucle 4-20 mA, seuils d'alarme, état de diagnostic. |
| `index-fr-en-systems.md` | Le nom anglais de chaque terme français des catalogues électrique, incendie, propulsion et instrumentation. |

Le gabarit TypeScript du symbole est `templates/typescript-angular/synoptic-symbol.ts`. Le contrôle de
la base refuse un nombre sans suffixe d'unité de la liste, un booléen qui ne commence pas par `is`,
`has` ou `can`, une fiche incomplète et une fiche absente de l'index français → anglais.

Manques connus : eau potable, vapeur (sauf le purgeur), ventilation et air d'un sous-marin ; la forme
exacte de chaque symbole reste à vérifier sur les normes achetées par l'équipe.
