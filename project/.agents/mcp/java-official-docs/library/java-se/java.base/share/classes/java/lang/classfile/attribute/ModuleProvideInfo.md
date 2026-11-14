---
title: "ModuleProvideInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleProvideInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleProvideInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleProvideInfo permits UnboundAttribute.UnboundModuleProvideInfo
```

Models a single "provides" declaration in the `ModuleAttribute`.

**See also:** ModuleAttribute#provides()

**See also:** ModuleDescriptor.Provides

**jvms:** 4.7.25 The `Module` Attribute

**Since:** 24

## ModuleProvideInfo.provides()

```java
ClassEntry provides()
```

**See also:** ModuleDescriptor.Provides#service()

## ModuleProvideInfo.providesWith()

```java
List<ClassEntry> providesWith()
```

The list
should not be empty.

**See also:** ModuleDescriptor.Provides#providers()

## ModuleProvideInfo.of(ClassEntry, List<ClassEntry>)

```java
static ModuleProvideInfo of(ClassEntry provides, List<ClassEntry> providesWith)
```

Parameters:

- `provides`: the service class interface
- `providesWith`: the service class implementations, must not be empty

## ModuleProvideInfo.of(ClassEntry, ClassEntry...)

```java
static ModuleProvideInfo of(ClassEntry provides, ClassEntry... providesWith)
```

Parameters:

- `provides`: the service class interface
- `providesWith`: the service class implementations, must not be empty

## ModuleProvideInfo.of(ClassDesc, List<ClassDesc>)

```java
static ModuleProvideInfo of(ClassDesc provides, List<ClassDesc> providesWith)
```

Parameters:

- `provides`: the service class interface
- `providesWith`: the service class implementations, must not be empty

Throws:

- `IllegalArgumentException`: if `provides` or any of `providesWith` represents a primitive type

## ModuleProvideInfo.of(ClassDesc, ClassDesc...)

```java
static ModuleProvideInfo of(ClassDesc provides, ClassDesc... providesWith)
```

Parameters:

- `provides`: the service class interface
- `providesWith`: the service class implementations, must not be empty

Throws:

- `IllegalArgumentException`: if `provides` or any of `providesWith` represents a primitive type
