---
title: "DelegatingMethodHandle class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/DelegatingMethodHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DelegatingMethodHandle class (java.lang.invoke)

```java
/*non-public*/ abstract sealed class DelegatingMethodHandle extends MethodHandle permits MethodHandleImpl.AsVarargsCollector, MethodHandleImpl.WrappedMember, MethodHandleImpl.IntrinsicMethodHandle, MethodHandleImpl.CountingWrapper
```

A method handle whose invocation behavior is determined by a target.
The delegating MH itself can hold extra "intentions" beyond the simple behavior.

## DelegatingMethodHandle.getTarget()

```java
protected abstract MethodHandle getTarget()
```

Define this to extract the delegated target which supplies the invocation behavior.
