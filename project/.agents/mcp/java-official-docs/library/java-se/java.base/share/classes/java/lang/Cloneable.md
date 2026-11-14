---
title: "Cloneable interface (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Cloneable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Cloneable interface (java.lang)

```java
public interface Cloneable
```

A class implements the `Cloneable` interface to
indicate to the `java.lang.Object.clone()` method that it
is legal for that method to make a
field-for-field copy of instances of that class.

Invoking Object's clone method on an instance that does not implement the
`Cloneable` interface results in the exception
`CloneNotSupportedException` being thrown.

By convention, classes that implement this interface should override
`Object.clone` (which is protected) with a public method.
See `java.lang.Object.clone()` for details on overriding this
method.

Note that this interface does *not* contain the `clone` method.
Therefore, it is not possible to clone an object merely by virtue of the
fact that it implements this interface.  Even if the clone method is invoked
reflectively, there is no guarantee that it will succeed.

**See also:** java.lang.CloneNotSupportedException

**See also:** java.lang.Object#clone()

**Since:** 1.0
