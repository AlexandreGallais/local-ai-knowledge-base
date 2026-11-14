---
title: "ModuleDescriptor class (java.lang.module) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ModuleDescriptor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleDescriptor class (java.lang.module) (part 2 of 3)

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module version for equality with the given object.

 If the given object is not a `Version` then this method
returns `false`. Two module version are equal if their
corresponding components are equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a module
         reference that is equal to this module reference

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module version.

 The hash code is based upon the components of the version and
satisfies the general contract of the Object.hashCode method.

**Returns:** The hash-code value for this module version

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns the string from which this version was parsed.

**Returns:** The string from which this version was parsed.

## ModuleDescriptor.name()

```java
public String name()
```

Returns the module name.

**Returns:** The module name

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of module modifiers.

**Returns:** A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module flags.

**Returns:** A possibly-empty unmodifiable set of module flags

**See also:** #modifiers()

**jvms:** 4.7.25 The Module Attribute

**Since:** 20

## ModuleDescriptor.isOpen()

```java
public boolean isOpen()
```

Returns `true` if this is an open module.

 This method is equivalent to testing if the set of modifiers contains the OPEN modifier.

**Returns:** `true` if this is an open module

## ModuleDescriptor.isAutomatic()

```java
public boolean isAutomatic()
```

Returns `true` if this is an automatic module.

 This method is equivalent to testing if the set of modifiers contains the AUTOMATIC modifier.

**Returns:** `true` if this is an automatic module

## ModuleDescriptor.requires()

```java
public Set<Requires> requires()
```

Returns the set of `Requires` objects representing the module
dependences.

 The set includes a dependency on "`java.base`" when this
module is not named "`java.base`". If this module is an automatic
module then it does not have a dependency on any module other than
"`java.base`".

**Returns:** A possibly-empty unmodifiable set of `Requires` objects

## ModuleDescriptor.exports()

```java
public Set<Exports> exports()
```

Returns the set of `Exports` objects representing the exported
packages.

 If this module is an automatic module then the set of exports
is empty.

**Returns:** A possibly-empty unmodifiable set of exported packages

## ModuleDescriptor.opens()

```java
public Set<Opens> opens()
```

Returns the set of `Opens` objects representing the open
packages.

 If this module is an open module or an automatic module then the
set of open packages is empty.

**Returns:** A possibly-empty unmodifiable set of open packages

## ModuleDescriptor.uses()

```java
public Set<String> uses()
```

Returns the set of service dependences.

 If this module is an automatic module then the set of service
dependences is empty.

**Returns:** A possibly-empty unmodifiable set of the binary names of the service types used

## ModuleDescriptor.provides()

```java
public Set<Provides> provides()
```

Returns the set of `Provides` objects representing the
services that the module provides.

**Returns:** The possibly-empty unmodifiable set of the services that this
        module provides

## ModuleDescriptor.version()

```java
public Optional<Version> version()
```

Returns the module version.

**Returns:** This module's version, or an empty `Optional` if the
        module does not have a version or the version is
        unparseable

## ModuleDescriptor.rawVersion()

```java
public Optional<String> rawVersion()
```

Returns the string with the possibly-unparseable version of the
module.

**Returns:** The string containing the version of the module or an empty
        `Optional` if the module does not have a version

**See also:** #version()

## ModuleDescriptor.toNameAndVersion()

```java
public String toNameAndVersion()
```

Returns a string containing the module name and, if present, its
version.

**Returns:** A string containing the module name and, if present, its
        version

## ModuleDescriptor.mainClass()

```java
public Optional<String> mainClass()
```

Returns the module main class.

**Returns:** The binary name of the module's main class

## ModuleDescriptor.packages()

```java
public Set<String> packages()
```

Returns the set of packages in the module.

 The set of packages includes all exported and open packages, as well
as the packages of any service providers, and the package for the main
class.

**Returns:** A possibly-empty unmodifiable set of the packages in the module

## ModuleDescriptor.requires(Requires)

```java
public Builder requires(Requires req)
```

Adds a dependence on a module.

Parameters:

- `req`: The dependence

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the dependence is on the module that this builder was initialized to build
- `IllegalStateException`: If the dependence on the module has already been declared or this builder is for an automatic module

## ModuleDescriptor.requires(Set<Requires.Modifier>, String, Version)

```java
public Builder requires(Set<Requires.Modifier> ms, String mn, Version compiledVersion)
```

Adds a dependence on a module with the given (and possibly empty)
set of modifiers. The dependence includes the version of the
module that was recorded at compile-time.

Parameters:

- `ms`: The set of modifiers
- `mn`: The module name
- `compiledVersion`: The version of the module recorded at compile-time

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the module name is `null`, is not a legal module name, or is equal to the module name that this builder was initialized to build
- `IllegalStateException`: If the dependence on the module has already been declared or this builder is for an automatic module

## ModuleDescriptor.requires(Set<Requires.Modifier>, String)

```java
public Builder requires(Set<Requires.Modifier> ms, String mn)
```

Adds a dependence on a module with the given (and possibly empty)
set of modifiers.

Parameters:

- `ms`: The set of modifiers
- `mn`: The module name

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the module name is `null`, is not a legal module name, or is equal to the module name that this builder was initialized to build
- `IllegalStateException`: If the dependence on the module has already been declared or this builder is for an automatic module

## ModuleDescriptor.requires(String)

```java
public Builder requires(String mn)
```

Adds a dependence on a module with an empty set of modifiers.

Parameters:

- `mn`: The module name

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the module name is `null`, is not a legal module name, or is equal to the module name that this builder was initialized to build
- `IllegalStateException`: If the dependence on the module has already been declared or this builder is for an automatic module

## ModuleDescriptor.exports(Exports)

```java
public Builder exports(Exports e)
```

Adds an exported package.

Parameters:

- `e`: The export

**Returns:** This builder

Throws:

- `IllegalStateException`: If the package is already declared as exported or this builder is for an automatic module

## ModuleDescriptor.exports(Set<Exports.Modifier>, String, Set<String>)

```java
public Builder exports(Set<Exports.Modifier> ms, String pn, Set<String> targets)
```

Adds an exported package with the given (and possibly empty) set of
modifiers. The package is exported to a set of target modules.

Parameters:

- `ms`: The set of modifiers
- `pn`: The package name
- `targets`: The set of target modules names

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name, the set of target modules is empty, or the set of target modules contains a name that is not a legal module name
- `IllegalStateException`: If the package is already declared as exported or this builder is for an automatic module

## ModuleDescriptor.exports(Set<Exports.Modifier>, String)

```java
public Builder exports(Set<Exports.Modifier> ms, String pn)
```

Adds an exported package with the given (and possibly empty) set of
modifiers. The package is exported to all modules.

Parameters:

- `ms`: The set of modifiers
- `pn`: The package name

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name
- `IllegalStateException`: If the package is already declared as exported or this builder is for an automatic module

## ModuleDescriptor.exports(String, Set<String>)

```java
public Builder exports(String pn, Set<String> targets)
```

Adds an exported package. The package is exported to a set of target
modules.

Parameters:

- `pn`: The package name
- `targets`: The set of target modules names

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name, the set of target modules is empty, or the set of target modules contains a name that is not a legal module name
- `IllegalStateException`: If the package is already declared as exported or this builder is for an automatic module

## ModuleDescriptor.exports(String)

```java
public Builder exports(String pn)
```

Adds an exported package. The package is exported to all modules.

Parameters:

- `pn`: The package name

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name
- `IllegalStateException`: If the package is already declared as exported or this builder is for an automatic module

## ModuleDescriptor.opens(Opens)

```java
public Builder opens(Opens obj)
```

Adds an open package.

Parameters:

- `obj`: The `Opens` object

**Returns:** This builder

Throws:

- `IllegalStateException`: If the package is already declared as open, or this is a builder for an open module or automatic module

## ModuleDescriptor.opens(Set<Opens.Modifier>, String, Set<String>)

```java
public Builder opens(Set<Opens.Modifier> ms, String pn, Set<String> targets)
```

Adds an open package with the given (and possibly empty) set of
modifiers. The package is open to a set of target modules.

Parameters:

- `ms`: The set of modifiers
- `pn`: The package name
- `targets`: The set of target modules names

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name, the set of target modules is empty, or the set of target modules contains a name that is not a legal module name
- `IllegalStateException`: If the package is already declared as open, or this is a builder for an open module or automatic module

## ModuleDescriptor.opens(Set<Opens.Modifier>, String)

```java
public Builder opens(Set<Opens.Modifier> ms, String pn)
```

Adds an open package with the given (and possibly empty) set of
modifiers. The package is open to all modules.

Parameters:

- `ms`: The set of modifiers
- `pn`: The package name

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name
- `IllegalStateException`: If the package is already declared as open, or this is a builder for an open module or automatic module

## ModuleDescriptor.opens(String, Set<String>)

```java
public Builder opens(String pn, Set<String> targets)
```

Adds an open package. The package is open to a set of target modules.

Parameters:

- `pn`: The package name
- `targets`: The set of target modules names

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name, the set of target modules is empty, or the set of target modules contains a name that is not a legal module name
- `IllegalStateException`: If the package is already declared as open, or this is a builder for an open module or automatic module

## ModuleDescriptor.opens(String)

```java
public Builder opens(String pn)
```

Adds an open package. The package is open to all modules.

Parameters:

- `pn`: The package name

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the package name is `null` or is not a legal package name
- `IllegalStateException`: If the package is already declared as open, or this is a builder for an open module or automatic module

## ModuleDescriptor.uses(String)

```java
public Builder uses(String service)
```

Adds a service dependence.

Parameters:

- `service`: The service type

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the service type is `null` or not a qualified name of a class in a named package
- `IllegalStateException`: If a dependency on the service type has already been declared or this is a builder for an automatic module

## ModuleDescriptor.provides(Provides)

```java
public Builder provides(Provides p)
```

Provides a service with one or more implementations. The package for
each provider (or provider factory) is
added to the module if not already added.

Parameters:

- `p`: The provides

**Returns:** This builder

Throws:

- `IllegalStateException`: If the providers for the service type have already been declared

## ModuleDescriptor.provides(String, List<String>)

```java
public Builder provides(String service, List<String> providers)
```

Provides implementations of a service. The package for each provider
(or provider factory) is added to the module if not already added.

Parameters:

- `service`: The service type
- `providers`: The list of provider or provider factory class names

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If the service type or any of the provider class names is `null` or not a qualified name of a class in a named package, or the list of provider class names is empty
- `IllegalStateException`: If the providers for the service type have already been declared

## ModuleDescriptor.packages(Set<String>)

```java
public Builder packages(Set<String> pns)
```

Adds packages to the module. All packages in the set of package names
that are not in the module are added to module.

Parameters:

- `pns`: The (possibly empty) set of package names

**Returns:** This builder

Throws:

- `IllegalArgumentException`: If any of the package names is `null` or is not a legal package name

## ModuleDescriptor.version(Version)

```java
public Builder version(Version v)
```

Sets the module version.

Parameters:

- `v`: The version

**Returns:** This builder
