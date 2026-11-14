# RuntimePermission class (java.lang)

```java
public final class RuntimePermission extends BasicPermission
```

This class is for runtime permissions. A {@code RuntimePermission}
contains a name (also referred to as a "target name") but no actions
list; you either have the named permission or you don't.
<p>
The target name is the name of the runtime permission. The naming convention
follows the hierarchical property naming convention, typically the reverse
domain name notation, to avoid name clashes.
An asterisk may appear at the end of the name, following a ".",
or by itself, to signify a wildcard match. For example: "loadLibrary.*"
and "*" signify a wildcard match, while "*loadLibrary" and "a*b" do not.
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

## RuntimePermission.RuntimePermission(String)

```java
public RuntimePermission(String name)
```

Creates a new RuntimePermission with the specified name.
The name is the symbolic name of the RuntimePermission, such as
"exit", "setFactory", etc. An asterisk
may appear at the end of the name, following a ".", or by itself, to
signify a wildcard match.

@param name the name of the RuntimePermission.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.

## RuntimePermission.RuntimePermission(String, String)

```java
public RuntimePermission(String name, String actions)
```

Creates a new RuntimePermission object with the specified name.
The name is the symbolic name of the RuntimePermission, and the
actions String is currently unused and should be null.

@param name the name of the RuntimePermission.
@param actions should be null.

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.