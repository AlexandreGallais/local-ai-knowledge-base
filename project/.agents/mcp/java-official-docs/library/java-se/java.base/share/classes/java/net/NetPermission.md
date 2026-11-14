# NetPermission class (java.net)

```java
public final class NetPermission extends BasicPermission
```

This class is for various network permissions.
A NetPermission contains a name (also referred to as a "target name") but
no actions list; you either have the named permission
or you don't.
<P>
The target name is the name of the network permission. The naming convention
follows the hierarchical property naming convention, typically the reverse
domain name notation, to avoid name clashes.
An asterisk may appear at the end of the name, following a ".", or by itself,
to signify a wildcard match. For example: "foo.*" and "*" signify a wildcard
match, while "*foo" and "a*b" do not.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@see java.security.BasicPermission
@see java.security.Permission
@see java.security.Permissions
@see java.security.PermissionCollection
@see java.lang.SecurityManager


@author Marianne Mueller
@author Roland Schemers
@since 1.2

## NetPermission.NetPermission(String)

```java
public NetPermission(String name)
```

Creates a new NetPermission with the specified name.
The name is the symbolic name of the NetPermission, such as
"setDefaultAuthenticator", etc. An asterisk
may appear at the end of the name, following a ".", or by itself, to
signify a wildcard match.

@param name the name of the NetPermission.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.

## NetPermission.NetPermission(String, String)

```java
public NetPermission(String name, String actions)
```

Creates a new NetPermission object with the specified name.
The name is the symbolic name of the NetPermission, and the
actions String is currently unused and should be null.

@param name the name of the NetPermission.
@param actions should be null.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.