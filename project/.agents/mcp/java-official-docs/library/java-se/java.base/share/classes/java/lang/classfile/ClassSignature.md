# ClassSignature interface (java.lang.classfile)

```java
public sealed interface ClassSignature permits SignaturesImpl.ClassSignatureImpl
```

Models the generic signature of a class or interface, as defined by JVMS
{@jvms 4.7.9.1}.

@see Class
@see SignatureAttribute
@jls 8.1 Class Declarations
@jls 9.1 Interface Declarations
@jvms 4.7.9.1 Signatures
@since 24

## ClassSignature.typeParameters()

```java
List<Signature.TypeParam> typeParameters()
```

{@return the type parameters of this class or interface, may be empty}

@see Class#getTypeParameters()
@jls 8.1.2 Generic Classes and Type Parameters
@jls 9.1.2 Generic Interfaces and Type Parameters

## ClassSignature.superclassSignature()

```java
Signature.ClassTypeSig superclassSignature()
```

{@return the instantiation of the superclass in this signature}
Interfaces return a signature representing the {@link Object} class.

@see Class#getGenericSuperclass()
@jls 8.1.4 Superclasses and Subclasses

## ClassSignature.superinterfaceSignatures()

```java
List<Signature.ClassTypeSig> superinterfaceSignatures()
```

{@return the instantiation of the interfaces in this signature, may be
empty}

@see Class#getGenericInterfaces()
@jls 8.1.5 Superinterfaces
@jls 9.1.3 Superinterfaces and Subinterfaces

## ClassSignature.signatureString()

```java
String signatureString()
```

{@return the raw signature string}

## ClassSignature.of(Signature.ClassTypeSig, Signature.ClassTypeSig...)

```java
public static ClassSignature of(Signature.ClassTypeSig superclassSignature, Signature.ClassTypeSig... superinterfaceSignatures)
```

{@return a class signature with no type parameter declaration}

@param superclassSignature the superclass
@param superinterfaceSignatures the interfaces

## ClassSignature.of(List<Signature.TypeParam>, Signature.ClassTypeSig, Signature.ClassTypeSig...)

```java
public static ClassSignature of(List<Signature.TypeParam> typeParameters, Signature.ClassTypeSig superclassSignature, Signature.ClassTypeSig... superinterfaceSignatures)
```

{@return a class signature}
@param typeParameters the type parameters, may be empty
@param superclassSignature the superclass
@param superinterfaceSignatures the interfaces

## ClassSignature.parseFrom(String)

```java
public static ClassSignature parseFrom(String classSignature)
```

Parses a raw class signature string into a {@linkplain Signature}.

@param classSignature the raw class signature string
@return class signature
@throws IllegalArgumentException if the string is not a valid class signature string