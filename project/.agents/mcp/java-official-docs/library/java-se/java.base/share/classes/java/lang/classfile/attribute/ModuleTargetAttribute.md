---
title: "ModuleTargetAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleTargetAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleTargetAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleTargetAttribute extends Attribute<ModuleTargetAttribute>, ClassElement permits BoundAttribute.BoundModuleTargetAttribute, UnboundAttribute.UnboundModuleTargetAttribute
```

Models the ModuleTarget attribute, which
can appear on classes that represent
module descriptors, to represent constraints on the target platform.

The specification of the `ModuleTarget` attribute is:

```java
TargetPlatform_attribute {
  // index to CONSTANT_utf8_info structure in constant pool representing
  // the string "ModuleTarget"
  u2 attribute_name_index;
  u4 attribute_length;

  // index to CONSTANT_utf8_info structure with the target platform
  u2 target_platform_index;
}
```

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the `jdk.jlink` module,
which defines the `jlink` and `jmod` tools.

**See also:** Attributes#moduleTarget()

**See also:** ModuleHashesAttribute

**See also:** ModuleResolutionAttribute

**Since:** 24

## ModuleTargetAttribute.targetPlatform()

```java
Utf8Entry targetPlatform()
```

## ModuleTargetAttribute.of(String)

```java
static ModuleTargetAttribute of(String targetPlatform)
```

Parameters:

- `targetPlatform`: the target platform

## ModuleTargetAttribute.of(Utf8Entry)

```java
static ModuleTargetAttribute of(Utf8Entry targetPlatform)
```

Parameters:

- `targetPlatform`: the target platform
