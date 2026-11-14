# Signature interface (java.lang.classfile)

```java
public sealed interface Signature
```

Models generic Java type signatures, as defined in JVMS {@jvms 4.7.9.1}.

@see Type
@see SignatureAttribute
@jls 4.1 The Kinds of Types and Values
@jvms 4.7.9.1 Signatures
@sealedGraph
@since 24

## Signature.signatureString()

```java
String signatureString()
```

{@return the raw signature string}

## Signature.parseFrom(String)

```java
public static Signature parseFrom(String javaTypeSignature)
```

Parses a Java type signature from a raw string.

@param javaTypeSignature raw Java type signature string
@return a Java type signature
@throws IllegalArgumentException if the string is not a valid Java type
        signature string

## Signature.of(ClassDesc)

```java
public static Signature of(ClassDesc classDesc)
```

{@return a Java type signature from a field descriptor}  The returned
signature represents a reifiable type (JLS {@jls 4.7}).

@param classDesc the symbolic description of the Java type

## Signature.baseType()

```java
char baseType()
```

{@return the single-letter descriptor for the base type}

## Signature.of(ClassDesc)

```java
public static BaseTypeSig of(ClassDesc classDesc)
```

{@return the signature of a primitive type or void}
@param classDesc a symbolic descriptor for the base type, must correspond
                 to a primitive type
@throws IllegalArgumentException if the {@code classDesc} is not
        primitive

## Signature.of(char)

```java
public static BaseTypeSig of(char baseType)
```

{@return the signature of a primitive type or void}
@param baseType the single-letter descriptor for the base type
@throws IllegalArgumentException if the {@code baseType} is not a
        valid descriptor character for a primitive type or void

## Signature.outerType()

```java
Optional<ClassTypeSig> outerType()
```

{@return the signature of the class that this class is a member of,
only if this is a member class}  Note that the outer class may be
absent if it is not a parameterized type.

@jls 4.5 Parameterized Types

## Signature.className()

```java
String className()
```

{@return the class or interface name; includes the {@linkplain
ClassEntry##internalname slash-separated} package name if there is no
outer type}

## Signature.classDesc()

```java
default ClassDesc classDesc()
```

{@return this class or interface, as a symbolic descriptor}

## Signature.typeArgs()

```java
List<TypeArg> typeArgs()
```

{@return the type arguments of this class or interface}
Note that the outer type may have more type arguments.

@jls 4.5 Parameterized Types

## Signature.of(ClassDesc, TypeArg...)

```java
public static ClassTypeSig of(ClassDesc className, TypeArg... typeArgs)
```

{@return a class or interface signature without an outer type}

@param className the name of the class or interface
@param typeArgs the type arguments
@throws IllegalArgumentException if {@code className} does not
        represent a class or interface

## Signature.of(ClassTypeSig, ClassDesc, TypeArg...)

```java
public static ClassTypeSig of(ClassTypeSig outerType, ClassDesc className, TypeArg... typeArgs)
```

{@return a class or interface signature}

@param outerType signature of the outer type, may be {@code null}
@param className the name of this class or interface
@param typeArgs the type arguments
@throws IllegalArgumentException if {@code className} does not
        represent a class or interface

## Signature.of(String, TypeArg...)

```java
public static ClassTypeSig of(String className, TypeArg... typeArgs)
```

{@return a class or interface signature without an outer type}

@param className the name of the class or interface
@param typeArgs the type arguments

## Signature.of(ClassTypeSig, String, TypeArg...)

```java
public static ClassTypeSig of(ClassTypeSig outerType, String className, TypeArg... typeArgs)
```

{@return a class type signature}

@param outerType signature of the outer type, may be {@code null}
@param className the name of this class or interface
@param typeArgs the type arguments

## Signature.indicator

```java
NONE, /** * Upper-bound indicator
```

No wildcard (empty), an exact type.  Also known as
{@index invariant}.  This is the direct use of a
reference type in Java programs.

@see Type

## Signature.indicator

```java
EXTENDS, /** * Lower-bound indicator
```

Upper-bound indicator {@code +}.  Also known as
{@index covariant}.  This is the {@code ? extends}
prefix in Java programs.

@see WildcardType#getUpperBounds()

## Signature.SUPER

```java
SUPER
```

Lower-bound indicator {@code -}.  Also known as
{@index contravariant}.  This is the {@code ? super}
prefix in Java programs.

@see WildcardType#getLowerBounds()

## Signature.wildcardIndicator()

```java
WildcardIndicator wildcardIndicator()
```

{@return the kind of wildcard}

## Signature.boundType()

```java
RefTypeSig boundType()
```

{@return the signature of the type bound}

## Signature.of(RefTypeSig)

```java
public static TypeArg.Bounded of(RefTypeSig boundType)
```

{@return a type argument of a reference type}

@param boundType the reference type
@see Bounded.WildcardIndicator#NONE

## Signature.unbounded()

```java
public static TypeArg.Unbounded unbounded()
```

{@return an unbounded wildcard type argument {@code *}}

## Signature.extendsOf(RefTypeSig)

```java
public static TypeArg.Bounded extendsOf(RefTypeSig boundType)
```

{@return an upper-bounded wildcard type argument}

@param boundType the upper bound
@see Bounded.WildcardIndicator#EXTENDS

## Signature.superOf(RefTypeSig)

```java
public static TypeArg.Bounded superOf(RefTypeSig boundType)
```

{@return a lower-bounded wildcard type argument}

@param boundType the lower bound
@see Bounded.WildcardIndicator#SUPER

## Signature.bounded(Bounded.WildcardIndicator, RefTypeSig)

```java
public static TypeArg.Bounded bounded(Bounded.WildcardIndicator wildcard, RefTypeSig boundType)
```

{@return a bounded type argument}

@param wildcard the wildcard indicator
@param boundType the bound type

## Signature.identifier()

```java
String identifier()
```

{@return the name of the type variable}

## Signature.of(String)

```java
public static TypeVarSig of(String identifier)
```

{@return a signature for a type variable}

@param identifier the name of the type variable

## Signature.componentSignature()

```java
Signature componentSignature()
```

{@return the signature of the component type}

## Signature.of(Signature)

```java
public static ArrayTypeSig of(Signature componentSignature)
```

{@return an array type with the given component type}
@param componentSignature the component type

## Signature.of(int, Signature)

```java
public static ArrayTypeSig of(int dims, Signature componentSignature)
```

{@return a signature for an array type}
@param dims the dimension of the array
@param componentSignature the component type
@throws IllegalArgumentException if {@code dims < 1} or the
        resulting array type exceeds 255 dimensions

## Signature.identifier()

```java
String identifier()
```

{@return the name of the type parameter}

## Signature.classBound()

```java
Optional<RefTypeSig> classBound()
```

{@return the class bound of the type parameter}  This may be empty
if this type parameter only has interface bounds.

## Signature.interfaceBounds()

```java
List<RefTypeSig> interfaceBounds()
```

{@return the interface bounds of the type parameter}  This may be
empty.

## Signature.of(String, RefTypeSig, RefTypeSig...)

```java
public static TypeParam of(String identifier, RefTypeSig classBound, RefTypeSig... interfaceBounds)
```

{@return a signature for a type parameter}

@param identifier the name of the type parameter
@param classBound the class bound of the type parameter, may be {@code null}
@param interfaceBounds the interface bounds of the type parameter

## Signature.of(String, Optional<RefTypeSig>, RefTypeSig...)

```java
public static TypeParam of(String identifier, Optional<RefTypeSig> classBound, RefTypeSig... interfaceBounds)
```

{@return a signature for a type parameter}

@param identifier the name of the type parameter
@param classBound the optional class bound of the type parameter
@param interfaceBounds the interface bounds of the type parameter