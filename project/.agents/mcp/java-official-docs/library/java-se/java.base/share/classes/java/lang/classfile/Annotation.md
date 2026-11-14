---
title: "Annotation interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Annotation.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Annotation interface (java.lang.classfile)

```java
public sealed interface Annotation permits AnnotationImpl
```

Models an `annotation` structure (JVMS ) or part of a `type_annotation` structure (JVMS ). This model indicates the
interface of the annotation and a set of element-value pairs.

This model can reconstruct an annotation, given the location of the modeled
structure in the `class` file and the definition of the annotation
interface.

Two `Annotation` objects should be compared using the equals method.

**API note:** For Java programs, the location of the modeled structure indicates the source code
element or type (JLS ) on which the reconstructed annotation appears,
and the annotation interface definition determines whether the reconstructed annotation has
elements with default values (JLS ), and whether the reconstructed annotation
is a container annotation for multiple annotations (JLS ).

**See also:** java.lang.annotation.Annotation

**See also:** java.lang.reflect.AnnotatedElement Annotations in core reflection

**See also:** TypeAnnotation

**See also:** RuntimeVisibleAnnotationsAttribute

**See also:** RuntimeInvisibleAnnotationsAttribute

**See also:** RuntimeVisibleParameterAnnotationsAttribute

**See also:** RuntimeInvisibleParameterAnnotationsAttribute

**Since:** 24

## Annotation.className()

```java
Utf8Entry className()
```

**See also:** java.lang.annotation.Annotation#annotationType()

## Annotation.classSymbol()

```java
default ClassDesc classSymbol()
```

**See also:** java.lang.annotation.Annotation#annotationType()

## Annotation.elements()

```java
List<AnnotationElement> elements()
```

## Annotation.of(Utf8Entry, List<AnnotationElement>)

```java
static Annotation of(Utf8Entry annotationClass, List<AnnotationElement> elements)
```

Parameters:

- `annotationClass`: the constant pool entry holding the descriptor string of the annotation interface
- `elements`: the element-value pairs of the annotation

## Annotation.of(Utf8Entry, AnnotationElement...)

```java
static Annotation of(Utf8Entry annotationClass, AnnotationElement... elements)
```

Parameters:

- `annotationClass`: the constant pool entry holding the descriptor string of the annotation interface
- `elements`: the element-value pairs of the annotation

## Annotation.of(ClassDesc, List<AnnotationElement>)

```java
static Annotation of(ClassDesc annotationClass, List<AnnotationElement> elements)
```

Parameters:

- `annotationClass`: the descriptor of the annotation interface
- `elements`: the element-value pairs of the annotation

## Annotation.of(ClassDesc, AnnotationElement...)

```java
static Annotation of(ClassDesc annotationClass, AnnotationElement... elements)
```

Parameters:

- `annotationClass`: the descriptor of the annotation interface
- `elements`: the element-value pairs of the annotation
