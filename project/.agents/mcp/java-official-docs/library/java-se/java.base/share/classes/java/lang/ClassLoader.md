# ClassLoader class (java.lang)

```java
public abstract class ClassLoader
```

A class loader is an object that is responsible for loading classes. The
class {@code ClassLoader} is an abstract class.  Given the <a
href="#binary-name">binary name</a> of a class, a class loader should attempt to
locate or generate data that constitutes a definition for the class.  A
typical strategy is to transform the name into a file name and then read a
"class file" of that name from a file system.

<p> Every {@link java.lang.Class Class} object contains a {@link
Class#getClassLoader() reference} to the {@code ClassLoader} that defined
it.

<p> {@code Class} objects for array classes are not created by class
loaders, but are created automatically as required by the Java runtime.
The class loader for an array class, as returned by {@link
Class#getClassLoader()} is the same as the class loader for its element
type; if the element type is a primitive type, then the array class has no
class loader.

<p> Applications implement subclasses of {@code ClassLoader} in order to
extend the manner in which the Java virtual machine dynamically loads
classes.

<p> In addition to loading classes, a class loader is also responsible for
locating resources. A resource is some data (a "{@code .class}" file,
configuration data, or an image for example) that is identified with an
abstract '/'-separated path name. Resources are typically packaged with an
application or library so that they can be located by code in the
application or library. In some cases, the resources are included so that
they can be located by other libraries.

<p> The {@code ClassLoader} class uses a delegation model to search for
classes and resources.  Each instance of {@code ClassLoader} has an
associated parent class loader. When requested to find a class or
resource, a {@code ClassLoader} instance will usually delegate the search
for the class or resource to its parent class loader before attempting to
find the class or resource itself.

<p> Class loaders that support concurrent loading of classes are known as
<em>{@linkplain #isRegisteredAsParallelCapable() parallel capable}</em> class
loaders and are required to register themselves at their class initialization
time by invoking the {@link
#registerAsParallelCapable ClassLoader.registerAsParallelCapable}
method. Note that the {@code ClassLoader} class is registered as parallel
capable by default. However, its subclasses still need to register themselves
if they are parallel capable.
In environments in which the delegation model is not strictly
hierarchical, class loaders need to be parallel capable, otherwise class
loading can lead to deadlocks because the loader lock is held for the
duration of the class loading process (see {@link #loadClass
loadClass} methods).

<h2> <a id="builtinLoaders">Run-time Built-in Class Loaders</a></h2>

The Java run-time has the following built-in class loaders:

<ul>
<li><p>Bootstrap class loader.
    It is the virtual machine's built-in class loader, typically represented
    as {@code null}, and does not have a parent.</li>
<li><p>{@linkplain #getPlatformClassLoader() Platform class loader}.
    The platform class loader is responsible for loading the
    <em>platform classes</em>.  Platform classes include Java SE platform APIs,
    their implementation classes and JDK-specific run-time classes that are
    defined by the platform class loader or its ancestors.
    The platform class loader can be used as the parent of a {@code ClassLoader}
    instance.
    <p> To allow for upgrading/overriding of modules defined to the platform
    class loader, and where upgraded modules read modules defined to class
    loaders other than the platform class loader and its ancestors, then
    the platform class loader may have to delegate to other class loaders,
    the application class loader for example.
    In other words, classes in named modules defined to class loaders
    other than the platform class loader and its ancestors may be visible
    to the platform class loader. </li>
<li><p>{@linkplain #getSystemClassLoader() System class loader}.
    It is also known as <em>application class loader</em> and is distinct
    from the platform class loader.
    The system class loader is typically used to define classes on the
    application class path, module path, and JDK-specific tools.
    The platform class loader is the parent or an ancestor of the system class
    loader, so the system class loader can load platform classes by delegating
    to its parent.</li>
</ul>

<p> Normally, the Java virtual machine loads classes from the local file
system in a platform-dependent manner.
However, some classes may not originate from a file; they may originate
from other sources, such as the network, or they could be constructed by an
application.  The method {@link #defineClass(String, byte[], int, int)
defineClass} converts an array of bytes into an instance of class
{@code Class}. Instances of this newly defined class can be created using
{@link Class#newInstance Class.newInstance}.

<p> The methods and constructors of objects created by a class loader may
reference other classes.  To determine the class(es) referred to, the Java
virtual machine invokes the {@link #loadClass loadClass} method of
the class loader that originally created the class.

<p> For example, an application could create a network class loader to
download class files from a server.  Sample code might look like:

<blockquote><pre>
  ClassLoader loader&nbsp;= new NetworkClassLoader(host,&nbsp;port);
  Object main&nbsp;= loader.loadClass("Main", true).newInstance();
      &nbsp;.&nbsp;.&nbsp;.
</pre></blockquote>

<p> The network class loader subclass must define the methods {@link
#findClass findClass} and {@code loadClassData} to load a class
from the network.  Once it has downloaded the bytes that make up the class,
it should use the method {@link #defineClass defineClass} to
create a class instance.  A sample implementation is:

<blockquote><pre>
    class NetworkClassLoader extends ClassLoader {
        String host;
        int port;

        public Class findClass(String name) {
            byte[] b = loadClassData(name);
            return defineClass(name, b, 0, b.length);
        }

        private byte[] loadClassData(String name) {
            // load the class data from the connection
            &nbsp;.&nbsp;.&nbsp;.
        }
    }
</pre></blockquote>

<h3> <a id="binary-name">Binary names</a> </h3>

<p> Any class name provided as a {@code String} parameter to methods in
{@code ClassLoader} must be a binary name as defined by
<cite>The Java Language Specification</cite>.

<p> Examples of valid class names include:
<blockquote><pre>
  "java.lang.String"
  "javax.swing.JSpinner$DefaultEditor"
  "java.security.KeyStore$Builder$FileBuilder$1"
  "java.net.URLClassLoader$3$1"
</pre></blockquote>

<p> Any package name provided as a {@code String} parameter to methods in
{@code ClassLoader} must be either the empty string (denoting an unnamed package)
or a fully qualified name as defined by
<cite>The Java Language Specification</cite>.

@jls 6.7 Fully Qualified Names and Canonical Names
@jls 13.1 The Form of a Binary
@see      #resolveClass(Class)
@since 1.0

## ClassLoader.ClassLoader(String, ClassLoader)

```java
protected ClassLoader(String name, ClassLoader parent)
```

Creates a new class loader of the specified name and using the
specified parent class loader for delegation.

@apiNote If the parent is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.

@param  name   class loader name; or {@code null} if not named
@param  parent the parent class loader

@throws IllegalArgumentException if the given name is empty.

@since  9

## ClassLoader.ClassLoader(ClassLoader)

```java
protected ClassLoader(ClassLoader parent)
```

Creates a new class loader using the specified parent class loader for
delegation.

@apiNote If the parent is specified as {@code null} (for the
bootstrap class loader) then there is no guarantee that all platform
classes are visible.

@param  parent
        The parent class loader

@since  1.2

## ClassLoader.ClassLoader()

```java
protected ClassLoader()
```

Creates a new class loader using the {@code ClassLoader} returned by
the method {@link #getSystemClassLoader()
getSystemClassLoader()} as the parent class loader.

## ClassLoader.getName()

```java
public String getName()
```

Returns the name of this class loader or {@code null} if
this class loader is not named.

@apiNote This method is non-final for compatibility.  If this
method is overridden, this method must return the same name
as specified when this class loader was instantiated.

@return name of this class loader; or {@code null} if
this class loader is not named.

@since 9

## ClassLoader.loadClass(String)

```java
public Class<?> loadClass(String name) throws ClassNotFoundException
```

Loads the class with the specified <a href="#binary-name">binary name</a>.
This method searches for classes in the same manner as the {@link
#loadClass(String, boolean)} method.  It is invoked by the Java virtual
machine to resolve class references.  Invoking this method is equivalent
to invoking {@link #loadClass(String, boolean) loadClass(name,
false)}.

@param   name
         The <a href="#binary-name">binary name</a> of the class

@return  The resulting {@code Class} object

@throws  ClassNotFoundException
         If the class was not found

## ClassLoader.loadClass(String, boolean)

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException
```

Loads the class with the specified <a href="#binary-name">binary name</a>.  The
default implementation of this method searches for classes in the
following order:

<ol>

  <li><p> Invoke {@link #findLoadedClass(String)} to check if the class
  has already been loaded.  </p></li>

  <li><p> Invoke the {@link #loadClass(String) loadClass} method
  on the parent class loader.  If the parent is {@code null} the class
  loader built into the virtual machine is used, instead.  </p></li>

  <li><p> Invoke the {@link #findClass(String)} method to find the
  class.  </p></li>

</ol>

<p> If the class was found using the above steps, and the
{@code resolve} flag is true, this method will then invoke the {@link
#resolveClass(Class)} method on the resulting {@code Class} object.

<p> Subclasses of {@code ClassLoader} are encouraged to override {@link
#findClass(String)}, rather than this method.  </p>

<p> Unless overridden, this method synchronizes on the result of
{@link #getClassLoadingLock getClassLoadingLock} method
during the entire class loading process.

@param   name
         The <a href="#binary-name">binary name</a> of the class

@param   resolve
         If {@code true} then resolve the class

@return  The resulting {@code Class} object

@throws  ClassNotFoundException
         If the class could not be found

## ClassLoader.getClassLoadingLock(String)

```java
protected Object getClassLoadingLock(String className)
```

Returns the lock object for class loading operations.

@implSpec
If this {@code ClassLoader} object is registered as parallel capable,
this method returns a dedicated object associated with the specified
class name. Otherwise, this method returns this {@code ClassLoader} object.

@apiNote
This method allows parallel capable class loaders to implement
finer-grained locking schemes such that multiple threads may load classes
concurrently without deadlocks.  For non-parallel-capable class loaders,
the {@code ClassLoader} object is synchronized on during the class loading
operations.  Class loaders with non-hierarchical delegation should be
{@linkplain #registerAsParallelCapable() registered as parallel capable}
to prevent deadlocks.

@param  className
        The name of the to-be-loaded class

@return the lock for class loading operations

@throws NullPointerException
        If registered as parallel capable and {@code className} is {@code null}

@see #loadClass(String, boolean)

@since  1.7

## ClassLoader.findClass(String)

```java
protected Class<?> findClass(String name) throws ClassNotFoundException
```

Finds the class with the specified <a href="#binary-name">binary name</a>.
This method should be overridden by class loader implementations that
follow the delegation model for loading classes, and will be invoked by
the {@link #loadClass loadClass} method after checking the
parent class loader for the requested class.

@implSpec The default implementation throws {@code ClassNotFoundException}.

@param   name
         The <a href="#binary-name">binary name</a> of the class

@return  The resulting {@code Class} object

@throws  ClassNotFoundException
         If the class could not be found

@since  1.2

## ClassLoader.findClass(String, String)

```java
protected Class<?> findClass(String moduleName, String name)
```

Finds the class with the given <a href="#binary-name">binary name</a>
in a module defined to this class loader.
Class loader implementations that support loading from modules
should override this method.

@apiNote This method returns {@code null} rather than throwing
         {@code ClassNotFoundException} if the class could not be found.

@implSpec The default implementation attempts to find the class by
invoking {@link #findClass(String)} when the {@code moduleName} is
{@code null}. It otherwise returns {@code null}.

@param  moduleName
        The module name; or {@code null} to find the class in the
        {@linkplain #getUnnamedModule() unnamed module} for this
        class loader
@param  name
        The <a href="#binary-name">binary name</a> of the class

@return The resulting {@code Class} object, or {@code null}
        if the class could not be found.

@since 9

## ClassLoader.defineClass(byte[], int, int)

```java
protected final Class<?> defineClass(byte[] b, int off, int len) throws ClassFormatError
```

Converts an array of bytes into an instance of class {@code Class}.
Before the {@code Class} can be used it must be resolved.  This method
is deprecated in favor of the version that takes a <a
href="#binary-name">binary name</a> as its first argument, and is more secure.

@param  b
        The bytes that make up the class data.  The bytes in positions
        {@code off} through {@code off+len-1} should have the format
        of a valid class file as defined by
        <cite>The Java Virtual Machine Specification</cite>.

@param  off
        The start offset in {@code b} of the class data

@param  len
        The length of the class data

@return  The {@code Class} object that was created from the specified
         class data

@throws  ClassFormatError
         If the data did not contain a valid class

@throws  IndexOutOfBoundsException
         If either {@code off} or {@code len} is negative, or if
         {@code off+len} is greater than {@code b.length}.

@throws  SecurityException
         If an attempt is made to add this class to a package that
         contains classes that were signed by a different set of
         certificates than this class, or if an attempt is made
         to define a class in a package with a fully-qualified name
         that starts with "{@code java.}".

@see  #loadClass(String, boolean)
@see  #resolveClass(Class)

@deprecated  Replaced by {@link #defineClass(String, byte[], int, int)
defineClass(String, byte[], int, int)}

## ClassLoader.defineClass(String, byte[], int, int)

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len) throws ClassFormatError
```

Converts an array of bytes into an instance of class {@code Class}.
Before the {@code Class} can be used it must be resolved.

<p> This method assigns a default {@link java.security.ProtectionDomain
ProtectionDomain} to the newly defined class. The
{@code getPermissions} method of the {@code ProtectionDomain} always
returns {@code null}.
The default protection domain is created on the first invocation
of {@link #defineClass(String, byte[], int, int) defineClass},
and re-used on subsequent invocations.

<p> To assign a specific {@code ProtectionDomain} to the class, use
the {@link #defineClass(String, byte[], int, int,
java.security.ProtectionDomain) defineClass} method that takes a
{@code ProtectionDomain} as one of its arguments.  </p>

<p>
This method defines a package in this class loader corresponding to the
package of the {@code Class} (if such a package has not already been defined
in this class loader). The name of the defined package is derived from
the <a href="#binary-name">binary name</a> of the class specified by
the byte array {@code b}.
Other properties of the defined package are as specified by {@link Package}.

@param  name
        The expected <a href="#binary-name">binary name</a> of the class, or
        {@code null} if not known

@param  b
        The bytes that make up the class data.  The bytes in positions
        {@code off} through {@code off+len-1} should have the format
        of a valid class file as defined by
        <cite>The Java Virtual Machine Specification</cite>.

@param  off
        The start offset in {@code b} of the class data

@param  len
        The length of the class data

@return  The {@code Class} object that was created from the specified
         class data.

@throws  ClassFormatError
         If the data did not contain a valid class

@throws  IndexOutOfBoundsException
         If either {@code off} or {@code len} is negative, or if
         {@code off+len} is greater than {@code b.length}.

@throws  SecurityException
         If an attempt is made to add this class to a package that
         contains classes that were signed by a different set of
         certificates than this class (which is unsigned), or if
         {@code name} begins with "{@code java.}".

@see  #loadClass(String, boolean)
@see  #resolveClass(Class)
@see  java.security.CodeSource
@see  java.security.SecureClassLoader

@since  1.1

## ClassLoader.defineClass(String, byte[], int, int, ProtectionDomain)

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len, ProtectionDomain protectionDomain) throws ClassFormatError
```

Converts an array of bytes into an instance of class {@code Class},
with a given {@code ProtectionDomain}.

<p> If the given {@code ProtectionDomain} is {@code null},
then a default protection domain will be assigned to the class as specified
in the documentation for {@link #defineClass(String, byte[], int, int)}.
Before the class can be used it must be resolved.

<p> The first class defined in a package determines the exact set of
certificates that all subsequent classes defined in that package must
contain.  The set of certificates for a class is obtained from the
{@link java.security.CodeSource CodeSource} within the
{@code ProtectionDomain} of the class.  Any classes added to that
package must contain the same set of certificates or a
{@code SecurityException} will be thrown.  Note that if
{@code name} is {@code null}, this check is not performed.
You should always pass in the <a href="#binary-name">binary name</a> of the
class you are defining as well as the bytes.  This ensures that the
class you are defining is indeed the class you think it is.

<p> If the specified {@code name} begins with "{@code java.}", it can
only be defined by the {@linkplain #getPlatformClassLoader()
platform class loader} or its ancestors; otherwise {@code SecurityException}
will be thrown.  If {@code name} is not {@code null}, it must be equal to
the <a href="#binary-name">binary name</a> of the class
specified by the byte array {@code b}, otherwise a {@link
NoClassDefFoundError NoClassDefFoundError} will be thrown.

<p> This method defines a package in this class loader corresponding to the
package of the {@code Class} (if such a package has not already been defined
in this class loader). The name of the defined package is derived from
the <a href="#binary-name">binary name</a> of the class specified by
the byte array {@code b}.
Other properties of the defined package are as specified by {@link Package}.

@param  name
        The expected <a href="#binary-name">binary name</a> of the class, or
        {@code null} if not known

@param  b
        The bytes that make up the class data. The bytes in positions
        {@code off} through {@code off+len-1} should have the format
        of a valid class file as defined by
        <cite>The Java Virtual Machine Specification</cite>.

@param  off
        The start offset in {@code b} of the class data

@param  len
        The length of the class data

@param  protectionDomain
        The {@code ProtectionDomain} of the class

@return  The {@code Class} object created from the data,
         and {@code ProtectionDomain}.

@throws  ClassFormatError
         If the data did not contain a valid class

@throws  NoClassDefFoundError
         If {@code name} is not {@code null} and not equal to the
         <a href="#binary-name">binary name</a> of the class specified by {@code b}

@throws  IndexOutOfBoundsException
         If either {@code off} or {@code len} is negative, or if
         {@code off+len} is greater than {@code b.length}.

@throws  SecurityException
         If an attempt is made to add this class to a package that
         contains classes that were signed by a different set of
         certificates than this class, or if {@code name} begins with
         "{@code java.}" and this class loader is not the platform
         class loader or its ancestor.

## ClassLoader.defineClass(String, java.nio.ByteBuffer, ProtectionDomain)

```java
protected final Class<?> defineClass(String name, java.nio.ByteBuffer b, ProtectionDomain protectionDomain) throws ClassFormatError
```

Converts a {@link java.nio.ByteBuffer ByteBuffer} into an instance
of class {@code Class}, with the given {@code ProtectionDomain}.
If the given {@code ProtectionDomain} is {@code null}, then a default
protection domain will be assigned to the class as
specified in the documentation for {@link #defineClass(String, byte[],
int, int)}.  Before the class can be used it must be resolved.

<p>The rules about the first class defined in a package determining the
set of certificates for the package, the restrictions on class names,
and the defined package of the class
are identical to those specified in the documentation for {@link
#defineClass(String, byte[], int, int, ProtectionDomain)}.

<p> An invocation of this method of the form
<i>cl</i>{@code .defineClass(}<i>name</i>{@code ,}
<i>bBuffer</i>{@code ,} <i>pd</i>{@code )} yields exactly the same
result as the statements

<p> <code>
...<br>
byte[] temp = new byte[bBuffer.{@link
java.nio.ByteBuffer#remaining remaining}()];<br>
    bBuffer.{@link java.nio.ByteBuffer#get(byte[])
get}(temp);<br>
    return {@link #defineClass(String, byte[], int, int, ProtectionDomain)
cl.defineClass}(name, temp, 0,
temp.length, pd);<br>
</code></p>

@param  name
        The expected <a href="#binary-name">binary name</a>. of the class, or
        {@code null} if not known

@param  b
        The bytes that make up the class data. The bytes from positions
        {@code b.position()} through {@code b.position() + b.limit() -1
        } should have the format of a valid class file as defined by
        <cite>The Java Virtual Machine Specification</cite>.

@param  protectionDomain
        The {@code ProtectionDomain} of the class, or {@code null}.

@return  The {@code Class} object created from the data,
         and {@code ProtectionDomain}.

@throws  ClassFormatError
         If the data did not contain a valid class.

@throws  NoClassDefFoundError
         If {@code name} is not {@code null} and not equal to the
         <a href="#binary-name">binary name</a> of the class specified by {@code b}

@throws  SecurityException
         If an attempt is made to add this class to a package that
         contains classes that were signed by a different set of
         certificates than this class, or if {@code name} begins with
         "{@code java.}".

@see      #defineClass(String, byte[], int, int, ProtectionDomain)

@since  1.5

## ClassLoader.resolveClass(Class<?>)

```java
protected final void resolveClass(Class<?> c)
```

Links the specified class.  This (misleadingly named) method may be
used by a class loader to link a class.  If the class {@code c} has
already been linked, then this method simply returns. Otherwise, the
class is linked as described in the "Execution" chapter of
<cite>The Java Language Specification</cite>.

@param  c
        The class to link

@throws  NullPointerException
         If {@code c} is {@code null}.

@see  #defineClass(String, byte[], int, int)

## ClassLoader.findSystemClass(String)

```java
protected final Class<?> findSystemClass(String name) throws ClassNotFoundException
```

Finds a class with the specified <a href="#binary-name">binary name</a>,
loading it if necessary.

<p> This method loads the class through the system class loader (see
{@link #getSystemClassLoader()}).  The {@code Class} object returned
might have more than one {@code ClassLoader} associated with it.
Subclasses of {@code ClassLoader} need not usually invoke this method,
because most class loaders need to override just {@link
#findClass(String)}.  </p>

@param  name
        The <a href="#binary-name">binary name</a> of the class

@return  The {@code Class} object for the specified {@code name}

@throws  ClassNotFoundException
         If the class could not be found

@see  #ClassLoader(ClassLoader)
@see  #getParent()

## ClassLoader.findLoadedClass(String)

```java
protected final Class<?> findLoadedClass(String name)
```

Returns the class with the given <a href="#binary-name">binary name</a> if this
loader has been recorded by the Java virtual machine as an initiating
loader of a class with that <a href="#binary-name">binary name</a>.  Otherwise
{@code null} is returned.

@param  name
        The <a href="#binary-name">binary name</a> of the class

@return  The {@code Class} object, or {@code null} if the class has
         not been loaded

@since  1.1

## ClassLoader.setSigners(Class<?>, Object[])

```java
protected final void setSigners(Class<?> c, Object[] signers)
```

Sets the signers of a class.  This should be invoked after defining a
class.

@param  c
        The {@code Class} object

@param  signers
        The signers for the class

@since  1.1

## ClassLoader.findResource(String, String)

```java
protected URL findResource(String moduleName, String name) throws IOException
```

Returns a URL to a resource in a module defined to this class loader.
Class loader implementations that support loading from modules
should override this method.

@apiNote This method is the basis for the {@link
Class#getResource Class.getResource}, {@link Class#getResourceAsStream
Class.getResourceAsStream}, and {@link Module#getResourceAsStream
Module.getResourceAsStream} methods. It is not subject to the rules for
encapsulation specified by {@code Module.getResourceAsStream}.

@implSpec The default implementation attempts to find the resource by
invoking {@link #findResource(String)} when the {@code moduleName} is
{@code null}. It otherwise returns {@code null}.

@param  moduleName
        The module name; or {@code null} to find a resource in the
        {@linkplain #getUnnamedModule() unnamed module} for this
        class loader
@param  name
        The resource name

@return A URL to the resource; {@code null} if the resource could not be
        found, a URL could not be constructed to locate the resource, or
        there isn't a module of the given name defined to the class
        loader.

@throws IOException
        If I/O errors occur

@see java.lang.module.ModuleReader#find(String)
@since 9

## ClassLoader.getResource(String)

```java
public URL getResource(String name)
```

Finds the resource with the given name.  A resource is some data
(images, audio, text, etc) that can be accessed by class code in a way
that is independent of the location of the code.

<p> The name of a resource is a '{@code /}'-separated path name that
identifies the resource. </p>

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally (even if the caller of this method is in the
same module as the resource). </p>

@implSpec The default implementation will first search the parent class
loader for the resource; if the parent is {@code null} the path of the
class loader built into the virtual machine is searched. If not found,
this method will invoke {@link #findResource(String)} to find the resource.

@apiNote Where several modules are defined to the same class loader,
and where more than one module contains a resource with the given name,
then the ordering that modules are searched is not specified and may be
very unpredictable.
When overriding this method it is recommended that an implementation
ensures that any delegation is consistent with the {@link
#getResources(java.lang.String) getResources(String)} method.

@param  name
        The resource name

@return  {@code URL} object for reading the resource; {@code null} if
         the resource could not be found, a {@code URL} could not be
         constructed to locate the resource, or the resource is in a package
         that is not opened unconditionally.

@throws  NullPointerException If {@code name} is {@code null}

@since  1.1

## ClassLoader.getResources(String)

```java
public Enumeration<URL> getResources(String name) throws IOException
```

Finds all the resources with the given name. A resource is some data
(images, audio, text, etc) that can be accessed by class code in a way
that is independent of the location of the code.

<p> The name of a resource is a {@code /}-separated path name that
identifies the resource. </p>

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally (even if the caller of this method is in the
same module as the resource). </p>

@implSpec The default implementation will first search the parent class
loader for the resource; if the parent is {@code null} the path of the
class loader built into the virtual machine is searched. It then
invokes {@link #findResources(String)} to find the resources with the
name in this class loader. It returns an enumeration whose elements
are the URLs found by searching the parent class loader followed by
the elements found with {@code findResources}.

@apiNote Where several modules are defined to the same class loader,
and where more than one module contains a resource with the given name,
then the ordering is not specified and may be very unpredictable.
When overriding this method it is recommended that an
implementation ensures that any delegation is consistent with the {@link
#getResource(java.lang.String) getResource(String)} method. This should
ensure that the first element returned by the Enumeration's
{@code nextElement} method is the same resource that the
{@code getResource(String)} method would return.

@param  name
        The resource name

@return  An enumeration of {@link java.net.URL URL} objects for the
         resource. If no resources could be found, the enumeration will
         be empty. Resources for which a {@code URL} cannot be
         constructed, or are in a package that is not opened
         unconditionally, are not returned in the enumeration.

@throws  IOException
         If I/O errors occur
@throws  NullPointerException If {@code name} is {@code null}

@since  1.2

## ClassLoader.resources(String)

```java
public Stream<URL> resources(String name)
```

Returns a stream whose elements are the URLs of all the resources with
the given name. A resource is some data (images, audio, text, etc) that
can be accessed by class code in a way that is independent of the
location of the code.

<p> The name of a resource is a {@code /}-separated path name that
identifies the resource.

<p> The resources will be located when the returned stream is evaluated.
If the evaluation results in an {@code IOException} then the I/O
exception is wrapped in an {@link UncheckedIOException} that is then
thrown.

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally (even if the caller of this method is in the
same module as the resource). </p>

@implSpec The default implementation invokes {@link #getResources(String)
getResources} to find all the resources with the given name and returns
a stream with the elements in the enumeration as the source.

@apiNote When overriding this method it is recommended that an
implementation ensures that any delegation is consistent with the {@link
#getResource(java.lang.String) getResource(String)} method. This should
ensure that the first element returned by the stream is the same
resource that the {@code getResource(String)} method would return.

@param  name
        The resource name

@return  A stream of resource {@link java.net.URL URL} objects. If no
         resources could  be found, the stream will be empty. Resources
         for which a {@code URL} cannot be constructed, or are in a package
         that is not opened unconditionally, will not be in the stream.

@throws  NullPointerException If {@code name} is {@code null}

@since  9

## ClassLoader.findResource(String)

```java
protected URL findResource(String name)
```

Finds the resource with the given name. Class loader implementations
should override this method.

<p> For resources in named modules then the method must implement the
rules for encapsulation specified in the {@code Module} {@link
Module#getResourceAsStream getResourceAsStream} method. Additionally,
it must not find non-"{@code .class}" resources in packages of named
modules unless the package is {@link Module#isOpen(String) opened}
unconditionally. </p>

@implSpec The default implementation returns {@code null}.

@param  name
        The resource name

@return  {@code URL} object for reading the resource; {@code null} if
         the resource could not be found, a {@code URL} could not be
         constructed to locate the resource, or the resource is in a package
         that is not opened unconditionally.

@since  1.2

## ClassLoader.findResources(String)

```java
protected Enumeration<URL> findResources(String name) throws IOException
```

Returns an enumeration of {@link java.net.URL URL} objects
representing all the resources with the given name. Class loader
implementations should override this method.

<p> For resources in named modules then the method must implement the
rules for encapsulation specified in the {@code Module} {@link
Module#getResourceAsStream getResourceAsStream} method. Additionally,
it must not find non-"{@code .class}" resources in packages of named
modules unless the package is {@link Module#isOpen(String) opened}
unconditionally. </p>

@implSpec The default implementation returns an enumeration that
contains no elements.

@param  name
        The resource name

@return  An enumeration of {@link java.net.URL URL} objects for
         the resource. If no resources could  be found, the enumeration
         will be empty. Resources for which a {@code URL} cannot be
         constructed, or are in a package that is not opened unconditionally,
         are not returned in the enumeration.

@throws  IOException
         If I/O errors occur

@since  1.2

## ClassLoader.registerAsParallelCapable()

```java
protected static boolean registerAsParallelCapable()
```

Registers the caller as
{@linkplain #isRegisteredAsParallelCapable() parallel capable}.
The registration succeeds if and only if all of the following
conditions are met:
<ol>
<li> no instance of the caller has been created</li>
<li> all of the super classes (except class Object) of the caller are
registered as parallel capable</li>
</ol>
<p>Note that once a class loader is registered as parallel capable, there
is no way to change it back.</p>
<p>
In cases where this method is called from a context where the caller is
not a subclass of {@code ClassLoader} or there is no caller frame on the
stack (e.g. when called directly from a JNI attached thread),
{@code IllegalCallerException} is thrown.
</p>

@return  {@code true} if the caller is successfully registered as
         parallel capable and {@code false} if otherwise.
@throws IllegalCallerException if the caller is not a subclass of {@code ClassLoader}

@see #isRegisteredAsParallelCapable()

@since   1.7

## ClassLoader.isRegisteredAsParallelCapable()

```java
public final boolean isRegisteredAsParallelCapable()
```

Returns {@code true} if this class loader is registered as
{@linkplain #registerAsParallelCapable parallel capable}, otherwise
{@code false}.

@return  {@code true} if this class loader is parallel capable,
         otherwise {@code false}.

@see #registerAsParallelCapable()

@since   9

## ClassLoader.getSystemResource(String)

```java
public static URL getSystemResource(String name)
```

Find a resource of the specified name from the search path used to load
classes.  This method locates the resource through the system class
loader (see {@link #getSystemClassLoader()}).

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally. </p>

@param  name
        The resource name

@return  A {@link java.net.URL URL} to the resource; {@code
         null} if the resource could not be found, a URL could not be
         constructed to locate the resource, or the resource is in a package
         that is not opened unconditionally.

@since  1.1

## ClassLoader.getSystemResources(String)

```java
public static Enumeration<URL> getSystemResources(String name) throws IOException
```

Finds all resources of the specified name from the search path used to
load classes.  The resources thus found are returned as an
{@link java.util.Enumeration Enumeration} of {@link
java.net.URL URL} objects.

<p> The search order is described in the documentation for {@link
#getSystemResource(String)}.  </p>

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally. </p>

@param  name
        The resource name

@return  An enumeration of {@link java.net.URL URL} objects for
         the resource. If no resources could  be found, the enumeration
         will be empty. Resources for which a {@code URL} cannot be
         constructed, or are in a package that is not opened unconditionally,
         are not returned in the enumeration.

@throws  IOException
         If I/O errors occur

@since  1.2

## ClassLoader.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name)
```

Returns an input stream for reading the specified resource.

<p> The search order is described in the documentation for {@link
#getResource(String)}.  </p>

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally. </p>

@param  name
        The resource name

@return  An input stream for reading the resource; {@code null} if the
         resource could not be found, or the resource is in a package that
         is not opened unconditionally.

@throws  NullPointerException If {@code name} is {@code null}

@since  1.1

## ClassLoader.getSystemResourceAsStream(String)

```java
public static InputStream getSystemResourceAsStream(String name)
```

Open for reading, a resource of the specified name from the search path
used to load classes.  This method locates the resource through the
system class loader (see {@link #getSystemClassLoader()}).

<p> Resources in named modules are subject to the encapsulation rules
specified by {@link Module#getResourceAsStream Module.getResourceAsStream}.
Additionally, and except for the special case where the resource has a
name ending with "{@code .class}", this method will only find resources in
packages of named modules when the package is {@link Module#isOpen(String)
opened} unconditionally. </p>

@param  name
        The resource name

@return  An input stream for reading the resource; {@code null} if the
         resource could not be found, or the resource is in a package that
         is not opened unconditionally.

@since  1.1

## ClassLoader.getParent()

```java
public final ClassLoader getParent()
```

Returns the parent class loader for delegation. Some implementations may
use {@code null} to represent the bootstrap class loader. This method
will return {@code null} in such implementations if this class loader's
parent is the bootstrap class loader.

@return  The parent {@code ClassLoader}

@since  1.2

## ClassLoader.getUnnamedModule()

```java
public final Module getUnnamedModule()
```

Returns the unnamed {@code Module} for this class loader.

@return The unnamed Module for this class loader

@see Module#isNamed()
@since 9

## ClassLoader.getPlatformClassLoader()

```java
public static ClassLoader getPlatformClassLoader()
```

Returns the platform class loader.  All
<a href="#builtinLoaders">platform classes</a> are visible to
the platform class loader.

@implNote The name of the builtin platform class loader is
{@code "platform"}.

@return  The platform {@code ClassLoader}.

@since 9

## ClassLoader.getSystemClassLoader()

```java
public static ClassLoader getSystemClassLoader()
```

Returns the system class loader.  This is the default
delegation parent for new {@code ClassLoader} instances, and is
typically the class loader used to start the application.

<p> This method is first invoked early in the runtime's startup
sequence, at which point it creates the system class loader. This
class loader will be the context class loader for the main application
thread (for example, the thread that invokes the {@code main} method of
the main class).

<p> The default system class loader is an implementation-dependent
instance of this class.

<p> If the system property "{@systemProperty java.system.class.loader}"
is defined when this method is first invoked then the value of that
property is taken to be the name of a class that will be returned as the
system class loader. The class is loaded using the default system class
loader and must define a public constructor that takes a single parameter
of type {@code ClassLoader} which is used as the delegation parent. An
instance is then created using this constructor with the default system
class loader as the parameter.  The resulting class loader is defined
to be the system class loader. During construction, the class loader
should take great care to avoid calling {@code getSystemClassLoader()}.
If circular initialization of the system class loader is detected then
an {@code IllegalStateException} is thrown.

@implNote The system property to override the system class loader is not
examined until the VM is almost fully initialized. Code that executes
this method during startup should take care not to cache the return
value until the system is fully initialized.

<p> The name of the built-in system class loader is {@code "app"}.
The system property "{@code java.class.path}" is read during early
initialization of the VM to determine the class path.
An empty value of "{@code java.class.path}" property is interpreted
differently depending on whether the initial module (the module
containing the main class) is named or unnamed:
If named, the built-in system class loader will have no class path and
will search for classes and resources using the application module path;
otherwise, if unnamed, it will set the class path to the current
working directory.

<p> JAR files on the class path may contain a {@code Class-Path} manifest
attribute to specify dependent JAR files to be included in the class path.
{@code Class-Path} entries must meet certain conditions for validity (see
the <a href="{@docRoot}/../specs/jar/jar.html#class-path-attribute">
JAR File Specification</a> for details).  Invalid {@code Class-Path}
entries are ignored.  For debugging purposes, ignored entries can be
printed to the console if the
{@systemProperty jdk.net.URLClassPath.showIgnoredClassPathEntries} system
property is set to {@code true}.

@return  The system {@code ClassLoader}

@throws  IllegalStateException
         If invoked recursively during the construction of the class
         loader specified by the "{@code java.system.class.loader}"
         property.

@throws  Error
         If the system property "{@code java.system.class.loader}"
         is defined but the named class could not be loaded, the
         provider class does not define the required constructor, or an
         exception is thrown by that constructor when it is invoked. The
         underlying cause of the error can be retrieved via the
         {@link Throwable#getCause()} method.

## ClassLoader.definePackage(String, String, String, String, String, String, String, URL)

```java
protected Package definePackage(String name, String specTitle, String specVersion, String specVendor, String implTitle, String implVersion, String implVendor, URL sealBase)
```

Defines a package by <a href="#binary-name">name</a> in this {@code ClassLoader}.
<p>
<a href="#binary-name">Package names</a> must be unique within a class loader and
cannot be redefined or changed once created.
<p>
If a class loader wishes to define a package with specific properties,
such as version information, then the class loader should call this
{@code definePackage} method before calling {@code defineClass}.
Otherwise, the
{@link #defineClass(String, byte[], int, int, ProtectionDomain) defineClass}
method will define a package in this class loader corresponding to the package
of the newly defined class; the properties of this defined package are
specified by {@link Package}.

@apiNote
A class loader that wishes to define a package for classes in a JAR
typically uses the specification and implementation titles, versions, and
vendors from the JAR's manifest. If the package is specified as
{@linkplain java.util.jar.Attributes.Name#SEALED sealed} in the JAR's manifest,
the {@code URL} of the JAR file is typically used as the {@code sealBase}.
If classes of package {@code 'p'} defined by this class loader
are loaded from multiple JARs, the {@code Package} object may contain
different information depending on the first class of package {@code 'p'}
defined and which JAR's manifest is read first to explicitly define
package {@code 'p'}.

<p> It is strongly recommended that a class loader does not call this
method to explicitly define packages in <em>named modules</em>; instead,
the package will be automatically defined when a class is {@linkplain
#defineClass(String, byte[], int, int, ProtectionDomain) being defined}.
If it is desirable to define {@code Package} explicitly, it should ensure
that all packages in a named module are defined with the properties
specified by {@link Package}.  Otherwise, some {@code Package} objects
in a named module may be for example sealed with different seal base.

@param  name
        The <a href="#binary-name">package name</a>

@param  specTitle
        The specification title

@param  specVersion
        The specification version

@param  specVendor
        The specification vendor

@param  implTitle
        The implementation title

@param  implVersion
        The implementation version

@param  implVendor
        The implementation vendor

@param  sealBase
        If not {@code null}, then this package is sealed with
        respect to the given code source {@link java.net.URL URL}
        object.  Otherwise, the package is not sealed.

@return  The newly defined {@code Package} object

@throws  NullPointerException
         if {@code name} is {@code null}.

@throws  IllegalArgumentException
         if a package of the given {@code name} is already
         defined by this class loader


@since  1.2

@jvms 5.3 Creation and Loading
@see <a href="{@docRoot}/../specs/jar/jar.html#package-sealing">
     The JAR File Specification: Package Sealing</a>

## ClassLoader.getDefinedPackage(String)

```java
public final Package getDefinedPackage(String name)
```

Returns a {@code Package} of the given <a href="#binary-name">name</a> that
has been defined by this class loader.

@param  name The <a href="#binary-name">package name</a>

@return The {@code Package} of the given name that has been defined
        by this class loader, or {@code null} if not found

@throws  NullPointerException
         if {@code name} is {@code null}.

@jvms 5.3 Creation and Loading

@since  9

## ClassLoader.getDefinedPackages()

```java
public final Package[] getDefinedPackages()
```

Returns all of the {@code Package}s that have been defined by
this class loader.  The returned array has no duplicated {@code Package}s
of the same name.

@apiNote This method returns an array rather than a {@code Set} or {@code Stream}
         for consistency with the existing {@link #getPackages} method.

@return The array of {@code Package} objects that have been defined by
        this class loader; or a zero length array if no package has been
        defined by this class loader.

@jvms 5.3 Creation and Loading

@since  9

## ClassLoader.getPackage(String)

```java
protected Package getPackage(String name)
```

Finds a package by <a href="#binary-name">name</a> in this class loader and its ancestors.
<p>
If this class loader defines a {@code Package} of the given name,
the {@code Package} is returned. Otherwise, the ancestors of
this class loader are searched recursively (parent by parent)
for a {@code Package} of the given name.

@apiNote The {@link #getPlatformClassLoader() platform class loader}
may delegate to the application class loader but the application class
loader is not its ancestor.  When invoked on the platform class loader,
this method  will not find packages defined to the application
class loader.

@param  name
        The <a href="#binary-name">package name</a>

@return The {@code Package} of the given name that has been defined by
        this class loader or its ancestors, or {@code null} if not found.

@throws  NullPointerException
         if {@code name} is {@code null}.

@deprecated
If multiple class loaders delegate to each other and define classes
with the same package name, and one such loader relies on the lookup
behavior of {@code getPackage} to return a {@code Package} from
a parent loader, then the properties exposed by the {@code Package}
may not be as expected in the rest of the program.
For example, the {@code Package} will only expose annotations from the
{@code package-info.class} file defined by the parent loader, even if
annotations exist in a {@code package-info.class} file defined by
a child loader.  A more robust approach is to use the
{@link ClassLoader#getDefinedPackage} method which returns
a {@code Package} for the specified class loader.

@see ClassLoader#getDefinedPackage(String)

@since  1.2

## ClassLoader.getPackages()

```java
protected Package[] getPackages()
```

Returns all of the {@code Package}s that have been defined by
this class loader and its ancestors.  The returned array may contain
more than one {@code Package} object of the same package name, each
defined by a different class loader in the class loader hierarchy.

@apiNote The {@link #getPlatformClassLoader() platform class loader}
may delegate to the application class loader. In other words,
packages in modules defined to the application class loader may be
visible to the platform class loader.  On the other hand,
the application class loader is not its ancestor and hence
when invoked on the platform class loader, this method will not
return any packages defined to the application class loader.

@return  The array of {@code Package} objects that have been defined by
         this class loader and its ancestors

@see ClassLoader#getDefinedPackages()

@since  1.2

## ClassLoader.findLibrary(String)

```java
protected String findLibrary(String libname)
```

Returns the absolute path name of a native library.  The VM invokes this
method to locate the native libraries that belong to classes loaded with
this class loader. If this method returns {@code null}, the VM
searches the library along the path specified as the
"{@code java.library.path}" property.

@param  libname
        The library name

@return  The absolute path of the native library

@see  System#loadLibrary(String)
@see  System#mapLibraryName(String)

@since  1.2

## ClassLoader.setDefaultAssertionStatus(boolean)

```java
public void setDefaultAssertionStatus(boolean enabled)
```

Sets the default assertion status for this class loader.  This setting
determines whether classes loaded by this class loader and initialized
in the future will have assertions enabled or disabled by default.
This setting may be overridden on a per-package or per-class basis by
invoking {@link #setPackageAssertionStatus(String, boolean)} or {@link
#setClassAssertionStatus(String, boolean)}.

@param  enabled
        {@code true} if classes loaded by this class loader will
        henceforth have assertions enabled by default, {@code false}
        if they will have assertions disabled by default.

@since  1.4

## ClassLoader.setPackageAssertionStatus(String, boolean)

```java
public void setPackageAssertionStatus(String packageName, boolean enabled)
```

Sets the package default assertion status for the named package.  The
package default assertion status determines the assertion status for
classes initialized in the future that belong to the named package or
any of its "subpackages".

<p> A subpackage of a package named p is any package whose name begins
with "{@code p.}".  For example, {@code javax.swing.text} is a
subpackage of {@code javax.swing}, and both {@code java.util} and
{@code java.lang.reflect} are subpackages of {@code java}.

<p> In the event that multiple package defaults apply to a given class,
the package default pertaining to the most specific package takes
precedence over the others.  For example, if {@code javax.lang} and
{@code javax.lang.reflect} both have package defaults associated with
them, the latter package default applies to classes in
{@code javax.lang.reflect}.

<p> Package defaults take precedence over the class loader's default
assertion status, and may be overridden on a per-class basis by invoking
{@link #setClassAssertionStatus(String, boolean)}.  </p>

@param  packageName
        The name of the package whose package default assertion status
        is to be set. A {@code null} value indicates the unnamed
        package that is "current"
        (see section {@jls 7.4.2} of
        <cite>The Java Language Specification</cite>.)

@param  enabled
        {@code true} if classes loaded by this classloader and
        belonging to the named package or any of its subpackages will
        have assertions enabled by default, {@code false} if they will
        have assertions disabled by default.

@since  1.4

## ClassLoader.setClassAssertionStatus(String, boolean)

```java
public void setClassAssertionStatus(String className, boolean enabled)
```

Sets the desired assertion status for the named top-level class in this
class loader and any nested classes contained therein.  This setting
takes precedence over the class loader's default assertion status, and
over any applicable per-package default.  This method has no effect if
the named class has already been initialized.  (Once a class is
initialized, its assertion status cannot change.)

<p> If the named class is not a top-level class, this invocation will
have no effect on the actual assertion status of any class. </p>

@param  className
        The fully qualified class name of the top-level class whose
        assertion status is to be set.

@param  enabled
        {@code true} if the named class is to have assertions
        enabled when (and if) it is initialized, {@code false} if the
        class is to have assertions disabled.

@since  1.4

## ClassLoader.clearAssertionStatus()

```java
public void clearAssertionStatus()
```

Sets the default assertion status for this class loader to
{@code false} and discards any package defaults or class assertion
status settings associated with the class loader.  This method is
provided so that class loaders can be made to ignore any command line or
persistent assertion status settings and "start with a clean slate."

@since  1.4