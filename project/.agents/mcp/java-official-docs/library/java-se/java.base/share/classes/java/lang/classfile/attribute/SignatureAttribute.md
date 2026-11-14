---
title: "SignatureAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/SignatureAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SignatureAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface SignatureAttribute extends Attribute<SignatureAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundSignatureAttribute, UnboundAttribute.UnboundSignatureAttribute
```

Models the Signature attribute (JVMS ), which indicates the generic signature of this structure.

This attribute appears on classes, fields, methods, and record components,
and does not permit multiple instances in one structure.  It has a data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Signature

**See also:** ClassSignature

**See also:** MethodSignature

**jvms:** 4.7.9 The `Signature` Attribute

**Since:** 24

## SignatureAttribute.signature()

```java
Utf8Entry signature()
```

It is a class signature string if this attribute is on a
class, a method signature string if this attribute is on a method, or
a field signature string if this attribute is on a field or a record
component.

**jvms:** 4.7.9.1 Signatures

## SignatureAttribute.asClassSignature()

```java
default ClassSignature asClassSignature()
```

Parses the signature string as a class signature.

**Returns:** the class signature

Throws:

- `IllegalArgumentException`: if the signature string is not a valid class signature string

## SignatureAttribute.asMethodSignature()

```java
default MethodSignature asMethodSignature()
```

Parse the signature string as a method signature.

**Returns:** the method signature

Throws:

- `IllegalArgumentException`: if the signature string is not a valid method signature string

## SignatureAttribute.asTypeSignature()

```java
default Signature asTypeSignature()
```

Parses the signature string as a Java type signature.

**Returns:** the type signature

**See also:** Field#getGenericType()

**See also:** RecordComponent#getGenericType()

Throws:

- `IllegalArgumentException`: if the signature string is not a valid Java type signature string

## SignatureAttribute.of(ClassSignature)

```java
static SignatureAttribute of(ClassSignature classSignature)
```

Parameters:

- `classSignature`: the class signature

## SignatureAttribute.of(MethodSignature)

```java
static SignatureAttribute of(MethodSignature methodSignature)
```

Parameters:

- `methodSignature`: the method signature

## SignatureAttribute.of(Signature)

```java
static SignatureAttribute of(Signature signature)
```

Parameters:

- `signature`: the Java type signature

## SignatureAttribute.of(Utf8Entry)

```java
static SignatureAttribute of(Utf8Entry signature)
```

Parameters:

- `signature`: the signature string
