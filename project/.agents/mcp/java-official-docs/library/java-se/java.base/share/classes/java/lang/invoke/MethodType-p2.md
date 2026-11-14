---
title: "MethodType class (java.lang.invoke) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodType class (java.lang.invoke) (part 2 of 2)

## MethodType.leadingReferenceParameter()

```java
/*non-public*/ Class<?> leadingReferenceParameter()
```

Return the leading parameter type, which must exist and be a reference.

**Returns:** the leading parameter type, after error checks

## MethodType.asCollectorType(Class<?>, int, int)

```java
/*non-public*/ MethodType asCollectorType(Class<?> arrayType, int pos, int arrayLength)
```

Delete the last parameter type and replace it with arrayLength copies of the component type of arrayType.

Parameters:

- `arrayType`: any array type
- `pos`: position at which to insert parameters
- `arrayLength`: the number of parameter types to insert

**Returns:** the resulting type

## MethodType.dropParameterTypes(int, int)

```java
public MethodType dropParameterTypes(int start, int end)
```

Finds or creates a method type with some parameter types omitted.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `start`: the index (zero-based) of the first parameter type to remove
- `end`: the index (greater than `start`) of the first parameter type after not to remove

**Returns:** the same type, except with the selected parameter(s) removed

Throws:

- `IndexOutOfBoundsException`: if `start` is negative or greater than `parameterCount()` or if `end` is negative or greater than `parameterCount()` or if `start` is greater than `end`

## MethodType.changeReturnType(Class<?>)

```java
public MethodType changeReturnType(Class<?> nrtype)
```

Finds or creates a method type with a different return type.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `nrtype`: a return parameter type to replace the old one with

**Returns:** the same type, except with the return type change

Throws:

- `NullPointerException`: if `nrtype` is null

## MethodType.hasPrimitives()

```java
public boolean hasPrimitives()
```

Reports if this type contains a primitive argument or return value.
The return type `void` counts as a primitive.

**Returns:** true if any of the types are primitives

## MethodType.hasWrappers()

```java
public boolean hasWrappers()
```

Reports if this type contains a wrapper argument or return value.
Wrappers are types which box primitive values, such as `Integer`.
The reference type `java.lang.Void` counts as a wrapper,
if it occurs as a return type.

**Returns:** true if any of the types are wrappers

## MethodType.erase()

```java
public MethodType erase()
```

Erases all reference types to `Object`.
Convenience method for java.lang.Class[]) methodType.
All primitive types (including `void`) will remain unchanged.

**Returns:** a version of the original type with all reference types replaced

## MethodType.basicType()

```java
/*non-public*/ MethodType basicType()
```

Erases all reference types to `Object`, and all subword types to `int`.
This is the reduced type polymorphism used by private methods
such as invokeBasic.

**Returns:** a version of the original type with all reference and subword types replaced

## MethodType.invokerType()

```java
/*non-public*/ MethodType invokerType()
```

**Returns:** a version of the original type with MethodHandle prepended as the first argument

## MethodType.generic()

```java
public MethodType generic()
```

Converts all types, both reference and primitive, to `Object`.
Convenience method for genericMethodType.
The expression `type.wrap().erase()` produces the same value
as `type.generic()`.

**Returns:** a version of the original type with all types replaced

## MethodType.wrap()

```java
public MethodType wrap()
```

Converts all primitive types to their corresponding wrapper types.
Convenience method for java.lang.Class[]) methodType.
All reference types (including wrapper types) will remain unchanged.
A `void` return type is changed to the type `java.lang.Void`.
The expression `type.wrap().erase()` produces the same value
as `type.generic()`.

**Returns:** a version of the original type with all primitive types replaced

## MethodType.unwrap()

```java
public MethodType unwrap()
```

Converts all wrapper types to their corresponding primitive types.
Convenience method for java.lang.Class[]) methodType.
All primitive types (including `void`) will remain unchanged.
A return type of `java.lang.Void` is changed to `void`.

**Returns:** a version of the original type with all wrapper types replaced

## MethodType.parameterType(int)

```java
public Class<?> parameterType(int num)
```

Returns the parameter type at the specified index, within this method type.

Parameters:

- `num`: the index (zero-based) of the desired parameter type

**Returns:** the selected parameter type

Throws:

- `IndexOutOfBoundsException`: if `num` is not a valid index into `parameterArray()`

## MethodType.parameterCount()

```java
public int parameterCount()
```

Returns the number of parameter types in this method type.

**Returns:** the number of parameter types

## MethodType.returnType()

```java
public Class<?> returnType()
```

Returns the return type of this method type.

**Returns:** the return type

## MethodType.parameterList()

```java
public List<Class<?>> parameterList()
```

Presents the parameter types as a list (a convenience method).
The list will be immutable.

**Returns:** the parameter types (as an immutable list)

## MethodType.lastParameterType()

```java
public Class<?> lastParameterType()
```

Returns the last parameter type of this method type.
If this type has no parameters, the sentinel value
`void.class` is returned instead.

**API note:** The sentinel value is chosen so that reflective queries can be
made directly against the result value.
The sentinel value cannot be confused with a real parameter,
since `void` is never acceptable as a parameter type.
For variable arity invocation modes, the expression
lastParameterType().getComponentType()
is useful to query the type of the "varargs" parameter.

**Returns:** the last parameter type if any, else `void.class`

**Since:** 10

## MethodType.parameterArray()

```java
public Class<?>[] parameterArray()
```

Presents the parameter types as an array (a convenience method).
Changes to the array will not result in changes to the type.

**Returns:** the parameter types (as a fresh copy if necessary)

## MethodType.equals(Object)

```java
public boolean equals(Object x)
```

Compares the specified object with this type for equality.
That is, it returns `true` if and only if the specified object
is also a method type with exactly the same parameters and return type.

Parameters:

- `x`: object to compare

**See also:** Object#equals(Object)

## MethodType.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this method type.
It is defined to be the same as the hashcode of a List
whose elements are the return type followed by the
parameter types.

**Returns:** the hash code value for this method type

**See also:** Object#hashCode()

**See also:** #equals(Object)

**See also:** List#hashCode()

## MethodType.toString()

```java
public String toString()
```

Returns a string representation of the method type,
of the form `"(PT0,PT1...)RT"`.
The string representation of a method type is a
parenthesis enclosed, comma separated list of type names,
followed immediately by the return type.

Each type is represented by its
simple name.

## MethodType.effectivelyIdenticalParameters(int, List<Class<?>>)

```java
/*non-public*/ boolean effectivelyIdenticalParameters(int skipPos, List<Class<?>> fullList)
```

True if my parameter list is effectively identical to the given full list,
 after skipping the given number of my own initial parameters.
 In other words, after disregarding `skipPos` parameters,
 my remaining parameter list is no longer than the `fullList`, and
 is equal to the same-length initial sublist of `fullList`.

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
So this method returns parameterCount plus the
number of long and double parameters (if any).

This method is included for the benefit of applications that must
generate bytecodes that process method handles and invokedynamic.

**Returns:** the number of JVM stack slots for this type's parameters

## MethodType.fromMethodDescriptorString(String, ClassLoader)

```java
public static MethodType fromMethodDescriptorString(String descriptor, ClassLoader loader) throws IllegalArgumentException, TypeNotPresentException
```

Finds or creates an instance of a method type of the given method descriptor
(JVMS ). This method is a convenience method for
java.lang.Class[]) methodType.
Any class or interface name embedded in the descriptor string will be
resolved by the given loader (or if it is `null`, on the system class loader).

Parameters:

- `descriptor`: a method descriptor string
- `loader`: the class loader in which to look up the types

**API note:** It is possible to encounter method types that have valid descriptors but
cannot be constructed by this method, because their component types are
not visible from a common class loader.

This method is included for the benefit of applications that must
generate bytecodes that process method handles and `invokedynamic`.

**Returns:** a method type of the given method descriptor

**jvms:** 4.3.3 Method Descriptors

Throws:

- `NullPointerException`: if the string is `null`
- `IllegalArgumentException`: if the string is not a method descriptor
- `TypeNotPresentException`: if a named type cannot be found

## MethodType.toMethodDescriptorString()

```java
public String toMethodDescriptorString()
```

This method
is equivalent to calling MethodType::descriptorString.

**API note:** This is not a strict inverse of fromMethodDescriptorString which requires a method type descriptor
(JVMS ) and a suitable class loader argument.
Two distinct `MethodType` objects can have an identical
descriptor string as distinct classes can have the same name
but different class loaders.

This method is included for the benefit of applications that must
generate bytecodes that process method handles and `invokedynamic`.

**jvms:** 4.3.3 Method Descriptors

**See also:** Nominal Descriptor for `MethodType`

## MethodType.descriptorString()

```java
public String descriptorString()
```

If this method type can be described nominally,
then the result is a method type descriptor (JVMS ).
MethodTypeDesc for this method type
can be produced by calling MethodTypeDesc::ofDescriptor with the result descriptor string.

If this method type cannot be described nominally
and the result is a string of the form:
`"(<parameter-descriptors>)<return-descriptor>"`
where `<parameter-descriptors>` is the concatenation of the
descriptor string of all
of the parameter types and the descriptor string
of the return type. No MethodTypeDesc
can be produced from the result string.

**Since:** 12

**jvms:** 4.3.3 Method Descriptors

**See also:** Nominal Descriptor for `MethodType`

## MethodType.describeConstable()

```java
public Optional<MethodTypeDesc> describeConstable()
```

Returns a nominal descriptor for this instance, if one can be
constructed, or an empty `Optional` if one cannot be.

**Returns:** An `Optional` containing the resulting nominal descriptor,
or an empty `Optional` if one cannot be constructed.

**Since:** 12

**See also:** Nominal Descriptor for `MethodType`
