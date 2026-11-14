---
title: "ObjectStreamConstants interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectStreamConstants.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectStreamConstants interface (java.io)

```java
public interface ObjectStreamConstants
```

Constants written into the Object Serialization Stream.

**Since:** 1.1

## ObjectStreamConstants.STREAM_MAGIC

```java
static final short STREAM_MAGIC
```

Magic number that is written to the stream header.

## ObjectStreamConstants.STREAM_VERSION

```java
static final short STREAM_VERSION
```

Version number that is written to the stream header.

## ObjectStreamConstants.TC_BASE

```java
static final byte TC_BASE
```

First tag value.

## ObjectStreamConstants.TC_NULL

```java
static final byte TC_NULL
```

Null object reference.

## ObjectStreamConstants.TC_REFERENCE

```java
static final byte TC_REFERENCE
```

Reference to an object already written into the stream.

## ObjectStreamConstants.TC_CLASSDESC

```java
static final byte TC_CLASSDESC
```

new Class Descriptor.

## ObjectStreamConstants.TC_OBJECT

```java
static final byte TC_OBJECT
```

new Object.

## ObjectStreamConstants.TC_STRING

```java
static final byte TC_STRING
```

new String.

## ObjectStreamConstants.TC_ARRAY

```java
static final byte TC_ARRAY
```

new Array.

## ObjectStreamConstants.TC_CLASS

```java
static final byte TC_CLASS
```

Reference to Class.

## ObjectStreamConstants.TC_BLOCKDATA

```java
static final byte TC_BLOCKDATA
```

Block of optional data. Byte following tag indicates number
of bytes in this block data.

## ObjectStreamConstants.TC_ENDBLOCKDATA

```java
static final byte TC_ENDBLOCKDATA
```

End of optional block data blocks for an object.

## ObjectStreamConstants.TC_RESET

```java
static final byte TC_RESET
```

Reset stream context. All handles written into stream are reset.

## ObjectStreamConstants.TC_BLOCKDATALONG

```java
static final byte TC_BLOCKDATALONG
```

long Block data. The long following the tag indicates the
number of bytes in this block data.

## ObjectStreamConstants.TC_EXCEPTION

```java
static final byte TC_EXCEPTION
```

Exception during write.

## ObjectStreamConstants.TC_LONGSTRING

```java
static final byte TC_LONGSTRING
```

Long string.

## ObjectStreamConstants.TC_PROXYCLASSDESC

```java
static final byte TC_PROXYCLASSDESC
```

new Proxy Class Descriptor.

## ObjectStreamConstants.TC_ENUM

```java
static final byte TC_ENUM
```

new Enum constant.

**Since:** 1.5

## ObjectStreamConstants.TC_MAX

```java
static final byte TC_MAX
```

Last tag value.

## ObjectStreamConstants.baseWireHandle

```java
static final int baseWireHandle
```

First wire handle to be assigned.

## ObjectStreamConstants.SC_WRITE_METHOD

```java
static final byte SC_WRITE_METHOD
```

Bit mask for ObjectStreamClass flag. Indicates a Serializable class
defines its own writeObject method.

## ObjectStreamConstants.SC_BLOCK_DATA

```java
static final byte SC_BLOCK_DATA
```

Bit mask for ObjectStreamClass flag. Indicates Externalizable data
written in Block Data mode.
Added for PROTOCOL_VERSION_2.

**See also:** #PROTOCOL_VERSION_2

**Since:** 1.2

## ObjectStreamConstants.SC_SERIALIZABLE

```java
static final byte SC_SERIALIZABLE
```

Bit mask for ObjectStreamClass flag. Indicates class is Serializable.

## ObjectStreamConstants.SC_EXTERNALIZABLE

```java
static final byte SC_EXTERNALIZABLE
```

Bit mask for ObjectStreamClass flag. Indicates class is Externalizable.

## ObjectStreamConstants.SC_ENUM

```java
static final byte SC_ENUM
```

Bit mask for ObjectStreamClass flag. Indicates class is an enum type.

**Since:** 1.5

## ObjectStreamConstants.SUBSTITUTION_PERMISSION

```java
static final SerializablePermission SUBSTITUTION_PERMISSION
```

Enable substitution of one object for another during
serialization/deserialization.

**See also:** java.io.ObjectOutputStream#enableReplaceObject(boolean)

**See also:** java.io.ObjectInputStream#enableResolveObject(boolean)

**Since:** 1.2

## ObjectStreamConstants.SUBCLASS_IMPLEMENTATION_PERMISSION

```java
static final SerializablePermission SUBCLASS_IMPLEMENTATION_PERMISSION
```

Enable overriding of readObject and writeObject.

**See also:** java.io.ObjectOutputStream#writeObjectOverride(Object)

**See also:** java.io.ObjectInputStream#readObjectOverride()

**Since:** 1.2

## ObjectStreamConstants.SERIAL_FILTER_PERMISSION

```java
static final SerializablePermission SERIAL_FILTER_PERMISSION
```

Enable setting the system-wide serial filter.

**See also:** java.io.ObjectInputFilter.Config#setSerialFilter(ObjectInputFilter)

**Since:** 9

## ObjectStreamConstants.PROTOCOL_VERSION_1

```java
public static final int PROTOCOL_VERSION_1
```

A Stream Protocol Version.

All externalizable data is written in JDK 1.1 external data
format after calling this method. This version is needed to write
streams containing Externalizable data that can be read by
pre-JDK 1.1.6 JVMs.

**See also:** java.io.ObjectOutputStream#useProtocolVersion(int)

**Since:** 1.2

## ObjectStreamConstants.PROTOCOL_VERSION_2

```java
public static final int PROTOCOL_VERSION_2
```

A Stream Protocol Version.

This protocol is written by JVM 1.2.

Externalizable data is written in block data mode and is
terminated with TC_ENDBLOCKDATA. Externalizable class descriptor
flags has SC_BLOCK_DATA enabled. JVM 1.1.6 and greater can
read this format change.

Enables writing a nonSerializable class descriptor into the
stream. The serialVersionUID of a nonSerializable class is
set to 0L.

**See also:** java.io.ObjectOutputStream#useProtocolVersion(int)

**See also:** #SC_BLOCK_DATA

**Since:** 1.2
