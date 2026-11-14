---
title: "ClassElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassElement interface (java.lang.classfile)

```java
public sealed interface ClassElement extends ClassFileElement permits AccessFlags, Superclass, Interfaces, ClassFileVersion, FieldModel, MethodModel, CustomAttribute, CompilationIDAttribute, DeprecatedAttribute, EnclosingMethodAttribute, InnerClassesAttribute, ModuleAttribute, ModuleHashesAttribute, ModuleMainClassAttribute, ModulePackagesAttribute, ModuleResolutionAttribute, ModuleTargetAttribute, NestHostAttribute, NestMembersAttribute, PermittedSubclassesAttribute, RecordAttribute, RuntimeInvisibleAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, RuntimeVisibleAnnotationsAttribute, RuntimeVisibleTypeAnnotationsAttribute, SignatureAttribute, SourceDebugExtensionAttribute, SourceFileAttribute, SourceIDAttribute, SyntheticAttribute, UnknownAttribute
```

Marker interface for a member element of a `ClassModel`.  Such an
element can appear when traversing a `ClassModel` unless otherwise
specified, be supplied to a `ClassBuilder`, and be processed by a
`ClassTransform`.

`AccessFlags`, and `ClassFileVersion` are member elements of a
class that appear exactly once during the traversal of a `ClassModel`.
`Superclass` and `Interfaces` may be absent or appear at most
once.  A `ClassBuilder` may provide an alternative superclass if it is
not defined but required.

**See also:** ClassFileElement##membership Membership Elements

**See also:** MethodElement

**See also:** FieldElement

**See also:** CodeElement

**sealedGraph:**

**Since:** 24
