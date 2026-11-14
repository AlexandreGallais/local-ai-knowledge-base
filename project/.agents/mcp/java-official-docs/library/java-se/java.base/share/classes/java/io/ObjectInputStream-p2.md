---
title: "ObjectInputStream class (java.io) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectInputStream class (java.io) (part 2 of 3)

## ObjectInputStream.readUnshared()

```java
public Object readUnshared() throws IOException, ClassNotFoundException
```

Reads an "unshared" object from the ObjectInputStream.  This method is
identical to readObject, except that it prevents subsequent calls to
readObject and readUnshared from returning additional references to the
deserialized instance obtained via this call.  Specifically:

- If readUnshared is called to deserialize a back-reference (the
      stream representation of an object which has been written
      previously to the stream), an ObjectStreamException will be
      thrown.

- If readUnshared returns successfully, then any subsequent attempts
      to deserialize back-references to the stream handle deserialized
      by readUnshared will cause an ObjectStreamException to be thrown.

Deserializing an object via readUnshared invalidates the stream handle
associated with the returned object.  Note that this in itself does not
always guarantee that the reference returned by readUnshared is unique;
the deserialized object may define a readResolve method which returns an
object visible to other parties, or readUnshared may return a Class
object or enum constant obtainable elsewhere in the stream or through
external means. If the deserialized object defines a readResolve method
and the invocation of that method returns an array, then readUnshared
returns a shallow clone of that array; this guarantees that the returned
array object is unique and cannot be obtained a second time from an
invocation of readObject or readUnshared on the ObjectInputStream,
even if the underlying data stream has been manipulated.

The deserialization filter, when not `null`, is invoked for
each object (regular or class) read to reconstruct the root object.
See setObjectInputFilter for details.

**Returns:** reference to deserialized object

**Since:** 1.4

Throws:

- `ClassNotFoundException`: if class of an object to deserialize cannot be found
- `StreamCorruptedException`: if control information in the stream is inconsistent
- `ObjectStreamException`: if object to deserialize has already appeared in stream
- `OptionalDataException`: if primitive data is next in stream
- `IOException`: if an I/O error occurs during deserialization

## ObjectInputStream.defaultReadObject()

```java
public void defaultReadObject() throws IOException, ClassNotFoundException
```

Read the non-static and non-transient fields of the current class from
this stream.  This may only be called from the readObject method of the
class being deserialized. It will throw the NotActiveException if it is
called otherwise.

Throws:

- `ClassNotFoundException`: if the class of a serialized object could not be found.
- `IOException`: if an I/O error occurs.
- `NotActiveException`: if the stream is not currently reading objects.

## ObjectInputStream.readFields()

```java
public ObjectInputStream.GetField readFields() throws IOException, ClassNotFoundException
```

Reads the persistent fields from the stream and makes them available by
name.

**Returns:** the `GetField` object representing the persistent
         fields of the object being deserialized

**Since:** 1.2

Throws:

- `ClassNotFoundException`: if the class of a serialized object could not be found.
- `IOException`: if an I/O error occurs.
- `NotActiveException`: if the stream is not currently reading objects.

## ObjectInputStream.registerValidation(ObjectInputValidation, int)

```java
public void registerValidation(ObjectInputValidation obj, int prio) throws NotActiveException, InvalidObjectException
```

Register an object to be validated before the graph is returned.  While
similar to resolveObject these validations are called after the entire
graph has been reconstituted.  Typically, a readObject method will
register the object with the stream so that when all of the objects are
restored a final set of validations can be performed.

Parameters:

- `obj`: the object to receive the validation callback.
- `prio`: controls the order of callbacks; zero is a good default. Use higher numbers to be called back earlier, lower numbers for later callbacks. Within a priority, callbacks are processed in no particular order.

Throws:

- `NotActiveException`: The stream is not currently reading objects so it is invalid to register a callback.
- `InvalidObjectException`: The validation object is null.

## ObjectInputStream.resolveClass(ObjectStreamClass)

```java
protected Class<?> resolveClass(ObjectStreamClass desc) throws IOException, ClassNotFoundException
```

Load the local class equivalent of the specified stream class
description.  Subclasses may implement this method to allow classes to
be fetched from an alternate source.

The corresponding method in `ObjectOutputStream` is
`annotateClass`.  This method will be invoked only once for
each unique class in the stream.  This method can be implemented by
subclasses to use an alternate loading mechanism but must return a
`Class` object. Once returned, if the class is not an array
class, its serialVersionUID is compared to the serialVersionUID of the
serialized class, and if there is a mismatch, the deserialization fails
and an `InvalidClassException` is thrown.

The default implementation of this method in
`ObjectInputStream` returns the result of calling

where `loader` is the first class loader on the current
thread's stack (starting from the currently executing method) that is
neither the platform class loader nor its ancestor; otherwise, `loader` is the
*platform class loader*. If this call results in a
`ClassNotFoundException` and the name of the passed
`ObjectStreamClass` instance is the Java language keyword
for a primitive type or void, then the `Class` object
representing that primitive type or void will be returned
(e.g., an `ObjectStreamClass` with the name
`"int"` will be resolved to `Integer.TYPE`).
Otherwise, the `ClassNotFoundException` will be thrown to
the caller of this method.

Parameters:

- `desc`: an instance of class `ObjectStreamClass`

**Returns:** a `Class` object corresponding to `desc`

Throws:

- `IOException`: any of the usual Input/Output exceptions.
- `ClassNotFoundException`: if class of a serialized object cannot be found.

## ObjectInputStream.resolveProxyClass(String[])

```java
protected Class<?> resolveProxyClass(String[] interfaces) throws IOException, ClassNotFoundException
```

Returns a proxy class that implements the interfaces named in a proxy
class descriptor; subclasses may implement this method to read custom
data from the stream along with the descriptors for dynamic proxy
classes, allowing them to use an alternate loading mechanism for the
interfaces and the proxy class.

This method is called exactly once for each unique proxy class
descriptor in the stream.

The corresponding method in `ObjectOutputStream` is
`annotateProxyClass`.  For a given subclass of
`ObjectInputStream` that overrides this method, the
`annotateProxyClass` method in the corresponding subclass of
`ObjectOutputStream` must write any data or objects read by
this method.

The default implementation of this method in
`ObjectInputStream` returns the result of calling
`Proxy.getProxyClass` with the list of `Class`
objects for the interfaces that are named in the `interfaces`
parameter.  The `Class` object for each interface name
`i` is the value returned by calling

where `loader` is the first class loader on the current
thread's stack (starting from the currently executing method) that is
neither the platform class loader nor its ancestor; otherwise, `loader` is the
*platform class loader*.
Unless any of the resolved interfaces are non-public, this same value
of `loader` is also the class loader passed to
`Proxy.getProxyClass`; if non-public interfaces are present,
their class loader is passed instead (if more than one non-public
interface class loader is encountered, an
`IllegalAccessError` is thrown).
If `Proxy.getProxyClass` throws an
`IllegalArgumentException`, `resolveProxyClass`
will throw a `ClassNotFoundException` containing the
`IllegalArgumentException`.

Parameters:

- `interfaces`: the list of interface names that were deserialized in the proxy class descriptor

**Returns:** a proxy class for the specified interfaces

**See also:** ObjectOutputStream#annotateProxyClass(Class)

**Since:** 1.3

Throws:

- `IOException`: any exception thrown by the underlying `InputStream`
- `ClassNotFoundException`: if the proxy class or any of the named interfaces could not be found

## ObjectInputStream.resolveObject(Object)

```java
protected Object resolveObject(Object obj) throws IOException
```

This method will allow trusted subclasses of ObjectInputStream to
substitute one object for another during deserialization. Replacing
objects is disabled until enableResolveObject is called. The
enableResolveObject method checks that the stream requesting to resolve
object can be trusted. Every reference to serializable objects is passed
to resolveObject.  To ensure that the private state of objects is not
unintentionally exposed only trusted streams may use resolveObject.

This method is called after an object has been read but before it is
returned from readObject.  The default resolveObject method just returns
the same object.

When a subclass is replacing objects it must ensure that the
substituted object is compatible with every field where the reference
will be stored.  Objects whose type is not a subclass of the type of the
field or array element abort the deserialization by raising an exception
and the object is not be stored.

This method is called only once when each object is first
encountered.  All subsequent references to the object will be redirected
to the new object.

Parameters:

- `obj`: object to be substituted

**Returns:** the substituted object

Throws:

- `IOException`: Any of the usual Input/Output exceptions.

## ObjectInputStream.enableResolveObject(boolean)

```java
protected boolean enableResolveObject(boolean enable)
```

Enables the stream to do replacement of objects read from the stream. When
enabled, the `resolveObject` method is called for every object being
deserialized.

Parameters:

- `enable`: true for enabling use of `resolveObject` for every object being deserialized

**Returns:** the previous setting before this method was invoked

## ObjectInputStream.readStreamHeader()

```java
protected void readStreamHeader() throws IOException, StreamCorruptedException
```

The readStreamHeader method is provided to allow subclasses to read and
verify their own stream headers. It reads and verifies the magic number
and version number.

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `StreamCorruptedException`: if control information in the stream is inconsistent

## ObjectInputStream.readClassDescriptor()

```java
protected ObjectStreamClass readClassDescriptor() throws IOException, ClassNotFoundException
```

Read a class descriptor from the serialization stream.  This method is
called when the ObjectInputStream expects a class descriptor as the next
item in the serialization stream.  Subclasses of ObjectInputStream may
override this method to read in class descriptors that have been written
in non-standard formats (by subclasses of ObjectOutputStream which have
overridden the `writeClassDescriptor` method).  By default,
this method reads class descriptors according to the format defined in
the Object Serialization specification.

**Returns:** the class descriptor read

**See also:** java.io.ObjectOutputStream#writeClassDescriptor(java.io.ObjectStreamClass)

**Since:** 1.3

Throws:

- `IOException`: If an I/O error has occurred.
- `ClassNotFoundException`: If the Class of a serialized object used in the class descriptor representation cannot be found

## ObjectInputStream.read()

```java
public int read() throws IOException
```

Reads a byte of data. This method will block if no input is available.

**Returns:** the byte read, or -1 if the end of the stream is reached.

Throws:

- `IOException`: (inherited documentation)

## ObjectInputStream.read(byte[], int, int)

```java
public int read(byte[] buf, int off, int len) throws IOException
```

Reads into an array of bytes.  This method will block until some input
is available. Consider using java.io.DataInputStream.readFully to read
exactly 'length' bytes.

Parameters:

- `buf`: the buffer into which the data is read
- `off`: the start offset in the destination array `buf`
- `len`: the maximum number of bytes read

**Returns:** the total number of bytes read into the buffer, or
         `-1` if there is no more data because the end of
         the stream has been reached.

**See also:** java.io.DataInputStream#readFully(byte[],int,int)

Throws:

- `NullPointerException`: if `buf` is `null`.
- `IndexOutOfBoundsException`: if `off` is negative, `len` is negative, or `len` is greater than `buf.length - off`.
- `IOException`: If an I/O error has occurred.

## ObjectInputStream.available()

```java
public int available() throws IOException
```

Returns the number of bytes that can be read without blocking.

**Returns:** the number of available bytes.

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`

## ObjectInputStream.close()

```java
public void close() throws IOException
```

(inherited documentation)

Throws:

- `IOException`: (inherited documentation)

## ObjectInputStream.readBoolean()

```java
public boolean readBoolean() throws IOException
```

Reads in a boolean.

**Returns:** the boolean read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readByte()

```java
public byte readByte() throws IOException
```

Reads an 8-bit byte.

**Returns:** the 8-bit byte read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readUnsignedByte()

```java
public int readUnsignedByte() throws IOException
```

Reads an unsigned 8-bit byte.

**Returns:** the 8-bit byte read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readChar()

```java
public char readChar() throws IOException
```

Reads a 16-bit char.

**Returns:** the 16-bit char read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readShort()

```java
public short readShort() throws IOException
```

Reads a 16-bit short.

**Returns:** the 16-bit short read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.
