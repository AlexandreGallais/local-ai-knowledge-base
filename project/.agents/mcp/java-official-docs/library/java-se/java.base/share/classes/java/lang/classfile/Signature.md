---
title: "Signature interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Signature.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Signature interface (java.lang.classfile)

```java
public sealed interface Signature
```

Models generic Java type signatures, as defined in JVMS .

**See also:** Type

**See also:** SignatureAttribute

**JLS:** 4.1 The Kinds of Types and Values

**jvms:** 4.7.9.1 Signatures

**sealedGraph:**

**Since:** 24

## Signature.signatureString()

```java
String signatureString()
```

## Signature.parseFrom(String)

```java
public static Signature parseFrom(String javaTypeSignature)
```

Parses a Java type signature from a raw string.

Parameters:

- `javaTypeSignature`: raw Java type signature string

**Returns:** a Java type signature

Throws:

- `IllegalArgumentException`: if the string is not a valid Java type signature string

## Signature.of(ClassDesc)

```java
public static Signature of(ClassDesc classDesc)
```

The returned
signature represents a reifiable type (JLS ).

Parameters:

- `classDesc`: the symbolic description of the Java type

## Signature.baseType()

```java
char baseType()
```

## Signature.of(ClassDesc)

```java
public static BaseTypeSig of(ClassDesc classDesc)
```

Parameters:

- `classDesc`: a symbolic descriptor for the base type, must correspond to a primitive type

Throws:

- `IllegalArgumentException`: if the `classDesc` is not primitive

## Signature.of(char)

```java
public static BaseTypeSig of(char baseType)
```

Parameters:

- `baseType`: the single-letter descriptor for the base type

Throws:

- `IllegalArgumentException`: if the `baseType` is not a valid descriptor character for a primitive type or void

## Signature.outerType()

```java
Optional<ClassTypeSig> outerType()
```

Note that the outer class may be
absent if it is not a parameterized type.

**JLS:** 4.5 Parameterized Types

## Signature.className()

```java
String className()
```

## Signature.classDesc()

```java
default ClassDesc classDesc()
```

## Signature.typeArgs()

```java
List<TypeArg> typeArgs()
```

Note that the outer type may have more type arguments.

**JLS:** 4.5 Parameterized Types

## Signature.of(ClassDesc, TypeArg...)

```java
public static ClassTypeSig of(ClassDesc className, TypeArg... typeArgs)
```

Parameters:

- `className`: the name of the class or interface
- `typeArgs`: the type arguments

Throws:

- `IllegalArgumentException`: if `className` does not represent a class or interface

## Signature.of(ClassTypeSig, ClassDesc, TypeArg...)

```java
public static ClassTypeSig of(ClassTypeSig outerType, ClassDesc className, TypeArg... typeArgs)
```

Parameters:

- `outerType`: signature of the outer type, may be `null`
- `className`: the name of this class or interface
- `typeArgs`: the type arguments

Throws:

- `IllegalArgumentException`: if `className` does not represent a class or interface

## Signature.of(String, TypeArg...)

```java
public static ClassTypeSig of(String className, TypeArg... typeArgs)
```

Parameters:

- `className`: the name of the class or interface
- `typeArgs`: the type arguments

## Signature.of(ClassTypeSig, String, TypeArg...)

```java
public static ClassTypeSig of(ClassTypeSig outerType, String className, TypeArg... typeArgs)
```

Parameters:

- `outerType`: signature of the outer type, may be `null`
- `className`: the name of this class or interface
- `typeArgs`: the type arguments

## Signature.indicator

```java
NONE, /** * Upper-bound indicator
```

No wildcard (empty), an exact type.  Also known as
invariant.  This is the direct use of a
reference type in Java programs.

**See also:** Type

## Signature.indicator

```java
EXTENDS, /** * Lower-bound indicator
```

Upper-bound indicator `+`.  Also known as
covariant.  This is the `? extends`
prefix in Java programs.

**See also:** WildcardType#getUpperBounds()

## Signature.SUPER

```java
SUPER
```

Lower-bound indicator `-`.  Also known as
contravariant.  This is the `? super`
prefix in Java programs.

**See also:** WildcardType#getLowerBounds()

## Signature.wildcardIndicator()

```java
WildcardIndicator wildcardIndicator()
```

## Signature.boundType()

```java
RefTypeSig boundType()
```

## Signature.of(RefTypeSig)

```java
public static TypeArg.Bounded of(RefTypeSig boundType)
```

Parameters:

- `boundType`: the reference type

**See also:** Bounded.WildcardIndicator#NONE

## Signature.unbounded()

```java
public static TypeArg.Unbounded unbounded()
```

## Signature.extendsOf(RefTypeSig)

```java
public static TypeArg.Bounded extendsOf(RefTypeSig boundType)
```

Parameters:

- `boundType`: the upper bound

**See also:** Bounded.WildcardIndicator#EXTENDS

## Signature.superOf(RefTypeSig)

```java
public static TypeArg.Bounded superOf(RefTypeSig boundType)
```

Parameters:

- `boundType`: the lower bound

**See also:** Bounded.WildcardIndicator#SUPER

## Signature.bounded(Bounded.WildcardIndicator, RefTypeSig)

```java
public static TypeArg.Bounded bounded(Bounded.WildcardIndicator wildcard, RefTypeSig boundType)
```

Parameters:

- `wildcard`: the wildcard indicator
- `boundType`: the bound type

## Signature.identifier()

```java
String identifier()
```

## Signature.of(String)

```java
public static TypeVarSig of(String identifier)
```

Parameters:

- `identifier`: the name of the type variable

## Signature.componentSignature()

```java
Signature componentSignature()
```

## Signature.of(Signature)

```java
public static ArrayTypeSig of(Signature componentSignature)
```

Parameters:

- `componentSignature`: the component type

## Signature.of(int, Signature)

```java
public static ArrayTypeSig of(int dims, Signature componentSignature)
```

Parameters:

- `dims`: the dimension of the array
- `componentSignature`: the component type

Throws:

- `IllegalArgumentException`: if `dims < 1` or the resulting array type exceeds 255 dimensions

## Signature.identifier()

```java
String identifier()
```

## Signature.classBound()

```java
Optional<RefTypeSig> classBound()
```

This may be empty
if this type parameter only has interface bounds.

## Signature.interfaceBounds()

```java
List<RefTypeSig> interfaceBounds()
```

This may be
empty.

## Signature.of(String, RefTypeSig, RefTypeSig...)

```java
public static TypeParam of(String identifier, RefTypeSig classBound, RefTypeSig... interfaceBounds)
```

Parameters:

- `identifier`: the name of the type parameter
- `classBound`: the class bound of the type parameter, may be `null`
- `interfaceBounds`: the interface bounds of the type parameter

## Signature.of(String, Optional<RefTypeSig>, RefTypeSig...)

```java
public static TypeParam of(String identifier, Optional<RefTypeSig> classBound, RefTypeSig... interfaceBounds)
```

Parameters:

- `identifier`: the name of the type parameter
- `classBound`: the optional class bound of the type parameter
- `interfaceBounds`: the interface bounds of the type parameter
