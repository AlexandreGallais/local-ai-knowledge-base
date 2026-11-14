---
title: "MessageDigestSpi class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/MessageDigestSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MessageDigestSpi class (java.security)

```java
public abstract class MessageDigestSpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `MessageDigest` class, which provides the functionality
of a message digest algorithm, such as MD5 or SHA. Message digests are
secure one-way hash functions that take arbitrary-sized data and output a
fixed-length hash value.

 All the abstract methods in this class must be implemented by a
cryptographic service provider who wishes to supply the implementation
of a particular message digest algorithm.

 Implementations are free to implement the Cloneable interface.

**Since:** 1.2

**See also:** MessageDigest

## MessageDigestSpi.MessageDigestSpi()

```java
public MessageDigestSpi()
```

Constructor for subclasses to call.

## MessageDigestSpi.engineGetDigestLength()

```java
protected int engineGetDigestLength()
```

Returns the digest length in bytes.

This concrete method has been added to this previously-defined
abstract class. (For backwards compatibility, it cannot be abstract.)

The default behavior is to return 0.

This method may be overridden by a provider to return the digest
length.

**Returns:** the digest length in bytes.

**Since:** 1.2

## MessageDigestSpi.engineUpdate(byte)

```java
protected abstract void engineUpdate(byte input)
```

Updates the digest using the specified byte.

Parameters:

- `input`: the byte to use for the update.

## MessageDigestSpi.engineUpdate(byte[], int, int)

```java
protected abstract void engineUpdate(byte[] input, int offset, int len)
```

Updates the digest using the specified array of bytes,
starting at the specified offset.

Parameters:

- `input`: the array of bytes to use for the update.
- `offset`: the offset to start from in the array of bytes.
- `len`: the number of bytes to use, starting at `offset`.

## MessageDigestSpi.engineUpdate(ByteBuffer)

```java
protected void engineUpdate(ByteBuffer input)
```

Update the digest using the specified ByteBuffer. The digest is
updated using the `input.remaining()` bytes starting
at `input.position()`.
Upon return, the buffer's position will be equal to its limit;
its limit will not have changed.

Parameters:

- `input`: the ByteBuffer

**Since:** 1.5

## MessageDigestSpi.engineDigest()

```java
protected abstract byte[] engineDigest()
```

Completes the hash computation by performing final
operations such as padding. Once `engineDigest` has
been called, the engine should be reset (see
engineReset).
Resetting is the responsibility of the
engine implementor.

**Returns:** the array of bytes for the resulting hash value.

## MessageDigestSpi.engineDigest(byte[], int, int)

```java
protected int engineDigest(byte[] buf, int offset, int len) throws DigestException
```

Completes the hash computation by performing final
operations such as padding. Once `engineDigest` has
been called, the engine should be reset (see
engineReset).
Resetting is the responsibility of the
engine implementor.

This method should be abstract, but we leave it concrete for
binary compatibility.  Knowledgeable providers should override this
method.

Parameters:

- `buf`: the output buffer in which to store the digest
- `offset`: offset to start from in the output buffer
- `len`: number of bytes within `buf` allotted for the digest. Both this default implementation and the SUN provider do not return partial digests. The presence of this parameter is solely for consistency in our API's. If the value of this parameter is less than the actual digest length, the method will throw a `DigestException`. This parameter is ignored if its value is greater than or equal to the actual digest length.

**Returns:** the length of the digest stored in the output buffer.

**Since:** 1.2

Throws:

- `DigestException`: if an error occurs.

## MessageDigestSpi.engineReset()

```java
protected abstract void engineReset()
```

Resets the digest for further use.

## MessageDigestSpi.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the implementation is cloneable.

**Returns:** a clone if the implementation is cloneable.

Throws:

- `CloneNotSupportedException`: if this is called on an implementation that does not support `Cloneable`.
