---
title: "MethodSignature interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/MethodSignature.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodSignature interface (java.lang.classfile)

```java
public sealed interface MethodSignature permits SignaturesImpl.MethodSignatureImpl
```

Models the generic signature of a method or constructor, as defined by JVMS
.

**See also:** Executable

**See also:** SignatureAttribute

**JLS:** 8.4 Method Declarations

**JLS:** 8.8 Constructor Declarations

**jvms:** 4.7.9.1 Signatures

**Since:** 24

## MethodSignature.typeParameters()

```java
List<Signature.TypeParam> typeParameters()
```

**See also:** Executable#getTypeParameters()

**JLS:** 8.4.4 Generic Methods

**JLS:** 8.8.4 Generic Constructors

## MethodSignature.arguments()

```java
List<Signature> arguments()
```

The parameters may differ from those in the method
descriptor because some synthetic or implicit parameters are omitted.

**See also:** Executable#getGenericParameterTypes()

**JLS:** 8.4.1 Formal Parameters

**JLS:** 8.8.1 Formal Parameters

## MethodSignature.result()

```java
Signature result()
```

For
constructors, this returns a signature representing `void`.

**See also:** Method#getGenericReturnType()

**JLS:** 8.4.5 Method Result

## MethodSignature.throwableSignatures()

```java
List<Signature.ThrowableSig> throwableSignatures()
```

**See also:** Executable#getGenericExceptionTypes()

**JLS:** 8.4.6 Method Throws

**JLS:** 8.8.5 Constructor Throws

## MethodSignature.signatureString()

```java
String signatureString()
```

## MethodSignature.of(MethodTypeDesc)

```java
public static MethodSignature of(MethodTypeDesc methodDescriptor)
```

The resulting
signature has no type parameter or exception type declared.

Parameters:

- `methodDescriptor`: the method descriptor

## MethodSignature.of(Signature, Signature...)

```java
public static MethodSignature of(Signature result, Signature... arguments)
```

The parameters may differ from those in the method descriptor because
some synthetic or implicit parameters are omitted.

Parameters:

- `result`: signature for the return type
- `arguments`: signatures for the method parameters

## MethodSignature.of(List<Signature.TypeParam>, List<Signature.ThrowableSig>, Signature, Signature...)

```java
public static MethodSignature of(List<Signature.TypeParam> typeParameters, List<Signature.ThrowableSig> exceptions, Signature result, Signature... arguments)
```

The parameters may differ from those in
the method descriptor because some synthetic or implicit parameters are
omitted.

Parameters:

- `typeParameters`: signatures for the type parameters
- `exceptions`: signatures for the exceptions
- `result`: signature for the return type
- `arguments`: signatures for the method parameters

## MethodSignature.parseFrom(String)

```java
public static MethodSignature parseFrom(String methodSignature)
```

Parses a raw method signature string into a `MethodSignature`.

Parameters:

- `methodSignature`: the raw method signature string

**Returns:** the parsed method signature

Throws:

- `IllegalArgumentException`: if the string is not a valid method signature string
