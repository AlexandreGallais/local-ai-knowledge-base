---
title: "Annotation interface (java.lang.annotation)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/annotation/Annotation.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Annotation interface (java.lang.annotation)

```java
public interface Annotation
```

The common interface extended by all annotation interfaces.  Note that an
interface that manually extends this one does *not* define
an annotation interface.  Also note that this interface does not itself
define an annotation interface.

More information about annotation interfaces can be found in section
 of *The Java Language Specification*.

The `java.lang.reflect.AnnotatedElement` interface discusses
compatibility concerns when evolving an annotation interface from being
non-repeatable to being repeatable.

**Since:** 1.5

## Annotation.equals(Object)

```java
boolean equals(Object obj)
```

Returns true if the specified object represents an annotation
that is logically equivalent to this one.  In other words,
returns true if the specified object is an instance of the same
annotation interface as this instance, all of whose members are equal
to the corresponding member of this annotation, as defined below:

- Two corresponding primitive typed members whose values are
   `x` and `y` are considered equal if `x == y`,
   unless their type is `float` or `double`.

- Two corresponding `float` members whose values
   are `x` and `y` are considered equal if
   `Float.valueOf(x).equals(Float.valueOf(y))`.
   (Unlike the `==` operator, NaN is considered equal
   to itself, and `0.0f` unequal to `-0.0f`.)

- Two corresponding `double` members whose values
   are `x` and `y` are considered equal if
   `Double.valueOf(x).equals(Double.valueOf(y))`.
   (Unlike the `==` operator, NaN is considered equal
   to itself, and `0.0` unequal to `-0.0`.)

- Two corresponding `String`, `Class`, enum, or
   annotation typed members whose values are `x` and `y`
   are considered equal if `x.equals(y)`.  (Note that this
   definition is recursive for annotation typed members.)

- Two corresponding array typed members `x` and `y`
   are considered equal if `Arrays.equals(x, y)`, for the
   appropriate overloading of Arrays.equals.

**Returns:** true if the specified object represents an annotation
    that is logically equivalent to this one, otherwise false

## Annotation.hashCode()

```java
int hashCode()
```

Returns the hash code of this annotation.

The hash code of an annotation is the sum of the hash codes
of its members (including those with default values).

The hash code of an annotation member is (127 times the hash code
of the member-name as computed by `String.hashCode()`) XOR
the hash code of the member-value.
The hash code of a member-value depends on its type as defined below:

- The hash code of a primitive value *`v`* is equal to
    `*WrapperType*.valueOf(*v*).hashCode()`, where
    *`WrapperType`* is the wrapper type corresponding
    to the primitive type of *`v`* (`Byte`,
    `Character`, `Double`, `Float`, `Integer`,
    `Long`, `Short`, or `Boolean`).

- The hash code of a string, enum, class, or annotation member-value
    *`v`* is computed as by calling
    `*v*.hashCode()`.  (In the case of annotation
    member values, this is a recursive definition.)

- The hash code of an array member-value is computed by calling
    the appropriate overloading of
    Arrays.hashCode
    on the value.  (There is one overloading for each primitive
    type, and one for object reference types.)

**Returns:** the hash code of this annotation

## Annotation.toString()

```java
String toString()
```

Returns a string representation of this annotation.  The details
of the representation are implementation-dependent, but the following
may be regarded as typical:

```java
  @com.example.Name(first="Duke", middle="of", last="Java")
```

**Returns:** a string representation of this annotation

## Annotation.annotationType()

```java
Class<? extends Annotation> annotationType()
```

Returns the annotation interface of this annotation.

**API note:** Implementation-dependent classes are used to provide
the implementations of annotations. Therefore, calling getClass on an annotation will return an
implementation-dependent class. In contrast, this method will
reliably return the annotation interface of the annotation.

**Returns:** the annotation interface of this annotation

**See also:** Enum#getDeclaringClass
