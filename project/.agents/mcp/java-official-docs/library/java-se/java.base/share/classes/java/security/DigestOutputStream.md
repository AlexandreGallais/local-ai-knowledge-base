---
title: "DigestOutputStream class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DigestOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DigestOutputStream class (java.security)

```java
public class DigestOutputStream extends FilterOutputStream
```

A transparent stream that updates the associated message digest using
the bits going through the stream.

To complete the message digest computation, call one of the
`digest` methods on the associated message
digest after your calls to one of this digest output stream's
write methods.

It is possible to turn this stream on or off (see
on). When it is on, a call to one of the
`write` methods results in
an update on the message digest.  But when it is off, the message
digest is not updated. The default is for the stream to be on.

**See also:** MessageDigest

**See also:** DigestInputStream

**Since:** 1.2

## DigestOutputStream.digest

```java
protected MessageDigest digest
```

The message digest associated with this stream.

## DigestOutputStream.DigestOutputStream(OutputStream, MessageDigest)

```java
public DigestOutputStream(OutputStream stream, MessageDigest digest)
```

Creates a digest output stream, using the specified output stream
and message digest.

Parameters:

- `stream`: the output stream.
- `digest`: the message digest to associate with this stream.

## DigestOutputStream.getMessageDigest()

```java
public MessageDigest getMessageDigest()
```

Returns the message digest associated with this stream.

**Returns:** the message digest associated with this stream.

**See also:** #setMessageDigest(java.security.MessageDigest)

## DigestOutputStream.setMessageDigest(MessageDigest)

```java
public void setMessageDigest(MessageDigest digest)
```

Associates the specified message digest with this stream.

Parameters:

- `digest`: the message digest to be associated with this stream.

**See also:** #getMessageDigest()

## DigestOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Updates the message digest (if the digest function is on) using
the specified byte, and in any case writes the byte
to the output stream. That is, if the digest function is on
(see on), this method calls
`update` on the message digest associated with this
stream, passing it the byte `b`. This method then
writes the byte to the output stream, blocking until the byte
is actually written.

Parameters:

- `b`: the byte to be used for updating and writing to the output stream.

**See also:** MessageDigest#update(byte)

Throws:

- `IOException`: if an I/O error occurs.

## DigestOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Updates the message digest (if the digest function is on) using
the specified subarray, and in any case writes the subarray to
the output stream. That is, if the digest function is on (see
on), this method calls `update`
on the message digest associated with this stream, passing it
the subarray specifications. This method then writes the subarray
bytes to the output stream, blocking until the bytes are actually
written.

Parameters:

- `b`: the array containing the subarray to be used for updating and writing to the output stream.
- `off`: the offset into `b` of the first byte to be updated and written.
- `len`: the number of bytes of data to be updated and written from `b`, starting at offset `off`.

**See also:** MessageDigest#update(byte[], int, int)

Throws:

- `IOException`: if an I/O error occurs.

## DigestOutputStream.on(boolean)

```java
public void on(boolean on)
```

Turns the digest function on or off. The default is on.  When
it is on, a call to one of the `write` methods results in an
update on the message digest.  But when it is off, the message
digest is not updated.

Parameters:

- `on`: `true` to turn the digest function on, `false` to turn it off.

## DigestOutputStream.toString()

```java
public String toString()
```

Prints a string representation of this digest output stream and
its associated message digest object.
