---
title: "ModuleExportInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleExportInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleExportInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleExportInfo permits UnboundAttribute.UnboundModuleExportInfo
```

Models a single "exports" declaration in the `ModuleAttribute`.

**See also:** ModuleAttribute#exports()

**See also:** ModuleDescriptor.Exports

**jvms:** 4.7.25 The `Module` Attribute

**Since:** 24

## ModuleExportInfo.exportedPackage()

```java
PackageEntry exportedPackage()
```

**See also:** ModuleDescriptor.Exports#source()

## ModuleExportInfo.exportsFlagsMask()

```java
int exportsFlagsMask()
```

It is in the range of unsigned short, `[0, 0xFFFF]`.

**See also:** ModuleDescriptor.Exports#modifiers()

**See also:** AccessFlag.Location#MODULE_EXPORTS

## ModuleExportInfo.exportsFlags()

```java
default Set<AccessFlag> exportsFlags()
```

**See also:** ModuleDescriptor.Exports#accessFlags()

**See also:** AccessFlag.Location#MODULE_EXPORTS

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## ModuleExportInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Parameters:

- `flag`: the access flag

**See also:** AccessFlag.Location#MODULE_EXPORTS

## ModuleExportInfo.exportsTo()

```java
List<ModuleEntry> exportsTo()
```

**See also:** ModuleDescriptor.Exports#isQualified()

**See also:** ModuleDescriptor.Exports#targets()

## ModuleExportInfo.of(PackageEntry, int, List<ModuleEntry>)

```java
static ModuleExportInfo of(PackageEntry exports, int exportFlags, List<ModuleEntry> exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags, as a bitmask
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

## ModuleExportInfo.of(PackageEntry, Collection<AccessFlag>, List<ModuleEntry>)

```java
static ModuleExportInfo of(PackageEntry exports, Collection<AccessFlag> exportFlags, List<ModuleEntry> exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_EXPORTS` location

## ModuleExportInfo.of(PackageEntry, int, ModuleEntry...)

```java
static ModuleExportInfo of(PackageEntry exports, int exportFlags, ModuleEntry... exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags, as a bitmask
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

## ModuleExportInfo.of(PackageEntry, Collection<AccessFlag>, ModuleEntry...)

```java
static ModuleExportInfo of(PackageEntry exports, Collection<AccessFlag> exportFlags, ModuleEntry... exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_EXPORTS` location

## ModuleExportInfo.of(PackageDesc, int, List<ModuleDesc>)

```java
static ModuleExportInfo of(PackageDesc exports, int exportFlags, List<ModuleDesc> exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags, as a bitmask
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

## ModuleExportInfo.of(PackageDesc, Collection<AccessFlag>, List<ModuleDesc>)

```java
static ModuleExportInfo of(PackageDesc exports, Collection<AccessFlag> exportFlags, List<ModuleDesc> exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_EXPORTS` location

## ModuleExportInfo.of(PackageDesc, int, ModuleDesc...)

```java
static ModuleExportInfo of(PackageDesc exports, int exportFlags, ModuleDesc... exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags, as a bitmask
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

## ModuleExportInfo.of(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
static ModuleExportInfo of(PackageDesc exports, Collection<AccessFlag> exportFlags, ModuleDesc... exportsTo)
```

Parameters:

- `exports`: the exported package
- `exportFlags`: the export flags
- `exportsTo`: the modules to which this package is exported, or empty if this is an unqualified export

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_EXPORTS` location
