# InetAddressResolverProvider class (java.net.spi)

```java
public abstract class InetAddressResolverProvider
```

Service-provider class for {@linkplain InetAddressResolver InetAddress resolvers}.

<p> A resolver provider is a factory for custom implementations of {@linkplain
InetAddressResolver InetAddress resolvers}. A resolver defines operations for
looking up (resolving) host names and IP addresses.
<p>A resolver provider is a concrete subclass of this class that has a
zero-argument constructor and implements the abstract methods specified below.

<p> A given invocation of the Java virtual machine maintains a single
system-wide resolver instance, which is used by
{@linkplain InetAddress##host-name-resolution
InetAddress}. It is set after the VM is fully initialized and when an
invocation of a method in {@link InetAddress} class triggers the first lookup
operation.

<p id="system-wide-resolver"> A resolver provider is located and loaded by
{@link InetAddress} to create the system-wide resolver as follows:
<ol>
 <li>The {@link ServiceLoader} mechanism is used to locate an
     {@code InetAddressResolverProvider} using the
     system class loader. The order in which providers are located is
     {@linkplain ServiceLoader#load(java.lang.Class, java.lang.ClassLoader)
     implementation specific}.
     The first provider found will be used to instantiate the
     {@link InetAddressResolver InetAddressResolver} by invoking the
     {@link InetAddressResolverProvider#get(InetAddressResolverProvider.Configuration)}
     method. The returned {@code InetAddressResolver} will be set as the
     system-wide resolver.
 <li>If the previous step fails to find any resolver provider the
     {@linkplain InetAddress##built-in-resolver
     built-in resolver} will be set as the system-wide resolver.
</ol>

<p> If instantiating a custom resolver from a provider discovered in
step 1 throws an error or exception, the system-wide resolver will not be
set and the error or exception will be propagated to the caller of the method
that triggered the lookup operation.
Otherwise, any lookup operation will be performed using the
<i>system-wide resolver</i>.

@implNote {@link InetAddress} will use the <i>built-in resolver</i> for any lookup operation
that might occur before the VM is fully booted.

@since 18

## InetAddressResolverProvider.get(Configuration)

```java
public abstract InetAddressResolver get(Configuration configuration)
```

Initialize and return an {@link InetAddressResolver} provided by
this provider. This method is called by {@link InetAddress} when
<a href="#system-wide-resolver">installing</a>
the system-wide resolver implementation.

<p> Any error or exception thrown by this method is considered as
a failure of {@code InetAddressResolver} instantiation and will be propagated to
the caller of the method that triggered the lookup operation.
@param configuration a {@link Configuration} instance containing platform built-in address
                    resolution configuration.
@return the resolver provided by this provider

## InetAddressResolverProvider.name()

```java
public abstract String name()
```

{@return the name of this provider, or {@code null} if unnamed}

## InetAddressResolverProvider.InetAddressResolverProvider()

```java
protected InetAddressResolverProvider()
```

Creates a new instance of {@code InetAddressResolverProvider}.

@implNote It is recommended that an {@code InetAddressResolverProvider} service
implementation initialization should be as simple as possible, in order to avoid
possible risks of deadlock or class loading cycles during the instantiation of the
service provider.