# PEMEncoder class (java.security)

```java
public final class PEMEncoder
```

{@code PEMEncoder} implements an encoder for Privacy-Enhanced Mail (PEM)
data.  PEM is a textual encoding used to store and transfer security
objects, such as asymmetric keys, certificates, and certificate revocation
lists (CRL).  It is defined in RFC 1421 and RFC 7468.  PEM consists of a
Base64-formatted binary encoding enclosed by a type-identifying header
and footer.

<p> Encoding may be performed on Java API cryptographic objects that
implement {@link DEREncodable}. The {@link #encode(DEREncodable)}
and {@link #encodeToString(DEREncodable)} methods encode a DEREncodable
into PEM and return the data in a byte array or String.

<p> Private keys can be encrypted and encoded by configuring a
{@code PEMEncoder} with the {@linkplain #withEncryption(char[])} method,
which takes a password and returns a new {@code PEMEncoder} instance
configured to encrypt the key with that password. Alternatively, a
private key encrypted as an {@code EncryptedKeyInfo} object can be encoded
directly to PEM by passing it to the {@code encode} or
{@code encodeToString} methods.

<p> PKCS #8 2.0 defines the ASN.1 OneAsymmetricKey structure, which may
contain both private and public keys.
{@link KeyPair} objects passed to the {@code encode} or
{@code encodeToString} methods are encoded as a
OneAsymmetricKey structure using the "PRIVATE KEY" type.

<p> When encoding a {@link PEMRecord}, the API surrounds the
{@linkplain PEMRecord#content()} with the PEM header and footer
from {@linkplain PEMRecord#type()}. {@linkplain PEMRecord#leadingData()} is
not included in the encoding.  {@code PEMRecord} will not perform
validity checks on the data.

<p>The following lists the supported {@code DEREncodable} classes and
the PEM types that each are encoded as:

<ul>
 <li>{@code X509Certificate} : CERTIFICATE</li>
 <li>{@code X509CRL} : X509 CRL</li>
 <li>{@code PublicKey}: PUBLIC KEY</li>
 <li>{@code PrivateKey} : PRIVATE KEY</li>
 <li>{@code PrivateKey} (if configured with encryption):
 ENCRYPTED PRIVATE KEY</li>
 <li>{@code EncryptedPrivateKeyInfo} : ENCRYPTED PRIVATE KEY</li>
 <li>{@code KeyPair} : PRIVATE KEY</li>
 <li>{@code X509EncodedKeySpec} : PUBLIC KEY</li>
 <li>{@code PKCS8EncodedKeySpec} : PRIVATE KEY</li>
 <li>{@code PEMRecord} : {@code PEMRecord.type()}</li>
 </ul>

<p> This class is immutable and thread-safe.

<p> Here is an example of encoding a {@code PrivateKey} object:
{@snippet lang = java:
    PEMEncoder pe = PEMEncoder.of();
    byte[] pemData = pe.encode(privKey);
}

<p> Here is an example that encrypts and encodes a private key using the
specified password:
{@snippet lang = java:
    PEMEncoder pe = PEMEncoder.of().withEncryption(password);
    byte[] pemData = pe.encode(privKey);
}

@implNote An implementation may support other PEM types and
{@code DEREncodable} objects.


@see PEMDecoder
@see PEMRecord
@see EncryptedPrivateKeyInfo

@spec https://www.rfc-editor.org/info/rfc1421
      RFC 1421: Privacy Enhancement for Internet Electronic Mail
@spec https://www.rfc-editor.org/info/rfc7468
      RFC 7468: Textual Encodings of PKIX, PKCS, and CMS Structures

@since 25

## PEMEncoder.of()

```java
public static PEMEncoder of()
```

Returns an instance of {@code PEMEncoder}.

@return a {@code PEMEncoder}

## PEMEncoder.encodeToString(DEREncodable)

```java
public String encodeToString(DEREncodable de)
```

Encodes the specified {@code DEREncodable} and returns a PEM encoded
string.

@param de the {@code DEREncodable} to be encoded
@return a {@code String} containing the PEM encoded data
@throws IllegalArgumentException if the {@code DEREncodable} cannot be
encoded
@throws NullPointerException if {@code de} is {@code null}
@see #withEncryption(char[])

## PEMEncoder.encode(DEREncodable)

```java
public byte[] encode(DEREncodable de)
```

Encodes the specified {@code DEREncodable} and returns the PEM encoding
in a byte array.

@param de the {@code DEREncodable} to be encoded
@return a PEM encoded byte array
@throws IllegalArgumentException if the {@code DEREncodable} cannot be
encoded
@throws NullPointerException if {@code de} is {@code null}
@see #withEncryption(char[])

## PEMEncoder.withEncryption(char[])

```java
public PEMEncoder withEncryption(char[] password)
```

Returns a new {@code PEMEncoder} instance configured for encryption
with the default algorithm and a given password.

<p> Only {@link PrivateKey} objects can be encrypted with this newly
configured instance.  Encoding other {@link DEREncodable} objects will
throw an {@code IllegalArgumentException}.

@implNote
The default password-based encryption algorithm is defined
by the {@code jdk.epkcs8.defaultAlgorithm} security property and
uses the default encryption parameters of the provider that is selected.
For greater flexibility with encryption options and parameters, use
{@link EncryptedPrivateKeyInfo#encryptKey(PrivateKey, Key,
String, AlgorithmParameterSpec, Provider, SecureRandom)} and use the
returned object with {@link #encode(DEREncodable)}.

@param password the encryption password.  The array is cloned and
               stored in the new instance.
@return a new {@code PEMEncoder} instance configured for encryption
@throws NullPointerException when password is {@code null}