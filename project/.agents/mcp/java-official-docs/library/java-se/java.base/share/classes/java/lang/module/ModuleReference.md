---
title: "ModuleReference class (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ModuleReference.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleReference class (java.lang.module)

```java
public abstract class ModuleReference
```

A reference to a module's content.

 A module reference is a concrete implementation of this class that
implements the abstract methods defined by this class. It contains the
module's descriptor and its location, if known.  It also has the ability to
create a `ModuleReader` in order to access the module's content, which
may be inside the Java run-time system itself or in an artifact such as a
modular JAR file.

**See also:** ModuleFinder

**See also:** ModuleReader

**Since:** 9

## ModuleReference.ModuleReference(ModuleDescriptor, URI)

```java
protected ModuleReference(ModuleDescriptor descriptor, URI location)
```

Constructs a new instance of this class.

Parameters:

- `descriptor`: The module descriptor
- `location`: The module location or `null` if not known

## ModuleReference.descriptor()

```java
public final ModuleDescriptor descriptor()
```

Returns the module descriptor.

**Returns:** The module descriptor

## ModuleReference.location()

```java
public final Optional<URI> location()
```

Returns the location of this module's content, if known.

**Returns:** The location or an empty `Optional` if not known

## ModuleReference.open()

```java
public abstract ModuleReader open() throws IOException
```

Opens the module content for reading.

**Returns:** A `ModuleReader` to read the module

Throws:

- `IOException`: If an I/O error occurs
