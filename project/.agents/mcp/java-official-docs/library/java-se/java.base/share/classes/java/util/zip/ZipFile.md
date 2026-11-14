# ZipFile class (java.util.zip)

```java
public class ZipFile implements ZipConstants, Closeable
```

This class is used to read entries from a ZIP file.

<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

@apiNote
To release resources used by this {@code ZipFile}, the {@link #close()} method
should be called explicitly or by try-with-resources. Subclasses are responsible
for the cleanup of resources acquired by the subclass. Subclasses that override
{@link #finalize()} in order to perform cleanup should be modified to use alternative
cleanup mechanisms such as {@link java.lang.ref.Cleaner} and remove the overriding
{@code finalize} method.

@author      David Connelly
@since 1.1

## ZipFile.OPEN_READ

```java
public static final int OPEN_READ
```

Mode flag to open a ZIP file for reading.

## ZipFile.OPEN_DELETE

```java
public static final int OPEN_DELETE
```

Mode flag to open a ZIP file and mark it for deletion.  The file will be
deleted some time between the moment that it is opened and the moment
that it is closed, but its contents will remain accessible via the
{@code ZipFile} object until either the close method is invoked or the
virtual machine exits.

## ZipFile.ZipFile(String)

```java
public ZipFile(String name) throws IOException
```

Opens a ZIP file for reading.

<p>The UTF-8 {@link java.nio.charset.Charset charset} is used to
decode the entry names and comments.

@param name the name of the ZIP file
@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred

## ZipFile.ZipFile(File, int)

```java
public ZipFile(File file, int mode) throws IOException
```

Opens a new {@code ZipFile} to read from the specified
{@code File} object in the specified mode.  The mode argument
must be either {@code OPEN_READ} or {@code OPEN_READ | OPEN_DELETE}.

<p>The UTF-8 {@link java.nio.charset.Charset charset} is used to
decode the entry names and comments

@param file the ZIP file to be opened for reading
@param mode the mode in which the file is to be opened
@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred
@throws IllegalArgumentException if the {@code mode} argument is invalid
@since 1.3

## ZipFile.ZipFile(File)

```java
public ZipFile(File file) throws ZipException, IOException
```

Opens a ZIP file for reading given the specified File object.

<p>The UTF-8 {@link java.nio.charset.Charset charset} is used to
decode the entry names and comments.

@param file the ZIP file to be opened for reading
@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred

## ZipFile.ZipFile(File, int, Charset)

```java
public ZipFile(File file, int mode, Charset charset) throws IOException
```

Opens a new {@code ZipFile} to read from the specified
{@code File} object in the specified mode.  The mode argument
must be either {@code OPEN_READ} or {@code OPEN_READ | OPEN_DELETE}.

@param file the ZIP file to be opened for reading
@param mode the mode in which the file is to be opened
@param charset
       the {@linkplain java.nio.charset.Charset charset} to
       be used to decode the ZIP entry name and comment that are not
       encoded by using UTF-8 encoding (indicated by entry's general
       purpose flag).

@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred

@throws IllegalArgumentException if the {@code mode} argument is invalid

@since 1.7

## ZipFile.ZipFile(String, Charset)

```java
public ZipFile(String name, Charset charset) throws IOException
```

Opens a ZIP file for reading.

@param name the name of the ZIP file
@param charset
       the {@linkplain java.nio.charset.Charset charset} to
       be used to decode the ZIP entry name and comment that are not
       encoded by using UTF-8 encoding (indicated by entry's general
       purpose flag).

@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred

@since 1.7

## ZipFile.ZipFile(File, Charset)

```java
public ZipFile(File file, Charset charset) throws IOException
```

Opens a ZIP file for reading given the specified File object.

@param file the ZIP file to be opened for reading
@param charset
       The {@linkplain java.nio.charset.Charset charset} to be
       used to decode the ZIP entry name and comment (ignored if
       the <a href="package-summary.html#lang_encoding"> language
       encoding bit</a> of the ZIP entry's general purpose bit
       flag is set).

@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred

@since 1.7

## ZipFile.getComment()

```java
public String getComment()
```

Returns the ZIP file comment. If a comment does not exist or an error is
encountered decoding the comment using the charset specified
when opening the ZIP file, then {@code null} is returned.

@return the comment string for the ZIP file, or null if none

@throws IllegalStateException if the ZIP file has been closed

@since 1.7

## ZipFile.getEntry(String)

```java
public ZipEntry getEntry(String name)
```

Returns the ZIP file entry for the specified name, or null
if not found.

@param name the name of the entry
@return the ZIP file entry, or null if not found
@throws IllegalStateException if the ZIP file has been closed

## ZipFile.getInputStream(ZipEntry)

```java
public InputStream getInputStream(ZipEntry entry) throws IOException
```

Returns an input stream for reading the contents of the specified
ZIP file entry.
<p>
Closing this ZIP file will, in turn, close all input streams that
have been returned by invocations of this method.

@apiNote The {@code InputStream} returned by this method can wrap an
{@link java.util.zip.InflaterInputStream InflaterInputStream}, whose
{@link java.util.zip.InflaterInputStream#read(byte[], int, int)
read(byte[], int, int)} method can modify any element of the output
buffer.

@param entry the ZIP file entry
@return the input stream for reading the contents of the specified
ZIP file entry or null if the ZIP file entry does not exist
within the ZIP file.
@throws ZipException if a ZIP format error has occurred
@throws IOException if an I/O error has occurred
@throws IllegalStateException if the ZIP file has been closed

## ZipFile.getName()

```java
public String getName()
```

{@return the path name of the ZIP file}

## ZipFile.toString()

```java
public String toString()
```

{@return a string identifying this {@code ZipFile}, for debugging}

## ZipFile.entries()

```java
public Enumeration<? extends ZipEntry> entries()
```

{@return an enumeration of the ZIP file entries}
@throws IllegalStateException if the ZIP file has been closed

## ZipFile.stream()

```java
public Stream<? extends ZipEntry> stream()
```

Returns an ordered {@code Stream} over the ZIP file entries.

Entries appear in the {@code Stream} in the order they appear in
the central directory of the ZIP file.

@return an ordered {@code Stream} of entries in this ZIP file
@throws IllegalStateException if the ZIP file has been closed
@since 1.8

## ZipFile.size()

```java
public int size()
```

Returns the number of entries in the ZIP file.

@return the number of entries in the ZIP file
@throws IllegalStateException if the ZIP file has been closed

## ZipFile.close()

```java
public void close() throws IOException
```

Closes the ZIP file.

<p> Closing this ZIP file will close all of the input streams
previously returned by invocations of the {@link #getInputStream
getInputStream} method.

@throws IOException if an I/O error has occurred

## ZipFile.Key(File, BasicFileAttributes, Charset)

```java
public Key(File file, BasicFileAttributes attrs, Charset charset)
```

Constructs a {@code Key} to a {@code Source} of a {@code ZipFile}

@param file    the ZIP file
@param attrs   the attributes of the ZIP file
@param charset the Charset that was provided when constructing the ZipFile instance