---
title: "Configuration class (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/Configuration.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Configuration class (java.lang.module)

```java
public final class Configuration
```

A configuration that is the result of
resolution or resolution with service binding.

 A configuration encapsulates the *readability graph* that is the
output of resolution. A readability graph is a directed graph whose vertices
are of type `ResolvedModule` and the edges represent the readability
amongst the modules. `Configuration` defines the modules() method to get the set of resolved modules in the graph. `ResolvedModule` defines the reads() method to
get the set of modules that a resolved module reads. The modules that are
read may be in the same configuration or may be in parent
configurations.

 Configuration defines the resolve method to resolve a collection of root modules, and the resolveAndBind
method to do resolution with service binding. There are instance and
static variants of both methods. The instance methods create a configuration
with the receiver as the parent configuration. The static methods are for
more advanced cases where there can be more than one parent configuration.

 Each layer of modules in the Java virtual
machine is created from a configuration. The configuration for the boot layer is obtained by invoking `ModuleLayer.boot().configuration()`. The configuration for the boot layer
will often be the parent when creating new configurations.

#### Optional Services

Resolution requires that if a module `M` '`uses`' a service or
'`provides`' an implementation of a service, then the service must be available
to `M` at run time, either because `M` itself contains the service's
package or because `M` reads another module that exports the service's package.
However, it is sometimes desirable for the service's package to come from a module
that is optional at run time, as indicated by the use of 'requires static' in this
example:

Resolution is resilient when a service's package comes from a module that is optional
at run time. That is, if a module `M` has an optional dependency on some module
`Y`, but `Y` is not needed at run time (`Y` might be observable but
no-one reads it), then resolution at run time *assumes* that `Y` exported
the service's package at compile time. Resolution at run time does not attempt to
check whether `Y` is observable or (if it is observable) whether `Y`
exports the service's package.

 The module that '`uses`' the service, or '`provides`' an implementation
of it, may depend directly on the optional module, as `M` does above, or may
depend indirectly on the optional module, as shown here:

In effect, the service that `M` '`uses`', or '`provides`' an
implementation of, is optional if it comes from an optional dependency. In this case,
code in `M` must be prepared to deal with the class or interface that denotes
the service being unavailable at run time. This is distinct from the more regular
case where the service is available but no implementations of the service are
available.

####  Example

 The following example uses the resolve method to resolve a
module named *myapp* with the configuration for the boot layer as the
parent configuration. It prints the name of each resolved module and the
names of the modules that each module reads.

**Since:** 9

**See also:** java.lang.ModuleLayer

## Configuration.resolve(ModuleFinder, ModuleFinder, Collection<String>)

```java
public Configuration resolve(ModuleFinder before, ModuleFinder after, Collection<String> roots)
```

Resolves a collection of root modules, with this configuration as its
parent, to create a new configuration. This method works exactly as
specified by the static resolve
method when invoked with this configuration as the parent. In other words,
if this configuration is `cf` then this method is equivalent to
invoking:

```java
    Configuration.resolve(before, List.of(cf), after, roots);
```

Parameters:

- `before`: The *before* module finder to find modules
- `after`: The *after* module finder to locate modules when not located by the `before` module finder or in parent configurations
- `roots`: The possibly-empty collection of module names of the modules to resolve

**Returns:** The configuration that is the result of resolving the given
        root modules

Throws:

- `FindException`: If resolution fails for any of the observability-related reasons specified by the static `resolve` method
- `ResolutionException`: If resolution fails any of the consistency checks specified by the static `resolve` method

## Configuration.resolveAndBind(ModuleFinder, ModuleFinder, Collection<String>)

```java
public Configuration resolveAndBind(ModuleFinder before, ModuleFinder after, Collection<String> roots)
```

Resolves a collection of root modules, with service binding, and with
this configuration as its parent, to create a new configuration.
This method works exactly as specified by the static resolveAndBind method when invoked with this configuration
as the parent. In other words, if this configuration is `cf` then
this method is equivalent to invoking:

```java
    Configuration.resolveAndBind(before, List.of(cf), after, roots);
```

Parameters:

- `before`: The *before* module finder to find modules
- `after`: The *after* module finder to locate modules when not located by the `before` module finder or in parent configurations
- `roots`: The possibly-empty collection of module names of the modules to resolve

**Returns:** The configuration that is the result of resolving, with service
        binding, the given root modules

Throws:

- `FindException`: If resolution fails for any of the observability-related reasons specified by the static `resolve` method
- `ResolutionException`: If resolution fails any of the consistency checks specified by the static `resolve` method

## Configuration.resolve(ModuleFinder, List<Configuration>, ModuleFinder, Collection<String>)

```java
public static Configuration resolve(ModuleFinder before, List<Configuration> parents, ModuleFinder after, Collection<String> roots)
```

Resolves a collection of root modules to create a configuration.

 Each root module is located using the given `before` module
finder. If a module is not found then it is located in the parent
configuration as if by invoking the findModule method on each parent in iteration order. If not found then
the module is located using the given `after` module finder. The
same search order is used to locate transitive dependences. Root modules
or dependences that are located in a parent configuration are resolved
no further and are not included in the resulting configuration.

 When all modules have been enumerated then a readability graph
is computed, and in conjunction with the module exports and service use,
checked for consistency.

 Resolution may fail with `FindException` for the following
*observability-related* reasons:

-

 A root module, or a direct or transitive dependency, is not
    found.

-

 An error occurs when attempting to find a module.
    Possible errors include I/O errors, errors detected parsing a module
    descriptor (`module-info.class`) or two versions of the same
    module are found in the same directory.

 Resolution may fail with `ResolutionException` if any of the
following consistency checks fail:

-

 A cycle is detected, say where module `m1` requires
    module `m2` and `m2` requires `m1`.

-

 A module reads two or more modules with the same name. This
    includes the case where a module reads another with the same name as
    itself.

-

 Two or more modules in the configuration export the same
    package to a module that reads both. This includes the case where a
    module `M` containing package `p` reads another module
    that exports `p` to `M`.

-

 A module `M` declares that it '`uses p.S`' or
    '`provides p.S with ...`', but the package `p` is neither in
    module `M` nor exported to `M` by any module that `M`
    reads. Additionally, neither of the following is `true`:

-  `M` declares '`requires static`' for at least one
        module that is not in the readability graph.

-  `M` reads another module that declares
        '`requires transitive static`' for at least one module that is
        not in the readability graph.

Parameters:

- `before`: The *before* module finder to find modules
- `parents`: The list parent configurations in search order
- `after`: The *after* module finder to locate modules when not located by the `before` module finder or in parent configurations
- `roots`: The possibly-empty collection of module names of the modules to resolve

**Implementation note:** In the implementation then observability of modules may depend
on referential integrity or other checks that ensure different builds of
tightly coupled modules or modules for specific operating systems or
architectures are not combined in the same configuration.

**Returns:** The configuration that is the result of resolving the given
        root modules

Throws:

- `FindException`: If resolution fails for any of observability-related reasons specified above
- `ResolutionException`: If resolution fails for any of the consistency checks specified above
- `IllegalArgumentException`: If the list of parents is empty, or the list has two or more parents with modules for different target operating systems, architectures, or versions

## Configuration.resolveAndBind(ModuleFinder, List<Configuration>, ModuleFinder, Collection<String>)

```java
public static Configuration resolveAndBind(ModuleFinder before, List<Configuration> parents, ModuleFinder after, Collection<String> roots)
```

Resolves a collection of root modules, with service binding, to create
configuration.

 This method works exactly as specified by resolve except that the graph of resolved modules is augmented
with modules induced by the service-use dependence relation.

More specifically, the root modules are
resolved as if by calling `resolve`. The resolved modules, and
all modules in the parent configurations, with service dependences are then examined. All modules found by the given
module finders that provide an
implementation of one or more of the service types are added to the
module graph and then resolved as if by calling the `resolve` method. Adding modules to the module graph may introduce new
service-use dependences and so the process works iteratively until no
more modules are added.

 As service binding involves resolution then it may fail with `FindException` or `ResolutionException` for exactly the same
reasons specified in `resolve`.

Parameters:

- `before`: The *before* module finder to find modules
- `parents`: The list parent configurations in search order
- `after`: The *after* module finder to locate modules when not located by the `before` module finder or in parent configurations
- `roots`: The possibly-empty collection of module names of the modules to resolve

**Returns:** The configuration that is the result of resolving, with service
        binding, the given root modules

Throws:

- `FindException`: If resolution fails for any of the observability-related reasons specified by the static `resolve` method
- `ResolutionException`: If resolution fails any of the consistency checks specified by the static `resolve` method
- `IllegalArgumentException`: If the list of parents is empty, or the list has two or more parents with modules for different target operating systems, architectures, or versions

## Configuration.empty()

```java
public static Configuration empty()
```

Returns the *empty* configuration. There are no modules in the
empty configuration. It has no parents.

**Returns:** The empty configuration

## Configuration.parents()

```java
public List<Configuration> parents()
```

Returns an unmodifiable list of this configuration's parents, in search
order. If this is the empty configuration then an
empty list is returned.

**Returns:** A possibly-empty unmodifiable list of this parent configurations

## Configuration.modules()

```java
public Set<ResolvedModule> modules()
```

Returns an unmodifiable set of the resolved modules in this configuration.

**Returns:** A possibly-empty unmodifiable set of the resolved modules
        in this configuration

## Configuration.findModule(String)

```java
public Optional<ResolvedModule> findModule(String name)
```

Finds a resolved module in this configuration, or if not in this
configuration, the parent configurations.
Finding a module in parent configurations is equivalent to invoking
`findModule` on each parent, in search order, until the module
is found or all parents have been searched. In a *tree of
configurations* then this is equivalent to a depth-first search.

Parameters:

- `name`: The module name of the resolved module to find

**Returns:** The resolved module with the given name or an empty `Optional` if there isn't a module with this name in this
        configuration or any parent configurations

## Configuration.toString()

```java
public String toString()
```

Returns a string describing this configuration.

**Returns:** A possibly empty string describing this configuration
