# CodeSource class (java.security)

```java
public class CodeSource implements java.io.Serializable
```

<p>This class extends the concept of a codebase to
encapsulate not only the location (URL) but also the certificate chains
that were used to verify signed code originating from that location.

@author Li Gong
@author Roland Schemers
@since 1.2

## CodeSource.CodeSource(URL, java.security.cert.Certificate[])

```java
public CodeSource(URL url, java.security.cert.Certificate[] certs)
```

Constructs a {@code CodeSource} and associates it with the specified
location and set of certificates.

@param url the location (URL).  It may be {@code null}.
@param certs the certificate(s). It may be {@code null}. The contents
of the array are copied to protect against subsequent modification.

## CodeSource.CodeSource(URL, CodeSigner[])

```java
public CodeSource(URL url, CodeSigner[] signers)
```

Constructs a {@code CodeSource} and associates it with the specified
location and set of code signers.

@param url the location (URL).  It may be {@code null}.
@param signers the code signers. It may be {@code null}. The contents
of the array are copied to protect against subsequent modification.

@since 1.5

## CodeSource.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this object}

## CodeSource.equals(Object)

```java
public boolean equals(Object obj)
```

Tests for equality between the specified object and this
object. Two {@code CodeSource} objects are considered equal if their
locations are of identical value and if their signer certificate
chains are of identical value. It is not required that
the certificate chains be in the same order.

@param obj the object to test for equality with this object.

@return {@code true} if the objects are considered equal,
{@code false} otherwise.

## CodeSource.getLocation()

```java
public final URL getLocation()
```

Returns the location associated with this {@code CodeSource}.

@return the location (URL), or {@code null} if no URL was supplied
during construction.

## CodeSource.getCertificates()

```java
public final java.security.cert.Certificate[] getCertificates()
```

Returns the certificates associated with this {@code CodeSource}.
<p>
If this {@code CodeSource} object was created using the
{@link #CodeSource(URL url, CodeSigner[] signers)}
constructor then its certificate chains are extracted and used to
create an array of {@code Certificate} objects. Each signer certificate
is followed by its supporting certificate chain (which may be empty).
Each signer certificate and its supporting certificate chain is ordered
bottom-to-top (i.e., with the signer certificate first and the (root)
certificate authority last).

@return a copy of the certificate array, or {@code null} if there
is none.

## CodeSource.getCodeSigners()

```java
public final CodeSigner[] getCodeSigners()
```

Returns the code signers associated with this {@code CodeSource}.
<p>
If this {@code CodeSource} object was created using the
{@link #CodeSource(URL url, java.security.cert.Certificate[] certs)}
constructor then its certificate chains are extracted and used to
create an array of {@code CodeSigner} objects. Note that only X.509
certificates are examined - all other certificate types are ignored.

@return a copy of the code signer array, or {@code null} if there
is none.

@since 1.5

## CodeSource.implies(CodeSource)

```java
public boolean implies(CodeSource codesource)
```

Returns true if this {@code CodeSource} object "implies" the specified
{@code CodeSource}.
<p>
More specifically, this method makes the following checks.
If any fail, it returns {@code false}. If they all succeed, it returns
{@code true}.
<ul>
<li> <i>codesource</i> must not be null.
<li> If this object's certificates are not null, then all
of this object's certificates must be present in <i>codesource</i>'s
certificates.
<li> If this object's location (getLocation()) is not null, then the
following checks are made against this object's location and
<i>codesource</i>'s:
  <ul>
    <li>  <i>codesource</i>'s location must not be null.

    <li>  If this object's location
          equals <i>codesource</i>'s location, then return true.

    <li>  This object's protocol (getLocation().getProtocol()) must be
          equal to <i>codesource</i>'s protocol, ignoring case.

    <li>  If this object's host (getLocation().getHost()) is not null,
          then the SocketPermission
          constructed with this object's host must imply the
          SocketPermission constructed with <i>codesource</i>'s host.

    <li>  If this object's port (getLocation().getPort()) is not
          equal to -1 (that is, if a port is specified), it must equal
          <i>codesource</i>'s port or default port
          (codesource.getLocation().getDefaultPort()).

    <li>  If this object's file (getLocation().getFile()) doesn't equal
          <i>codesource</i>'s file, then the following checks are made:
          If this object's file ends with "/-",
          then <i>codesource</i>'s file must start with this object's
          file (exclusive the trailing "-").
          If this object's file ends with a "/*",
          then <i>codesource</i>'s file must start with this object's
          file and must not have any further "/" separators.
          If this object's file doesn't end with a "/",
          then <i>codesource</i>'s file must match this object's
          file with a '/' appended.

    <li>  If this object's reference (getLocation().getRef()) is
          not null, it must equal <i>codesource</i>'s reference.

  </ul>
</ul>
<p>
For example, the codesource objects with the following locations
and {@code null} certificates all imply the codesource with the location
{@code http://www.example.com/classes/foo.jar}
and {@code null} certificates:
<pre>
    http:
    http://*.example.com/classes/*
    http://www.example.com/classes/-
    http://www.example.com/classes/foo.jar
</pre>

Note that if this {@code CodeSource} has a {@code null} location and a
{@code null} certificate chain, then it implies every other
{@code CodeSource}.

@param codesource {@code CodeSource} to compare against.

@return {@code true} if the specified codesource is implied by this
codesource, {@code false} if not.

## CodeSource.toString()

```java
public String toString()
```

Returns a string describing this {@code CodeSource}, telling its
URL and certificates.

@return information about this {@code CodeSource}.