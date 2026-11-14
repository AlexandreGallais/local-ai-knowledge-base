---
title: "AbstractConstantGroup class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/AbstractConstantGroup.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractConstantGroup class (java.lang.invoke)

```java
/*non-public*/ abstract class AbstractConstantGroup implements ConstantGroup
```

Utility class for implementing ConstantGroup.

## AbstractConstantGroup.size

```java
protected final int size
```

The size of this constant group, set permanently by the constructor.

## AbstractConstantGroup.toString()

```java
public String toString()
```

Produce a string using the non-resolving list view,
where unresolved elements are presented as asterisks.

**Returns:** `this.asList("*").toString()`
