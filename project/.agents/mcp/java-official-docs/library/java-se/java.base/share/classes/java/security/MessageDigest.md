---
title: "MessageDigest class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/MessageDigest.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MessageDigest class (java.security)

```java
public abstract class MessageDigest extends MessageDigestSpi
```

This `MessageDigest` class provides applications the functionality of a
message digest algorithm, such as SHA-1 or SHA-256.
Message digests are secure one-way hash functions that take arbitrary-sized
data and output a fixed-length hash value.

A `MessageDigest` object starts out initialized. The data is
processed through it using the update
methods. At any point reset can be called
to reset the digest. Once all the data to be updated has been
updated, one of the digest methods should
be called to complete the hash computation.

The `digest` method can be called once for a given number
of updates. After `digest` has been called, the `MessageDigest`
object is reset to its initialized state.

Implementations are free to implement the Cloneable interface.
Client applications can test cloneability by attempting cloning
and catching the `CloneNotSupportedException`:

```java
MessageDigest md = MessageDigest.getInstance("SHA-256");

try {
    md.update(toChapter1);
    MessageDigest tc1 = md.clone();
    byte[] toChapter1Digest = tc1.digest();
    md.update(toChapter2);
    ...etc.
} catch (CloneNotSupportedException cnse) {
    throw new DigestException("couldn't make digest of partial content");
}
```

Note that if a given implementation is not cloneable, it is
still possible to compute intermediate digests by instantiating
several instances, if the number of digests is known in advance.

Note that this class is abstract and extends from
`MessageDigestSpi` for historical reasons.
Application developers should only take notice of the methods defined in
this `MessageDigest` class; all the methods in
the superclass are intended for cryptographic service providers who wish to
supply their own implementations of message digest algorithms.

 Every implementation of the Java platform is required to support
the following standard `MessageDigest` algorithms:

- `SHA-1`

- `SHA-256`

- `SHA-384`

These algorithms are described in the
MessageDigest section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

**Since:** 1.1

**See also:** DigestInputStream

**See also:** DigestOutputStream

## MessageDigest.MessageDigest(String)

```java
protected MessageDigest(String algorithm)
```

Creates a message digest with the specified algorithm name.

Parameters:

- `algorithm`: the standard name of the digest algorithm. See the MessageDigest section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

## MessageDigest.getInstance(String)

```java
public static MessageDigest getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a `MessageDigest` object that implements the specified
digest algorithm.

 This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new `MessageDigest` object encapsulating the
`MessageDigestSpi` implementation from the first
provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the algorithm requested. See the MessageDigest section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** a `MessageDigest` object that implements the
        specified algorithm

**See also:** Provider

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports a `MessageDigestSpi` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## MessageDigest.getInstance(String, String)

```java
public static MessageDigest getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `MessageDigest` object that implements the specified
digest algorithm.

 A new `MessageDigest` object encapsulating the
`MessageDigestSpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the algorithm requested. See the MessageDigest section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the name of the provider.

**Returns:** a `MessageDigest` object that implements the
        specified algorithm

**See also:** Provider

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `NoSuchAlgorithmException`: if a `MessageDigestSpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## MessageDigest.getInstance(String, Provider)

```java
public static MessageDigest getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a `MessageDigest` object that implements the specified
digest algorithm.

 A new `MessageDigest` object encapsulating the
`MessageDigestSpi` implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

Parameters:

- `algorithm`: the name of the algorithm requested. See the MessageDigest section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the provider.

**Returns:** a `MessageDigest` object that implements the
        specified algorithm

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the specified provider is `null`
- `NoSuchAlgorithmException`: if a `MessageDigestSpi` implementation for the specified algorithm is not available from the specified `Provider` object
- `NullPointerException`: if `algorithm` is `null`

## MessageDigest.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this message digest object.

**Returns:** the provider of this message digest object

## MessageDigest.update(byte)

```java
public void update(byte input)
```

Updates the digest using the specified byte.

Parameters:

- `input`: the byte with which to update the digest.

## MessageDigest.update(byte[], int, int)

```java
public void update(byte[] input, int offset, int len)
```

Updates the digest using the specified array of bytes, starting
at the specified offset.

Parameters:

- `input`: the array of bytes.
- `offset`: the offset to start from in the array of bytes.
- `len`: the number of bytes to use, starting at `offset`.

## MessageDigest.update(byte[])

```java
public void update(byte[] input)
```

Updates the digest using the specified array of bytes.

Parameters:

- `input`: the array of bytes.

## MessageDigest.update(ByteBuffer)

```java
public final void update(ByteBuffer input)
```

Update the digest using the specified ByteBuffer. The digest is
updated using the `input.remaining()` bytes starting
at `input.position()`.
Upon return, the buffer's position will be equal to its limit;
its limit will not have changed.

Parameters:

- `input`: the ByteBuffer

**Since:** 1.5

## MessageDigest.digest()

```java
public byte[] digest()
```

Completes the hash computation by performing final operations
such as padding. The digest is reset after this call is made.

**Returns:** the array of bytes for the resulting hash value.

## MessageDigest.digest(byte[], int, int)

```java
public int digest(byte[] buf, int offset, int len) throws DigestException
```

Completes the hash computation by performing final operations
such as padding. The digest is reset after this call is made.

Parameters:

- `buf`: output buffer for the computed digest
- `offset`: offset into the output buffer to begin storing the digest
- `len`: number of bytes within buf allotted for the digest

**Returns:** the number of bytes placed into `buf`

Throws:

- `DigestException`: if an error occurs.

## MessageDigest.digest(byte[])

```java
public byte[] digest(byte[] input)
```

Performs a final update on the digest using the specified array
of bytes, then completes the digest computation. That is, this
method first calls update(input),
passing the *input* array to the `update` method,
then calls digest().

Parameters:

- `input`: the input to be updated before the digest is completed.

**Returns:** the array of bytes for the resulting hash value.

## MessageDigest.toString()

```java
public String toString()
```

Returns a string representation of this message digest object.

## MessageDigest.isEqual(byte[], byte[])

```java
public static boolean isEqual(byte[] digesta, byte[] digestb)
```

Compares two digests for equality. Two digests are equal if they have
the same length and all bytes at corresponding positions are equal.

Parameters:

- `digesta`: one of the digests to compare.
- `digestb`: the other digest to compare.

**Implementation note:** All bytes in `digesta` are examined to determine equality, unless
`digestb` is `null` or has a length of zero bytes. If
`digestb` is not `null` and does not have a length of zero
bytes, then the calculation time depends only on the length of
`digesta`. It does not depend on the length of `digestb` or
the contents of `digesta` and `digestb`.

**Returns:** `true` if the digests are equal, `false` otherwise.

## MessageDigest.reset()

```java
public void reset()
```

Resets the digest for further use.

## MessageDigest.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns a string that identifies the algorithm, independent of
implementation details. The name should be a standard
Java Security name (such as "SHA-256").
See the MessageDigest section in the
Java Security Standard Algorithm Names Specification
for information about standard algorithm names.

**Returns:** the name of the algorithm

## MessageDigest.getDigestLength()

```java
public final int getDigestLength()
```

Returns the length of the digest in bytes, or 0 if this operation is
not supported by the provider and the implementation is not cloneable.

**Returns:** the digest length in bytes, or 0 if this operation is not
supported by the provider and the implementation is not cloneable.

**Since:** 1.2

## MessageDigest.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the implementation is cloneable.

**Returns:** a clone if the implementation is cloneable.

Throws:

- `CloneNotSupportedException`: if this is called on an implementation that does not support `Cloneable`.

## MessageDigest.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the delegate is cloneable.

**Returns:** a clone if the delegate is cloneable.

Throws:

- `CloneNotSupportedException`: if this is called on a delegate that does not support `Cloneable`.
