# MessageDigest class (java.security)

```java
public abstract class MessageDigest extends MessageDigestSpi
```

This {@code MessageDigest} class provides applications the functionality of a
message digest algorithm, such as SHA-1 or SHA-256.
Message digests are secure one-way hash functions that take arbitrary-sized
data and output a fixed-length hash value.

<p>A {@code MessageDigest} object starts out initialized. The data is
processed through it using the {@link #update(byte) update}
methods. At any point {@link #reset() reset} can be called
to reset the digest. Once all the data to be updated has been
updated, one of the {@link #digest() digest} methods should
be called to complete the hash computation.

<p>The {@code digest} method can be called once for a given number
of updates. After {@code digest} has been called, the {@code MessageDigest}
object is reset to its initialized state.

<p>Implementations are free to implement the Cloneable interface.
Client applications can test cloneability by attempting cloning
and catching the {@code CloneNotSupportedException}:

<pre>{@code
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
}</pre>

<p>Note that if a given implementation is not cloneable, it is
still possible to compute intermediate digests by instantiating
several instances, if the number of digests is known in advance.

<p>Note that this class is abstract and extends from
{@code MessageDigestSpi} for historical reasons.
Application developers should only take notice of the methods defined in
this {@code MessageDigest} class; all the methods in
the superclass are intended for cryptographic service providers who wish to
supply their own implementations of message digest algorithms.

<p> Every implementation of the Java platform is required to support
the following standard {@code MessageDigest} algorithms:
<ul>
<li>{@code SHA-1}</li>
<li>{@code SHA-256}</li>
<li>{@code SHA-384}</li>
</ul>
These algorithms are described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#messagedigest-algorithms">
MessageDigest section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Benjamin Renaud
@since 1.1

@see DigestInputStream
@see DigestOutputStream

## MessageDigest.MessageDigest(String)

```java
protected MessageDigest(String algorithm)
```

Creates a message digest with the specified algorithm name.

@param algorithm the standard name of the digest algorithm.
See the MessageDigest section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#messagedigest-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.
@spec security/standard-names.html Java Security Standard Algorithm Names

## MessageDigest.getInstance(String)

```java
public static MessageDigest getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code MessageDigest} object that implements the specified
digest algorithm.

<p> This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new {@code MessageDigest} object encapsulating the
{@code MessageDigestSpi} implementation from the first
provider that supports the specified algorithm is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred}
{@link Security#getProperty(String) Security} property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param algorithm the name of the algorithm requested.
See the MessageDigest section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#messagedigest-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code MessageDigest} object that implements the
        specified algorithm

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code MessageDigestSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## MessageDigest.getInstance(String, String)

```java
public static MessageDigest getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code MessageDigest} object that implements the specified
digest algorithm.

<p> A new {@code MessageDigest} object encapsulating the
{@code MessageDigestSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the algorithm requested.
See the MessageDigest section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#messagedigest-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code MessageDigest} object that implements the
        specified algorithm

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if a {@code MessageDigestSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## MessageDigest.getInstance(String, Provider)

```java
public static MessageDigest getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code MessageDigest} object that implements the specified
digest algorithm.

<p> A new {@code MessageDigest} object encapsulating the
{@code MessageDigestSpi} implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param algorithm the name of the algorithm requested.
See the MessageDigest section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#messagedigest-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code MessageDigest} object that implements the
        specified algorithm

@throws IllegalArgumentException if the specified provider is
        {@code null}

@throws NoSuchAlgorithmException if a {@code MessageDigestSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## MessageDigest.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this message digest object.

@return the provider of this message digest object

## MessageDigest.update(byte)

```java
public void update(byte input)
```

Updates the digest using the specified byte.

@param input the byte with which to update the digest.

## MessageDigest.update(byte[], int, int)

```java
public void update(byte[] input, int offset, int len)
```

Updates the digest using the specified array of bytes, starting
at the specified offset.

@param input the array of bytes.

@param offset the offset to start from in the array of bytes.

@param len the number of bytes to use, starting at
{@code offset}.

## MessageDigest.update(byte[])

```java
public void update(byte[] input)
```

Updates the digest using the specified array of bytes.

@param input the array of bytes.

## MessageDigest.update(ByteBuffer)

```java
public final void update(ByteBuffer input)
```

Update the digest using the specified ByteBuffer. The digest is
updated using the {@code input.remaining()} bytes starting
at {@code input.position()}.
Upon return, the buffer's position will be equal to its limit;
its limit will not have changed.

@param input the ByteBuffer
@since 1.5

## MessageDigest.digest()

```java
public byte[] digest()
```

Completes the hash computation by performing final operations
such as padding. The digest is reset after this call is made.

@return the array of bytes for the resulting hash value.

## MessageDigest.digest(byte[], int, int)

```java
public int digest(byte[] buf, int offset, int len) throws DigestException
```

Completes the hash computation by performing final operations
such as padding. The digest is reset after this call is made.

@param buf output buffer for the computed digest

@param offset offset into the output buffer to begin storing the digest

@param len number of bytes within buf allotted for the digest

@return the number of bytes placed into {@code buf}

@throws    DigestException if an error occurs.

## MessageDigest.digest(byte[])

```java
public byte[] digest(byte[] input)
```

Performs a final update on the digest using the specified array
of bytes, then completes the digest computation. That is, this
method first calls {@link #update(byte[]) update(input)},
passing the <i>input</i> array to the {@code update} method,
then calls {@link #digest() digest()}.

@param input the input to be updated before the digest is
completed.

@return the array of bytes for the resulting hash value.

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

@implNote
All bytes in {@code digesta} are examined to determine equality, unless
{@code digestb} is {@code null} or has a length of zero bytes. If
{@code digestb} is not {@code null} and does not have a length of zero
bytes, then the calculation time depends only on the length of
{@code digesta}. It does not depend on the length of {@code digestb} or
the contents of {@code digesta} and {@code digestb}.

@param digesta one of the digests to compare.

@param digestb the other digest to compare.

@return {@code true} if the digests are equal, {@code false} otherwise.

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
See the MessageDigest section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#messagedigest-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the name of the algorithm

## MessageDigest.getDigestLength()

```java
public final int getDigestLength()
```

Returns the length of the digest in bytes, or 0 if this operation is
not supported by the provider and the implementation is not cloneable.

@return the digest length in bytes, or 0 if this operation is not
supported by the provider and the implementation is not cloneable.

@since 1.2

## MessageDigest.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the implementation is cloneable.

@return a clone if the implementation is cloneable.

@throws    CloneNotSupportedException if this is called on an
implementation that does not support {@code Cloneable}.

## MessageDigest.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the delegate is cloneable.

@return a clone if the delegate is cloneable.

@throws    CloneNotSupportedException if this is called on a
delegate that does not support {@code Cloneable}.