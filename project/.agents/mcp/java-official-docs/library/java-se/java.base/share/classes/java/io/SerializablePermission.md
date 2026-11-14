# SerializablePermission class (java.io)

```java
/* code was borrowed originally from java.lang.RuntimePermission. */ public final class SerializablePermission extends BasicPermission
```

This class is for Serializable permissions. A SerializablePermission
contains a name (also referred to as a "target name") but
no actions list; you either have the named permission
or you don't.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@see java.security.BasicPermission
@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection

@author Joe Fialli
@since 1.2

## SerializablePermission.SerializablePermission(String)

```java
public SerializablePermission(String name)
```

Creates a new SerializablePermission with the specified name.
The name is the symbolic name of the SerializablePermission, such as
"enableSubstitution", etc.

@param name the name of the SerializablePermission.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.

## SerializablePermission.SerializablePermission(String, String)

```java
public SerializablePermission(String name, String actions)
```

Creates a new SerializablePermission object with the specified name.
The name is the symbolic name of the SerializablePermission, and the
actions String is currently unused and should be null.

@param name the name of the SerializablePermission.
@param actions currently unused and must be set to null

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.