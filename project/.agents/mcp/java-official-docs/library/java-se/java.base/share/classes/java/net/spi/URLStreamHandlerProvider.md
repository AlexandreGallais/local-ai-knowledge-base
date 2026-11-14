---
title: "URLStreamHandlerProvider class (java.net.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/spi/URLStreamHandlerProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLStreamHandlerProvider class (java.net.spi)

```java
public abstract class URLStreamHandlerProvider implements URLStreamHandlerFactory
```

URL stream handler service-provider class.

 A URL stream handler provider is a concrete subclass of this class that
has a zero-argument constructor. URL stream handler providers may be
installed in an instance of the Java platform by adding them to the
application class path.

 A URL stream handler provider identifies itself with a
provider-configuration file named java.net.spi.URLStreamHandlerProvider in
the resource directory META-INF/services. The file should contain a list of
fully-qualified concrete URL stream handler provider class names, one per
line.

 URL stream handler providers are located at runtime, as specified in the
URL constructor.

**Since:** 9

## URLStreamHandlerProvider.URLStreamHandlerProvider()

```java
protected URLStreamHandlerProvider()
```

Initializes a new URL stream handler provider.
