# SEED: stack-java  (STK-03, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-java
description: "Builds, tests and debugs Java projects with Maven or Gradle through the internal mirror - JUnit, JVM options, remote debugging. Use when working in a project with pom.xml or build.gradle, running mvn or gradle, fixing javac errors, or running JUnit tests."
metadata:
  id: STK-03
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed JDK, Maven and Gradle (wrapper) versions.
- [ ] Build and test commands; one test class or method.
- [ ] Mirror settings for Maven (settings.xml) and Gradle (init script or repositories).
- [ ] Offline mode once dependencies are cached.
- [ ] JVM options and remote debugging (jdwp).

## Known pitfalls to confirm or drop

- Using system gradle instead of ./gradlew.
- JUnit 4 and JUnit Jupiter mixed without the vintage engine.
- Maven Surefire not picking up tests because of naming.

## MCP servers and example queries

- java-official-docs: mvn -Dtest=, gradle test --tests, surefire, jdwp
