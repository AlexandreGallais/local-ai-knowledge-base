# Tests en C# et .NET

Comment l'IA écrit et lance des tests C# qui vérifient vraiment, avec le lanceur et les bibliothèques
que le projet a déjà.

| Fichier | Ce qu'il contient |
| --- | --- |
| `run-tests.md` | Les deux modes de `dotnet test` (VSTest et Microsoft.Testing.Platform), lus dans `global.json`, les commandes à sortie courte, les codes de sortie. |
| `test-old-to-new.md` | Ce qu'il faut remplacer dans un test écrit à l'ancienne : xUnit v3, MSTest 4, NUnit 4 et 5, FluentAssertions et Verify payants, couverture. |
| `unit-test-rules.md` | Les erreurs des modèles dans les tests et la règle contre chacune, avec un exemple faux et un juste, et les analyseurs qui les attrapent. |
| `integration-tests.md` | Tester une API, une base de données, l'horloge, `HttpClient` et SignalR sans réseau. |
