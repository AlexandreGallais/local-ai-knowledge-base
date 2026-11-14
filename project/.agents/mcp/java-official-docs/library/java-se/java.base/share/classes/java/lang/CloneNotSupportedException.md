---
title: "CloneNotSupportedException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/CloneNotSupportedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CloneNotSupportedException class (java.lang)

```java
public class CloneNotSupportedException extends Exception
```

Thrown to indicate that the `clone` method in class
`Object` has been called to clone an object, but that
the object's class does not implement the `Cloneable`
interface.

Applications that override the `clone` method can also
throw this exception to indicate that an object could not or
should not be cloned.

**See also:** java.lang.Cloneable

**See also:** java.lang.Object#clone()

**Since:** 1.0

## CloneNotSupportedException.CloneNotSupportedException()

```java
public CloneNotSupportedException()
```

Constructs a `CloneNotSupportedException` with no
detail message.

## CloneNotSupportedException.CloneNotSupportedException(String)

```java
public CloneNotSupportedException(String s)
```

Constructs a `CloneNotSupportedException` with the
specified detail message.

Parameters:

- `s`: the detail message.
