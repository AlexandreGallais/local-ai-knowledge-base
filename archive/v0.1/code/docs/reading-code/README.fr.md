# Sujet « reading-code » : lire du C, du C++, du Java et du Rust

Ce dossier aide l'IA à expliquer un extrait de C, C++, Java ou Rust à un développeur C# et
TypeScript. Chaque guide de langage classe chaque construction en « même sens », « faux ami » ou
« sans équivalent », les faux amis d'abord. Ces langages se lisent, ils ne s'écrivent pas.

| Fichier | Ce qu'il contient |
| --- | --- |
| `c-for-csharp-readers.md` | Le C pour un lecteur C# : pointeurs, tableaux, mémoire manuelle, en-têtes, macros, comportement indéfini. |
| `c-embedded-idioms.md` | Les idiomes du code embarqué : champs de bits, `volatile`, virgule fixe, registres, interruptions. |
| `cpp-for-csharp-readers.md` | Le C++ : RAII, pointeurs intelligents, déplacement, modèles, surcharges. |
| `cpp-version-markers.md` | Les marqueurs de syntaxe qui datent un extrait C++, de C++11 à C++23. |
| `java-for-csharp-readers.md` | Le Java : génériques effacés, exceptions vérifiées, records, types scellés, flux, annotations. |
| `java-framework-idioms.md` | Ce que font sans se voir les annotations de Spring et de Lombok. |
| `rust-for-csharp-readers.md` | Le Rust : possession, emprunt, durées de vie, traits, `Option`, `Result` et `?`. |
| `rust-macros-unsafe-async.md` | Les macros, `unsafe`, l'asynchrone et les registres en Rust embarqué. |
| `build-cmake-make.md` | Ce que disent un `CMakeLists.txt` et un `Makefile`. |
| `build-maven-gradle-cargo.md` | Ce que disent un `pom.xml`, un `build.gradle` et un `Cargo.toml`. |

Le skill `explain-code` suit une méthode : repérer le langage et sa version, lister ce que l'extrait
utilise sans le définir, développer macros et code généré, lire le code avant les noms, et vérifier
que chaque nom cité existe dans l'extrait.
