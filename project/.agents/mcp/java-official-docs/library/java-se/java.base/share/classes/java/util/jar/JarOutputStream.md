# JarOutputStream class (java.util.jar)

```java
public class JarOutputStream extends ZipOutputStream
```

The {@code JarOutputStream} class is used to write the contents
of a JAR file to any output stream. It extends the class
{@code java.util.zip.ZipOutputStream} with support
for writing an optional {@code Manifest} entry. The
{@code Manifest} can be used to specify meta-information about
the JAR file and its entries.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.
@author  David Connelly
@see     Manifest
@see     java.util.zip.ZipOutputStream
@since   1.2

## JarOutputStream.JarOutputStream(OutputStream, Manifest)

```java
public JarOutputStream(OutputStream out, Manifest man) throws IOException
```

Creates a new {@code JarOutputStream} with the specified
{@code Manifest}. The manifest is written as the first
entry to the output stream.

@param out the actual output stream
@param man the optional {@code Manifest}
@throws    IOException if an I/O error has occurred

## JarOutputStream.JarOutputStream(OutputStream)

```java
public JarOutputStream(OutputStream out) throws IOException
```

Creates a new {@code JarOutputStream} with no manifest.
@param out the actual output stream
@throws    IOException if an I/O error has occurred

## JarOutputStream.putNextEntry(ZipEntry)

```java
public void putNextEntry(ZipEntry ze) throws IOException
```

Begins writing a new JAR file entry and positions the stream
to the start of the entry data. This method will also close
any previous entry.
<p>
The default compression method will be used if no compression
method was specified for the entry. When writing a compressed
(DEFLATED) entry, and the compressed size has not been explicitly
set with the {@link ZipEntry#setCompressedSize(long)} method,
then the compressed size will be set to the actual compressed
size after deflation.
<p>
The current time will be used if the entry has no set modification
time.

@param ze the ZIP/JAR entry to be written
@throws    ZipException if a ZIP error has occurred
@throws    IOException if an I/O error has occurred