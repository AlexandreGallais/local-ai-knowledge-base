# MethodType class (java.lang.invoke)

```java
public final class MethodType implements Constable, TypeDescriptor.OfMethod<Class<?>, MethodType>, java.io.Serializable
```

A method type represents the arguments and return type accepted and
returned by a method handle, or the arguments and return type passed
and expected  by a method handle caller.  Method types must be properly
matched between a method handle and all its callers,
and the JVM's operations enforce this matching at, specifically
during calls to {@link MethodHandle#invokeExact MethodHandle.invokeExact}
and {@link MethodHandle#invoke MethodHandle.invoke}, and during execution
of {@code invokedynamic} instructions.
<p>
The structure is a return type accompanied by any number of parameter types.
The types (primitive, {@code void}, and reference) are represented by {@link Class} objects.
(For ease of exposition, we treat {@code void} as if it were a type.
In fact, it denotes the absence of a return type.)
<p>
All instances of {@code MethodType} are immutable.
Two instances are completely interchangeable if they compare equal.
Equality depends on pairwise correspondence of the return and parameter types and on nothing else.
<p>
This type can be created only by factory methods.
All factory methods may cache values, though caching is not guaranteed.
Some factory methods are static, while others are virtual methods which
modify precursor method types, e.g., by changing a selected parameter.
<p>
Factory methods which operate on groups of parameter types
are systematically presented in two versions, so that both Java arrays and
Java lists can be used to work with groups of parameter types.
The query methods {@code parameterArray} and {@code parameterList}
also provide a choice between arrays and lists.
<p>
{@code MethodType} objects are sometimes derived from bytecode instructions
such as {@code invokedynamic}, specifically from the type descriptor strings associated
with the instructions in a class file's constant pool.
<p>
Like classes and strings, method types can also be represented directly
in a class file's constant pool as constants.
A method type may be loaded by an {@code ldc} instruction which refers
to a suitable {@code CONSTANT_MethodType} constant pool entry.
The entry refers to a {@code CONSTANT_Utf8} spelling for the descriptor string.
(For full details on method type constants, see sections {@jvms
4.4.8} and {@jvms 5.4.3.5} of the Java Virtual Machine
Specification.)
<p>
When the JVM materializes a {@code MethodType} from a descriptor string,
all classes named in the descriptor must be accessible, and will be loaded.
(But the classes need not be initialized, as is the case with a {@code CONSTANT_Class}.)
This loading may occur at any time before the {@code MethodType} object is first derived.
<p>
<b><a id="descriptor">Nominal Descriptors</a></b>
<p>
A {@code MethodType} can be described in {@linkplain MethodTypeDesc nominal form}
if and only if all of the parameter types and return type can be described
with a {@link Class#describeConstable() nominal descriptor} represented by
{@link ClassDesc}.  If a method type can be described nominally, then:
<ul>
<li>The method type has a {@link MethodTypeDesc nominal descriptor}
    returned by {@link #describeConstable() MethodType::describeConstable}.</li>
<li>The descriptor string returned by
    {@link #descriptorString() MethodType::descriptorString} or
    {@link #toMethodDescriptorString() MethodType::toMethodDescriptorString}
    for the method type is a method descriptor (JVMS {@jvms 4.3.3}).</li>
</ul>
<p>
If any of the parameter types or return type cannot be described
nominally, i.e. {@link Class#describeConstable() Class::describeConstable}
returns an empty optional for that type,
then the method type cannot be described nominally:
<ul>
<li>The method type has no {@link MethodTypeDesc nominal descriptor} and
    {@link #describeConstable() MethodType::describeConstable} returns
    an empty optional.</li>
<li>The descriptor string returned by
    {@link #descriptorString() MethodType::descriptorString} or
    {@link #toMethodDescriptorString() MethodType::toMethodDescriptorString}
    for the method type is not a type descriptor.</li>
</ul>

@author John Rose, JSR 292 EG
@since 1.7

## MethodType.MAX_JVM_ARITY

```java
/*non-public*/ static final int MAX_JVM_ARITY
```

This number, mandated by the JVM spec as 255,
 is the maximum number of <em>slots</em>
 that any Java method can receive in its argument list.
 It limits both JVM signatures and method type objects.
 The longest possible invocation will look like
 {@code staticMethod(arg1, arg2, ..., arg255)} or
 {@code x.virtualMethod(arg1, arg2, ..., arg254)}.

## MethodType.MAX_MH_ARITY

```java
/*non-public*/ static final int MAX_MH_ARITY
```

This number is the maximum arity of a method handle, 254.
 It is derived from the absolute JVM-imposed arity by subtracting one,
 which is the slot occupied by the method handle itself at the
 beginning of the argument list used to invoke the method handle.
 The longest possible invocation will look like
 {@code mh.invoke(arg1, arg2, ..., arg254)}.

## MethodType.MAX_MH_INVOKER_ARITY

```java
/*non-public*/ static final int MAX_MH_INVOKER_ARITY
```

This number is the maximum arity of a method handle invoker, 253.
 It is derived from the absolute JVM-imposed arity by subtracting two,
 which are the slots occupied by invoke method handle, and the
 target method handle, which are both at the beginning of the argument
 list used to invoke the target method handle.
 The longest possible invocation will look like
 {@code invokermh.invoke(targetmh, arg1, arg2, ..., arg253)}.

## MethodType.methodType(Class<?>, Class<?>[])

```java
public static MethodType methodType(Class<?> rtype, Class<?>[] ptypes)
```

Finds or creates an instance of the given method type.
@param rtype  the return type
@param ptypes the parameter types
@return a method type with the given components
@throws NullPointerException if {@code rtype} or {@code ptypes} or any element of {@code ptypes} is null
@throws IllegalArgumentException if any element of {@code ptypes} is {@code void.class}

## MethodType.methodType(Class<?>, List<Class<?>>)

```java
public static MethodType methodType(Class<?> rtype, List<Class<?>> ptypes)
```

Finds or creates a method type with the given components.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param rtype  the return type
@param ptypes the parameter types
@return a method type with the given components
@throws NullPointerException if {@code rtype} or {@code ptypes} or any element of {@code ptypes} is null
@throws IllegalArgumentException if any element of {@code ptypes} is {@code void.class}

## MethodType.methodType(Class<?>, Class<?>, Class<?>...)

```java
public static MethodType methodType(Class<?> rtype, Class<?> ptype0, Class<?>... ptypes)
```

Finds or creates a method type with the given components.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
The leading parameter type is prepended to the remaining array.
@param rtype  the return type
@param ptype0 the first parameter type
@param ptypes the remaining parameter types
@return a method type with the given components
@throws NullPointerException if {@code rtype} or {@code ptype0} or {@code ptypes} or any element of {@code ptypes} is null
@throws IllegalArgumentException if {@code ptype0} or {@code ptypes} or any element of {@code ptypes} is {@code void.class}

## MethodType.methodType(Class<?>)

```java
public static MethodType methodType(Class<?> rtype)
```

Finds or creates a method type with the given components.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
The resulting method has no parameter types.
@param rtype  the return type
@return a method type with the given return value
@throws NullPointerException if {@code rtype} is null

## MethodType.methodType(Class<?>, Class<?>)

```java
public static MethodType methodType(Class<?> rtype, Class<?> ptype0)
```

Finds or creates a method type with the given components.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
The resulting method has the single given parameter type.
@param rtype  the return type
@param ptype0 the parameter type
@return a method type with the given return value and parameter type
@throws NullPointerException if {@code rtype} or {@code ptype0} is null
@throws IllegalArgumentException if {@code ptype0} is {@code void.class}

## MethodType.methodType(Class<?>, MethodType)

```java
public static MethodType methodType(Class<?> rtype, MethodType ptypes)
```

Finds or creates a method type with the given components.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
The resulting method has the same parameter types as {@code ptypes},
and the specified return type.
@param rtype  the return type
@param ptypes the method type which supplies the parameter types
@return a method type with the given components
@throws NullPointerException if {@code rtype} or {@code ptypes} is null

## MethodType.genericMethodType(int, boolean)

```java
public static MethodType genericMethodType(int objectArgCount, boolean finalArray)
```

Finds or creates a method type whose components are {@code Object} with an optional trailing {@code Object[]} array.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
All parameters and the return type will be {@code Object},
except the final array parameter if any, which will be {@code Object[]}.
@param objectArgCount number of parameters (excluding the final array parameter if any)
@param finalArray whether there will be a trailing array parameter, of type {@code Object[]}
@return a generally applicable method type, for all calls of the given fixed argument count and a collected array of further arguments
@throws IllegalArgumentException if {@code objectArgCount} is negative or greater than 255 (or 254, if {@code finalArray} is true)
@see #genericMethodType(int)

## MethodType.genericMethodType(int)

```java
public static MethodType genericMethodType(int objectArgCount)
```

Finds or creates a method type whose components are all {@code Object}.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
All parameters and the return type will be Object.
@param objectArgCount number of parameters
@return a generally applicable method type, for all calls of the given argument count
@throws IllegalArgumentException if {@code objectArgCount} is negative or greater than 255
@see #genericMethodType(int, boolean)

## MethodType.changeParameterType(int, Class<?>)

```java
public MethodType changeParameterType(int num, Class<?> nptype)
```

Finds or creates a method type with a single different parameter type.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param num    the index (zero-based) of the parameter type to change
@param nptype a new parameter type to replace the old one with
@return the same type, except with the selected parameter changed
@throws IndexOutOfBoundsException if {@code num} is not a valid index into {@code parameterArray()}
@throws IllegalArgumentException if {@code nptype} is {@code void.class}
@throws NullPointerException if {@code nptype} is null

## MethodType.insertParameterTypes(int, Class<?>...)

```java
public MethodType insertParameterTypes(int num, Class<?>... ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param num    the position (zero-based) of the inserted parameter type(s)
@param ptypesToInsert zero or more new parameter types to insert into the parameter list
@return the same type, except with the selected parameter(s) inserted
@throws IndexOutOfBoundsException if {@code num} is negative or greater than {@code parameterCount()}
@throws IllegalArgumentException if any element of {@code ptypesToInsert} is {@code void.class}
                                 or if the resulting method type would have more than 255 parameter slots
@throws NullPointerException if {@code ptypesToInsert} or any of its elements is null

## MethodType.appendParameterTypes(Class<?>...)

```java
public MethodType appendParameterTypes(Class<?>... ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param ptypesToInsert zero or more new parameter types to insert after the end of the parameter list
@return the same type, except with the selected parameter(s) appended
@throws IllegalArgumentException if any element of {@code ptypesToInsert} is {@code void.class}
                                 or if the resulting method type would have more than 255 parameter slots
@throws NullPointerException if {@code ptypesToInsert} or any of its elements is null

## MethodType.insertParameterTypes(int, List<Class<?>>)

```java
public MethodType insertParameterTypes(int num, List<Class<?>> ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param num    the position (zero-based) of the inserted parameter type(s)
@param ptypesToInsert zero or more new parameter types to insert into the parameter list
@return the same type, except with the selected parameter(s) inserted
@throws IndexOutOfBoundsException if {@code num} is negative or greater than {@code parameterCount()}
@throws IllegalArgumentException if any element of {@code ptypesToInsert} is {@code void.class}
                                 or if the resulting method type would have more than 255 parameter slots
@throws NullPointerException if {@code ptypesToInsert} or any of its elements is null

## MethodType.appendParameterTypes(List<Class<?>>)

```java
public MethodType appendParameterTypes(List<Class<?>> ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param ptypesToInsert zero or more new parameter types to insert after the end of the parameter list
@return the same type, except with the selected parameter(s) appended
@throws IllegalArgumentException if any element of {@code ptypesToInsert} is {@code void.class}
                                 or if the resulting method type would have more than 255 parameter slots
@throws NullPointerException if {@code ptypesToInsert} or any of its elements is null

## MethodType.replaceParameterTypes(int, int, Class<?>...)

```java
/*non-public*/ MethodType replaceParameterTypes(int start, int end, Class<?>... ptypesToInsert)
```

Finds or creates a method type with modified parameter types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param start  the position (zero-based) of the first replaced parameter type(s)
@param end    the position (zero-based) after the last replaced parameter type(s)
@param ptypesToInsert zero or more new parameter types to insert into the parameter list
@return the same type, except with the selected parameter(s) replaced
@throws IndexOutOfBoundsException if {@code start} is negative or greater than {@code parameterCount()}
                                 or if {@code end} is negative or greater than {@code parameterCount()}
                                 or if {@code start} is greater than {@code end}
@throws IllegalArgumentException if any element of {@code ptypesToInsert} is {@code void.class}
                                 or if the resulting method type would have more than 255 parameter slots
@throws NullPointerException if {@code ptypesToInsert} or any of its elements is null

## MethodType.asSpreaderType(Class<?>, int, int)

```java
/*non-public*/ MethodType asSpreaderType(Class<?> arrayType, int pos, int arrayLength)
```

Replace the last arrayLength parameter types with the component type of arrayType.
@param arrayType any array type
@param pos position at which to spread
@param arrayLength the number of parameter types to change
@return the resulting type

## MethodType.leadingReferenceParameter()

```java
/*non-public*/ Class<?> leadingReferenceParameter()
```

Return the leading parameter type, which must exist and be a reference.
 @return the leading parameter type, after error checks

## MethodType.asCollectorType(Class<?>, int, int)

```java
/*non-public*/ MethodType asCollectorType(Class<?> arrayType, int pos, int arrayLength)
```

Delete the last parameter type and replace it with arrayLength copies of the component type of arrayType.
@param arrayType any array type
@param pos position at which to insert parameters
@param arrayLength the number of parameter types to insert
@return the resulting type

## MethodType.dropParameterTypes(int, int)

```java
public MethodType dropParameterTypes(int start, int end)
```

Finds or creates a method type with some parameter types omitted.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param start  the index (zero-based) of the first parameter type to remove
@param end    the index (greater than {@code start}) of the first parameter type after not to remove
@return the same type, except with the selected parameter(s) removed
@throws IndexOutOfBoundsException if {@code start} is negative or greater than {@code parameterCount()}
                                 or if {@code end} is negative or greater than {@code parameterCount()}
                                 or if {@code start} is greater than {@code end}

## MethodType.changeReturnType(Class<?>)

```java
public MethodType changeReturnType(Class<?> nrtype)
```

Finds or creates a method type with a different return type.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
@param nrtype a return parameter type to replace the old one with
@return the same type, except with the return type change
@throws NullPointerException if {@code nrtype} is null

## MethodType.hasPrimitives()

```java
public boolean hasPrimitives()
```

Reports if this type contains a primitive argument or return value.
The return type {@code void} counts as a primitive.
@return true if any of the types are primitives

## MethodType.hasWrappers()

```java
public boolean hasWrappers()
```

Reports if this type contains a wrapper argument or return value.
Wrappers are types which box primitive values, such as {@link Integer}.
The reference type {@code java.lang.Void} counts as a wrapper,
if it occurs as a return type.
@return true if any of the types are wrappers

## MethodType.erase()

```java
public MethodType erase()
```

Erases all reference types to {@code Object}.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
All primitive types (including {@code void}) will remain unchanged.
@return a version of the original type with all reference types replaced

## MethodType.basicType()

```java
/*non-public*/ MethodType basicType()
```

Erases all reference types to {@code Object}, and all subword types to {@code int}.
This is the reduced type polymorphism used by private methods
such as {@link MethodHandle#invokeBasic invokeBasic}.
@return a version of the original type with all reference and subword types replaced

## MethodType.invokerType()

```java
/*non-public*/ MethodType invokerType()
```

@return a version of the original type with MethodHandle prepended as the first argument

## MethodType.generic()

```java
public MethodType generic()
```

Converts all types, both reference and primitive, to {@code Object}.
Convenience method for {@link #genericMethodType(int) genericMethodType}.
The expression {@code type.wrap().erase()} produces the same value
as {@code type.generic()}.
@return a version of the original type with all types replaced

## MethodType.wrap()

```java
public MethodType wrap()
```

Converts all primitive types to their corresponding wrapper types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
All reference types (including wrapper types) will remain unchanged.
A {@code void} return type is changed to the type {@code java.lang.Void}.
The expression {@code type.wrap().erase()} produces the same value
as {@code type.generic()}.
@return a version of the original type with all primitive types replaced

## MethodType.unwrap()

```java
public MethodType unwrap()
```

Converts all wrapper types to their corresponding primitive types.
Convenience method for {@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
All primitive types (including {@code void}) will remain unchanged.
A return type of {@code java.lang.Void} is changed to {@code void}.
@return a version of the original type with all wrapper types replaced

## MethodType.parameterType(int)

```java
public Class<?> parameterType(int num)
```

Returns the parameter type at the specified index, within this method type.
@param num the index (zero-based) of the desired parameter type
@return the selected parameter type
@throws IndexOutOfBoundsException if {@code num} is not a valid index into {@code parameterArray()}

## MethodType.parameterCount()

```java
public int parameterCount()
```

Returns the number of parameter types in this method type.
@return the number of parameter types

## MethodType.returnType()

```java
public Class<?> returnType()
```

Returns the return type of this method type.
@return the return type

## MethodType.parameterList()

```java
public List<Class<?>> parameterList()
```

Presents the parameter types as a list (a convenience method).
The list will be immutable.
@return the parameter types (as an immutable list)

## MethodType.lastParameterType()

```java
public Class<?> lastParameterType()
```

Returns the last parameter type of this method type.
If this type has no parameters, the sentinel value
{@code void.class} is returned instead.
@apiNote
<p>
The sentinel value is chosen so that reflective queries can be
made directly against the result value.
The sentinel value cannot be confused with a real parameter,
since {@code void} is never acceptable as a parameter type.
For variable arity invocation modes, the expression
{@link Class#getComponentType lastParameterType().getComponentType()}
is useful to query the type of the "varargs" parameter.
@return the last parameter type if any, else {@code void.class}
@since 10

## MethodType.parameterArray()

```java
public Class<?>[] parameterArray()
```

Presents the parameter types as an array (a convenience method).
Changes to the array will not result in changes to the type.
@return the parameter types (as a fresh copy if necessary)

## MethodType.equals(Object)

```java
public boolean equals(Object x)
```

Compares the specified object with this type for equality.
That is, it returns {@code true} if and only if the specified object
is also a method type with exactly the same parameters and return type.
@param x object to compare
@see Object#equals(Object)

## MethodType.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this method type.
It is defined to be the same as the hashcode of a List
whose elements are the return type followed by the
parameter types.
@return the hash code value for this method type
@see Object#hashCode()
@see #equals(Object)
@see List#hashCode()

## MethodType.toString()

```java
public String toString()
```

Returns a string representation of the method type,
of the form {@code "(PT0,PT1...)RT"}.
The string representation of a method type is a
parenthesis enclosed, comma separated list of type names,
followed immediately by the return type.
<p>
Each type is represented by its
{@link java.lang.Class#getSimpleName simple name}.

## MethodType.effectivelyIdenticalParameters(int, List<Class<?>>)

```java
/*non-public*/ boolean effectivelyIdenticalParameters(int skipPos, List<Class<?>> fullList)
```

True if my parameter list is effectively identical to the given full list,
 after skipping the given number of my own initial parameters.
 In other words, after disregarding {@code skipPos} parameters,
 my remaining parameter list is no longer than the {@code fullList}, and
 is equal to the same-length initial sublist of {@code fullList}.

## MethodType.isViewableAs(MethodType, boolean)

```java
/*non-public*/ boolean isViewableAs(MethodType newType, boolean keepInterfaces)
```

True if the old return type can always be viewed (w/o casting) under new return type,
 and the new parameters can be viewed (w/o casting) under the old parameter types.

## MethodType.explicitCastEquivalentToAsType(MethodType)

```java
/*non-public*/ boolean explicitCastEquivalentToAsType(MethodType newType)
```

Returns true if MHs.explicitCastArguments produces the same result as MH.asType.
 If the type conversion is impossible for either, the result should be false.

## MethodType.parameterSlotCount()

```java
/*non-public*/ int parameterSlotCount()
```

Reports the number of JVM stack slots required to invoke a method
of this type.  Note that (for historical reasons) the JVM requires
a second stack slot to pass long and double arguments.
So this method returns {@link #parameterCount() parameterCount} plus the
number of long and double parameters (if any).
<p>
This method is included for the benefit of applications that must
generate bytecodes that process method handles and invokedynamic.
@return the number of JVM stack slots for this type's parameters

## MethodType.fromMethodDescriptorString(String, ClassLoader)

```java
public static MethodType fromMethodDescriptorString(String descriptor, ClassLoader loader) throws IllegalArgumentException, TypeNotPresentException
```

Finds or creates an instance of a method type of the given method descriptor
(JVMS {@jvms 4.3.3}). This method is a convenience method for
{@link #methodType(java.lang.Class, java.lang.Class[]) methodType}.
Any class or interface name embedded in the descriptor string will be
resolved by the given loader (or if it is {@code null}, on the system class loader).

@apiNote
It is possible to encounter method types that have valid descriptors but
cannot be constructed by this method, because their component types are
not visible from a common class loader.
<p>
This method is included for the benefit of applications that must
generate bytecodes that process method handles and {@code invokedynamic}.
@param descriptor a method descriptor string
@param loader the class loader in which to look up the types
@return a method type of the given method descriptor
@throws NullPointerException if the string is {@code null}
@throws IllegalArgumentException if the string is not a method descriptor
@throws TypeNotPresentException if a named type cannot be found
@jvms 4.3.3 Method Descriptors

## MethodType.toMethodDescriptorString()

```java
public String toMethodDescriptorString()
```

{@return the descriptor string for this method type} This method
is equivalent to calling {@link #descriptorString() MethodType::descriptorString}.

@apiNote
This is not a strict inverse of {@link #fromMethodDescriptorString
fromMethodDescriptorString} which requires a method type descriptor
(JVMS {@jvms 4.3.3}) and a suitable class loader argument.
Two distinct {@code MethodType} objects can have an identical
descriptor string as distinct classes can have the same name
but different class loaders.

<p>
This method is included for the benefit of applications that must
generate bytecodes that process method handles and {@code invokedynamic}.
@jvms 4.3.3 Method Descriptors
@see <a href="#descriptor">Nominal Descriptor for {@code MethodType}</a>

## MethodType.descriptorString()

```java
public String descriptorString()
```

{@return the descriptor string for this method type}

<p>
If this method type can be {@linkplain ##descriptor described nominally},
then the result is a method type descriptor (JVMS {@jvms 4.3.3}).
{@link MethodTypeDesc MethodTypeDesc} for this method type
can be produced by calling {@link MethodTypeDesc#ofDescriptor(String)
MethodTypeDesc::ofDescriptor} with the result descriptor string.
<p>
If this method type cannot be {@linkplain ##descriptor described nominally}
and the result is a string of the form:
<blockquote>{@code "(<parameter-descriptors>)<return-descriptor>"}</blockquote>
where {@code <parameter-descriptors>} is the concatenation of the
{@linkplain Class#descriptorString() descriptor string} of all
of the parameter types and the {@linkplain Class#descriptorString() descriptor string}
of the return type. No {@link java.lang.constant.MethodTypeDesc MethodTypeDesc}
can be produced from the result string.

@since 12
@jvms 4.3.3 Method Descriptors
@see <a href="#descriptor">Nominal Descriptor for {@code MethodType}</a>

## MethodType.describeConstable()

```java
public Optional<MethodTypeDesc> describeConstable()
```

Returns a nominal descriptor for this instance, if one can be
constructed, or an empty {@link Optional} if one cannot be.

@return An {@link Optional} containing the resulting nominal descriptor,
or an empty {@link Optional} if one cannot be constructed.
@since 12
@see <a href="#descriptor">Nominal Descriptor for {@code MethodType}</a>