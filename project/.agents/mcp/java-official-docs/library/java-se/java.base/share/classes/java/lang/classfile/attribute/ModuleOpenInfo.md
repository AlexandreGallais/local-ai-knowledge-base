---
title: "ModuleOpenInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleOpenInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleOpenInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleOpenInfo permits UnboundAttribute.UnboundModuleOpenInfo
```

Models a single "opens" declaration in the `ModuleAttribute`.

**API note:** Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See `MethodHandles.privateLookupIn` for more details.

**See also:** ModuleAttribute#exports()

**See also:** ModuleDescriptor.Opens

**jvms:** 4.7.25 The `Module` Attribute

**Since:** 24

## ModuleOpenInfo.openedPackage()

```java
PackageEntry openedPackage()
```

**See also:** ModuleDescriptor.Opens#source()

## ModuleOpenInfo.opensFlagsMask()

```java
int opensFlagsMask()
```

It is in the range of unsigned short, `[0, 0xFFFF]`.

**See also:** ModuleDescriptor.Opens#modifiers()

**See also:** AccessFlag.Location#MODULE_OPENS

## ModuleOpenInfo.opensFlags()

```java
default Set<AccessFlag> opensFlags()
```

**See also:** ModuleDescriptor.Opens#accessFlags()

**See also:** AccessFlag.Location#MODULE_OPENS

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## ModuleOpenInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Parameters:

- `flag`: the access flag

**See also:** AccessFlag.Location#MODULE_OPENS

## ModuleOpenInfo.opensTo()

```java
List<ModuleEntry> opensTo()
```

**See also:** ModuleDescriptor.Opens#isQualified()

**See also:** ModuleDescriptor.Opens#targets()

## ModuleOpenInfo.of(PackageEntry, int, List<ModuleEntry>)

```java
static ModuleOpenInfo of(PackageEntry opens, int opensFlags, List<ModuleEntry> opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the modules to which this package is opened, or empty if this is an unqualified open

## ModuleOpenInfo.of(PackageEntry, Collection<AccessFlag>, List<ModuleEntry>)

```java
static ModuleOpenInfo of(PackageEntry opens, Collection<AccessFlag> opensFlags, List<ModuleEntry> opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the modules to which this package is opened, or empty if this is an unqualified open

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_OPENS` location

## ModuleOpenInfo.of(PackageEntry, int, ModuleEntry...)

```java
static ModuleOpenInfo of(PackageEntry opens, int opensFlags, ModuleEntry... opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the modules to which this package is opened, or empty if this is an unqualified open

## ModuleOpenInfo.of(PackageEntry, Collection<AccessFlag>, ModuleEntry...)

```java
static ModuleOpenInfo of(PackageEntry opens, Collection<AccessFlag> opensFlags, ModuleEntry... opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the modules to which this package is opened, or empty if this is an unqualified open

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_OPENS` location

## ModuleOpenInfo.of(PackageDesc, int, List<ModuleDesc>)

```java
static ModuleOpenInfo of(PackageDesc opens, int opensFlags, List<ModuleDesc> opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the modules to which this package is opened, if it is a qualified open, or empty

## ModuleOpenInfo.of(PackageDesc, Collection<AccessFlag>, List<ModuleDesc>)

```java
static ModuleOpenInfo of(PackageDesc opens, Collection<AccessFlag> opensFlags, List<ModuleDesc> opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the modules to which this package is opened, if it is a qualified open, or empty

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_OPENS` location

## ModuleOpenInfo.of(PackageDesc, int, ModuleDesc...)

```java
static ModuleOpenInfo of(PackageDesc opens, int opensFlags, ModuleDesc... opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the packages to which this package is opened, or empty if this is an unqualified open

## ModuleOpenInfo.of(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
static ModuleOpenInfo of(PackageDesc opens, Collection<AccessFlag> opensFlags, ModuleDesc... opensTo)
```

Parameters:

- `opens`: the package to open
- `opensFlags`: the open flags
- `opensTo`: the packages to which this package is opened, or empty if this is an unqualified open

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_OPENS` location
