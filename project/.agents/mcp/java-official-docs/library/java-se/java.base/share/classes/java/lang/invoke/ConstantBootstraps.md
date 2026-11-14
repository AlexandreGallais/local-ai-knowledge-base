# ConstantBootstraps class (java.lang.invoke)

```java
public final class ConstantBootstraps
```

Bootstrap methods for dynamically-computed constants.

<p>The bootstrap methods in this class will throw a
{@code NullPointerException} for any reference argument that is {@code null},
unless the argument is specified to be unused or specified to accept a
{@code null} value.

@since 11

## ConstantBootstraps.nullConstant(MethodHandles.Lookup, String, Class<?>)

```java
public static Object nullConstant(MethodHandles.Lookup lookup, String name, Class<?> type)
```

Returns a {@code null} object reference for the reference type specified
by {@code type}.

@param lookup unused
@param name unused
@param type a reference type
@return a {@code null} value
@throws IllegalArgumentException if {@code type} is not a reference type

## ConstantBootstraps.primitiveClass(MethodHandles.Lookup, String, Class<?>)

```java
public static Class<?> primitiveClass(MethodHandles.Lookup lookup, String name, Class<?> type)
```

Returns a {@link Class} mirror for the primitive type whose type
descriptor is specified by {@code name}.

@param lookup unused
@param name the descriptor (JVMS {@jvms 4.3}) of the desired primitive type
@param type the required result type (must be {@code Class.class})
@return the {@link Class} mirror
@throws IllegalArgumentException if the name is not a descriptor for a
primitive type or the type is not {@code Class.class}

## ConstantBootstraps.enumConstant(MethodHandles.Lookup, String, Class<E>)

```java
public static <E extends Enum<E>> E enumConstant(MethodHandles.Lookup lookup, String name, Class<E> type)
```

Returns an {@code enum} constant of the type specified by {@code type}
with the name specified by {@code name}.

@param lookup the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name the name of the constant to return, which must exactly match
an enum constant in the specified type.
@param type the {@code Class} object describing the enum type for which
a constant is to be returned
@param <E> The enum type for which a constant value is to be returned
@return the enum constant of the specified enum type with the
specified name
@throws IllegalAccessError if the declaring class or the field is not
accessible to the class performing the operation
@throws IllegalArgumentException if the specified enum type has
no constant with the specified name, or the specified
class object does not represent an enum type
@see Enum#valueOf(Class, String)

## ConstantBootstraps.getStaticFinal(MethodHandles.Lookup, String, Class<?>, Class<?>)

```java
public static Object getStaticFinal(MethodHandles.Lookup lookup, String name, Class<?> type, Class<?> declaringClass)
```

Returns the value of a static final field.

@param lookup the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name the name of the field
@param type the type of the field
@param declaringClass the class in which the field is declared
@return the value of the field
@throws IllegalAccessError if the declaring class or the field is not
accessible to the class performing the operation
@throws NoSuchFieldError if the specified field does not exist
@throws IncompatibleClassChangeError if the specified field is not
{@code final}

## ConstantBootstraps.getStaticFinal(MethodHandles.Lookup, String, Class<?>)

```java
public static Object getStaticFinal(MethodHandles.Lookup lookup, String name, Class<?> type)
```

Returns the value of a static final field declared in the class which
is the same as the field's type (or, for primitive-valued fields,
declared in the wrapper class.)  This is a simplified form of
{@link #getStaticFinal(MethodHandles.Lookup, String, Class, Class)}
for the case where a class declares distinguished constant instances of
itself.

@param lookup the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name the name of the field
@param type the type of the field
@return the value of the field
@throws IllegalAccessError if the declaring class or the field is not
accessible to the class performing the operation
@throws NoSuchFieldError if the specified field does not exist
@throws IncompatibleClassChangeError if the specified field is not
{@code final}
@see #getStaticFinal(MethodHandles.Lookup, String, Class, Class)

## ConstantBootstraps.invoke(MethodHandles.Lookup, String, Class<?>, MethodHandle, Object...)

```java
public static Object invoke(MethodHandles.Lookup lookup, String name, Class<?> type, MethodHandle handle, Object... args) throws Throwable
```

Returns the result of invoking a method handle with the provided
arguments.
<p>
This method behaves as if the method handle to be invoked is the result
of adapting the given method handle, via {@link MethodHandle#asType}, to
adjust the return type to the desired type.

@param lookup unused
@param name unused
@param type the desired type of the value to be returned, which must be
compatible with the return type of the method handle
@param handle the method handle to be invoked
@param args the arguments to pass to the method handle, as if with
{@link MethodHandle#invokeWithArguments}.  Each argument may be
{@code null}.
@return the result of invoking the method handle
@throws WrongMethodTypeException if the handle's method type cannot be
adjusted to take the given number of arguments, or if the handle's return
type cannot be adjusted to the desired type
@throws ClassCastException if an argument or the result produced by
invoking the handle cannot be converted by reference casting
@throws Throwable anything thrown by the method handle invocation

## ConstantBootstraps.fieldVarHandle(MethodHandles.Lookup, String, Class<VarHandle>, Class<?>, Class<?>)

```java
public static VarHandle fieldVarHandle(MethodHandles.Lookup lookup, String name, Class<VarHandle> type, Class<?> declaringClass, Class<?> fieldType)
```

Finds a {@link VarHandle} for an instance field.

@param lookup the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name the name of the field
@param type the required result type (must be {@code Class<VarHandle>})
@param declaringClass the class in which the field is declared
@param fieldType the type of the field
@return the {@link VarHandle}
@throws IllegalAccessError if the declaring class or the field is not
accessible to the class performing the operation
@throws NoSuchFieldError if the specified field does not exist
@throws IllegalArgumentException if the type is not {@code VarHandle}

## ConstantBootstraps.staticFieldVarHandle(MethodHandles.Lookup, String, Class<VarHandle>, Class<?>, Class<?>)

```java
public static VarHandle staticFieldVarHandle(MethodHandles.Lookup lookup, String name, Class<VarHandle> type, Class<?> declaringClass, Class<?> fieldType)
```

Finds a {@link VarHandle} for a static field.

@param lookup the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name the name of the field
@param type the required result type (must be {@code Class<VarHandle>})
@param declaringClass the class in which the field is declared
@param fieldType the type of the field
@return the {@link VarHandle}
@throws IllegalAccessError if the declaring class or the field is not
accessible to the class performing the operation
@throws NoSuchFieldError if the specified field does not exist
@throws IllegalArgumentException if the type is not {@code VarHandle}

## ConstantBootstraps.arrayVarHandle(MethodHandles.Lookup, String, Class<VarHandle>, Class<?>)

```java
public static VarHandle arrayVarHandle(MethodHandles.Lookup lookup, String name, Class<VarHandle> type, Class<?> arrayClass)
```

Finds a {@link VarHandle} for an array type.

@param lookup the lookup context describing the class performing the
operation (normally stacked by the JVM)
@param name unused
@param type the required result type (must be {@code Class<VarHandle>})
@param arrayClass the type of the array
@return the {@link VarHandle}
@throws IllegalAccessError if the component type of the array is not
accessible to the class performing the operation
@throws IllegalArgumentException if the type is not {@code VarHandle}

## ConstantBootstraps.explicitCast(MethodHandles.Lookup, String, Class<?>, Object)

```java
public static Object explicitCast(MethodHandles.Lookup lookup, String name, Class<?> dstType, Object value) throws ClassCastException
```

Applies a conversion from a source type to a destination type.
<p>
Given a destination type {@code dstType} and an input
value {@code value}, one of the following will happen:
<ul>
<li>If {@code dstType} is {@code void.class},
    a {@link ClassCastException} is thrown.
<li>If {@code dstType} is {@code Object.class}, {@code value} is returned as is.
</ul>
<p>
Otherwise one of the following conversions is applied to {@code value}:
<ol>
<li>If {@code dstType} is a reference type, a reference cast
    is applied to {@code value} as if by calling {@code dstType.cast(value)}.
<li>If {@code dstType} is a primitive type, then, if the runtime type
    of {@code value} is a primitive wrapper type (such as {@link Integer}),
    a Java unboxing conversion is applied {@jls 5.1.8} followed by a
    Java casting conversion {@jls 5.5} converting either directly to
    {@code dstType}, or, if {@code dstType} is {@code boolean},
    to {@code int}, which is then converted to either {@code true}
    or {@code false} depending on whether the least-significant-bit
    is 1 or 0 respectively. If the runtime type of {@code value} is
    not a primitive wrapper type a {@link ClassCastException} is thrown.
</ol>
<p>
The result is the same as when using the following code:
<blockquote><pre>{@code
MethodHandle id = MethodHandles.identity(dstType);
MethodType mt = MethodType.methodType(dstType, Object.class);
MethodHandle conv = MethodHandles.explicitCastArguments(id, mt);
return conv.invoke(value);
}</pre></blockquote>

@param lookup unused
@param name unused
@param dstType the destination type of the conversion
@param value the value to be converted
@return the converted value
@throws ClassCastException when {@code dstType} is {@code void},
        when a cast per (1) fails, or when {@code dstType} is a primitive type
        and the runtime type of {@code value} is not a primitive wrapper type
        (such as {@link Integer})

@since 15