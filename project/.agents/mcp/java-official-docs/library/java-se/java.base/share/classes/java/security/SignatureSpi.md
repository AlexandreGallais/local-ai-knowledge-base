# SignatureSpi class (java.security)

```java
public abstract class SignatureSpi
```

This class defines the <i>Service Provider Interface</i> (<b>SPI</b>)
for the {@code Signature} class, which is used to provide the
functionality of a digital signature algorithm. Digital signatures are used
for authentication and integrity assurance of digital data.

<p> All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply the implementation
of a particular signature algorithm.

@author Benjamin Renaud
@since 1.2


@see Signature

## SignatureSpi.SignatureSpi()

```java
public SignatureSpi()
```

Constructor for subclasses to call.

## SignatureSpi.appRandom

```java
protected SecureRandom appRandom
```

Application-specified source of randomness.

## SignatureSpi.engineInitVerify(PublicKey)

```java
protected abstract void engineInitVerify(PublicKey publicKey) throws InvalidKeyException
```

Initializes this {@code Signature} object with the specified
public key for verification operations.

@param publicKey the public key of the identity whose signature is
going to be verified.

@throws    InvalidKeyException if the key is improperly
encoded, parameters are missing, and so on.

## SignatureSpi.engineInitSign(PrivateKey)

```java
protected abstract void engineInitSign(PrivateKey privateKey) throws InvalidKeyException
```

Initializes this {@code Signature} object with the specified
private key for signing operations.

@param privateKey the private key of the identity whose signature
will be generated.

@throws    InvalidKeyException if the key is improperly
encoded, parameters are missing, and so on.

## SignatureSpi.engineInitSign(PrivateKey, SecureRandom)

```java
protected void engineInitSign(PrivateKey privateKey, SecureRandom random) throws InvalidKeyException
```

Initializes this {@code Signature} object with the specified
private key and source of randomness for signing operations.

<p>This concrete method has been added to this previously-defined
abstract class. (For backwards compatibility, it cannot be abstract.)

@param privateKey the private key of the identity whose signature
will be generated.
@param random the source of randomness

@throws    InvalidKeyException if the key is improperly
encoded, parameters are missing, and so on.

## SignatureSpi.engineUpdate(byte)

```java
protected abstract void engineUpdate(byte b) throws SignatureException
```

Updates the data to be signed or verified
using the specified byte.

@param b the byte to use for the update.

@throws    SignatureException if the engine is not initialized
properly.

## SignatureSpi.engineUpdate(byte[], int, int)

```java
protected abstract void engineUpdate(byte[] b, int off, int len) throws SignatureException
```

Updates the data to be signed or verified, using the
specified array of bytes, starting at the specified offset.

@param b the array of bytes
@param off the offset to start from in the array of bytes
@param len the number of bytes to use, starting at offset

@throws    SignatureException if the engine is not initialized
properly

## SignatureSpi.engineUpdate(ByteBuffer)

```java
protected void engineUpdate(ByteBuffer input)
```

Updates the data to be signed or verified using the specified
ByteBuffer. Processes the {@code data.remaining()} bytes
starting at {@code data.position()}.
Upon return, the buffer's position will be equal to its limit;
its limit will not have changed.

@param input the ByteBuffer
@since 1.5

## SignatureSpi.engineSign()

```java
protected abstract byte[] engineSign() throws SignatureException
```

Returns the signature bytes of all the data
updated so far.
The format of the signature depends on the underlying
signature scheme.

@return the signature bytes of the signing operation's result.

@throws    SignatureException if the engine is not
initialized properly or if this signature algorithm is unable to
process the input data provided.

## SignatureSpi.engineSign(byte[], int, int)

```java
protected int engineSign(byte[] outbuf, int offset, int len) throws SignatureException
```

Finishes this signature operation and stores the resulting signature
bytes in the provided buffer {@code outbuf}, starting at
{@code offset}.
The format of the signature depends on the underlying
signature scheme.

<p>The signature implementation is reset to its initial state
(the state it was in after a call to one of the
{@code engineInitSign} methods)
and can be reused to generate further signatures with the same private
key.

This method should be abstract, but we leave it concrete for
binary compatibility.  Knowledgeable providers should override this
method.

@param outbuf buffer for the signature result.

@param offset offset into {@code outbuf} where the signature is
stored.

@param len number of bytes within {@code outbuf} allotted for the
signature.
Both this default implementation and the SUN provider do not
return partial digests. If the value of this parameter is less
than the actual signature length, this method will throw a
{@code SignatureException}.
This parameter is ignored if its value is greater than or equal to
the actual signature length.

@return the number of bytes placed into {@code outbuf}

@throws    SignatureException if the engine is not
initialized properly, if this signature algorithm is unable to
process the input data provided, or if {@code len} is less
than the actual signature length.

@since 1.2

## SignatureSpi.engineVerify(byte[])

```java
protected abstract boolean engineVerify(byte[] sigBytes) throws SignatureException
```

Verifies the passed-in signature.

@param sigBytes the signature bytes to be verified.

@return {@code true} if the signature was verified, {@code false} if not.

@throws    SignatureException if the engine is not
initialized properly, the passed-in signature is improperly
encoded or of the wrong type, if this signature algorithm is unable to
process the input data provided, etc.

## SignatureSpi.engineVerify(byte[], int, int)

```java
protected boolean engineVerify(byte[] sigBytes, int offset, int length) throws SignatureException
```

Verifies the passed-in signature in the specified array
of bytes, starting at the specified offset.

<p> Note: Subclasses should overwrite the default implementation.


@param sigBytes the signature bytes to be verified.
@param offset the offset to start from in the array of bytes.
@param length the number of bytes to use, starting at offset.

@return {@code true} if the signature was verified, {@code false} if not.

@throws    SignatureException if the engine is not
initialized properly, the passed-in signature is improperly
encoded or of the wrong type, if this signature algorithm is unable to
process the input data provided, etc.
@since 1.4

## SignatureSpi.engineSetParameter(String, Object)

```java
protected abstract void engineSetParameter(String param, Object value) throws InvalidParameterException
```

Sets the specified algorithm parameter to the specified
value. This method supplies a general-purpose mechanism through
which it is possible to set the various parameters of this object.
A parameter may be any settable parameter for the algorithm, such as
a parameter size, or a source of random bits for signature generation
(if appropriate), or an indication of whether to perform
a specific but optional computation. A uniform algorithm-specific
naming scheme for each parameter is desirable but left unspecified
at this time.

@param param the string identifier of the parameter.

@param value the parameter value.

@throws    InvalidParameterException if {@code param} is an
invalid parameter for this {@code Signature} object,
the parameter is already set
and cannot be set again, a security exception occurs, and so on.

@deprecated Replaced by {@link
#engineSetParameter(java.security.spec.AlgorithmParameterSpec)
engineSetParameter}.

## SignatureSpi.engineSetParameter(AlgorithmParameterSpec)

```java
protected void engineSetParameter(AlgorithmParameterSpec params) throws InvalidAlgorithmParameterException
```

Initializes this {@code Signature} object with the specified parameter
values.

@param params the parameters

@throws    UnsupportedOperationException if this method is not
overridden by a provider

@throws    InvalidAlgorithmParameterException if this method is
overridden by a provider and the given parameters
are inappropriate for this {@code Signature} object

## SignatureSpi.engineGetParameters()

```java
protected AlgorithmParameters engineGetParameters()
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

@return the parameters used with this {@code Signature} object, or
{@code null}

@throws UnsupportedOperationException if this method is not overridden
by a provider
@since 1.4

## SignatureSpi.engineGetParameter(String)

```java
protected abstract Object engineGetParameter(String param) throws InvalidParameterException
```

Gets the value of the specified algorithm parameter.
This method supplies a general-purpose mechanism through which it
is possible to get the various parameters of this object. A parameter
may be any settable parameter for the algorithm, such as a parameter
size, or  a source of random bits for signature generation (if
appropriate), or an indication of whether to perform a
specific but optional computation. A uniform algorithm-specific
naming scheme for each parameter is desirable but left unspecified
at this time.

@param param the string name of the parameter.

@return the object that represents the parameter value, or {@code null}
if there is none.

@throws    InvalidParameterException if {@code param} is an
invalid parameter for this engine, or another exception occurs while
trying to get this parameter.

@deprecated

## SignatureSpi.clone()

```java
public Object clone() throws CloneNotSupportedException
```

Returns a clone if the implementation is cloneable.

@return a clone if the implementation is cloneable.

@throws    CloneNotSupportedException if this is called
on an implementation that does not support {@code Cloneable}.