---
title: "MethodType class (java.lang.invoke) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodType class (java.lang.invoke)

```java
public final class MethodType implements Constable, TypeDescriptor.OfMethod<Class<?>, MethodType>, java.io.Serializable
```

A method type represents the arguments and return type accepted and
returned by a method handle, or the arguments and return type passed
and expected  by a method handle caller.  Method types must be properly
matched between a method handle and all its callers,
and the JVM's operations enforce this matching at, specifically
during calls to MethodHandle.invokeExact
and MethodHandle.invoke, and during execution
of `invokedynamic` instructions.

The structure is a return type accompanied by any number of parameter types.
The types (primitive, `void`, and reference) are represented by `Class` objects.
(For ease of exposition, we treat `void` as if it were a type.
In fact, it denotes the absence of a return type.)

All instances of `MethodType` are immutable.
Two instances are completely interchangeable if they compare equal.
Equality depends on pairwise correspondence of the return and parameter types and on nothing else.

This type can be created only by factory methods.
All factory methods may cache values, though caching is not guaranteed.
Some factory methods are static, while others are virtual methods which
modify precursor method types, e.g., by changing a selected parameter.

Factory methods which operate on groups of parameter types
are systematically presented in two versions, so that both Java arrays and
Java lists can be used to work with groups of parameter types.
The query methods `parameterArray` and `parameterList`
also provide a choice between arrays and lists.

`MethodType` objects are sometimes derived from bytecode instructions
such as `invokedynamic`, specifically from the type descriptor strings associated
with the instructions in a class file's constant pool.

Like classes and strings, method types can also be represented directly
in a class file's constant pool as constants.
A method type may be loaded by an `ldc` instruction which refers
to a suitable `CONSTANT_MethodType` constant pool entry.
The entry refers to a `CONSTANT_Utf8` spelling for the descriptor string.
(For full details on method type constants, see sections  and  of the Java Virtual Machine
Specification.)

When the JVM materializes a `MethodType` from a descriptor string,
all classes named in the descriptor must be accessible, and will be loaded.
(But the classes need not be initialized, as is the case with a `CONSTANT_Class`.)
This loading may occur at any time before the `MethodType` object is first derived.

**Nominal Descriptors**

A `MethodType` can be described in nominal form
if and only if all of the parameter types and return type can be described
with a nominal descriptor represented by
`ClassDesc`.  If a method type can be described nominally, then:

- The method type has a nominal descriptor
    returned by MethodType::describeConstable.

- The descriptor string returned by
    MethodType::descriptorString or
    MethodType::toMethodDescriptorString
    for the method type is a method descriptor (JVMS ).

If any of the parameter types or return type cannot be described
nominally, i.e. Class::describeConstable
returns an empty optional for that type,
then the method type cannot be described nominally:

- The method type has no nominal descriptor and
    MethodType::describeConstable returns
    an empty optional.

- The descriptor string returned by
    MethodType::descriptorString or
    MethodType::toMethodDescriptorString
    for the method type is not a type descriptor.

**Since:** 1.7

## MethodType.MAX_JVM_ARITY

```java
/*non-public*/ static final int MAX_JVM_ARITY
```

This number, mandated by the JVM spec as 255,
 is the maximum number of *slots*
 that any Java method can receive in its argument list.
 It limits both JVM signatures and method type objects.
 The longest possible invocation will look like
 `staticMethod(arg1, arg2, ..., arg255)` or
 `x.virtualMethod(arg1, arg2, ..., arg254)`.

## MethodType.MAX_MH_ARITY

```java
/*non-public*/ static final int MAX_MH_ARITY
```

This number is the maximum arity of a method handle, 254.
 It is derived from the absolute JVM-imposed arity by subtracting one,
 which is the slot occupied by the method handle itself at the
 beginning of the argument list used to invoke the method handle.
 The longest possible invocation will look like
 `mh.invoke(arg1, arg2, ..., arg254)`.

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
 `invokermh.invoke(targetmh, arg1, arg2, ..., arg253)`.

## MethodType.methodType(Class<?>, Class<?>[])

```java
public static MethodType methodType(Class<?> rtype, Class<?>[] ptypes)
```

Finds or creates an instance of the given method type.

Parameters:

- `rtype`: the return type
- `ptypes`: the parameter types

**Returns:** a method type with the given components

Throws:

- `NullPointerException`: if `rtype` or `ptypes` or any element of `ptypes` is null
- `IllegalArgumentException`: if any element of `ptypes` is `void.class`

## MethodType.methodType(Class<?>, List<Class<?>>)

```java
public static MethodType methodType(Class<?> rtype, List<Class<?>> ptypes)
```

Finds or creates a method type with the given components.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `rtype`: the return type
- `ptypes`: the parameter types

**Returns:** a method type with the given components

Throws:

- `NullPointerException`: if `rtype` or `ptypes` or any element of `ptypes` is null
- `IllegalArgumentException`: if any element of `ptypes` is `void.class`

## MethodType.methodType(Class<?>, Class<?>, Class<?>...)

```java
public static MethodType methodType(Class<?> rtype, Class<?> ptype0, Class<?>... ptypes)
```

Finds or creates a method type with the given components.
Convenience method for java.lang.Class[]) methodType.
The leading parameter type is prepended to the remaining array.

Parameters:

- `rtype`: the return type
- `ptype0`: the first parameter type
- `ptypes`: the remaining parameter types

**Returns:** a method type with the given components

Throws:

- `NullPointerException`: if `rtype` or `ptype0` or `ptypes` or any element of `ptypes` is null
- `IllegalArgumentException`: if `ptype0` or `ptypes` or any element of `ptypes` is `void.class`

## MethodType.methodType(Class<?>)

```java
public static MethodType methodType(Class<?> rtype)
```

Finds or creates a method type with the given components.
Convenience method for java.lang.Class[]) methodType.
The resulting method has no parameter types.

Parameters:

- `rtype`: the return type

**Returns:** a method type with the given return value

Throws:

- `NullPointerException`: if `rtype` is null

## MethodType.methodType(Class<?>, Class<?>)

```java
public static MethodType methodType(Class<?> rtype, Class<?> ptype0)
```

Finds or creates a method type with the given components.
Convenience method for java.lang.Class[]) methodType.
The resulting method has the single given parameter type.

Parameters:

- `rtype`: the return type
- `ptype0`: the parameter type

**Returns:** a method type with the given return value and parameter type

Throws:

- `NullPointerException`: if `rtype` or `ptype0` is null
- `IllegalArgumentException`: if `ptype0` is `void.class`

## MethodType.methodType(Class<?>, MethodType)

```java
public static MethodType methodType(Class<?> rtype, MethodType ptypes)
```

Finds or creates a method type with the given components.
Convenience method for java.lang.Class[]) methodType.
The resulting method has the same parameter types as `ptypes`,
and the specified return type.

Parameters:

- `rtype`: the return type
- `ptypes`: the method type which supplies the parameter types

**Returns:** a method type with the given components

Throws:

- `NullPointerException`: if `rtype` or `ptypes` is null

## MethodType.genericMethodType(int, boolean)

```java
public static MethodType genericMethodType(int objectArgCount, boolean finalArray)
```

Finds or creates a method type whose components are `Object` with an optional trailing `Object[]` array.
Convenience method for java.lang.Class[]) methodType.
All parameters and the return type will be `Object`,
except the final array parameter if any, which will be `Object[]`.

Parameters:

- `objectArgCount`: number of parameters (excluding the final array parameter if any)
- `finalArray`: whether there will be a trailing array parameter, of type `Object[]`

**Returns:** a generally applicable method type, for all calls of the given fixed argument count and a collected array of further arguments

**See also:** #genericMethodType(int)

Throws:

- `IllegalArgumentException`: if `objectArgCount` is negative or greater than 255 (or 254, if `finalArray` is true)

## MethodType.genericMethodType(int)

```java
public static MethodType genericMethodType(int objectArgCount)
```

Finds or creates a method type whose components are all `Object`.
Convenience method for java.lang.Class[]) methodType.
All parameters and the return type will be Object.

Parameters:

- `objectArgCount`: number of parameters

**Returns:** a generally applicable method type, for all calls of the given argument count

**See also:** #genericMethodType(int, boolean)

Throws:

- `IllegalArgumentException`: if `objectArgCount` is negative or greater than 255

## MethodType.changeParameterType(int, Class<?>)

```java
public MethodType changeParameterType(int num, Class<?> nptype)
```

Finds or creates a method type with a single different parameter type.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `num`: the index (zero-based) of the parameter type to change
- `nptype`: a new parameter type to replace the old one with

**Returns:** the same type, except with the selected parameter changed

Throws:

- `IndexOutOfBoundsException`: if `num` is not a valid index into `parameterArray()`
- `IllegalArgumentException`: if `nptype` is `void.class`
- `NullPointerException`: if `nptype` is null

## MethodType.insertParameterTypes(int, Class<?>...)

```java
public MethodType insertParameterTypes(int num, Class<?>... ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `num`: the position (zero-based) of the inserted parameter type(s)
- `ptypesToInsert`: zero or more new parameter types to insert into the parameter list

**Returns:** the same type, except with the selected parameter(s) inserted

Throws:

- `IndexOutOfBoundsException`: if `num` is negative or greater than `parameterCount()`
- `IllegalArgumentException`: if any element of `ptypesToInsert` is `void.class` or if the resulting method type would have more than 255 parameter slots
- `NullPointerException`: if `ptypesToInsert` or any of its elements is null

## MethodType.appendParameterTypes(Class<?>...)

```java
public MethodType appendParameterTypes(Class<?>... ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `ptypesToInsert`: zero or more new parameter types to insert after the end of the parameter list

**Returns:** the same type, except with the selected parameter(s) appended

Throws:

- `IllegalArgumentException`: if any element of `ptypesToInsert` is `void.class` or if the resulting method type would have more than 255 parameter slots
- `NullPointerException`: if `ptypesToInsert` or any of its elements is null

## MethodType.insertParameterTypes(int, List<Class<?>>)

```java
public MethodType insertParameterTypes(int num, List<Class<?>> ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `num`: the position (zero-based) of the inserted parameter type(s)
- `ptypesToInsert`: zero or more new parameter types to insert into the parameter list

**Returns:** the same type, except with the selected parameter(s) inserted

Throws:

- `IndexOutOfBoundsException`: if `num` is negative or greater than `parameterCount()`
- `IllegalArgumentException`: if any element of `ptypesToInsert` is `void.class` or if the resulting method type would have more than 255 parameter slots
- `NullPointerException`: if `ptypesToInsert` or any of its elements is null

## MethodType.appendParameterTypes(List<Class<?>>)

```java
public MethodType appendParameterTypes(List<Class<?>> ptypesToInsert)
```

Finds or creates a method type with additional parameter types.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `ptypesToInsert`: zero or more new parameter types to insert after the end of the parameter list

**Returns:** the same type, except with the selected parameter(s) appended

Throws:

- `IllegalArgumentException`: if any element of `ptypesToInsert` is `void.class` or if the resulting method type would have more than 255 parameter slots
- `NullPointerException`: if `ptypesToInsert` or any of its elements is null

## MethodType.replaceParameterTypes(int, int, Class<?>...)

```java
/*non-public*/ MethodType replaceParameterTypes(int start, int end, Class<?>... ptypesToInsert)
```

Finds or creates a method type with modified parameter types.
Convenience method for java.lang.Class[]) methodType.

Parameters:

- `start`: the position (zero-based) of the first replaced parameter type(s)
- `end`: the position (zero-based) after the last replaced parameter type(s)
- `ptypesToInsert`: zero or more new parameter types to insert into the parameter list

**Returns:** the same type, except with the selected parameter(s) replaced

Throws:

- `IndexOutOfBoundsException`: if `start` is negative or greater than `parameterCount()` or if `end` is negative or greater than `parameterCount()` or if `start` is greater than `end`
- `IllegalArgumentException`: if any element of `ptypesToInsert` is `void.class` or if the resulting method type would have more than 255 parameter slots
- `NullPointerException`: if `ptypesToInsert` or any of its elements is null

## MethodType.asSpreaderType(Class<?>, int, int)

```java
/*non-public*/ MethodType asSpreaderType(Class<?> arrayType, int pos, int arrayLength)
```

Replace the last arrayLength parameter types with the component type of arrayType.

Parameters:

- `arrayType`: any array type
- `pos`: position at which to spread
- `arrayLength`: the number of parameter types to change

**Returns:** the resulting type
