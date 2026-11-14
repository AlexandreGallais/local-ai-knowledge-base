---
title: "FileSystemProvider class (java.nio.file.spi) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/spi/FileSystemProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystemProvider class (java.nio.file.spi)

```java
public abstract class FileSystemProvider
```

Service-provider class for file systems. The methods defined by the `java.nio.file.Files` class will typically delegate to an instance of this
class.

 A file system provider is a concrete implementation of this class that
implements the abstract methods defined by this class. A provider is
identified by a `URI` scheme. The default provider
is identified by the URI scheme "file". It creates the `FileSystem` that
provides access to the file systems accessible to the Java virtual machine.
The `FileSystems` class defines how file system providers are located
and loaded. The default provider is typically a system-default provider but
may be overridden if the system property `java.nio.file.spi.DefaultFileSystemProvider` is set. In that case, the
provider has a one argument constructor whose formal parameter type is `FileSystemProvider`. All other providers have a zero argument constructor
that initializes the provider.

 A provider is a factory for one or more `FileSystem` instances. Each
file system is identified by a `URI` where the URI's scheme matches
the provider's scheme. The default file system, for example,
is identified by the URI `"file:///"`. A memory-based file system,
for example, may be identified by a URI such as `"memory:///?name=logfs"`.
The newFileSystem method may be used to create a file
system, and the getFileSystem method may be used to
obtain a reference to an existing file system created by the provider. Where
a provider is the factory for a single file system then it is provider dependent
if the file system is created when the provider is initialized, or later when
the `newFileSystem` method is invoked. In the case of the default
provider, the `FileSystem` is created when the provider is initialized.

 All of the methods in this class are safe for use by multiple concurrent
threads.

**Since:** 1.7

## FileSystemProvider.FileSystemProvider()

```java
protected FileSystemProvider()
```

Initializes a new instance of this class.

 During construction a provider may safely access files associated
with the default provider but care needs to be taken to avoid circular
loading of other installed providers. If circular loading of installed
providers is detected then an unspecified error is thrown.

## FileSystemProvider.installedProviders()

```java
public static List<FileSystemProvider> installedProviders()
```

Returns a list of the installed file system providers.

 The first invocation of this method causes the default provider to be
initialized (if not already initialized) and loads any other installed
providers as described by the `FileSystems` class.

**Returns:** An unmodifiable list of the installed file system providers. The
         list contains at least one element, that is the default file
         system provider

Throws:

- `ServiceConfigurationError`: When an error occurs while loading a service provider

## FileSystemProvider.getScheme()

```java
public abstract String getScheme()
```

Returns the URI scheme that identifies this provider.

**Returns:** The URI scheme

## FileSystemProvider.newFileSystem(URI, Map<String,?>)

```java
public abstract FileSystem newFileSystem(URI uri, Map<String,?> env) throws IOException
```

Constructs a new `FileSystem` object identified by a URI. This
method is invoked by the `FileSystems.newFileSystem(URI,Map)`
method to open a new file system identified by a URI.

 The `uri` parameter is an absolute, hierarchical URI, with a
scheme equal (without regard to case) to the scheme supported by this
provider. The exact form of the URI is highly provider dependent. The
`env` parameter is a map of provider specific properties to configure
the file system.

 This method throws `FileSystemAlreadyExistsException` if the
file system already exists because it was previously created by an
invocation of this method. Once a file system is closed it is provider-dependent if the
provider allows a new file system to be created with the same URI as a
file system it previously created.

Parameters:

- `uri`: URI reference
- `env`: A map of provider specific properties to configure the file system; may be empty

**Returns:** A new file system

Throws:

- `IllegalArgumentException`: If the pre-conditions for the `uri` parameter aren't met, or the `env` parameter does not contain properties required by the provider, or a property value is invalid
- `IOException`: An I/O error occurs creating the file system
- `FileSystemAlreadyExistsException`: If the file system has already been created

## FileSystemProvider.getFileSystem(URI)

```java
public abstract FileSystem getFileSystem(URI uri)
```

Returns an existing `FileSystem` created by this provider.

 This method returns a reference to a `FileSystem` that was
created by invoking the newFileSystem(URI,Map)
method. File systems created by the newFileSystem(Path,Map) method are not returned by this method.
The file system is identified by its `URI`. Its exact form
is highly provider dependent. In the case of the default provider the URI's
path component is `"/"` and the authority, query and fragment components
are undefined (Undefined components are represented by `null`).

 Once a file system created by this provider is closed it is provider-dependent if this
method returns a reference to the closed file system or throws `FileSystemNotFoundException`. If the provider allows a new file system to
be created with the same URI as a file system it previously created then
this method throws the exception if invoked after the file system is
closed (and before a new instance is created by the newFileSystem method).

Parameters:

- `uri`: URI reference

**Returns:** The file system

Throws:

- `IllegalArgumentException`: If the pre-conditions for the `uri` parameter aren't met
- `FileSystemNotFoundException`: If the file system does not exist

## FileSystemProvider.getPath(URI)

```java
public abstract Path getPath(URI uri)
```

Return a `Path` object by converting the given `URI`. The
resulting `Path` is associated with a `FileSystem` that
already exists or is constructed automatically.

 The exact form of the URI is file system provider dependent. In the
case of the default provider, the URI scheme is `"file"` and the
given URI has a non-empty path component, and undefined query, and
fragment components. The resulting `Path` is associated with the
default default `FileSystem`.

Parameters:

- `uri`: The URI to convert

**Returns:** The resulting `Path`

Throws:

- `IllegalArgumentException`: If the URI scheme does not identify this provider or other preconditions on the uri parameter do not hold
- `FileSystemNotFoundException`: The file system, identified by the URI, does not exist and cannot be created automatically

## FileSystemProvider.newFileSystem(Path, Map<String,?>)

```java
public FileSystem newFileSystem(Path path, Map<String,?> env) throws IOException
```

Constructs a new `FileSystem` to access the contents of a file as a
file system.

 This method is intended for specialized providers of pseudo file
systems where the contents of one or more files is treated as a file
system. The `env` parameter is a map of provider specific properties
to configure the file system.

 If this provider does not support the creation of such file systems
or if the provider does not recognize the file type of the given file then
it throws `UnsupportedOperationException`. The default implementation
of this method throws `UnsupportedOperationException`.

Parameters:

- `path`: The path to the file
- `env`: A map of provider specific properties to configure the file system; may be empty

**Returns:** A new file system

Throws:

- `UnsupportedOperationException`: If this provider does not support access to the contents as a file system or it does not recognize the file type of the given file
- `IllegalArgumentException`: If the `env` parameter does not contain properties required by the provider, or a property value is invalid
- `IOException`: If an I/O error occurs

## FileSystemProvider.newInputStream(Path, OpenOption...)

```java
public InputStream newInputStream(Path path, OpenOption... options) throws IOException
```

Opens a file, returning an input stream to read from the file. This
method works in exactly the manner specified by the `Files.newInputStream` method.

 The default implementation of this method opens a channel to the file
as if by invoking the `newByteChannel` method and constructs a
stream that reads bytes from the channel. This method should be overridden
where appropriate.

Parameters:

- `path`: the path to the file to open
- `options`: options specifying how the file is opened

**Returns:** a new input stream

Throws:

- `IllegalArgumentException`: if an invalid combination of options is specified
- `UnsupportedOperationException`: if an unsupported option is specified
- `IOException`: if an I/O error occurs

## FileSystemProvider.newOutputStream(Path, OpenOption...)

```java
public OutputStream newOutputStream(Path path, OpenOption... options) throws IOException
```

Opens or creates a file, returning an output stream that may be used to
write bytes to the file. This method works in exactly the manner
specified by the `Files.newOutputStream` method.

 The default implementation of this method opens a channel to the file
as if by invoking the `newByteChannel` method and constructs a
stream that writes bytes to the channel. This method should be overridden
where appropriate.

Parameters:

- `path`: the path to the file to open or create
- `options`: options specifying how the file is opened

**Returns:** a new output stream

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `UnsupportedOperationException`: if an unsupported option is specified
- `IOException`: if an I/O error occurs
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified *(optional specific exception)*

## FileSystemProvider.newFileChannel(Path, Set<? extends OpenOption>, FileAttribute<?>...)

```java
public FileChannel newFileChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs) throws IOException
```

Opens or creates a file for reading and/or writing, returning a file
channel to access the file. This method works in exactly the manner
specified by the FileChannel.open method. A provider that does not support all the
features required to construct a file channel throws `UnsupportedOperationException`. The default provider is required to
support the creation of file channels. When not overridden, the default
implementation throws `UnsupportedOperationException`.

Parameters:

- `path`: the path of the file to open or create
- `options`: options specifying how the file is opened
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** a new file channel

Throws:

- `IllegalArgumentException`: If the set contains an invalid combination of options
- `UnsupportedOperationException`: If this provider that does not support creating file channels, or an unsupported open option or file attribute is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: If an I/O error occurs

## FileSystemProvider.newAsynchronousFileChannel(Path, Set<? extends OpenOption>, ExecutorService, FileAttribute<?>...)

```java
public AsynchronousFileChannel newAsynchronousFileChannel(Path path, Set<? extends OpenOption> options, ExecutorService executor, FileAttribute<?>... attrs) throws IOException
```

Opens or creates a file for reading and/or writing, returning an
asynchronous file channel to access the file. This method works in
exactly the manner specified by the AsynchronousFileChannel.open method.
A provider that does not support all the features required to construct
an asynchronous file channel throws `UnsupportedOperationException`.
The default provider is required to support the creation of asynchronous
file channels. When not overridden, the default implementation of this
method throws `UnsupportedOperationException`.

Parameters:

- `path`: the path of the file to open or create
- `options`: options specifying how the file is opened
- `executor`: the thread pool or `null` to associate the channel with the default thread pool
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** a new asynchronous file channel

Throws:

- `IllegalArgumentException`: If the set contains an invalid combination of options
- `UnsupportedOperationException`: If this provider that does not support creating asynchronous file channels, or an unsupported open option or file attribute is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: If an I/O error occurs

## FileSystemProvider.newByteChannel(Path, Set<? extends OpenOption>, FileAttribute<?>...)

```java
public abstract SeekableByteChannel newByteChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs) throws IOException
```

Opens or creates a file, returning a seekable byte channel to access the
file. This method works in exactly the manner specified by the `Files.newByteChannel(Path,Set,FileAttribute[])` method.

Parameters:

- `path`: the path to the file to open or create
- `options`: options specifying how the file is opened
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** a new seekable byte channel

Throws:

- `IllegalArgumentException`: if the set contains an invalid combination of options
- `UnsupportedOperationException`: if an unsupported open option is specified or the array contains attributes that cannot be set atomically when creating the file
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: if an I/O error occurs
