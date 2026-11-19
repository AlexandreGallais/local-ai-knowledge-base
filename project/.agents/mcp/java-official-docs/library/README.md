# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [java-se](java-se.index.md) | Java SE API: the java.base and java.net.http modules, from the Javadoc of OpenJDK | 25 | GPL-2.0-only WITH Classpath-exception-2.0 | 1220 files, 11.6 MB |
| [gradle](gradle.index.md) | Gradle User Manual: build scripts, dependencies, tasks, plugins | 9.9 | Apache-2.0 | 342 files, 4.3 MB |
| [maven](maven.index.md) | Maven documentation: the POM, the build lifecycle, dependencies, plugins, guides | 2026-11 | Apache-2.0 | 284 files, 2.1 MB |
| [junit](junit.index.md) | JUnit 6 User Guide: writing tests with JUnit Jupiter (annotations, assertions, assumptions, @ParameterizedTest, @Nested, extensions), running them, migrating from JUnit 4 | 6.1 | EPL-2.0 | 75 files, 0.4 MB |
| [mockito](mockito.index.md) | Mockito: mocking in Java tests (mock, when, verify, argument matchers, spies, captors, BDD style), from the Javadoc of its main classes | 5.24 | MIT | 107 files, 0.4 MB |
| [spring-framework](spring-framework.index.md) | Spring Framework 7 reference: the IoC container and dependency injection, AOP, data access and transactions, Spring MVC and WebFlux, testing, integration | 7.0 | Apache-2.0 | 470 files, 3.1 MB |
| [spring-boot](spring-boot.index.md) | Spring Boot 4 reference: auto-configuration, externalized configuration and properties, profiles, logging, web, data, messaging, actuator, packaging and containers | 4.1 | Apache-2.0 | 191 files, 1.6 MB |
| [hibernate](hibernate.index.md) | Hibernate ORM 7: the introduction, the user guide, the query language (HQL), the integration guide and the dialects | 7.4 | Apache-2.0 | 108 files, 1.7 MB |
| [log4j](log4j.index.md) | Apache Log4j 2: the API, configuration files, appenders, layouts, filters, lookups, performance and the migration from Log4j 1 | 2.26 | Apache-2.0 | 141 files, 1.2 MB |
| [picocli](picocli.index.md) | picocli: command-line applications in Java (options, parameters, subcommands, help, completion, GraalVM native images), its user manual | 4.7 | Apache-2.0 | 3 files, 0.6 MB |
| [quarkus](quarkus.index.md) | Quarkus 3: the guides (REST, CDI, configuration, Hibernate, messaging, security, testing, native executables, containers and Kubernetes) | 3.40 | Apache-2.0 | 319 files, 6.4 MB |
| [javafx](javafx.index.md) | JavaFX 27 API: the javafx.base, javafx.graphics, javafx.controls and javafx.fxml modules (scene graph, controls, layouts, properties and bindings, animation, CSS), from the Javadoc of OpenJFX | 27 | GPL-2.0-only WITH Classpath-exception-2.0 | 701 files, 3.3 MB |
