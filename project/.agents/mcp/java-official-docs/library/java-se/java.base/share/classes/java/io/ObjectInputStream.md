# ObjectInputStream class (java.io)

```java
public class ObjectInputStream extends InputStream implements ObjectInput, ObjectStreamConstants
```

An ObjectInputStream deserializes primitive data and objects previously
written using an ObjectOutputStream.

<p><strong>Warning: Deserialization of untrusted data is inherently dangerous
and should be avoided. Untrusted data should be carefully validated according to the
"Serialization and Deserialization" section of the
{@extLink secure_coding_guidelines_javase Secure Coding Guidelines for Java SE}.
{@extLink serialization_filter_guide Serialization Filtering} describes best
practices for defensive use of serial filters.
</strong></p>

<p>The key to disabling deserialization attacks is to prevent instances of
arbitrary classes from being deserialized, thereby preventing the direct or
indirect execution of their methods.
{@link ObjectInputFilter} describes how to use filters and
{@link ObjectInputFilter.Config} describes how to configure the filter and filter factory.
Each stream has an optional deserialization filter
to check the classes and resource limits during deserialization.
The JVM-wide filter factory ensures that a filter can be set on every {@link ObjectInputStream}
and every object read from the stream can be checked.
The {@linkplain #ObjectInputStream() ObjectInputStream constructors} invoke the filter factory
to select the initial filter which may be updated or replaced by {@link #setObjectInputFilter}.
<p>
If an ObjectInputStream has a filter, the {@link ObjectInputFilter} can check that
the classes, array lengths, number of references in the stream, depth, and
number of bytes consumed from the input stream are allowed and
if not, can terminate deserialization.

<p>ObjectOutputStream and ObjectInputStream can provide an application with
persistent storage for graphs of objects when used with a FileOutputStream
and FileInputStream respectively.  ObjectInputStream is used to recover
those objects previously serialized. Other uses include passing objects
between hosts using a socket stream or for marshaling and unmarshaling
arguments and parameters in a remote communication system.

<p>ObjectInputStream ensures that the types of all objects in the graph
created from the stream match the classes present in the Java Virtual
Machine.  Classes are loaded as required using the standard mechanisms.

<p>Only objects that support the java.io.Serializable or
java.io.Externalizable interface can be read from streams.

<p>The method {@code readObject} is used to read an object from the
stream.  Java's safe casting should be used to get the desired type.  In
Java, strings and arrays are objects and are treated as objects during
serialization. When read they need to be cast to the expected type.

<p>Primitive data types can be read from the stream using the appropriate
method on DataInput.

<p>The default deserialization mechanism for objects restores the contents
of each field to the value and type it had when it was written.  Fields
declared as transient or static are ignored by the deserialization process.
References to other objects cause those objects to be read from the stream
as necessary.  Graphs of objects are restored correctly using a reference
sharing mechanism.  New objects are always allocated when deserializing,
which prevents existing objects from being overwritten.

<p>Reading an object is analogous to running the constructors of a new
object.  Memory is allocated for the object and initialized to zero (NULL).
No-arg constructors are invoked for the non-serializable classes and then
the fields of the serializable classes are restored from the stream starting
with the serializable class closest to java.lang.object and finishing with
the object's most specific class.

<p>For example to read from a stream as written by the example in
{@link ObjectOutputStream}:
<br>
{@snippet lang="java" :
    try (FileInputStream fis = new FileInputStream("t.tmp");
         ObjectInputStream ois = new ObjectInputStream(fis)) {
        String label = (String) ois.readObject();
        LocalDateTime dateTime = (LocalDateTime) ois.readObject();
        // Use label and dateTime
    } catch (Exception ex) {
        // handle exception
    }
}

<p>Classes control how they are serialized by implementing either the
java.io.Serializable or java.io.Externalizable interfaces.

<p>Implementing the Serializable interface allows object serialization to
save and restore the entire state of the object and it allows classes to
evolve between the time the stream is written and the time it is read.  It
automatically traverses references between objects, saving and restoring
entire graphs.

<p>Serializable classes that require special handling during the
serialization and deserialization process should implement methods
with the following signatures:

{@snippet lang="java":
    private void writeObject(java.io.ObjectOutputStream stream)
        throws IOException;
    private void readObject(java.io.ObjectInputStream stream)
        throws IOException, ClassNotFoundException;
    private void readObjectNoData()
        throws ObjectStreamException;
}

<p>The method name, modifiers, return type, and number and type of
parameters must match exactly for the method to be used by
serialization or deserialization. The methods should only be
declared to throw checked exceptions consistent with these
signatures.

<p>The readObject method is responsible for reading and restoring the state
of the object for its particular class using data written to the stream by
the corresponding writeObject method.  The method does not need to concern
itself with the state belonging to its superclasses or subclasses.  State is
restored by reading data from the ObjectInputStream for the individual
fields and making assignments to the appropriate fields of the object.
Reading primitive data types is supported by DataInput.

<p>Any attempt to read object data which exceeds the boundaries of the
custom data written by the corresponding writeObject method will cause an
OptionalDataException to be thrown with an eof field value of true.
Non-object reads which exceed the end of the allotted data will reflect the
end of data in the same way that they would indicate the end of the stream:
bytewise reads will return -1 as the byte read or number of bytes read, and
primitive reads will throw EOFExceptions.  If there is no corresponding
writeObject method, then the end of default serialized data marks the end of
the allotted data.

<p>Primitive and object read calls issued from within a readExternal method
behave in the same manner--if the stream is already positioned at the end of
data written by the corresponding writeExternal method, object reads will
throw OptionalDataExceptions with eof set to true, bytewise reads will
return -1, and primitive reads will throw EOFExceptions.  Note that this
behavior does not hold for streams written with the old
{@code ObjectStreamConstants.PROTOCOL_VERSION_1} protocol, in which the
end of data written by writeExternal methods is not demarcated, and hence
cannot be detected.

<p>The readObjectNoData method is responsible for initializing the state of
the object for its particular class in the event that the serialization
stream does not list the given class as a superclass of the object being
deserialized.  This may occur in cases where the receiving party uses a
different version of the deserialized instance's class than the sending
party, and the receiver's version extends classes that are not extended by
the sender's version.  This may also occur if the serialization stream has
been tampered; hence, readObjectNoData is useful for initializing
deserialized objects properly despite a "hostile" or incomplete source
stream.

<p>Serialization does not read or assign values to the fields of any object
that does not implement the java.io.Serializable interface.  Subclasses of
Objects that are not serializable can be serializable. In this case the
non-serializable class must have a no-arg constructor to allow its fields to
be initialized.  In this case it is the responsibility of the subclass to
save and restore the state of the non-serializable class. It is frequently
the case that the fields of that class are accessible (public, package, or
protected) or that there are get and set methods that can be used to restore
the state.

<p>Any exception that occurs while deserializing an object will be caught by
the ObjectInputStream and abort the reading process.

<p>Implementing the Externalizable interface allows the object to assume
complete control over the contents and format of the object's serialized
form.  The methods of the Externalizable interface, writeExternal and
readExternal, are called to save and restore the objects state.  When
implemented by a class they can write and read their own state using all of
the methods of ObjectOutput and ObjectInput.  It is the responsibility of
the objects to handle any versioning that occurs.

<p>Enum constants are deserialized differently than ordinary serializable or
externalizable objects.  The serialized form of an enum constant consists
solely of its name; field values of the constant are not transmitted.  To
deserialize an enum constant, ObjectInputStream reads the constant name from
the stream; the deserialized constant is then obtained by calling the static
method {@code Enum.valueOf(Class, String)} with the enum constant's
base type and the received constant name as arguments.  Like other
serializable or externalizable objects, enum constants can function as the
targets of back references appearing subsequently in the serialization
stream.  The process by which enum constants are deserialized cannot be
customized: any class-specific readObject, readObjectNoData, and readResolve
methods defined by enum types are ignored during deserialization.
Similarly, any serialPersistentFields or serialVersionUID field declarations
are also ignored--all enum types have a fixed serialVersionUID of 0L.

<a id="record-serialization"></a>
<p>Records are serialized differently than ordinary serializable or externalizable
objects. During deserialization the record's canonical constructor is invoked
to construct the record object. Certain serialization-related methods, such
as readObject and writeObject, are ignored for serializable records. See
<a href="{@docRoot}/../specs/serialization/serial-arch.html#serialization-of-records">
<cite>Java Object Serialization Specification,</cite> Section 1.13,
"Serialization of Records"</a> for additional information.

@spec serialization/index.html Java Object Serialization Specification
@author      Mike Warres
@author      Roger Riggs
@see java.io.DataInput
@see java.io.ObjectOutputStream
@see java.io.Serializable
@see <a href="{@docRoot}/../specs/serialization/input.html">
     <cite>Java Object Serialization Specification,</cite> Section 3, "Object Input Classes"</a>
@since   1.1

## ObjectInputStream.ObjectInputStream(InputStream)

```java
public ObjectInputStream(InputStream in) throws IOException
```

Creates an ObjectInputStream that reads from the specified InputStream.
A serialization stream header is read from the stream and verified.
This constructor will block until the corresponding ObjectOutputStream
has written and flushed the header.

<p>The constructor initializes the deserialization filter to the filter returned
by invoking the serial filter factory returned from {@link Config#getSerialFilterFactory()}
with {@code null} for the current filter
and the {@linkplain Config#getSerialFilter() static JVM-wide filter} for the requested filter.
If the serial filter or serial filter factory properties are invalid
an {@link IllegalStateException} is thrown.
When the filter factory {@code apply} method is invoked it may throw a runtime exception
preventing the {@code ObjectInputStream} from being constructed.

@param   in input stream to read from
@throws  StreamCorruptedException if the stream header is incorrect
@throws  IOException if an I/O error occurs while reading stream header
@throws  IllegalStateException if the initialization of {@link ObjectInputFilter.Config}
         fails due to invalid serial filter or serial filter factory properties.
@throws  NullPointerException if {@code in} is {@code null}
@see     ObjectInputStream#ObjectInputStream()
@see     ObjectInputStream#readFields()
@see     ObjectOutputStream#ObjectOutputStream(OutputStream)

## ObjectInputStream.ObjectInputStream()

```java
protected ObjectInputStream() throws IOException
```

Provide a way for subclasses that are completely reimplementing
ObjectInputStream to not have to allocate private data just used by this
implementation of ObjectInputStream.

<p>The constructor initializes the deserialization filter to the filter returned
by invoking the serial filter factory returned from {@link Config#getSerialFilterFactory()}
with {@code null} for the current filter
and the {@linkplain Config#getSerialFilter() static JVM-wide filter} for the requested filter.
If the serial filter or serial filter factory properties are invalid
an {@link IllegalStateException} is thrown.
When the filter factory {@code apply} method is invoked it may throw a runtime exception
preventing the {@code ObjectInputStream} from being constructed.

@throws  IOException if an I/O error occurs while creating this stream
@throws  IllegalStateException if the initialization of {@link ObjectInputFilter.Config}
     fails due to invalid serial filter or serial filter factory properties.

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

<p>The root object is completely restored when all of its fields and the
objects it references are completely restored.  At this point the object
validation callbacks are executed in order based on their registered
priorities. The callbacks are registered by objects (in the readObject
special methods) as they are individually restored.

<p>The deserialization filter, when not {@code null}, is invoked for
each object (regular or class) read to reconstruct the root object.
See {@link #setObjectInputFilter(ObjectInputFilter) setObjectInputFilter} for details.

<p>Exceptions are thrown for problems with the InputStream and for
classes that should not be deserialized.  All exceptions are fatal to
the InputStream and leave it in an indeterminate state; it is up to the
caller to ignore or recover the stream state.

@throws  ClassNotFoundException Class of a serialized object cannot be
         found.
@throws  InvalidClassException Something is wrong with a class used by
         deserialization.
@throws  StreamCorruptedException Control information in the
         stream is inconsistent.
@throws  OptionalDataException Primitive data was found in the
         stream instead of objects.
@throws  IOException Any of the usual Input/Output related exceptions.

## ObjectInputStream.readObjectOverride()

```java
protected Object readObjectOverride() throws IOException, ClassNotFoundException
```

This method is called by trusted subclasses of ObjectInputStream that
constructed ObjectInputStream using the protected no-arg constructor.
The subclass is expected to provide an override method with the modifier
"final".

@return  the Object read from the stream.
@throws  ClassNotFoundException Class definition of a serialized object
         cannot be found.
@throws  OptionalDataException Primitive data was found in the stream
         instead of objects.
@throws  IOException if I/O errors occurred while reading from the
         underlying stream
@see #ObjectInputStream()
@see #readObject()
@since 1.2

## ObjectInputStream.readUnshared()

```java
public Object readUnshared() throws IOException, ClassNotFoundException
```

Reads an "unshared" object from the ObjectInputStream.  This method is
identical to readObject, except that it prevents subsequent calls to
readObject and readUnshared from returning additional references to the
deserialized instance obtained via this call.  Specifically:
<ul>
  <li>If readUnshared is called to deserialize a back-reference (the
      stream representation of an object which has been written
      previously to the stream), an ObjectStreamException will be
      thrown.

  <li>If readUnshared returns successfully, then any subsequent attempts
      to deserialize back-references to the stream handle deserialized
      by readUnshared will cause an ObjectStreamException to be thrown.
</ul>
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

<p>The deserialization filter, when not {@code null}, is invoked for
each object (regular or class) read to reconstruct the root object.
See {@link #setObjectInputFilter(ObjectInputFilter) setObjectInputFilter} for details.

@return  reference to deserialized object
@throws  ClassNotFoundException if class of an object to deserialize
         cannot be found
@throws  StreamCorruptedException if control information in the stream
         is inconsistent
@throws  ObjectStreamException if object to deserialize has already
         appeared in stream
@throws  OptionalDataException if primitive data is next in stream
@throws  IOException if an I/O error occurs during deserialization
@since   1.4

## ObjectInputStream.defaultReadObject()

```java
public void defaultReadObject() throws IOException, ClassNotFoundException
```

Read the non-static and non-transient fields of the current class from
this stream.  This may only be called from the readObject method of the
class being deserialized. It will throw the NotActiveException if it is
called otherwise.

@throws  ClassNotFoundException if the class of a serialized object
         could not be found.
@throws  IOException if an I/O error occurs.
@throws  NotActiveException if the stream is not currently reading
         objects.

## ObjectInputStream.readFields()

```java
public ObjectInputStream.GetField readFields() throws IOException, ClassNotFoundException
```

Reads the persistent fields from the stream and makes them available by
name.

@return  the {@code GetField} object representing the persistent
         fields of the object being deserialized
@throws  ClassNotFoundException if the class of a serialized object
         could not be found.
@throws  IOException if an I/O error occurs.
@throws  NotActiveException if the stream is not currently reading
         objects.
@since 1.2

## ObjectInputStream.registerValidation(ObjectInputValidation, int)

```java
public void registerValidation(ObjectInputValidation obj, int prio) throws NotActiveException, InvalidObjectException
```

Register an object to be validated before the graph is returned.  While
similar to resolveObject these validations are called after the entire
graph has been reconstituted.  Typically, a readObject method will
register the object with the stream so that when all of the objects are
restored a final set of validations can be performed.

@param   obj the object to receive the validation callback.
@param   prio controls the order of callbacks; zero is a good default.
         Use higher numbers to be called back earlier, lower numbers for
         later callbacks. Within a priority, callbacks are processed in
         no particular order.
@throws  NotActiveException The stream is not currently reading objects
         so it is invalid to register a callback.
@throws  InvalidObjectException The validation object is null.

## ObjectInputStream.resolveClass(ObjectStreamClass)

```java
protected Class<?> resolveClass(ObjectStreamClass desc) throws IOException, ClassNotFoundException
```

Load the local class equivalent of the specified stream class
description.  Subclasses may implement this method to allow classes to
be fetched from an alternate source.

<p>The corresponding method in {@code ObjectOutputStream} is
{@code annotateClass}.  This method will be invoked only once for
each unique class in the stream.  This method can be implemented by
subclasses to use an alternate loading mechanism but must return a
{@code Class} object. Once returned, if the class is not an array
class, its serialVersionUID is compared to the serialVersionUID of the
serialized class, and if there is a mismatch, the deserialization fails
and an {@link InvalidClassException} is thrown.

<p>The default implementation of this method in
{@code ObjectInputStream} returns the result of calling
{@snippet lang="java":
    Class.forName(desc.getName(), false, loader)
}
where {@code loader} is the first class loader on the current
thread's stack (starting from the currently executing method) that is
neither the {@linkplain ClassLoader#getPlatformClassLoader() platform
class loader} nor its ancestor; otherwise, {@code loader} is the
<em>platform class loader</em>. If this call results in a
{@code ClassNotFoundException} and the name of the passed
{@code ObjectStreamClass} instance is the Java language keyword
for a primitive type or void, then the {@code Class} object
representing that primitive type or void will be returned
(e.g., an {@code ObjectStreamClass} with the name
{@code "int"} will be resolved to {@code Integer.TYPE}).
Otherwise, the {@code ClassNotFoundException} will be thrown to
the caller of this method.

@param   desc an instance of class {@code ObjectStreamClass}
@return  a {@code Class} object corresponding to {@code desc}
@throws  IOException any of the usual Input/Output exceptions.
@throws  ClassNotFoundException if class of a serialized object cannot
         be found.

## ObjectInputStream.resolveProxyClass(String[])

```java
protected Class<?> resolveProxyClass(String[] interfaces) throws IOException, ClassNotFoundException
```

Returns a proxy class that implements the interfaces named in a proxy
class descriptor; subclasses may implement this method to read custom
data from the stream along with the descriptors for dynamic proxy
classes, allowing them to use an alternate loading mechanism for the
interfaces and the proxy class.

<p>This method is called exactly once for each unique proxy class
descriptor in the stream.

<p>The corresponding method in {@code ObjectOutputStream} is
{@code annotateProxyClass}.  For a given subclass of
{@code ObjectInputStream} that overrides this method, the
{@code annotateProxyClass} method in the corresponding subclass of
{@code ObjectOutputStream} must write any data or objects read by
this method.

<p>The default implementation of this method in
{@code ObjectInputStream} returns the result of calling
{@code Proxy.getProxyClass} with the list of {@code Class}
objects for the interfaces that are named in the {@code interfaces}
parameter.  The {@code Class} object for each interface name
{@code i} is the value returned by calling
{@snippet lang="java":
    Class.forName(i, false, loader)
}
where {@code loader} is the first class loader on the current
thread's stack (starting from the currently executing method) that is
neither the {@linkplain ClassLoader#getPlatformClassLoader() platform
class loader} nor its ancestor; otherwise, {@code loader} is the
<em>platform class loader</em>.
Unless any of the resolved interfaces are non-public, this same value
of {@code loader} is also the class loader passed to
{@code Proxy.getProxyClass}; if non-public interfaces are present,
their class loader is passed instead (if more than one non-public
interface class loader is encountered, an
{@code IllegalAccessError} is thrown).
If {@code Proxy.getProxyClass} throws an
{@code IllegalArgumentException}, {@code resolveProxyClass}
will throw a {@code ClassNotFoundException} containing the
{@code IllegalArgumentException}.

@param interfaces the list of interface names that were
               deserialized in the proxy class descriptor
@return  a proxy class for the specified interfaces
@throws        IOException any exception thrown by the underlying
               {@code InputStream}
@throws        ClassNotFoundException if the proxy class or any of the
               named interfaces could not be found
@see ObjectOutputStream#annotateProxyClass(Class)
@since 1.3

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

<p>This method is called after an object has been read but before it is
returned from readObject.  The default resolveObject method just returns
the same object.

<p>When a subclass is replacing objects it must ensure that the
substituted object is compatible with every field where the reference
will be stored.  Objects whose type is not a subclass of the type of the
field or array element abort the deserialization by raising an exception
and the object is not be stored.

<p>This method is called only once when each object is first
encountered.  All subsequent references to the object will be redirected
to the new object.

@param   obj object to be substituted
@return  the substituted object
@throws  IOException Any of the usual Input/Output exceptions.

## ObjectInputStream.enableResolveObject(boolean)

```java
protected boolean enableResolveObject(boolean enable)
```

Enables the stream to do replacement of objects read from the stream. When
enabled, the {@link #resolveObject} method is called for every object being
deserialized.

@param   enable true for enabling use of {@code resolveObject} for
         every object being deserialized
@return  the previous setting before this method was invoked

## ObjectInputStream.readStreamHeader()

```java
protected void readStreamHeader() throws IOException, StreamCorruptedException
```

The readStreamHeader method is provided to allow subclasses to read and
verify their own stream headers. It reads and verifies the magic number
and version number.

@throws  IOException if there are I/O errors while reading from the
         underlying {@code InputStream}
@throws  StreamCorruptedException if control information in the stream
         is inconsistent

## ObjectInputStream.readClassDescriptor()

```java
protected ObjectStreamClass readClassDescriptor() throws IOException, ClassNotFoundException
```

Read a class descriptor from the serialization stream.  This method is
called when the ObjectInputStream expects a class descriptor as the next
item in the serialization stream.  Subclasses of ObjectInputStream may
override this method to read in class descriptors that have been written
in non-standard formats (by subclasses of ObjectOutputStream which have
overridden the {@code writeClassDescriptor} method).  By default,
this method reads class descriptors according to the format defined in
the Object Serialization specification.

@return  the class descriptor read
@throws  IOException If an I/O error has occurred.
@throws  ClassNotFoundException If the Class of a serialized object used
         in the class descriptor representation cannot be found
@see java.io.ObjectOutputStream#writeClassDescriptor(java.io.ObjectStreamClass)
@since 1.3

## ObjectInputStream.read()

```java
public int read() throws IOException
```

Reads a byte of data. This method will block if no input is available.

@return  the byte read, or -1 if the end of the stream is reached.
@throws  IOException {@inheritDoc}

## ObjectInputStream.read(byte[], int, int)

```java
public int read(byte[] buf, int off, int len) throws IOException
```

Reads into an array of bytes.  This method will block until some input
is available. Consider using java.io.DataInputStream.readFully to read
exactly 'length' bytes.

@param   buf the buffer into which the data is read
@param   off the start offset in the destination array {@code buf}
@param   len the maximum number of bytes read
@return  the total number of bytes read into the buffer, or
         {@code -1} if there is no more data because the end of
         the stream has been reached.
@throws  NullPointerException if {@code buf} is {@code null}.
@throws  IndexOutOfBoundsException if {@code off} is negative,
         {@code len} is negative, or {@code len} is greater than
         {@code buf.length - off}.
@throws  IOException If an I/O error has occurred.
@see java.io.DataInputStream#readFully(byte[],int,int)

## ObjectInputStream.available()

```java
public int available() throws IOException
```

Returns the number of bytes that can be read without blocking.

@return  the number of available bytes.
@throws  IOException if there are I/O errors while reading from the
         underlying {@code InputStream}

## ObjectInputStream.close()

```java
public void close() throws IOException
```

{@inheritDoc}

@throws  IOException {@inheritDoc}

## ObjectInputStream.readBoolean()

```java
public boolean readBoolean() throws IOException
```

Reads in a boolean.

@return  the boolean read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readByte()

```java
public byte readByte() throws IOException
```

Reads an 8-bit byte.

@return  the 8-bit byte read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readUnsignedByte()

```java
public int readUnsignedByte() throws IOException
```

Reads an unsigned 8-bit byte.

@return  the 8-bit byte read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readChar()

```java
public char readChar() throws IOException
```

Reads a 16-bit char.

@return  the 16-bit char read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readShort()

```java
public short readShort() throws IOException
```

Reads a 16-bit short.

@return  the 16-bit short read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readUnsignedShort()

```java
public int readUnsignedShort() throws IOException
```

Reads an unsigned 16-bit short.

@return  the 16-bit short read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readInt()

```java
public int readInt() throws IOException
```

Reads a 32-bit int.

@return  the 32-bit integer read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readLong()

```java
public long readLong() throws IOException
```

Reads a 64-bit long.

@return  the read 64-bit long.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readFloat()

```java
public float readFloat() throws IOException
```

Reads a 32-bit float.

@return  the 32-bit float read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readDouble()

```java
public double readDouble() throws IOException
```

Reads a 64-bit double.

@return  the 64-bit double read.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readFully(byte[])

```java
public void readFully(byte[] buf) throws IOException
```

Reads bytes, blocking until all bytes are read.

@param   buf the buffer into which the data is read
@throws  NullPointerException If {@code buf} is {@code null}.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.readFully(byte[], int, int)

```java
public void readFully(byte[] buf, int off, int len) throws IOException
```

Reads bytes, blocking until all bytes are read.

@param   buf the buffer into which the data is read
@param   off the start offset into the data array {@code buf}
@param   len the maximum number of bytes to read
@throws  NullPointerException If {@code buf} is {@code null}.
@throws  IndexOutOfBoundsException If {@code off} is negative,
         {@code len} is negative, or {@code len} is greater than
         {@code buf.length - off}.
@throws  EOFException If end of file is reached.
@throws  IOException If other I/O error has occurred.

## ObjectInputStream.skipBytes(int)

```java
public int skipBytes(int len) throws IOException
```

Skips bytes.

@param   len the number of bytes to be skipped
@return  the actual number of bytes skipped.
@throws  IOException If an I/O error has occurred.

## ObjectInputStream.readLine()

```java
public String readLine() throws IOException
```

Reads in a line that has been terminated by a \n, \r, \r\n or EOF.

@return  a String copy of the line.
@throws  IOException if there are I/O errors while reading from the
         underlying {@code InputStream}
@deprecated This method does not properly convert bytes to characters.
         see DataInputStream for the details and alternatives.

## ObjectInputStream.readUTF()

```java
public String readUTF() throws IOException
```

Reads a String in
<a href="DataInput.html#modified-utf-8">modified UTF-8</a>
format.

@return  the String.
@throws  IOException if there are I/O errors while reading from the
         underlying {@code InputStream}
@throws  UTFDataFormatException if read bytes do not represent a valid
         modified UTF-8 encoding of a string

## ObjectInputStream.getObjectInputFilter()

```java
public final ObjectInputFilter getObjectInputFilter()
```

Returns the deserialization filter for this stream.
The filter is the result of invoking the
{@link Config#getSerialFilterFactory() JVM-wide filter factory}
either by the {@linkplain #ObjectInputStream() constructor} or the most recent invocation of
{@link #setObjectInputFilter setObjectInputFilter}.

@return the deserialization filter for the stream; may be null
@since 9

## ObjectInputStream.setObjectInputFilter(ObjectInputFilter)

```java
public final void setObjectInputFilter(ObjectInputFilter filter)
```

Set the deserialization filter for the stream.

The deserialization filter is set to the filter returned by invoking the
{@linkplain Config#getSerialFilterFactory() JVM-wide filter factory}
with the {@linkplain #getObjectInputFilter() current filter} and the {@code filter} parameter.
The current filter was set in the
{@linkplain #ObjectInputStream() ObjectInputStream constructors} by invoking the
{@linkplain Config#getSerialFilterFactory() JVM-wide filter factory} and may be {@code null}.
{@linkplain #setObjectInputFilter(ObjectInputFilter)} This method} can be called
once and only once before reading any objects from the stream;
for example, by calling {@link #readObject} or {@link #readUnshared}.

<p>It is not permitted to replace a {@code non-null} filter with a {@code null} filter.
If the {@linkplain #getObjectInputFilter() current filter} is {@code non-null},
the value returned from the filter factory must be {@code non-null}.

<p>The filter's {@link ObjectInputFilter#checkInput checkInput} method is called
for each class and reference in the stream.
The filter can check any or all of the class, the array length, the number
of references, the depth of the graph, and the size of the input stream.
The depth is the number of nested {@linkplain #readObject readObject}
calls starting with the reading of the root of the graph being deserialized
and the current object being deserialized.
The number of references is the cumulative number of objects and references
to objects already read from the stream including the current object being read.
The filter is invoked only when reading objects from the stream and not for
primitives.
<p>
If the filter returns {@link ObjectInputFilter.Status#REJECTED Status.REJECTED},
{@code null} or throws a {@link RuntimeException},
the active {@code readObject} or {@code readUnshared}
throws {@link InvalidClassException}, otherwise deserialization
continues uninterrupted.

@implSpec
The filter, when not {@code null}, is invoked during {@link #readObject readObject}
and {@link #readUnshared readUnshared} for each object (regular or class) in the stream.
Strings are treated as primitives and do not invoke the filter.
The filter is called for:
<ul>
    <li>each object reference previously deserialized from the stream
    (class is {@code null}, arrayLength is -1),
    <li>each regular class (class is not {@code null}, arrayLength is -1),
    <li>each interface class explicitly referenced in the stream
        (it is not called for interfaces implemented by classes in the stream),
    <li>each interface of a dynamic proxy and the dynamic proxy class itself
    (class is not {@code null}, arrayLength is -1),
    <li>each array is filtered using the array type and length of the array
    (class is the array type, arrayLength is the requested length),
    <li>each object replaced by its class' {@code readResolve} method
        is filtered using the replacement object's class, if not {@code null},
        and if it is an array, the arrayLength, otherwise -1,
    <li>and each object replaced by {@link #resolveObject resolveObject}
        is filtered using the replacement object's class, if not {@code null},
        and if it is an array, the arrayLength, otherwise -1.
</ul>

When the {@link ObjectInputFilter#checkInput checkInput} method is invoked
it is given access to the current class, the array length,
the current number of references already read from the stream,
the depth of nested calls to {@link #readObject readObject} or
{@link #readUnshared readUnshared},
and the implementation dependent number of bytes consumed from the input stream.
<p>
Each call to {@link #readObject readObject} or
{@link #readUnshared readUnshared} increases the depth by 1
before reading an object and decreases by 1 before returning
normally or exceptionally.
The depth starts at {@code 1} and increases for each nested object and
decrements when each nested call returns.
The count of references in the stream starts at {@code 1} and
is increased before reading an object.

@param filter the filter, may be null
@throws IllegalStateException if an object has been read,
      if the filter factory returns {@code null} when the
      {@linkplain #getObjectInputFilter() current filter} is non-null, or
      if the filter has already been set.
@since 9

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

@return  the descriptor class that describes the serializable fields

## ObjectInputStream.defaulted(String)

```java
public abstract boolean defaulted(String name) throws IOException
```

Return true if the named field is defaulted and has no value in this
stream.

@param  name the name of the field
@return true, if and only if the named field is defaulted
@throws IOException if there are I/O errors while reading from
        the underlying {@code InputStream}
@throws IllegalArgumentException if {@code name} does not
        correspond to a serializable field

## ObjectInputStream.get(String, boolean)

```java
public abstract boolean get(String name, boolean val) throws IOException
```

Get the value of the named boolean field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code boolean} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, byte)

```java
public abstract byte get(String name, byte val) throws IOException
```

Get the value of the named byte field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code byte} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, char)

```java
public abstract char get(String name, char val) throws IOException
```

Get the value of the named char field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code char} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, short)

```java
public abstract short get(String name, short val) throws IOException
```

Get the value of the named short field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code short} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, int)

```java
public abstract int get(String name, int val) throws IOException
```

Get the value of the named int field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code int} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, long)

```java
public abstract long get(String name, long val) throws IOException
```

Get the value of the named long field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code long} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, float)

```java
public abstract float get(String name, float val) throws IOException
```

Get the value of the named float field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code float} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, double)

```java
public abstract double get(String name, double val) throws IOException
```

Get the value of the named double field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code double} field
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.get(String, Object)

```java
public abstract Object get(String name, Object val) throws IOException, ClassNotFoundException
```

Get the value of the named Object field from the persistent field.

@param  name the name of the field
@param  val the default value to use if {@code name} does not
        have a value
@return the value of the named {@code Object} field
@throws ClassNotFoundException Class of a serialized object cannot be found.
@throws IOException if there are I/O errors while reading from the
        underlying {@code InputStream}
@throws IllegalArgumentException if type of {@code name} is
        not serializable or if the field type is incorrect

## ObjectInputStream.clear()

```java
public void clear()
```

Resets the callback list to its initial (empty) state.