# CheckedOutputStream class (java.util.zip)

```java
public class CheckedOutputStream extends FilterOutputStream
```

An output stream that also maintains a checksum of the data being
written. The checksum can then be used to verify the integrity of
the output data.

@see         Checksum
@author      David Connelly
@since 1.1

## CheckedOutputStream.CheckedOutputStream(OutputStream, Checksum)

```java
public CheckedOutputStream(OutputStream out, Checksum cksum)
```

Creates an output stream with the specified Checksum.
@param out the output stream
@param cksum the checksum

## CheckedOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte. Will block until the byte is actually written.
@param b the byte to be written
@throws    IOException if an I/O error has occurred

## CheckedOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes. Will block until the bytes are
actually written.
@param b the data to be written
@param off the start offset of the data
@param len the number of bytes to be written
@throws    IOException if an I/O error has occurred

## CheckedOutputStream.getChecksum()

```java
public Checksum getChecksum()
```

Returns the Checksum for this output stream.
@return the Checksum