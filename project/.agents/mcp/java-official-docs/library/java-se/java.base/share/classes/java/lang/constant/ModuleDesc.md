---
title: "ModuleDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/ModuleDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleDesc interface (java.lang.constant)

```java
public sealed interface ModuleDesc permits ModuleDescImpl
```

A nominal descriptor for a `Module` constant.

To create a `ModuleDesc` for a module, use the `of(String)`
method.

**jvms:** 4.4.11 The CONSTANT_Module_info Structure

**Since:** 21

## ModuleDesc.of(String)

```java
static ModuleDesc of(String name)
```

Returns a `ModuleDesc` for a module,
given the name of the module.

Parameters:

- `name`: the module name

**Returns:** a `ModuleDesc` describing the desired module

**jvms:** 4.2.3 Module and Package Names

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the name string is not in the correct format

## ModuleDesc.name()

```java
String name()
```

Returns the module name of this `ModuleDesc`.

**Returns:** the module name

## ModuleDesc.equals(Object)

```java
boolean equals(Object o)
```

Compare the specified object with this descriptor for equality.
Returns `true` if and only if the specified object is
also a `ModuleDesc` and both describe the same module.

Parameters:

- `o`: the other object

**Returns:** whether this descriptor is equal to the other object
