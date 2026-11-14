---
title: "PackageDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/PackageDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PackageDesc interface (java.lang.constant)

```java
public sealed interface PackageDesc permits PackageDescImpl
```

A nominal descriptor for a `Package` constant.

To create a `PackageDesc` for a package,
use the `of(String)` or `ofInternalName(String)` method.

**jvms:** 4.4.12 The CONSTANT_Package_info Structure

**Since:** 21

## PackageDesc.of(String)

```java
static PackageDesc of(String name)
```

Returns a `PackageDesc` for a package,
given the name of the package, such as `"java.lang"`.

Parameters:

- `name`: the fully qualified (dot-separated) package name

**Returns:** a `PackageDesc` describing the desired package

**JLS:** 6.5.3 Meaning of Module Names and Package Names

**See also:** PackageDesc#ofInternalName(String)

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the name string is not in the correct format

## PackageDesc.ofInternalName(String)

```java
static PackageDesc ofInternalName(String name)
```

Returns a `PackageDesc` for a package,
given the name of the package in internal form,
such as `"java/lang"`.

Parameters:

- `name`: the fully qualified package name, in internal (slash-separated) form

**Returns:** a `PackageDesc` describing the desired package

**jvms:** 4.2.1 Binary Class and Interface Names

**jvms:** 4.2.3 Module and Package Names

**See also:** PackageDesc#of(String)

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the name string is not in the correct format

## PackageDesc.internalName()

```java
String internalName()
```

Returns the fully qualified (slash-separated) package name in internal form
of this `PackageDesc`.

**Returns:** the package name in internal form, or the empty string for the
unnamed package

**See also:** PackageDesc#name()

## PackageDesc.name()

```java
default String name()
```

Returns the fully qualified (dot-separated) package name
of this `PackageDesc`.

**Returns:** the package name, or the empty string for the
unnamed package

**See also:** PackageDesc#internalName()

## PackageDesc.equals(Object)

```java
boolean equals(Object o)
```

Compare the specified object with this descriptor for equality.
Returns `true` if and only if the specified object is
also a `PackageDesc` and both describe the same package.

Parameters:

- `o`: the other object

**Returns:** whether this descriptor is equal to the other object
