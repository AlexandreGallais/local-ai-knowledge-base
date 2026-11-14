# CRL class (java.security.cert)

```java
public abstract class CRL
```

This class is an abstraction of certificate revocation lists (CRLs) that
have different formats but important common uses. For example, all CRLs
share the functionality of listing revoked certificates, and can be queried
on whether they list a given certificate.
<p>
Specialized CRL types can be defined by subclassing off of this abstract
class.

@author Hemma Prafullchandra


@see X509CRL
@see CertificateFactory

@since 1.2

## CRL.CRL(String)

```java
protected CRL(String type)
```

Creates a CRL of the specified type.

@param type the standard name of the CRL type.
See the <a href=
"{@docRoot}/../specs/security/standard-names.html">
Java Security Standard Algorithm Names</a> document
for information about standard CRL types.

@spec security/standard-names.html Java Security Standard Algorithm Names

## CRL.getType()

```java
public final String getType()
```

Returns the type of this CRL.

@return the type of this CRL.

## CRL.toString()

```java
public abstract String toString()
```

Returns a string representation of this CRL.

@return a string representation of this CRL.

## CRL.isRevoked(Certificate)

```java
public abstract boolean isRevoked(Certificate cert)
```

Checks whether the given certificate is on this CRL.

@param cert the certificate to check for.
@return true if the given certificate is on this CRL,
false otherwise.