# PEMDecoder class (java.security)

```java
public final class PEMDecoder
```

{@code PEMDecoder} implements a decoder for Privacy-Enhanced Mail (PEM) data.
PEM is a textual encoding used to store and transfer security
objects, such as asymmetric keys, certificates, and certificate revocation
lists (CRLs).  It is defined in RFC 1421 and RFC 7468.  PEM consists of a
Base64-formatted binary encoding enclosed by a type-identifying header
and footer.

<p> The {@linkplain #decode(String)} and {@linkplain #decode(InputStream)}
methods return an instance of a class that matches the data
type and implements {@link DEREncodable}.

<p> The following lists the supported PEM types and the {@code DEREncodable}
types that each are decoded as:
<ul>
 <li>CERTIFICATE : {@code X509Certificate}</li>
 <li>X509 CRL : {@code X509CRL}</li>
 <li>PUBLIC KEY : {@code PublicKey}</li>
 <li>PUBLIC KEY : {@code X509EncodedKeySpec} (Only supported when passed as
 a {@code Class} parameter)</li>
 <li>PRIVATE KEY : {@code PrivateKey}</li>
 <li>PRIVATE KEY : {@code PKCS8EncodedKeySpec} (Only supported when passed
 as a {@code Class} parameter)</li>
 <li>PRIVATE KEY : {@code KeyPair} (if the encoding also contains a
 public key)</li>
 <li>ENCRYPTED PRIVATE KEY : {@code EncryptedPrivateKeyInfo} </li>
 <li>ENCRYPTED PRIVATE KEY : {@code PrivateKey} (if configured with
 Decryption)</li>
 <li>Other types : {@code PEMRecord} </li>
</ul>

<p> The {@code PublicKey} and {@code PrivateKey} types, an algorithm specific
subclass is returned if the underlying algorithm is supported. For example an
ECPublicKey and ECPrivateKey for Elliptic Curve keys.

<p> If the PEM type does not have a corresponding class,
{@code decode(String)} and {@code decode(InputStream)} will return a
{@link PEMRecord}.

<p> The {@linkplain #decode(String, Class)} and
{@linkplain #decode(InputStream, Class)} methods take a class parameter
which determines the type of {@code DEREncodable} that is returned. These
methods are useful when extracting or changing the return class.
For example, if the PEM contains both public and private keys, the
class parameter can specify which to return. Use
{@code PrivateKey.class} to return only the private key.
If the class parameter is set to {@code X509EncodedKeySpec.class}, the
public key will be returned in that format.  Any type of PEM data can be
decoded into a {@code PEMRecord} by specifying {@code PEMRecord.class}.
If the class parameter doesn't match the PEM content, a
{@linkplain ClassCastException} will be thrown.

<p> A new {@code PEMDecoder} instance is created when configured
with {@linkplain #withFactory(Provider)} and/or
{@linkplain #withDecryption(char[])}. {@linkplain #withFactory(Provider)}
configures the decoder to use only {@linkplain KeyFactory} and
{@linkplain CertificateFactory} instances from the given {@code Provider}.
{@linkplain #withDecryption(char[])} configures the decoder to decrypt all
encrypted private key PEM data using the given password.
Configuring an instance for decryption does not prevent decoding with
unencrypted PEM. Any encrypted PEM that fails decryption
will throw a {@link RuntimeException}. When an encrypted private key PEM is
used with a decoder not configured for decryption, an
{@link EncryptedPrivateKeyInfo} object is returned.

<p>This class is immutable and thread-safe.

<p> Here is an example of decoding a {@code PrivateKey} object:
{@snippet lang = java:
    PEMDecoder pd = PEMDecoder.of();
    PrivateKey priKey = pd.decode(priKeyPEM, PrivateKey.class);
}

<p> Here is an example of a {@code PEMDecoder} configured with decryption
and a factory provider:
{@snippet lang = java:
    PEMDecoder pd = PEMDecoder.of().withDecryption(password).
        withFactory(provider);
    byte[] pemData = pd.decode(privKey);
}

@implNote An implementation may support other PEM types and
{@code DEREncodable} objects. This implementation additionally supports
the following PEM types:  {@code X509 CERTIFICATE},
{@code X.509 CERTIFICATE}, {@code CRL}, and {@code RSA PRIVATE KEY}.

@see PEMEncoder
@see PEMRecord
@see EncryptedPrivateKeyInfo

@spec https://www.rfc-editor.org/info/rfc1421
      RFC 1421: Privacy Enhancement for Internet Electronic Mail
@spec https://www.rfc-editor.org/info/rfc7468
      RFC 7468: Textual Encodings of PKIX, PKCS, and CMS Structures

@since 25

## PEMDecoder.of()

```java
public static PEMDecoder of()
```

Returns an instance of {@code PEMDecoder}.

@return a {@code PEMDecoder} instance

## PEMDecoder.decode(String)

```java
public DEREncodable decode(String str)
```

Decodes and returns a {@link DEREncodable} from the given {@code String}.

<p> This method reads the {@code String} until PEM data is found
or the end of the {@code String} is reached.  If no PEM data is found,
an {@code IllegalArgumentException} is thrown.

<p> This method returns a Java API cryptographic object,
such as a {@code PrivateKey}, if the PEM type is supported.
Any non-PEM data preceding the PEM header is ignored by the decoder.
Otherwise, a {@link PEMRecord} will be returned containing
the type identifier and Base64-encoded data.
Any non-PEM data preceding the PEM header will be stored in
{@code leadingData}.

<p> Input consumed by this method is read in as
{@link java.nio.charset.StandardCharsets#UTF_8 UTF-8}.

@param str a String containing PEM data
@return a {@code DEREncodable}
@throws IllegalArgumentException on error in decoding or no PEM data
found
@throws NullPointerException when {@code str} is null

## PEMDecoder.decode(InputStream)

```java
public DEREncodable decode(InputStream is) throws IOException
```

Decodes and returns a {@link DEREncodable} from the given
{@code InputStream}.

<p> This method reads from the {@code InputStream} until the end of
the PEM footer or the end of the stream. If an I/O error occurs,
the read position in the stream may become inconsistent.
It is recommended to perform no further decoding operations
on the {@code InputStream}.

<p> This method returns a Java API cryptographic object,
such as a {@code PrivateKey}, if the PEM type is supported.
Any non-PEM data preceding the PEM header is ignored by the decoder.
Otherwise, a {@link PEMRecord} will be returned containing
the type identifier and Base64-encoded data.
Any non-PEM data preceding the PEM header will be stored in
{@code leadingData}.

<p> If no PEM data is found, an {@code IllegalArgumentException} is
thrown.

@param is InputStream containing PEM data
@return a {@code DEREncodable}
@throws IOException on IO or PEM syntax error where the
{@code InputStream} did not complete decoding.
@throws EOFException at the end of the {@code InputStream}
@throws IllegalArgumentException on error in decoding
@throws NullPointerException when {@code is} is null

## PEMDecoder.decode(String, Class<S>)

```java
public <S extends DEREncodable> S decode(String str, Class<S> tClass)
```

Decodes and returns a {@code DEREncodable} of the specified class from
the given PEM string. {@code tClass} must extend {@link DEREncodable}
and be an appropriate class for the PEM type.

<p> This method reads the {@code String} until PEM data is found
or the end of the {@code String} is reached.  If no PEM data is found,
an {@code IllegalArgumentException} is thrown.

<p> If the class parameter is {@code PEMRecord.class},
a {@linkplain PEMRecord} is returned containing the
type identifier and Base64 encoding. Any non-PEM data preceding
the PEM header will be stored in {@code leadingData}.  Other
class parameters will not return preceding non-PEM data.

<p> Input consumed by this method is read in as
{@link java.nio.charset.StandardCharsets#UTF_8 UTF-8}.

@param <S> Class type parameter that extends {@code DEREncodable}
@param str the String containing PEM data
@param tClass the returned object class that implements
{@code DEREncodable}
@return a {@code DEREncodable} specified by {@code tClass}
@throws IllegalArgumentException on error in decoding or no PEM data
found
@throws ClassCastException if {@code tClass} is invalid for the PEM type
@throws NullPointerException when any input values are null

## PEMDecoder.decode(InputStream, Class<S>)

```java
public <S extends DEREncodable> S decode(InputStream is, Class<S> tClass) throws IOException
```

Decodes and returns the specified class for the given
{@link InputStream}.  The class must extend {@link DEREncodable} and be
an appropriate class for the PEM type.

<p> This method reads from the {@code InputStream} until the end of
the PEM footer or the end of the stream. If an I/O error occurs,
the read position in the stream may become inconsistent.
It is recommended to perform no further decoding operations
on the {@code InputStream}.

<p> If the class parameter is {@code PEMRecord.class},
a {@linkplain PEMRecord} is returned containing the
type identifier and Base64 encoding. Any non-PEM data preceding
the PEM header will be stored in {@code leadingData}.  Other
class parameters will not return preceding non-PEM data.

<p> If no PEM data is found, an {@code IllegalArgumentException} is
thrown.

@param <S> Class type parameter that extends {@code DEREncodable}.
@param is an InputStream containing PEM data
@param tClass the returned object class that implements
  {@code DEREncodable}.
@return a {@code DEREncodable} typecast to {@code tClass}
@throws IOException on IO or PEM syntax error where the
{@code InputStream} did not complete decoding.
@throws EOFException at the end of the {@code InputStream}
@throws IllegalArgumentException on error in decoding
@throws ClassCastException if {@code tClass} is invalid for the PEM type
@throws NullPointerException when any input values are null

@see #decode(InputStream)
@see #decode(String, Class)

## PEMDecoder.withFactory(Provider)

```java
public PEMDecoder withFactory(Provider provider)
```

Returns a copy of this {@code PEMDecoder} instance that uses
{@link KeyFactory} and {@link CertificateFactory} implementations
from the specified {@link Provider} to produce cryptographic objects.
Any errors using the {@code Provider} will occur during decoding.

@param provider the factory provider
@return a new PEMEncoder instance configured to the {@code Provider}.
@throws NullPointerException if {@code provider} is null

## PEMDecoder.withDecryption(char[])

```java
public PEMDecoder withDecryption(char[] password)
```

Returns a copy of this {@code PEMDecoder} that decodes and decrypts
encrypted private keys using the specified password.
Non-encrypted PEM can still be decoded from this instance.

@param password the password to decrypt encrypted PEM data.  This array
                is cloned and stored in the new instance.
@return a new PEMEncoder instance configured for decryption
@throws NullPointerException if {@code password} is null