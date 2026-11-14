# FileReader class (java.io)

```java
public class FileReader extends InputStreamReader
```

Reads text from character files using a default buffer size. Decoding from bytes
to characters uses either a specified {@linkplain Charset charset}
or the {@linkplain Charset#defaultCharset() default charset}.

<p>
The {@code FileReader} is meant for reading streams of characters. For reading
streams of raw bytes, consider using a {@code FileInputStream}.

@see InputStreamReader
@see FileInputStream
@see Charset#defaultCharset()

@author      Mark Reinhold
@since       1.1

## FileReader.FileReader(String)

```java
public FileReader(String fileName) throws FileNotFoundException
```

Creates a new {@code FileReader}, given the name of the file to read,
using the {@linkplain Charset#defaultCharset() default charset}.

@param      fileName the name of the file to read
@throws     FileNotFoundException  if the named file does not exist,
            is a directory rather than a regular file,
            or for some other reason cannot be opened for
            reading.
@see        Charset#defaultCharset()

## FileReader.FileReader(File)

```java
public FileReader(File file) throws FileNotFoundException
```

Creates a new {@code FileReader}, given the {@code File} to read,
using the {@linkplain Charset#defaultCharset() default charset}.

@param      file the {@code File} to read
@throws     FileNotFoundException  if the file does not exist,
            is a directory rather than a regular file,
            or for some other reason cannot be opened for
            reading.
@see        Charset#defaultCharset()

## FileReader.FileReader(FileDescriptor)

```java
public FileReader(FileDescriptor fd)
```

Creates a new {@code FileReader}, given the {@code FileDescriptor} to read,
using the {@linkplain Charset#defaultCharset() default charset}.

@param fd the {@code FileDescriptor} to read
@see Charset#defaultCharset()

## FileReader.FileReader(String, Charset)

```java
public FileReader(String fileName, Charset charset) throws IOException
```

Creates a new {@code FileReader}, given the name of the file to read
and the {@linkplain Charset charset}.

@param      fileName the name of the file to read
@param      charset the {@linkplain Charset charset}
@throws     IOException  if the named file does not exist,
            is a directory rather than a regular file,
            or for some other reason cannot be opened for
            reading.

@since 11

## FileReader.FileReader(File, Charset)

```java
public FileReader(File file, Charset charset) throws IOException
```

Creates a new {@code FileReader}, given the {@code File} to read and
the {@linkplain Charset charset}.

@param      file the {@code File} to read
@param      charset the {@linkplain Charset charset}
@throws     IOException  if the file does not exist,
            is a directory rather than a regular file,
            or for some other reason cannot be opened for
            reading.

@since 11