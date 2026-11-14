# ECKey interface (java.security.interfaces)

```java
public interface ECKey
```

The interface to an elliptic curve (EC) key.

@author Valerie Peng

@since 1.5

## ECKey.getParams()

```java
ECParameterSpec getParams()
```

Returns the domain parameters associated
with this key. The domain parameters are
either explicitly specified or implicitly
created during key generation.
@return the associated domain parameters.