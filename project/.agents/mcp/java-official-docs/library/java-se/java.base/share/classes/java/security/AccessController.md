---
title: "AccessController class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AccessController.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AccessController class (java.security)

```java
public final class AccessController
```

`AccessController` was used with the Security Manager for access
control operations and decisions. This feature no longer exists.

**Since:** 1.2

**Deprecated:** This class was only useful in conjunction with the Security Manager, which is no longer supported.
      There is no replacement for the Security Manager or this class.

## AccessController.doPrivileged(PrivilegedAction<T>)

```java
public static <T> T doPrivileged(PrivilegedAction<T> action)
```

Performs the specified action.

 If the action's `run` method throws an (unchecked)
exception, it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedAction's `run` method
- `action`: the action to be performed

**Returns:** the value returned by the action's `run` method

**See also:** #doPrivileged(PrivilegedAction,AccessControlContext)

**See also:** #doPrivileged(PrivilegedExceptionAction)

**API note:** This method originally performed the specified
    `PrivilegedAction` with privileges enabled. Running the action
    with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

Throws:

- `NullPointerException`: if the action is `null`

## AccessController.doPrivilegedWithCombiner(PrivilegedAction<T>)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedAction<T> action)
```

Performs the specified action.

 If the action's `run` method throws an (unchecked)
exception, it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedAction's `run` method
- `action`: the action to be performed

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedAction` with privileges enabled and with the current
    access control context's domain combiner preserved. Running the
    action with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

**Since:** 1.6

Throws:

- `NullPointerException`: if the action is `null`

## AccessController.doPrivileged(PrivilegedAction<T>, AccessControlContext)

```java
public static <T> T doPrivileged(PrivilegedAction<T> action, AccessControlContext context)
```

Performs the specified action.

If the action's `run` method throws an (unchecked) exception,
it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedAction's `run` method
- `action`: the action to be performed.
- `context`: ignored

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedAction` with privileges enabled and restricted
    by the specified `AccessControlContext`. Running the
    action with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

Throws:

- `NullPointerException`: if the action is `null`

## AccessController.doPrivileged(PrivilegedAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivileged(PrivilegedAction<T> action, AccessControlContext context, Permission... perms)
```

Performs the specified action.

If the action's `run` method throws an (unchecked) exception,
it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedAction's `run` method
- `action`: the action to be performed
- `context`: ignored
- `perms`: ignored

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedAction` with privileges enabled and restricted
    by the specified `AccessControlContext` and with a privilege
    scope limited by the specified `Permission` arguments. Running
    the action with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

**Since:** 1.8

Throws:

- `NullPointerException`: if action is `null`

## AccessController.doPrivilegedWithCombiner(PrivilegedAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedAction<T> action, AccessControlContext context, Permission... perms)
```

Performs the specified action.

If the action's `run` method throws an (unchecked) exception,
it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedAction's `run` method
- `action`: the action to be performed
- `context`: ignored
- `perms`: ignored

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedAction` with privileges enabled and restricted
    by the specified `AccessControlContext` and with a privilege
    scope limited by the specified `Permission` arguments. This
    method also originally preserved the current access control context's
    domain combiner while the action was performed. Running the action
    with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

**Since:** 1.8

Throws:

- `NullPointerException`: if action is `null`

## AccessController.doPrivileged(PrivilegedExceptionAction<T>)

```java
public static <T> T doPrivileged(PrivilegedExceptionAction<T> action) throws PrivilegedActionException
```

Performs the specified action.

 If the action's `run` method throws an *unchecked*
exception, it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedExceptionAction's `run` method
- `action`: the action to be performed

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedExceptionAction` with privileges enabled. Running
    the action with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

Throws:

- `PrivilegedActionException`: if the specified action's `run` method threw a *checked* exception
- `NullPointerException`: if the action is `null`

## AccessController.doPrivilegedWithCombiner(PrivilegedExceptionAction<T>)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedExceptionAction<T> action) throws PrivilegedActionException
```

Performs the specified action.

 If the action's `run` method throws an *unchecked*
exception, it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedExceptionAction's `run` method
- `action`: the action to be performed

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedExceptionAction` with privileges enabled and with
    the current access control context's domain combiner preserved.
    Running the action with privileges enabled was only useful in
    conjunction with the Security Manager,
    which is no longer supported. This method has been changed to run
    the action as is, and has equivalent behavior as if there were no
    Security Manager enabled. There is no replacement for the Security
    Manager or this method.

**Since:** 1.6

Throws:

- `PrivilegedActionException`: if the specified action's `run` method threw a *checked* exception
- `NullPointerException`: if the action is `null`

## AccessController.doPrivileged(PrivilegedExceptionAction<T>, AccessControlContext)

```java
public static <T> T doPrivileged(PrivilegedExceptionAction<T> action, AccessControlContext context) throws PrivilegedActionException
```

Performs the specified action.

If the action's `run` method throws an *unchecked*
exception, it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedExceptionAction's `run` method
- `action`: the action to be performed
- `context`: ignored

**Returns:** the value returned by the action's `run` method

**See also:** #doPrivileged(PrivilegedAction)

**See also:** #doPrivileged(PrivilegedAction,AccessControlContext)

**API note:** This method originally performed the specified
    `PrivilegedExceptionAction` with privileges enabled and
    restricted by the specified `AccessControlContext`. Running the
    action with privileges enabled was only useful in conjunction with
    the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

Throws:

- `PrivilegedActionException`: if the specified action's `run` method threw a *checked* exception
- `NullPointerException`: if the action is `null`

## AccessController.doPrivileged(PrivilegedExceptionAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivileged(PrivilegedExceptionAction<T> action, AccessControlContext context, Permission... perms) throws PrivilegedActionException
```

Performs the specified action.

If the action's `run` method throws an (unchecked) exception,
it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedExceptionAction's `run` method
- `action`: the action to be performed
- `context`: ignored
- `perms`: ignored

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedExceptionAction` with privileges enabled and
    restricted by the specified `AccessControlContext` and with a
    privilege scope limited by the specified `Permission`
    arguments. Running the action with privileges enabled was only useful
    in conjunction with the Security Manager,
    which is no longer supported. This method has been changed to run
    the action as is, and has equivalent behavior as if there were no
    Security Manager enabled. There is no replacement for the Security
    Manager or this method.

**Since:** 1.8

Throws:

- `PrivilegedActionException`: if the specified action's `run` method threw a *checked* exception
- `NullPointerException`: if action is `null`

## AccessController.doPrivilegedWithCombiner(PrivilegedExceptionAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedExceptionAction<T> action, AccessControlContext context, Permission... perms) throws PrivilegedActionException
```

Performs the specified action.

If the action's `run` method throws an (unchecked) exception,
it will propagate through this method.

Parameters:

- `<T>`: the type of the value returned by the PrivilegedExceptionAction's `run` method
- `action`: the action to be performed
- `context`: ignored
- `perms`: ignored

**Returns:** the value returned by the action's `run` method

**API note:** This method originally performed the specified
    `PrivilegedExceptionAction` with privileges enabled and
    restricted by the specified `AccessControlContext` and with a
    privilege scope limited by the specified `Permission`
    arguments. This method also preserved the current access control
    context's domain combiner while the action was performed. Running
    the action with privileges enabled was only useful in conjunction
    with the Security Manager, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

**Since:** 1.8

Throws:

- `PrivilegedActionException`: if the specified action's `run` method threw a *checked* exception
- `NullPointerException`: if action is `null`

## AccessController.getContext()

```java
public static AccessControlContext getContext()
```

Returns an `AccessControlContext` where the `checkPermission`
method always throws an `AccessControlException` and the
`getDomainCombiner` method always returns `null`.

**Returns:** an `AccessControlContext` as specified above

**See also:** AccessControlContext

**API note:** This method originally returned a snapshot of the current
      calling context, which included the current thread's access
      control context and any limited privilege scope. This method has
      been changed to always return an innocuous
      `AccessControlContext` that fails all permission checks.
      This method was only useful in conjunction with
      the Security Manager, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.

## AccessController.checkPermission(Permission)

```java
public static void checkPermission(Permission perm) throws AccessControlException
```

Throws `AccessControlException`.

Parameters:

- `perm`: ignored

**API note:** This method originally determined whether the access request
      indicated by the specified permission should be allowed or denied,
      based on the current `AccessControlContext` and security
      policy. This method has been changed to always throw
      `AccessControlException`. This method was only useful in
      conjunction with the Security Manager,
      which is no longer supported. There is no replacement for the
      Security Manager or this method.

Throws:

- `AccessControlException`: always
