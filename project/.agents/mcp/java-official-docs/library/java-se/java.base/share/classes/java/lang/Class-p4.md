---
title: "Class class (java.lang) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Class.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Class class (java.lang) (part 4 of 6)

## Class.getConstructors()

```java
public Constructor<?>[] getConstructors()
```

Returns an array containing `Constructor` objects reflecting
all the public constructors of the class represented by this
`Class` object.  An array of length 0 is returned if the
class has no public constructors, or if the class is an array class, or
if the class reflects a primitive type or void.

**API note:** While this method returns an array of `Constructor<T>` objects (that is an array of constructors from
this class), the return type of this method is `Constructor<?>[]` and *not* `Constructor<T>[]` as
might be expected.  This less informative return type is
necessary since after being returned from this method, the
array could be modified to hold `Constructor` objects for
different classes, which would violate the type guarantees of
`Constructor<T>[]`.

**Returns:** the array of `Constructor` objects representing the
        public constructors of this class

**See also:** #getDeclaredConstructors()

**Since:** 1.1

## Class.getField(String)

```java
public Field getField(String name) throws NoSuchFieldException
```

Returns a `Field` object that reflects the specified public member
field of the class or interface represented by this `Class`
object. The `name` parameter is a `String` specifying the
simple name of the desired field.

 The field to be reflected is determined by the algorithm that
follows.  Let C be the class or interface represented by this `Class` object:

-  If C declares a public field with the name specified, that is the
     field to be reflected.

-  If no field was found in step 1 above, this algorithm is applied
     recursively to each direct superinterface of C. The direct
     superinterfaces are searched in the order they were declared.

-  If no field was found in steps 1 and 2 above, and C has a
     superclass S, then this algorithm is invoked recursively upon S.
     If C has no superclass, then a `NoSuchFieldException`
     is thrown.

 If this `Class` object represents an array type, then this
method does not find the `length` field of the array type.

Parameters:

- `name`: the field name

**Returns:** the `Field` object of this class specified by
        `name`

**Since:** 1.1

**JLS:** 8.2 Class Members

**JLS:** 8.3 Field Declarations

Throws:

- `NoSuchFieldException`: if a field with the specified name is not found.
- `NullPointerException`: if `name` is `null`

## Class.getMethod(String, Class<?>...)

```java
public Method getMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a `Method` object that reflects the specified public
member method of the class or interface represented by this
`Class` object. The `name` parameter is a
`String` specifying the simple name of the desired method. The
`parameterTypes` parameter is an array of `Class`
objects that identify the method's formal parameter types, in declared
order. If `parameterTypes` is `null`, it is
treated as if it were an empty array.

 If this `Class` object represents an array type, then this
method finds any public method inherited by the array type from
`Object` except method `clone()`.

 If this `Class` object represents an interface then this
method does not find any implicitly declared method from
`Object`. Therefore, if no methods are explicitly declared in
this interface or any of its superinterfaces, then this method does not
find any method.

 This method does not find any method with name `ConstantDescs#INIT_NAME` or `ConstantDescs#CLASS_INIT_NAME`.

 Generally, the method to be reflected is determined by the 4 step
algorithm that follows.
Let C be the class or interface represented by this `Class` object:

-  A union of methods is composed of:

-  C's declared public instance and static methods as returned by
       `getDeclaredMethods()` and filtered to include only public
       methods that match given `name` and `parameterTypes`

-  If C is a class other than `Object`, then include the result
       of invoking this algorithm recursively on the superclass of C.

-  Include the results of invoking this algorithm recursively on all
       direct superinterfaces of C, but include only instance methods.

-  This union is partitioned into subsets of methods with same
     return type (the selection of methods from step 1 also guarantees that
     they have the same method name and parameter types).

-  Within each such subset only the most specific methods are selected.
     Let method M be a method from a set of methods with same VM
     signature (return type, name, parameter types).
     M is most specific if there is no such method N != M from the same
     set, such that N is more specific than M. N is more specific than M
     if:

-  N is declared by a class and M is declared by an interface; or

-  N and M are both declared by classes or both by interfaces and
       N's declaring type is the same as or a subtype of M's declaring type
       (clearly, if M's and N's declaring types are the same type, then
       M and N are the same method).

-  The result of this algorithm is chosen arbitrarily from the methods
     with most specific return type among all selected methods from step 3.
     Let R be a return type of a method M from the set of all selected methods
     from step 3. M is a method with most specific return type if there is
     no such method N != M from the same set, having return type S != R,
     such that S is a subtype of R as determined by
     R.class.`isAssignableFrom`(S.class).

Parameters:

- `name`: the name of the method
- `parameterTypes`: the list of parameters

**API note:** There may be more than one method with matching name and
parameter types in a class because while the Java language forbids a
class to declare multiple methods with the same signature but different
return types, the Java virtual machine does not.  This
increased flexibility in the virtual machine can be used to
implement various language features.  For example, covariant
returns can be implemented with bridge methods; the bridge
method and the overriding method would have the same
signature but different return types. This method would return the
overriding method as it would have a more specific return type.

**Returns:** the `Method` object that matches the specified
        `name` and `parameterTypes`

**JLS:** 8.2 Class Members

**JLS:** 8.4 Method Declarations

**Since:** 1.1

Throws:

- `NoSuchMethodException`: if a matching method is not found or if the name is `ConstantDescs#INIT_NAME` or `ConstantDescs#CLASS_INIT_NAME`.
- `NullPointerException`: if `name` is `null`

## Class.getConstructor(Class<?>...)

```java
public Constructor<T> getConstructor(Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a `Constructor` object that reflects the specified
public constructor of the class represented by this `Class`
object. The `parameterTypes` parameter is an array of
`Class` objects that identify the constructor's formal
parameter types, in declared order.

If this `Class` object represents an inner class
declared in a non-static context, the formal parameter types
include the explicit enclosing instance as the first parameter.

 The constructor to reflect is the public constructor of the class
represented by this `Class` object whose formal parameter
types match those specified by `parameterTypes`.

Parameters:

- `parameterTypes`: the parameter array

**Returns:** the `Constructor` object of the public constructor that
        matches the specified `parameterTypes`

**See also:** #getDeclaredConstructor(Class[])

**Since:** 1.1

Throws:

- `NoSuchMethodException`: if a matching constructor is not found, including when this `Class` object represents an interface, a primitive type, an array class, or void.

## Class.getDeclaredClasses()

```java
public Class<?>[] getDeclaredClasses()
```

Returns an array of `Class` objects reflecting all the
classes and interfaces declared as members of the class represented by
this `Class` object. This includes public, protected, default
(package) access, and private classes and interfaces declared by the
class, but excludes inherited classes and interfaces.  This method
returns an array of length 0 if the class declares no classes or
interfaces as members, or if this `Class` object represents a
primitive type, an array class, or void.

**Returns:** the array of `Class` objects representing all the
        declared members of this class

**Since:** 1.1

**JLS:** 8.5 Member Class and Interface Declarations

## Class.getDeclaredFields()

```java
public Field[] getDeclaredFields()
```

Returns an array of `Field` objects reflecting all the fields
declared by the class or interface represented by this
`Class` object. This includes public, protected, default
(package) access, and private fields, but excludes inherited fields.

 If this `Class` object represents a class or interface with no
declared fields, then this method returns an array of length 0.

 If this `Class` object represents an array type, a primitive
type, or void, then this method returns an array of length 0.

 The elements in the returned array are not sorted and are not in any
particular order.

**Returns:** the array of `Field` objects representing all the
         declared fields of this class

**Since:** 1.1

**JLS:** 8.2 Class Members

**JLS:** 8.3 Field Declarations

## Class.getRecordComponents()

```java
public RecordComponent[] getRecordComponents()
```

Returns an array of `RecordComponent` objects representing all the
record components of this record class, or `null` if this class is
not a record class.

 The components are returned in the same order that they are declared
in the record header. The array is empty if this record class has no
components. If the class is not a record class, that is `isRecord()` returns `false`, then this method returns `null`.
Conversely, if `isRecord()` returns `true`, then this method
returns a non-null value.

**API note:** The following method can be used to find the record canonical constructor:

**Returns:** An array of `RecordComponent` objects representing all the
         record components of this record class, or `null` if this
         class is not a record class

**JLS:** 8.10 Record Classes

**Since:** 16

## Class.getDeclaredMethods()

```java
public Method[] getDeclaredMethods()
```

Returns an array containing `Method` objects reflecting all the
declared methods of the class or interface represented by this `Class` object, including public, protected, default (package)
access, and private methods, but excluding inherited methods.
The declared methods may include methods *not* in the
source of the class or interface, including bridge methods and other synthetic methods added by compilers.

 If this `Class` object represents a class or interface that
has multiple declared methods with the same name and parameter types,
but different return types, then the returned array has a `Method`
object for each such method.

 If this `Class` object represents a class or interface that
has a class initialization method `ConstantDescs#CLASS_INIT_NAME`,
then the returned array does *not* have a corresponding `Method` object.

 If this `Class` object represents a class or interface with no
declared methods, then the returned array has length 0.

 If this `Class` object represents an array type, a primitive
type, or void, then the returned array has length 0.

 The elements in the returned array are not sorted and are not in any
particular order.

**Returns:** the array of `Method` objects representing all the
         declared methods of this class

**JLS:** 8.2 Class Members

**JLS:** 8.4 Method Declarations

**See also:** Java
programming language and JVM modeling in core reflection

**Since:** 1.1

## Class.getDeclaredConstructors()

```java
public Constructor<?>[] getDeclaredConstructors()
```

Returns an array of `Constructor` objects reflecting all the
constructors implicitly or explicitly declared by the class represented by this
`Class` object. These are public, protected, default
(package) access, and private constructors.  The elements in the array
returned are not sorted and are not in any particular order.  If the
class has a default constructor (JLS ), it is included in the returned array.
If a record class has a canonical constructor (JLS , ), it is included in the returned array.

This method returns an array of length 0 if this `Class`
object represents an interface, a primitive type, an array class, or
void.

**Returns:** the array of `Constructor` objects representing all the
         declared constructors of this class

**Since:** 1.1

**See also:** #getConstructors()

**JLS:** 8.8 Constructor Declarations

## Class.getDeclaredField(String)

```java
public Field getDeclaredField(String name) throws NoSuchFieldException
```

Returns a `Field` object that reflects the specified declared
field of the class or interface represented by this `Class`
object. The `name` parameter is a `String` that specifies
the simple name of the desired field.

 If this `Class` object represents an array type, then this
method does not find the `length` field of the array type.

Parameters:

- `name`: the name of the field

**Returns:** the `Field` object for the specified field in this
         class

**Since:** 1.1

**JLS:** 8.2 Class Members

**JLS:** 8.3 Field Declarations

Throws:

- `NoSuchFieldException`: if a field with the specified name is not found.
- `NullPointerException`: if `name` is `null`

## Class.getDeclaredMethod(String, Class<?>...)

```java
public Method getDeclaredMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a `Method` object that reflects the specified
declared method of the class or interface represented by this
`Class` object. The `name` parameter is a
`String` that specifies the simple name of the desired
method, and the `parameterTypes` parameter is an array of
`Class` objects that identify the method's formal parameter
types, in declared order.  If more than one method with the same
parameter types is declared in a class, and one of these methods has a
return type that is more specific than any of the others, that method is
returned; otherwise one of the methods is chosen arbitrarily.  If the
name is `ConstantDescs#INIT_NAME` or `ConstantDescs#CLASS_INIT_NAME` a `NoSuchMethodException`
is raised.

 If this `Class` object represents an array type, then this
method does not find the `clone()` method.

Parameters:

- `name`: the name of the method
- `parameterTypes`: the parameter array

**Returns:** the `Method` object for the method of this class
         matching the specified name and parameters

**JLS:** 8.2 Class Members

**JLS:** 8.4 Method Declarations

**Since:** 1.1

Throws:

- `NoSuchMethodException`: if a matching method is not found.
- `NullPointerException`: if `name` is `null`
