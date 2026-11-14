# Signature class (java.security)

```java
public abstract class Signature extends SignatureSpi
```

The {@code Signature} class is used to provide applications the functionality
of a digital signature algorithm. Digital signatures are used for
authentication and integrity assurance of digital data.

<p> The signature algorithm can be, among others, the NIST standard
DSA, using DSA and SHA-256. The DSA algorithm using the
SHA-256 message digest algorithm can be specified as {@code SHA256withDSA}.
In the case of RSA the signing algorithm could be specified as, for example,
{@code SHA256withRSA}.
The algorithm name must be specified, as there is no default.

<p> A {@code Signature} object can be used to generate and verify digital
signatures.

<p> There are three phases to the use of a {@code Signature} object for
either signing data or verifying a signature:<ol>

<li>Initialization, with either

    <ul>

    <li>a public key, which initializes the signature for
    verification (see {@link #initVerify(PublicKey) initVerify}), or

    <li>a private key (and optionally a Secure Random Number Generator),
    which initializes the signature for signing
    (see {@link #initSign(PrivateKey)}
    and {@link #initSign(PrivateKey, SecureRandom)}).

    </ul>

<li>Updating

<p>Depending on the type of initialization, this will update the
bytes to be signed or verified. See the
{@link #update(byte) update} methods.

<li>Signing or Verifying a signature on all updated bytes. See the
{@link #sign() sign} methods and the {@link #verify(byte[]) verify}
method.

</ol>

<p>Note that this class is abstract and extends from
{@code SignatureSpi} for historical reasons.
Application developers should only take notice of the methods defined in
this {@code Signature} class; all the methods in
the superclass are intended for cryptographic service providers who wish to
supply their own implementations of digital signature algorithms.

<p> Every implementation of the Java platform is required to support the
following standard {@code Signature} algorithms. For the "RSASSA-PSS"
algorithm, implementations must support the parameters in parentheses. For
the "SHA256withECDSA" and "SHA384withECDSA" algorithms, implementations must
support the curves in parentheses.
<ul>
<li>{@code RSASSA-PSS} (MGF1 mask generation function and SHA-256 or SHA-384
     hash algorithms)</li>
<li>{@code SHA1withDSA}</li>
<li>{@code SHA256withDSA}</li>
<li>{@code SHA256withECDSA} (secp256r1)</li>
<li>{@code SHA384withECDSA} (secp384r1)</li>
<li>{@code SHA1withRSA}</li>
<li>{@code SHA256withRSA}</li>
<li>{@code SHA384withRSA}</li>
</ul>
These algorithms are described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#signature-algorithms">
Signature section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Benjamin Renaud
@since 1.1

## Signature.UNINITIALIZED

```java
protected static final int UNINITIALIZED
```

Possible {@link #state} value, signifying that
this {@code Signature} object has not yet been initialized.

## Signature.SIGN

```java
protected static final int SIGN
```

Possible {@link #state} value, signifying that
this {@code Signature} object has been initialized for signing.

## Signature.VERIFY

```java
protected static final int VERIFY
```

Possible {@link #state} value, signifying that
this {@code Signature} object has been initialized for verification.

## Signature.state

```java
protected int state
```

Current state of this {@code Signature} object.

## Signature.Signature(String)

```java
protected Signature(String algorithm)
```

Creates a {@code Signature} object for the specified algorithm.

@param algorithm the standard string name of the algorithm.
See the Signature section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#signature-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.
@spec security/standard-names.html Java Security Standard Algorithm Names

## Signature.getInstance(String)

```java
public static Signature getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code Signature} object that implements the specified
signature algorithm.

<p> This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new {@code Signature} object encapsulating the
{@code SignatureSpi} implementation from the first
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

@param algorithm the standard name of the algorithm requested.
See the Signature section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#signature-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code Signature} object

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code Signature} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## Signature.getInstance(String, String)

```java
public static Signature getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code Signature} object that implements the specified
signature algorithm.

<p> A new {@code Signature} object encapsulating the
{@code SignatureSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the algorithm requested.
See the Signature section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#signature-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code Signature} object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if a {@code SignatureSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## Signature.getInstance(String, Provider)

```java
public static Signature getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code Signature} object that implements the specified
signature algorithm.

<p> A new {@code Signature} object encapsulating the
{@code SignatureSpi} implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param algorithm the name of the algorithm requested.
See the Signature section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#signature-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code Signature} object

@throws IllegalArgumentException if the provider is {@code null}

@throws NoSuchAlgorithmException if a {@code SignatureSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## Signature.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this {@code Signature} object.

@return the provider of this {@code Signature} object

## Signature.initVerify(PublicKey)

```java
public final void initVerify(PublicKey publicKey) throws InvalidKeyException
```

Initializes this object for verification. If this method is called
again with a different argument, it negates the effect
of this call.

@param publicKey the public key of the identity whose signature is
going to be verified.

@throws    InvalidKeyException if the key is invalid.

## Signature.initVerify(Certificate)

```java
public final void initVerify(Certificate certificate) throws InvalidKeyException
```

Initializes this object for verification, using the public key from
the given certificate.
<p>If the certificate is of type X.509 and has a <i>key usage</i>
extension field marked as critical, and the value of the <i>key usage</i>
extension field implies that the public key in
the certificate and its corresponding private key are not
supposed to be used for digital signatures, an
{@code InvalidKeyException} is thrown.

@param certificate the certificate of the identity whose signature is
going to be verified.

@throws    InvalidKeyException  if the public key in the certificate
is not encoded properly or does not include required  parameter
information or cannot be used for digital signature purposes.
@since 1.3

## Signature.initSign(PrivateKey)

```java
public final void initSign(PrivateKey privateKey) throws InvalidKeyException
```

Initialize this object for signing. If this method is called
again with a different argument, it negates the effect
of this call.

@param privateKey the private key of the identity whose signature
is going to be generated.

@throws    InvalidKeyException if the key is invalid.

## Signature.initSign(PrivateKey, SecureRandom)

```java
public final void initSign(PrivateKey privateKey, SecureRandom random) throws InvalidKeyException
```

Initialize this object for signing. If this method is called
again with a different argument, it negates the effect
of this call.

@param privateKey the private key of the identity whose signature
is going to be generated

@param random the source of randomness for this {@code Signature} object

@throws    InvalidKeyException if the key is invalid.

## Signature.sign()

```java
public final byte[] sign() throws SignatureException
```

Returns the signature bytes of all the data updated.
The format of the signature depends on the underlying
signature scheme.

<p>A call to this method resets this {@code Signature} object to the
state it was in when previously initialized for signing via a
call to {@code initSign(PrivateKey)}. That is, the object is
reset and available to generate another signature from the same
signer, if desired, via new calls to {@code update} and
{@code sign}.

@return the signature bytes of the signing operation's result.

@throws    SignatureException if this {@code Signature} object is not
initialized properly or if this signature algorithm is unable to
process the input data provided.

## Signature.sign(byte[], int, int)

```java
public final int sign(byte[] outbuf, int offset, int len) throws SignatureException
```

Finishes the signature operation and stores the resulting signature
bytes in the provided buffer {@code outbuf}, starting at
{@code offset}.
The format of the signature depends on the underlying
signature scheme.

<p>This {@code Signature} object is reset to its initial state (the
state it was in after a call to one of the {@code initSign} methods) and
can be reused to generate further signatures with the same private key.

@param outbuf buffer for the signature result.

@param offset offset into {@code outbuf} where the signature is
stored.

@param len number of bytes within {@code outbuf} allotted for the
signature.

@return the number of bytes placed into {@code outbuf}.

@throws    SignatureException if this {@code Signature} object is not
    initialized properly, if this signature algorithm is unable to
    process the input data provided, or if {@code len} is less
    than the actual signature length.
@throws    IllegalArgumentException if {@code outbuf} is {@code null},
    or {@code offset} or {@code len} is less than 0, or the sum of
    {@code offset} and {@code len} is greater than the length of
    {@code outbuf}.

@since 1.2

## Signature.verify(byte[])

```java
public final boolean verify(byte[] signature) throws SignatureException
```

Verifies the passed-in signature.

<p>A call to this method resets this {@code Signature} object to the
state it was in when previously initialized for verification via a
call to {@code initVerify(PublicKey)}. That is, the object is
reset and available to verify another signature from the identity
whose public key was specified in the call to {@code initVerify}.

@param signature the signature bytes to be verified.

@return {@code true} if the signature was verified, {@code false} if not.

@throws    SignatureException if this {@code Signature} object is not
initialized properly, the passed-in signature is improperly
encoded or of the wrong type, if this signature algorithm is unable to
process the input data provided, etc.

## Signature.verify(byte[], int, int)

```java
public final boolean verify(byte[] signature, int offset, int length) throws SignatureException
```

Verifies the passed-in signature in the specified array
of bytes, starting at the specified offset.

<p>A call to this method resets this {@code Signature} object to the
state it was in when previously initialized for verification via a
call to {@code initVerify(PublicKey)}. That is, the object is
reset and available to verify another signature from the identity
whose public key was specified in the call to {@code initVerify}.


@param signature the signature bytes to be verified.
@param offset the offset to start from in the array of bytes.
@param length the number of bytes to use, starting at offset.

@return {@code true} if the signature was verified, {@code false} if not.

@throws    SignatureException if this {@code Signature} object is not
initialized properly, the passed-in signature is improperly
encoded or of the wrong type, if this signature algorithm is unable to
process the input data provided, etc.
@throws    IllegalArgumentException if the {@code signature}
byte array is {@code null}, or the {@code offset} or {@code length}
is less than 0, or the sum of the {@code offset} and
{@code length} is greater than the length of the
{@code signature} byte array.
@since 1.4

## Signature.update(byte)

```java
public final void update(byte b) throws SignatureException
```

Updates the data to be signed or verified by a byte.

@param b the byte to use for the update.

@throws    SignatureException if this {@code Signature} object is not
initialized properly.

## Signature.update(byte[])

```java
public final void update(byte[] data) throws SignatureException
```

Updates the data to be signed or verified, using the specified
array of bytes.

@param data the byte array to use for the update.

@throws    SignatureException if this {@code Signature} object is not
initialized properly.

## Signature.update(byte[], int, int)

```java
public final void update(byte[] data, int off, int len) throws SignatureException
```

Updates the data to be signed or verified, using the specified
array of bytes, starting at the specified offset.

@param data the array of bytes.
@param off the offset to start from in the array of bytes.
@param len the number of bytes to use, starting at offset.

@throws    SignatureException if this {@code Signature} object is not
    initialized properly.
@throws    IllegalArgumentException if {@code data} is {@code null},
    or {@code off} or {@code len} is less than 0, or the sum of
    {@code off} and {@code len} is greater than the length of
    {@code data}.

## Signature.update(ByteBuffer)

```java
public final void update(ByteBuffer data) throws SignatureException
```

Updates the data to be signed or verified using the specified
ByteBuffer. Processes the {@code data.remaining()} bytes
starting at {@code data.position()}.
Upon return, the buffer's position will be equal to its limit;
its limit will not have changed.

@param data the ByteBuffer

@throws    SignatureException if this {@code Signature} object is not
initialized properly.
@since 1.5

## Signature.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the name of the algorithm for this {@code Signature} object.

@return the name of the algorithm for this {@code Signature} object.

## Signature.toString()

```java
public String toString()
```

Returns a string representation of this {@code Signature} object,
providing information that includes the state of the object
and the name of the algorithm used.

@return a string representation of this {@code Signature} object.

## Signature.setParameter(String, Object)

```java
public final void setParameter(String param, Object value) throws InvalidParameterException
```

Sets the specified algorithm parameter to the specified value.
This method supplies a general-purpose mechanism through
which it is possible to set the various parameters of this object.
A parameter may be any settable parameter for the algorithm, such as
a parameter size, or a source of random bits for signature generation
(if appropriate), or an indication of whether to perform
a specific but optional computation. A uniform algorithm-specific
naming scheme for each parameter is desirable but left unspecified
at this time.

@param param the string identifier of the parameter
@param value the parameter value

@throws    InvalidParameterException if {@code param} is an
invalid parameter for this {@code Signature} object,
the parameter is already set
and cannot be set again, a security exception occurs, and so on.

@see #getParameter

@deprecated Use
{@link #setParameter(java.security.spec.AlgorithmParameterSpec)
setParameter}.

## Signature.setParameter(AlgorithmParameterSpec)

```java
public final void setParameter(AlgorithmParameterSpec params) throws InvalidAlgorithmParameterException
```

Initializes this {@code Signature} object with the specified parameter
values.

@param params the parameter values

@throws InvalidAlgorithmParameterException if the given parameter values
are inappropriate for this {@code Signature} object

@see #getParameters

## Signature.getParameters()

```java
public final AlgorithmParameters getParameters()
```

Returns the parameters used with this {@code Signature} object.

<p>The returned parameters may be the same that were used to initialize
this {@code Signature} object, or may contain additional default or
random parameter values used by the underlying signature scheme.
If the required parameters were not supplied and can be generated by
the {@code Signature} object, the generated parameters are returned;
otherwise {@code null} is returned.

<p>However, if the signature scheme does not support returning
the parameters as {@code AlgorithmParameters}, {@code null} is always
returned.

@return the parameters used with this {@code Signature} object,
or {@code null}
@throws UnsupportedOperationException if the provider does not support
this method

@see #setParameter(AlgorithmParameterSpec)
@since 1.4

## Signature.getParameter(String)

```java
public final Object getParameter(String param) throws InvalidParameterException
```

Gets the value of the specified algorithm parameter. This method
supplies a general-purpose mechanism through which it is possible to
get the various parameters of this object. A parameter may be any
settable parameter for the algorithm, such as a parameter size, or
a source of random bits for signature generation (if appropriate),
or an indication of whether to perform a specific but optional
computation. A uniform algorithm-specific naming scheme for each
parameter is desirable but left unspecified at this time.

@param param the string name of the parameter.

@return the object that represents the parameter value, or {@code null} if
there is none.

@throws    InvalidParameterException if {@code param} is an invalid
parameter for this engine, or another exception occurs while
trying to get this parameter.

@see #setParameter(String, Object)

@deprecated

## Signature.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the implementation is cloneable.

@return a clone if the implementation is cloneable.

@throws    CloneNotSupportedException if this is called
on an implementation that does not support {@code Cloneable}.

## Signature.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the delegate is cloneable.

@return a clone if the delegate is cloneable.

@throws    CloneNotSupportedException if this is called on a
delegate that does not support {@code Cloneable}.