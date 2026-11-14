---
title: "ModuleHashesAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleHashesAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleHashesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleHashesAttribute extends Attribute<ModuleHashesAttribute>, ClassElement permits BoundAttribute.BoundModuleHashesAttribute, UnboundAttribute.UnboundModuleHashesAttribute
```

Models the ModuleHashes attribute, which
appears on classes that represent
module descriptors to capture the hashes of a set of co-delivered modules.

The specification of the `ModuleHashes` attribute is:

```java
ModuleHashes_attribute {
  // index to CONSTANT_utf8_info structure in constant pool representing
  // the string "ModuleHashes"
  u2 attribute_name_index;
  u4 attribute_length;

  // index to CONSTANT_utf8_info structure with algorithm name
  u2 algorithm_index;

  // the number of entries in the hashes table
  u2 hashes_count;
  {   u2 module_name_index (index to CONSTANT_Module_info structure)
      u2 hash_length;
      u1 hash[hash_length];
  } hashes[hashes_count];

}
```

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the `jdk.jlink` module,
which defines the `jlink` and `jmod` tools.

**See also:** Attributes#moduleHashes()

**See also:** ModuleResolutionAttribute

**See also:** ModuleTargetAttribute

**Since:** 24

## ModuleHashesAttribute.algorithm()

```java
Utf8Entry algorithm()
```

## ModuleHashesAttribute.hashes()

```java
List<ModuleHashInfo> hashes()
```

## ModuleHashesAttribute.of(String, List<ModuleHashInfo>)

```java
static ModuleHashesAttribute of(String algorithm, List<ModuleHashInfo> hashes)
```

Parameters:

- `algorithm`: the hashing algorithm
- `hashes`: the hash descriptions

## ModuleHashesAttribute.of(String, ModuleHashInfo...)

```java
static ModuleHashesAttribute of(String algorithm, ModuleHashInfo... hashes)
```

Parameters:

- `algorithm`: the hashing algorithm
- `hashes`: the hash descriptions

## ModuleHashesAttribute.of(Utf8Entry, List<ModuleHashInfo>)

```java
static ModuleHashesAttribute of(Utf8Entry algorithm, List<ModuleHashInfo> hashes)
```

Parameters:

- `algorithm`: the hashing algorithm
- `hashes`: the hash descriptions

## ModuleHashesAttribute.of(Utf8Entry, ModuleHashInfo...)

```java
static ModuleHashesAttribute of(Utf8Entry algorithm, ModuleHashInfo... hashes)
```

Parameters:

- `algorithm`: the hashing algorithm
- `hashes`: the hash descriptions
