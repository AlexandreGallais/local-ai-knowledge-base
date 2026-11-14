# FileWriter class (java.io)

```java
public class FileWriter extends OutputStreamWriter
```

Writes text to character files using a default buffer size. Encoding from characters
to bytes uses either a specified {@linkplain Charset charset}
or the {@linkplain Charset#defaultCharset() default charset}.

<p>
Whether or not a file is available or may be created depends upon the
underlying platform.  Some platforms, in particular, allow a file to be
opened for writing by only one {@code FileWriter} (or other file-writing
object) at a time.  In such situations the constructors in this class
will fail if the file involved is already open.

<p>
The {@code FileWriter} is meant for writing streams of characters. For writing
streams of raw bytes, consider using a {@code FileOutputStream}.

@see OutputStreamWriter
@see FileOutputStream
@see Charset#defaultCharset()

@author      Mark Reinhold
@since       1.1

## FileWriter.FileWriter(String)

```java
public FileWriter(String fileName) throws IOException
```

Constructs a {@code FileWriter} given a file name, using the
{@linkplain Charset#defaultCharset() default charset}

@param fileName  String The system-dependent filename.
@throws IOException  if the named file exists but is a directory rather
                 than a regular file, does not exist but cannot be
                 created, or cannot be opened for any other reason
@see Charset#defaultCharset()

## FileWriter.FileWriter(String, boolean)

```java
public FileWriter(String fileName, boolean append) throws IOException
```

Constructs a {@code FileWriter} given a file name and a boolean indicating
whether to append the data written, using the
{@linkplain Charset#defaultCharset() default charset}.

@param fileName  String The system-dependent filename.
@param append    boolean if {@code true}, then data will be written
                 to the end of the file rather than the beginning.
@throws IOException  if the named file exists but is a directory rather
                 than a regular file, does not exist but cannot be
                 created, or cannot be opened for any other reason
@see Charset#defaultCharset()

## FileWriter.FileWriter(File)

```java
public FileWriter(File file) throws IOException
```

Constructs a {@code FileWriter} given the {@code File} to write,
using the {@linkplain Charset#defaultCharset() default charset}

@param file  the {@code File} to write.
@throws IOException  if the file exists but is a directory rather than
                 a regular file, does not exist but cannot be created,
                 or cannot be opened for any other reason
@see Charset#defaultCharset()

## FileWriter.FileWriter(File, boolean)

```java
public FileWriter(File file, boolean append) throws IOException
```

Constructs a {@code FileWriter} given the {@code File} to write and
a boolean indicating whether to append the data written, using the
{@linkplain Charset#defaultCharset() default charset}.

@param file  the {@code File} to write
@param     append    if {@code true}, then bytes will be written
                     to the end of the file rather than the beginning
@throws IOException  if the file exists but is a directory rather than
                 a regular file, does not exist but cannot be created,
                 or cannot be opened for any other reason
@see Charset#defaultCharset()
@since 1.4

## FileWriter.FileWriter(FileDescriptor)

```java
public FileWriter(FileDescriptor fd)
```

Constructs a {@code FileWriter} given a file descriptor,
using the {@linkplain Charset#defaultCharset() default charset}.

@param fd  the {@code FileDescriptor} to write.
@see Charset#defaultCharset()

## FileWriter.FileWriter(String, Charset)

```java
public FileWriter(String fileName, Charset charset) throws IOException
```

Constructs a {@code FileWriter} given a file name and
{@linkplain Charset charset}.

@param fileName  the name of the file to write
@param charset the {@linkplain Charset charset}
@throws IOException  if the named file exists but is a directory rather
                 than a regular file, does not exist but cannot be
                 created, or cannot be opened for any other reason

@since 11

## FileWriter.FileWriter(String, Charset, boolean)

```java
public FileWriter(String fileName, Charset charset, boolean append) throws IOException
```

Constructs a {@code FileWriter} given a file name,
{@linkplain Charset charset} and a boolean indicating
whether to append the data written.

@param fileName  the name of the file to write
@param charset the {@linkplain Charset charset}
@param append    a boolean. If {@code true}, the writer will write the data
                 to the end of the file rather than the beginning.
@throws IOException  if the named file exists but is a directory rather
                 than a regular file, does not exist but cannot be
                 created, or cannot be opened for any other reason

@since 11

## FileWriter.FileWriter(File, Charset)

```java
public FileWriter(File file, Charset charset) throws IOException
```

Constructs a {@code FileWriter} given the {@code File} to write and
{@linkplain Charset charset}.

@param file  the {@code File} to write
@param charset the {@linkplain Charset charset}
@throws IOException  if the file exists but is a directory rather than
                 a regular file, does not exist but cannot be created,
                 or cannot be opened for any other reason

@since 11

## FileWriter.FileWriter(File, Charset, boolean)

```java
public FileWriter(File file, Charset charset, boolean append) throws IOException
```

Constructs a {@code FileWriter} given the {@code File} to write,
{@linkplain Charset charset} and a boolean indicating
whether to append the data written.

@param file  the {@code File} to write
@param charset the {@linkplain Charset charset}
@param append    a boolean. If {@code true}, the writer will write the data
                 to the end of the file rather than the beginning.
@throws IOException  if the file exists but is a directory rather than
                 a regular file, does not exist but cannot be created,
                 or cannot be opened for any other reason
@since 11