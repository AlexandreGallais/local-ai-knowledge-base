---
title: "ZipEntry class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/ZipEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZipEntry class (java.util.zip)

```java
public class ZipEntry implements ZipConstants, Cloneable
```

This class is used to represent a ZIP file entry.

**Since:** 1.1

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

Parameters:

- `name`: The entry name

Throws:

- `NullPointerException`: if the entry name is null
- `IllegalArgumentException`: if the combined length of the entry name and the CEN Header size exceeds 65,535 bytes.

## ZipEntry.ZipEntry(ZipEntry)

```java
public ZipEntry(ZipEntry e)
```

Creates a new ZIP entry with fields taken from the specified
ZIP entry.

Parameters:

- `e`: A ZIP Entry object

Throws:

- `NullPointerException`: if the entry object is null

## ZipEntry.getName()

```java
public String getName()
```

## ZipEntry.setTime(long)

```java
public void setTime(long time)
```

Sets the last modification time of the entry.

 If the entry is output to a ZIP file or ZIP file formatted
output stream the last modification time set by this method will
be stored into the `date and time fields` of the ZIP file
entry and encoded in standard `MS-DOS date and time format`.
The default TimeZone is
used to convert the epoch time to the MS-DOS date and time.

Parameters:

- `time`: The last modification time of the entry in milliseconds since the epoch

**See also:** #getTime()

**See also:** #getLastModifiedTime()

## ZipEntry.getTime()

```java
public long getTime()
```

Returns the last modification time of the entry.

 If the entry is read from a ZIP file or ZIP file formatted
input stream, this is the last modification time from the `date and time fields` of the ZIP file entry. The
default TimeZone is used
to convert the standard MS-DOS formatted date and time to the
epoch time.

**Returns:** The last modification time of the entry in milliseconds
         since the epoch, or -1 if not specified

**See also:** #setTime(long)

**See also:** #setLastModifiedTime(FileTime)

## ZipEntry.setTimeLocal(LocalDateTime)

```java
public void setTimeLocal(LocalDateTime time)
```

Sets the last modification time of the entry in local date-time.

 If the entry is output to a ZIP file or ZIP file formatted
output stream the last modification time set by this method will
be stored into the `date and time fields` of the ZIP file
entry and encoded in standard `MS-DOS date and time format`.
If the date-time set is out of the range of the standard `MS-DOS date and time format`, the time will also be stored into
ZIP file entry's extended timestamp fields in `optional extra data` in UTC time. The system default TimeZone is used to convert the local date-time
to UTC time.

 `LocalDateTime` uses a precision of nanoseconds, whereas
this class uses a precision of milliseconds. The conversion will
truncate any excess precision information as though the amount in
nanoseconds was subject to integer division by one million.

Parameters:

- `time`: The last modification time of the entry in local date-time

**See also:** #getTimeLocal()

**Since:** 9

Throws:

- `NullPointerException`: if `time` is null

## ZipEntry.getTimeLocal()

```java
public LocalDateTime getTimeLocal()
```

Returns the last modification time of the entry in local date-time.

 If the entry is read from a ZIP file or ZIP file formatted
input stream, this is the last modification time from the zip
file entry's `optional extra data` if the extended timestamp
fields are present. Otherwise, the last modification time is read
from entry's standard MS-DOS formatted `date and time fields`.

 The system default TimeZone
is used to convert the UTC time to local date-time.

**Returns:** The last modification time of the entry in local date-time

**See also:** #setTimeLocal(LocalDateTime)

**Since:** 9

## ZipEntry.setLastModifiedTime(FileTime)

```java
public ZipEntry setLastModifiedTime(FileTime time)
```

Sets the last modification time of the entry.

 When output to a ZIP file or ZIP file formatted output stream
the last modification time set by this method will be stored into
ZIP file entry's `date and time fields` in `standard MS-DOS date and time format`), and the extended timestamp fields
in `optional extra data` in UTC time.

Parameters:

- `time`: The last modification time of the entry

**Returns:** This ZIP entry

**See also:** #getLastModifiedTime()

**Since:** 1.8

Throws:

- `NullPointerException`: if the `time` is null

## ZipEntry.getLastModifiedTime()

```java
public FileTime getLastModifiedTime()
```

Returns the last modification time of the entry.

 If the entry is read from a ZIP file or ZIP file formatted
input stream, this is the last modification time from the zip
file entry's `optional extra data` if the extended timestamp
fields are present. Otherwise the last modification time is read
from the entry's `date and time fields`, the default TimeZone is used to convert
the standard MS-DOS formatted date and time to the epoch time.

**Returns:** The last modification time of the entry, null if not specified

**See also:** #setLastModifiedTime(FileTime)

**Since:** 1.8

## ZipEntry.setLastAccessTime(FileTime)

```java
public ZipEntry setLastAccessTime(FileTime time)
```

Sets the last access time of the entry.

 If set, the last access time will be stored into the extended
timestamp fields of entry's `optional extra data`, when output
to a ZIP file or ZIP file formatted stream.

Parameters:

- `time`: The last access time of the entry

**Returns:** This ZIP entry

**See also:** #getLastAccessTime()

**Since:** 1.8

Throws:

- `NullPointerException`: if the `time` is null

## ZipEntry.getLastAccessTime()

```java
public FileTime getLastAccessTime()
```

Returns the last access time of the entry.

 The last access time is from the extended timestamp fields
of entry's `optional extra data` when read from a ZIP file
or ZIP file formatted stream.

**Returns:** The last access time of the entry, null if not specified

**See also:** #setLastAccessTime(FileTime)

**Since:** 1.8

## ZipEntry.setCreationTime(FileTime)

```java
public ZipEntry setCreationTime(FileTime time)
```

Sets the creation time of the entry.

 If set, the creation time will be stored into the extended
timestamp fields of entry's `optional extra data`, when
output to a ZIP file or ZIP file formatted stream.

Parameters:

- `time`: The creation time of the entry

**Returns:** This ZIP entry

**See also:** #getCreationTime()

**Since:** 1.8

Throws:

- `NullPointerException`: if the `time` is null

## ZipEntry.getCreationTime()

```java
public FileTime getCreationTime()
```

Returns the creation time of the entry.

 The creation time is from the extended timestamp fields of
entry's `optional extra data` when read from a ZIP file
or ZIP file formatted stream.

**Returns:** the creation time of the entry, null if not specified

**See also:** #setCreationTime(FileTime)

**Since:** 1.8

## ZipEntry.setSize(long)

```java
public void setSize(long size)
```

Sets the uncompressed size of the entry data.

Parameters:

- `size`: the uncompressed size in bytes

**See also:** #getSize()

Throws:

- `IllegalArgumentException`: if the specified size is less than 0, is greater than 0xFFFFFFFF when ZIP64 format is not supported, or is less than 0 when ZIP64 is supported

## ZipEntry.getSize()

```java
public long getSize()
```

Returns the uncompressed size of the entry data.

**Returns:** the uncompressed size of the entry data, or -1 if not known

**See also:** #setSize(long)

## ZipEntry.getCompressedSize()

```java
public long getCompressedSize()
```

Returns the size of the compressed entry data.

 In the case of a stored entry, the compressed size will be the same
as the uncompressed size of the entry.

**Returns:** the size of the compressed entry data, or -1 if not known

**See also:** #setCompressedSize(long)

## ZipEntry.setCompressedSize(long)

```java
public void setCompressedSize(long csize)
```

Sets the size of the compressed entry data.

Parameters:

- `csize`: the compressed size to set

**See also:** #getCompressedSize()

## ZipEntry.setCrc(long)

```java
public void setCrc(long crc)
```

Sets the CRC-32 checksum of the uncompressed entry data.

Parameters:

- `crc`: the CRC-32 value

**See also:** #getCrc()

Throws:

- `IllegalArgumentException`: if the specified CRC-32 value is less than 0 or greater than 0xFFFFFFFF

## ZipEntry.getCrc()

```java
public long getCrc()
```

Returns the CRC-32 checksum of the uncompressed entry data.

**Returns:** the CRC-32 checksum of the uncompressed entry data, or -1 if
not known

**See also:** #setCrc(long)

## ZipEntry.setMethod(int)

```java
public void setMethod(int method)
```

Sets the compression method for the entry.

Parameters:

- `method`: the compression method, either STORED or DEFLATED

**See also:** #getMethod()

Throws:

- `IllegalArgumentException`: if the specified compression method is invalid

## ZipEntry.getMethod()

```java
public int getMethod()
```

Returns the compression method of the entry.

**Returns:** the compression method of the entry, or -1 if not specified

**See also:** #setMethod(int)

## ZipEntry.setExtra(byte[])

```java
public void setExtra(byte[] extra)
```

Sets the optional extra field data for the entry.

 Invoking this method may change this entry's last modification
time, last access time and creation time, if the `extra` field
data includes the extensible timestamp fields, such as `NTFS tag 0x0001` or `Info-ZIP Extended Timestamp`, as specified in
Info-ZIP
Application Note 970311.

Parameters:

- `extra`: The extra field data bytes

**See also:** #getExtra()

Throws:

- `IllegalArgumentException`: if the combined length of the specified extra field data, the entry name, the entry comment, and the CEN Header size exceeds 65,535 bytes.

## ZipEntry.getExtra()

```java
public byte[] getExtra()
```

Returns the extra field data for the entry.

**Returns:** the extra field data for the entry, or null if none

**See also:** #setExtra(byte[])

## ZipEntry.setComment(String)

```java
public void setComment(String comment)
```

Sets the optional comment string for the entry.

Parameters:

- `comment`: the comment string

**See also:** #getComment()

Throws:

- `IllegalArgumentException`: if the combined length of the specified entry comment, the entry name, the extra field data, and the CEN Header size exceeds 65,535 bytes.

## ZipEntry.getComment()

```java
public String getComment()
```

Returns the comment string for the entry.

**Returns:** the comment string for the entry, or null if none

**See also:** #setComment(String)

## ZipEntry.isDirectory()

```java
public boolean isDirectory()
```

Returns true if this is a directory entry. A directory entry is
defined to be one whose name ends with a '/'.

**Returns:** true if this is a directory entry

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
