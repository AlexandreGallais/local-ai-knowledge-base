# AccessController class (java.security)

```java
public final class AccessController
```

{@code AccessController} was used with the Security Manager for access
control operations and decisions. This feature no longer exists.

@author Li Gong
@author Roland Schemers
@since 1.2
@deprecated This class was only useful in conjunction with {@linkplain
      SecurityManager the Security Manager}, which is no longer supported.
      There is no replacement for the Security Manager or this class.

## AccessController.doPrivileged(PrivilegedAction<T>)

```java
public static <T> T doPrivileged(PrivilegedAction<T> action)
```

Performs the specified action.

<p> If the action's {@code run} method throws an (unchecked)
exception, it will propagate through this method.

@param <T> the type of the value returned by the PrivilegedAction's
                 {@code run} method

@param action the action to be performed

@return the value returned by the action's {@code run} method

@throws    NullPointerException if the action is {@code null}

@see #doPrivileged(PrivilegedAction,AccessControlContext)
@see #doPrivileged(PrivilegedExceptionAction)
@apiNote This method originally performed the specified
    {@code PrivilegedAction} with privileges enabled. Running the action
    with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

## AccessController.doPrivilegedWithCombiner(PrivilegedAction<T>)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedAction<T> action)
```

Performs the specified action.

<p> If the action's {@code run} method throws an (unchecked)
exception, it will propagate through this method.

@param <T> the type of the value returned by the PrivilegedAction's
                 {@code run} method

@param action the action to be performed

@return the value returned by the action's {@code run} method

@throws    NullPointerException if the action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedAction} with privileges enabled and with the current
    access control context's domain combiner preserved. Running the
    action with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

@since 1.6

## AccessController.doPrivileged(PrivilegedAction<T>, AccessControlContext)

```java
public static <T> T doPrivileged(PrivilegedAction<T> action, AccessControlContext context)
```

Performs the specified action.
<p>
If the action's {@code run} method throws an (unchecked) exception,
it will propagate through this method.

@param <T> the type of the value returned by the PrivilegedAction's
                 {@code run} method
@param action the action to be performed.
@param context ignored

@return the value returned by the action's {@code run} method

@throws    NullPointerException if the action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedAction} with privileges enabled and restricted
    by the specified {@code AccessControlContext}. Running the
    action with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

## AccessController.doPrivileged(PrivilegedAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivileged(PrivilegedAction<T> action, AccessControlContext context, Permission... perms)
```

Performs the specified action.

<p>
If the action's {@code run} method throws an (unchecked) exception,
it will propagate through this method.

@param <T> the type of the value returned by the PrivilegedAction's
                 {@code run} method
@param action the action to be performed
@param context ignored
@param perms ignored

@return the value returned by the action's {@code run} method

@throws NullPointerException if action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedAction} with privileges enabled and restricted
    by the specified {@code AccessControlContext} and with a privilege
    scope limited by the specified {@code Permission} arguments. Running
    the action with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

@since 1.8

## AccessController.doPrivilegedWithCombiner(PrivilegedAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedAction<T> action, AccessControlContext context, Permission... perms)
```

Performs the specified action.

<p>
If the action's {@code run} method throws an (unchecked) exception,
it will propagate through this method.

@param <T> the type of the value returned by the PrivilegedAction's
                 {@code run} method
@param action the action to be performed
@param context ignored
@param perms ignored

@return the value returned by the action's {@code run} method

@throws NullPointerException if action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedAction} with privileges enabled and restricted
    by the specified {@code AccessControlContext} and with a privilege
    scope limited by the specified {@code Permission} arguments. This
    method also originally preserved the current access control context's
    domain combiner while the action was performed. Running the action
    with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

@since 1.8

## AccessController.doPrivileged(PrivilegedExceptionAction<T>)

```java
public static <T> T doPrivileged(PrivilegedExceptionAction<T> action) throws PrivilegedActionException
```

Performs the specified action.

<p> If the action's {@code run} method throws an <i>unchecked</i>
exception, it will propagate through this method.

@param <T> the type of the value returned by the
                 PrivilegedExceptionAction's {@code run} method

@param action the action to be performed

@return the value returned by the action's {@code run} method

@throws    PrivilegedActionException if the specified action's
        {@code run} method threw a <i>checked</i> exception
@throws    NullPointerException if the action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedExceptionAction} with privileges enabled. Running
    the action with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

## AccessController.doPrivilegedWithCombiner(PrivilegedExceptionAction<T>)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedExceptionAction<T> action) throws PrivilegedActionException
```

Performs the specified action.

<p> If the action's {@code run} method throws an <i>unchecked</i>
exception, it will propagate through this method.

@param <T> the type of the value returned by the
                 PrivilegedExceptionAction's {@code run} method

@param action the action to be performed

@return the value returned by the action's {@code run} method

@throws    PrivilegedActionException if the specified action's
        {@code run} method threw a <i>checked</i> exception
@throws    NullPointerException if the action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedExceptionAction} with privileges enabled and with
    the current access control context's domain combiner preserved.
    Running the action with privileges enabled was only useful in
    conjunction with {@linkplain SecurityManager the Security Manager},
    which is no longer supported. This method has been changed to run
    the action as is, and has equivalent behavior as if there were no
    Security Manager enabled. There is no replacement for the Security
    Manager or this method.

@since 1.6

## AccessController.doPrivileged(PrivilegedExceptionAction<T>, AccessControlContext)

```java
public static <T> T doPrivileged(PrivilegedExceptionAction<T> action, AccessControlContext context) throws PrivilegedActionException
```

Performs the specified action.
<p>
If the action's {@code run} method throws an <i>unchecked</i>
exception, it will propagate through this method.

@param <T> the type of the value returned by the
                 PrivilegedExceptionAction's {@code run} method
@param action the action to be performed
@param context ignored

@return the value returned by the action's {@code run} method

@throws    PrivilegedActionException if the specified action's
        {@code run} method threw a <i>checked</i> exception
@throws    NullPointerException if the action is {@code null}

@see #doPrivileged(PrivilegedAction)
@see #doPrivileged(PrivilegedAction,AccessControlContext)
@apiNote This method originally performed the specified
    {@code PrivilegedExceptionAction} with privileges enabled and
    restricted by the specified {@code AccessControlContext}. Running the
    action with privileges enabled was only useful in conjunction with
    {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

## AccessController.doPrivileged(PrivilegedExceptionAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivileged(PrivilegedExceptionAction<T> action, AccessControlContext context, Permission... perms) throws PrivilegedActionException
```

Performs the specified action.

<p>
If the action's {@code run} method throws an (unchecked) exception,
it will propagate through this method.

@param <T> the type of the value returned by the
                 PrivilegedExceptionAction's {@code run} method
@param action the action to be performed
@param context ignored
@param perms ignored

@return the value returned by the action's {@code run} method

@throws PrivilegedActionException if the specified action's
        {@code run} method threw a <i>checked</i> exception
@throws NullPointerException if action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedExceptionAction} with privileges enabled and
    restricted by the specified {@code AccessControlContext} and with a
    privilege scope limited by the specified {@code Permission}
    arguments. Running the action with privileges enabled was only useful
    in conjunction with {@linkplain SecurityManager the Security Manager},
    which is no longer supported. This method has been changed to run
    the action as is, and has equivalent behavior as if there were no
    Security Manager enabled. There is no replacement for the Security
    Manager or this method.

@since 1.8

## AccessController.doPrivilegedWithCombiner(PrivilegedExceptionAction<T>, AccessControlContext, Permission...)

```java
public static <T> T doPrivilegedWithCombiner(PrivilegedExceptionAction<T> action, AccessControlContext context, Permission... perms) throws PrivilegedActionException
```

Performs the specified action.

<p>
If the action's {@code run} method throws an (unchecked) exception,
it will propagate through this method.

@param <T> the type of the value returned by the
                 PrivilegedExceptionAction's {@code run} method
@param action the action to be performed
@param context ignored
@param perms ignored

@return the value returned by the action's {@code run} method

@throws PrivilegedActionException if the specified action's
        {@code run} method threw a <i>checked</i> exception
@throws NullPointerException if action is {@code null}

@apiNote This method originally performed the specified
    {@code PrivilegedExceptionAction} with privileges enabled and
    restricted by the specified {@code AccessControlContext} and with a
    privilege scope limited by the specified {@code Permission}
    arguments. This method also preserved the current access control
    context's domain combiner while the action was performed. Running
    the action with privileges enabled was only useful in conjunction
    with {@linkplain SecurityManager the Security Manager}, which is no
    longer supported. This method has been changed to run the action as
    is, and has equivalent behavior as if there were no Security Manager
    enabled. There is no replacement for the Security Manager or this
    method.

@since 1.8

## AccessController.getContext()

```java
public static AccessControlContext getContext()
```

Returns an {@code AccessControlContext} where the {@code checkPermission}
method always throws an {@code AccessControlException} and the
{@code getDomainCombiner} method always returns {@code null}.

@return an {@code AccessControlContext} as specified above

@see AccessControlContext
@apiNote This method originally returned a snapshot of the current
      calling context, which included the current thread's access
      control context and any limited privilege scope. This method has
      been changed to always return an innocuous
      {@code AccessControlContext} that fails all permission checks.
      This method was only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.

## AccessController.checkPermission(Permission)

```java
public static void checkPermission(Permission perm) throws AccessControlException
```

Throws {@code AccessControlException}.

@param perm ignored
@throws    AccessControlException always

@apiNote This method originally determined whether the access request
      indicated by the specified permission should be allowed or denied,
      based on the current {@code AccessControlContext} and security
      policy. This method has been changed to always throw
      {@code AccessControlException}. This method was only useful in
      conjunction with {@linkplain SecurityManager the Security Manager},
      which is no longer supported. There is no replacement for the
      Security Manager or this method.