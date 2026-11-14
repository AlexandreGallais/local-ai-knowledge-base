---
title: "ModuleReader interface (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ModuleReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleReader interface (java.lang.module)

```java
public interface ModuleReader extends Closeable
```

Provides access to the content of a module.

 A module reader is intended for cases where access to the resources in a
module is required, regardless of whether the module has been loaded.
A framework that scans a collection of packaged modules on the file system,
for example, may use a module reader to access a specific resource in each
module. A module reader is also intended to be used by `ClassLoader`
implementations that load classes and resources from modules.

 A resource in a module is identified by an abstract name that is a
'`/`'-separated path string. For example, module `java.base` may
have a resource "`java/lang/Object.class`" that, by convention, is the
class file for `java.lang.Object`. A module reader may treat
directories in the module content as resources (whether it does or not is
module reader specific). Where the module content contains a directory
that can be located as a resource then its name ends with a slash ('/'). The
directory can also be located with a name that drops the trailing slash.

 A `ModuleReader` is open upon
creation and is closed by invoking the close method.  Failure
to close a module reader may result in a resource leak.  The `try-with-resources` statement provides a useful construct to ensure that
module readers are closed.

**Implementation requirements:** Implementations of `ModuleReader` should take great care
when translating an abstract resource name to the location of a resource in
a packaged module or on the file system. Implementations are advised to
treat resource names with elements such as '`.`,  '`..`',
elements containing file separators, or empty elements as "not found". More
generally, if the resource name is not in the stream of elements that the
`list` method returns then the resource should be treated as "not
found" to avoid inconsistencies.

**See also:** ModuleReference

**Since:** 9

## ModuleReader.find(String)

```java
Optional<URI> find(String name) throws IOException
```

Finds a resource, returning a URI to the resource in the module.

 If the module reader can determine that the name locates a directory
then the resulting URI will end with a slash ('/').

Parameters:

- `name`: The name of the resource to open for reading

**Returns:** A URI to the resource; an empty `Optional` if the resource
        is not found or a URI cannot be constructed to locate the
        resource

**See also:** ClassLoader#getResource(String)

Throws:

- `IOException`: If an I/O error occurs or the module reader is closed

## ModuleReader.open(String)

```java
default Optional<InputStream> open(String name) throws IOException
```

Opens a resource, returning an input stream to read the resource in
the module.

 The behavior of the input stream when used after the module reader
is closed is implementation specific and therefore not specified.

Parameters:

- `name`: The name of the resource to open for reading

**Implementation requirements:** The default implementation invokes the find method to get a URI to the resource. If found, then it attempts
to construct a URL and open a connection to the
resource.

**Returns:** An input stream to read the resource or an empty
        `Optional` if not found

Throws:

- `IOException`: If an I/O error occurs or the module reader is closed

## ModuleReader.read(String)

```java
default Optional<ByteBuffer> read(String name) throws IOException
```

Reads a resource, returning a byte buffer with the contents of the
resource.

The element at the returned buffer's position is the first byte of the
resource, the element at the buffer's limit is the last byte of the
resource. Once consumed, the release method
must be invoked. Failure to invoke the `release` method may result
in a resource leak.

Parameters:

- `name`: The name of the resource to read

**API note:** This method is intended for high-performance class loading. It
is not capable (or intended) to read arbitrary large resources that
could potentially be 2GB or larger. The rationale for using this method
in conjunction with the `release` method is to allow module reader
implementations manage buffers in an efficient manner.

**Implementation requirements:** The default implementation invokes the open method and reads all bytes from the input stream into a byte
buffer.

**Returns:** A byte buffer containing the contents of the resource or an
        empty `Optional` if not found

**See also:** ClassLoader#defineClass(String, ByteBuffer, java.security.ProtectionDomain)

Throws:

- `IOException`: If an I/O error occurs or the module reader is closed
- `OutOfMemoryError`: If the resource is larger than `Integer.MAX_VALUE`, the maximum capacity of a byte buffer

## ModuleReader.release(ByteBuffer)

```java
default void release(ByteBuffer bb)
```

Releases a byte buffer. This method should be invoked after consuming
the contents of the buffer returned by the `read` method.
The behavior of this method when invoked to release a buffer that has
already been released, or the behavior when invoked to release a buffer
after a `ModuleReader` is closed is implementation specific and
therefore not specified.

Parameters:

- `bb`: The byte buffer to release

**Implementation requirements:** The default implementation doesn't do anything except check
if the byte buffer is null.

## ModuleReader.list()

```java
Stream<String> list() throws IOException
```

Lists the contents of the module, returning a stream of elements that
are the names of all resources in the module. Whether the stream of
elements includes names corresponding to directories in the module is
module reader specific.

 In lazy implementations then an `IOException` may be thrown
when using the stream to list the module contents. If this occurs then
the `IOException` will be wrapped in an `java.io.UncheckedIOException` and thrown from the method that caused the
access to be attempted.

 The returned stream may contain references to one or more open directories
in the module. The directories are closed by closing the stream.

 The behavior of the stream when used after the module reader is
closed is implementation specific and therefore not specified.

**API note:** This method should be used within a try-with-resources statement or similar
control structure to ensure that any open directories referenced by the
stream are closed promptly after the stream's operations have completed.

**Returns:** A stream of elements that are the names of all resources
        in the module

Throws:

- `IOException`: If an I/O error occurs or the module reader is closed

## ModuleReader.close()

```java
void close() throws IOException
```

Closes the module reader. Once closed then subsequent calls to locate or
read a resource will fail by throwing `IOException`.

 A module reader is not required to be asynchronously closeable. If a
thread is reading a resource and another thread invokes the close method,
then the second thread may block until the read operation is complete.
