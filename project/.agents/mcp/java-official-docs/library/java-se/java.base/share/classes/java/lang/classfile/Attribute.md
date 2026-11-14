---
title: "Attribute interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Attribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Attribute interface (java.lang.classfile)

```java
public sealed interface Attribute<A extends Attribute<A>> extends ClassFileElement permits AnnotationDefaultAttribute, BootstrapMethodsAttribute, CharacterRangeTableAttribute, CodeAttribute, CompilationIDAttribute, ConstantValueAttribute, DeprecatedAttribute, EnclosingMethodAttribute, ExceptionsAttribute, InnerClassesAttribute, LineNumberTableAttribute, LocalVariableTableAttribute, LocalVariableTypeTableAttribute, MethodParametersAttribute, ModuleAttribute, ModuleHashesAttribute, ModuleMainClassAttribute, ModulePackagesAttribute, ModuleResolutionAttribute, ModuleTargetAttribute, NestHostAttribute, NestMembersAttribute, PermittedSubclassesAttribute, RecordAttribute, RuntimeInvisibleAnnotationsAttribute, RuntimeInvisibleParameterAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, RuntimeVisibleAnnotationsAttribute, RuntimeVisibleParameterAnnotationsAttribute, RuntimeVisibleTypeAnnotationsAttribute, SignatureAttribute, SourceDebugExtensionAttribute, SourceFileAttribute, SourceIDAttribute, StackMapTableAttribute, SyntheticAttribute, UnknownAttribute, BoundAttribute, UnboundAttribute, CustomAttribute
```

Models an attribute (JVMS ) in the `class` file format.
Attributes exist on certain `class` file structures modeled by `AttributedElement`, which provides basic read access to the attributes.

This sealed interface hierarchy includes attributes predefined in the JVMS
and JDK-specific nonstandard attributes.  Their mappers are available in `Attributes`.  Two special subtypes of `Attribute` are `CustomAttribute`, which all user-defined attributes
should extend from, and `UnknownAttribute`, representing attributes
read from `class` file but are not recognized by the `ClassFile.AttributeMapperOption`.

Attributes are read through `AttributedElement` or element traversal of
a `CompoundElement`; they are written through `ClassFileBuilder`.
See Reading Attributes
and Writing Attributes
for more details.

Parameters:

- ``: the attribute type

**See also:** java.lang.classfile.attribute

**See also:** AttributeMapper

**See also:** AttributedElement

**See also:** CustomAttribute

**See also:** UnknownAttribute

**jvms:** 4.7 Attributes

**sealedGraph:**

**Since:** 24

## Attribute.attributeName()

```java
Utf8Entry attributeName()
```

The string value of the name is equivalent to the
value of attributeMapper().name().

If this attribute is read from a `class` file, this method returns
the `Utf8Entry` indicating the attribute name in the `class`
file.

## Attribute.attributeMapper()

```java
AttributeMapper<A> attributeMapper()
```
