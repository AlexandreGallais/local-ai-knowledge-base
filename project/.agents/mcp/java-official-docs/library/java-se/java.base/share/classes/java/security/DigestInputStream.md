---
title: "DigestInputStream class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DigestInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DigestInputStream class (java.security)

```java
public class DigestInputStream extends FilterInputStream
```

A transparent stream that updates the associated message digest using
the bits going through the stream.

To complete the message digest computation, call one of the
`digest` methods on the associated message
digest after your calls to one of this digest input stream's
read methods.

It is possible to turn this stream on or off (see
on). When it is on, a call to one of the
`read` methods
results in an update on the message digest.  But when it is off,
the message digest is not updated. The default is for the stream
to be on.

Note that digest objects can compute only one digest (see
`MessageDigest`),
so that in order to compute intermediate digests, a caller should
retain a handle onto the digest object, and clone it for each
digest to be computed, leaving the original digest untouched.

**Implementation note:** This implementation only updates the message digest
     with data actually read from the input stream when it is
     turned on. This includes the various
     `read` methods, `transferTo`, `readAllBytes`,
     and `readNBytes`. Please note that data bypassed by the
     `skip` method are ignored. On the other hand,
     if the underlying stream supports the `mark` and
     `reset` methods, and the same data is read again after
     `reset`, then the message digest is updated again.

**See also:** MessageDigest

**See also:** DigestOutputStream

**Since:** 1.2

## DigestInputStream.digest

```java
protected MessageDigest digest
```

The message digest associated with this stream.

## DigestInputStream.DigestInputStream(InputStream, MessageDigest)

```java
public DigestInputStream(InputStream stream, MessageDigest digest)
```

Creates a digest input stream, using the specified input stream
and message digest.

Parameters:

- `stream`: the input stream.
- `digest`: the message digest to associate with this stream.

## DigestInputStream.getMessageDigest()

```java
public MessageDigest getMessageDigest()
```

Returns the message digest associated with this stream.

**Returns:** the message digest associated with this stream.

**See also:** #setMessageDigest(java.security.MessageDigest)

## DigestInputStream.setMessageDigest(MessageDigest)

```java
public void setMessageDigest(MessageDigest digest)
```

Associates the specified message digest with this stream.

Parameters:

- `digest`: the message digest to be associated with this stream.

**See also:** #getMessageDigest()

## DigestInputStream.read()

```java
public int read() throws IOException
```

Reads a byte, and updates the message digest (if the digest
function is on).  That is, this method reads a byte from the
input stream, blocking until the byte is actually read. If the
digest function is on (see on), this method
will then call `update` on the message digest associated
with this stream, passing it the byte read.

**Returns:** the byte read.

**See also:** MessageDigest#update(byte)

Throws:

- `IOException`: if an I/O error occurs.

## DigestInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads into a byte array, and updates the message digest (if the
digest function is on).  That is, this method reads up to
`len` bytes from the input stream into the array
`b`, starting at offset `off`. This method
blocks until the data is actually
read. If the digest function is on (see
on), this method will then call `update`
on the message digest associated with this stream, passing it
the data.

Parameters:

- `b`: the array into which the data is read.
- `off`: the starting offset into `b` of where the data should be placed.
- `len`: the maximum number of bytes to be read from the input stream into b, starting at offset `off`.

**Returns:** the actual number of bytes read. This is less than
`len` if the end of the stream is reached prior to
reading `len` bytes. -1 is returned if no bytes were
read because the end of the stream had already been reached when
the call was made.

**See also:** MessageDigest#update(byte[], int, int)

Throws:

- `IOException`: if an I/O error occurs.

## DigestInputStream.on(boolean)

```java
public void on(boolean on)
```

Turns the digest function on or off. The default is on.  When
it is on, a call to one of the `read` methods results in an
update on the message digest.  But when it is off, the message
digest is not updated.

Parameters:

- `on`: `true` to turn the digest function on, `false` to turn it off.

## DigestInputStream.toString()

```java
public String toString()
```

Prints a string representation of this digest input stream and
its associated message digest object.
