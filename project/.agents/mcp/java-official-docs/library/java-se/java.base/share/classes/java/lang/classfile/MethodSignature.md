# MethodSignature interface (java.lang.classfile)

```java
public sealed interface MethodSignature permits SignaturesImpl.MethodSignatureImpl
```

Models the generic signature of a method or constructor, as defined by JVMS
{@jvms 4.7.9.1}.

@see Executable
@see SignatureAttribute
@jls 8.4 Method Declarations
@jls 8.8 Constructor Declarations
@jvms 4.7.9.1 Signatures
@since 24

## MethodSignature.typeParameters()

```java
List<Signature.TypeParam> typeParameters()
```

{@return the type parameters of this method or constructor, may be empty}

@see Executable#getTypeParameters()
@jls 8.4.4 Generic Methods
@jls 8.8.4 Generic Constructors

## MethodSignature.arguments()

```java
List<Signature> arguments()
```

{@return the signatures of the parameters of this method or constructor,
may be empty}  The parameters may differ from those in the method
descriptor because some synthetic or implicit parameters are omitted.

@see Executable#getGenericParameterTypes()
@jls 8.4.1 Formal Parameters
@jls 8.8.1 Formal Parameters

## MethodSignature.result()

```java
Signature result()
```

{@return the signatures of the return value of this method}  For
constructors, this returns a signature representing {@code void}.

@see Method#getGenericReturnType()
@jls 8.4.5 Method Result

## MethodSignature.throwableSignatures()

```java
List<Signature.ThrowableSig> throwableSignatures()
```

{@return the signatures of the exceptions thrown by this method or
constructor}

@see Executable#getGenericExceptionTypes()
@jls 8.4.6 Method Throws
@jls 8.8.5 Constructor Throws

## MethodSignature.signatureString()

```java
String signatureString()
```

{@return the raw signature string}

## MethodSignature.of(MethodTypeDesc)

```java
public static MethodSignature of(MethodTypeDesc methodDescriptor)
```

{@return a method signature for a raw method descriptor}  The resulting
signature has no type parameter or exception type declared.

@param methodDescriptor the method descriptor

## MethodSignature.of(Signature, Signature...)

```java
public static MethodSignature of(Signature result, Signature... arguments)
```

{@return a method signature with no type parameter or exception type}
The parameters may differ from those in the method descriptor because
some synthetic or implicit parameters are omitted.

@param result signature for the return type
@param arguments signatures for the method parameters

## MethodSignature.of(List<Signature.TypeParam>, List<Signature.ThrowableSig>, Signature, Signature...)

```java
public static MethodSignature of(List<Signature.TypeParam> typeParameters, List<Signature.ThrowableSig> exceptions, Signature result, Signature... arguments)
```

{@return a method signature}  The parameters may differ from those in
the method descriptor because some synthetic or implicit parameters are
omitted.

@param typeParameters signatures for the type parameters
@param exceptions signatures for the exceptions
@param result signature for the return type
@param arguments signatures for the method parameters

## MethodSignature.parseFrom(String)

```java
public static MethodSignature parseFrom(String methodSignature)
```

Parses a raw method signature string into a {@code MethodSignature}.

@param methodSignature the raw method signature string
@return the parsed method signature
@throws IllegalArgumentException if the string is not a valid method
        signature string