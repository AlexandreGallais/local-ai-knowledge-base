# ZipEntry class (java.util.zip)

```java
public class ZipEntry implements ZipConstants, Cloneable
```

This class is used to represent a ZIP file entry.

@author      David Connelly
@since 1.1

## ZipEntry.STORED

```java
public static final int STORED
```

Compression method for uncompressed entries.

## ZipEntry.DEFLATED

```java
public static final int DEFLATED
```

Compression method for compressed (deflated) entries.

## ZipEntry.ZipEntry(String)

```java
public ZipEntry(String name)
```

Creates a new ZIP entry with the specified name.

@param  name
        The entry name

@throws NullPointerException if the entry name is null
@throws IllegalArgumentException if the combined length of the entry name
and the {@linkplain #CENHDR CEN Header size} exceeds 65,535 bytes.

## ZipEntry.ZipEntry(ZipEntry)

```java
public ZipEntry(ZipEntry e)
```

Creates a new ZIP entry with fields taken from the specified
ZIP entry.

@param  e
        A ZIP Entry object

@throws NullPointerException if the entry object is null

## ZipEntry.getName()

```java
public String getName()
```

{@return the name of the entry}

## ZipEntry.setTime(long)

```java
public void setTime(long time)
```

Sets the last modification time of the entry.

<p> If the entry is output to a ZIP file or ZIP file formatted
output stream the last modification time set by this method will
be stored into the {@code date and time fields} of the ZIP file
entry and encoded in standard {@code MS-DOS date and time format}.
The {@link java.util.TimeZone#getDefault() default TimeZone} is
used to convert the epoch time to the MS-DOS date and time.

@param  time
        The last modification time of the entry in milliseconds
        since the epoch

@see #getTime()
@see #getLastModifiedTime()

## ZipEntry.getTime()

```java
public long getTime()
```

Returns the last modification time of the entry.

<p> If the entry is read from a ZIP file or ZIP file formatted
input stream, this is the last modification time from the {@code
date and time fields} of the ZIP file entry. The
{@link java.util.TimeZone#getDefault() default TimeZone} is used
to convert the standard MS-DOS formatted date and time to the
epoch time.

@return  The last modification time of the entry in milliseconds
         since the epoch, or -1 if not specified

@see #setTime(long)
@see #setLastModifiedTime(FileTime)

## ZipEntry.setTimeLocal(LocalDateTime)

```java
public void setTimeLocal(LocalDateTime time)
```

Sets the last modification time of the entry in local date-time.

<p> If the entry is output to a ZIP file or ZIP file formatted
output stream the last modification time set by this method will
be stored into the {@code date and time fields} of the ZIP file
entry and encoded in standard {@code MS-DOS date and time format}.
If the date-time set is out of the range of the standard {@code
MS-DOS date and time format}, the time will also be stored into
ZIP file entry's extended timestamp fields in {@code optional
extra data} in UTC time. The {@link java.time.ZoneId#systemDefault()
system default TimeZone} is used to convert the local date-time
to UTC time.

<p> {@code LocalDateTime} uses a precision of nanoseconds, whereas
this class uses a precision of milliseconds. The conversion will
truncate any excess precision information as though the amount in
nanoseconds was subject to integer division by one million.

@param  time
        The last modification time of the entry in local date-time
@throws NullPointerException if {@code time} is null
@see #getTimeLocal()
@since 9

## ZipEntry.getTimeLocal()

```java
public LocalDateTime getTimeLocal()
```

Returns the last modification time of the entry in local date-time.

<p> If the entry is read from a ZIP file or ZIP file formatted
input stream, this is the last modification time from the zip
file entry's {@code optional extra data} if the extended timestamp
fields are present. Otherwise, the last modification time is read
from entry's standard MS-DOS formatted {@code date and time fields}.

<p> The {@link java.time.ZoneId#systemDefault() system default TimeZone}
is used to convert the UTC time to local date-time.

@return  The last modification time of the entry in local date-time

@see #setTimeLocal(LocalDateTime)
@since 9

## ZipEntry.setLastModifiedTime(FileTime)

```java
public ZipEntry setLastModifiedTime(FileTime time)
```

Sets the last modification time of the entry.

<p> When output to a ZIP file or ZIP file formatted output stream
the last modification time set by this method will be stored into
ZIP file entry's {@code date and time fields} in {@code standard
MS-DOS date and time format}), and the extended timestamp fields
in {@code optional extra data} in UTC time.

@param  time
        The last modification time of the entry
@return This ZIP entry

@throws NullPointerException if the {@code time} is null

@see #getLastModifiedTime()
@since 1.8

## ZipEntry.getLastModifiedTime()

```java
public FileTime getLastModifiedTime()
```

Returns the last modification time of the entry.

<p> If the entry is read from a ZIP file or ZIP file formatted
input stream, this is the last modification time from the zip
file entry's {@code optional extra data} if the extended timestamp
fields are present. Otherwise the last modification time is read
from the entry's {@code date and time fields}, the {@link
java.util.TimeZone#getDefault() default TimeZone} is used to convert
the standard MS-DOS formatted date and time to the epoch time.

@return The last modification time of the entry, null if not specified

@see #setLastModifiedTime(FileTime)
@since 1.8

## ZipEntry.setLastAccessTime(FileTime)

```java
public ZipEntry setLastAccessTime(FileTime time)
```

Sets the last access time of the entry.

<p> If set, the last access time will be stored into the extended
timestamp fields of entry's {@code optional extra data}, when output
to a ZIP file or ZIP file formatted stream.

@param  time
        The last access time of the entry
@return This ZIP entry

@throws NullPointerException if the {@code time} is null

@see #getLastAccessTime()
@since 1.8

## ZipEntry.getLastAccessTime()

```java
public FileTime getLastAccessTime()
```

Returns the last access time of the entry.

<p> The last access time is from the extended timestamp fields
of entry's {@code optional extra data} when read from a ZIP file
or ZIP file formatted stream.

@return The last access time of the entry, null if not specified
@see #setLastAccessTime(FileTime)
@since 1.8

## ZipEntry.setCreationTime(FileTime)

```java
public ZipEntry setCreationTime(FileTime time)
```

Sets the creation time of the entry.

<p> If set, the creation time will be stored into the extended
timestamp fields of entry's {@code optional extra data}, when
output to a ZIP file or ZIP file formatted stream.

@param  time
        The creation time of the entry
@return This ZIP entry

@throws NullPointerException if the {@code time} is null

@see #getCreationTime()
@since 1.8

## ZipEntry.getCreationTime()

```java
public FileTime getCreationTime()
```

Returns the creation time of the entry.

<p> The creation time is from the extended timestamp fields of
entry's {@code optional extra data} when read from a ZIP file
or ZIP file formatted stream.

@return the creation time of the entry, null if not specified
@see #setCreationTime(FileTime)
@since 1.8

## ZipEntry.setSize(long)

```java
public void setSize(long size)
```

Sets the uncompressed size of the entry data.

@param size the uncompressed size in bytes

@throws IllegalArgumentException if the specified size is less
        than 0, is greater than 0xFFFFFFFF when
        <a href="package-summary.html#zip64">ZIP64 format</a> is not supported,
        or is less than 0 when ZIP64 is supported
@see #getSize()

## ZipEntry.getSize()

```java
public long getSize()
```

Returns the uncompressed size of the entry data.

@return the uncompressed size of the entry data, or -1 if not known
@see #setSize(long)

## ZipEntry.getCompressedSize()

```java
public long getCompressedSize()
```

Returns the size of the compressed entry data.

<p> In the case of a stored entry, the compressed size will be the same
as the uncompressed size of the entry.

@return the size of the compressed entry data, or -1 if not known
@see #setCompressedSize(long)

## ZipEntry.setCompressedSize(long)

```java
public void setCompressedSize(long csize)
```

Sets the size of the compressed entry data.

@param csize the compressed size to set

@see #getCompressedSize()

## ZipEntry.setCrc(long)

```java
public void setCrc(long crc)
```

Sets the CRC-32 checksum of the uncompressed entry data.

@param crc the CRC-32 value

@throws IllegalArgumentException if the specified CRC-32 value is
        less than 0 or greater than 0xFFFFFFFF
@see #getCrc()

## ZipEntry.getCrc()

```java
public long getCrc()
```

Returns the CRC-32 checksum of the uncompressed entry data.

@return the CRC-32 checksum of the uncompressed entry data, or -1 if
not known

@see #setCrc(long)

## ZipEntry.setMethod(int)

```java
public void setMethod(int method)
```

Sets the compression method for the entry.

@param method the compression method, either STORED or DEFLATED

@throws  IllegalArgumentException if the specified compression
         method is invalid
@see #getMethod()

## ZipEntry.getMethod()

```java
public int getMethod()
```

Returns the compression method of the entry.

@return the compression method of the entry, or -1 if not specified
@see #setMethod(int)

## ZipEntry.setExtra(byte[])

```java
public void setExtra(byte[] extra)
```

Sets the optional extra field data for the entry.

<p> Invoking this method may change this entry's last modification
time, last access time and creation time, if the {@code extra} field
data includes the extensible timestamp fields, such as {@code NTFS tag
0x0001} or {@code Info-ZIP Extended Timestamp}, as specified in
<a href="http://www.info-zip.org/doc/appnote-19970311-iz.zip">Info-ZIP
Application Note 970311</a>.

@param  extra
        The extra field data bytes

@throws IllegalArgumentException if the combined length of the specified
extra field data, the {@linkplain #getName() entry name},
the {@linkplain #getComment() entry comment}, and the
{@linkplain #CENHDR CEN Header size} exceeds 65,535 bytes.

@see #getExtra()

## ZipEntry.getExtra()

```java
public byte[] getExtra()
```

Returns the extra field data for the entry.

@return the extra field data for the entry, or null if none

@see #setExtra(byte[])

## ZipEntry.setComment(String)

```java
public void setComment(String comment)
```

Sets the optional comment string for the entry.
@param comment the comment string
@throws IllegalArgumentException if the combined length
of the specified entry comment, the {@linkplain #getName() entry name},
the {@linkplain #getExtra() extra field data}, and the
{@linkplain #CENHDR CEN Header size} exceeds 65,535 bytes.
@see #getComment()

## ZipEntry.getComment()

```java
public String getComment()
```

Returns the comment string for the entry.

@return the comment string for the entry, or null if none

@see #setComment(String)

## ZipEntry.isDirectory()

```java
public boolean isDirectory()
```

Returns true if this is a directory entry. A directory entry is
defined to be one whose name ends with a '/'.
@return true if this is a directory entry

## ZipEntry.toString()

```java
public String toString()
```

Returns a string representation of the ZIP entry.

## ZipEntry.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this entry.

## ZipEntry.clone()

```java
public Object clone()
```

Returns a copy of this entry.