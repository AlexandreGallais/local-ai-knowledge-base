---
title: "URLClassLoader class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLClassLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLClassLoader class (java.net)

```java
public class URLClassLoader extends SecureClassLoader implements Closeable
```

This class loader is used to load classes and resources from a search
path of URLs referring to both JAR files and directories. Any `jar:`
scheme URL (see `java.net.JarURLConnection`) is assumed to refer to a
JAR file.  Any `file:` scheme URL that ends with a '/' is assumed to
refer to a directory. Otherwise, the URL is assumed to refer to a JAR file
which will be opened as needed.

This class loader supports the loading of classes and resources from the
contents of a multi-release
JAR file that is referred to by a given URL.

**Since:** 1.2

## URLClassLoader.URLClassLoader(URL[], ClassLoader)

```java
public URLClassLoader(URL[] urls, ClassLoader parent)
```

Constructs a new URLClassLoader for the given URLs. The URLs will be
searched in the order specified for classes and resources after first
searching in the specified parent class loader.  Any `jar:`
scheme URL is assumed to refer to a JAR file.  Any `file:` scheme
URL that ends with a '/' is assumed to refer to a directory.  Otherwise,
the URL is assumed to refer to a JAR file which will be downloaded and
opened as needed.

Parameters:

- `urls`: the URLs from which to load classes and resources
- `parent`: the parent class loader for delegation, can be `null` for the bootstrap class loader

**API note:** If `parent` is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See Run-time Built-in Class Loaders
for information on the bootstrap class loader and other built-in class loaders.

Throws:

- `NullPointerException`: if `urls` or any of its elements is `null`.

## URLClassLoader.URLClassLoader(URL[])

```java
public URLClassLoader(URL[] urls)
```

Constructs a new URLClassLoader for the specified URLs using the
system class loader as the parent. The URLs will be searched in the order
specified for classes and resources after first searching in the
parent class loader. Any URL that ends with a '/' is assumed to
refer to a directory. Otherwise, the URL is assumed to refer to
a JAR file which will be downloaded and opened as needed.

Parameters:

- `urls`: the URLs from which to load classes and resources

Throws:

- `NullPointerException`: if `urls` or any of its elements is `null`.

## URLClassLoader.URLClassLoader(URL[], ClassLoader, URLStreamHandlerFactory)

```java
public URLClassLoader(URL[] urls, ClassLoader parent, URLStreamHandlerFactory factory)
```

Constructs a new URLClassLoader for the specified URLs, parent
class loader, and URLStreamHandlerFactory. The parent argument
will be used as the parent class loader for delegation. The
factory argument will be used as the stream handler factory to
obtain protocol handlers when creating new jar URLs.

Parameters:

- `urls`: the URLs from which to load classes and resources
- `parent`: the parent class loader for delegation, can be `null` for the bootstrap class loader
- `factory`: the URLStreamHandlerFactory to use when creating URLs

**API note:** If `parent` is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See Run-time Built-in Class Loaders
for information on the bootstrap class loader and other built-in class loaders.

Throws:

- `NullPointerException`: if `urls` or any of its elements is `null`.

## URLClassLoader.URLClassLoader(String, URL[], ClassLoader)

```java
public URLClassLoader(String name, URL[] urls, ClassLoader parent)
```

Constructs a new named `URLClassLoader` for the specified URLs.
The URLs will be searched in the order specified for classes
and resources after first searching in the specified parent class loader.
Any URL that ends with a '/' is assumed to refer to a directory.
Otherwise, the URL is assumed to refer to a JAR file which will be
downloaded and opened as needed.

Parameters:

- `name`: class loader name; or `null` if not named
- `urls`: the URLs from which to load classes and resources
- `parent`: the parent class loader for delegation, can be `null` for the bootstrap class loader

**API note:** If `parent` is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See Run-time Built-in Class Loaders
for information on the bootstrap class loader and other built-in class loaders.

**Since:** 9

Throws:

- `IllegalArgumentException`: if the given name is empty.
- `NullPointerException`: if `urls` or any of its elements is `null`.

## URLClassLoader.URLClassLoader(String, URL[], ClassLoader, URLStreamHandlerFactory)

```java
public URLClassLoader(String name, URL[] urls, ClassLoader parent, URLStreamHandlerFactory factory)
```

Constructs a new named `URLClassLoader` for the specified URLs,
parent class loader, and URLStreamHandlerFactory.
The parent argument will be used as the parent class loader for delegation.
The factory argument will be used as the stream handler factory to
obtain protocol handlers when creating new jar URLs.

Parameters:

- `name`: class loader name; or `null` if not named
- `urls`: the URLs from which to load classes and resources
- `parent`: the parent class loader for delegation, can be `null` for the bootstrap class loader
- `factory`: the URLStreamHandlerFactory to use when creating URLs

**API note:** If `parent` is specified as `null` (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See Run-time Built-in Class Loaders
for information on the bootstrap class loader and other built-in class loaders.

**Since:** 9

Throws:

- `IllegalArgumentException`: if the given name is empty.
- `NullPointerException`: if `urls` or any of its elements is `null`.

## URLClassLoader.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name)
```

Returns an input stream for reading the specified resource.
If this loader is closed, then any resources opened by this method
will be closed.

 The search order is described in the documentation for `getResource(String)`.

Parameters:

- `name`: The resource name

**Returns:** An input stream for reading the resource, or `null`
         if the resource could not be found

**Since:** 1.7

Throws:

- `NullPointerException`: If `name` is `null`

## URLClassLoader.close()

```java
public void close() throws IOException
```

Closes this URLClassLoader, so that it can no longer be used to load
new classes or resources that are defined by this loader.
Classes and resources defined by any of this loader's parents in the
delegation hierarchy are still accessible. Also, any classes or resources
that are already loaded, are still accessible.

In the case of jar: and file: URLs, it also closes any files
that were opened by it. If another thread is loading a
class when the `close` method is invoked, then the result of
that load is undefined.

The method makes a best effort attempt to close all opened files,
by catching `IOException`s internally. Unchecked exceptions
and errors are not caught. Calling close on an already closed
loader has no effect.

**Since:** 1.7

Throws:

- `IOException`: if closing any file opened by this class loader resulted in an IOException. Any such exceptions are caught internally. If only one is caught, then it is re-thrown. If more than one exception is caught, then the second and following exceptions are added as suppressed exceptions of the first one caught, which is then re-thrown.

## URLClassLoader.addURL(URL)

```java
protected void addURL(URL url)
```

Appends the specified URL to the list of URLs to search for
classes and resources.

If the URL specified is `null` or is already in the
list of URLs, or if this loader is closed, then invoking this
method has no effect.

Parameters:

- `url`: the URL to be added to the search path of URLs

## URLClassLoader.getURLs()

```java
public URL[] getURLs()
```

Returns the search path of URLs for loading classes and resources.
This includes the original list of URLs specified to the constructor,
along with any URLs subsequently appended by the addURL() method.

**Returns:** the search path of URLs for loading classes and resources.

## URLClassLoader.findClass(String)

```java
protected Class<?> findClass(final String name) throws ClassNotFoundException
```

Finds and loads the class with the specified name from the URL search
path. Any URLs referring to JAR files are loaded and opened as needed
until the class is found.

Parameters:

- `name`: the name of the class

**Returns:** the resulting class

Throws:

- `ClassNotFoundException`: if the class could not be found, or if the loader is closed.
- `NullPointerException`: if `name` is `null`.

## URLClassLoader.definePackage(String, Manifest, URL)

```java
protected Package definePackage(String name, Manifest man, URL url)
```

Defines a new package by name in this `URLClassLoader`.
The attributes contained in the specified `Manifest`
will be used to obtain package version and sealing information.
For sealed packages, the additional URL specifies the code source URL
from which the package was loaded.

Parameters:

- `name`: the package name
- `man`: the `Manifest` containing package version and sealing information
- `url`: the code source url for the package, or null if none

**Returns:** the newly defined `Package` object

Throws:

- `IllegalArgumentException`: if the package name is already defined by this class loader

## URLClassLoader.findResource(String)

```java
public URL findResource(final String name)
```

Finds the resource with the specified name on the URL search path.

Parameters:

- `name`: the name of the resource

**Returns:** a `URL` for the resource, or `null`
if the resource could not be found, or if the loader is closed.

## URLClassLoader.findResources(String)

```java
public Enumeration<URL> findResources(final String name) throws IOException
```

Returns an Enumeration of URLs representing all of the resources
on the URL search path having the specified name.

Parameters:

- `name`: the resource name

**Returns:** An `Enumeration` of `URL`s.
        If the loader is closed, the Enumeration contains no elements.

Throws:

- `IOException`: if an I/O exception occurs

## URLClassLoader.getPermissions(CodeSource)

```java
protected PermissionCollection getPermissions(CodeSource codesource)
```

Parameters:

- `codesource`: the `CodeSource`

Throws:

- `NullPointerException`: if `codesource` is `null`.

## URLClassLoader.newInstance(URL[], ClassLoader)

```java
public static URLClassLoader newInstance(final URL[] urls, final ClassLoader parent)
```

Creates a new instance of URLClassLoader for the specified
URLs and parent class loader.

Parameters:

- `urls`: the URLs to search for classes and resources
- `parent`: the parent class loader for delegation

**Returns:** the resulting class loader

Throws:

- `NullPointerException`: if `urls` or any of its elements is `null`.

## URLClassLoader.newInstance(URL[])

```java
public static URLClassLoader newInstance(final URL[] urls)
```

Creates a new instance of URLClassLoader for the specified
URLs and default parent class loader.

Parameters:

- `urls`: the URLs to search for classes and resources

**Returns:** the resulting class loader

Throws:

- `NullPointerException`: if `urls` or any of its elements is `null`.
