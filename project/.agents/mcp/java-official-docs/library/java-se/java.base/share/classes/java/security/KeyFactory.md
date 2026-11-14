# KeyFactory class (java.security)

```java
public class KeyFactory
```

Key factories are used to convert <I>keys</I> (opaque
cryptographic keys of type {@code Key}) into <I>key specifications</I>
(transparent representations of the underlying key material), and vice
versa.

<P> Key factories are bidirectional. That is, they allow you to build an
opaque key object from a given key specification (key material), or to
retrieve the underlying key material of a key object in a suitable format.

<P> Multiple compatible key specifications may exist for the same key.
For example, a DSA public key may be specified using
{@code DSAPublicKeySpec} or
{@code X509EncodedKeySpec}. A key factory can be used to translate
between compatible key specifications.

<P> The following is an example of how to use a key factory in order to
instantiate a DSA public key from its encoding.
Assume Alice has received a digital signature from Bob.
Bob also sent her his public key (in encoded format) to verify
his signature. Alice then performs the following actions:

<pre>
X509EncodedKeySpec bobPubKeySpec = new X509EncodedKeySpec(bobEncodedPubKey);
KeyFactory keyFactory = KeyFactory.getInstance("DSA");
PublicKey bobPubKey = keyFactory.generatePublic(bobPubKeySpec);
Signature sig = Signature.getInstance("DSA");
sig.initVerify(bobPubKey);
sig.update(data);
sig.verify(signature);
</pre>

<p> Every implementation of the Java platform is required to support the
following standard {@code KeyFactory} algorithms:
<ul>
<li>{@code DiffieHellman}</li>
<li>{@code DSA}</li>
<li>{@code EC}</li>
<li>{@code RSA}</li>
<li>{@code RSASSA-PSS}</li>
<li>{@code X25519}</li>
</ul>
These algorithms are described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keyfactory-algorithms">
KeyFactory section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Jan Luehe

@see Key
@see PublicKey
@see PrivateKey
@see java.security.spec.KeySpec
@see java.security.spec.DSAPublicKeySpec
@see java.security.spec.X509EncodedKeySpec

@since 1.2

## KeyFactory.KeyFactory(KeyFactorySpi, Provider, String)

```java
protected KeyFactory(KeyFactorySpi keyFacSpi, Provider provider, String algorithm)
```

Creates a {@code KeyFactory} object.

@param keyFacSpi the delegate
@param provider the provider
@param algorithm the name of the algorithm
to associate with this {@code KeyFactory}

## KeyFactory.getInstance(String)

```java
public static KeyFactory getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code KeyFactory} object that converts
public/private keys of the specified algorithm.

<p> This method traverses the list of registered security providers,
starting with the most preferred provider.
A new {@code KeyFactory} object encapsulating the
{@code KeyFactorySpi} implementation from the first
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

@param algorithm the name of the requested key algorithm.
See the KeyFactory section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keyfactory-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code KeyFactory} object

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code KeyFactorySpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## KeyFactory.getInstance(String, String)

```java
public static KeyFactory getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code KeyFactory} object that converts
public/private keys of the specified algorithm.

<p> A new {@code KeyFactory} object encapsulating the
{@code KeyFactorySpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the requested key algorithm.
See the KeyFactory section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keyfactory-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code KeyFactory} object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if a {@code KeyFactorySpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## KeyFactory.getInstance(String, Provider)

```java
public static KeyFactory getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code KeyFactory} object that converts
public/private keys of the specified algorithm.

<p> A new {@code KeyFactory} object encapsulating the
{@code KeyFactorySpi} implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param algorithm the name of the requested key algorithm.
See the KeyFactory section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keyfactory-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code KeyFactory} object

@throws IllegalArgumentException if the specified provider is
        {@code null}

@throws NoSuchAlgorithmException if a {@code KeyFactorySpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## KeyFactory.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this key factory object.

@return the provider of this key factory object

## KeyFactory.getAlgorithm()

```java
public final String getAlgorithm()
```

Gets the name of the algorithm
associated with this {@code KeyFactory}.

@return the name of the algorithm associated with this
{@code KeyFactory}

## KeyFactory.generatePublic(KeySpec)

```java
public final PublicKey generatePublic(KeySpec keySpec) throws InvalidKeySpecException
```

Generates a public key object from the provided key specification
(key material).

@param keySpec the specification (key material) of the public key.

@return the public key.

@throws    InvalidKeySpecException if the given key specification
is inappropriate for this key factory to produce a public key.

## KeyFactory.generatePrivate(KeySpec)

```java
public final PrivateKey generatePrivate(KeySpec keySpec) throws InvalidKeySpecException
```

Generates a private key object from the provided key specification
(key material).

@param keySpec the specification (key material) of the private key.

@return the private key.

@throws    InvalidKeySpecException if the given key specification
is inappropriate for this key factory to produce a private key.

## KeyFactory.getKeySpec(Key, Class<T>)

```java
public final <T extends KeySpec> T getKeySpec(Key key, Class<T> keySpec) throws InvalidKeySpecException
```

Returns a specification (key material) of the given key object.
{@code keySpec} identifies the specification class in which
the key material should be returned. It could, for example, be
{@code DSAPublicKeySpec.class}, to indicate that the
key material should be returned in an instance of the
{@code DSAPublicKeySpec} class.

@param <T> the type of the key specification to be returned

@param key the key.

@param keySpec the specification class in which
the key material should be returned.

@return the underlying key specification (key material) in an instance
of the requested specification class.

@throws    InvalidKeySpecException if the requested key specification is
inappropriate for the given key, or the given key cannot be processed
(e.g., the given key has an unrecognized algorithm or format).

## KeyFactory.translateKey(Key)

```java
public final Key translateKey(Key key) throws InvalidKeyException
```

Translates a key object, whose provider may be unknown or potentially
untrusted, into a corresponding key object of this key factory.

@param key the key whose provider is unknown or untrusted.

@return the translated key.

@throws    InvalidKeyException if the given key cannot be processed
by this key factory.