# URICertStoreParameters class (java.security.cert)

```java
public final class URICertStoreParameters implements CertStoreParameters
```

Parameters used as input for {@code CertStore} algorithms which use
information contained in a URI to retrieve certificates and CRLs.
<p>
This class is used to provide necessary configuration parameters
through a URI as defined in RFC 5280 to implementations of
{@code CertStore} algorithms.
<p>
<b>Concurrent Access</b>
<p>
Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

@since       9
@see         CertStore
@see         java.net.URI

## URICertStoreParameters.URICertStoreParameters(URI)

```java
public URICertStoreParameters(URI uri)
```

Creates an instance of {@code URICertStoreParameters} with the
specified URI.

@param uri the URI which contains configuration information.
@throws NullPointerException if {@code uri} is null

## URICertStoreParameters.getURI()

```java
public URI getURI()
```

Returns the URI used to construct this
{@code URICertStoreParameters} object.

@return the URI.

## URICertStoreParameters.clone()

```java
public URICertStoreParameters clone()
```

Returns a copy of this object. Changes to the copy will not affect
the original and vice versa.

@return the copy

## URICertStoreParameters.hashCode()

```java
public int hashCode()
```

{@return a hash code value for this parameters object}
The hash code is generated using the URI supplied at construction.

## URICertStoreParameters.equals(Object)

```java
public boolean equals(Object p)
```

Compares the specified object with this parameters object for equality.
Two URICertStoreParameters are considered equal if the URIs used
to construct them are equal.

@param p the object to test for equality with this parameters object.

@return true if the specified object is equal to this parameters object.

## URICertStoreParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters
including the URI used to construct this object.

@return a formatted string describing the parameters