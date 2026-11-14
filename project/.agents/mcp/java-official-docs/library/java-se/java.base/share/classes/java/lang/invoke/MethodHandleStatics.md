---
title: "MethodHandleStatics class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandleStatics.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandleStatics class (java.lang.invoke)

```java
/*non-public*/ class MethodHandleStatics
```

This class consists exclusively of static names internal to the
method handle implementation.
Usage:  `import static java.lang.invoke.MethodHandleStatics.*`

## MethodHandleStatics.debugEnabled()

```java
/*non-public*/ static boolean debugEnabled()
```

Tell if any of the debugging switches are turned on.
 If this is the case, it is reasonable to perform extra checks or save extra information.

## MethodHandleStatics.traceLambdaForm(String, MethodType, Class<?>, MemberName)

```java
/*non-public*/ static void traceLambdaForm(String name, MethodType type, Class<?> holder, MemberName resolvedMember)
```

If requested, logs the result of resolving the LambdaForm to stdout
and informs the CDS subsystem about it.

## MethodHandleStatics.traceSpeciesType(String, Class<?>)

```java
/*non-public*/ static void traceSpeciesType(String cn, Class<?> salvage)
```

If requested, logs the result of resolving the species type to stdout
and the CDS subsystem.

## MethodHandleStatics.uncaughtException(Throwable)

```java
/*non-public*/ static Error uncaughtException(Throwable ex)
```

Propagate unchecked exceptions and errors, but wrap anything checked and throw that instead.
