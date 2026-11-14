---
title: "ServiceLoader class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ServiceLoader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ServiceLoader class (java.util)

```java
public final class ServiceLoader<S> implements Iterable<S>
```

A facility to load implementations of a service.

 A *service* is a well-known interface or class for which zero, one,
or many service providers exist. A *service provider* (or just
*provider*) is a class that implements or subclasses the well-known
interface or class. A `ServiceLoader` is an object that locates and
loads service providers deployed in the run time environment at a time of an
application's choosing. Application code refers only to the service, not to
service providers, and is assumed to be capable of choosing between multiple
service providers (based on the functionality they expose through the service),
and handling the possibility that no service providers are located.

####  Obtaining a service loader

 An application obtains a service loader for a given service by invoking
one of the static `load` methods of `ServiceLoader`. If the
application is a module, then its module declaration must have a *uses*
directive that specifies the service; this helps to locate providers and ensure
they will execute reliably. In addition, if the application module does not
contain the service, then its module declaration must have a *requires*
directive that specifies the module which exports the service. It is strongly
recommended that the application module does **not** require modules which
contain providers of the service.

 A service loader can be used to locate and instantiate providers of the
service by means of the iterator method. `ServiceLoader`
also defines the stream method to obtain a stream of providers
that can be inspected and filtered without instantiating them.

 As an example, suppose the service is `com.example.CodecFactory`, an
interface that defines methods for producing encoders and decoders:

```java
    package com.example;
    public interface CodecFactory {
        Encoder getEncoder(String encodingName);
        Decoder getDecoder(String encodingName);
    }
```

 The following code obtains a service loader for the `CodecFactory`
service, then uses its iterator (created automatically by the enhanced-for
loop) to yield instances of the service providers that are located:

```java
    ServiceLoader<CodecFactory> loader = ServiceLoader.load(CodecFactory.class);
    for (CodecFactory factory : loader) {
        Encoder enc = factory.getEncoder("PNG");
        if (enc != null)
            ... use enc to encode a PNG file
            break;
        }
```

 If this code resides in a module, then in order to refer to the
`com.example.CodecFactory` interface, the module declaration would
require the module which exports the interface. The module declaration would
also specify use of `com.example.CodecFactory`:

```java
    requires com.example.codec.core;
    uses com.example.CodecFactory;
```

 Sometimes an application may wish to inspect a service provider before
instantiating it, in order to determine if an instance of that service
provider would be useful. For example, a service provider for `CodecFactory` that is capable of producing a "PNG" encoder may be annotated
with `@PNG`. The following code uses service loader's `stream`
method to yield instances of `Provider<CodecFactory>` in contrast to
how the iterator yields instances of `CodecFactory`:

```java
    ServiceLoader<CodecFactory> loader = ServiceLoader.load(CodecFactory.class);
    Set<CodecFactory> pngFactories = loader
           .stream()                                              // Note a below
           .filter(p -> p.type().isAnnotationPresent(PNG.class))  // Note b
           .map(Provider::get)                                    // Note c
           .collect(Collectors.toSet());
```

-  A stream of `Provider<CodecFactory>` objects

-  `p.type()` yields a `Class<CodecFactory>`

-  `get()` yields an instance of `CodecFactory`

####  Designing services

 A service is a single type, usually an interface or abstract class. A
concrete class can be used, but this is not recommended. The type may have
any accessibility. The methods of a service are highly domain-specific, so
this API specification cannot give concrete advice about their form or
function. However, there are two general guidelines:

-

 A service should declare as many methods as needed to allow service
  providers to communicate their domain-specific properties and other
  quality-of-implementation factors. An application which obtains a service
  loader for the service may then invoke these methods on each instance of
  a service provider, in order to choose the best provider for the
  application.

-

 A service should express whether its service providers are intended
  to be direct implementations of the service or to be an indirection
  mechanism such as a "proxy" or a "factory". Service providers tend to be
  indirection mechanisms when domain-specific objects are relatively
  expensive to instantiate; in this case, the service should be designed
  so that service providers are abstractions which create the "real"
  implementation on demand. For example, the `CodecFactory` service
  expresses through its name that its service providers are factories
  for codecs, rather than codecs themselves, because it may be expensive
  or complicated to produce certain codecs.

####  Developing service providers

 A service provider is a single type, usually a concrete class. An
interface or abstract class is permitted because it may declare a static
provider method, discussed later. The type must be public and must not be
an inner class.

 A service provider and its supporting code may be developed in a module,
which is then deployed on the application module path or in a modular
image. Alternatively, a service provider and its supporting code may be
packaged as a JAR file and deployed on the application class path. The
advantage of developing a service provider in a module is that the provider
can be fully encapsulated to hide all details of its implementation.

 An application that obtains a service loader for a given service is
indifferent to whether providers of the service are deployed in modules or
packaged as JAR files. The application instantiates service providers via
the service loader's iterator, or via Provider objects in
the service loader's stream, without knowledge of the service providers'
locations.

####  Deploying service providers as modules

 A service provider that is developed in a module must be specified in a
*provides* directive in the module declaration. The provides directive
specifies both the service and the service provider; this helps to locate the
provider when another module, with a *uses* directive for the service,
obtains a service loader for the service. It is strongly recommended that the
module does not export the package containing the service provider. There is
no support for a module specifying, in a *provides* directive, a service
provider in another module.

 A service provider that is developed in a module has no control over when
it is instantiated, since that occurs at the behest of the application, but it
does have control over how it is instantiated:

-  If the service provider declares a provider method, then the service
  loader invokes that method to obtain an instance of the service provider. A
  provider method is a public static method named "provider" with no formal
  parameters and a return type that is assignable to the service's interface
  or class.

 In this case, the service provider itself need not be assignable to the
  service's interface or class.

-  If the service provider does not declare a provider method, then the
  service provider is instantiated directly, via its provider constructor. A
  provider constructor is a public constructor with no formal parameters.

 In this case, the service provider must be assignable to the service's
  interface or class

 A service provider that is deployed as an
automatic module on
the application module path must have a provider constructor. There is no
support for a provider method in this case.

 As an example, suppose a module specifies the following directive:

```java
    provides com.example.CodecFactory with com.example.impl.StandardCodecs,
             com.example.impl.ExtendedCodecsFactory;
```

 where

-  `com.example.CodecFactory` is the two-method service from
  earlier.

-  `com.example.impl.StandardCodecs` is a public class that implements
  `CodecFactory` and has a public no-args constructor.

-  `com.example.impl.ExtendedCodecsFactory` is a public class that
  does not implement CodecFactory, but it declares a public static no-args
  method named "provider" with a return type of `CodecFactory`.

 A service loader will instantiate `StandardCodecs` via its
constructor, and will instantiate `ExtendedCodecsFactory` by invoking
its `provider` method. The requirement that the provider constructor or
provider method is public helps to document the intent that the class (that is,
the service provider) will be instantiated by an entity (that is, a service
loader) which is outside the class's package.

####  Deploying service providers on the class path

A service provider that is packaged as a JAR file for the class path is
identified by placing a *provider-configuration file* in the resource
directory `META-INF/services`. The name of the provider-configuration
file is the fully qualified binary name of the service. The provider-configuration
file contains a list of fully qualified binary names of service providers, one
per line.

 For example, suppose the service provider
`com.example.impl.StandardCodecs` is packaged in a JAR file for the
class path. The JAR file will contain a provider-configuration file named:

`META-INF/services/com.example.CodecFactory`

that contains the line:

`com.example.impl.StandardCodecs # Standard codecs`

The provider-configuration file must be encoded in UTF-8.
Space and tab characters surrounding each service provider's name, as well as
blank lines, are ignored. The comment character is `'#'`
(`U+0023` NUMBER SIGN);
on each line all characters following the first comment character are ignored.
If a service provider class name is listed more than once in a
provider-configuration file then the duplicate is ignored. If a service
provider class is named in more than one configuration file then the duplicate
is ignored.

 A service provider that is mentioned in a provider-configuration file may
be located in the same JAR file as the provider-configuration file or in a
different JAR file. The service provider must be visible from the class loader
that is initially queried to locate the provider-configuration file; this is
not necessarily the class loader which ultimately locates the
provider-configuration file.

####  Timing of provider discovery

 Service providers are loaded and instantiated lazily, that is, on demand.
A service loader maintains a cache of the providers that have been loaded so
far. Each invocation of the `iterator` method returns an `Iterator`
that first yields all of the elements cached from previous iteration, in
instantiation order, and then lazily locates and instantiates any remaining
providers, adding each one to the cache in turn. Similarly, each invocation
of the stream method returns a `Stream` that first processes all
providers loaded by previous stream operations, in load order, and then lazily
locates any remaining providers. Caches are cleared via the reload method.

####  Errors

 When using the service loader's `iterator`, the hasNext and next methods will
fail with `ServiceConfigurationError` if an error occurs locating,
loading or instantiating a service provider. When processing the service
loader's stream then `ServiceConfigurationError` may be thrown by any
method that causes a service provider to be located or loaded.

 When loading or instantiating a service provider in a module, `ServiceConfigurationError` can be thrown for the following reasons:

-  The service provider cannot be loaded.

-  The service provider does not declare a provider method, and either
  it is not assignable to the service's interface/class or does not have a
  provider constructor.

-  The service provider declares a public static no-args method named
  "provider" with a return type that is not assignable to the service's
  interface or class.

-  The service provider class file has more than one public static
  no-args method named "`provider`".

-  The service provider declares a provider method and it fails by
  returning `null` or throwing an exception.

-  The service provider does not declare a provider method, and its
  provider constructor fails by throwing an exception.

 When reading a provider-configuration file, or loading or instantiating
a provider class named in a provider-configuration file, then `ServiceConfigurationError` can be thrown for the following reasons:

-  The format of the provider-configuration file violates the format specified above;

-  An IOException occurs while reading the
  provider-configuration file;

-  A service provider cannot be loaded;

-  A service provider is not assignable to the service's interface or
  class, or does not define a provider constructor, or cannot be
  instantiated.

####  Concurrency

 Instances of this class are not safe for use by multiple concurrent
threads.

####  Null handling

 Unless otherwise specified, passing a `null` argument to any
method in this class will cause a `NullPointerException` to be thrown.

Parameters:

- ``: The type of the service to be loaded by this loader

**Since:** 1.6
