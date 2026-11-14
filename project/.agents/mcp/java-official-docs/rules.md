# Official documentation of the Java API

1. When your memory of a Java API is not sure, look it up with the `java-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds the Java SE API of the `java.base` module (`java.lang`, `java.util`, `java.io`, `java.nio`, `java.time`, `java.math`, `java.net`, `java.text`, `java.security`) and of `java.net.http`, at Java 25.
3. Search a class by its name, as `HashMap`, and a method as `HashMap put`. A method that inherits its documentation is documented in its interface: search the interface.
4. Read one section at a time. Never read the folder `.agents/mcp/java-official-docs/library/` by hand.
5. Trust the documentation more than your memory. Check the Java version of the project (`pom.xml`, `build.gradle`) before you use a new API.
