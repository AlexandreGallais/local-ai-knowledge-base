---
title: "InetAddressResolverProvider class (java.net.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/spi/InetAddressResolverProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InetAddressResolverProvider class (java.net.spi)

```java
public abstract class InetAddressResolverProvider
```

Service-provider class for InetAddress resolvers.

 A resolver provider is a factory for custom implementations of InetAddress resolvers. A resolver defines operations for
looking up (resolving) host names and IP addresses.

A resolver provider is a concrete subclass of this class that has a
zero-argument constructor and implements the abstract methods specified below.

 A given invocation of the Java virtual machine maintains a single
system-wide resolver instance, which is used by
InetAddress. It is set after the VM is fully initialized and when an
invocation of a method in `InetAddress` class triggers the first lookup
operation.

 A resolver provider is located and loaded by
`InetAddress` to create the system-wide resolver as follows:

- The `ServiceLoader` mechanism is used to locate an
     `InetAddressResolverProvider` using the
     system class loader. The order in which providers are located is
     java.lang.ClassLoader) implementation specific.
     The first provider found will be used to instantiate the
     InetAddressResolver by invoking the
     `InetAddressResolverProvider.get(InetAddressResolverProvider.Configuration)`
     method. The returned `InetAddressResolver` will be set as the
     system-wide resolver.

- If the previous step fails to find any resolver provider the
     built-in resolver will be set as the system-wide resolver.

 If instantiating a custom resolver from a provider discovered in
step 1 throws an error or exception, the system-wide resolver will not be
set and the error or exception will be propagated to the caller of the method
that triggered the lookup operation.
Otherwise, any lookup operation will be performed using the
*system-wide resolver*.

**Implementation note:** `InetAddress` will use the *built-in resolver* for any lookup operation
that might occur before the VM is fully booted.

**Since:** 18

## InetAddressResolverProvider.get(Configuration)

```java
public abstract InetAddressResolver get(Configuration configuration)
```

Initialize and return an `InetAddressResolver` provided by
this provider. This method is called by `InetAddress` when
installing
the system-wide resolver implementation.

 Any error or exception thrown by this method is considered as
a failure of `InetAddressResolver` instantiation and will be propagated to
the caller of the method that triggered the lookup operation.

Parameters:

- `configuration`: a `Configuration` instance containing platform built-in address resolution configuration.

**Returns:** the resolver provided by this provider

## InetAddressResolverProvider.name()

```java
public abstract String name()
```

## InetAddressResolverProvider.InetAddressResolverProvider()

```java
protected InetAddressResolverProvider()
```

Creates a new instance of `InetAddressResolverProvider`.

**Implementation note:** It is recommended that an `InetAddressResolverProvider` service
implementation initialization should be as simple as possible, in order to avoid
possible risks of deadlock or class loading cycles during the instantiation of the
service provider.
