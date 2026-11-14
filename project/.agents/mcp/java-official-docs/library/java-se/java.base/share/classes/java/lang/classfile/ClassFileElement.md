---
title: "ClassFileElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassFileElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFileElement interface (java.lang.classfile)

```java
public sealed interface ClassFileElement permits AttributedElement, CompoundElement, Attribute, ClassElement, CodeElement, FieldElement, MethodElement
```

Marker interface for structures with special capabilities in the `class` file format. `AttributedElement` indicates a structure has
`Attribute`s.  `CompoundElement` indicates a structure can be
viewed as a composition of member structures, whose memberships are marked by
`ClassElement`, `MethodElement`, `FieldElement`, or `CodeElement`.

#### Membership Elements

`ClassModel`, `MethodModel`, `FieldModel`, and `CodeModel` each has a dedicated interface marking its member structures:
`ClassElement`, `MethodElement`, `FieldElement`, and
`CodeElement`.  They can be supplied to a `ClassBuilder`, a
`MethodBuilder`, a `FieldBuilder`, or a `CodeBuilder` to be
included as members of the built model.  Unless otherwise specified, these
structures are delivered during the traversal of
the corresponding models.  Some of these elements may appear at most once or
exactly once in the traversal of the models; such elements have special
treatment by `ClassFileBuilder` and are specified in their modeling
interfaces.  If such elements appear multiple times during traversal, the
last occurrence should be used and all previous instances should be
discarded.

These membership element marker interfaces are sealed; future versions of the
Java SE Platform may define new elements to the sealed hierarchy when the
`class` file format for the Java Platform evolves.  Using an exhaustive
pattern matching switch over these hierarchies indicates the user only wish
the processing code to run on a specific version of Java Platform, and will
fail if unknown new elements are encountered.

**sealedGraph:**

**Since:** 24
