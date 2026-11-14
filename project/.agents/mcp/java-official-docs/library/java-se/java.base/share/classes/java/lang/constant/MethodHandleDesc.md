# MethodHandleDesc interface (java.lang.constant)

```java
public sealed interface MethodHandleDesc extends ConstantDesc permits AsTypeMethodHandleDesc, DirectMethodHandleDesc
```

A <a href="package-summary.html#nominal">nominal descriptor</a> for a
{@link MethodHandle} constant.

@sealedGraph
@since 12

## MethodHandleDesc.of(DirectMethodHandleDesc.Kind, ClassDesc, String, String)

```java
static DirectMethodHandleDesc of(DirectMethodHandleDesc.Kind kind, ClassDesc owner, String name, String lookupDescriptor)
```

Creates a {@linkplain MethodHandleDesc} corresponding to an invocation of a
declared method, invocation of a constructor, or access to a field.

<p>The lookup descriptor string has the same format as for the various
variants of {@code CONSTANT_MethodHandle_info} and for the lookup
methods on {@link MethodHandles.Lookup}.  For a method or constructor
invocation, it is interpreted as a method type descriptor; for field
access, it is interpreted as a field descriptor.  If {@code kind} is
{@code CONSTRUCTOR}, the {@code name} parameter is ignored and the return
type of the lookup descriptor must be {@code void}.  If {@code kind}
corresponds to a virtual method invocation, the lookup type includes the
method parameters but not the receiver type.

@param kind The kind of method handle to be described
@param owner a {@link ClassDesc} describing the class containing the
             method, constructor, or field
@param name the unqualified name of the method or field (ignored if
            {@code kind} is {@code CONSTRUCTOR})
@param lookupDescriptor a method descriptor string the lookup type,
                        if the request is for a method invocation, or
                        describing the invocation type, if the request is
                        for a field or constructor
@return the {@linkplain MethodHandleDesc}
@throws NullPointerException if any of the non-ignored arguments are null
@throws IllegalArgumentException if the descriptor string is not a valid
method or field descriptor
@jvms 4.4.8 The CONSTANT_MethodHandle_info Structure
@jvms 4.2.2 Unqualified Names
@jvms 4.3.2 Field Descriptors
@jvms 4.3.3 Method Descriptors

## MethodHandleDesc.ofMethod(DirectMethodHandleDesc.Kind, ClassDesc, String, MethodTypeDesc)

```java
static DirectMethodHandleDesc ofMethod(DirectMethodHandleDesc.Kind kind, ClassDesc owner, String name, MethodTypeDesc lookupMethodType)
```

Creates a {@linkplain MethodHandleDesc} corresponding to an invocation of a
declared method or constructor.

<p>The lookup descriptor string has the same format as for the lookup
methods on {@link MethodHandles.Lookup}.  If {@code kind} is
{@code CONSTRUCTOR}, the name is ignored and the return type of the lookup
type must be {@code void}.  If {@code kind} corresponds to a virtual method
invocation, the lookup type includes the method parameters but not the
receiver type.

@param kind The kind of method handle to be described; must be one of
            {@code SPECIAL, VIRTUAL, STATIC, INTERFACE_SPECIAL,
            INTERFACE_VIRTUAL, INTERFACE_STATIC, CONSTRUCTOR}
@param owner a {@link ClassDesc} describing the class containing the
             method or constructor
@param name the unqualified name of the method (ignored if {@code kind}
            is {@code CONSTRUCTOR})
@param lookupMethodType a {@link MethodTypeDesc} describing the lookup type
@return the {@linkplain MethodHandleDesc}
@throws NullPointerException if any non-ignored arguments are null
@throws IllegalArgumentException if the {@code name} has the incorrect
format, or the kind is invalid
@jvms 4.2.2 Unqualified Names

## MethodHandleDesc.ofField(DirectMethodHandleDesc.Kind, ClassDesc, String, ClassDesc)

```java
static DirectMethodHandleDesc ofField(DirectMethodHandleDesc.Kind kind, ClassDesc owner, String fieldName, ClassDesc fieldType)
```

Creates a {@linkplain MethodHandleDesc} corresponding to a method handle
that accesses a field.

@param kind the kind of the method handle to be described; must be one of {@code GETTER},
            {@code SETTER}, {@code STATIC_GETTER}, or {@code STATIC_SETTER}
@param owner a {@link ClassDesc} describing the class containing the field
@param fieldName the unqualified name of the field
@param fieldType a {@link ClassDesc} describing the type of the field
@return the {@linkplain MethodHandleDesc}
@throws NullPointerException if any of the arguments are null
@throws IllegalArgumentException if the {@code kind} is not one of the
valid values or if the field name is not valid
@jvms 4.2.2 Unqualified Names

## MethodHandleDesc.ofConstructor(ClassDesc, ClassDesc...)

```java
static DirectMethodHandleDesc ofConstructor(ClassDesc owner, ClassDesc... paramTypes)
```

Returns a {@linkplain MethodHandleDesc} corresponding to invocation of a constructor

@param owner a {@link ClassDesc} describing the class containing the
             constructor
@param paramTypes {@link ClassDesc}s describing the parameter types of
                  the constructor
@return the {@linkplain MethodHandleDesc}
@throws NullPointerException if any argument or its contents is {@code null}

## MethodHandleDesc.asType(MethodTypeDesc)

```java
default MethodHandleDesc asType(MethodTypeDesc type)
```

Returns a {@linkplain MethodHandleDesc} that describes this method handle
adapted to a different type, as if by {@link MethodHandle#asType(MethodType)}.

@param type a {@link MethodHandleDesc} describing the new method type
@return a {@linkplain MethodHandleDesc} for the adapted method handle
@throws NullPointerException if the argument is {@code null}

## MethodHandleDesc.invocationType()

```java
MethodTypeDesc invocationType()
```

Returns a {@link MethodTypeDesc} describing the invocation type of the
method handle described by this nominal descriptor.  The invocation type
describes the full set of stack values that are consumed by the invocation
(including the receiver, if any).

@return a {@linkplain MethodHandleDesc} describing the method handle type

## MethodHandleDesc.resolveConstantDesc(MethodHandles.Lookup)

```java
MethodHandle resolveConstantDesc(MethodHandles.Lookup lookup) throws ReflectiveOperationException
```

@since 21

## MethodHandleDesc.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
{@code true} if and only if the specified object is also a
{@linkplain MethodHandleDesc}, and both encode the same nominal description
of a method handle.

@param o the other object
@return whether this descriptor is equal to the other object