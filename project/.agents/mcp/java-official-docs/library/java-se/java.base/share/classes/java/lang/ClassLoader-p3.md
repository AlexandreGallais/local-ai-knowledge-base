---
title: "ClassLoader class (java.lang) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassLoader class (java.lang) (part 3 of 4)

## ClassLoader.resources(String)

```java
public Stream<URL> resources(String name)
```

Returns a stream whose elements are the URLs of all the resources with
the given name. A resource is some data (images, audio, text, etc) that
can be accessed by class code in a way that is independent of the
location of the code.

 The name of a resource is a `/`-separated path name that
identifies the resource.

 The resources will be located when the returned stream is evaluated.
If the evaluation results in an `IOException` then the I/O
exception is wrapped in an `UncheckedIOException` that is then
thrown.

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally (even if the caller of this method is in the
same module as the resource).

Parameters:

- `name`: The resource name

**Implementation requirements:** The default implementation invokes getResources to find all the resources with the given name and returns
a stream with the elements in the enumeration as the source.

**API note:** When overriding this method it is recommended that an
implementation ensures that any delegation is consistent with the getResource(String) method. This should
ensure that the first element returned by the stream is the same
resource that the `getResource(String)` method would return.

**Returns:** A stream of resource URL objects. If no
         resources could  be found, the stream will be empty. Resources
         for which a `URL` cannot be constructed, or are in a package
         that is not opened unconditionally, will not be in the stream.

**Since:** 9

Throws:

- `NullPointerException`: If `name` is `null`

## ClassLoader.findResource(String)

```java
protected URL findResource(String name)
```

Finds the resource with the given name. Class loader implementations
should override this method.

 For resources in named modules then the method must implement the
rules for encapsulation specified in the `Module` getResourceAsStream method. Additionally,
it must not find non-"`.class`" resources in packages of named
modules unless the package is opened
unconditionally.

Parameters:

- `name`: The resource name

**Implementation requirements:** The default implementation returns `null`.

**Returns:** `URL` object for reading the resource; `null` if
         the resource could not be found, a `URL` could not be
         constructed to locate the resource, or the resource is in a package
         that is not opened unconditionally.

**Since:** 1.2

## ClassLoader.findResources(String)

```java
protected Enumeration<URL> findResources(String name) throws IOException
```

Returns an enumeration of URL objects
representing all the resources with the given name. Class loader
implementations should override this method.

 For resources in named modules then the method must implement the
rules for encapsulation specified in the `Module` getResourceAsStream method. Additionally,
it must not find non-"`.class`" resources in packages of named
modules unless the package is opened
unconditionally.

Parameters:

- `name`: The resource name

**Implementation requirements:** The default implementation returns an enumeration that
contains no elements.

**Returns:** An enumeration of URL objects for
         the resource. If no resources could  be found, the enumeration
         will be empty. Resources for which a `URL` cannot be
         constructed, or are in a package that is not opened unconditionally,
         are not returned in the enumeration.

**Since:** 1.2

Throws:

- `IOException`: If I/O errors occur

## ClassLoader.registerAsParallelCapable()

```java
protected static boolean registerAsParallelCapable()
```

Registers the caller as
parallel capable.
The registration succeeds if and only if all of the following
conditions are met:

-  no instance of the caller has been created

-  all of the super classes (except class Object) of the caller are
registered as parallel capable

Note that once a class loader is registered as parallel capable, there
is no way to change it back.

In cases where this method is called from a context where the caller is
not a subclass of `ClassLoader` or there is no caller frame on the
stack (e.g. when called directly from a JNI attached thread),
`IllegalCallerException` is thrown.

**Returns:** `true` if the caller is successfully registered as
         parallel capable and `false` if otherwise.

**See also:** #isRegisteredAsParallelCapable()

**Since:** 1.7

Throws:

- `IllegalCallerException`: if the caller is not a subclass of `ClassLoader`

## ClassLoader.isRegisteredAsParallelCapable()

```java
public final boolean isRegisteredAsParallelCapable()
```

Returns `true` if this class loader is registered as
parallel capable, otherwise
`false`.

**Returns:** `true` if this class loader is parallel capable,
         otherwise `false`.

**See also:** #registerAsParallelCapable()

**Since:** 9

## ClassLoader.getSystemResource(String)

```java
public static URL getSystemResource(String name)
```

Find a resource of the specified name from the search path used to load
classes.  This method locates the resource through the system class
loader (see `getSystemClassLoader()`).

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally.

Parameters:

- `name`: The resource name

**Returns:** A URL to the resource; `null` if the resource could not be found, a URL could not be
         constructed to locate the resource, or the resource is in a package
         that is not opened unconditionally.

**Since:** 1.1

## ClassLoader.getSystemResources(String)

```java
public static Enumeration<URL> getSystemResources(String name) throws IOException
```

Finds all resources of the specified name from the search path used to
load classes.  The resources thus found are returned as an
Enumeration of URL objects.

 The search order is described in the documentation for `getSystemResource(String)`.

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally.

Parameters:

- `name`: The resource name

**Returns:** An enumeration of URL objects for
         the resource. If no resources could  be found, the enumeration
         will be empty. Resources for which a `URL` cannot be
         constructed, or are in a package that is not opened unconditionally,
         are not returned in the enumeration.

**Since:** 1.2

Throws:

- `IOException`: If I/O errors occur

## ClassLoader.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name)
```

Returns an input stream for reading the specified resource.

 The search order is described in the documentation for `getResource(String)`.

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally.

Parameters:

- `name`: The resource name

**Returns:** An input stream for reading the resource; `null` if the
         resource could not be found, or the resource is in a package that
         is not opened unconditionally.

**Since:** 1.1

Throws:

- `NullPointerException`: If `name` is `null`

## ClassLoader.getSystemResourceAsStream(String)

```java
public static InputStream getSystemResourceAsStream(String name)
```

Open for reading, a resource of the specified name from the search path
used to load classes.  This method locates the resource through the
system class loader (see `getSystemClassLoader()`).

 Resources in named modules are subject to the encapsulation rules
specified by Module.getResourceAsStream.
Additionally, and except for the special case where the resource has a
name ending with "`.class`", this method will only find resources in
packages of named modules when the package is opened unconditionally.

Parameters:

- `name`: The resource name

**Returns:** An input stream for reading the resource; `null` if the
         resource could not be found, or the resource is in a package that
         is not opened unconditionally.

**Since:** 1.1

## ClassLoader.getParent()

```java
public final ClassLoader getParent()
```

Returns the parent class loader for delegation. Some implementations may
use `null` to represent the bootstrap class loader. This method
will return `null` in such implementations if this class loader's
parent is the bootstrap class loader.

**Returns:** The parent `ClassLoader`

**Since:** 1.2

## ClassLoader.getUnnamedModule()

```java
public final Module getUnnamedModule()
```

Returns the unnamed `Module` for this class loader.

**Returns:** The unnamed Module for this class loader

**See also:** Module#isNamed()

**Since:** 9

## ClassLoader.getPlatformClassLoader()

```java
public static ClassLoader getPlatformClassLoader()
```

Returns the platform class loader.  All
platform classes are visible to
the platform class loader.

**Implementation note:** The name of the builtin platform class loader is
`"platform"`.

**Returns:** The platform `ClassLoader`.

**Since:** 9

## ClassLoader.getSystemClassLoader()

```java
public static ClassLoader getSystemClassLoader()
```

Returns the system class loader.  This is the default
delegation parent for new `ClassLoader` instances, and is
typically the class loader used to start the application.

 This method is first invoked early in the runtime's startup
sequence, at which point it creates the system class loader. This
class loader will be the context class loader for the main application
thread (for example, the thread that invokes the `main` method of
the main class).

 The default system class loader is an implementation-dependent
instance of this class.

 If the system property "`java.system.class.loader`"
is defined when this method is first invoked then the value of that
property is taken to be the name of a class that will be returned as the
system class loader. The class is loaded using the default system class
loader and must define a public constructor that takes a single parameter
of type `ClassLoader` which is used as the delegation parent. An
instance is then created using this constructor with the default system
class loader as the parameter.  The resulting class loader is defined
to be the system class loader. During construction, the class loader
should take great care to avoid calling `getSystemClassLoader()`.
If circular initialization of the system class loader is detected then
an `IllegalStateException` is thrown.

**Implementation note:** The system property to override the system class loader is not
examined until the VM is almost fully initialized. Code that executes
this method during startup should take care not to cache the return
value until the system is fully initialized.

 The name of the built-in system class loader is `"app"`.
The system property "`java.class.path`" is read during early
initialization of the VM to determine the class path.
An empty value of "`java.class.path`" property is interpreted
differently depending on whether the initial module (the module
containing the main class) is named or unnamed:
If named, the built-in system class loader will have no class path and
will search for classes and resources using the application module path;
otherwise, if unnamed, it will set the class path to the current
working directory.

 JAR files on the class path may contain a `Class-Path` manifest
attribute to specify dependent JAR files to be included in the class path.
`Class-Path` entries must meet certain conditions for validity (see
the
JAR File Specification for details).  Invalid `Class-Path`
entries are ignored.  For debugging purposes, ignored entries can be
printed to the console if the
`jdk.net.URLClassPath.showIgnoredClassPathEntries` system
property is set to `true`.

**Returns:** The system `ClassLoader`

Throws:

- `IllegalStateException`: If invoked recursively during the construction of the class loader specified by the "`java.system.class.loader`" property.
- `Error`: If the system property "`java.system.class.loader`" is defined but the named class could not be loaded, the provider class does not define the required constructor, or an exception is thrown by that constructor when it is invoked. The underlying cause of the error can be retrieved via the `Throwable.getCause()` method.
