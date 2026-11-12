# Analyse C# et .NET

Les règles d'analyse que le build fait échouer, chacune avec un exemple faux et un exemple juste,
compilés par les tests de la base avec le SDK .NET 10. La configuration à copier est dans
`templates/csharp/`.

| Fichier | Ce qu'il contient |
| --- | --- |
| `analysis-setup.md` | Les fichiers de configuration, les commandes de formatage et de build, le réglage `StrictFormatting`. |
| `async-rules.md` | Jeton d'annulation transmis, appels asynchrones, tâches attendues, pas d'`async void`. |
| `nullability-rules.md` | Valeurs qui peuvent être nulles, propriétés `required`, aides `ThrowIfNull`. |
| `string-culture-rules.md` | Culture explicite pour lire et écrire les nombres, comparaisons de chaînes. |
| `logging-exception-rules.md` | Messages de journal à gabarit constant, exceptions précises, `throw;`. |
| `collection-disposal-rules.md` | `Any`, `Count` et `Length`, `TryGetValue`, options JSON, champs à libérer. |
| `style-rules.md` | Noms d'interfaces, modificateurs d'accès, accolades, `readonly` ; ce que le formatage corrige seul. |

Les deux commandes : `bash scripts/format-csharp.sh`, puis `dotnet build`. La ligne
`<StrictFormatting>` de `Directory.Build.props` choisit le formateur : `dotnet format` ou CSharpier.
