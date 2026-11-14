---
title: "ClassSignature interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassSignature.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassSignature interface (java.lang.classfile)

```java
public sealed interface ClassSignature permits SignaturesImpl.ClassSignatureImpl
```

Models the generic signature of a class or interface, as defined by JVMS
.

**See also:** Class

**See also:** SignatureAttribute

**JLS:** 8.1 Class Declarations

**JLS:** 9.1 Interface Declarations

**jvms:** 4.7.9.1 Signatures

**Since:** 24

## ClassSignature.typeParameters()

```java
List<Signature.TypeParam> typeParameters()
```

**See also:** Class#getTypeParameters()

**JLS:** 8.1.2 Generic Classes and Type Parameters

**JLS:** 9.1.2 Generic Interfaces and Type Parameters

## ClassSignature.superclassSignature()

```java
Signature.ClassTypeSig superclassSignature()
```

Interfaces return a signature representing the `Object` class.

**See also:** Class#getGenericSuperclass()

**JLS:** 8.1.4 Superclasses and Subclasses

## ClassSignature.superinterfaceSignatures()

```java
List<Signature.ClassTypeSig> superinterfaceSignatures()
```

**See also:** Class#getGenericInterfaces()

**JLS:** 8.1.5 Superinterfaces

**JLS:** 9.1.3 Superinterfaces and Subinterfaces

## ClassSignature.signatureString()

```java
String signatureString()
```

## ClassSignature.of(Signature.ClassTypeSig, Signature.ClassTypeSig...)

```java
public static ClassSignature of(Signature.ClassTypeSig superclassSignature, Signature.ClassTypeSig... superinterfaceSignatures)
```

Parameters:

- `superclassSignature`: the superclass
- `superinterfaceSignatures`: the interfaces

## ClassSignature.of(List<Signature.TypeParam>, Signature.ClassTypeSig, Signature.ClassTypeSig...)

```java
public static ClassSignature of(List<Signature.TypeParam> typeParameters, Signature.ClassTypeSig superclassSignature, Signature.ClassTypeSig... superinterfaceSignatures)
```

Parameters:

- `typeParameters`: the type parameters, may be empty
- `superclassSignature`: the superclass
- `superinterfaceSignatures`: the interfaces

## ClassSignature.parseFrom(String)

```java
public static ClassSignature parseFrom(String classSignature)
```

Parses a raw class signature string into a `Signature`.

Parameters:

- `classSignature`: the raw class signature string

**Returns:** class signature

Throws:

- `IllegalArgumentException`: if the string is not a valid class signature string
