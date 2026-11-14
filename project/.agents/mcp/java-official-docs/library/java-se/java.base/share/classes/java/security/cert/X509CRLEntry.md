# X509CRLEntry class (java.security.cert)

```java
public abstract class X509CRLEntry implements X509Extension
```

<p>Abstract class for a revoked certificate in a CRL (Certificate
Revocation List).

The ASN.1 definition for <em>revokedCertificates</em> is:
<pre>
revokedCertificates    SEQUENCE OF SEQUENCE  {
    userCertificate    CertificateSerialNumber,
    revocationDate     ChoiceOfTime,
    crlEntryExtensions Extensions OPTIONAL
                       -- if present, must be v2
}  OPTIONAL

CertificateSerialNumber  ::=  INTEGER

Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension

Extension  ::=  SEQUENCE  {
    extnId        OBJECT IDENTIFIER,
    critical      BOOLEAN DEFAULT FALSE,
    extnValue     OCTET STRING
                  -- contains a DER encoding of a value
                  -- of the type registered for use with
                  -- the extnId object identifier value
}
</pre>

@see X509CRL
@see X509Extension

@author Hemma Prafullchandra
@since 1.2

## X509CRLEntry.X509CRLEntry()

```java
public X509CRLEntry()
```

Constructor for subclasses to call.

## X509CRLEntry.equals(Object)

```java
public boolean equals(Object other)
```

Compares this CRL entry for equality with the given
object. If the {@code other} object is an
{@code instanceof} {@code X509CRLEntry}, then
its encoded form (the inner SEQUENCE) is retrieved and compared
with the encoded form of this CRL entry.

@param other the object to test for equality with this CRL entry.
@return true iff the encoded forms of the two CRL entries
match, false otherwise.

## X509CRLEntry.hashCode()

```java
public int hashCode()
```

{@return the hashcode value for this CRL entry from its
encoded form}

## X509CRLEntry.getEncoded()

```java
public abstract byte[] getEncoded() throws CRLException
```

Returns the ASN.1 DER-encoded form of this CRL Entry,
that is the inner SEQUENCE.

@return the encoded form of this certificate
@throws    CRLException if an encoding error occurs.

## X509CRLEntry.getSerialNumber()

```java
public abstract BigInteger getSerialNumber()
```

Gets the serial number from this X509CRLEntry,
the <em>userCertificate</em>.

@return the serial number.

## X509CRLEntry.getCertificateIssuer()

```java
public X500Principal getCertificateIssuer()
```

Get the issuer of the X509Certificate described by this entry. If
the certificate issuer is also the CRL issuer, this method returns
null.

<p>This method is used with indirect CRLs. The default implementation
always returns null. Subclasses that wish to support indirect CRLs
should override it.

@return the issuer of the X509Certificate described by this entry
or null if it is issued by the CRL issuer.

@since 1.5

## X509CRLEntry.getRevocationDate()

```java
public abstract Date getRevocationDate()
```

Gets the revocation date from this X509CRLEntry,
the <em>revocationDate</em>.

@return the revocation date.

## X509CRLEntry.hasExtensions()

```java
public abstract boolean hasExtensions()
```

Returns true if this CRL entry has extensions.

@return true if this entry has extensions, false otherwise.

## X509CRLEntry.toString()

```java
public abstract String toString()
```

Returns a string representation of this CRL entry.

@return a string representation of this CRL entry.

## X509CRLEntry.getRevocationReason()

```java
public CRLReason getRevocationReason()
```

Returns the reason the certificate has been revoked, as specified
in the Reason Code extension of this CRL entry.

@return the reason the certificate has been revoked, or
   {@code null} if this CRL entry does not have
   a Reason Code extension
@since 1.7