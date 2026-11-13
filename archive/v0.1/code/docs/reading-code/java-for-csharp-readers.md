---
id: reading-code-java-for-csharp-readers
title: Java for C# readers
topic: reading-code
summary: Erased generics, checked exceptions, records, sealed types, streams and annotations in Java, with C# equivalents. Java 25.
tool: java
version: "25"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7]
license: MIT (own words and own examples; facts summarized from the sources)
variant: files
---

# Java for C# readers

Contents: 1. Close to C#, different underneath · 2. Recent syntax · 3. Pitfalls · Sources

Kind: "same meaning" reads as in C#; "false friend" looks like C# but means something else; "no equivalent" has no C# counterpart. Java shares the C syntax family, objects, strong typing, a garbage collector, `try`/`catch`/`finally` and `var` with C#. [S1] The language changes read go up to Java 25. [S3]

## 1. Close to C#, different underneath (Java)

| You read | Meaning | C# equivalent | Kind |
| --- | --- | --- | --- |
| `List<String>` | Generic erased at run time: no `new T()`, no `instanceof List<String>`, no primitive type argument (`List<Integer>`, never `List<int>`), no overloads that differ only by type argument [S2] | C# generics keep their type at run time; TypeScript types are erased too | false friend |
| `void f() throws IOException` | Checked exception: the caller must catch it or declare it [S1] | None: any C# method may throw any exception [S1] | no equivalent |
| `a == b` on two `String` | Compares references, not content [S7] | `==` on `string` compares content in C# | false friend |
| `final` | Constant or variable that cannot be reassigned [S1] | `const`, `readonly` | same meaning |
| `getName()`, `setName(…)` | A property by naming convention [S1] | Property `Name { get; set; }` [S1] | same meaning |
| `list.stream().filter(…).map(…).toList()` | Stream: nothing runs before the terminal operation; a stream is traversed once only [S4] | LINQ `Where`, `Select`, `ToList` [S1] | same meaning |
| `Optional<T>` and `.orElse(x)` | Value or absence [S1] | `??` [S1] | same meaning |
| `@Override`, `@Deprecated` | Annotations; `@Override` makes the compiler check the override [S1] [S5] | `override`, `[Obsolete]` | same meaning |
| `@Retention(RetentionPolicy.RUNTIME)` | The annotation stays readable at run time; by default the JVM does not see it [S5] | — | no equivalent |

## 2. Recent syntax (Java 15 to 25)

| You read | Meaning | C# equivalent | Kind |
| --- | --- | --- | --- |
| `record Point(int x, int y) {}` | Record, final since Java 16 [S3] | `record` [S1] | same meaning |
| `sealed interface S permits A, B` | Closed hierarchy, since Java 17 [S3] | No direct equivalent | no equivalent |
| `switch (o) { case Circle c -> … }` | Pattern matching in `switch`, since Java 21 [S3] | `switch` expression with patterns | same meaning |
| `"""…"""` | Text block, since Java 15 [S3] | Raw string `"""` | same meaning |
| `_` as a name | Unnamed variable, since Java 22 [S3] | Discard `_` | same meaning |
| `import module java.base;` | Import of a whole module, since Java 25 [S3] | — | no equivalent |

## 3. Pitfalls (reading Java)

- An annotation can make a framework create objects, methods or proxies that are not in the file: see `docs/reading-code/java-framework-idioms.md`.
- The Java version is in the build file: `maven.compiler.release` in `pom.xml` (`docs/reading-code/build-maven-gradle-cargo.md`).
- The Java SE documentation cannot be copied into a public base: describe in own words. [S6]

## Sources

- [S1] Microsoft, "Tips for Java developers", 2026, <https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-java-developers>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Oracle, "Restrictions on Generics", The Java Tutorials, <https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html>, read 2026-11-12, all rights reserved, summarized in own words.
- [S3] Oracle, "Java Language Changes", Java SE 25, <https://docs.oracle.com/en/java/javase/25/language/java-language-changes-release.html>, read 2026-11-12, all rights reserved, summarized in own words.
- [S4] Oracle, "Package java.util.stream", Java SE 25 API, <https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/package-summary.html>, read 2026-11-12, all rights reserved, summarized in own words.
- [S5] Oracle, "Predefined Annotation Types", The Java Tutorials, <https://docs.oracle.com/javase/tutorial/java/annotations/predefined.html>, read 2026-11-12, all rights reserved, summarized in own words.
- [S6] Oracle, "JSR-000384 Java SE 11 Final Release", specification license, <https://www.oracle.com/a/tech/docs/java-se-11-final-spec-license.html>, read 2026-11-12, summarized.
- [S7] Du, Schantong, Siegmund, "Knowledge Transfer and False Friends: Insights on Transitioning from C to Java", Chemnitz University of Technology, <https://tu-chemnitz.de/informatik/ST/publications/papers/Transfer.pdf>, read 2026-11-12, summarized.
