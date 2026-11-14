# CodeSigner class (java.security)

```java
public final class CodeSigner implements Serializable
```

This class encapsulates information about a code signer.
It is immutable.

@since 1.5
@author Vincent Ryan

## CodeSigner.CodeSigner(CertPath, Timestamp)

```java
public CodeSigner(CertPath signerCertPath, Timestamp timestamp)
```

Constructs a {@code CodeSigner} object.

@param signerCertPath The signer's certificate path.
                      It must not be {@code null}.
@param timestamp A signature timestamp.
                 If {@code null} then no timestamp was generated
                 for the signature.
@throws NullPointerException if {@code signerCertPath} is
                             {@code null}.

## CodeSigner.getSignerCertPath()

```java
public CertPath getSignerCertPath()
```

Returns the signer's certificate path.

@return A certificate path.

## CodeSigner.getTimestamp()

```java
public Timestamp getTimestamp()
```

Returns the signature timestamp.

@return The timestamp or {@code null} if none is present.

## CodeSigner.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this code signer}
The hash code is generated using the signer's certificate path and the
timestamp, if present.

## CodeSigner.equals(Object)

```java
public boolean equals(Object obj)
```

Tests for equality between the specified object and this
code signer. Two code signers are considered equal if their
signer certificate paths are equal and if their timestamps are equal,
if present in both.

@param obj the object to test for equality with this object.

@return {@code true} if the objects are considered equal,
{@code false} otherwise.

## CodeSigner.toString()

```java
public String toString()
```

Returns a string describing this code signer.

@return A string comprising the signer's certificate and a timestamp,
        if present.