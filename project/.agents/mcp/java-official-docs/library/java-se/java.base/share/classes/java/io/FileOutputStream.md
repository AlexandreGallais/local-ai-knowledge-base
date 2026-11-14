# FileOutputStream class (java.io)

```java
public class FileOutputStream extends OutputStream
```

A file output stream is an output stream for writing data to a
{@code File} or to a {@code FileDescriptor}. Whether or not
a file is available or may be created depends upon the underlying
platform.  Some platforms, in particular, allow a file to be opened
for writing by only one {@code FileOutputStream} (or other
file-writing object) at a time.  In such situations the constructors in
this class will fail if the file involved is already open.

<p>{@code FileOutputStream} is meant for writing streams of raw bytes
such as image data. For writing streams of characters, consider using
{@code FileWriter}.

@apiNote
The {@link #close} method should be called to release resources used by this
stream, either directly, or with the {@code try}-with-resources statement.

@implSpec
Subclasses are responsible for the cleanup of resources acquired by the subclass.
Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use {@link java.lang.ref.Cleaner} or some other mechanism.

@author  Arthur van Hoff
@see     java.io.File
@see     java.io.FileDescriptor
@see     java.io.FileInputStream
@see     java.nio.file.Files#newOutputStream
@since   1.0

## FileOutputStream.FileOutputStream(String)

```java
public FileOutputStream(String name) throws FileNotFoundException
```

Creates a file output stream to write to the file with the
specified name. If the file exists, it is truncated, otherwise a
new file is created. {@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@code FileDescriptor} object is
created to represent this file connection.
<p>
If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a {@code FileNotFoundException} is thrown.

@implSpec Invoking this constructor with the parameter {@code name} is
equivalent to invoking {@link #FileOutputStream(String,boolean)
new FileOutputStream(name, false)}.

@param      name   the system-dependent filename
@throws     FileNotFoundException  if the file exists but is a directory
                  rather than a regular file, does not exist but cannot
                  be created, or cannot be opened for any other reason

## FileOutputStream.FileOutputStream(String, boolean)

```java
public FileOutputStream(String name, boolean append) throws FileNotFoundException
```

Creates a file output stream to write to the file with the specified
name. If the file exists, it is truncated unless the second
argument is {@code true}, in which case bytes will be written to the
end of the file rather than the beginning. If the file does not exist,
it is created. {@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@code FileDescriptor} object is created to represent this
file connection.
<p>
If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a {@code FileNotFoundException} is thrown.

@param     name        the system-dependent file name
@param     append      if {@code true}, then bytes will be written
                  to the end of the file rather than the beginning
@throws     FileNotFoundException  if the file exists but is a directory
                  rather than a regular file, does not exist but cannot
                  be created, or cannot be opened for any other reason.
@since     1.1

## FileOutputStream.FileOutputStream(File)

```java
public FileOutputStream(File file) throws FileNotFoundException
```

Creates a file output stream to write to the file represented by
the specified {@code File} object.
If the file exists, it is truncated, otherwise a
new file is created. {@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@code FileDescriptor} object is
created to represent this file connection.
<p>
If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a {@code FileNotFoundException} is thrown.

@param      file               the file to be opened for writing.
@throws     FileNotFoundException  if the file exists but is a directory
                  rather than a regular file, does not exist but cannot
                  be created, or cannot be opened for any other reason
@see        java.io.File#getPath()

## FileOutputStream.FileOutputStream(File, boolean)

```java
public FileOutputStream(File file, boolean append) throws FileNotFoundException
```

Creates a file output stream to write to the file represented by
the specified {@code File} object.
If the file exists, it is truncated unless the second
argument is {@code true}, in which case bytes will be written to the
end of the file rather than the beginning. If the file does not exist,
it is created. {@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@code FileDescriptor} object is created to represent this
file connection.
<p>
If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a {@code FileNotFoundException} is thrown.

@param      file               the file to be opened for writing.
@param     append      if {@code true}, then bytes will be written
                  to the end of the file rather than the beginning
@throws     FileNotFoundException  if the file exists but is a directory
                  rather than a regular file, does not exist but cannot
                  be created, or cannot be opened for any other reason
@see        java.io.File#getPath()
@since 1.4

## FileOutputStream.FileOutputStream(FileDescriptor)

```java
public FileOutputStream(FileDescriptor fdObj)
```

Creates a file output stream to write to the specified file
descriptor, which represents an existing connection to an actual
file in the file system.
<p>
If {@code fdObj} is null then a {@code NullPointerException}
is thrown.
<p>
This constructor does not throw an exception if {@code fdObj}
is {@link java.io.FileDescriptor#valid() invalid}.
However, if the methods are invoked on the resulting stream to attempt
I/O on the stream, an {@code IOException} is thrown.

@param      fdObj   the file descriptor to be opened for writing

## FileOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified byte to this file output stream. Implements
the {@code write} method of {@code OutputStream}.

@param      b   the byte to be written.
@throws     IOException  if an I/O error occurs.

## FileOutputStream.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes {@code b.length} bytes from the specified byte array
to this file output stream.

@param      b   {@inheritDoc}
@throws     IOException  {@inheritDoc}

## FileOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes {@code len} bytes from the specified byte array
starting at offset {@code off} to this file output stream.

@param      b     {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}
@throws     IOException  if an I/O error occurs.
@throws     IndexOutOfBoundsException {@inheritDoc}

## FileOutputStream.close()

```java
public void close() throws IOException
```

Closes this file output stream and releases any system resources
associated with this stream. This file output stream may no longer
be used for writing bytes.

<p> If this stream has an associated channel then the channel is closed
as well.

@apiNote
Overriding {@link #close} to perform cleanup actions is reliable
only when called directly or when called by try-with-resources.

@implSpec
Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use the {@link java.lang.ref.Cleaner} mechanism.

<p>
If this stream has an associated channel then this method will close the
channel, which in turn will close this stream. Subclasses that override
this method should be prepared to handle possible reentrant invocation.

@throws     IOException  if an I/O error occurs.

## FileOutputStream.getFD()

```java
public final FileDescriptor getFD() throws IOException
```

Returns the file descriptor associated with this stream.

@return  the {@code FileDescriptor} object that represents
         the connection to the file in the file system being used
         by this {@code FileOutputStream} object.

@throws     IOException  if an I/O error occurs.
@see        java.io.FileDescriptor

## FileOutputStream.getChannel()

```java
public FileChannel getChannel()
```

Returns the unique {@link java.nio.channels.FileChannel FileChannel}
object associated with this file output stream.

<p> The initial {@link java.nio.channels.FileChannel#position()
position} of the returned channel will be equal to the
number of bytes written to the file so far unless this stream is in
append mode, in which case it will be equal to the size of the file.
Writing bytes to this stream will increment the channel's position
accordingly.  Changing the channel's position, either explicitly or by
writing, will change this stream's file position.

@return  the file channel associated with this file output stream

@since 1.4