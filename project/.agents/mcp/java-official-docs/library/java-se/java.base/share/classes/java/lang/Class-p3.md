---
title: "Class class (java.lang) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Class.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Class class (java.lang) (part 3 of 6)

## Class.getGenericInterfaces()

```java
public Type[] getGenericInterfaces()
```

Returns the `Type`s representing the interfaces
directly implemented by the class or interface represented by
this `Class` object.

If a superinterface is a parameterized type, the
`Type` object returned for it must accurately reflect
the actual type arguments used in the source code. The
parameterized type representing each superinterface is created
if it had not been created before. See the declaration of
ParameterizedType
for the semantics of the creation process for parameterized
types.

If this `Class` object represents a class, the return value is an array
containing objects representing all interfaces directly implemented by
the class.  The order of the interface objects in the array corresponds
to the order of the interface names in the `implements` clause of
the declaration of the class represented by this `Class` object.

If this `Class` object represents an interface, the array contains objects
representing all interfaces directly extended by the interface.  The
order of the interface objects in the array corresponds to the order of
the interface names in the `extends` clause of the declaration of
the interface represented by this `Class` object.

If this `Class` object represents a class or interface that implements no
interfaces, the method returns an array of length 0.

If this `Class` object represents a primitive type or void, the method
returns an array of length 0.

If this `Class` object represents an array type, the
interfaces `Cloneable` and `java.io.Serializable` are
returned in that order.

**Returns:** an array of interfaces directly implemented by this class

**Since:** 1.5

Throws:

- `java.lang.reflect.GenericSignatureFormatError`: if the generic class signature does not conform to the format specified in section  of *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if any of the generic superinterfaces refers to a non-existent type declaration
- `java.lang.reflect.MalformedParameterizedTypeException`: if any of the generic superinterfaces refer to a parameterized type that cannot be instantiated for any reason

## Class.getComponentType()

```java
public Class<?> getComponentType()
```

Returns the `Class` representing the component type of an
array.  If this class does not represent an array class this method
returns null.

**Returns:** the `Class` representing the component type of this
class if this class is an array

**See also:** java.lang.reflect.Array

**Since:** 1.1

## Class.getModifiers()

```java
public int getModifiers()
```

Returns the Java language modifiers for this class or interface, encoded
in an integer. The modifiers consist of the Java Virtual Machine's
constants for `public`, `protected`,
`private`, `final`, `static`,
`abstract` and `interface`; they should be decoded
using the methods of class `Modifier`.

 If the underlying class is an array class:

-  its `public`, `private` and `protected`
     modifiers are the same as those of its component type

-  its `abstract` and `final` modifiers are always
     `true`

-  its interface modifier is always `false`, even when
     the component type is an interface

If this `Class` object represents a primitive type or
void, its `public`, `abstract`, and `final`
modifiers are always `true`.
For `Class` objects representing void, primitive types, and
arrays, the values of other modifiers are `false` other
than as specified above.

 The modifier encodings are defined in section
of *The Java Virtual Machine Specification*.

**Returns:** the `int` representing the modifiers for this class

**See also:** java.lang.reflect.Modifier

**See also:** #accessFlags()

**See also:** Java
programming language and JVM modeling in core reflection

**Since:** 1.1

**JLS:** 8.1.1 Class Modifiers

**JLS:** 9.1.1 Interface Modifiers

**jvms:** 4.1 The `ClassFile` Structure

## Class.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

If the underlying class is an array class:

-  its `PUBLIC`, `PRIVATE` and `PROTECTED`
     access flags are the same as those of its component type

-  its `ABSTRACT` and `FINAL` flags are present

-  its `INTERFACE` flag is absent, even when the
     component type is an interface

If this `Class` object represents a primitive type or
void, the flags are `PUBLIC`, `ABSTRACT`, and
`FINAL`.
For `Class` objects representing void, primitive types, and
arrays, access flags are absent other than as specified above.

**See also:** #getModifiers()

**jvms:** 4.1 The ClassFile Structure

**jvms:** 4.7.6 The InnerClasses Attribute

**Since:** 20

## Class.getSigners()

```java
public Object[] getSigners()
```

Gets the signers of this class.

**Returns:** the signers of this class, or null if there are no signers.  In
         particular, this method returns null if this `Class` object represents
         a primitive type or void.

**Since:** 1.1

## Class.getEnclosingMethod()

```java
public Method getEnclosingMethod()
```

If this `Class` object represents a local or anonymous
class within a method, returns a Method object representing the
immediately enclosing method of the underlying class. Returns
`null` otherwise.

In particular, this method returns `null` if the underlying
class is a local or anonymous class immediately enclosed by a class or
interface declaration, instance initializer or static initializer.

**Returns:** the immediately enclosing method of the underlying class, if
    that class is a local or anonymous class; otherwise `null`.

**Since:** 1.5

## Class.getEnclosingConstructor()

```java
public Constructor<?> getEnclosingConstructor()
```

If this `Class` object represents a local or anonymous
class within a constructor, returns a Constructor object representing
the immediately enclosing constructor of the underlying
class. Returns `null` otherwise.  In particular, this
method returns `null` if the underlying class is a local
or anonymous class immediately enclosed by a class or
interface declaration, instance initializer or static initializer.

**Returns:** the immediately enclosing constructor of the underlying class, if
    that class is a local or anonymous class; otherwise `null`.

**Since:** 1.5

## Class.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

If the class or interface represented by this `Class` object
is a member of another class, returns the `Class` object
representing the class in which it was declared.  This method returns
null if this class or interface is not a member of any other class.  If
this `Class` object represents an array class, a primitive
type, or void, then this method returns null.

**Returns:** the declaring class for this class

**Since:** 1.1

## Class.getEnclosingClass()

```java
public Class<?> getEnclosingClass()
```

Returns the immediately enclosing class of the underlying
class.  If the underlying class is a top level class this
method returns `null`.

**Returns:** the immediately enclosing class of the underlying class

**Since:** 1.5

## Class.getSimpleName()

```java
public String getSimpleName()
```

Returns the simple name of the underlying class as given in the
source code. An empty string is returned if the underlying class is
anonymous.
A synthetic class, one not present
in source code, can have a non-empty name including special
characters, such as "`$`".

The simple name of an array class is the simple name of the
component type with "[]" appended.  In particular the simple
name of an array class whose component type is anonymous is "[]".

**Returns:** the simple name of the underlying class

**Since:** 1.5

## Class.getTypeName()

```java
public String getTypeName()
```

Return an informative string for the name of this class or interface.

**Returns:** an informative string for the name of this class or interface

**Since:** 1.8

## Class.getCanonicalName()

```java
public String getCanonicalName()
```

Returns the canonical name of the underlying class as
defined by *The Java Language Specification*.
Returns `null` if the underlying class does not have a canonical
name. Classes without canonical names include:

- a local class

- a anonymous class

- a hidden class

- an array whose component type does not have a canonical name

The canonical name for a primitive class is the keyword for the
corresponding primitive type (`byte`, `short`,
`char`, `int`, and so on).

An array type has a canonical name if and only if its
component type has a canonical name. When an array type has a
canonical name, it is equal to the canonical name of the
component type followed by "`[]`".

**Returns:** the canonical name of the underlying class if it exists, and
`null` otherwise.

**JLS:** 6.7 Fully Qualified Names and Canonical Names

**Since:** 1.5

## Class.isAnonymousClass()

```java
public boolean isAnonymousClass()
```

Returns `true` if and only if the underlying class
is an anonymous class.

**API note:** An anonymous class is not a hidden class.

**Returns:** `true` if and only if this class is an anonymous class.

**Since:** 1.5

**JLS:** 15.9.5 Anonymous Class Declarations

## Class.isLocalClass()

```java
public boolean isLocalClass()
```

Returns `true` if and only if the underlying class
is a local class.

**Returns:** `true` if and only if this class is a local class.

**Since:** 1.5

**JLS:** 14.3 Local Class and Interface Declarations

## Class.isMemberClass()

```java
public boolean isMemberClass()
```

Returns `true` if and only if the underlying class
is a member class.

**Returns:** `true` if and only if this class is a member class.

**Since:** 1.5

**JLS:** 8.5 Member Class and Interface Declarations

## Class.getClasses()

```java
public Class<?>[] getClasses()
```

Returns an array containing `Class` objects representing all
the public classes and interfaces that are members of the class
represented by this `Class` object.  This includes public
class and interface members inherited from superclasses and public class
and interface members declared by the class.  This method returns an
array of length 0 if this `Class` object has no public member
classes or interfaces.  This method also returns an array of length 0 if
this `Class` object represents a primitive type, an array
class, or void.

**Returns:** the array of `Class` objects representing the public
        members of this class

**Since:** 1.1

## Class.getFields()

```java
public Field[] getFields()
```

Returns an array containing `Field` objects reflecting all
the accessible public fields of the class or interface represented by
this `Class` object.

 If this `Class` object represents a class or interface with
no accessible public fields, then this method returns an array of length
0.

 If this `Class` object represents a class, then this method
returns the public fields of the class and of all its superclasses and
superinterfaces.

 If this `Class` object represents an interface, then this
method returns the fields of the interface and of all its
superinterfaces.

 If this `Class` object represents an array type, a primitive
type, or void, then this method returns an array of length 0.

 The elements in the returned array are not sorted and are not in any
particular order.

**Returns:** the array of `Field` objects representing the
        public fields

**Since:** 1.1

**JLS:** 8.2 Class Members

**JLS:** 8.3 Field Declarations

## Class.getMethods()

```java
public Method[] getMethods()
```

Returns an array containing `Method` objects reflecting all the
public methods of the class or interface represented by this `Class` object, including those declared by the class or interface and
those inherited from superclasses and superinterfaces.

 If this `Class` object represents an array type, then the
returned array has a `Method` object for each of the public
methods inherited by the array type from `Object`. It does not
contain a `Method` object for `clone()`.

 If this `Class` object represents an interface then the
returned array does not contain any implicitly declared methods from
`Object`. Therefore, if no methods are explicitly declared in
this interface or any of its superinterfaces then the returned array
has length 0. (Note that a `Class` object which represents a class
always has public methods, inherited from `Object`.)

 The returned array never contains methods with names `ConstantDescs#INIT_NAME` or `ConstantDescs#CLASS_INIT_NAME`.

 The elements in the returned array are not sorted and are not in any
particular order.

 Generally, the result is computed as with the following 4 step algorithm.
Let C be the class or interface represented by this `Class` object:

-  A union of methods is composed of:

-  C's declared public instance and static methods as returned by
       `getDeclaredMethods()` and filtered to include only public
       methods.

-  If C is a class other than `Object`, then include the result
       of invoking this algorithm recursively on the superclass of C.

-  Include the results of invoking this algorithm recursively on all
       direct superinterfaces of C, but include only instance methods.

-  Union from step 1 is partitioned into subsets of methods with same
     signature (name, parameter types) and return type.

-  Within each such subset only the most specific methods are selected.
     Let method M be a method from a set of methods with same signature
     and return type. M is most specific if there is no such method
     N != M from the same set, such that N is more specific than M.
     N is more specific than M if:

-  N is declared by a class and M is declared by an interface; or

-  N and M are both declared by classes or both by interfaces and
       N's declaring type is the same as or a subtype of M's declaring type
       (clearly, if M's and N's declaring types are the same type, then
       M and N are the same method).

-  The result of this algorithm is the union of all selected methods from
     step 3.

**API note:** There may be more than one method with a particular name
and parameter types in a class because while the Java language forbids a
class to declare multiple methods with the same signature but different
return types, the Java virtual machine does not.  This
increased flexibility in the virtual machine can be used to
implement various language features.  For example, covariant
returns can be implemented with bridge methods; the bridge
method and the overriding method would have the same
signature but different return types.

**Returns:** the array of `Method` objects representing the
        public methods of this class

**JLS:** 8.2 Class Members

**JLS:** 8.4 Method Declarations

**Since:** 1.1
