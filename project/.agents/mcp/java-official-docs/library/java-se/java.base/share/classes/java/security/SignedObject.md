# SignedObject class (java.security)

```java
public final class SignedObject implements Serializable
```

<p> {@code SignedObject} is a class for the purpose of creating authentic
runtime objects whose integrity cannot be compromised without being
detected.

<p> More specifically, a {@code SignedObject} contains another Serializable
object, the (to-be-)signed object and its signature.

<p> The signed object is a "deep copy" (in serialized form) of an
original object.  Once the copy is made, further manipulation of
the original object has no side effect on the copy.

<p> The underlying signing algorithm is designated by the Signature
object passed to the constructor and the {@code verify} method.
A typical usage for signing is the following:

<pre>{@code
Signature signingEngine = Signature.getInstance(algorithm,
                                                provider);
SignedObject so = new SignedObject(myobject, signingKey,
                                   signingEngine);
}</pre>

<p> A typical usage for verification is the following (having
received SignedObject {@code so}):

<pre>{@code
Signature verificationEngine =
    Signature.getInstance(algorithm, provider);
if (so.verify(publickey, verificationEngine))
    try {
        Object myobj = so.getObject();
    } catch (java.lang.ClassNotFoundException e) {};
}</pre>

<p> Several points are worth noting.  First, there is no need to
initialize the signing or verification engine, as it will be
re-initialized inside the constructor and the {@code verify}
method. Secondly, for verification to succeed, the specified
public key must be the public key corresponding to the private key
used to generate the {@code SignedObject}.

<p> More importantly, for flexibility reasons, the
constructor and {@code verify} method allow for
customized signature engines, which can implement signature
algorithms that are not installed formally as part of a crypto
provider.  However, it is crucial that the programmer writing the
verifier code be aware what {@code Signature} engine is being
used, as its own implementation of the {@code verify} method
is invoked to verify a signature.  In other words, a malicious
{@code Signature} may choose to always return true on
verification in an attempt to bypass a security check.

<p> The signature algorithm can be, among others, the NIST standard
DSA, using DSA and SHA-256.  The algorithm is specified using the
same convention as that for signatures. The DSA algorithm using the
SHA-256 message digest algorithm can be specified, for example, as
"SHA256withDSA".  In the case of
RSA the signing algorithm could be specified as, for example,
"SHA256withRSA".  The algorithm name must be
specified, as there is no default.

<p> The name of the Cryptography Package Provider is designated
also by the Signature parameter to the constructor and the
{@code verify} method.  If the provider is not
specified, the default provider is used.  Each installation can
be configured to use a particular provider as default.

<p> Potential applications of {@code SignedObject} include:
<ul>
<li> It can be used
internally to any Java runtime as an unforgeable authorization
token -- one that can be passed around without the fear that the
token can be maliciously modified without being detected.
<li> It
can be used to sign and serialize data/object for storage outside
the Java runtime (e.g., storing critical access control data on
disk).
<li> Nested SignedObjects can be used to construct a logical
sequence of signatures, resembling a chain of authorization and
delegation.
</ul>

@see Signature

@author Li Gong
@since 1.2

## SignedObject.SignedObject(Serializable, PrivateKey, Signature)

```java
public SignedObject(Serializable object, PrivateKey signingKey, Signature signingEngine) throws IOException, InvalidKeyException, SignatureException
```

Constructs a {@code SignedObject} from any Serializable object.
The given object is signed with the given signing key, using the
designated signature engine.

@param object the object to be signed.
@param signingKey the private key for signing.
@param signingEngine the signature signing engine.

@throws    IOException if an error occurs during serialization
@throws    InvalidKeyException if the key is invalid.
@throws    SignatureException if signing fails.

## SignedObject.getObject()

```java
public Object getObject() throws IOException, ClassNotFoundException
```

Retrieves the encapsulated object.
The encapsulated object is de-serialized before it is returned.

@return the encapsulated object.

@throws    IOException if an error occurs during de-serialization
@throws    ClassNotFoundException if an error occurs during
de-serialization

## SignedObject.getSignature()

```java
public byte[] getSignature()
```

Retrieves the signature on the signed object, in the form of a
byte array.

@return the signature. Returns a new array each time this
method is called.

## SignedObject.getAlgorithm()

```java
public String getAlgorithm()
```

Retrieves the name of the signature algorithm.

@return the signature algorithm name.

## SignedObject.verify(PublicKey, Signature)

```java
public boolean verify(PublicKey verificationKey, Signature verificationEngine) throws InvalidKeyException, SignatureException
```

Verifies that the signature in this {@code SignedObject} is the valid
signature for the object stored inside, with the given
verification key, using the designated verification engine.

@param verificationKey the public key for verification.
@param verificationEngine the signature verification engine.

@throws    SignatureException if signature verification failed (an
    exception prevented the signature verification engine from completing
    normally).
@throws    InvalidKeyException if the verification key is invalid.

@return {@code true} if the signature
is valid, {@code false} otherwise