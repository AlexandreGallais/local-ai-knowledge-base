# AccessControlException class (java.security)

```java
public class AccessControlException extends SecurityException
```

This exception was originally thrown by the {@link AccessController} to
indicate that a requested access was denied.

@author Li Gong
@author Roland Schemers
@since 1.2
@deprecated This exception was only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no
      longer supported. There is no replacement for the Security Manager
      or this class.

## AccessControlException.AccessControlException(String)

```java
public AccessControlException(String s)
```

Constructs an {@code AccessControlException} with the
specified, detailed message.

@param   s   the detail message.

## AccessControlException.AccessControlException(String, Permission)

```java
public AccessControlException(String s, Permission p)
```

Constructs an {@code AccessControlException} with the
specified, detailed message, and the requested permission that caused
the exception.

@param   s   the detail message.
@param   p   the permission that caused the exception.

## AccessControlException.getPermission()

```java
public Permission getPermission()
```

Gets the {@code Permission} object associated with this exception, or
{@code null} if there was no corresponding {@code Permission} object.

@return the Permission object.