---
title: "AttributeView interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/AttributeView.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AttributeView interface (java.nio.file.attribute)

```java
public interface AttributeView
```

An object that provides a read-only or updatable *view* of non-opaque
values associated with an object in a filesystem. This interface is extended
or implemented by specific attribute views that define the attributes
supported by the view. A specific attribute view will typically define
type-safe methods to read or update the attributes that it supports.

**Since:** 1.7

## AttributeView.name()

```java
String name()
```

Returns the name of the attribute view.

**Returns:** the name of the attribute view
