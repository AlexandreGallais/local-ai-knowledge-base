---
title: "FileSystems class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/FileSystems.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystems class (java.nio.file)

```java
public final class FileSystems
```

Factory methods for file systems. This class defines the getDefault method to get the default file system and factory methods to
construct other types of file systems.

 The first invocation of any of the methods defined by this class causes
the default provider to be loaded. The default
provider, identified by the URI scheme "file", creates the `FileSystem`
that provides access to the file systems accessible to the Java virtual
machine. If the process of loading or initializing the default provider fails
then an unspecified error is thrown.

 The first invocation of the installedProviders method, by way of invoking any of the `newFileSystem` methods defined by this class, locates and loads all
installed file system providers. Installed providers are loaded using the
service-provider loading facility defined by the `ServiceLoader` class.
Installed providers are loaded using the system class loader. If the
system class loader cannot be found then the platform class loader is used.
Providers are typically installed by placing them in a JAR file on the
application class path, the JAR file contains a
provider-configuration file named `java.nio.file.spi.FileSystemProvider`
in the resource directory `META-INF/services`, and the file lists one or
more fully-qualified names of concrete subclass of `FileSystemProvider`
that have a zero argument constructor.
The ordering that installed providers are located is implementation specific.
If a provider is instantiated and its getScheme returns the same URI scheme of a provider that was previously
instantiated then the most recently instantiated duplicate is discarded. URI
schemes are compared without regard to case. During construction a provider
may safely access files associated with the default provider but care needs
to be taken to avoid circular loading of other installed providers. If
circular loading of installed providers is detected then an unspecified error
is thrown.

 This class also defines factory methods that allow a `ClassLoader`
to be specified when locating a provider. As with installed providers, the
provider classes are identified by placing the provider configuration file
in the resource directory `META-INF/services`.

 If a thread initiates the loading of the installed file system providers
and another thread invokes a method that also attempts to load the providers
then the method will block until the loading completes.

**Since:** 1.7

## FileSystems.getDefault()

```java
public static FileSystem getDefault()
```

Returns the default `FileSystem`. The default file system creates
objects that provide access to the file systems accessible to the Java
virtual machine. The *working directory* of the file system is
the current user directory, named by the system property `user.dir`.
This allows for interoperability with the java.io.File
class.

 The first invocation of any of the methods defined by this class
locates the default provider object. Where the
system property `java.nio.file.spi.DefaultFileSystemProvider` is
not defined then the default provider is a system-default provider that
is invoked to create the default file system.

 If the system property `java.nio.file.spi.DefaultFileSystemProvider`
is defined then it is taken to be a list of one or more fully-qualified names
of concrete provider classes identified by the URI scheme `"file"`.
If the property is a list of more than one name then the names are separated
by a comma character. Each provider class is a `public` class with a
`public` constructor that has one formal parameter of type `FileSystemProvider`. If the provider class is in a named module then the module
exports the package containing the provider class to at least `java.base`.
Each provider class is loaded, using the
default system class loader,
and instantiated by invoking the constructor. The providers are loaded and
instantiated in the order they are listed in the property.
If this process fails or a provider's scheme is not equal to `"file"`
then an unspecified error is thrown. URI schemes are normally compared
without regard to case but for the default provider, the scheme is
required to be `"file"`. The first provider class is instantiated
by invoking it with a reference to the system-default provider.
The second provider class is instantiated by invoking it with a reference
to the first provider instance. The third provider class is instantiated
by invoking it with a reference to the second instance, and so on. The
last provider to be instantiated becomes the default provider; its `getFileSystem` method is invoked with the URI `"file:///"` to
get a reference to the default file system.

 Subsequent invocations of this method return the file system that was
returned by the first invocation.

**Returns:** the default file system

## FileSystems.getFileSystem(URI)

```java
public static FileSystem getFileSystem(URI uri)
```

Returns a reference to an existing `FileSystem`.

 This method iterates over the installed providers to locate the provider that is identified by the URI
scheme of the given URI. URI schemes are compared
without regard to case. The exact form of the URI is highly provider
dependent. If found, the provider's getFileSystem method is invoked to obtain a reference to the `FileSystem`.

 Once a file system created by this provider is closed it is provider-dependent if this method returns a reference to
the closed file system or throws `FileSystemNotFoundException`.
If the provider allows a new file system to be created with the same URI
as a file system it previously created then this method throws the
exception if invoked after the file system is closed (and before a new
instance is created by the newFileSystem method).

Parameters:

- `uri`: the URI to locate the file system

**Returns:** the reference to the file system

Throws:

- `IllegalArgumentException`: if the pre-conditions for the `uri` parameter are not met
- `FileSystemNotFoundException`: if the file system, identified by the URI, does not exist
- `ProviderNotFoundException`: if a provider supporting the URI scheme is not installed

## FileSystems.newFileSystem(URI, Map<String,?>)

```java
public static FileSystem newFileSystem(URI uri, Map<String,?> env) throws IOException
```

Constructs a new file system that is identified by a `URI`

 This method iterates over the installed providers to locate the provider that is identified by the URI
scheme of the given URI. URI schemes are compared
without regard to case. The exact form of the URI is highly provider
dependent. If found, the provider's newFileSystem(URI,Map) method is invoked to construct the new file system.

 Once a file system is closed it is
provider-dependent if the provider allows a new file system to be created
with the same URI as a file system it previously created.

 **Usage Example:**
Suppose there is a provider identified by the scheme `"memory"`
installed:

Parameters:

- `uri`: the URI identifying the file system
- `env`: a map of provider specific properties to configure the file system; may be empty

**Returns:** a new file system

Throws:

- `IllegalArgumentException`: if the pre-conditions for the `uri` parameter are not met, or if the `env` parameter does not contain properties required by the provider, contains an invalid combination of properties and values, or contains an invalid property value
- `FileSystemAlreadyExistsException`: if the file system has already been created
- `ProviderNotFoundException`: if a provider supporting the URI scheme is not installed
- `IOException`: if an I/O error occurs creating the file system

## FileSystems.newFileSystem(URI, Map<String,?>, ClassLoader)

```java
public static FileSystem newFileSystem(URI uri, Map<String,?> env, ClassLoader loader) throws IOException
```

Constructs a new file system that is identified by a `URI`

 This method first attempts to locate an installed provider in exactly
the same manner as the newFileSystem(URI,Map)
method. If none of the installed providers support the URI scheme then an
attempt is made to locate the provider using the given class loader. If a
provider supporting the URI scheme is located then its newFileSystem(URI,Map) is
invoked to construct the new file system.

Parameters:

- `uri`: the URI identifying the file system
- `env`: a map of provider specific properties to configure the file system; may be empty
- `loader`: the class loader to locate the provider or `null` to only attempt to locate an installed provider

**Returns:** a new file system

Throws:

- `IllegalArgumentException`: if the pre-conditions for the `uri` parameter are not met, or if the `env` parameter does not contain properties required by the provider, contains an invalid combination of properties and values, or contains an invalid property value
- `FileSystemAlreadyExistsException`: if the URI scheme identifies an installed provider and the file system has already been created
- `ProviderNotFoundException`: if a provider supporting the URI scheme is not found
- `ServiceConfigurationError`: when an error occurs while loading a service provider
- `IOException`: an I/O error occurs creating the file system

## FileSystems.newFileSystem(Path, ClassLoader)

```java
public static FileSystem newFileSystem(Path path, ClassLoader loader) throws IOException
```

Constructs a new `FileSystem` to access the contents of a file as a
file system.

 This method makes use of specialized providers that create pseudo file
systems where the contents of one or more files is treated as a file
system.

 This method first attempts to locate an installed provider in exactly
the same manner as the Map, ClassLoader) newFileSystem(Path, Map, ClassLoader) method with an empty map. If none
of the installed providers return a `FileSystem` then an attempt is
made to locate the provider using the given class loader. If a provider
returns a file system then the lookup terminates and the file system is
returned.

Parameters:

- `path`: the path to the file
- `loader`: the class loader to locate the provider or `null` to only attempt to locate an installed provider

**Returns:** a new file system

Throws:

- `ProviderNotFoundException`: if a provider supporting this file type cannot be located
- `ServiceConfigurationError`: when an error occurs while loading a service provider
- `IOException`: if an I/O error occurs

## FileSystems.newFileSystem(Path, Map<String,?>)

```java
public static FileSystem newFileSystem(Path path, Map<String,?> env) throws IOException
```

Constructs a new `FileSystem` to access the contents of a file as a
file system.

 This method makes use of specialized providers that create pseudo file
systems where the contents of one or more files is treated as a file
system.

 This method first attempts to locate an installed provider in exactly
the same manner as the newFileSystem(Path, Map, ClassLoader) method. If found, the provider's
Map) newFileSystem(Path, Map)
method is invoked to construct the new file system.

Parameters:

- `path`: the path to the file
- `env`: a map of provider specific properties to configure the file system; may be empty

**Returns:** a new file system

**Since:** 13

Throws:

- `IllegalArgumentException`: if the `env` parameter does not contain properties required by the provider, contains an invalid combination of properties and values, or contains an invalid property value
- `ProviderNotFoundException`: if a provider supporting this file type cannot be located
- `ServiceConfigurationError`: when an error occurs while loading a service provider
- `IOException`: if an I/O error occurs

## FileSystems.newFileSystem(Path)

```java
public static FileSystem newFileSystem(Path path) throws IOException
```

Constructs a new `FileSystem` to access the contents of a file as a
file system.

 This method makes use of specialized providers that create pseudo file
systems where the contents of one or more files is treated as a file
system.

 This method first attempts to locate an installed provider in exactly
the same manner as the newFileSystem(Path, Map, ClassLoader) method. If found, the provider's
Map) newFileSystem(Path, Map)
method is invoked with an empty map to construct the new file system.

Parameters:

- `path`: the path to the file

**Returns:** a new file system

**Since:** 13

Throws:

- `ProviderNotFoundException`: if a provider supporting this file type cannot be located
- `ServiceConfigurationError`: when an error occurs while loading a service provider
- `IOException`: if an I/O error occurs

## FileSystems.newFileSystem(Path, Map<String,?>, ClassLoader)

```java
public static FileSystem newFileSystem(Path path, Map<String,?> env, ClassLoader loader) throws IOException
```

Constructs a new `FileSystem` to access the contents of a file as a
file system.

 This method makes use of specialized providers that create pseudo file
systems where the contents of one or more files is treated as a file
system.

 This method iterates over the installed providers. It invokes, in turn, each provider's newFileSystem(Path,Map)
method. If a provider returns a file system then the iteration
terminates and the file system is returned.
If none of the installed providers return a `FileSystem` then
an attempt is made to locate the provider using the given class loader.
If a provider returns a file
system, then the lookup terminates and the file system is returned.

Parameters:

- `path`: the path to the file
- `env`: a map of provider specific properties to configure the file system; may be empty
- `loader`: the class loader to locate the provider or `null` to only attempt to locate an installed provider

**Returns:** a new file system

**Since:** 13

Throws:

- `IllegalArgumentException`: if the `env` parameter does not contain properties required by the provider, contains an invalid combination of properties and values, or contains an invalid property value
- `ProviderNotFoundException`: if a provider supporting this file type cannot be located
- `ServiceConfigurationError`: when an error occurs while loading a service provider
- `IOException`: if an I/O error occurs
