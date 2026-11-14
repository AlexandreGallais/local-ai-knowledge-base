---
title: "ObjectOutputStream class (java.io) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectOutputStream class (java.io)

```java
public class ObjectOutputStream extends OutputStream implements ObjectOutput, ObjectStreamConstants
```

An ObjectOutputStream writes primitive data types and graphs of Java objects
to an OutputStream.  The objects can be read (reconstituted) using an
ObjectInputStream.  Persistent storage of objects can be accomplished by
using a file for the stream.  If the stream is a network socket stream, the
objects can be reconstituted on another host or in another process.

Only objects that support the java.io.Serializable interface can be
written to streams.  The class of each serializable object is encoded
including the class name and signature of the class, the values of the
object's fields and arrays, and the closure of any other objects referenced
from the initial objects.

The method writeObject is used to write an object to the stream.  Any
object, including Strings and arrays, is written with writeObject. Multiple
objects or primitives can be written to the stream.  The objects must be
read back from the corresponding ObjectInputstream with the same types and
in the same order as they were written.

Primitive data types can also be written to the stream using the
appropriate methods from DataOutput. Strings can also be written using the
writeUTF method.

The default serialization mechanism for an object writes the class of the
object, the class signature, and the values of all non-transient and
non-static fields.  References to other objects (except in transient or
static fields) cause those objects to be written also. Multiple references
to a single object are encoded using a reference sharing mechanism so that
graphs of objects can be restored to the same shape as when the original was
written.

For example to write an object that can be read by the example in
`ObjectInputStream`:

Serializable classes that require special handling during the
serialization and deserialization process should implement methods
with the following signatures:

The method name, modifiers, return type, and number and type of
parameters must match exactly for the method to be used by
serialization or deserialization. The methods should only be
declared to throw checked exceptions consistent with these
signatures.

The writeObject method is responsible for writing the state of the object
for its particular class so that the corresponding readObject method can
restore it.  The method does not need to concern itself with the state
belonging to the object's superclasses or subclasses.  State is saved by
writing the individual fields to the ObjectOutputStream using the
writeObject method or by using the methods for primitive data types
supported by DataOutput.

Serialization does not write out the fields of any object that does not
implement the java.io.Serializable interface.  Subclasses of Objects that
are not serializable can be serializable. In this case the non-serializable
class must have a no-arg constructor to allow its fields to be initialized.
In this case it is the responsibility of the subclass to save and restore
the state of the non-serializable class. It is frequently the case that the
fields of that class are accessible (public, package, or protected) or that
there are get and set methods that can be used to restore the state.

Serialization of an object can be prevented by implementing writeObject
and readObject methods that throw the NotSerializableException.  The
exception will be caught by the ObjectOutputStream and abort the
serialization process.

Implementing the Externalizable interface allows the object to assume
complete control over the contents and format of the object's serialized
form.  The methods of the Externalizable interface, writeExternal and
readExternal, are called to save and restore the objects state.  When
implemented by a class they can write and read their own state using all of
the methods of ObjectOutput and ObjectInput.  It is the responsibility of
the objects to handle any versioning that occurs.

Enum constants are serialized differently than ordinary serializable or
externalizable objects.  The serialized form of an enum constant consists
solely of its name; field values of the constant are not transmitted.  To
serialize an enum constant, ObjectOutputStream writes the string returned by
the constant's name method.  Like other serializable or externalizable
objects, enum constants can function as the targets of back references
appearing subsequently in the serialization stream.  The process by which
enum constants are serialized cannot be customized; any class-specific
writeObject and writeReplace methods defined by enum types are ignored
during serialization.  Similarly, any serialPersistentFields or
serialVersionUID field declarations are also ignored--all enum types have a
fixed serialVersionUID of 0L.

Primitive data, excluding serializable fields and externalizable data, is
written to the ObjectOutputStream in block-data records. A block data record
is composed of a header and data. The block data header consists of a marker
and the number of bytes to follow the header.  Consecutive primitive data
writes are merged into one block-data record.  The blocking factor used for
a block-data record will be 1024 bytes.  Each block-data record will be
filled up to 1024 bytes, or be written whenever there is a termination of
block-data mode.  Calls to the ObjectOutputStream methods writeObject,
defaultWriteObject and writeFields initially terminate any existing
block-data record.

Records are serialized differently than ordinary serializable or externalizable
objects, see record serialization.

**See also:** java.io.DataOutput

**See also:** java.io.ObjectInputStream

**See also:** java.io.Serializable

**See also:** java.io.Externalizable

**See also:** *Java Object Serialization Specification,* Section 2, "Object Output Classes"

**Since:** 1.1

## ObjectOutputStream.ObjectOutputStream(OutputStream)

```java
public ObjectOutputStream(OutputStream out) throws IOException
```

Creates an ObjectOutputStream that writes to the specified OutputStream.
This constructor writes the serialization stream header to the
underlying stream; callers may wish to flush the stream immediately to
ensure that constructors for receiving ObjectInputStreams will not block
when reading the header.

Parameters:

- `out`: output stream to write to

**Since:** 1.4

**See also:** ObjectOutputStream#ObjectOutputStream()

**See also:** ObjectOutputStream#putFields()

**See also:** ObjectInputStream#ObjectInputStream(InputStream)

Throws:

- `IOException`: if an I/O error occurs while writing stream header
- `NullPointerException`: if `out` is `null`

## ObjectOutputStream.ObjectOutputStream()

```java
protected ObjectOutputStream() throws IOException
```

Provide a way for subclasses that are completely reimplementing
ObjectOutputStream to not have to allocate private data just used by
this implementation of ObjectOutputStream.

Throws:

- `IOException`: if an I/O error occurs while creating this stream

## ObjectOutputStream.useProtocolVersion(int)

```java
public void useProtocolVersion(int version) throws IOException
```

Specify stream protocol version to use when writing the stream.

This routine provides a hook to enable the current version of
Serialization to write in a format that is backwards compatible to a
previous version of the stream format.

Every effort will be made to avoid introducing additional
backwards incompatibilities; however, sometimes there is no
other alternative.

Parameters:

- `version`: use ProtocolVersion from java.io.ObjectStreamConstants.

**See also:** java.io.ObjectStreamConstants#PROTOCOL_VERSION_1

**See also:** java.io.ObjectStreamConstants#PROTOCOL_VERSION_2

**Since:** 1.2

Throws:

- `IllegalStateException`: if called after any objects have been serialized.
- `IllegalArgumentException`: if invalid version is passed in.
- `IOException`: if I/O errors occur

## ObjectOutputStream.writeObject(Object)

```java
public final void writeObject(Object obj) throws IOException
```

Write the specified object to the ObjectOutputStream.  The class of the
object, the signature of the class, and the values of the non-transient
and non-static fields of the class and all of its supertypes are
written.  Default serialization for a class can be overridden using the
writeObject and the readObject methods.  Objects referenced by this
object are written transitively so that a complete equivalent graph of
objects can be reconstructed by an ObjectInputStream.

Exceptions are thrown for problems with the OutputStream and for
classes that should not be serialized.  All exceptions are fatal to the
OutputStream, which is left in an indeterminate state, and it is up to
the caller to ignore or recover the stream state.

Throws:

- `InvalidClassException`: Something is wrong with a class used by serialization.
- `NotSerializableException`: Some object to be serialized does not implement the java.io.Serializable interface.
- `IOException`: Any exception thrown by the underlying OutputStream.

## ObjectOutputStream.writeObjectOverride(Object)

```java
protected void writeObjectOverride(Object obj) throws IOException
```

Method used by subclasses to override the default writeObject method.
This method is called by trusted subclasses of ObjectOutputStream that
constructed ObjectOutputStream using the protected no-arg constructor.
The subclass is expected to provide an override method with the modifier
"final".

Parameters:

- `obj`: object to be written to the underlying stream

**See also:** #ObjectOutputStream()

**See also:** #writeObject(Object)

**Since:** 1.2

Throws:

- `IOException`: if there are I/O errors while writing to the underlying stream

## ObjectOutputStream.writeUnshared(Object)

```java
public void writeUnshared(Object obj) throws IOException
```

Writes an "unshared" object to the ObjectOutputStream.  This method is
identical to writeObject, except that it always writes the given object
as a new, unique object in the stream (as opposed to a back-reference
pointing to a previously serialized instance).  Specifically:

- An object written via writeUnshared is always serialized in the
      same manner as a newly appearing object (an object that has not
      been written to the stream yet), regardless of whether or not the
      object has been written previously.

- If writeObject is used to write an object that has been previously
      written with writeUnshared, the previous writeUnshared operation
      is treated as if it were a write of a separate object.  In other
      words, ObjectOutputStream will never generate back-references to
      object data written by calls to writeUnshared.

While writing an object via writeUnshared does not in itself guarantee a
unique reference to the object when it is deserialized, it allows a
single object to be defined multiple times in a stream, so that multiple
calls to readUnshared by the receiver will not conflict.  Note that the
rules described above only apply to the base-level object written with
writeUnshared, and not to any transitively referenced sub-objects in the
object graph to be serialized.

Parameters:

- `obj`: object to write to stream

**Since:** 1.4

Throws:

- `NotSerializableException`: if an object in the graph to be serialized does not implement the Serializable interface
- `InvalidClassException`: if a problem exists with the class of an object to be serialized
- `IOException`: if an I/O error occurs during serialization

## ObjectOutputStream.defaultWriteObject()

```java
public void defaultWriteObject() throws IOException
```

Write the non-static and non-transient fields of the current class to
this stream.  This may only be called from the writeObject method of the
class being serialized. It will throw the NotActiveException if it is
called otherwise.

Throws:

- `IOException`: if I/O errors occur while writing to the underlying `OutputStream`

## ObjectOutputStream.putFields()

```java
public ObjectOutputStream.PutField putFields() throws IOException
```

Retrieve the object used to buffer persistent fields to be written to
the stream.  The fields will be written to the stream when writeFields
method is called.

**Returns:** an instance of the class Putfield that holds the serializable
         fields

**Since:** 1.2

Throws:

- `IOException`: if I/O errors occur

## ObjectOutputStream.writeFields()

```java
public void writeFields() throws IOException
```

Write the buffered fields to the stream.

**Since:** 1.2

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream
- `NotActiveException`: Called when a classes writeObject method was not called to write the state of the object.

## ObjectOutputStream.reset()

```java
public void reset() throws IOException
```

Reset will disregard the state of any objects already written to the
stream.  The state is reset to be the same as a new ObjectOutputStream.
The current point in the stream is marked as reset so the corresponding
ObjectInputStream will be reset at the same point.  Objects previously
written to the stream will not be referred to as already being in the
stream.  They will be written to the stream again.

Throws:

- `IOException`: if reset() is invoked while serializing an object.

## ObjectOutputStream.annotateClass(Class<?>)

```java
protected void annotateClass(Class<?> cl) throws IOException
```

Subclasses may implement this method to allow class data to be stored in
the stream. By default this method does nothing.  The corresponding
method in ObjectInputStream is resolveClass.  This method is called
exactly once for each unique class in the stream.  The class name and
signature will have already been written to the stream.  This method may
make free use of the ObjectOutputStream to save any representation of
the class it deems suitable (for example, the bytes of the class file).
The resolveClass method in the corresponding subclass of
ObjectInputStream must read and use any data or objects written by
annotateClass.

Parameters:

- `cl`: the class to annotate custom data for

Throws:

- `IOException`: Any exception thrown by the underlying OutputStream.
