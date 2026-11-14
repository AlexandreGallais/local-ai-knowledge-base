# ReflectPermission class (java.lang.reflect)

```java
public final class ReflectPermission extends java.security.BasicPermission
```

The Permission class for reflective operations.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@see java.security.Permission
@see java.security.BasicPermission
@see AccessibleObject

@since 1.2

## ReflectPermission.ReflectPermission(String)

```java
public ReflectPermission(String name)
```

Constructs a ReflectPermission with the specified name.

@param name the name of the ReflectPermission

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.

## ReflectPermission.ReflectPermission(String, String)

```java
public ReflectPermission(String name, String actions)
```

Constructs a ReflectPermission with the specified name and actions.
The actions should be null; they are ignored.

@param name the name of the ReflectPermission

@param actions should be null

@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalArgumentException if {@code name} is empty.