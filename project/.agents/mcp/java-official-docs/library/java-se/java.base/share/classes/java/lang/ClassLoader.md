---
title: "ClassLoader class (java.lang) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassLoader class (java.lang)

```java
public abstract class ClassLoader
```

A class loader is an object that is responsible for loading classes. The
class `ClassLoader` is an abstract class.  Given the binary name of a class, a class loader should attempt to
locate or generate data that constitutes a definition for the class.  A
typical strategy is to transform the name into a file name and then read a
"class file" of that name from a file system.

 Every Class object contains a reference to the `ClassLoader` that defined
it.

 `Class` objects for array classes are not created by class
loaders, but are created automatically as required by the Java runtime.
The class loader for an array class, as returned by `Class.getClassLoader()` is the same as the class loader for its element
type; if the element type is a primitive type, then the array class has no
class loader.

 Applications implement subclasses of `ClassLoader` in order to
extend the manner in which the Java virtual machine dynamically loads
classes.

 In addition to loading classes, a class loader is also responsible for
locating resources. A resource is some data (a "`.class`" file,
configuration data, or an image for example) that is identified with an
abstract '/'-separated path name. Resources are typically packaged with an
application or library so that they can be located by code in the
application or library. In some cases, the resources are included so that
they can be located by other libraries.

 The `ClassLoader` class uses a delegation model to search for
classes and resources.  Each instance of `ClassLoader` has an
associated parent class loader. When requested to find a class or
resource, a `ClassLoader` instance will usually delegate the search
for the class or resource to its parent class loader before attempting to
find the class or resource itself.

 Class loaders that support concurrent loading of classes are known as
*parallel capable* class
loaders and are required to register themselves at their class initialization
time by invoking the ClassLoader.registerAsParallelCapable
method. Note that the `ClassLoader` class is registered as parallel
capable by default. However, its subclasses still need to register themselves
if they are parallel capable.
In environments in which the delegation model is not strictly
hierarchical, class loaders need to be parallel capable, otherwise class
loading can lead to deadlocks because the loader lock is held for the
duration of the class loading process (see loadClass methods).

####  Run-time Built-in Class Loaders

The Java run-time has the following built-in class loaders:

-

Bootstrap class loader.
    It is the virtual machine's built-in class loader, typically represented
    as `null`, and does not have a parent.

-

Platform class loader.
    The platform class loader is responsible for loading the
    *platform classes*.  Platform classes include Java SE platform APIs,
    their implementation classes and JDK-specific run-time classes that are
    defined by the platform class loader or its ancestors.
    The platform class loader can be used as the parent of a `ClassLoader`
    instance.

 To allow for upgrading/overriding of modules defined to the platform
    class loader, and where upgraded modules read modules defined to class
    loaders other than the platform class loader and its ancestors, then
    the platform class loader may have to delegate to other class loaders,
    the application class loader for example.
    In other words, classes in named modules defined to class loaders
    other than the platform class loader and its ancestors may be visible
    to the platform class loader.

-

System class loader.
    It is also known as *application class loader* and is distinct
    from the platform class loader.
    The system class loader is typically used to define classes on the
    application class path, module path, and JDK-specific tools.
    The platform class loader is the parent or an ancestor of the system class
    loader, so the system class loader can load platform classes by delegating
    to its parent.

 Normally, the Java virtual machine loads classes from the local file
system in a platform-dependent manner.
However, some classes may not originate from a file; they may originate
from other sources, such as the network, or they could be constructed by an
application.  The method byte[], int, int) defineClass converts an array of bytes into an instance of class
`Class`. Instances of this newly defined class can be created using
Class.newInstance.

 The methods and constructors of objects created by a class loader may
reference other classes.  To determine the class(es) referred to, the Java
virtual machine invokes the loadClass method of
the class loader that originally created the class.

 For example, an application could create a network class loader to
download class files from a server.  Sample code might look like:

```java
  ClassLoader loader = new NetworkClassLoader(host, port);
  Object main = loader.loadClass("Main", true).newInstance();
       . . .
```

 The network class loader subclass must define the methods findClass and `loadClassData` to load a class
from the network.  Once it has downloaded the bytes that make up the class,
it should use the method defineClass to
create a class instance.  A sample implementation is:

```java
    class NetworkClassLoader extends ClassLoader {
        String host;
        int port;

        public Class findClass(String name) {
            byte[] b = loadClassData(name);
            return defineClass(name, b, 0, b.length);
        }

        private byte[] loadClassData(String name) {
            // load the class data from the connection
             . . .
        }
```

####  Binary names

 Any class name provided as a `String` parameter to methods in
`ClassLoader` must be a binary name as defined by
*The Java Language Specification*.

 Examples of valid class names include:

```java
  "java.lang.String"
  "javax.swing.JSpinner$DefaultEditor"
  "java.security.KeyStore$Builder$FileBuilder$1"
  "java.net.URLClassLoader$3$1"
```

 Any package name provided as a `String` parameter to methods in
`ClassLoader` must be either the empty string (denoting an unnamed package)
or a fully qualified name as defined by
*The Java Language Specification*.

**JLS:** 6.7 Fully Qualified Names and Canonical Names

**JLS:** 13.1 The Form of a Binary

**See also:** #resolveClass(Class)

**Since:** 1.0

## ClassLoader.ClassLoader(String, ClassLoader)

```java
protected ClassLoader(String name, ClassLoader parent)
```

Creates a new class loader of the specified name and using the
specified parent class loader for delegation.

Parameters:

- `name`: class loader name; or `null` if not named
- `parent`: the parent class loader

**API note:** If the parent is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.

**Since:** 9

Throws:

- `IllegalArgumentException`: if the given name is empty.

## ClassLoader.ClassLoader(ClassLoader)

```java
protected ClassLoader(ClassLoader parent)
```

Creates a new class loader using the specified parent class loader for
delegation.

Parameters:

- `parent`: The parent class loader

**API note:** If the parent is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.

**Since:** 1.2

## ClassLoader.ClassLoader()

```java
protected ClassLoader()
```

Creates a new class loader using the `ClassLoader` returned by
the method getSystemClassLoader() as the parent class loader.

## ClassLoader.getName()

```java
public String getName()
```

Returns the name of this class loader or `null` if
this class loader is not named.

**API note:** This method is non-final for compatibility.  If this
method is overridden, this method must return the same name
as specified when this class loader was instantiated.

**Returns:** name of this class loader; or `null` if
this class loader is not named.

**Since:** 9

## ClassLoader.loadClass(String)

```java
public Class<?> loadClass(String name) throws ClassNotFoundException
```

Loads the class with the specified binary name.
This method searches for classes in the same manner as the boolean) method.  It is invoked by the Java virtual
machine to resolve class references.  Invoking this method is equivalent
to invoking boolean) loadClass(name, false).

Parameters:

- `name`: The binary name of the class

**Returns:** The resulting `Class` object

Throws:

- `ClassNotFoundException`: If the class was not found

## ClassLoader.loadClass(String, boolean)

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException
```

Loads the class with the specified binary name.  The
default implementation of this method searches for classes in the
following order:

-

 Invoke `findLoadedClass(String)` to check if the class
  has already been loaded.

-

 Invoke the loadClass method
  on the parent class loader.  If the parent is `null` the class
  loader built into the virtual machine is used, instead.

-

 Invoke the `findClass(String)` method to find the
  class.

 If the class was found using the above steps, and the
`resolve` flag is true, this method will then invoke the `resolveClass(Class)` method on the resulting `Class` object.

 Subclasses of `ClassLoader` are encouraged to override `findClass(String)`, rather than this method.

 Unless overridden, this method synchronizes on the result of
getClassLoadingLock method
during the entire class loading process.

Parameters:

- `name`: The binary name of the class
- `resolve`: If `true` then resolve the class

**Returns:** The resulting `Class` object

Throws:

- `ClassNotFoundException`: If the class could not be found

## ClassLoader.getClassLoadingLock(String)

```java
protected Object getClassLoadingLock(String className)
```

Returns the lock object for class loading operations.

Parameters:

- `className`: The name of the to-be-loaded class

**Implementation requirements:** If this `ClassLoader` object is registered as parallel capable,
this method returns a dedicated object associated with the specified
class name. Otherwise, this method returns this `ClassLoader` object.

**API note:** This method allows parallel capable class loaders to implement
finer-grained locking schemes such that multiple threads may load classes
concurrently without deadlocks.  For non-parallel-capable class loaders,
the `ClassLoader` object is synchronized on during the class loading
operations.  Class loaders with non-hierarchical delegation should be
registered as parallel capable
to prevent deadlocks.

**Returns:** the lock for class loading operations

**See also:** #loadClass(String, boolean)

**Since:** 1.7

Throws:

- `NullPointerException`: If registered as parallel capable and `className` is `null`

## ClassLoader.findClass(String)

```java
protected Class<?> findClass(String name) throws ClassNotFoundException
```

Finds the class with the specified binary name.
This method should be overridden by class loader implementations that
follow the delegation model for loading classes, and will be invoked by
the loadClass method after checking the
parent class loader for the requested class.

Parameters:

- `name`: The binary name of the class

**Implementation requirements:** The default implementation throws `ClassNotFoundException`.

**Returns:** The resulting `Class` object

**Since:** 1.2

Throws:

- `ClassNotFoundException`: If the class could not be found

## ClassLoader.findClass(String, String)

```java
protected Class<?> findClass(String moduleName, String name)
```

Finds the class with the given binary name
in a module defined to this class loader.
Class loader implementations that support loading from modules
should override this method.

Parameters:

- `moduleName`: The module name; or `null` to find the class in the unnamed module for this class loader
- `name`: The binary name of the class

**API note:** This method returns `null` rather than throwing
         `ClassNotFoundException` if the class could not be found.

**Implementation requirements:** The default implementation attempts to find the class by
invoking `findClass(String)` when the `moduleName` is
`null`. It otherwise returns `null`.

**Returns:** The resulting `Class` object, or `null`
        if the class could not be found.

**Since:** 9

## ClassLoader.defineClass(byte[], int, int)

```java
protected final Class<?> defineClass(byte[] b, int off, int len) throws ClassFormatError
```

Converts an array of bytes into an instance of class `Class`.
Before the `Class` can be used it must be resolved.  This method
is deprecated in favor of the version that takes a binary name as its first argument, and is more secure.

Parameters:

- `b`: The bytes that make up the class data. The bytes in positions `off` through `off+len-1` should have the format of a valid class file as defined by *The Java Virtual Machine Specification*.
- `off`: The start offset in `b` of the class data
- `len`: The length of the class data

**Returns:** The `Class` object that was created from the specified
         class data

**See also:** #loadClass(String, boolean)

**See also:** #resolveClass(Class)

**Deprecated:** Replaced by byte[], int, int) defineClass(String, byte[], int, int)

Throws:

- `ClassFormatError`: If the data did not contain a valid class
- `IndexOutOfBoundsException`: If either `off` or `len` is negative, or if `off+len` is greater than `b.length`.
- `SecurityException`: If an attempt is made to add this class to a package that contains classes that were signed by a different set of certificates than this class, or if an attempt is made to define a class in a package with a fully-qualified name that starts with "`java.`".
