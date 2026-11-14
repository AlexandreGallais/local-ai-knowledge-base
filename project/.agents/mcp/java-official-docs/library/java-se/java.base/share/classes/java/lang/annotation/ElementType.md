---
title: "ElementType enum (java.lang.annotation)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/annotation/ElementType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ElementType enum (java.lang.annotation)

```java
public enum ElementType
```

The constants of this enumerated class provide a simple classification of the
syntactic locations where annotations may appear in a Java program. These
constants are used in Target
meta-annotations to specify where it is legal to write annotations of a
given type.

The syntactic locations where annotations may appear are split into
*declaration contexts*, where annotations apply to declarations, and
*type contexts*, where annotations apply to types used in
declarations and expressions.

The constants `ANNOTATION_TYPE`, `CONSTRUCTOR`, `FIELD`, `LOCAL_VARIABLE`, `METHOD`, `PACKAGE`, `MODULE`, `PARAMETER`, `TYPE`, and `TYPE_PARAMETER`
correspond to the declaration contexts in JLS .

For example, an annotation whose interface is meta-annotated with
`@Target(ElementType.FIELD)` may only be written as a modifier for a
field declaration.

The constant `TYPE_USE` corresponds to the type contexts in JLS
, as well as to two declaration contexts: class and interface
declarations (including annotation declarations) and type parameter
declarations.

For example, an annotation whose interface is meta-annotated with
`@Target(ElementType.TYPE_USE)` may be written on the class or
interface of a field (or within the class or interface of the field, if it
is a nested or parameterized class or interface, or array class), and may
also appear as a modifier for, say, a class declaration.

The `TYPE_USE` constant includes class and interface declarations
and type parameter declarations as a convenience for designers of
type checkers which give semantics to annotation interfaces. For example,
if the annotation interface `NonNull` is meta-annotated with
`@Target(ElementType.TYPE_USE)`, then `@NonNull`
`class C {...}` could be treated by a type checker as indicating that
all variables of class `C` are non-null, while still allowing
variables of other classes to be non-null or not non-null based on whether
`@NonNull` appears at the variable's declaration.

**Since:** 1.5

**JLS:** 9.6.4.1 @Target

**JLS:** 4.1 The Kinds of Types and Values
