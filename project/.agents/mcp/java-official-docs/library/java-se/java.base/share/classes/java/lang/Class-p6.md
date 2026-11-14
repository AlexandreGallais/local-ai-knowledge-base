---
title: "Class class (java.lang) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Class.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Class class (java.lang) (part 6 of 6)

## Class.isNestmateOf(Class<?>)

```java
public boolean isNestmateOf(Class<?> c)
```

Determines if the given `Class` is a nestmate of the
class or interface represented by this `Class` object.
Two classes or interfaces are nestmates
if they have the same nest host.

Parameters:

- `c`: the class to check

**Returns:** `true` if this class and `c` are members of
the same nest; and `false` otherwise.

**Since:** 11

## Class.getNestMembers()

```java
public Class<?>[] getNestMembers()
```

Returns an array containing `Class` objects representing all the
classes and interfaces that are members of the nest to which the class
or interface represented by this `Class` object belongs.

First, this method obtains the nest host,
`H`, of the nest to which the class or interface represented by
this `Class` object belongs. The zeroth element of the returned
array is `H`.

Then, for each class or interface `C` which is recorded by `H`
as being a member of its nest, this method attempts to obtain the `Class`
object for `C` (using the defining class loader of the current `Class` object), and then obtains the
nest host of the nest to which `C` belongs.
The classes and interfaces which are recorded by `H` as being members
of its nest, and for which `H` can be determined as their nest host,
are indicated by subsequent elements of the returned array. The order of
such elements is unspecified. Duplicates are permitted.

If this `Class` object represents a primitive type, an array type,
or `void`, then this method returns a single-element array containing
`this`.

**API note:** The returned array includes only the nest members recorded in the `NestMembers`
attribute, and not any hidden classes that were added to the nest via
boolean, MethodHandles.Lookup.ClassOption...) Lookup::defineHiddenClass.

**Returns:** an array of all classes and interfaces in the same nest as
this class or interface

**Since:** 11

**See also:** #getNestHost()

**jvms:** 4.7.28 The `NestHost` Attribute

**jvms:** 4.7.29 The `NestMembers` Attribute

## Class.descriptorString()

```java
public String descriptorString()
```

Returns the descriptor string of the entity (class, interface, array class,
primitive type, or `void`) represented by this `Class` object.

 If this `Class` object represents a class or interface,
not an array class, then:

-  If the class or interface is not hidden,
     then the result is a field descriptor (JVMS )
     for the class or interface. Calling
     ClassDesc::ofDescriptor
     with the result descriptor string produces a ClassDesc
     describing this class or interface.

-  If the class or interface is hidden,
     then the result is a string of the form:

     `"L" +` *N* `+ "." + <suffix> + ";"`

     where *N* is the binary name
     encoded in internal form indicated by the `class` file passed to
     boolean, MethodHandles.Lookup.ClassOption...) Lookup::defineHiddenClass, and `<suffix>` is an unqualified name.
     A hidden class or interface has no nominal descriptor.
     The result string is not a type descriptor.

 If this `Class` object represents an array class, then
the result is a string consisting of one or more '`[`' characters
representing the depth of the array nesting, followed by the
descriptor string of the element type.

-  If the element type is not a hidden class
or interface, then this array class can be described nominally.
Calling ClassDesc::ofDescriptor
with the result descriptor string produces a ClassDesc
describing this array class.

-  If the element type is a hidden class or
interface, then this array class cannot be described nominally.
The result string is not a type descriptor.

 If this `Class` object represents a primitive type or
`void`, then the result is a field descriptor string which
is a one-letter code corresponding to a primitive type or `void`
(`"B", "C", "D", "F", "I", "J", "S", "Z", "V"`) (JVMS ).

**Returns:** the descriptor string for this `Class` object

**jvms:** 4.3.2 Field Descriptors

**Since:** 12

## Class.componentType()

```java
public Class<?> componentType()
```

Returns the component type of this `Class`, if it describes
an array type, or `null` otherwise.

**Implementation requirements:** Equivalent to `Class.getComponentType()`.

**Returns:** a `Class` describing the component type, or `null`
if this `Class` does not describe an array type

**Since:** 12

## Class.arrayType()

```java
public Class<?> arrayType()
```

Returns a `Class` for an array type whose component type
is described by this `Class`.

**Returns:** a `Class` describing the array type

**jvms:** 4.3.2 Field Descriptors

**jvms:** 4.4.1 The `CONSTANT_Class_info` Structure

**Since:** 12

Throws:

- `UnsupportedOperationException`: if this component type is void or if the number of dimensions of the resulting array type would exceed 255.

## Class.describeConstable()

```java
public Optional<ClassDesc> describeConstable()
```

Returns a nominal descriptor for this instance, if one can be
constructed, or an empty `Optional` if one cannot be.

**Returns:** An `Optional` containing the resulting nominal descriptor,
or an empty `Optional` if one cannot be constructed.

**Since:** 12

## Class.isHidden()

```java
public native boolean isHidden()
```

Returns `true` if and only if the underlying class is a hidden class.

**Returns:** `true` if and only if this class is a hidden class.

**Since:** 15

**See also:** MethodHandles.Lookup#defineHiddenClass

**See also:** Class##hiddenClasses Hidden Classes

## Class.getPermittedSubclasses()

```java
public Class<?>[] getPermittedSubclasses()
```

Returns an array containing `Class` objects representing the
direct subinterfaces or subclasses permitted to extend or
implement this class or interface if it is sealed.  The order of such elements
is unspecified. The array is empty if this sealed class or interface has no
permitted subclass. If this `Class` object represents a primitive type,
`void`, an array type, or a class or interface that is not sealed,
that is `isSealed()` returns `false`, then this method returns `null`.
Conversely, if `isSealed()` returns `true`, then this method
returns a non-null value.

For each class or interface `C` which is recorded as a permitted
direct subinterface or subclass of this class or interface,
this method attempts to obtain the `Class`
object for `C` (using the defining class loader of the current `Class` object).
The `Class` objects which can be obtained and which are direct
subinterfaces or subclasses of this class or interface,
are indicated by elements of the returned array. If a `Class` object
cannot be obtained, it is silently ignored, and not included in the result
array.

**Returns:** an array of `Class` objects of the permitted subclasses of this class
        or interface, or `null` if this class or interface is not sealed.

**JLS:** 8.1 Class Declarations

**JLS:** 9.1 Interface Declarations

**Since:** 17

## Class.isSealed()

```java
public boolean isSealed()
```

Returns `true` if and only if this `Class` object represents
a sealed class or interface. If this `Class` object represents a
primitive type, `void`, or an array type, this method returns
`false`. A sealed class or interface has (possibly zero) permitted
subclasses; `getPermittedSubclasses()` returns a non-null but
possibly empty value for a sealed class or interface.

**Returns:** `true` if and only if this `Class` object represents
a sealed class or interface.

**JLS:** 8.1 Class Declarations

**JLS:** 9.1 Interface Declarations

**Since:** 17
