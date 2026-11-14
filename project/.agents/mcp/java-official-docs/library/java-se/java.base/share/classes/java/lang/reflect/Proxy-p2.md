---
title: "Proxy class (java.lang.reflect) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Proxy.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Proxy class (java.lang.reflect) (part 2 of 2)

## Proxy.isProxyClass(Class<?>)

```java
public static boolean isProxyClass(Class<?> cl)
```

Returns true if the given class is a proxy class.

Parameters:

- `cl`: the class to test

**Implementation note:** The reliability of this method is important for the ability
to use it to make security decisions, so its implementation should
not just test if the class in question extends `Proxy`.

**Returns:** `true` if the class is a proxy class and
         `false` otherwise

Throws:

- `NullPointerException`: if `cl` is `null`

## Proxy.getInvocationHandler(Object)

```java
public static InvocationHandler getInvocationHandler(Object proxy) throws IllegalArgumentException
```

Returns the invocation handler for the specified proxy instance.

Parameters:

- `proxy`: the proxy instance to return the invocation handler for

**Returns:** the invocation handler for the proxy instance

Throws:

- `IllegalArgumentException`: if the argument is not a proxy instance
- `NullPointerException`: if `proxy` is `null`
