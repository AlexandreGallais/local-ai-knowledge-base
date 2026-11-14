---
title: "AnnotatedType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AnnotatedType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotatedType interface (java.lang.reflect)

```java
public interface AnnotatedType extends AnnotatedElement
```

`AnnotatedType` represents the potentially annotated use of a type in
the program currently running in this VM. The use may be of any type in the
Java programming language, including an array type, a parameterized type, a
type variable, or a wildcard type.

Note that any annotations returned by methods on this interface are
*type annotations* (JLS ) as the entity being
potentially annotated is a type.

**JLS:** 4.1 The Kinds of Types and Values

**JLS:** 4.2 Primitive Types and Values

**JLS:** 4.3 Reference Types and Values

**JLS:** 4.4 Type Variables

**JLS:** 4.5 Parameterized Types

**JLS:** 4.8 Raw Types

**JLS:** 4.9 Intersection Types

**JLS:** 10.1 Array Types

**Since:** 1.8

## AnnotatedType.getAnnotatedOwnerType()

```java
default AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested type. For example, if this type is
`@TA O<T>.I`, return a representation of `@TA O<T>`.

Returns `null` if this `AnnotatedType` represents a
    top-level class or interface, or a local or anonymous class, or
    a primitive type, or void.

Returns `null` if this `AnnotatedType` is an instance of
    `AnnotatedArrayType`, `AnnotatedTypeVariable`, or
    `AnnotatedWildcardType`.

**Implementation requirements:** This default implementation returns `null` and performs no other
action.

**Returns:** an `AnnotatedType` object representing the potentially
    annotated type that this type is a member of, or `null`

**Since:** 9

Throws:

- `TypeNotPresentException`: if the owner type refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if the owner type refers to a parameterized type that cannot be instantiated for any reason

## AnnotatedType.getType()

```java
public Type getType()
```

Returns the underlying type that this annotated type represents.

**Returns:** the type this annotated type represents

## AnnotatedType.getAnnotation(Class<T>)

```java
<T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a type
annotation.

Throws:

- `NullPointerException`: (inherited documentation)

## AnnotatedType.getAnnotations()

```java
Annotation[] getAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are type
annotations.

## AnnotatedType.getDeclaredAnnotations()

```java
Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are type
annotations.
