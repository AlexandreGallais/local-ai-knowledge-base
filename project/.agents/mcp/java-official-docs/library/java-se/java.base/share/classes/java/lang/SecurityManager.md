---
title: "SecurityManager class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/SecurityManager.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecurityManager class (java.lang)

```java
public class SecurityManager
```

SecurityManager was originally specified to allow an application implement
a security policy. It allowed an application to determine, before performing
a possibly unsafe or security sensitive operation, whether the operation was
being attempted in a security context that allowed the operation.
This feature no longer exists.

**Since:** 1.0

**Deprecated:** There is no replacement for this class.

## SecurityManager.SecurityManager()

```java
public SecurityManager()
```

Constructs a new `SecurityManager`. Setting a security manager with
`System.setSecurityManager(SecurityManager)` is not supported.

## SecurityManager.getClassContext()

```java
protected Class<?>[] getClassContext()
```

Returns the current execution stack as an array of classes.

The length of the array is the number of methods on the execution
stack. The element at index `0` is the class of the
currently executing method, the element at index `1` is
the class of that method's caller, and so on.

**API note:** The `StackWalker` class can be used as a replacement
for this method.

**Returns:** the execution stack.

## SecurityManager.getSecurityContext()

```java
public Object getSecurityContext()
```

Returns an `AccessControlContext` where the `checkPermission`
method always throws an `AccessControlException` and the
`getDomainCombiner` method always returns `null`.

**Returns:** an `AccessControlContext` as specified above

**See also:** java.security.AccessControlContext AccessControlContext

**API note:** This method originally returned a snapshot of the current
      calling context, which included the current thread's access
      control context and any limited privilege scope. This method has
      been changed to always return an innocuous
      `AccessControlContext` that fails all permission checks.
      The Security Manager is no longer
      supported. There is no replacement for the Security Manager or
      this method.

## SecurityManager.checkPermission(Permission)

```java
public void checkPermission(Permission perm)
```

Throws `SecurityException`.

Parameters:

- `perm`: ignored

**Since:** 1.2

Throws:

- `SecurityException`: always

## SecurityManager.checkPermission(Permission, Object)

```java
public void checkPermission(Permission perm, Object context)
```

Throws `SecurityException`.

Parameters:

- `perm`: ignored
- `context`: ignored

**Since:** 1.2

Throws:

- `SecurityException`: always

## SecurityManager.checkCreateClassLoader()

```java
public void checkCreateClassLoader()
```

Throws `SecurityException`.

Throws:

- `SecurityException`: always

## SecurityManager.checkAccess(Thread)

```java
public void checkAccess(Thread t)
```

Throws `SecurityException`.

Parameters:

- `t`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkAccess(ThreadGroup)

```java
public void checkAccess(ThreadGroup g)
```

Throws `SecurityException`.

Parameters:

- `g`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkExit(int)

```java
public void checkExit(int status)
```

Throws `SecurityException`.

Parameters:

- `status`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkExec(String)

```java
public void checkExec(String cmd)
```

Throws `SecurityException`.

Parameters:

- `cmd`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkLink(String)

```java
public void checkLink(String lib)
```

Throws `SecurityException`.

Parameters:

- `lib`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkRead(FileDescriptor)

```java
public void checkRead(FileDescriptor fd)
```

Throws `SecurityException`.

Parameters:

- `fd`: the system-dependent file descriptor

Throws:

- `SecurityException`: always

## SecurityManager.checkRead(String)

```java
public void checkRead(String file)
```

Throws `SecurityException`.

Parameters:

- `file`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkRead(String, Object)

```java
public void checkRead(String file, Object context)
```

Throws `SecurityException`.

Parameters:

- `file`: ignored
- `context`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkWrite(FileDescriptor)

```java
public void checkWrite(FileDescriptor fd)
```

Throws `SecurityException`.

Parameters:

- `fd`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkWrite(String)

```java
public void checkWrite(String file)
```

Throws `SecurityException`.

Parameters:

- `file`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkDelete(String)

```java
public void checkDelete(String file)
```

Throws `SecurityException`.

Parameters:

- `file`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkConnect(String, int)

```java
public void checkConnect(String host, int port)
```

Throws `SecurityException`.

Parameters:

- `host`: ignored
- `port`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkConnect(String, int, Object)

```java
public void checkConnect(String host, int port, Object context)
```

Throws `SecurityException`.

Parameters:

- `host`: ignored
- `port`: ignored
- `context`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkListen(int)

```java
public void checkListen(int port)
```

Throws `SecurityException`.

Parameters:

- `port`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkAccept(String, int)

```java
public void checkAccept(String host, int port)
```

Throws `SecurityException`.

Parameters:

- `host`: ignored
- `port`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkMulticast(InetAddress)

```java
public void checkMulticast(InetAddress maddr)
```

Throws `SecurityException`.

Parameters:

- `maddr`: ignored

**Since:** 1.1

Throws:

- `SecurityException`: always

## SecurityManager.checkMulticast(InetAddress, byte)

```java
public void checkMulticast(InetAddress maddr, byte ttl)
```

Throws `SecurityException`.

Parameters:

- `maddr`: ignored
- `ttl`: ignored

**Since:** 1.1

Throws:

- `SecurityException`: always

## SecurityManager.checkPropertiesAccess()

```java
public void checkPropertiesAccess()
```

Throws `SecurityException`.

Throws:

- `SecurityException`: always

## SecurityManager.checkPropertyAccess(String)

```java
public void checkPropertyAccess(String key)
```

Throws `SecurityException`.

Parameters:

- `key`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkPrintJobAccess()

```java
public void checkPrintJobAccess()
```

Throws `SecurityException`.

**Since:** 1.1

Throws:

- `SecurityException`: always

## SecurityManager.checkPackageAccess(String)

```java
public void checkPackageAccess(String pkg)
```

Throws `SecurityException`.

Parameters:

- `pkg`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkPackageDefinition(String)

```java
public void checkPackageDefinition(String pkg)
```

Throws `SecurityException`.

Parameters:

- `pkg`: ignored

Throws:

- `SecurityException`: always

## SecurityManager.checkSetFactory()

```java
public void checkSetFactory()
```

Throws `SecurityException`.

Throws:

- `SecurityException`: always

## SecurityManager.checkSecurityAccess(String)

```java
public void checkSecurityAccess(String target)
```

Throws `SecurityException`.

Parameters:

- `target`: ignored

**Since:** 1.1

Throws:

- `SecurityException`: always

## SecurityManager.getThreadGroup()

```java
public ThreadGroup getThreadGroup()
```

**Since:** 1.1
