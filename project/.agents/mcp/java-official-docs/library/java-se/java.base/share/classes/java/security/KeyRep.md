# KeyRep class (java.security)

```java
public class KeyRep implements Serializable
```

Standardized representation for serialized Key objects.

<p>

Note that a serialized Key may contain sensitive information
which should not be exposed in untrusted environments.  See the
<a href="{@docRoot}/../specs/serialization/security.html">
Security Appendix</a>
of the <cite>Java Object Serialization Specification</cite> for more information.

@spec serialization/index.html Java Object Serialization Specification
@see Key
@see KeyFactory
@see javax.crypto.spec.SecretKeySpec
@see java.security.spec.X509EncodedKeySpec
@see java.security.spec.PKCS8EncodedKeySpec

@since 1.5

## KeyRep.KeyRep(Type, String, String, byte[])

```java
public KeyRep(Type type, String algorithm, String format, byte[] encoded)
```

Construct the alternate Key class.

@param type either one of Type.SECRET, Type.PUBLIC, or Type.PRIVATE
@param algorithm the algorithm returned from
         {@code Key.getAlgorithm()}
@param format the encoding format returned from
         {@code Key.getFormat()}
@param encoded the encoded bytes returned from
         {@code Key.getEncoded()}

@throws    NullPointerException
         if type is {@code null},
         if algorithm is {@code null},
         if format is {@code null},
         or if encoded is {@code null}

## KeyRep.readResolve()

```java
protected Object readResolve() throws ObjectStreamException
```

Resolve the Key object.

<p> This method supports three Type/format combinations:
<ul>
<li> Type.SECRET/"RAW" - returns a SecretKeySpec object
constructed using encoded key bytes and algorithm
<li> Type.PUBLIC/"X.509" - gets a KeyFactory instance for
the key algorithm, constructs an X509EncodedKeySpec with the
encoded key bytes, and generates a public key from the spec
<li> Type.PRIVATE/"PKCS#8" - gets a KeyFactory instance for
the key algorithm, constructs a PKCS8EncodedKeySpec with the
encoded key bytes, and generates a private key from the spec
</ul>

@return the resolved Key object

@throws    ObjectStreamException if the Type/format
 combination is unrecognized, if the algorithm, key format, or
 encoded key bytes are unrecognized/invalid, of if the
 resolution of the key fails for any reason