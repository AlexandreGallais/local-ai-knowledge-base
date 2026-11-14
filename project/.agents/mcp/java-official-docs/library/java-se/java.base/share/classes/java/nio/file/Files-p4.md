---
title: "Files class (java.nio.file) (part 4 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 4 of 8)

## Files.probeContentType(Path)

```java
public static String probeContentType(Path path) throws IOException
```

Probes the content type of a file.

 This method uses the installed `FileTypeDetector` implementations
to probe the given file to determine its content type. Each file type
detector's probeContentType is
invoked, in turn, to probe the file type. If the file is recognized then
the content type is returned. If the file is not recognized by any of the
installed file type detectors then a system-default file type detector is
invoked to guess the content type.

 A given invocation of the Java virtual machine maintains a system-wide
list of file type detectors. Installed file type detectors are loaded
using the service-provider loading facility defined by the `ServiceLoader`
class. Installed file type detectors are loaded using the system class
loader. If the system class loader cannot be found then the platform class
loader is used. File type detectors are typically installed
by placing them in a JAR file on the application class path,
the JAR file contains a provider-configuration file
named `java.nio.file.spi.FileTypeDetector` in the resource directory
`META-INF/services`, and the file lists one or more fully-qualified
names of concrete subclass of `FileTypeDetector` that have a zero
argument constructor. If the process of locating or instantiating the
installed file type detectors fails then an unspecified error is thrown.
The ordering that installed providers are located is implementation
specific.

 The return value of this method is the string form of the value of a
Multipurpose Internet Mail Extension (MIME) content type as
defined by *RFC 2045:
Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet
Message Bodies*. The string is guaranteed to be parsable according
to the grammar in the RFC.

Parameters:

- `path`: the path to the file to probe

**Returns:** The content type of the file, or `null` if the content
         type cannot be determined

Throws:

- `IOException`: if an I/O error occurs

## Files.getFileAttributeView(Path, Class<V>, LinkOption...)

```java
public static <V extends FileAttributeView> V getFileAttributeView(Path path, Class<V> type, LinkOption... options)
```

Returns a file attribute view of a given type.

 A file attribute view provides a read-only or updatable view of a
set of file attributes. This method is intended to be used where the file
attribute view defines type-safe methods to read or update the file
attributes. The `type` parameter is the type of the attribute view
required and the method returns an instance of that type if supported.
The `BasicFileAttributeView` type supports access to the basic
attributes of a file. Invoking this method to select a file attribute
view of that type will always return an instance of that class.

 The `options` array may be used to indicate how symbolic links
are handled by the resulting file attribute view for the case that the
file is a symbolic link. By default, symbolic links are followed. If the
option NOFOLLOW_LINKS is present then
symbolic links are not followed. This option is ignored by implementations
that do not support symbolic links.

 **Usage Example:**
Suppose we want read or set a file's ACL, if supported:

Parameters:

- `<V>`: The `FileAttributeView` type
- `path`: the path to the file
- `type`: the `Class` object corresponding to the file attribute view
- `options`: options indicating how symbolic links are handled

**Returns:** a file attribute view of the specified type, or `null` if
         the attribute view type is not available

## Files.readAttributes(Path, Class, LinkOption...)

```java
public static <A extends BasicFileAttributes> A readAttributes(Path path, Class<A> type, LinkOption... options) throws IOException
```

Reads a file's attributes as a bulk operation.

 The `type` parameter is the type of the attributes required
and this method returns an instance of that type if supported. All
implementations support a basic set of file attributes and so invoking
this method with a  `type` parameter of `BasicFileAttributes.class` will not throw `UnsupportedOperationException`.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 It is implementation specific if all file attributes are read as an
atomic operation with respect to other file system operations.

 **Usage Example:**
Suppose we want to read a file's attributes in bulk:

Alternatively, suppose we want to read file's POSIX attributes without
following symbolic links:

Parameters:

- ``: The `BasicFileAttributes` type
- `path`: the path to the file
- `type`: the `Class` of the file attributes required to read
- `options`: options indicating how symbolic links are handled

**Returns:** the file attributes

Throws:

- `UnsupportedOperationException`: if an attributes of the given type are not supported
- `IOException`: if an I/O error occurs

## Files.setAttribute(Path, String, Object, LinkOption...)

```java
public static Path setAttribute(Path path, String attribute, Object value, LinkOption... options) throws IOException
```

Sets the value of a file attribute.

 The `attribute` parameter identifies the attribute to be set
and takes the form:

[*view-name***:**]*attribute-name*

where square brackets [...] delineate an optional component and the
character `':'` stands for itself.

 *view-name* is the name of a `FileAttributeView` that identifies a set of file attributes. If not
specified then it defaults to `"basic"`, the name of the file
attribute view that identifies the basic set of file attributes common to
many file systems. *attribute-name* is the name of the attribute
within the set.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is set. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 **Usage Example:**
Suppose we want to set the DOS "hidden" attribute:

Parameters:

- `path`: the path to the file
- `attribute`: the attribute to set
- `value`: the attribute value
- `options`: options indicating how symbolic links are handled

**Returns:** the given path

Throws:

- `UnsupportedOperationException`: if the attribute view is not available
- `IllegalArgumentException`: if the attribute name is not specified, or is not recognized, or the attribute value is of the correct type but has an inappropriate value
- `ClassCastException`: if the attribute value is not of the expected type or is a collection containing elements that are not of the expected type
- `IOException`: if an I/O error occurs

## Files.getAttribute(Path, String, LinkOption...)

```java
public static Object getAttribute(Path path, String attribute, LinkOption... options) throws IOException
```

Reads the value of a file attribute.

 The `attribute` parameter identifies the attribute to be read
and takes the form:

[*view-name***:**]*attribute-name*

where square brackets [...] delineate an optional component and the
character `':'` stands for itself.

 *view-name* is the name of a `FileAttributeView` that identifies a set of file attributes. If not
specified then it defaults to `"basic"`, the name of the file
attribute view that identifies the basic set of file attributes common to
many file systems. *attribute-name* is the name of the attribute.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 **Usage Example:**
Suppose we require the user ID of the file owner on a system that
supports a "`unix`" view:

Parameters:

- `path`: the path to the file
- `attribute`: the attribute to read
- `options`: options indicating how symbolic links are handled

**Returns:** the attribute value

Throws:

- `UnsupportedOperationException`: if the attribute view is not available
- `IllegalArgumentException`: if the attribute name is not specified or is not recognized
- `IOException`: if an I/O error occurs

## Files.readAttributes(Path, String, LinkOption...)

```java
public static Map<String,Object> readAttributes(Path path, String attributes, LinkOption... options) throws IOException
```

Reads a set of file attributes as a bulk operation.

 The `attributes` parameter identifies the attributes to be read
and takes the form:

[*view-name***:**]*attribute-list*

where square brackets [...] delineate an optional component and the
character `':'` stands for itself.

 *view-name* is the name of a `FileAttributeView` that identifies a set of file attributes. If not
specified then it defaults to `"basic"`, the name of the file
attribute view that identifies the basic set of file attributes common to
many file systems.

 The *attribute-list* component is a comma separated list of
one or more names of attributes to read. If the list contains the value
`"*"` then all attributes are read. Attributes that are not supported
are ignored and will not be present in the returned map. It is
implementation specific if all attributes are read as an atomic operation
with respect to other file system operations.

 The following examples demonstrate possible values for the `attributes` parameter:

Possible values

 Example
 Description

   `"*"`
   Read all basic-file-attributes.

   `"size,lastModifiedTime,lastAccessTime"`
   Reads the file size, last modified time, and last access time
    attributes.

   `"posix:*"`
   Read all POSIX-file-attributes.

   `"posix:permissions,owner,size"`
   Reads the POSIX file permissions, owner, and file size.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

Parameters:

- `path`: the path to the file
- `attributes`: the attributes to read
- `options`: options indicating how symbolic links are handled

**Returns:** a map of the attributes returned; The map's keys are the
         attribute names, its values are the attribute values

Throws:

- `UnsupportedOperationException`: if the attribute view is not available
- `IllegalArgumentException`: if no attributes are specified or an unrecognized attribute is specified
- `IOException`: if an I/O error occurs

## Files.getPosixFilePermissions(Path, LinkOption...)

```java
public static Set<PosixFilePermission> getPosixFilePermissions(Path path, LinkOption... options) throws IOException
```

Returns a file's POSIX file permissions.

 The `path` parameter is associated with a `FileSystem`
that supports the `PosixFileAttributeView`. This attribute view
provides access to file attributes commonly associated with files on file
systems used by operating systems that implement the Portable Operating
System Interface (POSIX) family of standards.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

Parameters:

- `path`: the path to the file
- `options`: options indicating how symbolic links are handled

**Returns:** the file permissions

Throws:

- `UnsupportedOperationException`: if the associated file system does not support the `PosixFileAttributeView`
- `IOException`: if an I/O error occurs

## Files.setPosixFilePermissions(Path, Set<PosixFilePermission>)

```java
public static Path setPosixFilePermissions(Path path, Set<PosixFilePermission> perms) throws IOException
```

Sets a file's POSIX permissions.

 The `path` parameter is associated with a `FileSystem`
that supports the `PosixFileAttributeView`. This attribute view
provides access to file attributes commonly associated with files on file
systems used by operating systems that implement the Portable Operating
System Interface (POSIX) family of standards.

Parameters:

- `path`: The path to the file
- `perms`: The new set of permissions

**Returns:** The given path

Throws:

- `UnsupportedOperationException`: if the associated file system does not support the `PosixFileAttributeView`
- `ClassCastException`: if the sets contains elements that are not of type `PosixFilePermission`
- `IOException`: if an I/O error occurs

## Files.getOwner(Path, LinkOption...)

```java
public static UserPrincipal getOwner(Path path, LinkOption... options) throws IOException
```

Returns the owner of a file.

 The `path` parameter is associated with a file system that
supports `FileOwnerAttributeView`. This file attribute view provides
access to a file attribute that is the owner of the file.

Parameters:

- `path`: The path to the file
- `options`: options indicating how symbolic links are handled

**Returns:** A user principal representing the owner of the file

Throws:

- `UnsupportedOperationException`: if the associated file system does not support the `FileOwnerAttributeView`
- `IOException`: if an I/O error occurs

## Files.setOwner(Path, UserPrincipal)

```java
public static Path setOwner(Path path, UserPrincipal owner) throws IOException
```

Updates the file owner.

 The `path` parameter is associated with a file system that
supports `FileOwnerAttributeView`. This file attribute view provides
access to a file attribute that is the owner of the file.

 **Usage Example:**
Suppose we want to make "joe" the owner of a file:

Parameters:

- `path`: The path to the file
- `owner`: The new file owner

**Returns:** The given path

**See also:** FileSystem#getUserPrincipalLookupService

**See also:** java.nio.file.attribute.UserPrincipalLookupService

Throws:

- `UnsupportedOperationException`: if the associated file system does not support the `FileOwnerAttributeView`
- `IOException`: if an I/O error occurs
