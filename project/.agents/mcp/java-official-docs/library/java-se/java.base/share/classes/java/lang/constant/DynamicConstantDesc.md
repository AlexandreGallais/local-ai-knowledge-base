# DynamicConstantDesc class (java.lang.constant)

```java
public abstract non-sealed class DynamicConstantDesc<T> implements ConstantDesc
```

A <a href="package-summary.html#nominal">nominal descriptor</a> for a
dynamic constant (one described in the constant pool with
{@code Constant_Dynamic_info}.)

<p>Concrete subtypes of {@linkplain DynamicConstantDesc} should be immutable
and their behavior should not rely on object identity.

@param <T> the type of the dynamic constant

@since 12

## DynamicConstantDesc.DynamicConstantDesc(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc...)

```java
protected DynamicConstantDesc(DirectMethodHandleDesc bootstrapMethod, String constantName, ClassDesc constantType, ConstantDesc... bootstrapArgs)
```

Creates a nominal descriptor for a dynamic constant.

@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the constant
@param constantName The unqualified name that would appear in the {@code NameAndType}
                    operand of the {@code LDC} for this constant
@param constantType a {@link ClassDesc} describing the type
                    that would appear in the {@code NameAndType} operand
                    of the {@code LDC} for this constant
@param bootstrapArgs {@link ConstantDesc}s describing the static arguments
                     to the bootstrap, that would appear in the
                     {@code BootstrapMethods} attribute
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if the {@code name} has the incorrect
format
@jvms 4.2.2 Unqualified Names

## DynamicConstantDesc.ofCanonical(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc[])

```java
public static<T> ConstantDesc ofCanonical(DirectMethodHandleDesc bootstrapMethod, String constantName, ClassDesc constantType, ConstantDesc[] bootstrapArgs)
```

Returns a nominal descriptor for a dynamic constant, transforming it into
a more specific type if the constant bootstrap is a well-known one and a
more specific nominal descriptor type (e.g., ClassDesc) is available.

<p>Classes whose {@link Constable#describeConstable()} method produce
a {@linkplain DynamicConstantDesc} with a well-known bootstrap including
{@link Class} (for instances describing primitive types), {@link Enum},
and {@link VarHandle}.

<p>Bytecode-reading APIs that process the constant pool and wish to expose
entries as {@link ConstantDesc} to their callers should generally use this
method in preference to {@link #ofNamed(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc...)}
because this may result in a more specific type that can be provided to
callers.

@param <T> the type of the dynamic constant
@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the constant
@param constantName The unqualified name that would appear in the {@code NameAndType}
                    operand of the {@code LDC} for this constant
@param constantType a {@link ClassDesc} describing the type
                    that would appear in the {@code NameAndType} operand
                    of the {@code LDC} for this constant
@param bootstrapArgs {@link ConstantDesc}s describing the static arguments
                     to the bootstrap, that would appear in the
                     {@code BootstrapMethods} attribute
@return the nominal descriptor
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if the {@code name} has the incorrect
format
@jvms 4.2.2 Unqualified Names

## DynamicConstantDesc.ofNamed(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc...)

```java
public static<T> DynamicConstantDesc<T> ofNamed(DirectMethodHandleDesc bootstrapMethod, String constantName, ClassDesc constantType, ConstantDesc... bootstrapArgs)
```

Returns a nominal descriptor for a dynamic constant.

@param <T> the type of the dynamic constant
@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the constant
@param constantName The unqualified name that would appear in the {@code NameAndType}
                    operand of the {@code LDC} for this constant
@param constantType a {@link ClassDesc} describing the type
                    that would appear in the {@code NameAndType} operand
                    of the {@code LDC} for this constant
@param bootstrapArgs {@link ConstantDesc}s describing the static arguments
                     to the bootstrap, that would appear in the
                     {@code BootstrapMethods} attribute
@return the nominal descriptor
@throws NullPointerException if any argument is null
@throws IllegalArgumentException if the {@code name} has the incorrect
format
@jvms 4.2.2 Unqualified Names

## DynamicConstantDesc.of(DirectMethodHandleDesc, ConstantDesc...)

```java
public static<T> DynamicConstantDesc<T> of(DirectMethodHandleDesc bootstrapMethod, ConstantDesc... bootstrapArgs)
```

Returns a nominal descriptor for a dynamic constant whose name parameter
is {@link ConstantDescs#DEFAULT_NAME}, and whose type parameter is always
the same as the bootstrap method return type.

@param <T> the type of the dynamic constant
@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the constant
@param bootstrapArgs {@link ConstantDesc}s describing the static arguments
                     to the bootstrap, that would appear in the
                     {@code BootstrapMethods} attribute
@return the nominal descriptor
@throws NullPointerException if any argument is null
@jvms 4.2.2 Unqualified Names

## DynamicConstantDesc.of(DirectMethodHandleDesc)

```java
public static<T> DynamicConstantDesc<T> of(DirectMethodHandleDesc bootstrapMethod)
```

Returns a nominal descriptor for a dynamic constant whose bootstrap has
no static arguments, whose name parameter is {@link ConstantDescs#DEFAULT_NAME},
and whose type parameter is always the same as the bootstrap method return type.

@param <T> the type of the dynamic constant
@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the constant
@return the nominal descriptor
@throws NullPointerException if any argument is null

## DynamicConstantDesc.constantName()

```java
public String constantName()
```

Returns the name that would appear in the {@code NameAndType} operand
of the {@code LDC} for this constant.

@return the constant name

## DynamicConstantDesc.constantType()

```java
public ClassDesc constantType()
```

Returns a {@link ClassDesc} describing the type that would appear in the
{@code NameAndType} operand of the {@code LDC} for this constant.

@return the constant type

## DynamicConstantDesc.bootstrapMethod()

```java
public DirectMethodHandleDesc bootstrapMethod()
```

Returns a {@link MethodHandleDesc} describing the bootstrap method for
this constant.

@return the bootstrap method

## DynamicConstantDesc.bootstrapArgs()

```java
public ConstantDesc[] bootstrapArgs()
```

Returns the bootstrap arguments for this constant.

@return the bootstrap arguments

## DynamicConstantDesc.bootstrapArgsList()

```java
public List<ConstantDesc> bootstrapArgsList()
```

Returns the bootstrap arguments for this constant as an immutable {@link List}.

@return a {@link List} of the bootstrap arguments

## DynamicConstantDesc.equals(Object)

```java
public final boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
{@code true} if and only if the specified object is also a
{@linkplain DynamicConstantDesc}, and both descriptors have equal
bootstrap methods, bootstrap argument lists, constant name, and
constant type.

@param o the {@code DynamicConstantDesc} to compare to this
      {@code DynamicConstantDesc}
@return {@code true} if the specified {@code DynamicConstantDesc}
     is equal to this {@code DynamicConstantDesc}.

## DynamicConstantDesc.toString()

```java
public String toString()
```

Returns a compact textual description of this constant description,
including the bootstrap method, the constant name and type, and
the static bootstrap arguments.

@return A compact textual description of this call site descriptor