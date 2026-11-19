# Third-party notices

The code of this brick (its `.ts` and `.py` files) is under the MIT License of the base. The folder `library/` holds
official documentation of other projects, each under its own license, listed below, with the commit
it was taken at. The license files of each source, copied unchanged at its commit with their
copyright notices, are in `licenses/<tool>/`.

## java-se

- Work: Java SE API: the java.base and java.net.http modules, from the Javadoc of OpenJDK
- Authors: Oracle and/or its affiliates, and the OpenJDK contributors
- Copyright: as stated in the license text, by Oracle and/or its affiliates, and the OpenJDK contributors
- Source: <https://github.com/openjdk/jdk>, jdk-25-ga, commit 6c48f4ed707bf0b15f9b6098de30db8aae6fa40f
- License: GPL-2.0-only WITH Classpath-exception-2.0, <https://openjdk.org/legal/gplv2+ce.html>
- License text: [licenses/java-se/LICENSE](licenses/java-se/LICENSE)
- Terms: Copyleft: these files hold the Javadoc comments of the OpenJDK source code and stay under the GNU General Public License version 2 with the Classpath exception, apart from the MIT License of the rest of the base.
- Changes: the documentation comments are taken from the source files, unchanged, with the declarations they document; the code itself is left out.

## gradle

- Work: Gradle User Manual: build scripts, dependencies, tasks, plugins
- Authors: Gradle Inc. and the Gradle contributors
- Copyright: as stated in the license text, by Gradle Inc. and the Gradle contributors
- Source: <https://github.com/gradle/gradle>, v9.9.1, commit 47a96e4ed1822d6aa7fa32bed4461208e69077a6
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/gradle/LICENSE](licenses/gradle/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## maven

- Work: Maven documentation: the POM, the build lifecycle, dependencies, plugins, guides
- Authors: The Apache Software Foundation
- Copyright: as stated in the license text, by The Apache Software Foundation
- Source: <https://github.com/apache/maven-site>, master, commit 6a1033235afef25747dc2729ff5fed1224f89ebd
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/maven/LICENSE](licenses/maven/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## junit

- Work: JUnit 6 User Guide: writing tests with JUnit Jupiter (annotations, assertions, assumptions, @ParameterizedTest, @Nested, extensions), running them, migrating from JUnit 4
- Authors: The JUnit Team
- Copyright: as stated in the license text, by The JUnit Team
- Source: <https://github.com/junit-team/junit-framework>, r6.1.3, commit f59f60d2cebdf2224235d81f781b1f310cbc8138
- License: EPL-2.0
- License text: [licenses/junit/LICENSE.md](licenses/junit/LICENSE.md), [licenses/junit/NOTICE.md](licenses/junit/NOTICE.md)
- Changes: none; the files are copied as they are in the source, at the commit above.

## mockito

- Work: Mockito: mocking in Java tests (mock, when, verify, argument matchers, spies, captors, BDD style), from the Javadoc of its main classes
- Authors: The Mockito contributors
- Copyright: `Copyright (c) 2007 Mockito contributors`
- Source: <https://github.com/mockito/mockito>, v5.24.0, commit 5a2f0f81cdafc9b34ddb4520db7f8866c787dac0
- License: MIT, <https://opensource.org/license/mit>
- License text: [licenses/mockito/LICENSE](licenses/mockito/LICENSE)
- Changes: the documentation comments are taken from the source files, unchanged, with the declarations they document; the code itself is left out.

## spring-framework

- Work: Spring Framework 7 reference: the IoC container and dependency injection, AOP, data access and transactions, Spring MVC and WebFlux, testing, integration
- Authors: Broadcom Inc. and the Spring Framework contributors
- Copyright: as stated in the license text, by Broadcom Inc. and the Spring Framework contributors
- Source: <https://github.com/spring-projects/spring-framework>, v7.0.10, commit 33a85b0bec67adb759aa898e3b80d603786be082
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/spring-framework/LICENSE.txt](licenses/spring-framework/LICENSE.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## spring-boot

- Work: Spring Boot 4 reference: auto-configuration, externalized configuration and properties, profiles, logging, web, data, messaging, actuator, packaging and containers
- Authors: Broadcom Inc. and the Spring Boot contributors
- Copyright: as stated in the license text, by Broadcom Inc. and the Spring Boot contributors
- Source: <https://github.com/spring-projects/spring-boot>, v4.1.2, commit 634e6fd6bc2e475d745c0bdceb8e775864f7f2ec
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/spring-boot/LICENSE.txt](licenses/spring-boot/LICENSE.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## hibernate

- Work: Hibernate ORM 7: the introduction, the user guide, the query language (HQL), the integration guide and the dialects
- Authors: Red Hat, Inc. and the Hibernate contributors
- Copyright: as stated in the license text, by Red Hat, Inc. and the Hibernate contributors
- Source: <https://github.com/hibernate/hibernate-orm>, 7.4.16, commit 701bb334a8796bb7236029b11e4ba4ac0a3ede8e
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/hibernate/LICENSE.txt](licenses/hibernate/LICENSE.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## log4j

- Work: Apache Log4j 2: the API, configuration files, appenders, layouts, filters, lookups, performance and the migration from Log4j 1
- Authors: The Apache Software Foundation
- Copyright: `Copyright 1999-2005 The Apache Software Foundation`
- Copyright: `Copyright 1999-2024 Apache Software Foundation`
- Copyright: `Copyright 2005-2006 Tim Fennell`
- Copyright: `Copyright 2004 Jason Paul Kitchen`
- Copyright: `Copyright 2002-2012 Ramnivas Laddad, Juergen Hoeller, Chris Beams`
- Copyright: `Copyright 2017 Remko Popma`
- Copyright: `Copyright 2011 LMAX Ltd.`
- Source: <https://github.com/apache/logging-log4j2>, rel/2.26.1, commit dd0f9d255e24e6bcc13bd2641407a409c0524803
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/log4j/LICENSE.txt](licenses/log4j/LICENSE.txt), [licenses/log4j/NOTICE.txt](licenses/log4j/NOTICE.txt)
- Changes: none; the files are copied as they are in the source, at the commit above.

## picocli

- Work: picocli: command-line applications in Java (options, parameters, subcommands, help, completion, GraalVM native images), its user manual
- Authors: Remko Popma and the picocli contributors
- Copyright: as stated in the license text, by Remko Popma and the picocli contributors
- Source: <https://github.com/remkop/picocli>, v4.7.7, commit 5fcd4415a2cf834a12b4cb1e262a007beaa6b4af
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/picocli/LICENSE](licenses/picocli/LICENSE), [licenses/picocli/NOTICE-DOCS](licenses/picocli/NOTICE-DOCS)
- Changes: none; the files are copied as they are in the source, at the commit above.

## quarkus

- Work: Quarkus 3: the guides (REST, CDI, configuration, Hibernate, messaging, security, testing, native executables, containers and Kubernetes)
- Authors: Red Hat, Inc. and the Quarkus contributors
- Copyright: as stated in the license text, by Red Hat, Inc. and the Quarkus contributors
- Source: <https://github.com/quarkusio/quarkus>, 3.40.1, commit 6ce99878508d792f3c2a2a7f9520b086a1c32cab
- License: Apache-2.0, <https://www.apache.org/licenses/LICENSE-2.0>
- License text: [licenses/quarkus/LICENSE](licenses/quarkus/LICENSE)
- Changes: none; the files are copied as they are in the source, at the commit above.

## javafx

- Work: JavaFX 27 API: the javafx.base, javafx.graphics, javafx.controls and javafx.fxml modules (scene graph, controls, layouts, properties and bindings, animation, CSS), from the Javadoc of OpenJFX
- Authors: Oracle and/or its affiliates, and the OpenJFX contributors
- Copyright: as stated in the license text, by Oracle and/or its affiliates, and the OpenJFX contributors
- Source: <https://github.com/openjdk/jfx>, 27-ga, commit e77ca96ebc30a05356082cd56e19bcadccf7dcae
- License: GPL-2.0-only WITH Classpath-exception-2.0, <https://openjdk.org/legal/gplv2+ce.html>
- License text: [licenses/javafx/LICENSE](licenses/javafx/LICENSE)
- Terms: Copyleft: these files hold the Javadoc comments of the OpenJDK source code and stay under the GNU General Public License version 2 with the Classpath exception, apart from the MIT License of the rest of the base.
- Changes: the documentation comments are taken from the source files, unchanged, with the declarations they document; the code itself is left out.
