---
title: "NativeMethodHandle class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/NativeMethodHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NativeMethodHandle class (java.lang.invoke)

```java
/*non-public*/ final class NativeMethodHandle extends MethodHandle
```

This class models a method handle to a native function. A native method handle is made up of a `NativeEntryPoint`,
which is used to capture the characteristics of the native call (such as calling convention to be used,
or whether a native transition is required) and a *fallback* method handle, which can be used
when intrinsification of this method handle is not possible.

## NativeMethodHandle.make(NativeEntryPoint)

```java
public static MethodHandle make(NativeEntryPoint nep)
```

Creates a new native method handle with given `NativeEntryPoint` and *fallback* method handle.
