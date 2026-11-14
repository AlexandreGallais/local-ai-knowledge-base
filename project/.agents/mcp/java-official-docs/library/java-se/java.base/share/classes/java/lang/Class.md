---
title: "Class class (java.lang) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Class.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Class class (java.lang)

```java
public final class Class<T> implements java.io.Serializable, GenericDeclaration, Type, AnnotatedElement, TypeDescriptor.OfField<Class<?>>, Constable
```

Instances of the class `Class` represent classes and
interfaces in a running Java application. An enum class and a record
class are kinds of class; an annotation interface is a kind of
interface. Every array also belongs to a class that is reflected as
a `Class` object that is shared by all arrays with the same
element type and number of dimensions.  The primitive Java types
(`boolean`, `byte`, `char`, `short`, `int`, `long`, `float`, and `double`), and the
keyword `void` are also represented as `Class` objects.

 `Class` has no public constructor. Instead a `Class`
object is constructed automatically by the Java Virtual Machine when
a class is derived from the bytes of a `class` file through
the invocation of one of the following methods:

-  byte[], int, int) ClassLoader::defineClass

-  java.lang.invoke.MethodHandles.Lookup::defineClass

-  boolean, MethodHandles.Lookup.ClassOption...) java.lang.invoke.MethodHandles.Lookup::defineHiddenClass

 The methods of class `Class` expose many characteristics of a
class or interface. Most characteristics are derived from the `class`
file that the class loader passed to the Java Virtual Machine or
from the `class` file passed to `Lookup::defineClass`
or `Lookup::defineHiddenClass`.
A few characteristics are determined by the class loading environment
at run time, such as the module returned by getModule().

 The following example uses a `Class` object to print the
class name of an object:

It is also possible to get the `Class` object for a named
class or interface (or for `void`) using a class literal
(JLS ).
For example:

 Some methods of class `Class` expose whether the declaration of
a class or interface in Java source code was *enclosed* within
another declaration. Other methods describe how a class or interface
is situated in a . A nest is a set of
classes and interfaces, in the same run-time package, that
allow mutual access to their `private` members.
The classes and interfaces are known as
(JVMS ).
One nestmate acts as the
nest host (JVMS ), and enumerates the other nestmates which
belong to the nest; each of them in turn records it as the nest host.
The classes and interfaces which belong to a nest, including its host, are
determined when
`class` files are generated, for example, a Java compiler
will typically record a top-level class as the host of a nest where the
other members are the classes and interfaces whose declarations are
enclosed within the top-level class declaration.

#### Hidden Classes

A class or interface created by the invocation of
boolean, MethodHandles.Lookup.ClassOption...) Lookup::defineHiddenClass is a hidden
class or interface.
All kinds of class, including enum classes and record classes, may be
hidden classes; all kinds of interface, including annotation interfaces,
may be hidden interfaces.

The name of a hidden class or interface is
not a binary name,
which means the following:

- A hidden class or interface cannot be referenced by the constant pools
    of other classes and interfaces.

- A hidden class or interface cannot be described in
    *nominal form* by
    Class::describeConstable,
    ClassDesc::of, or
    ClassDesc::ofDescriptor.

- A hidden class or interface cannot be discovered by Class::forName
    or boolean) ClassLoader::loadClass.

A hidden class or interface is never an array class, but may be
the element type of an array. In all other respects, the fact that
a class or interface is hidden has no bearing on the characteristics
exposed by the methods of class `Class`.

#### Implicitly Declared Classes

Conventionally, a Java compiler, starting from a source file for an
implicitly declared class, say `HelloWorld.java`, creates a
similarly-named `class` file, `HelloWorld.class`, where
the class stored in that `class` file is named `"HelloWorld"`, matching the base names of the source and `class` files.

For the `Class` object of an implicitly declared class `HelloWorld`, the methods to get the name and
type name return results
equal to `"HelloWorld"`. The simple name of such an implicitly declared class is `"HelloWorld"` and
the canonical name is `"HelloWorld"`.

Parameters:

- `<T>`: the type of the class modeled by this `Class` object. For example, the type of `String.class` is `Class<String>`. Use `Class<?>` if the class being modeled is unknown.

**See also:** java.lang.ClassLoader#defineClass(byte[], int, int)

**Since:** 1.0

## Class.toString()

```java
public String toString()
```

Converts the object to a string. The string representation is the
string "class" or "interface", followed by a space, and then by the
name of the class in the format returned by `getName`.
If this `Class` object represents a primitive type,
this method returns the name of the primitive type.  If
this `Class` object represents void this method returns
"void". If this `Class` object represents an array type,
this method returns "class " followed by `getName`.

**Returns:** a string representation of this `Class` object.

## Class.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this `Class`, including
information about modifiers, sealed/`non-sealed` status, and type parameters.

The string is formatted as a list of type modifiers, if any,
followed by the kind of type (empty string for primitive types
and `class`, `enum`, `interface`,
`@interface`, or `record` as appropriate), followed
by the type's name, followed by an angle-bracketed
comma-separated list of the type's type parameters, if any,
including informative bounds on the type parameters, if any.

A space is used to separate modifiers from one another and to
separate any modifiers from the kind of type. The modifiers
occur in canonical order. If there are no type parameters, the
type parameter list is elided.

For an array type, the string starts with the type name,
followed by an angle-bracketed comma-separated list of the
type's type parameters, if any, followed by a sequence of
`[]` characters, one set of brackets per dimension of
the array.

Note that since information about the runtime representation
of a type is being generated, modifiers not present on the
originating source code or illegal on the originating source
code may be present.

**Returns:** a string describing this `Class`, including
information about modifiers and type parameters

**Since:** 1.8

## Class.forName(String)

```java
public static Class<?> forName(String className) throws ClassNotFoundException
```

Returns the `Class` object associated with the class or
interface with the given string name.  Invoking this method is
equivalent to:

where `currentLoader` denotes the defining class loader of
the current class.

 For example, the following code fragment returns the
runtime `Class` object for the class named
`java.lang.Thread`:

A call to `forName("X")` causes the class named
`X` to be initialized.

In cases where this method is called from a context where there is no
caller frame on the stack (e.g. when called directly from a JNI
attached thread), the system class loader is used.

Parameters:

- `className`: the binary name of the class or the string representing an array type

**Returns:** the `Class` object for the class with the
           specified name.

**JLS:** 12.2 Loading of Classes and Interfaces

**JLS:** 12.3 Linking of Classes and Interfaces

**JLS:** 12.4 Initialization of Classes and Interfaces

Throws:

- `LinkageError`: if the linkage fails
- `ExceptionInInitializerError`: if the initialization provoked by this method fails
- `ClassNotFoundException`: if the class cannot be located

## Class.forName(String, boolean, ClassLoader)

```java
public static Class<?> forName(String name, boolean initialize, ClassLoader loader) throws ClassNotFoundException
```

Returns the `Class` object associated with the class or
interface with the given string name, using the given class loader.
Given the binary name for a class or interface,
this method attempts to locate and load the class or interface. The specified
class loader is used to load the class or interface.  If the parameter
`loader` is `null`, the class is loaded through the bootstrap
class loader.  The class is initialized only if the
`initialize` parameter is `true` and if it has
not been initialized earlier.

 This method cannot be used to obtain any of the `Class` objects
representing primitive types or void, hidden classes or interfaces,
or array classes whose element type is a hidden class or interface.
If `name` denotes a primitive type or void, for example `I`,
an attempt will be made to locate a user-defined class in the unnamed package
whose name is `I` instead.
To obtain a `Class` object for a named primitive type
such as `int` or `long` use `forPrimitiveName(String)`.

 To obtain the `Class` object associated with an array class,
the name consists of one or more `'['` representing the depth
of the array nesting, followed by the element type as encoded in
the table specified in `Class.getName()`.

 Examples:

 A call to `getName()` on the `Class` object returned
from `forName(`*N*`)` returns *N*.

 A call to `forName("[L`*N*`;")` causes the element type
named *N* to be loaded but not initialized regardless of the value
of the `initialize` parameter.

Parameters:

- `name`: the binary name of the class or the string representing an array class
- `initialize`: if `true` the class will be initialized (which implies linking). See Section  of *The Java Language Specification*.
- `loader`: class loader from which the class must be loaded

**API note:** This method throws errors related to loading, linking or initializing
as specified in Sections , , and  of
*The Java Language Specification*.
In addition, this method does not check whether the requested class
is accessible to its caller.

**Returns:** class object representing the desired class

**See also:** java.lang.Class#forName(String)

**See also:** java.lang.ClassLoader

**JLS:** 12.2 Loading of Classes and Interfaces

**JLS:** 12.3 Linking of Classes and Interfaces

**JLS:** 12.4 Initialization of Classes and Interfaces

**JLS:** 13.1 The Form of a Binary

**Since:** 1.2

Throws:

- `LinkageError`: if the linkage fails
- `ExceptionInInitializerError`: if the initialization provoked by this method fails
- `ClassNotFoundException`: if the class cannot be located by the specified class loader

## Class.forName(Module, String)

```java
public static Class<?> forName(Module module, String name)
```

Returns the `Class` with the given binary name in the given module.

 This method attempts to locate and load the class or interface.
It does not link the class, and does not run the class initializer.
If the class is not found, this method returns `null`.

 If the class loader of the given module defines other modules and
the given name is a class defined in a different module, this method
returns `null` after the class is loaded.

 This method does not check whether the requested class is
accessible to its caller.

Parameters:

- `module`: A module
- `name`: The binary name of the class

**API note:** This method does not support loading of array types, unlike
boolean, ClassLoader). The class name must be
a binary name.  This method returns `null` on failure rather than
throwing a `ClassNotFoundException`, as is done by
the boolean, ClassLoader) method.

**Returns:** `Class` object of the given name defined in the given module;
        `null` if not found.

**JLS:** 12.2 Loading of Classes and Interfaces

**JLS:** 12.3 Linking of Classes and Interfaces

**Since:** 9

Throws:

- `NullPointerException`: if the given module or name is `null`
- `LinkageError`: if the linkage fails

## Class.forPrimitiveName(String)

```java
public static Class<?> forPrimitiveName(String primitiveName)
```

If the argument is not the name of a primitive type, `null` is returned.

Parameters:

- `primitiveName`: the name of the primitive type to find

**JLS:** 4.2 Primitive Types and Values

**JLS:** 15.8.2 Class Literals

**Since:** 22

Throws:

- `NullPointerException`: if the argument is `null`

## Class.newInstance()

```java
public T newInstance() throws InstantiationException, IllegalAccessException
```

Creates a new instance of the class represented by this `Class`
object.  The class is instantiated as if by a `new`
expression with an empty argument list.  The class is initialized if it
has not already been initialized.

**Deprecated:** This method propagates any exception thrown by the
nullary constructor, including a checked exception.  Use of
this method effectively bypasses the compile-time exception
checking that would otherwise be performed by the compiler.
The Constructor.newInstance method avoids this problem by wrapping
any exception thrown by the constructor in a (checked) `java.lang.reflect.InvocationTargetException`.

The call

can be replaced by

The latter sequence of calls is inferred to be able to throw
the additional exception types `InvocationTargetException` and `NoSuchMethodException`. Both of these exception types are
subclasses of `ReflectiveOperationException`.

**Returns:** a newly allocated instance of the class represented by this
         object.

Throws:

- `IllegalAccessException`: if the class or its nullary constructor is not accessible.
- `InstantiationException`: if this `Class` represents an abstract class, an interface, an array class, a primitive type, or void; or if the class has no nullary constructor; or if the instantiation fails for some other reason.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.
