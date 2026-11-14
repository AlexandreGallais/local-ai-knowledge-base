---
title: "ModuleLayer class (java.lang) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ModuleLayer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleLayer class (java.lang)

```java
public final class ModuleLayer
```

A layer of modules in the Java virtual machine.

 A layer is created from a graph of modules in a `Configuration`
and a function that maps each module to a `ClassLoader`.
Creating a layer informs the Java virtual machine about the classes that
may be loaded from the modules so that the Java virtual machine knows which
module that each class is a member of.

 Creating a layer creates a `Module` object for each `ResolvedModule` in the configuration. For each resolved module that is
read, the `Module` reads the corresponding run-time `Module`, which may
be in the same layer or a parent layer.

 The defineModulesWithOneLoader and
defineModulesWithManyLoaders methods
provide convenient ways to create a module layer where all modules are
mapped to a single class loader or where each module is mapped to its own
class loader. The defineModules method is for more
advanced cases where modules are mapped to custom class loaders by means of
a function specified to the method. Each of these methods has an instance
and static variant. The instance methods create a layer with the receiver
as the parent layer. The static methods are for more advanced cases where
there can be more than one parent layer or where a Controller is needed to control modules in the layer

 A Java virtual machine has at least one non-empty layer, the boot layer, that is created when the Java virtual machine is
started. The boot layer contains module `java.base` and is the only
layer in the Java virtual machine with a module named "`java.base`".
The modules in the boot layer are mapped to the bootstrap class loader and
other class loaders that are
built-in into the Java virtual machine. The boot layer will often be
the parent when creating additional layers.

 Each `Module` in a layer is created so that it exports and opens
the packages described by its `ModuleDescriptor`. Qualified exports
(where a package is exported to a set of target modules rather than all
modules) are reified when creating the layer as follows:

-  If module `X` exports a package to `Y`, and if the
    runtime `Module` `X` reads `Module` `Y`, then
    the package is exported to `Module` `Y` (which may be in
    the same layer as `X` or a parent layer).

-  If module `X` exports a package to `Y`, and if the
    runtime `Module` `X` does not read `Y` then target
    `Y` is located as if by invoking findModule to find the module in the layer or its parent layers. If
    `Y` is found then the package is exported to the instance of
    `Y` that was found. If `Y` is not found then the qualified
    export is ignored.

 Qualified opens are handled in same way as qualified exports.

 As when creating a `Configuration`,
automatic modules receive special
treatment when creating a layer. An automatic module is created in the
Java virtual machine as a `Module` that reads every unnamed `Module` in the Java virtual machine.

 Unless otherwise specified, passing a `null` argument to a method
in this class causes a NullPointerException to
be thrown.

####  Example

 This example creates a configuration by resolving a module named
"`myapp`" with the configuration for the boot layer as the parent. It
then creates a new layer with the modules in this configuration. All modules
are defined to the same class loader.

**Since:** 9

**See also:** Module#getLayer()

## ModuleLayer.layer()

```java
public ModuleLayer layer()
```

Returns the layer that this object controls.

**Returns:** the module layer

## ModuleLayer.addReads(Module, Module)

```java
public Controller addReads(Module source, Module target)
```

Updates module `source` in the layer to read module
`target`. This method is a no-op if `source` already
reads `target`.

Parameters:

- `source`: The source module
- `target`: The target module to read

**Implementation note:** *Read edges* added by this method are *weak*
and do not prevent `target` from being GC'ed when `source`
is strongly reachable.

**Returns:** This controller

**See also:** Module#addReads

Throws:

- `IllegalArgumentException`: If `source` is not in the module layer

## ModuleLayer.addExports(Module, String, Module)

```java
public Controller addExports(Module source, String pn, Module target)
```

Updates module `source` in the layer to export a package to
module `target`. This method is a no-op if `source`
already exports the package to at least `target`.

Parameters:

- `source`: The source module
- `pn`: The package name
- `target`: The target module

**Returns:** This controller

**See also:** Module#addExports

Throws:

- `IllegalArgumentException`: If `source` is not in the module layer or the package is not in the source module

## ModuleLayer.addOpens(Module, String, Module)

```java
public Controller addOpens(Module source, String pn, Module target)
```

Updates module `source` in the layer to open a package to
module `target`. This method is a no-op if `source`
already opens the package to at least `target`.

Parameters:

- `source`: The source module
- `pn`: The package name
- `target`: The target module

**Returns:** This controller

**See also:** Module#addOpens

Throws:

- `IllegalArgumentException`: If `source` is not in the module layer or the package is not in the source module

## ModuleLayer.enableNativeAccess(Module)

```java
public Controller enableNativeAccess(Module target)
```

Enables native access for a module in the layer if the caller's module
has native access.

Parameters:

- `target`: The module to update

**Returns:** This controller

**Since:** 22

Throws:

- `IllegalArgumentException`: If `target` is not in the module layer
- `IllegalCallerException`: If the caller is in a module that does not have native access enabled

## ModuleLayer.defineModulesWithOneLoader(Configuration, ClassLoader)

```java
public ModuleLayer defineModulesWithOneLoader(Configuration cf, ClassLoader parentLoader)
```

Creates a new module layer, with this layer as its parent, by defining the
modules in the given `Configuration` to the Java virtual machine.
This method creates one class loader and defines all modules to that
class loader. The parent of each class
loader is the given parent class loader. This method works exactly as
specified by the static defineModulesWithOneLoader method when invoked with this layer as the
parent. In other words, if this layer is `thisLayer` then this
method is equivalent to invoking:

```java
    ModuleLayer.defineModulesWithOneLoader(cf, List.of(thisLayer), parentLoader).layer();
```

Parameters:

- `cf`: The configuration for the layer
- `parentLoader`: The parent class loader for the class loader created by this method; may be `null` for the bootstrap class loader

**Returns:** The newly created layer

**See also:** #findLoader

Throws:

- `IllegalArgumentException`: If the given configuration has more than one parent or the parent of the configuration is not the configuration for this layer
- `LayerInstantiationException`: If the layer cannot be created for any of the reasons specified by the static `defineModulesWithOneLoader` method

## ModuleLayer.defineModulesWithManyLoaders(Configuration, ClassLoader)

```java
public ModuleLayer defineModulesWithManyLoaders(Configuration cf, ClassLoader parentLoader)
```

Creates a new module layer, with this layer as its parent, by defining the
modules in the given `Configuration` to the Java virtual machine.
Each module is defined to its own `ClassLoader` created by this
method. The parent of each class loader
is the given parent class loader. This method works exactly as specified
by the static defineModulesWithManyLoaders method when invoked with this layer as the
parent. In other words, if this layer is `thisLayer` then this
method is equivalent to invoking:

```java
    ModuleLayer.defineModulesWithManyLoaders(cf, List.of(thisLayer), parentLoader).layer();
```

Parameters:

- `cf`: The configuration for the layer
- `parentLoader`: The parent class loader for each of the class loaders created by this method; may be `null` for the bootstrap class loader

**Returns:** The newly created layer

**See also:** #findLoader

Throws:

- `IllegalArgumentException`: If the given configuration has more than one parent or the parent of the configuration is not the configuration for this layer
- `LayerInstantiationException`: If the layer cannot be created for any of the reasons specified by the static `defineModulesWithManyLoaders` method

## ModuleLayer.defineModules(Configuration, Function<String, ClassLoader>)

```java
public ModuleLayer defineModules(Configuration cf, Function<String, ClassLoader> clf)
```

Creates a new module layer, with this layer as its parent, by defining the
modules in the given `Configuration` to the Java virtual machine.
Each module is mapped, by name, to its class loader by means of the
given function. This method works exactly as specified by the static
defineModules
method when invoked with this layer as the parent. In other words, if
this layer is `thisLayer` then this method is equivalent to
invoking:

```java
    ModuleLayer.defineModules(cf, List.of(thisLayer), clf).layer();
```

Parameters:

- `cf`: The configuration for the layer
- `clf`: The function to map a module name to a class loader

**Returns:** The newly created layer

Throws:

- `IllegalArgumentException`: If the given configuration has more than one parent or the parent of the configuration is not the configuration for this layer
- `LayerInstantiationException`: If the layer cannot be created for any of the reasons specified by the static `defineModules` method

## ModuleLayer.defineModulesWithOneLoader(Configuration, List<ModuleLayer>, ClassLoader)

```java
public static Controller defineModulesWithOneLoader(Configuration cf, List<ModuleLayer> parentLayers, ClassLoader parentLoader)
```

Creates a new module layer by defining the modules in the given `Configuration` to the Java virtual machine. This method creates one
class loader and defines all modules to that class loader.

 The class loader created by this method implements *direct
delegation* when loading classes from modules. If the boolean) loadClass method is invoked to
load a class then it uses the package name of the class to map it to a
module. This may be a module in this layer and hence defined to the same
class loader. It may be a package in a module in a parent layer that is
exported to one or more of the modules in this layer. The class
loader delegates to the class loader of the module, throwing `ClassNotFoundException` if not found by that class loader.
When `loadClass` is invoked to load classes that do not map to a
module then it delegates to the parent class loader.

 The class loader created by this method locates resources
(getResource, getResources, and other resource
methods) in all modules in the layer before searching the parent class
loader.

 Attempting to create a layer with all modules defined to the same
class loader can fail for the following reasons:

-

 *Overlapping packages*: Two or more modules in the
    configuration have the same package.

-

 *Split delegation*: The resulting class loader would
    need to delegate to more than one class loader in order to load
    classes in a specific package.

 In addition, a layer cannot be created if the configuration contains
a module named "`java.base`", or a module contains a package named
"`java`" or a package with a name starting with "`java.`".

Parameters:

- `cf`: The configuration for the layer
- `parentLayers`: The list of parent layers in search order
- `parentLoader`: The parent class loader for the class loader created by this method; may be `null` for the bootstrap class loader

**Returns:** A controller that controls the newly created layer

**See also:** #findLoader

Throws:

- `IllegalArgumentException`: If the parent(s) of the given configuration do not match the configuration of the parent layers, including order
- `LayerInstantiationException`: If all modules cannot be defined to the same class loader for any of the reasons listed above

## ModuleLayer.defineModulesWithManyLoaders(Configuration, List<ModuleLayer>, ClassLoader)

```java
public static Controller defineModulesWithManyLoaders(Configuration cf, List<ModuleLayer> parentLayers, ClassLoader parentLoader)
```

Creates a new module layer by defining the modules in the given `Configuration` to the Java virtual machine. Each module is defined to
its own `ClassLoader` created by this method. The parent of each class loader is the given parent
class loader.

 The class loaders created by this method implement *direct
delegation* when loading classes from modules. If the boolean) loadClass method is invoked to
load a class then it uses the package name of the class to map it to a
module. The package may be in the module defined to the class loader.
The package may be exported by another module in this layer to the
module defined to the class loader. It may be in a package exported by a
module in a parent layer. The class loader delegates to the class loader
of the module, throwing `ClassNotFoundException` if not found by
that class loader. When `loadClass` is invoked to load a class
that does not map to a module then it delegates to the parent class
loader.

 The class loaders created by this method locate resources
(getResource, getResources, and other resource
methods) in the module defined to the class loader before searching
the parent class loader.

Parameters:

- `cf`: The configuration for the layer
- `parentLayers`: The list of parent layers in search order
- `parentLoader`: The parent class loader for each of the class loaders created by this method; may be `null` for the bootstrap class loader

**Returns:** A controller that controls the newly created layer

**See also:** #findLoader

Throws:

- `IllegalArgumentException`: If the parent(s) of the given configuration do not match the configuration of the parent layers, including order
- `LayerInstantiationException`: If the layer cannot be created because the configuration contains a module named "`java.base`" or a module contains a package named "`java`" or a package with a name starting with "`java.`"
