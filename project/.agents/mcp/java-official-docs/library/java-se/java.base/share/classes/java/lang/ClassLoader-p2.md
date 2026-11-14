---
title: "ClassLoader class (java.lang) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassLoader class (java.lang) (part 2 of 4)

## ClassLoader.defineClass(String, byte[], int, int)

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len) throws ClassFormatError
```

Converts an array of bytes into an instance of class `Class`.
Before the `Class` can be used it must be resolved.

 This method assigns a default ProtectionDomain to the newly defined class. The
`getPermissions` method of the `ProtectionDomain` always
returns `null`.
The default protection domain is created on the first invocation
of byte[], int, int) defineClass,
and re-used on subsequent invocations.

 To assign a specific `ProtectionDomain` to the class, use
the byte[], int, int, java.security.ProtectionDomain) defineClass method that takes a
`ProtectionDomain` as one of its arguments.

This method defines a package in this class loader corresponding to the
package of the `Class` (if such a package has not already been defined
in this class loader). The name of the defined package is derived from
the binary name of the class specified by
the byte array `b`.
Other properties of the defined package are as specified by `Package`.

Parameters:

- `name`: The expected binary name of the class, or `null` if not known
- `b`: The bytes that make up the class data. The bytes in positions `off` through `off+len-1` should have the format of a valid class file as defined by *The Java Virtual Machine Specification*.
- `off`: The start offset in `b` of the class data
- `len`: The length of the class data

**Returns:** The `Class` object that was created from the specified
         class data.

**See also:** #loadClass(String, boolean)

**See also:** #resolveClass(Class)

**See also:** java.security.CodeSource

**See also:** java.security.SecureClassLoader

**Since:** 1.1

Throws:

- `ClassFormatError`: If the data did not contain a valid class
- `IndexOutOfBoundsException`: If either `off` or `len` is negative, or if `off+len` is greater than `b.length`.
- `SecurityException`: If an attempt is made to add this class to a package that contains classes that were signed by a different set of certificates than this class (which is unsigned), or if `name` begins with "`java.`".

## ClassLoader.defineClass(String, byte[], int, int, ProtectionDomain)

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len, ProtectionDomain protectionDomain) throws ClassFormatError
```

Converts an array of bytes into an instance of class `Class`,
with a given `ProtectionDomain`.

 If the given `ProtectionDomain` is `null`,
then a default protection domain will be assigned to the class as specified
in the documentation for byte[], int, int).
Before the class can be used it must be resolved.

 The first class defined in a package determines the exact set of
certificates that all subsequent classes defined in that package must
contain.  The set of certificates for a class is obtained from the
CodeSource within the
`ProtectionDomain` of the class.  Any classes added to that
package must contain the same set of certificates or a
`SecurityException` will be thrown.  Note that if
`name` is `null`, this check is not performed.
You should always pass in the binary name of the
class you are defining as well as the bytes.  This ensures that the
class you are defining is indeed the class you think it is.

 If the specified `name` begins with "`java.`", it can
only be defined by the platform class loader or its ancestors; otherwise `SecurityException`
will be thrown.  If `name` is not `null`, it must be equal to
the binary name of the class
specified by the byte array `b`, otherwise a NoClassDefFoundError will be thrown.

 This method defines a package in this class loader corresponding to the
package of the `Class` (if such a package has not already been defined
in this class loader). The name of the defined package is derived from
the binary name of the class specified by
the byte array `b`.
Other properties of the defined package are as specified by `Package`.

Parameters:

- `name`: The expected binary name of the class, or `null` if not known
- `b`: The bytes that make up the class data. The bytes in positions `off` through `off+len-1` should have the format of a valid class file as defined by *The Java Virtual Machine Specification*.
- `off`: The start offset in `b` of the class data
- `len`: The length of the class data
- `protectionDomain`: The `ProtectionDomain` of the class

**Returns:** The `Class` object created from the data,
         and `ProtectionDomain`.

Throws:

- `ClassFormatError`: If the data did not contain a valid class
- `NoClassDefFoundError`: If `name` is not `null` and not equal to the binary name of the class specified by `b`
- `IndexOutOfBoundsException`: If either `off` or `len` is negative, or if `off+len` is greater than `b.length`.
- `SecurityException`: If an attempt is made to add this class to a package that contains classes that were signed by a different set of certificates than this class, or if `name` begins with "`java.`" and this class loader is not the platform class loader or its ancestor.

## ClassLoader.defineClass(String, java.nio.ByteBuffer, ProtectionDomain)

```java
protected final Class<?> defineClass(String name, java.nio.ByteBuffer b, ProtectionDomain protectionDomain) throws ClassFormatError
```

Converts a ByteBuffer into an instance
of class `Class`, with the given `ProtectionDomain`.
If the given `ProtectionDomain` is `null`, then a default
protection domain will be assigned to the class as
specified in the documentation for byte[], int, int).  Before the class can be used it must be resolved.

The rules about the first class defined in a package determining the
set of certificates for the package, the restrictions on class names,
and the defined package of the class
are identical to those specified in the documentation for byte[], int, int, ProtectionDomain).

 An invocation of this method of the form
*cl*`.defineClass(`*name*`,`
*bBuffer*`,` *pd*`)` yields exactly the same
result as the statements

 `
...

byte[] temp = new byte[bBuffer.remaining()];

    bBuffer.get(temp);

    return byte[], int, int, ProtectionDomain) cl.defineClass(name, temp, 0,
temp.length, pd);

`

Parameters:

- `name`: The expected binary name. of the class, or `null` if not known
- `b`: The bytes that make up the class data. The bytes from positions `b.position()` through `b.position() + b.limit() -1` should have the format of a valid class file as defined by *The Java Virtual Machine Specification*.
- `protectionDomain`: The `ProtectionDomain` of the class, or `null`.

**Returns:** The `Class` object created from the data,
         and `ProtectionDomain`.

**See also:** #defineClass(String, byte[], int, int, ProtectionDomain)

**Since:** 1.5

Throws:

- `ClassFormatError`: If the data did not contain a valid class.
- `NoClassDefFoundError`: If `name` is not `null` and not equal to the binary name of the class specified by `b`
- `SecurityException`: If an attempt is made to add this class to a package that contains classes that were signed by a different set of certificates than this class, or if `name` begins with "`java.`".

## ClassLoader.resolveClass(Class<?>)

```java
protected final void resolveClass(Class<?> c)
```

Links the specified class.  This (misleadingly named) method may be
used by a class loader to link a class.  If the class `c` has
already been linked, then this method simply returns. Otherwise, the
class is linked as described in the "Execution" chapter of
*The Java Language Specification*.

Parameters:

- `c`: The class to link

**See also:** #defineClass(String, byte[], int, int)

Throws:

- `NullPointerException`: If `c` is `null`.

## ClassLoader.findSystemClass(String)

```java
protected final Class<?> findSystemClass(String name) throws ClassNotFoundException
```

Finds a class with the specified binary name,
loading it if necessary.

 This method loads the class through the system class loader (see
`getSystemClassLoader()`).  The `Class` object returned
might have more than one `ClassLoader` associated with it.
Subclasses of `ClassLoader` need not usually invoke this method,
because most class loaders need to override just `findClass(String)`.

Parameters:

- `name`: The binary name of the class

**Returns:** The `Class` object for the specified `name`

**See also:** #ClassLoader(ClassLoader)

**See also:** #getParent()

Throws:

- `ClassNotFoundException`: If the class could not be found

## ClassLoader.findLoadedClass(String)

```java
protected final Class<?> findLoadedClass(String name)
```

Returns the class with the given binary name if this
loader has been recorded by the Java virtual machine as an initiating
loader of a class with that binary name.  Otherwise
`null` is returned.

Parameters:

- `name`: The binary name of the class

**Returns:** The `Class` object, or `null` if the class has
         not been loaded

**Since:** 1.1

## ClassLoader.setSigners(Class<?>, Object[])

```java
protected final void setSigners(Class<?> c, Object[] signers)
```

Sets the signers of a class.  This should be invoked after defining a
class.

Parameters:

- `c`: The `Class` object
- `signers`: The signers for the class

**Since:** 1.1

## ClassLoader.findResource(String, String)

```java
protected URL findResource(String moduleName, String name) throws IOException
```

Returns a URL to a resource in a module defined to this class loader.
Class loader implementations that support loading from modules
should override this method.

Parameters:

- `moduleName`: The module name; or `null` to find a resource in the unnamed module for this class loader
- `name`: The resource name

**API note:** This method is the basis for the Class.getResource, Class.getResourceAsStream, and Module.getResourceAsStream methods. It is not subject to the rules for
encapsulation specified by `Module.getResourceAsStream`.

**Implementation requirements:** The default implementation attempts to find the resource by
invoking `findResource(String)` when the `moduleName` is
`null`. It otherwise returns `null`.

**Returns:** A URL to the resource; `null` if the resource could not be
        found, a URL could not be constructed to locate the resource, or
        there isn't a module of the given name defined to the class
        loader.

**See also:** java.lang.module.ModuleReader#find(String)

**Since:** 9

Throws:

- `IOException`: If I/O errors occur

## ClassLoader.getResource(String)

```java
public URL getResource(String name)
```

Finds the resource with the given name.  A resource is some data
(images, audio, text, etc) that can be accessed by class code in a way
that is independent of the location of the code.

 The name of a resource is a '`/`'-separated path name that
identifies the resource.

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally (even if the caller of this method is in the
same module as the resource).

Parameters:

- `name`: The resource name

**Implementation requirements:** The default implementation will first search the parent class
loader for the resource; if the parent is `null` the path of the
class loader built into the virtual machine is searched. If not found,
this method will invoke `findResource(String)` to find the resource.

**API note:** Where several modules are defined to the same class loader,
and where more than one module contains a resource with the given name,
then the ordering that modules are searched is not specified and may be
very unpredictable.
When overriding this method it is recommended that an implementation
ensures that any delegation is consistent with the getResources(String) method.

**Returns:** `URL` object for reading the resource; `null` if
         the resource could not be found, a `URL` could not be
         constructed to locate the resource, or the resource is in a package
         that is not opened unconditionally.

**Since:** 1.1

Throws:

- `NullPointerException`: If `name` is `null`

## ClassLoader.getResources(String)

```java
public Enumeration<URL> getResources(String name) throws IOException
```

Finds all the resources with the given name. A resource is some data
(images, audio, text, etc) that can be accessed by class code in a way
that is independent of the location of the code.

 The name of a resource is a `/`-separated path name that
identifies the resource.

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally (even if the caller of this method is in the
same module as the resource).

Parameters:

- `name`: The resource name

**Implementation requirements:** The default implementation will first search the parent class
loader for the resource; if the parent is `null` the path of the
class loader built into the virtual machine is searched. It then
invokes `findResources(String)` to find the resources with the
name in this class loader. It returns an enumeration whose elements
are the URLs found by searching the parent class loader followed by
the elements found with `findResources`.

**API note:** Where several modules are defined to the same class loader,
and where more than one module contains a resource with the given name,
then the ordering is not specified and may be very unpredictable.
When overriding this method it is recommended that an
implementation ensures that any delegation is consistent with the getResource(String) method. This should
ensure that the first element returned by the Enumeration's
`nextElement` method is the same resource that the
`getResource(String)` method would return.

**Returns:** An enumeration of URL objects for the
         resource. If no resources could be found, the enumeration will
         be empty. Resources for which a `URL` cannot be
         constructed, or are in a package that is not opened
         unconditionally, are not returned in the enumeration.

**Since:** 1.2

Throws:

- `IOException`: If I/O errors occur
- `NullPointerException`: If `name` is `null`
