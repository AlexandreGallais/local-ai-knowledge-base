---
title: "AbstractSelectionKey class (java.nio.channels.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/spi/AbstractSelectionKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractSelectionKey class (java.nio.channels.spi)

```java
public abstract class AbstractSelectionKey <example-value> SelectionKey
```

Base implementation class for selection keys.

 This class tracks the validity of the key and implements cancellation.

**Since:** 1.4

## AbstractSelectionKey.AbstractSelectionKey()

```java
protected AbstractSelectionKey()
```

Initializes a new instance of this class.

## AbstractSelectionKey.cancel()

```java
public final void cancel()
```

Cancels this key.

 If this key has not yet been cancelled then it is added to its
selector's cancelled-key set while synchronized on that set.
