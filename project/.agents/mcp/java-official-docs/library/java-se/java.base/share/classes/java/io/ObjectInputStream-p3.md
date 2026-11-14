---
title: "ObjectInputStream class (java.io) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectInputStream class (java.io) (part 3 of 3)

## ObjectInputStream.readUnsignedShort()

```java
public int readUnsignedShort() throws IOException
```

Reads an unsigned 16-bit short.

**Returns:** the 16-bit short read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readInt()

```java
public int readInt() throws IOException
```

Reads a 32-bit int.

**Returns:** the 32-bit integer read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readLong()

```java
public long readLong() throws IOException
```

Reads a 64-bit long.

**Returns:** the read 64-bit long.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readFloat()

```java
public float readFloat() throws IOException
```

Reads a 32-bit float.

**Returns:** the 32-bit float read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readDouble()

```java
public double readDouble() throws IOException
```

Reads a 64-bit double.

**Returns:** the 64-bit double read.

Throws:

- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readFully(byte[])

```java
public void readFully(byte[] buf) throws IOException
```

Reads bytes, blocking until all bytes are read.

Parameters:

- `buf`: the buffer into which the data is read

Throws:

- `NullPointerException`: If `buf` is `null`.
- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.readFully(byte[], int, int)

```java
public void readFully(byte[] buf, int off, int len) throws IOException
```

Reads bytes, blocking until all bytes are read.

Parameters:

- `buf`: the buffer into which the data is read
- `off`: the start offset into the data array `buf`
- `len`: the maximum number of bytes to read

Throws:

- `NullPointerException`: If `buf` is `null`.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `buf.length - off`.
- `EOFException`: If end of file is reached.
- `IOException`: If other I/O error has occurred.

## ObjectInputStream.skipBytes(int)

```java
public int skipBytes(int len) throws IOException
```

Skips bytes.

Parameters:

- `len`: the number of bytes to be skipped

**Returns:** the actual number of bytes skipped.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectInputStream.readLine()

```java
public String readLine() throws IOException
```

Reads in a line that has been terminated by a \n, \r, \r\n or EOF.

**Returns:** a String copy of the line.

**Deprecated:** This method does not properly convert bytes to characters.
         see DataInputStream for the details and alternatives.

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`

## ObjectInputStream.readUTF()

```java
public String readUTF() throws IOException
```

Reads a String in
modified UTF-8
format.

**Returns:** the String.

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `UTFDataFormatException`: if read bytes do not represent a valid modified UTF-8 encoding of a string

## ObjectInputStream.getObjectInputFilter()

```java
public final ObjectInputFilter getObjectInputFilter()
```

Returns the deserialization filter for this stream.
The filter is the result of invoking the
JVM-wide filter factory
either by the constructor or the most recent invocation of
setObjectInputFilter.

**Returns:** the deserialization filter for the stream; may be null

**Since:** 9

## ObjectInputStream.setObjectInputFilter(ObjectInputFilter)

```java
public final void setObjectInputFilter(ObjectInputFilter filter)
```

Set the deserialization filter for the stream.

The deserialization filter is set to the filter returned by invoking the
JVM-wide filter factory
with the current filter and the `filter` parameter.
The current filter was set in the
ObjectInputStream constructors by invoking the
JVM-wide filter factory and may be `null`.
`setObjectInputFilter(ObjectInputFilter)` This method} can be called
once and only once before reading any objects from the stream;
for example, by calling `readObject` or `readUnshared`.

It is not permitted to replace a `non-null` filter with a `null` filter.
If the current filter is `non-null`,
the value returned from the filter factory must be `non-null`.

The filter's checkInput method is called
for each class and reference in the stream.
The filter can check any or all of the class, the array length, the number
of references, the depth of the graph, and the size of the input stream.
The depth is the number of nested readObject
calls starting with the reading of the root of the graph being deserialized
and the current object being deserialized.
The number of references is the cumulative number of objects and references
to objects already read from the stream including the current object being read.
The filter is invoked only when reading objects from the stream and not for
primitives.

If the filter returns Status.REJECTED,
`null` or throws a `RuntimeException`,
the active `readObject` or `readUnshared`
throws `InvalidClassException`, otherwise deserialization
continues uninterrupted.

Parameters:

- `filter`: the filter, may be null

**Implementation requirements:** The filter, when not `null`, is invoked during readObject
and readUnshared for each object (regular or class) in the stream.
Strings are treated as primitives and do not invoke the filter.
The filter is called for:

- each object reference previously deserialized from the stream
    (class is `null`, arrayLength is -1),

- each regular class (class is not `null`, arrayLength is -1),

- each interface class explicitly referenced in the stream
        (it is not called for interfaces implemented by classes in the stream),

- each interface of a dynamic proxy and the dynamic proxy class itself
    (class is not `null`, arrayLength is -1),

- each array is filtered using the array type and length of the array
    (class is the array type, arrayLength is the requested length),

- each object replaced by its class' `readResolve` method
        is filtered using the replacement object's class, if not `null`,
        and if it is an array, the arrayLength, otherwise -1,

- and each object replaced by resolveObject
        is filtered using the replacement object's class, if not `null`,
        and if it is an array, the arrayLength, otherwise -1.

When the checkInput method is invoked
it is given access to the current class, the array length,
the current number of references already read from the stream,
the depth of nested calls to readObject or
readUnshared,
and the implementation dependent number of bytes consumed from the input stream.

Each call to readObject or
readUnshared increases the depth by 1
before reading an object and decreases by 1 before returning
normally or exceptionally.
The depth starts at `1` and increases for each nested object and
decrements when each nested call returns.
The count of references in the stream starts at `1` and
is increased before reading an object.

**Since:** 9

Throws:

- `IllegalStateException`: if an object has been read, if the filter factory returns `null` when the current filter is non-null, or if the filter has already been set.

## ObjectInputStream.GetField()

```java
public GetField()
```

Constructor for subclasses to call.

## ObjectInputStream.getObjectStreamClass()

```java
public abstract ObjectStreamClass getObjectStreamClass()
```

Get the ObjectStreamClass that describes the fields in the stream.

**Returns:** the descriptor class that describes the serializable fields

## ObjectInputStream.defaulted(String)

```java
public abstract boolean defaulted(String name) throws IOException
```

Return true if the named field is defaulted and has no value in this
stream.

Parameters:

- `name`: the name of the field

**Returns:** true, if and only if the named field is defaulted

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if `name` does not correspond to a serializable field

## ObjectInputStream.get(String, boolean)

```java
public abstract boolean get(String name, boolean val) throws IOException
```

Get the value of the named boolean field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `boolean` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, byte)

```java
public abstract byte get(String name, byte val) throws IOException
```

Get the value of the named byte field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `byte` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, char)

```java
public abstract char get(String name, char val) throws IOException
```

Get the value of the named char field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `char` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, short)

```java
public abstract short get(String name, short val) throws IOException
```

Get the value of the named short field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `short` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, int)

```java
public abstract int get(String name, int val) throws IOException
```

Get the value of the named int field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `int` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, long)

```java
public abstract long get(String name, long val) throws IOException
```

Get the value of the named long field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `long` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, float)

```java
public abstract float get(String name, float val) throws IOException
```

Get the value of the named float field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `float` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, double)

```java
public abstract double get(String name, double val) throws IOException
```

Get the value of the named double field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `double` field

Throws:

- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.get(String, Object)

```java
public abstract Object get(String name, Object val) throws IOException, ClassNotFoundException
```

Get the value of the named Object field from the persistent field.

Parameters:

- `name`: the name of the field
- `val`: the default value to use if `name` does not have a value

**Returns:** the value of the named `Object` field

Throws:

- `ClassNotFoundException`: Class of a serialized object cannot be found.
- `IOException`: if there are I/O errors while reading from the underlying `InputStream`
- `IllegalArgumentException`: if type of `name` is not serializable or if the field type is incorrect

## ObjectInputStream.clear()

```java
public void clear()
```

Resets the callback list to its initial (empty) state.
