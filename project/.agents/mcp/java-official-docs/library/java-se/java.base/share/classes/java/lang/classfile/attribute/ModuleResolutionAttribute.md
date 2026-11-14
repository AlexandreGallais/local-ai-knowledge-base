---
title: "ModuleResolutionAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleResolutionAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleResolutionAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleResolutionAttribute extends Attribute<ModuleResolutionAttribute>, ClassElement permits BoundAttribute.BoundModuleResolutionAttribute, UnboundAttribute.UnboundModuleResolutionAttribute
```

Models the ModuleResolution attribute,
which can appear on classes that represent module descriptors, to capture resolution metadata for modules.

The specification of the `ModuleResolution` attribute is:

```java
 ModuleResolution_attribute {
   u2 attribute_name_index;    // "ModuleResolution"
   u4 attribute_length;        // 2
   u2 resolution_flags;

 The value of the resolution_flags item is a mask of flags used to denote
 properties of module resolution. The flags are as follows:

  // Optional
  0x0001 (DO_NOT_RESOLVE_BY_DEFAULT)

  // At most one of:
  0x0002 (WARN_DEPRECATED)
  0x0004 (WARN_DEPRECATED_FOR_REMOVAL)
  0x0008 (WARN_INCUBATING)
 }
```

This attribute only appears on classes, and does not permit multiple instances in a class.  It has
no data dependency.

This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the `jdk.jlink` module,
which defines the `jlink` and `jmod` tools.

**See also:** Attributes#moduleResolution()

**See also:** ModuleHashesAttribute

**See also:** ModuleTargetAttribute

**Since:** 24

## ModuleResolutionAttribute.resolutionFlags()

```java
int resolutionFlags()
```

It is in the range of unsigned
short, `[0, 0xFFFF]`.

The value of the resolution_flags item is a mask of flags used to denote
properties of module resolution. The flags are as follows:

```java
  // Optional
  0x0001 (DO_NOT_RESOLVE_BY_DEFAULT)

  // At most one of:
  0x0002 (WARN_DEPRECATED)
  0x0004 (WARN_DEPRECATED_FOR_REMOVAL)
  0x0008 (WARN_INCUBATING)
```

## ModuleResolutionAttribute.of(int)

```java
static ModuleResolutionAttribute of(int resolutionFlags)
```

Parameters:

- `resolutionFlags`: the resolution flags
