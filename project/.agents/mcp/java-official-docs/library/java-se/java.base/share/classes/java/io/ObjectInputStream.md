---
title: "ObjectInputStream class (java.io) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectInputStream class (java.io)

```java
public class ObjectInputStream extends InputStream implements ObjectInput, ObjectStreamConstants
```

An ObjectInputStream deserializes primitive data and objects previously
written using an ObjectOutputStream.

**Warning: Deserialization of untrusted data is inherently dangerous
and should be avoided. Untrusted data should be carefully validated according to the
"Serialization and Deserialization" section of the
.
 describes best
practices for defensive use of serial filters.
**

The key to disabling deserialization attacks is to prevent instances of
arbitrary classes from being deserialized, thereby preventing the direct or
indirect execution of their methods.
`ObjectInputFilter` describes how to use filters and
`ObjectInputFilter.Config` describes how to configure the filter and filter factory.
Each stream has an optional deserialization filter
to check the classes and resource limits during deserialization.
The JVM-wide filter factory ensures that a filter can be set on every `ObjectInputStream`
and every object read from the stream can be checked.
The ObjectInputStream constructors invoke the filter factory
to select the initial filter which may be updated or replaced by `setObjectInputFilter`.

If an ObjectInputStream has a filter, the `ObjectInputFilter` can check that
the classes, array lengths, number of references in the stream, depth, and
number of bytes consumed from the input stream are allowed and
if not, can terminate deserialization.

ObjectOutputStream and ObjectInputStream can provide an application with
persistent storage for graphs of objects when used with a FileOutputStream
and FileInputStream respectively.  ObjectInputStream is used to recover
those objects previously serialized. Other uses include passing objects
between hosts using a socket stream or for marshaling and unmarshaling
arguments and parameters in a remote communication system.

ObjectInputStream ensures that the types of all objects in the graph
created from the stream match the classes present in the Java Virtual
Machine.  Classes are loaded as required using the standard mechanisms.

Only objects that support the java.io.Serializable or
java.io.Externalizable interface can be read from streams.

The method `readObject` is used to read an object from the
stream.  Java's safe casting should be used to get the desired type.  In
Java, strings and arrays are objects and are treated as objects during
serialization. When read they need to be cast to the expected type.

Primitive data types can be read from the stream using the appropriate
method on DataInput.

The default deserialization mechanism for objects restores the contents
of each field to the value and type it had when it was written.  Fields
declared as transient or static are ignored by the deserialization process.
References to other objects cause those objects to be read from the stream
as necessary.  Graphs of objects are restored correctly using a reference
sharing mechanism.  New objects are always allocated when deserializing,
which prevents existing objects from being overwritten.

Reading an object is analogous to running the constructors of a new
object.  Memory is allocated for the object and initialized to zero (NULL).
No-arg constructors are invoked for the non-serializable classes and then
the fields of the serializable classes are restored from the stream starting
with the serializable class closest to java.lang.object and finishing with
the object's most specific class.

For example to read from a stream as written by the example in
`ObjectOutputStream`:

Classes control how they are serialized by implementing either the
java.io.Serializable or java.io.Externalizable interfaces.

Implementing the Serializable interface allows object serialization to
save and restore the entire state of the object and it allows classes to
evolve between the time the stream is written and the time it is read.  It
automatically traverses references between objects, saving and restoring
entire graphs.

Serializable classes that require special handling during the
serialization and deserialization process should implement methods
with the following signatures:

The method name, modifiers, return type, and number and type of
parameters must match exactly for the method to be used by
serialization or deserialization. The methods should only be
declared to throw checked exceptions consistent with these
signatures.

The readObject method is responsible for reading and restoring the state
of the object for its particular class using data written to the stream by
the corresponding writeObject method.  The method does not need to concern
itself with the state belonging to its superclasses or subclasses.  State is
restored by reading data from the ObjectInputStream for the individual
fields and making assignments to the appropriate fields of the object.
Reading primitive data types is supported by DataInput.

Any attempt to read object data which exceeds the boundaries of the
custom data written by the corresponding writeObject method will cause an
OptionalDataException to be thrown with an eof field value of true.
Non-object reads which exceed the end of the allotted data will reflect the
end of data in the same way that they would indicate the end of the stream:
bytewise reads will return -1 as the byte read or number of bytes read, and
primitive reads will throw EOFExceptions.  If there is no corresponding
writeObject method, then the end of default serialized data marks the end of
the allotted data.

Primitive and object read calls issued from within a readExternal method
behave in the same manner--if the stream is already positioned at the end of
data written by the corresponding writeExternal method, object reads will
throw OptionalDataExceptions with eof set to true, bytewise reads will
return -1, and primitive reads will throw EOFExceptions.  Note that this
behavior does not hold for streams written with the old
`ObjectStreamConstants.PROTOCOL_VERSION_1` protocol, in which the
end of data written by writeExternal methods is not demarcated, and hence
cannot be detected.

The readObjectNoData method is responsible for initializing the state of
the object for its particular class in the event that the serialization
stream does not list the given class as a superclass of the object being
deserialized.  This may occur in cases where the receiving party uses a
different version of the deserialized instance's class than the sending
party, and the receiver's version extends classes that are not extended by
the sender's version.  This may also occur if the serialization stream has
been tampered; hence, readObjectNoData is useful for initializing
deserialized objects properly despite a "hostile" or incomplete source
stream.

Serialization does not read or assign values to the fields of any object
that does not implement the java.io.Serializable interface.  Subclasses of
Objects that are not serializable can be serializable. In this case the
non-serializable class must have a no-arg constructor to allow its fields to
be initialized.  In this case it is the responsibility of the subclass to
save and restore the state of the non-serializable class. It is frequently
the case that the fields of that class are accessible (public, package, or
protected) or that there are get and set methods that can be used to restore
the state.

Any exception that occurs while deserializing an object will be caught by
the ObjectInputStream and abort the reading process.

Implementing the Externalizable interface allows the object to assume
complete control over the contents and format of the object's serialized
form.  The methods of the Externalizable interface, writeExternal and
readExternal, are called to save and restore the objects state.  When
implemented by a class they can write and read their own state using all of
the methods of ObjectOutput and ObjectInput.  It is the responsibility of
the objects to handle any versioning that occurs.

Enum constants are deserialized differently than ordinary serializable or
externalizable objects.  The serialized form of an enum constant consists
solely of its name; field values of the constant are not transmitted.  To
deserialize an enum constant, ObjectInputStream reads the constant name from
the stream; the deserialized constant is then obtained by calling the static
method `Enum.valueOf(Class, String)` with the enum constant's
base type and the received constant name as arguments.  Like other
serializable or externalizable objects, enum constants can function as the
targets of back references appearing subsequently in the serialization
stream.  The process by which enum constants are deserialized cannot be
customized: any class-specific readObject, readObjectNoData, and readResolve
methods defined by enum types are ignored during deserialization.
Similarly, any serialPersistentFields or serialVersionUID field declarations
are also ignored--all enum types have a fixed serialVersionUID of 0L.

Records are serialized differently than ordinary serializable or externalizable
objects. During deserialization the record's canonical constructor is invoked
to construct the record object. Certain serialization-related methods, such
as readObject and writeObject, are ignored for serializable records. See

*Java Object Serialization Specification,* Section 1.13,
"Serialization of Records" for additional information.

**See also:** java.io.DataInput

**See also:** java.io.ObjectOutputStream

**See also:** java.io.Serializable

**See also:** *Java Object Serialization Specification,* Section 3, "Object Input Classes"

**Since:** 1.1

## ObjectInputStream.ObjectInputStream(InputStream)

```java
public ObjectInputStream(InputStream in) throws IOException
```

Creates an ObjectInputStream that reads from the specified InputStream.
A serialization stream header is read from the stream and verified.
This constructor will block until the corresponding ObjectOutputStream
has written and flushed the header.

The constructor initializes the deserialization filter to the filter returned
by invoking the serial filter factory returned from `Config.getSerialFilterFactory()`
with `null` for the current filter
and the static JVM-wide filter for the requested filter.
If the serial filter or serial filter factory properties are invalid
an `IllegalStateException` is thrown.
When the filter factory `apply` method is invoked it may throw a runtime exception
preventing the `ObjectInputStream` from being constructed.

Parameters:

- `in`: input stream to read from

**See also:** ObjectInputStream#ObjectInputStream()

**See also:** ObjectInputStream#readFields()

**See also:** ObjectOutputStream#ObjectOutputStream(OutputStream)

Throws:

- `StreamCorruptedException`: if the stream header is incorrect
- `IOException`: if an I/O error occurs while reading stream header
- `IllegalStateException`: if the initialization of `ObjectInputFilter.Config` fails due to invalid serial filter or serial filter factory properties.
- `NullPointerException`: if `in` is `null`

## ObjectInputStream.ObjectInputStream()

```java
protected ObjectInputStream() throws IOException
```

Provide a way for subclasses that are completely reimplementing
ObjectInputStream to not have to allocate private data just used by this
implementation of ObjectInputStream.

The constructor initializes the deserialization filter to the filter returned
by invoking the serial filter factory returned from `Config.getSerialFilterFactory()`
with `null` for the current filter
and the static JVM-wide filter for the requested filter.
If the serial filter or serial filter factory properties are invalid
an `IllegalStateException` is thrown.
When the filter factory `apply` method is invoked it may throw a runtime exception
preventing the `ObjectInputStream` from being constructed.

Throws:

- `IOException`: if an I/O error occurs while creating this stream
- `IllegalStateException`: if the initialization of `ObjectInputFilter.Config` fails due to invalid serial filter or serial filter factory properties.

## ObjectInputStream.readObject()

```java
public final Object readObject() throws IOException, ClassNotFoundException
```

Read an object from the ObjectInputStream.  The class of the object, the
signature of the class, and the values of the non-transient and
non-static fields of the class and all of its supertypes are read.
Default deserializing for a class can be overridden using the writeObject
and readObject methods.  Objects referenced by this object are read
transitively so that a complete equivalent graph of objects is
reconstructed by readObject.

The root object is completely restored when all of its fields and the
objects it references are completely restored.  At this point the object
validation callbacks are executed in order based on their registered
priorities. The callbacks are registered by objects (in the readObject
special methods) as they are individually restored.

The deserialization filter, when not `null`, is invoked for
each object (regular or class) read to reconstruct the root object.
See setObjectInputFilter for details.

Exceptions are thrown for problems with the InputStream and for
classes that should not be deserialized.  All exceptions are fatal to
the InputStream and leave it in an indeterminate state; it is up to the
caller to ignore or recover the stream state.

Throws:

- `ClassNotFoundException`: Class of a serialized object cannot be found.
- `InvalidClassException`: Something is wrong with a class used by deserialization.
- `StreamCorruptedException`: Control information in the stream is inconsistent.
- `OptionalDataException`: Primitive data was found in the stream instead of objects.
- `IOException`: Any of the usual Input/Output related exceptions.

## ObjectInputStream.readObjectOverride()

```java
protected Object readObjectOverride() throws IOException, ClassNotFoundException
```

This method is called by trusted subclasses of ObjectInputStream that
constructed ObjectInputStream using the protected no-arg constructor.
The subclass is expected to provide an override method with the modifier
"final".

**Returns:** the Object read from the stream.

**See also:** #ObjectInputStream()

**See also:** #readObject()

**Since:** 1.2

Throws:

- `ClassNotFoundException`: Class definition of a serialized object cannot be found.
- `OptionalDataException`: Primitive data was found in the stream instead of objects.
- `IOException`: if I/O errors occurred while reading from the underlying stream
