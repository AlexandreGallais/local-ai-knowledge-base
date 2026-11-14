# URIParameter class (java.security)

```java
public class URIParameter implements Policy.Parameters, javax.security.auth.login.Configuration.Parameters
```

A parameter that contains a URI pointing to data intended for a
PolicySpi or ConfigurationSpi implementation.

@since 1.6

## URIParameter.URIParameter(java.net.URI)

```java
public URIParameter(java.net.URI uri)
```

Constructs a {@code URIParameter} with the URI pointing to
data intended for an SPI implementation.

@param uri the URI pointing to the data.

@throws    NullPointerException if the specified URI is {@code null}.

## URIParameter.getURI()

```java
public java.net.URI getURI()
```

Returns the URI.

@return uri the URI.