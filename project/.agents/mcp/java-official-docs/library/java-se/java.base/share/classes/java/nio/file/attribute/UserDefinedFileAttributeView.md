---
title: "UserDefinedFileAttributeView interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/UserDefinedFileAttributeView.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UserDefinedFileAttributeView interface (java.nio.file.attribute)

```java
public interface UserDefinedFileAttributeView extends FileAttributeView
```

A file attribute view that provides a view of a file's user-defined
attributes, sometimes known as *extended attributes*. User-defined
file attributes are used to store metadata with a file that is not meaningful
to the file system. It is primarily intended for file system implementations
that support such a capability directly but may be emulated. The details of
such emulation are highly implementation specific and therefore not specified.

 This `FileAttributeView` provides a view of a file's user-defined
attributes as a set of name/value pairs, where the attribute name is
represented by a `String`. An implementation may require to encode and
decode from the platform or file system representation when accessing the
attribute. The value has opaque content. This attribute view defines the
read and write methods to read the value into
or write from a `ByteBuffer`. This `FileAttributeView` is not
intended for use where the size of an attribute value is larger than `Integer.MAX_VALUE`.

 The supportsFileAttributeView method may be used to test if a specific FileStore supports the storage of user-defined
attributes.

 Where dynamic access to file attributes is required, the getAttribute method may be used to read
the attribute value. The attribute value is returned as a byte array (byte[]).
The setAttribute method may be used
to write the value of a user-defined attribute from a buffer (as if by
invoking the write method), or byte array (byte[]).

**Since:** 1.7

## UserDefinedFileAttributeView.name()

```java
String name()
```

Returns the name of this attribute view. Attribute views of this type
have the name `"user"`.

## UserDefinedFileAttributeView.list()

```java
List<String> list() throws IOException
```

Returns a list containing the names of the user-defined attributes.

**Returns:** An unmodifiable list containing the names of the file's
         user-defined

Throws:

- `IOException`: If an I/O error occurs

## UserDefinedFileAttributeView.size(String)

```java
int size(String name) throws IOException
```

Returns the size of the value of a user-defined attribute.

Parameters:

- `name`: The attribute name

**Returns:** The size of the attribute value, in bytes.

Throws:

- `ArithmeticException`: If the size of the attribute is larger than `Integer.MAX_VALUE`
- `IOException`: If an I/O error occurs

## UserDefinedFileAttributeView.read(String, ByteBuffer)

```java
int read(String name, ByteBuffer dst) throws IOException
```

Read the value of a user-defined attribute into a buffer.

 This method reads the value of the attribute into the given buffer
as a sequence of bytes, failing if the number of bytes remaining in
the buffer is insufficient to read the complete attribute value. The
number of bytes transferred into the buffer is `n`, where `n`
is the size of the attribute value. The first byte in the sequence is at
index `p` and the last byte is at index `p + n - 1`, where
`p` is the buffer's position. Upon return the buffer's position
will be equal to `p + n`; its limit will not have changed.

 **Usage Example:**
Suppose we want to read a file's MIME type that is stored as a user-defined
attribute with the name "`user.mimetype`".

Parameters:

- `name`: The attribute name
- `dst`: The destination buffer

**Returns:** The number of bytes read, possibly zero

**See also:** #size

Throws:

- `IllegalArgumentException`: If the destination buffer is read-only
- `IOException`: If an I/O error occurs or there is insufficient space in the destination buffer for the attribute value

## UserDefinedFileAttributeView.write(String, ByteBuffer)

```java
int write(String name, ByteBuffer src) throws IOException
```

Writes the value of a user-defined attribute from a buffer.

 This method writes the value of the attribute from a given buffer as
a sequence of bytes. The size of the value to transfer is `r`,
where `r` is the number of bytes remaining in the buffer, that is
`src.remaining()`. The sequence of bytes is transferred from the
buffer starting at index `p`, where `p` is the buffer's
position. Upon return, the buffer's position will be equal to `p + n`, where `n` is the number of bytes transferred; its limit
will not have changed.

 If an attribute of the given name already exists then its value is
replaced. If the attribute does not exist then it is created. It
is implementation specific if a test to check for the existence of the
attribute and the creation of attribute are atomic with respect to other
file system activities.

 Where there is insufficient space to store the attribute, or the
attribute name or value exceed an implementation specific maximum size
then an `IOException` is thrown.

 **Usage Example:**
Suppose we want to write a file's MIME type as a user-defined attribute:

Parameters:

- `name`: The attribute name
- `src`: The buffer containing the attribute value

**Returns:** The number of bytes written, possibly zero

Throws:

- `IOException`: If an I/O error occurs

## UserDefinedFileAttributeView.delete(String)

```java
void delete(String name) throws IOException
```

Deletes a user-defined attribute.

Parameters:

- `name`: The attribute name

Throws:

- `IOException`: If an I/O error occurs or the attribute does not exist
