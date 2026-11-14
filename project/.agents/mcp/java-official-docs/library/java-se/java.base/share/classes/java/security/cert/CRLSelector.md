# CRLSelector interface (java.security.cert)

```java
public interface CRLSelector extends Cloneable
```

A selector that defines a set of criteria for selecting {@code CRL}s.
Classes that implement this interface are often used to specify
which {@code CRL}s should be retrieved from a {@code CertStore}.
<p>
<b>Concurrent Access</b>
<p>
Unless otherwise specified, the methods defined in this interface are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

@see CRL
@see CertStore
@see CertStore#getCRLs

@author      Steve Hanna
@since       1.4

## CRLSelector.match(CRL)

```java
boolean match(CRL crl)
```

Decides whether a {@code CRL} should be selected.

@param   crl     the {@code CRL} to be checked
@return  {@code true} if the {@code CRL} should be selected,
{@code false} otherwise

## CRLSelector.clone()

```java
Object clone()
```

Makes a copy of this {@code CRLSelector}. Changes to the
copy will not affect the original and vice versa.

@return a copy of this {@code CRLSelector}