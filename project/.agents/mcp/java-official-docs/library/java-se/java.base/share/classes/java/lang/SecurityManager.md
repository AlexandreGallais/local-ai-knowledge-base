# SecurityManager class (java.lang)

```java
public class SecurityManager
```

SecurityManager was originally specified to allow an application implement
a security policy. It allowed an application to determine, before performing
a possibly unsafe or security sensitive operation, whether the operation was
being attempted in a security context that allowed the operation.
This feature no longer exists.

@since   1.0
@deprecated There is no replacement for this class.

## SecurityManager.SecurityManager()

```java
public SecurityManager()
```

Constructs a new {@code SecurityManager}. Setting a security manager with
{@link System#setSecurityManager(SecurityManager)} is not supported.

## SecurityManager.getClassContext()

```java
protected Class<?>[] getClassContext()
```

Returns the current execution stack as an array of classes.
<p>
The length of the array is the number of methods on the execution
stack. The element at index {@code 0} is the class of the
currently executing method, the element at index {@code 1} is
the class of that method's caller, and so on.

@apiNote The {@code StackWalker} class can be used as a replacement
for this method.

@return  the execution stack.

## SecurityManager.getSecurityContext()

```java
public Object getSecurityContext()
```

Returns an {@code AccessControlContext} where the {@code checkPermission}
method always throws an {@code AccessControlException} and the
{@code getDomainCombiner} method always returns {@code null}.

@return  an {@code AccessControlContext} as specified above
@see     java.security.AccessControlContext AccessControlContext
@apiNote This method originally returned a snapshot of the current
      calling context, which included the current thread's access
      control context and any limited privilege scope. This method has
      been changed to always return an innocuous
      {@code AccessControlContext} that fails all permission checks.
      {@linkplain SecurityManager The Security Manager} is no longer
      supported. There is no replacement for the Security Manager or
      this method.

## SecurityManager.checkPermission(Permission)

```java
public void checkPermission(Permission perm)
```

Throws {@code SecurityException}.

@param     perm   ignored
@throws    SecurityException always
@since     1.2

## SecurityManager.checkPermission(Permission, Object)

```java
public void checkPermission(Permission perm, Object context)
```

Throws {@code SecurityException}.

@param      perm      ignored
@param      context   ignored
@throws     SecurityException always
@since      1.2

## SecurityManager.checkCreateClassLoader()

```java
public void checkCreateClassLoader()
```

Throws {@code SecurityException}.

@throws    SecurityException always

## SecurityManager.checkAccess(Thread)

```java
public void checkAccess(Thread t)
```

Throws {@code SecurityException}.

@param      t   ignored
@throws     SecurityException always

## SecurityManager.checkAccess(ThreadGroup)

```java
public void checkAccess(ThreadGroup g)
```

Throws {@code SecurityException}.

@param      g   ignored
@throws     SecurityException always

## SecurityManager.checkExit(int)

```java
public void checkExit(int status)
```

Throws {@code SecurityException}.

@param      status   ignored
@throws    SecurityException always

## SecurityManager.checkExec(String)

```java
public void checkExec(String cmd)
```

Throws {@code SecurityException}.

@param      cmd   ignored
@throws     SecurityException always

## SecurityManager.checkLink(String)

```java
public void checkLink(String lib)
```

Throws {@code SecurityException}.

@param      lib   ignored
@throws     SecurityException always

## SecurityManager.checkRead(FileDescriptor)

```java
public void checkRead(FileDescriptor fd)
```

Throws {@code SecurityException}.

@param      fd   the system-dependent file descriptor
@throws     SecurityException always

## SecurityManager.checkRead(String)

```java
public void checkRead(String file)
```

Throws {@code SecurityException}.

@param      file   ignored
@throws     SecurityException always

## SecurityManager.checkRead(String, Object)

```java
public void checkRead(String file, Object context)
```

Throws {@code SecurityException}.

@param      file      ignored
@param      context   ignored
@throws     SecurityException always

## SecurityManager.checkWrite(FileDescriptor)

```java
public void checkWrite(FileDescriptor fd)
```

Throws {@code SecurityException}.

@param     fd   ignored
@throws    SecurityException always

## SecurityManager.checkWrite(String)

```java
public void checkWrite(String file)
```

Throws {@code SecurityException}.

@param      file   ignored
@throws     SecurityException always

## SecurityManager.checkDelete(String)

```java
public void checkDelete(String file)
```

Throws {@code SecurityException}.

@param      file   ignored
@throws     SecurityException always

## SecurityManager.checkConnect(String, int)

```java
public void checkConnect(String host, int port)
```

Throws {@code SecurityException}.

@param      host   ignored
@param      port   ignored
@throws     SecurityException always

## SecurityManager.checkConnect(String, int, Object)

```java
public void checkConnect(String host, int port, Object context)
```

Throws {@code SecurityException}.

@param      host      ignored
@param      port      ignored
@param      context   ignored
@throws     SecurityException always

## SecurityManager.checkListen(int)

```java
public void checkListen(int port)
```

Throws {@code SecurityException}.

@param      port   ignored
@throws     SecurityException always

## SecurityManager.checkAccept(String, int)

```java
public void checkAccept(String host, int port)
```

Throws {@code SecurityException}.

@param      host   ignored
@param      port   ignored
@throws     SecurityException always

## SecurityManager.checkMulticast(InetAddress)

```java
public void checkMulticast(InetAddress maddr)
```

Throws {@code SecurityException}.

@param      maddr  ignored
@throws     SecurityException always
@since      1.1

## SecurityManager.checkMulticast(InetAddress, byte)

```java
public void checkMulticast(InetAddress maddr, byte ttl)
```

Throws {@code SecurityException}.

@param      maddr  ignored
@param      ttl    ignored
@throws     SecurityException always
@since      1.1

## SecurityManager.checkPropertiesAccess()

```java
public void checkPropertiesAccess()
```

Throws {@code SecurityException}.

@throws     SecurityException always

## SecurityManager.checkPropertyAccess(String)

```java
public void checkPropertyAccess(String key)
```

Throws {@code SecurityException}.

@param      key  ignored
@throws     SecurityException always

## SecurityManager.checkPrintJobAccess()

```java
public void checkPrintJobAccess()
```

Throws {@code SecurityException}.

@throws     SecurityException always
@since   1.1

## SecurityManager.checkPackageAccess(String)

```java
public void checkPackageAccess(String pkg)
```

Throws {@code SecurityException}.

@param      pkg   ignored
@throws     SecurityException always

## SecurityManager.checkPackageDefinition(String)

```java
public void checkPackageDefinition(String pkg)
```

Throws {@code SecurityException}.

@param      pkg   ignored
@throws     SecurityException always

## SecurityManager.checkSetFactory()

```java
public void checkSetFactory()
```

Throws {@code SecurityException}.

@throws     SecurityException always

## SecurityManager.checkSecurityAccess(String)

```java
public void checkSecurityAccess(String target)
```

Throws {@code SecurityException}.

@param     target ignored
@throws    SecurityException always
@since   1.1

## SecurityManager.getThreadGroup()

```java
public ThreadGroup getThreadGroup()
```

{@return the current Thread's {@code ThreadGroup}}
@since   1.1