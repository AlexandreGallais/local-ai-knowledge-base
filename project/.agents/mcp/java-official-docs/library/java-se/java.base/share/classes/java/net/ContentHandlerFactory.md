---
title: "ContentHandlerFactory interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ContentHandlerFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ContentHandlerFactory interface (java.net)

```java
public interface ContentHandlerFactory
```

This interface defines a factory for content handlers. An
implementation of this interface should map a MIME type into an
instance of `ContentHandler`.

This interface is used by the `URLStreamHandler` class
to create a `ContentHandler` for a MIME type.

**See also:** java.net.ContentHandler

**See also:** java.net.URLStreamHandler

**Since:** 1.0

## ContentHandlerFactory.createContentHandler(String)

```java
ContentHandler createContentHandler(String mimetype)
```

Creates a new `ContentHandler` to read an object from
a `URLStreamHandler`.

Parameters:

- `mimetype`: the MIME type for which a content handler is desired.

**Returns:** a new `ContentHandler` to read an object from a
         `URLStreamHandler`.

**See also:** java.net.ContentHandler

**See also:** java.net.URLStreamHandler
