---
title: "URL class (java.net) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URL.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URL class (java.net) (part 3 of 3)

## URL.setURLStreamHandlerFactory(URLStreamHandlerFactory)

```java
public static void setURLStreamHandlerFactory(URLStreamHandlerFactory fac)
```

Sets an application's `URLStreamHandlerFactory`.
This method can be called at most once in a given Java Virtual
Machine.

 The `URLStreamHandlerFactory` instance is used to
construct a stream protocol handler from a protocol name.

Parameters:

- `fac`: the desired factory.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
            int, java.lang.String)

**See also:** java.net.URLStreamHandlerFactory

Throws:

- `Error`: if the application has already set a factory.
