# SignatureAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface SignatureAttribute extends Attribute<SignatureAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundSignatureAttribute, UnboundAttribute.UnboundSignatureAttribute
```

Models the {@link Attributes#signature() Signature} attribute (JVMS {@jvms
4.7.9}), which indicates the generic signature of this structure.
<p>
This attribute appears on classes, fields, methods, and record components,
and does not permit {@linkplain AttributeMapper#allowMultiple multiple
instances} in one structure.  It has a data dependency on the {@linkplain
AttributeMapper.AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 5.0, major
version {@value ClassFile#JAVA_5_VERSION}.

@see Signature
@see ClassSignature
@see MethodSignature
@jvms 4.7.9 The {@code Signature} Attribute
@since 24

## SignatureAttribute.signature()

```java
Utf8Entry signature()
```

{@return the signature string for the class, method, field, or record
component}  It is a class signature string if this attribute is on a
class, a method signature string if this attribute is on a method, or
a field signature string if this attribute is on a field or a record
component.

@jvms 4.7.9.1 Signatures

## SignatureAttribute.asClassSignature()

```java
default ClassSignature asClassSignature()
```

Parses the signature string as a class signature.

@return the class signature
@throws IllegalArgumentException if the signature string is not a valid
        class signature string

## SignatureAttribute.asMethodSignature()

```java
default MethodSignature asMethodSignature()
```

Parse the signature string as a method signature.

@return the method signature
@throws IllegalArgumentException if the signature string is not a valid
        method signature string

## SignatureAttribute.asTypeSignature()

```java
default Signature asTypeSignature()
```

Parses the signature string as a Java type signature.

@return the type signature
@throws IllegalArgumentException if the signature string is not a valid
        Java type signature string
@see Field#getGenericType()
@see RecordComponent#getGenericType()

## SignatureAttribute.of(ClassSignature)

```java
static SignatureAttribute of(ClassSignature classSignature)
```

{@return a {@code Signature} attribute for a class}

@param classSignature the class signature

## SignatureAttribute.of(MethodSignature)

```java
static SignatureAttribute of(MethodSignature methodSignature)
```

{@return a {@code Signature} attribute for a method}

@param methodSignature the method signature

## SignatureAttribute.of(Signature)

```java
static SignatureAttribute of(Signature signature)
```

{@return a {@code Signature} attribute for a field or a record component}

@param signature the Java type signature

## SignatureAttribute.of(Utf8Entry)

```java
static SignatureAttribute of(Utf8Entry signature)
```

{@return a {@code Signature} attribute}

@param signature the signature string