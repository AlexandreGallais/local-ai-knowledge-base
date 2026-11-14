---
title: "ModulePackagesAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModulePackagesAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModulePackagesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModulePackagesAttribute extends Attribute<ModulePackagesAttribute>, ClassElement permits BoundAttribute.BoundModulePackagesAttribute, UnboundAttribute.UnboundModulePackagesAttribute
```

Models the ModulePackages attribute (JVMS
), which can appear on classes that represent module descriptors to indicate packages
in the module used by the module descriptor.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 9, major version
`ClassFile#JAVA_9_VERSION`.

**See also:** Attributes#modulePackages()

**See also:** ModuleDescriptor#packages()

**jvms:** 4.7.26 The `ModulePackages` Attribute

**Since:** 24

## ModulePackagesAttribute.packages()

```java
List<PackageEntry> packages()
```

This must include
all packages opened or exported by the module, as well as the packages of
any service providers, and the package for the main class.

## ModulePackagesAttribute.of(List<PackageEntry>)

```java
static ModulePackagesAttribute of(List<PackageEntry> packages)
```

Parameters:

- `packages`: the packages

## ModulePackagesAttribute.of(PackageEntry...)

```java
static ModulePackagesAttribute of(PackageEntry... packages)
```

Parameters:

- `packages`: the packages

## ModulePackagesAttribute.ofNames(List<PackageDesc>)

```java
static ModulePackagesAttribute ofNames(List<PackageDesc> packages)
```

Parameters:

- `packages`: the packages

## ModulePackagesAttribute.ofNames(PackageDesc...)

```java
static ModulePackagesAttribute ofNames(PackageDesc... packages)
```

Parameters:

- `packages`: the packages
