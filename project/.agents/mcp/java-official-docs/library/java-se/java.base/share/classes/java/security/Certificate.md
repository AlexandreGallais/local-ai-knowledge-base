---
title: "Certificate interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Certificate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Certificate interface (java.security)

```java
public interface Certificate
```

This is an interface of abstract methods for managing a
variety of identity certificates.
An identity certificate is a guarantee by a principal that
a public key is that of another principal.  (A principal represents
an entity such as an individual user, a group, or a corporation.)

In particular, this interface is intended to be a common
abstraction for constructs that have different formats but
important common uses.  For example, different types of
certificates, such as X.509 certificates and PGP certificates,
share general certificate functionality (the need to encode and
decode certificates) and some types of information, such as a
public key, the principal whose key it is, and the guarantor
guaranteeing that the public key is that of the specified
principal. So an implementation of X.509 certificates and an
implementation of PGP certificates can both utilize the `Certificate`
interface, even though their formats and additional types and
amounts of information stored are different.

**Important**: This interface is useful for cataloging and
grouping objects sharing certain common uses. It does not have any
semantics of its own. In particular, a `Certificate` object does not
make any statement as to the *validity* of the binding. It is
the duty of the application implementing this interface to verify
the certificate and satisfy itself of its validity.

**Since:** 1.1

**Deprecated:** This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    `java.security.cert.Certificate` and related classes.

**See also:** java.security.cert.Certificate

## Certificate.getGuarantor()

```java
public abstract Principal getGuarantor()
```

Returns the guarantor of the certificate, that is, the principal
guaranteeing that the public key <example-value> with this certificate
is that of the principal associated with this certificate. For X.509
certificates, the guarantor will typically be a Certificate Authority
(such as the United States Postal Service or Verisign, Inc.).

**Returns:** the guarantor which guaranteed the principal-key
binding.

## Certificate.getPrincipal()

```java
public abstract Principal getPrincipal()
```

Returns the principal of the principal-key pair being guaranteed by
the guarantor.

**Returns:** the principal to which this certificate is bound.

## Certificate.getPublicKey()

```java
public abstract PublicKey getPublicKey()
```

Returns the key of the principal-key pair being guaranteed by
the guarantor.

**Returns:** the public key that this certificate certifies belongs
to a particular principal.

## Certificate.encode(OutputStream)

```java
public abstract void encode(OutputStream stream) throws KeyException, IOException
```

Encodes the certificate to an output stream in a format that can
be decoded by the `decode` method.

Parameters:

- `stream`: the output stream to which to encode the certificate.

**See also:** #decode

**See also:** #getFormat

Throws:

- `KeyException`: if the certificate is not properly initialized, or data is missing, etc.
- `IOException`: if a stream exception occurs while trying to output the encoded certificate to the output stream.

## Certificate.decode(InputStream)

```java
public abstract void decode(InputStream stream) throws KeyException, IOException
```

Decodes a certificate from an input stream. The format should be
that returned by `getFormat` and produced by
`encode`.

Parameters:

- `stream`: the input stream from which to fetch the data being decoded.

**See also:** #encode

**See also:** #getFormat

Throws:

- `KeyException`: if the certificate is not properly initialized, or data is missing, etc.
- `IOException`: if an exception occurs while trying to input the encoded certificate from the input stream.

## Certificate.getFormat()

```java
public abstract String getFormat()
```

Returns the name of the coding format. This is used as a hint to find
an appropriate parser. It could be "X.509", "PGP", etc. This is
the format produced and understood by the `encode`
and `decode` methods.

**Returns:** the name of the coding format.

## Certificate.toString(boolean)

```java
public String toString(boolean detailed)
```

Returns a string that represents the contents of the certificate.

Parameters:

- `detailed`: whether or not to give detailed information about the certificate

**Returns:** a string representing the contents of the certificate
