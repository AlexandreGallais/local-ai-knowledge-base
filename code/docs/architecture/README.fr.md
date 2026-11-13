# Sujet « architecture » : applications .NET et Angular

Ce dossier aide l'IA à conseiller et à revoir l'architecture d'une application .NET et Angular
déployée sur Kubernetes, sans recommander par habitude une bibliothèque devenue payante ou un
patron retiré. Les deux agents `architecture-review` et `code-review` s'appuient dessus.

| Fichier | Ce qu'il contient |
| --- | --- |
| `choose-decomposition.md` | Monolithe modulaire d'abord, service séparé sur besoin constaté ; règles d'un module ; anti-patrons. |
| `structure-dotnet-solution.md` | Couches ou tranches verticales ; CQRS écrit à la main, sans médiateur ; tests d'architecture. |
| `api-contract-openapi.md` | Document OpenAPI généré au build, client Angular généré, versionnement, erreurs normalisées. |
| `real-time-push.md` | SignalR, SSE ou gRPC ; plusieurs réplicas ; format et réglages ; chemin d'une valeur jusqu'au synoptique. |
| `messaging.md` | Quand une file ; boîte d'envoi ; consommateurs idempotents ; licences des bibliothèques de bus. |
| `dotnet-service-patterns.md` | Injection, options, résilience, journaux, télémétrie, santé, données, Aspire. |
| `angular-app-structure.md` | Dossiers par fonctionnalité, composants autonomes, état par portée avec les signaux. |
| `angular-high-frequency-ui.md` | Afficher beaucoup de valeurs qui changent : signaux, OnPush, peu de nœuds, mesurer d'abord. |
| `outdated-libraries-and-patterns.md` | Bibliothèques devenues payantes, patrons .NET et Angular retirés, signes de sur-ingénierie. |
