# UserPrincipalNotFoundException class (java.nio.file.attribute)

```java
public class UserPrincipalNotFoundException extends IOException
```

Checked exception thrown when a lookup of {@link UserPrincipal} fails because
the principal does not exist.

@since 1.7

## UserPrincipalNotFoundException.UserPrincipalNotFoundException(String)

```java
public UserPrincipalNotFoundException(String name)
```

Constructs an instance of this class.

@param   name
         the principal name; may be {@code null}

## UserPrincipalNotFoundException.getName()

```java
public String getName()
```

Returns the user principal name if this exception was created with the
user principal name that was not found, otherwise {@code null}.

@return  the user principal name or {@code null}