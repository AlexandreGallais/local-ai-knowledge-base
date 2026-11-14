# LinkPermission class (java.nio.file)

```java
public final class LinkPermission extends BasicPermission
```

The {@code Permission} class for link creation operations.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@since 1.7

## LinkPermission.LinkPermission(String)

```java
public LinkPermission(String name)
```

Constructs a {@code LinkPermission} with the specified name.

@param   name
         the name of the permission. It must be "hard" or "symbolic".

@throws  IllegalArgumentException
         if name is empty or invalid

## LinkPermission.LinkPermission(String, String)

```java
public LinkPermission(String name, String actions)
```

Constructs a {@code LinkPermission} with the specified name.

@param   name
         the name of the permission; must be "hard" or "symbolic".
@param   actions
         the actions for the permission; must be the empty string or
         {@code null}

@throws  IllegalArgumentException
         if name is empty or invalid, or actions is a non-empty string