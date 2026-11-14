# URLClassLoader class (java.net)

```java
public class URLClassLoader extends SecureClassLoader implements Closeable
```

This class loader is used to load classes and resources from a search
path of URLs referring to both JAR files and directories. Any {@code jar:}
scheme URL (see {@link java.net.JarURLConnection}) is assumed to refer to a
JAR file.  Any {@code file:} scheme URL that ends with a '/' is assumed to
refer to a directory. Otherwise, the URL is assumed to refer to a JAR file
which will be opened as needed.
<p>
This class loader supports the loading of classes and resources from the
contents of a <a href="../util/jar/JarFile.html#multirelease">multi-release</a>
JAR file that is referred to by a given URL.

@author  David Connelly
@since   1.2

## URLClassLoader.URLClassLoader(URL[], ClassLoader)

```java
public URLClassLoader(URL[] urls, ClassLoader parent)
```

Constructs a new URLClassLoader for the given URLs. The URLs will be
searched in the order specified for classes and resources after first
searching in the specified parent class loader.  Any {@code jar:}
scheme URL is assumed to refer to a JAR file.  Any {@code file:} scheme
URL that ends with a '/' is assumed to refer to a directory.  Otherwise,
the URL is assumed to refer to a JAR file which will be downloaded and
opened as needed.

@apiNote If {@code parent} is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See {@linkplain ClassLoader##builtinLoaders Run-time Built-in Class Loaders}
for information on the bootstrap class loader and other built-in class loaders.

@param      urls the URLs from which to load classes and resources
@param      parent the parent class loader for delegation, can be {@code null}
                   for the bootstrap class loader
@throws     NullPointerException if {@code urls} or any of its
            elements is {@code null}.

## URLClassLoader.URLClassLoader(URL[])

```java
public URLClassLoader(URL[] urls)
```

Constructs a new URLClassLoader for the specified URLs using the
{@linkplain ClassLoader#getSystemClassLoader() system class loader
as the parent}. The URLs will be searched in the order
specified for classes and resources after first searching in the
parent class loader. Any URL that ends with a '/' is assumed to
refer to a directory. Otherwise, the URL is assumed to refer to
a JAR file which will be downloaded and opened as needed.

@param      urls the URLs from which to load classes and resources

@throws     NullPointerException if {@code urls} or any of its
            elements is {@code null}.

## URLClassLoader.URLClassLoader(URL[], ClassLoader, URLStreamHandlerFactory)

```java
public URLClassLoader(URL[] urls, ClassLoader parent, URLStreamHandlerFactory factory)
```

Constructs a new URLClassLoader for the specified URLs, parent
class loader, and URLStreamHandlerFactory. The parent argument
will be used as the parent class loader for delegation. The
factory argument will be used as the stream handler factory to
obtain protocol handlers when creating new jar URLs.

@apiNote If {@code parent} is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See {@linkplain ClassLoader##builtinLoaders Run-time Built-in Class Loaders}
for information on the bootstrap class loader and other built-in class loaders.

@param  urls the URLs from which to load classes and resources
@param  parent the parent class loader for delegation, can be {@code null}
               for the bootstrap class loader
@param  factory the URLStreamHandlerFactory to use when creating URLs

@throws NullPointerException if {@code urls} or any of its
        elements is {@code null}.

## URLClassLoader.URLClassLoader(String, URL[], ClassLoader)

```java
public URLClassLoader(String name, URL[] urls, ClassLoader parent)
```

Constructs a new named {@code URLClassLoader} for the specified URLs.
The URLs will be searched in the order specified for classes
and resources after first searching in the specified parent class loader.
Any URL that ends with a '/' is assumed to refer to a directory.
Otherwise, the URL is assumed to refer to a JAR file which will be
downloaded and opened as needed.

@apiNote If {@code parent} is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See {@linkplain ClassLoader##builtinLoaders Run-time Built-in Class Loaders}
for information on the bootstrap class loader and other built-in class loaders.

@param  name class loader name; or {@code null} if not named
@param  urls the URLs from which to load classes and resources
@param  parent the parent class loader for delegation, can be {@code null}
               for the bootstrap class loader

@throws IllegalArgumentException if the given name is empty.
@throws NullPointerException if {@code urls} or any of its
        elements is {@code null}.

@since 9

## URLClassLoader.URLClassLoader(String, URL[], ClassLoader, URLStreamHandlerFactory)

```java
public URLClassLoader(String name, URL[] urls, ClassLoader parent, URLStreamHandlerFactory factory)
```

Constructs a new named {@code URLClassLoader} for the specified URLs,
parent class loader, and URLStreamHandlerFactory.
The parent argument will be used as the parent class loader for delegation.
The factory argument will be used as the stream handler factory to
obtain protocol handlers when creating new jar URLs.

@apiNote If {@code parent} is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.
See {@linkplain ClassLoader##builtinLoaders Run-time Built-in Class Loaders}
for information on the bootstrap class loader and other built-in class loaders.

@param  name class loader name; or {@code null} if not named
@param  urls the URLs from which to load classes and resources
@param  parent the parent class loader for delegation, can be {@code null}
               for the bootstrap class loader
@param  factory the URLStreamHandlerFactory to use when creating URLs

@throws IllegalArgumentException if the given name is empty.
@throws NullPointerException if {@code urls} or any of its
        elements is {@code null}.

@since 9

## URLClassLoader.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name)
```

Returns an input stream for reading the specified resource.
If this loader is closed, then any resources opened by this method
will be closed.

<p> The search order is described in the documentation for {@link
#getResource(String)}.  </p>

@param  name
        The resource name

@return  An input stream for reading the resource, or {@code null}
         if the resource could not be found

@throws  NullPointerException If {@code name} is {@code null}

@since  1.7

## URLClassLoader.close()

```java
public void close() throws IOException
```

Closes this URLClassLoader, so that it can no longer be used to load
new classes or resources that are defined by this loader.
Classes and resources defined by any of this loader's parents in the
delegation hierarchy are still accessible. Also, any classes or resources
that are already loaded, are still accessible.
<p>
In the case of jar: and file: URLs, it also closes any files
that were opened by it. If another thread is loading a
class when the {@code close} method is invoked, then the result of
that load is undefined.
<p>
The method makes a best effort attempt to close all opened files,
by catching {@link IOException}s internally. Unchecked exceptions
and errors are not caught. Calling close on an already closed
loader has no effect.

@throws    IOException if closing any file opened by this class loader
resulted in an IOException. Any such exceptions are caught internally.
If only one is caught, then it is re-thrown. If more than one exception
is caught, then the second and following exceptions are added
as suppressed exceptions of the first one caught, which is then re-thrown.

@since 1.7

## URLClassLoader.addURL(URL)

```java
protected void addURL(URL url)
```

Appends the specified URL to the list of URLs to search for
classes and resources.
<p>
If the URL specified is {@code null} or is already in the
list of URLs, or if this loader is closed, then invoking this
method has no effect.

@param url the URL to be added to the search path of URLs

## URLClassLoader.getURLs()

```java
public URL[] getURLs()
```

Returns the search path of URLs for loading classes and resources.
This includes the original list of URLs specified to the constructor,
along with any URLs subsequently appended by the addURL() method.
@return the search path of URLs for loading classes and resources.

## URLClassLoader.findClass(String)

```java
protected Class<?> findClass(final String name) throws ClassNotFoundException
```

Finds and loads the class with the specified name from the URL search
path. Any URLs referring to JAR files are loaded and opened as needed
until the class is found.

@param     name the name of the class
@return    the resulting class
@throws    ClassNotFoundException if the class could not be found,
           or if the loader is closed.
@throws    NullPointerException if {@code name} is {@code null}.

## URLClassLoader.definePackage(String, Manifest, URL)

```java
protected Package definePackage(String name, Manifest man, URL url)
```

Defines a new package by name in this {@code URLClassLoader}.
The attributes contained in the specified {@code Manifest}
will be used to obtain package version and sealing information.
For sealed packages, the additional URL specifies the code source URL
from which the package was loaded.

@param name  the package name
@param man   the {@code Manifest} containing package version and sealing
             information
@param url   the code source url for the package, or null if none
@throws      IllegalArgumentException if the package name is
             already defined by this class loader
@return      the newly defined {@code Package} object

## URLClassLoader.findResource(String)

```java
public URL findResource(final String name)
```

Finds the resource with the specified name on the URL search path.

@param name the name of the resource
@return a {@code URL} for the resource, or {@code null}
if the resource could not be found, or if the loader is closed.

## URLClassLoader.findResources(String)

```java
public Enumeration<URL> findResources(final String name) throws IOException
```

Returns an Enumeration of URLs representing all of the resources
on the URL search path having the specified name.

@param name the resource name
@throws    IOException if an I/O exception occurs
@return An {@code Enumeration} of {@code URL}s.
        If the loader is closed, the Enumeration contains no elements.

## URLClassLoader.getPermissions(CodeSource)

```java
protected PermissionCollection getPermissions(CodeSource codesource)
```

{@return an {@linkplain PermissionCollection empty Permission collection}}

@param codesource the {@code CodeSource}
@throws NullPointerException if {@code codesource} is {@code null}.

## URLClassLoader.newInstance(URL[], ClassLoader)

```java
public static URLClassLoader newInstance(final URL[] urls, final ClassLoader parent)
```

Creates a new instance of URLClassLoader for the specified
URLs and parent class loader.

@param urls the URLs to search for classes and resources
@param parent the parent class loader for delegation
@throws     NullPointerException if {@code urls} or any of its
            elements is {@code null}.
@return the resulting class loader

## URLClassLoader.newInstance(URL[])

```java
public static URLClassLoader newInstance(final URL[] urls)
```

Creates a new instance of URLClassLoader for the specified
URLs and default parent class loader.

@param urls the URLs to search for classes and resources
@throws     NullPointerException if {@code urls} or any of its
            elements is {@code null}.
@return the resulting class loader