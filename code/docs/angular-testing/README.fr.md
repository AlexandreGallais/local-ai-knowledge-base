# Tests en Angular et TypeScript

Comment l'IA écrit et lance des tests Angular qui vérifient vraiment, avec le lanceur du projet, et
comment elle teste les classes TypeScript qui animent les symboles des synoptiques.

| Fichier | Ce qu'il contient |
| --- | --- |
| `run-tests.md` | Le lanceur lu dans `angular.json` (Vitest par défaut depuis la 21, ou Karma), les commandes `ng test` d'une seule exécution, les règles ESLint pour les tests. |
| `test-old-to-new.md` | Ce qu'il faut remplacer dans un test écrit à l'ancienne : Jasmine, Karma, `fakeAsync`, `detectChanges`, modules de test HTTP et de routage. |
| `testbed-v22.md` | Le `TestBed` sans zone de la 22 : composant, signaux, HTTP, route, avec un exemple faux et un juste. |
| `svg-class-tests.md` | Tester une classe qui anime du SVG : ce que le DOM simulé ne calcule pas, l'horloge simulée, le vrai navigateur pour la géométrie. |
