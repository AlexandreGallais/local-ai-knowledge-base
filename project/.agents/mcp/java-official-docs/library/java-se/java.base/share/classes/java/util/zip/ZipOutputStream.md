# ZipOutputStream class (java.util.zip)

```java
public class ZipOutputStream extends DeflaterOutputStream implements ZipConstants
```

This class implements an output stream filter for writing files in the
ZIP file format. Includes support for both compressed and uncompressed
entries.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.
@author      David Connelly
@since 1.1

## ZipOutputStream.STORED

```java
public static final int STORED
```

Compression method for uncompressed (STORED) entries.

## ZipOutputStream.DEFLATED

```java
public static final int DEFLATED
```

Compression method for compressed (DEFLATED) entries.

## ZipOutputStream.ZipOutputStream(OutputStream)

```java
public ZipOutputStream(OutputStream out)
```

Creates a new ZIP output stream.

<p>The UTF-8 {@link java.nio.charset.Charset charset} is used
to encode the entry names and comments.

@param out the actual output stream

## ZipOutputStream.ZipOutputStream(OutputStream, Charset)

```java
public ZipOutputStream(OutputStream out, Charset charset)
```

Creates a new ZIP output stream.

@param out the actual output stream

@param charset the {@linkplain java.nio.charset.Charset charset}
               to be used to encode the entry names and comments

@since 1.7

## ZipOutputStream.setComment(String)

```java
public void setComment(String comment)
```

Sets the ZIP file comment.
@param     comment the comment string
@throws    IllegalArgumentException if the length of the specified
           ZIP file comment is greater than 0xFFFF bytes

## ZipOutputStream.setMethod(int)

```java
public void setMethod(int method)
```

Sets the default compression method for subsequent entries. This
default will be used whenever the compression method is not specified
for an individual ZIP file entry, and is initially set to DEFLATED.
@param     method the default compression method
@throws    IllegalArgumentException if the specified compression method
           is invalid

## ZipOutputStream.setLevel(int)

```java
public void setLevel(int level)
```

Sets the compression level for subsequent entries which are DEFLATED.
The default setting is DEFAULT_COMPRESSION.
@param     level the compression level (0-9)
@throws    IllegalArgumentException if the compression level is invalid

## ZipOutputStream.putNextEntry(ZipEntry)

```java
public void putNextEntry(ZipEntry e) throws IOException
```

Begins writing a new ZIP file entry and positions the stream to the
start of the entry data. Closes the current entry if still active.
<p>
The default compression method will be used if no compression method
was specified for the entry. When writing a compressed (DEFLATED)
entry, and the compressed size has not been explicitly set with the
{@link ZipEntry#setCompressedSize(long)} method, then the compressed
size will be set to the actual compressed size after deflation.
<p>
The current time will be used if the entry has no set modification time.

@apiNote When writing a directory entry, the STORED compression method
should be used and the size and CRC-32 values should be set to 0:

{@snippet lang = "java":
    ZipEntry e = new ZipEntry(entryName);
    if (e.isDirectory()) {
        e.setMethod(ZipEntry.STORED);
        e.setSize(0);
        e.setCrc(0);
    }
    stream.putNextEntry(e);
}

This allows optimal performance when processing directory entries.

@param     e the ZIP entry to be written
@throws    ZipException if a ZIP format error has occurred
@throws    IOException if an I/O error has occurred

## ZipOutputStream.closeEntry()

```java
public void closeEntry() throws IOException
```

Closes the current ZIP entry and positions the stream for writing
the next entry.
@throws    ZipException if a ZIP format error has occurred
@throws    IOException if an I/O error has occurred

## ZipOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes to the current ZIP entry data. This method
will block until all the bytes are written.
@param     b the data to be written
@param     off the start offset in the data
@param     len the number of bytes that are written
@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O error has occurred

## ZipOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing the contents of the ZIP output stream without closing
the underlying stream. Use this method when applying multiple filters
in succession to the same output stream.
<p>
A ZipException will be thrown if the combined length, after encoding,
of the entry name, the extra field data, the entry comment and
{@linkplain #CENHDR CEN Header size}, exceeds 65,535 bytes.
@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O exception has occurred

## ZipOutputStream.close()

```java
public void close() throws IOException
```

Closes the underlying stream and the stream being filtered after
the contents of the ZIP output stream are fully written.

@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O error has occurred