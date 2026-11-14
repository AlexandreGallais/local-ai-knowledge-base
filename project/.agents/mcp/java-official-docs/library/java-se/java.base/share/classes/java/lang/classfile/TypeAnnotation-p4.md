---
title: "TypeAnnotation interface (java.lang.classfile) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/TypeAnnotation.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeAnnotation interface (java.lang.classfile) (part 4 of 6)

## TypeAnnotation.EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on an exception parameter.

## TypeAnnotation.INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type test.

## TypeAnnotation.NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on an object creation expression.

## TypeAnnotation.CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a constructor reference receiver.

## TypeAnnotation.METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a method reference receiver.

## TypeAnnotation.CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a typecast.

## TypeAnnotation.CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of an object creation expression.

## TypeAnnotation.METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of a method call.

## TypeAnnotation.CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of a constructor reference.

## TypeAnnotation.METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of a method reference.

## TypeAnnotation.targetTypeValue()

```java
public int targetTypeValue()
```

**API note:** `TARGET_`-prefixed constants in `TargetInfo`, such as `TargetInfo.TARGET_CLASS_TYPE_PARAMETER`, describe the possible return
values of this method.

## TypeAnnotation.sizeIfFixed()

```java
public int sizeIfFixed()
```

## TypeAnnotation.targetInfo()

```java
TargetInfo targetInfo()
```

This models the `target_type` and `target_info` items.

## TypeAnnotation.targetPath()

```java
List<TypePathComponent> targetPath()
```

## TypeAnnotation.annotation()

```java
Annotation annotation()
```

This models the interface of the annotation and the set of element-value pairs,
the subset of the `type_annotation` structure that is identical to the
`annotation` structure.

## TypeAnnotation.of(TargetInfo, List<TypePathComponent>, Annotation)

```java
static TypeAnnotation of(TargetInfo targetInfo, List<TypePathComponent> targetPath, Annotation annotation)
```

Parameters:

- `targetInfo`: which type in a declaration or expression is annotated
- `targetPath`: which part of the type is annotated
- `annotation`: the annotation

## TypeAnnotation.TARGET_CLASS_TYPE_PARAMETER

```java
int TARGET_CLASS_TYPE_PARAMETER
```

The value of type annotation target type CLASS_TYPE_PARAMETER.

## TypeAnnotation.TARGET_METHOD_TYPE_PARAMETER

```java
int TARGET_METHOD_TYPE_PARAMETER
```

The value of type annotation target type METHOD_TYPE_PARAMETER.

## TypeAnnotation.TARGET_CLASS_EXTENDS

```java
int TARGET_CLASS_EXTENDS
```

The value of type annotation target type CLASS_EXTENDS.
