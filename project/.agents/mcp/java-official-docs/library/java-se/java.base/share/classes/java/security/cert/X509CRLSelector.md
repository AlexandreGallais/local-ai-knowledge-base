# X509CRLSelector class (java.security.cert)

```java
public class X509CRLSelector implements CRLSelector
```

A {@code CRLSelector} that selects {@code X509CRLs} that
match all specified criteria. This class is particularly useful when
selecting CRLs from a {@code CertStore} to check revocation status
of a particular certificate.
<p>
When first constructed, an {@code X509CRLSelector} has no criteria
enabled and each of the {@code get} methods return a default
value ({@code null}). Therefore, the {@link #match match} method
would return {@code true} for any {@code X509CRL}. Typically,
several criteria are enabled (by calling {@link #setIssuers setIssuers}
or {@link #setDateAndTime setDateAndTime}, for instance) and then the
{@code X509CRLSelector} is passed to
{@link CertStore#getCRLs CertStore.getCRLs} or some similar
method.
<p>
Please refer to <a href="https://tools.ietf.org/html/rfc5280">RFC 5280:
Internet X.509 Public Key Infrastructure Certificate and CRL Profile</a>
for definitions of the X.509 CRL fields and extensions mentioned below.
<p>
<b>Concurrent Access</b>
<p>
Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

@spec https://www.rfc-editor.org/info/rfc5280
     RFC 5280: Internet X.509 Public Key Infrastructure Certificate
             and Certificate Revocation List (CRL) Profile
@see CRLSelector
@see X509CRL

@since       1.4
@author      Steve Hanna

## X509CRLSelector.X509CRLSelector()

```java
public X509CRLSelector()
```

Creates an {@code X509CRLSelector}. Initially, no criteria are set
so any {@code X509CRL} will match.

## X509CRLSelector.setIssuers(Collection<X500Principal>)

```java
public void setIssuers(Collection<X500Principal> issuers)
```

Sets the issuerNames criterion. The issuer distinguished name in the
{@code X509CRL} must match at least one of the specified
distinguished names. If {@code null}, any issuer distinguished name
will do.
<p>
This method allows the caller to specify, with a single method call,
the complete set of issuer names which {@code X509CRLs} may contain.
The specified value replaces the previous value for the issuerNames
criterion.
<p>
The {@code names} parameter (if not {@code null}) is a
{@code Collection} of {@code X500Principal}s.
<p>
Note that the {@code names} parameter can contain duplicate
distinguished names, but they may be removed from the
{@code Collection} of names returned by the
{@link #getIssuers getIssuers} method.
<p>
Note that a copy is performed on the {@code Collection} to
protect against subsequent modifications.

@param issuers a {@code Collection} of X500Principals
  (or {@code null})
@see #getIssuers
@since 1.5

## X509CRLSelector.setIssuerNames(Collection<?>)

```java
public void setIssuerNames(Collection<?> names) throws IOException
```

<strong>Note:</strong> use {@linkplain #setIssuers(Collection)} instead
or only specify the byte array form of distinguished names when using
this method. See {@link #addIssuerName(String)} for more information.
<p>
Sets the issuerNames criterion. The issuer distinguished name in the
{@code X509CRL} must match at least one of the specified
distinguished names. If {@code null}, any issuer distinguished name
will do.
<p>
This method allows the caller to specify, with a single method call,
the complete set of issuer names which {@code X509CRLs} may contain.
The specified value replaces the previous value for the issuerNames
criterion.
<p>
The {@code names} parameter (if not {@code null}) is a
{@code Collection} of names. Each name is a {@code String}
or a byte array representing a distinguished name (in
<a href="http://www.ietf.org/rfc/rfc2253.txt">RFC 2253</a> or
ASN.1 DER encoded form, respectively). If {@code null} is supplied
as the value for this argument, no issuerNames check will be performed.
<p>
Note that the {@code names} parameter can contain duplicate
distinguished names, but they may be removed from the
{@code Collection} of names returned by the
{@link #getIssuerNames getIssuerNames} method.
<p>
If a name is specified as a byte array, it should contain a single DER
encoded distinguished name, as defined in X.501. The ASN.1 notation for
this structure is as follows.
<pre>{@code
Name ::= CHOICE {
  RDNSequence }

RDNSequence ::= SEQUENCE OF RelativeDistinguishedName

RelativeDistinguishedName ::=
  SET SIZE (1 .. MAX) OF AttributeTypeAndValue

AttributeTypeAndValue ::= SEQUENCE {
  type     AttributeType,
  value    AttributeValue }

AttributeType ::= OBJECT IDENTIFIER

AttributeValue ::= ANY DEFINED BY AttributeType
....
DirectoryString ::= CHOICE {
      teletexString           TeletexString (SIZE (1..MAX)),
      printableString         PrintableString (SIZE (1..MAX)),
      universalString         UniversalString (SIZE (1..MAX)),
      utf8String              UTF8String (SIZE (1.. MAX)),
      bmpString               BMPString (SIZE (1..MAX)) }
}</pre>
<p>
Note that a deep copy is performed on the {@code Collection} to
protect against subsequent modifications.

@param names a {@code Collection} of names (or {@code null})
@throws IOException if a parsing error occurs

@spec https://www.rfc-editor.org/info/rfc2253
     RFC 2253: Lightweight Directory Access Protocol (v3):
             UTF-8 String Representation of Distinguished Names
@see #getIssuerNames

## X509CRLSelector.addIssuer(X500Principal)

```java
public void addIssuer(X500Principal issuer)
```

Adds a name to the issuerNames criterion. The issuer distinguished
name in the {@code X509CRL} must match at least one of the specified
distinguished names.
<p>
This method allows the caller to add a name to the set of issuer names
which {@code X509CRLs} may contain. The specified name is added to
any previous value for the issuerNames criterion.
If the specified name is a duplicate, it may be ignored.

@param issuer the issuer as X500Principal
@since 1.5

## X509CRLSelector.addIssuerName(String)

```java
public void addIssuerName(String name) throws IOException
```

Adds a name to the issuerNames criterion. The issuer distinguished
name in the {@code X509CRL} must match at least one of the specified
distinguished names.
<p>
This method allows the caller to add a name to the set of issuer names
which {@code X509CRLs} may contain. The specified name is added to
any previous value for the issuerNames criterion.
If the specified name is a duplicate, it may be ignored.

@param name the name in
    <a href="http://www.ietf.org/rfc/rfc2253.txt">RFC 2253</a> form
@throws IOException if a parsing error occurs

@spec https://www.rfc-editor.org/info/rfc2253
     RFC 2253: Lightweight Directory Access Protocol (v3):
             UTF-8 String Representation of Distinguished Names
@deprecated Use {@link #addIssuer(X500Principal)} or
{@link #addIssuerName(byte[])} instead. This method should not be
relied on as it can fail to match some CRLs because of a loss of
encoding information in the RFC 2253 String form of some distinguished
names.

## X509CRLSelector.addIssuerName(byte[])

```java
public void addIssuerName(byte[] name) throws IOException
```

Adds a name to the issuerNames criterion. The issuer distinguished
name in the {@code X509CRL} must match at least one of the specified
distinguished names.
<p>
This method allows the caller to add a name to the set of issuer names
which {@code X509CRLs} may contain. The specified name is added to
any previous value for the issuerNames criterion. If the specified name
is a duplicate, it may be ignored.
If a name is specified as a byte array, it should contain a single DER
encoded distinguished name, as defined in X.501. The ASN.1 notation for
this structure is as follows.
<p>
The name is provided as a byte array. This byte array should contain
a single DER encoded distinguished name, as defined in X.501. The ASN.1
notation for this structure appears in the documentation for
{@link #setIssuerNames setIssuerNames(Collection names)}.
<p>
Note that the byte array supplied here is cloned to protect against
subsequent modifications.

@param name a byte array containing the name in ASN.1 DER encoded form
@throws IOException if a parsing error occurs

## X509CRLSelector.setMinCRLNumber(BigInteger)

```java
public void setMinCRLNumber(BigInteger minCRL)
```

Sets the minCRLNumber criterion. The {@code X509CRL} must have a
CRL number extension whose value is greater than or equal to the
specified value. If {@code null}, no minCRLNumber check will be
done.

@param minCRL the minimum CRL number accepted (or {@code null})

## X509CRLSelector.setMaxCRLNumber(BigInteger)

```java
public void setMaxCRLNumber(BigInteger maxCRL)
```

Sets the maxCRLNumber criterion. The {@code X509CRL} must have a
CRL number extension whose value is less than or equal to the
specified value. If {@code null}, no maxCRLNumber check will be
done.

@param maxCRL the maximum CRL number accepted (or {@code null})

## X509CRLSelector.setDateAndTime(Date)

```java
public void setDateAndTime(Date dateAndTime)
```

Sets the dateAndTime criterion. The specified date must be
equal to or later than the value of the thisUpdate component
of the {@code X509CRL} and earlier than the value of the
nextUpdate component. There is no match if the {@code X509CRL}
does not contain a nextUpdate component.
If {@code null}, no dateAndTime check will be done.
<p>
Note that the {@code Date} supplied here is cloned to protect
against subsequent modifications.

@param dateAndTime the {@code Date} to match against
                   (or {@code null})
@see #getDateAndTime

## X509CRLSelector.setCertificateChecking(X509Certificate)

```java
public void setCertificateChecking(X509Certificate cert)
```

Sets the certificate being checked. This is not a criterion. Rather,
it is optional information that may help a {@code CertStore}
find CRLs that would be relevant when checking revocation for the
specified certificate. If {@code null} is specified, then no
such optional information is provided.

@param cert the {@code X509Certificate} being checked
            (or {@code null})
@see #getCertificateChecking

## X509CRLSelector.getIssuers()

```java
public Collection<X500Principal> getIssuers()
```

Returns the issuerNames criterion. The issuer distinguished
name in the {@code X509CRL} must match at least one of the specified
distinguished names. If the value returned is {@code null}, any
issuer distinguished name will do.
<p>
If the value returned is not {@code null}, it is a
unmodifiable {@code Collection} of {@code X500Principal}s.

@return an unmodifiable {@code Collection} of names
  (or {@code null})
@see #setIssuers
@since 1.5

## X509CRLSelector.getIssuerNames()

```java
public Collection<Object> getIssuerNames()
```

Returns a copy of the issuerNames criterion. The issuer distinguished
name in the {@code X509CRL} must match at least one of the specified
distinguished names. If the value returned is {@code null}, any
issuer distinguished name will do.
<p>
If the value returned is not {@code null}, it is a
{@code Collection} of names. Each name is a {@code String}
or a byte array representing a distinguished name (in
<a href="http://www.ietf.org/rfc/rfc2253.txt">RFC 2253</a> or
ASN.1 DER encoded form, respectively).  Note that the
{@code Collection} returned may contain duplicate names.
<p>
If a name is specified as a byte array, it should contain a single DER
encoded distinguished name, as defined in X.501. The ASN.1 notation for
this structure is given in the documentation for
{@link #setIssuerNames setIssuerNames(Collection names)}.
<p>
Note that a deep copy is performed on the {@code Collection} to
protect against subsequent modifications.

@return a {@code Collection} of names (or {@code null})

@spec https://www.rfc-editor.org/info/rfc2253
     RFC 2253: Lightweight Directory Access Protocol (v3):
             UTF-8 String Representation of Distinguished Names
@see #setIssuerNames

## X509CRLSelector.getMinCRL()

```java
public BigInteger getMinCRL()
```

Returns the minCRLNumber criterion. The {@code X509CRL} must have a
CRL number extension whose value is greater than or equal to the
specified value. If {@code null}, no minCRLNumber check will be done.

@return the minimum CRL number accepted (or {@code null})

## X509CRLSelector.getMaxCRL()

```java
public BigInteger getMaxCRL()
```

Returns the maxCRLNumber criterion. The {@code X509CRL} must have a
CRL number extension whose value is less than or equal to the
specified value. If {@code null}, no maxCRLNumber check will be
done.

@return the maximum CRL number accepted (or {@code null})

## X509CRLSelector.getDateAndTime()

```java
public Date getDateAndTime()
```

Returns the dateAndTime criterion. The specified date must be
equal to or later than the value of the thisUpdate component
of the {@code X509CRL} and earlier than the value of the
nextUpdate component. There is no match if the
{@code X509CRL} does not contain a nextUpdate component.
If {@code null}, no dateAndTime check will be done.
<p>
Note that the {@code Date} returned is cloned to protect against
subsequent modifications.

@return the {@code Date} to match against (or {@code null})
@see #setDateAndTime

## X509CRLSelector.getCertificateChecking()

```java
public X509Certificate getCertificateChecking()
```

Returns the certificate being checked. This is not a criterion. Rather,
it is optional information that may help a {@code CertStore}
find CRLs that would be relevant when checking revocation for the
specified certificate. If the value returned is {@code null}, then
no such optional information is provided.

@return the certificate being checked (or {@code null})
@see #setCertificateChecking

## X509CRLSelector.toString()

```java
public String toString()
```

Returns a printable representation of the {@code X509CRLSelector}.

@return a {@code String} describing the contents of the
        {@code X509CRLSelector}.

## X509CRLSelector.match(CRL)

```java
public boolean match(CRL crl)
```

Decides whether a {@code CRL} should be selected.

@param crl the {@code CRL} to be checked
@return {@code true} if the {@code CRL} should be selected,
        {@code false} otherwise

## X509CRLSelector.clone()

```java
public Object clone()
```

Returns a copy of this object.

@return the copy