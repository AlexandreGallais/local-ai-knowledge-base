---
title: "RecordComponent class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/RecordComponent.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RecordComponent class (java.lang.reflect)

```java
public final class RecordComponent implements AnnotatedElement
```

A `RecordComponent` provides information about, and dynamic access to, a
component of a record class.

**See also:** Class#getRecordComponents()

**See also:** java.lang.Record

**JLS:** 8.10 Record Classes

**Since:** 16

## RecordComponent.getName()

```java
public String getName()
```

Returns the name of this record component.

**Returns:** the name of this record component

## RecordComponent.getType()

```java
public Class<?> getType()
```

Returns a `Class` that identifies the declared type for this
record component.

**Returns:** a `Class` identifying the declared type of the component
represented by this record component

## RecordComponent.getGenericSignature()

```java
public String getGenericSignature()
```

Returns a `String` that describes the generic type signature for
this record component.

**Returns:** a `String` that describes the generic type signature for
this record component

**jvms:** 4.7.9.1 Signatures

## RecordComponent.getGenericType()

```java
public Type getGenericType()
```

Returns a `Type` object that represents the declared type for
this record component.

If the declared type of the record component is a parameterized type,
the `Type` object returned reflects the actual type arguments used
in the source code.

If the type of the underlying record component is a type variable or a
parameterized type, it is created. Otherwise, it is resolved.

**Returns:** a `Type` object that represents the declared type for
        this record component

Throws:

- `GenericSignatureFormatError`: if the generic record component signature does not conform to the format specified in *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if the generic type signature of the underlying record component refers to a non-existent type declaration
- `MalformedParameterizedTypeException`: if the generic signature of the underlying record component refers to a parameterized type that cannot be instantiated for any reason

## RecordComponent.getAnnotatedType()

```java
public AnnotatedType getAnnotatedType()
```

Returns an `AnnotatedType` object that represents the use of a type to specify
the declared type of this record component.

**Returns:** an object representing the declared type of this record component

## RecordComponent.getAccessor()

```java
public Method getAccessor()
```

Returns a `Method` that represents the accessor for this record
component.

**Returns:** a `Method` that represents the accessor for this record
component

## RecordComponent.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

Note that any annotation returned by this method is a
declaration annotation.

Throws:

- `NullPointerException`: (inherited documentation)

## RecordComponent.getAnnotations()

```java
public Annotation[] getAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

## RecordComponent.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

Note that any annotations returned by this method are
declaration annotations.

## RecordComponent.toString()

```java
public String toString()
```

Returns a string describing this record component. The format is
the record component type, followed by a space, followed by the name
of the record component.
For example:

```java
   java.lang.String name
   int age
```

**Returns:** a string describing this record component

## RecordComponent.getDeclaringRecord()

```java
public Class<?> getDeclaringRecord()
```

Returns the record class which declares this record component.

**Returns:** The record class declaring this record component.
