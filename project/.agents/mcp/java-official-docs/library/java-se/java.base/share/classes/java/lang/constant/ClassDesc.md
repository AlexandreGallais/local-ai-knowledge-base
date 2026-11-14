# ClassDesc interface (java.lang.constant)

```java
public sealed interface ClassDesc extends ConstantDesc, TypeDescriptor.OfField<ClassDesc> permits PrimitiveClassDescImpl, ClassOrInterfaceDescImpl, ArrayClassDescImpl
```

A <a href="package-summary.html#nominal">nominal descriptor</a> for a
{@link Class} constant.

<p>For common system types, including all the primitive types, there are
predefined {@linkplain ClassDesc} constants in {@link ConstantDescs}.
(The {@code java.lang.constant} APIs consider {@code void} to be a primitive type.)
To create a {@linkplain ClassDesc} for a class or interface type, use {@link #of} or
{@link #ofDescriptor(String)}; to create a {@linkplain ClassDesc} for an array
type, use {@link #ofDescriptor(String)}, or first obtain a
{@linkplain ClassDesc} for the component type and then call the {@link #arrayType()}
or {@link #arrayType(int)} methods.

@see ConstantDescs

@since 12

## ClassDesc.of(String)

```java
static ClassDesc of(String name)
```

Returns a {@linkplain ClassDesc} for a class or interface type,
given the name of the class or interface, such as {@code "java.lang.String"}.
(To create a descriptor for an array type, either use {@link #ofDescriptor(String)}
or {@link #arrayType()}; to create a descriptor for a primitive type, use
{@link #ofDescriptor(String)} or use the predefined constants in
{@link ConstantDescs}).

@param name the fully qualified (dot-separated) binary class name
@return a {@linkplain ClassDesc} describing the desired class
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if the name string is not in the
correct format
@see ClassDesc#ofDescriptor(String)
@see ClassDesc#ofInternalName(String)

## ClassDesc.ofInternalName(String)

```java
static ClassDesc ofInternalName(String name)
```

Returns a {@linkplain ClassDesc} for a class or interface type,
given the name of the class or interface in internal form,
such as {@code "java/lang/String"}.

@apiNote
To create a descriptor for an array type, either use {@link #ofDescriptor(String)}
or {@link #arrayType()}; to create a descriptor for a primitive type, use
{@link #ofDescriptor(String)} or use the predefined constants in
{@link ConstantDescs}.

@param name the fully qualified class name, in internal (slash-separated) form
@return a {@linkplain ClassDesc} describing the desired class
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if the name string is not in the
correct format
@jvms 4.2.1 Binary Class and Interface Names
@see ClassDesc#of(String)
@see ClassDesc#ofDescriptor(String)
@since 20

## ClassDesc.of(String, String)

```java
static ClassDesc of(String packageName, String className)
```

Returns a {@linkplain ClassDesc} for a class or interface type,
given a package name and the unqualified (simple) name for the
class or interface.

@param packageName the package name (dot-separated); if the package
                   name is the empty string, the class is considered to
                   be in the unnamed package
@param className the unqualified (simple) class name
@return a {@linkplain ClassDesc} describing the desired class
@throws NullPointerException if any argument is {@code null}
@throws IllegalArgumentException if the package name or class name are
not in the correct format

## ClassDesc.ofDescriptor(String)

```java
static ClassDesc ofDescriptor(String descriptor)
```

Returns a {@linkplain ClassDesc} given a descriptor string for a class,
interface, array, or primitive type.

@apiNote

A field type descriptor string for a non-array type is either
a one-letter code corresponding to a primitive type
({@code "J", "I", "C", "S", "B", "D", "F", "Z", "V"}), or the letter {@code "L"}, followed
by the fully qualified binary name of a class, followed by {@code ";"}.
A field type descriptor for an array type is the character {@code "["}
followed by the field descriptor for the component type.  Examples of
valid type descriptor strings include {@code "Ljava/lang/String;"}, {@code "I"},
{@code "[I"}, {@code "V"}, {@code "[Ljava/lang/String;"}, etc.
See JVMS {@jvms 4.3.2 }("Field Descriptors") for more detail.

@param descriptor a field descriptor string
@return a {@linkplain ClassDesc} describing the desired class
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if the descriptor string is not in the
correct format
@jvms 4.3.2 Field Descriptors
@jvms 4.4.1 The CONSTANT_Class_info Structure
@see ClassDesc#of(String)
@see ClassDesc#ofInternalName(String)

## ClassDesc.arrayType()

```java
ClassDesc arrayType()
```

Returns a {@linkplain ClassDesc} for an array type whose component type
is described by this {@linkplain ClassDesc}.

@return a {@linkplain ClassDesc} describing the array type
@throws IllegalStateException if the resulting {@linkplain
ClassDesc} would have an array rank of greater than 255
@jvms 4.4.1 The CONSTANT_Class_info Structure

## ClassDesc.arrayType(int)

```java
ClassDesc arrayType(int rank)
```

Returns a {@linkplain ClassDesc} for an array type of the specified rank,
whose component type is described by this {@linkplain ClassDesc}.

@param rank the rank of the array
@return a {@linkplain ClassDesc} describing the array type
@throws IllegalArgumentException if the rank is less than or
equal to zero or if the rank of the resulting array type is
greater than 255
@jvms 4.4.1 The CONSTANT_Class_info Structure

## ClassDesc.nested(String)

```java
default ClassDesc nested(String nestedName)
```

Returns a {@linkplain ClassDesc} for a nested class of the class or
interface type described by this {@linkplain ClassDesc}.

@apiNote

Example: If descriptor {@code d} describes the class {@code java.util.Map}, a
descriptor for the class {@code java.util.Map.Entry} could be obtained
by {@code d.nested("Entry")}.

@param nestedName the unqualified name of the nested class
@return a {@linkplain ClassDesc} describing the nested class
@throws NullPointerException if the argument is {@code null}
@throws IllegalStateException if this {@linkplain ClassDesc} does not
describe a class or interface type
@throws IllegalArgumentException if the nested class name is invalid

## ClassDesc.nested(String, String...)

```java
default ClassDesc nested(String firstNestedName, String... moreNestedNames)
```

Returns a {@linkplain ClassDesc} for a nested class of the class or
interface type described by this {@linkplain ClassDesc}.

@param firstNestedName the unqualified name of the first level of nested class
@param moreNestedNames the unqualified name(s) of the remaining levels of
                      nested class
@return a {@linkplain ClassDesc} describing the nested class
@throws NullPointerException if any argument or its contents is {@code null}
@throws IllegalStateException if this {@linkplain ClassDesc} does not
describe a class or interface type
@throws IllegalArgumentException if the nested class name is invalid

## ClassDesc.isArray()

```java
default boolean isArray()
```

Returns whether this {@linkplain ClassDesc} describes an array type.

@return whether this {@linkplain ClassDesc} describes an array type

## ClassDesc.isPrimitive()

```java
default boolean isPrimitive()
```

Returns whether this {@linkplain ClassDesc} describes a primitive type.

@return whether this {@linkplain ClassDesc} describes a primitive type

## ClassDesc.isClassOrInterface()

```java
default boolean isClassOrInterface()
```

Returns whether this {@linkplain ClassDesc} describes a class or interface type.

@return whether this {@linkplain ClassDesc} describes a class or interface type

## ClassDesc.componentType()

```java
default ClassDesc componentType()
```

Returns the component type of this {@linkplain ClassDesc}, if it describes
an array type, or {@code null} otherwise.

@return a {@linkplain ClassDesc} describing the component type, or {@code null}
if this descriptor does not describe an array type

## ClassDesc.packageName()

```java
default String packageName()
```

Returns the package name of this {@linkplain ClassDesc}, if it describes
a class or interface type.

@return the package name, or the empty string if the class is in the
default package, or this {@linkplain ClassDesc} does not describe a class or interface type

## ClassDesc.displayName()

```java
String displayName()
```

{@return a human-readable name for this {@code ClassDesc}}
For primitive types, this method returns the simple name (such as {@code int}).
For class or interface types, this method returns the unqualified class name.
For array types, this method returns the human-readable name of the component
type suffixed with the appropriate number of {@code []} pairs.

## ClassDesc.descriptorString()

```java
String descriptorString()
```

Returns a field type descriptor string for this type

@return the descriptor string
@jvms 4.3.2 Field Descriptors

## ClassDesc.resolveConstantDesc(MethodHandles.Lookup)

```java
Class<?> resolveConstantDesc(MethodHandles.Lookup lookup) throws ReflectiveOperationException
```

@since 21

## ClassDesc.equals(Object)

```java
boolean equals(Object o)
```

Compare the specified object with this descriptor for equality.  Returns
{@code true} if and only if the specified object is also a
{@linkplain ClassDesc} and both describe the same type.

@param o the other object
@return whether this descriptor is equal to the other object