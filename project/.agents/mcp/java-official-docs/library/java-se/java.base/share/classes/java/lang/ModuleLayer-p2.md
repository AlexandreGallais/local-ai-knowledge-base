---
title: "ModuleLayer class (java.lang) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ModuleLayer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleLayer class (java.lang) (part 2 of 2)

## ModuleLayer.defineModules(Configuration, List<ModuleLayer>, Function<String, ClassLoader>)

```java
public static Controller defineModules(Configuration cf, List<ModuleLayer> parentLayers, Function<String, ClassLoader> clf)
```

Creates a new module layer by defining the modules in the given `Configuration` to the Java virtual machine. The given function maps each
module in the configuration, by name, to a class loader. Creating the
layer informs the Java virtual machine about the classes that may be
loaded so that the Java virtual machine knows which module that each
class is a member of.

 The class loader delegation implemented by the class loaders must
respect module readability. The class loaders should be
parallel-capable so as to
avoid deadlocks during class loading. In addition, the entity creating
a new layer with this method should arrange that the class loaders be
ready to load from these modules before there are any attempts to load
classes or resources.

 Creating a layer can fail for the following reasons:

-

 Two or more modules with the same package are mapped to the
    same class loader.

-

 A module is mapped to a class loader that already has a
    module of the same name defined to it.

-

 A module is mapped to a class loader that has already
    defined types in any of the packages in the module.

 In addition, a layer cannot be created if the configuration contains
a module named "`java.base`", a configuration contains a module
with a package named "`java`" or a package name starting with
"`java.`", or the function to map a module name to a class loader
returns `null` or the platform class loader.

 If the function to map a module name to class loader throws an error
or runtime exception then it is propagated to the caller of this method.

Parameters:

- `cf`: The configuration for the layer
- `parentLayers`: The list of parent layers in search order
- `clf`: The function to map a module name to a class loader

**API note:** It is implementation specific as to whether creating a layer
with this method is an atomic operation or not. Consequently it is
possible for this method to fail with some modules, but not all, defined
to the Java virtual machine.

**Returns:** A controller that controls the newly created layer

Throws:

- `IllegalArgumentException`: If the parent(s) of the given configuration do not match the configuration of the parent layers, including order
- `LayerInstantiationException`: If creating the layer fails for any of the reasons listed above

## ModuleLayer.configuration()

```java
public Configuration configuration()
```

Returns the configuration for this layer.

**Returns:** The configuration for this layer

## ModuleLayer.parents()

```java
public List<ModuleLayer> parents()
```

Returns an unmodifiable list of this layer's parents, in search
order. If this is the empty layer then an
empty list is returned.

**Returns:** A possibly-empty unmodifiable list of this layer's parents

## ModuleLayer.modules()

```java
public Set<Module> modules()
```

Returns an unmodifiable set of the modules in this layer.

**Returns:** A possibly-empty unmodifiable set of the modules in this layer

## ModuleLayer.findModule(String)

```java
public Optional<Module> findModule(String name)
```

Returns the module with the given name in this layer, or if not in this
layer, the parent layers. Finding a module in
parent layers is equivalent to invoking `findModule` on each
parent, in search order, until the module is found or all parents have
been searched. In a *tree of layers*  then this is equivalent to
a depth-first search.

Parameters:

- `name`: The name of the module to find

**Returns:** The module with the given name or an empty `Optional`
        if there isn't a module with this name in this layer or any
        parent layer

## ModuleLayer.findLoader(String)

```java
public ClassLoader findLoader(String name)
```

Returns the `ClassLoader` for the module with the given name. If
a module of the given name is not in this layer then the parent layers are searched in the manner specified by findModule.

Parameters:

- `name`: The name of the module to find

**API note:** This method does not return an `Optional<ClassLoader>`
because `null` must be used to represent the bootstrap class loader.

**Returns:** The ClassLoader that the module is defined to

Throws:

- `IllegalArgumentException`: if a module of the given name is not defined in this layer or any parent of this layer

## ModuleLayer.toString()

```java
public String toString()
```

Returns a string describing this module layer.

**Returns:** A possibly empty string describing this module layer

## ModuleLayer.empty()

```java
public static ModuleLayer empty()
```

Returns the *empty* layer. There are no modules in the empty
layer. It has no parents.

**Returns:** The empty layer

## ModuleLayer.boot()

```java
public static ModuleLayer boot()
```

Returns the boot layer. The boot layer contains at least one module,
`java.base`. Its parent is the empty layer.

**API note:** This method returns `null` during startup and before
         the boot layer is fully initialized.

**Returns:** The boot layer
