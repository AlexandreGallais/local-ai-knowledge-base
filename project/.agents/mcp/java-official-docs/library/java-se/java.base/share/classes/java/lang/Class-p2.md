---
title: "Class class (java.lang) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Class.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Class class (java.lang) (part 2 of 6)

## Class.isInstance(Object)

```java
public native boolean isInstance(Object obj)
```

Determines if the specified `Object` is assignment-compatible
with the object represented by this `Class`.  This method is
the dynamic equivalent of the Java language `instanceof`
operator. The method returns `true` if the specified
`Object` argument is non-null and can be cast to the
reference type represented by this `Class` object without
raising a `ClassCastException.` It returns `false`
otherwise.

 Specifically, if this `Class` object represents a
declared class, this method returns `true` if the specified
`Object` argument is an instance of the represented class (or
of any of its subclasses); it returns `false` otherwise. If
this `Class` object represents an array class, this method
returns `true` if the specified `Object` argument
can be converted to an object of the array class by an identity
conversion or by a widening reference conversion; it returns
`false` otherwise. If this `Class` object
represents an interface, this method returns `true` if the
class or any superclass of the specified `Object` argument
implements this interface; it returns `false` otherwise. If
this `Class` object represents a primitive type, this method
returns `false`.

Parameters:

- `obj`: the object to check

**Returns:** true if `obj` is an instance of this class

**Since:** 1.1

## Class.isAssignableFrom(Class<?>)

```java
public native boolean isAssignableFrom(Class<?> cls)
```

Determines if the class or interface represented by this
`Class` object is either the same as, or is a superclass or
superinterface of, the class or interface represented by the specified
`Class` parameter. It returns `true` if so;
otherwise it returns `false`. If this `Class`
object represents a primitive type, this method returns
`true` if the specified `Class` parameter is
exactly this `Class` object; otherwise it returns
`false`.

 Specifically, this method tests whether the type represented by the
specified `Class` parameter can be converted to the type
represented by this `Class` object via an identity conversion
or via a widening reference conversion. See *The Java Language
Specification*, sections  and ,
for details.

Parameters:

- `cls`: the `Class` object to be checked

**Returns:** the `boolean` value indicating whether objects of the
           type `cls` can be assigned to objects of this class

**Since:** 1.1

Throws:

- `NullPointerException`: if the specified Class parameter is null.

## Class.isInterface()

```java
public boolean isInterface()
```

Determines if this `Class` object represents an
interface type.

**Returns:** `true` if this `Class` object represents an interface;
         `false` otherwise.

## Class.isArray()

```java
public boolean isArray()
```

Determines if this `Class` object represents an array class.

**Returns:** `true` if this `Class` object represents an array class;
         `false` otherwise.

**Since:** 1.1

## Class.isPrimitive()

```java
public boolean isPrimitive()
```

Determines if this `Class` object represents a primitive
type or void.

 There are nine predefined `Class` objects to
represent the eight primitive types and void.  These are
created by the Java Virtual Machine, and have the same
names as the primitive types that they
represent, namely `boolean`, `byte`, `char`,
`short`, `int`, `long`, `float`, and
`double`.

No other class objects are considered primitive.

**API note:** A `Class` object represented by a primitive type can be
accessed via the `TYPE` public static final variables
defined in the primitive wrapper classes such as Integer.TYPE. In the Java programming
language, the objects may be referred to by a class literal
expression such as `int.class`.  The `Class` object
for void can be expressed as `void.class` or Void.TYPE.

**Returns:** true if and only if this class represents a primitive type

**See also:** java.lang.Boolean#TYPE

**See also:** java.lang.Character#TYPE

**See also:** java.lang.Byte#TYPE

**See also:** java.lang.Short#TYPE

**See also:** java.lang.Integer#TYPE

**See also:** java.lang.Long#TYPE

**See also:** java.lang.Float#TYPE

**See also:** java.lang.Double#TYPE

**See also:** java.lang.Void#TYPE

**Since:** 1.1

**JLS:** 15.8.2 Class Literals

## Class.isAnnotation()

```java
public boolean isAnnotation()
```

Returns true if this `Class` object represents an annotation
interface.  Note that if this method returns true, `isInterface()`
would also return true, as all annotation interfaces are also interfaces.

**Returns:** `true` if this `Class` object represents an annotation
     interface; `false` otherwise

**Since:** 1.5

## Class.isSynthetic()

```java
public boolean isSynthetic()
```

**JLS:** 13.1 The Form of a Binary

**jvms:** 4.1 The `ClassFile` Structure

**See also:** Java
programming language and JVM modeling in core reflection

**Since:** 1.5

## Class.getName()

```java
public String getName()
```

Returns the  name of the entity (class, interface, array class,
primitive type, or void) represented by this `Class` object.

 If this `Class` object represents a class or interface,
not an array class, then:

-  If the class or interface is not hidden,
     then the binary name
     of the class or interface is returned.

-  If the class or interface is hidden, then the result is a string
     of the form: `N + '/' + <suffix>`
     where `N` is the binary name
     indicated by the `class` file passed to
     boolean, MethodHandles.Lookup.ClassOption...) Lookup::defineHiddenClass, and `<suffix>` is an unqualified name.

 If this `Class` object represents an array class, then
the result is a string consisting of one or more '`[`' characters
representing the depth of the array nesting, followed by the element
type as encoded using the following table:

Element types and encodings

 Element Type  Encoding

 `boolean`  `Z`
 `byte`     `B`
 `char`     `C`
 class or interface with binary name *N*
                                      `L`*N*`;`
 `double`   `D`
 `float`    `F`
 `int`      `I`
 `long`     `J`
 `short`    `S`

 If this `Class` object represents a primitive type or `void`,
then the result is a string with the same spelling as the Java language
keyword which corresponds to the primitive type or `void`.

 Examples:

```java
String.class.getName()
    returns "java.lang.String"
Character.UnicodeBlock.class.getName()
    returns "java.lang.Character$UnicodeBlock"
byte.class.getName()
    returns "byte"
(new Object[3]).getClass().getName()
    returns "[Ljava.lang.Object;"
(new int[3][4][5][6][7][8][9]).getClass().getName()
    returns "[[[[[[[I"
```

**API note:** Distinct class objects can have the same name but different class loaders.

**Returns:** the name of the class, interface, or other entity
         represented by this `Class` object.

**JLS:** 13.1 The Form of a Binary

## Class.getClassLoader()

```java
public ClassLoader getClassLoader()
```

Returns the class loader for the class.  Some implementations may use
null to represent the bootstrap class loader. This method will return
null in such implementations if this class was loaded by the bootstrap
class loader.

If this `Class` object
represents a primitive type or void, null is returned.

**Returns:** the class loader that loaded the class or interface
         represented by this `Class` object.

**See also:** java.lang.ClassLoader

## Class.getModule()

```java
public Module getModule()
```

Returns the module that this class or interface is a member of.

If this class represents an array type then this method returns the
`Module` for the element type. If this class represents a
primitive type or void, then the `Module` object for the
`java.base` module is returned.

If this class is in an unnamed module then the unnamed `Module` of the class
loader for this class is returned.

**Returns:** the module that this class or interface is a member of

**Since:** 9

## Class.getTypeParameters()

```java
public TypeVariable<Class<T>>[] getTypeParameters()
```

Returns an array of `TypeVariable` objects that represent the
type variables declared by the generic declaration represented by this
`GenericDeclaration` object, in declaration order.  Returns an
array of length 0 if the underlying generic declaration declares no type
variables.

**Returns:** an array of `TypeVariable` objects that represent
    the type variables declared by this generic declaration

**Since:** 1.5

Throws:

- `java.lang.reflect.GenericSignatureFormatError`: if the generic signature of this generic declaration does not conform to the format specified in section  of *The Java Virtual Machine Specification*

## Class.getSuperclass()

```java
public native Class<? super T> getSuperclass()
```

Returns the `Class` representing the direct superclass of the
entity (class, interface, primitive type or void) represented by
this `Class`.  If this `Class` represents either the
`Object` class, an interface, a primitive type, or void, then
null is returned.  If this `Class` object represents an array class
then the `Class` object representing the `Object` class is
returned.

**Returns:** the direct superclass of the class represented by this `Class` object

## Class.getGenericSuperclass()

```java
public Type getGenericSuperclass()
```

Returns the `Type` representing the direct superclass of
the entity (class, interface, primitive type or void) represented by
this `Class` object.

If the superclass is a parameterized type, the `Type`
object returned must accurately reflect the actual type
arguments used in the source code. The parameterized type
representing the superclass is created if it had not been
created before. See the declaration of ParameterizedType for the
semantics of the creation process for parameterized types.  If
this `Class` object represents either the `Object`
class, an interface, a primitive type, or void, then null is
returned.  If this `Class` object represents an array class
then the `Class` object representing the `Object` class is
returned.

**Returns:** the direct superclass of the class represented by this `Class` object

**Since:** 1.5

Throws:

- `java.lang.reflect.GenericSignatureFormatError`: if the generic class signature does not conform to the format specified in section  of *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if the generic superclass refers to a non-existent type declaration
- `java.lang.reflect.MalformedParameterizedTypeException`: if the generic superclass refers to a parameterized type that cannot be instantiated for any reason

## Class.getPackage()

```java
public Package getPackage()
```

Gets the package of this class.

If this class represents an array type, a primitive type or void,
this method returns `null`.

**Returns:** the package of this class.

## Class.getPackageName()

```java
public String getPackageName()
```

Returns the fully qualified package name.

 If this class is a top level class, then this method returns the fully
qualified name of the package that the class is a member of, or the
empty string if the class is in an unnamed package.

 If this class is a member class, then this method is equivalent to
invoking `getPackageName()` on the enclosing class.

 If this class is a local class or an anonymous class, then this method is equivalent to
invoking `getPackageName()` on the declaring class of the enclosing method or
enclosing constructor.

 If this class represents an array type then this method returns the
package name of the element type. If this class represents a primitive
type or void then the package name "`java.lang`" is returned.

**Returns:** the fully qualified package name

**Since:** 9

**JLS:** 6.7 Fully Qualified Names and Canonical Names

## Class.getInterfaces()

```java
public Class<?>[] getInterfaces()
```

Returns the interfaces directly implemented by the class or interface
represented by this `Class` object.

If this `Class` object represents a class, the return value is an array
containing objects representing all interfaces directly implemented by
the class.  The order of the interface objects in the array corresponds
to the order of the interface names in the `implements` clause of
the declaration of the class represented by this `Class` object.  For example,
given the declaration:

`class Shimmer implements FloorWax, DessertTopping { ... }`

suppose the value of `s` is an instance of
`Shimmer`; the value of the expression:

`s.getClass().getInterfaces()[0]`

is the `Class` object that represents interface
`FloorWax`; and the value of:

`s.getClass().getInterfaces()[1]`

is the `Class` object that represents interface
`DessertTopping`.

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
