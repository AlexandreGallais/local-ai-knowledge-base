---
title: "TypeAnnotation interface (java.lang.classfile) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/TypeAnnotation.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeAnnotation interface (java.lang.classfile) (part 6 of 6)

## TypeAnnotation.ARRAY(0), /** Annotation is deeper in a nested type */ INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)

```java
ARRAY(0), /** Annotation is deeper in a nested type */ INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)
```

Annotation is deeper in an array type

## TypeAnnotation.INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)

```java
INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)
```

Annotation is deeper in a nested type

## TypeAnnotation.WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)

```java
WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)
```

Annotation is on the bound of a wildcard type argument of a parameterized type

## TypeAnnotation.TYPE_ARGUMENT(3)

```java
TYPE_ARGUMENT(3)
```

Annotation is on a type argument of a parameterized type

## TypeAnnotation.tag()

```java
public int tag()
```

## TypeAnnotation.ARRAY

```java
TypePathComponent ARRAY
```

static instance for annotation is deeper in an array type

## TypeAnnotation.INNER_TYPE

```java
TypePathComponent INNER_TYPE
```

static instance for annotation is deeper in a nested type

## TypeAnnotation.WILDCARD

```java
TypePathComponent WILDCARD
```

static instance for annotation is on the bound of a wildcard type argument of a parameterized type

## TypeAnnotation.typePathKind()

```java
Kind typePathKind()
```

The type path kind items from JVMS Table 4.7.20.2-A.

**Returns:** the kind of path element

## TypeAnnotation.typeArgumentIndex()

```java
int typeArgumentIndex()
```

JVMS: type_argument_index
If the value of the type_path_kind item is 0, 1, or 2, then the value of the type_argument_index item is 0.

If the value of the type_path_kind item is 3, then the value of the type_argument_index item specifies which
type argument of a parameterized type is annotated, where 0 indicates the first type argument of a
parameterized type.

**Returns:** the index within the type component

## TypeAnnotation.of(Kind, int)

```java
static TypePathComponent of(Kind typePathKind, int typeArgumentIndex)
```

Parameters:

- `typePathKind`: the kind of path element
- `typeArgumentIndex`: the type argument index
