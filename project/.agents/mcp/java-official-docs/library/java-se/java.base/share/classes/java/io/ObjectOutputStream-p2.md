---
title: "ObjectOutputStream class (java.io) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectOutputStream class (java.io) (part 2 of 3)

## ObjectOutputStream.annotateProxyClass(Class<?>)

```java
protected void annotateProxyClass(Class<?> cl) throws IOException
```

Subclasses may implement this method to store custom data in the stream
along with descriptors for dynamic proxy classes.

This method is called exactly once for each unique proxy class
descriptor in the stream.  The default implementation of this method in
`ObjectOutputStream` does nothing.

The corresponding method in `ObjectInputStream` is
`resolveProxyClass`.  For a given subclass of
`ObjectOutputStream` that overrides this method, the
`resolveProxyClass` method in the corresponding subclass of
`ObjectInputStream` must read any data or objects written by
`annotateProxyClass`.

Parameters:

- `cl`: the proxy class to annotate custom data for

**See also:** ObjectInputStream#resolveProxyClass(String[])

**Since:** 1.3

Throws:

- `IOException`: any exception thrown by the underlying `OutputStream`

## ObjectOutputStream.replaceObject(Object)

```java
protected Object replaceObject(Object obj) throws IOException
```

This method will allow trusted subclasses of ObjectOutputStream to
substitute one object for another during serialization. Replacing
objects is disabled until enableReplaceObject is called. The
enableReplaceObject method checks that the stream requesting to do
replacement can be trusted.  The first occurrence of each object written
into the serialization stream is passed to replaceObject.  Subsequent
references to the object are replaced by the object returned by the
original call to replaceObject.  To ensure that the private state of
objects is not unintentionally exposed, only trusted streams may use
replaceObject.

The ObjectOutputStream.writeObject method takes a parameter of type
Object (as opposed to type Serializable) to allow for cases where
non-serializable objects are replaced by serializable ones.

When a subclass is replacing objects it must ensure that either a
complementary substitution must be made during deserialization or that
the substituted object is compatible with every field where the
reference will be stored.  Objects whose type is not a subclass of the
type of the field or array element abort the serialization by raising an
exception and the object is not be stored.

This method is called only once when each object is first
encountered.  All subsequent references to the object will be redirected
to the new object. This method should return the object to be
substituted or the original object.

Null can be returned as the object to be substituted, but may cause
`NullPointerException` in classes that contain references to the
original object since they may be expecting an object instead of
null.

Parameters:

- `obj`: the object to be replaced

**Returns:** the alternate object that replaced the specified one

Throws:

- `IOException`: Any exception thrown by the underlying OutputStream.

## ObjectOutputStream.enableReplaceObject(boolean)

```java
protected boolean enableReplaceObject(boolean enable)
```

Enables the stream to do replacement of objects written to the stream.  When
enabled, the `replaceObject` method is called for every object being
serialized.

Parameters:

- `enable`: true for enabling use of `replaceObject` for every object being serialized

**Returns:** the previous setting before this method was invoked

## ObjectOutputStream.writeStreamHeader()

```java
protected void writeStreamHeader() throws IOException
```

The writeStreamHeader method is provided so subclasses can append or
prepend their own header to the stream.  It writes the magic number and
version to the stream.

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeClassDescriptor(ObjectStreamClass)

```java
protected void writeClassDescriptor(ObjectStreamClass desc) throws IOException
```

Write the specified class descriptor to the ObjectOutputStream.  Class
descriptors are used to identify the classes of objects written to the
stream.  Subclasses of ObjectOutputStream may override this method to
customize the way in which class descriptors are written to the
serialization stream.  The corresponding method in ObjectInputStream,
readClassDescriptor, should then be
overridden to reconstitute the class descriptor from its custom stream representation.
By default, this method writes class descriptors according to the format
defined in the
*Java Object Serialization Specification*.

Note that this method will only be called if the ObjectOutputStream
is not using the old serialization stream format (set by calling
ObjectOutputStream's `useProtocolVersion` method).  If this
serialization stream is using the old format
(`PROTOCOL_VERSION_1`), the class descriptor will be written
internally in a manner that cannot be overridden or customized.

Parameters:

- `desc`: class descriptor to write to the stream

**See also:** java.io.ObjectInputStream#readClassDescriptor()

**See also:** #useProtocolVersion(int)

**See also:** java.io.ObjectStreamConstants#PROTOCOL_VERSION_1

**Since:** 1.3

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutputStream.write(int)

```java
public void write(int val) throws IOException
```

Writes a byte. This method will block until the byte is actually
written.

Parameters:

- `val`: the byte to be written to the stream

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutputStream.write(byte[])

```java
public void write(byte[] buf) throws IOException
```

Writes an array of bytes. This method will block until the bytes are
actually written.

Parameters:

- `buf`: the data to be written

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutputStream.write(byte[], int, int)

```java
public void write(byte[] buf, int off, int len) throws IOException
```

Writes a sub array of bytes.

Parameters:

- `buf`: the data to be written
- `off`: the start offset in the data
- `len`: the number of bytes that are written

Throws:

- `IOException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## ObjectOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes the stream. This will write any buffered output bytes and flush
through to the underlying stream.

Throws:

- `IOException`: (inherited documentation)

## ObjectOutputStream.drain()

```java
protected void drain() throws IOException
```

Drain any buffered data in ObjectOutputStream.  Similar to flush but
does not propagate the flush to the underlying stream.

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.close()

```java
public void close() throws IOException
```

Closes the stream. This method must be called to release any resources
associated with the stream.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutputStream.writeBoolean(boolean)

```java
public void writeBoolean(boolean val) throws IOException
```

Writes a boolean.

Parameters:

- `val`: the boolean to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeByte(int)

```java
public void writeByte(int val) throws IOException
```

Writes an 8-bit byte.

Parameters:

- `val`: the byte value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeShort(int)

```java
public void writeShort(int val) throws IOException
```

Writes a 16-bit short.

Parameters:

- `val`: the short value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeChar(int)

```java
public void writeChar(int val) throws IOException
```

Writes a 16-bit char.

Parameters:

- `val`: the char value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeInt(int)

```java
public void writeInt(int val) throws IOException
```

Writes a 32-bit int.

Parameters:

- `val`: the integer value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeLong(long)

```java
public void writeLong(long val) throws IOException
```

Writes a 64-bit long.

Parameters:

- `val`: the long value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeFloat(float)

```java
public void writeFloat(float val) throws IOException
```

Writes a 32-bit float.

Parameters:

- `val`: the float value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeDouble(double)

```java
public void writeDouble(double val) throws IOException
```

Writes a 64-bit double.

Parameters:

- `val`: the double value to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeBytes(String)

```java
public void writeBytes(String str) throws IOException
```

Writes a String as a sequence of bytes.

Parameters:

- `str`: the String of bytes to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeChars(String)

```java
public void writeChars(String str) throws IOException
```

Writes a String as a sequence of chars.

Parameters:

- `str`: the String of chars to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.writeUTF(String)

```java
public void writeUTF(String str) throws IOException
```

Primitive data write of this String in
modified UTF-8
format.  Note that there is a
significant difference between writing a String into the stream as
primitive data or as an Object. A String instance written by writeObject
is written into the stream as a String initially. Future writeObject()
calls write references to the string into the stream.

Parameters:

- `str`: the String to be written

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream

## ObjectOutputStream.PutField()

```java
public PutField()
```

Constructor for subclasses to call.

## ObjectOutputStream.put(String, boolean)

```java
public abstract void put(String name, boolean val)
```

Put the value of the named boolean field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `boolean`

## ObjectOutputStream.put(String, byte)

```java
public abstract void put(String name, byte val)
```

Put the value of the named byte field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `byte`

## ObjectOutputStream.put(String, char)

```java
public abstract void put(String name, char val)
```

Put the value of the named char field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `char`

## ObjectOutputStream.put(String, short)

```java
public abstract void put(String name, short val)
```

Put the value of the named short field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `short`

## ObjectOutputStream.put(String, int)

```java
public abstract void put(String name, int val)
```

Put the value of the named int field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `int`

## ObjectOutputStream.put(String, long)

```java
public abstract void put(String name, long val)
```

Put the value of the named long field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `long`

## ObjectOutputStream.put(String, float)

```java
public abstract void put(String name, float val)
```

Put the value of the named float field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `float`

## ObjectOutputStream.put(String, double)

```java
public abstract void put(String name, double val)
```

Put the value of the named double field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not `double`

## ObjectOutputStream.put(String, Object)

```java
public abstract void put(String name, Object val)
```

Put the value of the named Object field into the persistent field.

Parameters:

- `name`: the name of the serializable field
- `val`: the value to assign to the field (which may be `null`)

Throws:

- `IllegalArgumentException`: if `name` does not match the name of a serializable field for the class whose fields are being written, or if the type of the named field is not a reference type
