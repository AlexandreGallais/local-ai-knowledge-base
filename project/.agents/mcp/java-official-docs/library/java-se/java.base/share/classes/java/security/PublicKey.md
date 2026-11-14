# PublicKey interface (java.security)

```java
public interface PublicKey extends AsymmetricKey
```

<p>A public key. This interface contains no methods or constants.
It merely serves to group (and provide type safety for) all public key
interfaces.

Note: The specialized public key interfaces extend this interface.
See, for example, the DSAPublicKey interface in
{@code java.security.interfaces}.

@since 1.1
@see Key
@see PrivateKey
@see java.security.cert.Certificate
@see Signature#initVerify
@see java.security.interfaces.DSAPublicKey
@see java.security.interfaces.RSAPublicKey

## PublicKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate serialization
compatibility with a previous version of the class.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.