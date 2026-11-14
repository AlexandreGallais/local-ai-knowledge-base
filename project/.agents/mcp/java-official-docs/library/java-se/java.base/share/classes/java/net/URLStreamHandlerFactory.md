---
title: "URLStreamHandlerFactory interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLStreamHandlerFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLStreamHandlerFactory interface (java.net)

```java
public interface URLStreamHandlerFactory
```

This interface defines a factory for `URL` stream
protocol handlers.

 A URL stream handler factory is used as specified in the
URL constructor.

**See also:** java.net.URL

**See also:** java.net.URLStreamHandler

**Since:** 1.0

## URLStreamHandlerFactory.createURLStreamHandler(String)

```java
URLStreamHandler createURLStreamHandler(String protocol)
```

Creates a new `URLStreamHandler` instance with the specified
protocol.

Parameters:

- `protocol`: the protocol ("`ftp`", "`http`", "`nntp`", etc.).

**Returns:** a `URLStreamHandler` for the specific protocol, or `null` if this factory cannot create a handler for the specific
         protocol

**See also:** java.net.URLStreamHandler
