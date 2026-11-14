# Timestamp class (java.security)

```java
public final class Timestamp implements Serializable
```

This class encapsulates information about a signed timestamp.
It is immutable.
It includes the timestamp's date and time as well as information about the
Timestamping Authority (TSA) which generated and signed the timestamp.

@since 1.5
@author Vincent Ryan

## Timestamp.Timestamp(Date, CertPath)

```java
public Timestamp(Date timestamp, CertPath signerCertPath)
```

Constructs a {@code Timestamp}.

@param timestamp is the timestamp's date and time. It must not be
{@code null}.
@param signerCertPath is the TSA's certificate path. It must not be
{@code null}.
@throws NullPointerException if timestamp or signerCertPath is
{@code null}.

## Timestamp.getTimestamp()

```java
public Date getTimestamp()
```

Returns the date and time when the {@code Timestamp} was generated.

@return The timestamp's date and time.

## Timestamp.getSignerCertPath()

```java
public CertPath getSignerCertPath()
```

Returns the certificate path for the Timestamping Authority.

@return The TSA's certificate path.

## Timestamp.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this {@code Timestamp}.
The hash code is generated using the date and time of the
{@code Timestamp} and the TSA's certificate path.

@return a hash code value for this {@code Timestamp}.

## Timestamp.equals(Object)

```java
public boolean equals(Object obj)
```

Tests for equality between the specified object and this
{@code Timestamp}. Two timestamps are considered equal if the date and
time of their timestamp's and their signer's certificate paths are equal.

@param obj the object to test for equality with this {@code Timestamp}.

@return {@code true} if the timestamps are considered equal,
{@code false} otherwise.

## Timestamp.toString()

```java
public String toString()
```

Returns a string describing this {@code Timestamp}.

@return A string comprising the date and time of the {@code Timestamp}
        and its signer's certificate.