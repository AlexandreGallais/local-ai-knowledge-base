# DynamicCallSiteDesc class (java.lang.constant)

```java
public final class DynamicCallSiteDesc
```

A <a href="package-summary.html#nominal">nominal descriptor</a> for an
{@code invokedynamic} call site.

<p>A {@code DynamicCallSiteDesc} is immutable and its behavior does not
rely on object identity.

@since 12

## DynamicCallSiteDesc.of(DirectMethodHandleDesc, String, MethodTypeDesc, ConstantDesc...)

```java
public static DynamicCallSiteDesc of(DirectMethodHandleDesc bootstrapMethod, String invocationName, MethodTypeDesc invocationType, ConstantDesc... bootstrapArgs)
```

Creates a nominal descriptor for an {@code invokedynamic} call site.

@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the {@code invokedynamic}
@param invocationName The unqualified name that would appear in the {@code NameAndType}
                      operand of the {@code invokedynamic}
@param invocationType a {@link MethodTypeDesc} describing the invocation
                      type that would appear in the {@code NameAndType}
                      operand of the {@code invokedynamic}
@param bootstrapArgs {@link ConstantDesc}s describing the static arguments
                     to the bootstrap, that would appear in the
                     {@code BootstrapMethods} attribute
@return the nominal descriptor
@throws NullPointerException if any parameter or its contents are {@code null}
@throws IllegalArgumentException if the invocation name has the incorrect
format
@jvms 4.2.2 Unqualified Names

## DynamicCallSiteDesc.of(DirectMethodHandleDesc, String, MethodTypeDesc)

```java
public static DynamicCallSiteDesc of(DirectMethodHandleDesc bootstrapMethod, String invocationName, MethodTypeDesc invocationType)
```

Creates a nominal descriptor for an {@code invokedynamic} call site whose
bootstrap method has no static arguments.

@param bootstrapMethod The bootstrap method for the {@code invokedynamic}
@param invocationName The invocationName that would appear in the
{@code NameAndType} operand of the {@code invokedynamic}
@param invocationType The invocation invocationType that would appear
in the {@code NameAndType} operand of the {@code invokedynamic}
@return the nominal descriptor
@throws NullPointerException if any parameter is null
@throws IllegalArgumentException if the invocation name has the incorrect
format

## DynamicCallSiteDesc.of(DirectMethodHandleDesc, MethodTypeDesc)

```java
public static DynamicCallSiteDesc of(DirectMethodHandleDesc bootstrapMethod, MethodTypeDesc invocationType)
```

Creates a nominal descriptor for an {@code invokedynamic} call site whose
bootstrap method has no static arguments and for which the name parameter
is {@link ConstantDescs#DEFAULT_NAME}.

@param bootstrapMethod a {@link DirectMethodHandleDesc} describing the
                       bootstrap method for the {@code invokedynamic}
@param invocationType a {@link MethodTypeDesc} describing the invocation
                      type that would appear in the {@code NameAndType}
                      operand of the {@code invokedynamic}
@return the nominal descriptor
@throws NullPointerException if any parameter is null

## DynamicCallSiteDesc.withArgs(ConstantDesc...)

```java
public DynamicCallSiteDesc withArgs(ConstantDesc... bootstrapArgs)
```

Returns a nominal descriptor for an {@code invokedynamic} call site whose
bootstrap method, name, and invocation type are the same as this one, but
with the specified bootstrap arguments.

@param bootstrapArgs {@link ConstantDesc}s describing the static arguments
                     to the bootstrap, that would appear in the
                     {@code BootstrapMethods} attribute
@return the nominal descriptor
@throws NullPointerException if the argument or its contents are {@code null}

## DynamicCallSiteDesc.withNameAndType(String, MethodTypeDesc)

```java
public DynamicCallSiteDesc withNameAndType(String invocationName, MethodTypeDesc invocationType)
```

Returns a nominal descriptor for an {@code invokedynamic} call site whose
bootstrap and bootstrap arguments are the same as this one, but with the
specified invocationName and invocation invocationType

@param invocationName The unqualified name that would appear in the {@code NameAndType}
                      operand of the {@code invokedynamic}
@param invocationType a {@link MethodTypeDesc} describing the invocation
                      type that would appear in the {@code NameAndType}
                      operand of the {@code invokedynamic}
@return the nominal descriptor
@throws NullPointerException if any parameter is null
@throws IllegalArgumentException if the invocation name has the incorrect
format
@jvms 4.2.2 Unqualified Names

## DynamicCallSiteDesc.invocationName()

```java
public String invocationName()
```

Returns the invocation name that would appear in the {@code NameAndType}
operand of the {@code invokedynamic}.

@return the invocation name

## DynamicCallSiteDesc.invocationType()

```java
public MethodTypeDesc invocationType()
```

Returns a {@link MethodTypeDesc} describing the invocation type that
would appear in the {@code NameAndType} operand of the {@code invokedynamic}.

@return the invocation type

## DynamicCallSiteDesc.bootstrapMethod()

```java
public MethodHandleDesc bootstrapMethod()
```

Returns a {@link MethodHandleDesc} describing the bootstrap method for
the {@code invokedynamic}.

@return the bootstrap method for the {@code invokedynamic}

## DynamicCallSiteDesc.bootstrapArgs()

```java
public ConstantDesc[] bootstrapArgs()
```

Returns {@link ConstantDesc}s describing the bootstrap arguments for the
{@code invokedynamic}. The returned array is always non-null. A zero
length array is returned if this {@linkplain DynamicCallSiteDesc} has no
bootstrap arguments.

@return the bootstrap arguments for the {@code invokedynamic}

## DynamicCallSiteDesc.resolveCallSiteDesc(MethodHandles.Lookup)

```java
public CallSite resolveCallSiteDesc(MethodHandles.Lookup lookup) throws Throwable
```

Reflectively invokes the bootstrap method with the specified arguments,
and return the resulting {@link CallSite}

@param lookup The {@link MethodHandles.Lookup} used to resolve class names
@return the {@link CallSite}
@throws Throwable if any exception is thrown by the bootstrap method

## DynamicCallSiteDesc.equals(Object)

```java
public final boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
{@code true} if and only if the specified object is also a
{@linkplain DynamicCallSiteDesc}, and both descriptors have equal
bootstrap methods, bootstrap argument lists, invocation name, and
invocation type.

@param o the {@code DynamicCallSiteDesc} to compare to this
      {@code DynamicCallSiteDesc}
@return {@code true} if the specified {@code DynamicCallSiteDesc}
     is equal to this {@code DynamicCallSiteDesc}.

## DynamicCallSiteDesc.toString()

```java
public String toString()
```

Returns a compact textual description of this call site description,
including the bootstrap method, the invocation name and type, and
the static bootstrap arguments.

@return A compact textual description of this call site descriptor