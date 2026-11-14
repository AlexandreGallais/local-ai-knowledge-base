# DEREncodable interface (java.security)

```java
public sealed interface DEREncodable permits AsymmetricKey, KeyPair, PKCS8EncodedKeySpec, X509EncodedKeySpec, EncryptedPrivateKeyInfo, X509Certificate, X509CRL, PEMRecord
```

This interface is implemented by security API classes that contain
binary-encodable key or certificate material.
These APIs or their subclasses typically provide methods to convert
their instances to and from byte arrays in the Distinguished
Encoding Rules (DER) format.

@see AsymmetricKey
@see KeyPair
@see PKCS8EncodedKeySpec
@see X509EncodedKeySpec
@see EncryptedPrivateKeyInfo
@see X509Certificate
@see X509CRL
@see PEMRecord

@since 25