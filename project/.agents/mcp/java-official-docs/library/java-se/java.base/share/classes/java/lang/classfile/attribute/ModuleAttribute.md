---
title: "ModuleAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleAttribute extends Attribute<ModuleAttribute>, ClassElement permits BoundAttribute.BoundModuleAttribute, UnboundAttribute.UnboundModuleAttribute
```

Models the Module attribute (JVMS ),
which always appears on classes that represent module descriptors.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 9, major version
`ClassFile#JAVA_9_VERSION`.

**See also:** Attributes#module()

**See also:** ModuleDescriptor

**jvms:** 4.7.25 The `Module` Attribute

**Since:** 24

## ModuleAttribute.moduleName()

```java
ModuleEntry moduleName()
```

**See also:** ModuleDescriptor#name()

## ModuleAttribute.moduleFlagsMask()

```java
int moduleFlagsMask()
```

It is in the
range of unsigned short, `[0, 0xFFFF]`.

**See also:** ModuleDescriptor#modifiers()

**See also:** AccessFlag.Location#MODULE

## ModuleAttribute.moduleFlags()

```java
default Set<AccessFlag> moduleFlags()
```

**See also:** ModuleDescriptor#accessFlags()

**See also:** AccessFlag.Location#MODULE

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## ModuleAttribute.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Tests presence of module flag.

Parameters:

- `flag`: the module flag

**Returns:** true if the flag is set

**See also:** AccessFlag.Location#MODULE

## ModuleAttribute.moduleVersion()

```java
Optional<Utf8Entry> moduleVersion()
```

**See also:** ModuleDescriptor#version()

## ModuleAttribute.requires()

```java
List<ModuleRequireInfo> requires()
```

**See also:** ModuleDescriptor#requires()

## ModuleAttribute.exports()

```java
List<ModuleExportInfo> exports()
```

**See also:** ModuleDescriptor#packages()

## ModuleAttribute.opens()

```java
List<ModuleOpenInfo> opens()
```

**API note:** Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See `MethodHandles.privateLookupIn` for more details.

**See also:** ModuleDescriptor#opens()

## ModuleAttribute.uses()

```java
List<ClassEntry> uses()
```

Services may be discovered via
`ServiceLoader`.

**See also:** ModuleDescriptor#uses()

## ModuleAttribute.provides()

```java
List<ModuleProvideInfo> provides()
```

**See also:** ModuleDescriptor#provides()

## ModuleAttribute.of(ModuleEntry, int, Utf8Entry, Collection<ModuleRequireInfo>, Collection<ModuleExportInfo>, Collection<ModuleOpenInfo>, Collection<ClassEntry>, Collection<ModuleProvideInfo>)

```java
static ModuleAttribute of(ModuleEntry moduleName, int moduleFlags, Utf8Entry moduleVersion, Collection<ModuleRequireInfo> requires, Collection<ModuleExportInfo> exports, Collection<ModuleOpenInfo> opens, Collection<ClassEntry> uses, Collection<ModuleProvideInfo> provides)
```

Parameters:

- `moduleName`: the module name
- `moduleFlags`: the module flags
- `moduleVersion`: the module version, may be `null`
- `requires`: the required packages
- `exports`: the exported packages
- `opens`: the opened packages
- `uses`: the consumed services
- `provides`: the provided services

## ModuleAttribute.of(ModuleDesc, Consumer<ModuleAttributeBuilder>)

```java
static ModuleAttribute of(ModuleDesc moduleName, Consumer<ModuleAttributeBuilder> attrHandler)
```

Parameters:

- `moduleName`: the module name
- `attrHandler`: a handler that receives a `ModuleAttributeBuilder`

## ModuleAttribute.of(ModuleEntry, Consumer<ModuleAttributeBuilder>)

```java
static ModuleAttribute of(ModuleEntry moduleName, Consumer<ModuleAttributeBuilder> attrHandler)
```

Parameters:

- `moduleName`: the module name
- `attrHandler`: a handler that receives a `ModuleAttributeBuilder`

## ModuleAttribute.moduleName(ModuleDesc)

```java
ModuleAttributeBuilder moduleName(ModuleDesc moduleName)
```

Sets the module name.

Parameters:

- `moduleName`: the module name

**Returns:** this builder

## ModuleAttribute.moduleFlags(int)

```java
ModuleAttributeBuilder moduleFlags(int flagsMask)
```

Sets the module flags.

Parameters:

- `flagsMask`: the module flags

**Returns:** this builder

## ModuleAttribute.moduleFlags(AccessFlag...)

```java
default ModuleAttributeBuilder moduleFlags(AccessFlag... moduleFlags)
```

Sets the module flags.

Parameters:

- `moduleFlags`: the module flags

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE` location

## ModuleAttribute.moduleVersion(String)

```java
ModuleAttributeBuilder moduleVersion(String version)
```

Sets the module version, which may be `null`.

Parameters:

- `version`: the module version, may be `null`

**Returns:** this builder

## ModuleAttribute.requires(ModuleDesc, int, String)

```java
ModuleAttributeBuilder requires(ModuleDesc module, int requiresFlagsMask, String version)
```

Adds a module requirement.

Parameters:

- `module`: the required module
- `requiresFlagsMask`: the requires flags
- `version`: the required module version, may be `null`

**Returns:** this builder

## ModuleAttribute.requires(ModuleDesc, Collection<AccessFlag>, String)

```java
default ModuleAttributeBuilder requires(ModuleDesc module, Collection<AccessFlag> requiresFlags, String version)
```

Adds a module requirement.

Parameters:

- `module`: the required module
- `requiresFlags`: the requires flags
- `version`: the required module version, may be `null`

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_REQUIRES` location

## ModuleAttribute.requires(ModuleRequireInfo)

```java
ModuleAttributeBuilder requires(ModuleRequireInfo requires)
```

Adds module requirement.

Parameters:

- `requires`: the module require info

**Returns:** this builder

## ModuleAttribute.exports(PackageDesc, int, ModuleDesc...)

```java
ModuleAttributeBuilder exports(PackageDesc pkge, int exportsFlagsMask, ModuleDesc... exportsToModules)
```

Adds an exported package.

Parameters:

- `pkge`: the exported package
- `exportsFlagsMask`: the export flags
- `exportsToModules`: the modules to export to, or empty for an unqualified export

**Returns:** this builder

## ModuleAttribute.exports(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
default ModuleAttributeBuilder exports(PackageDesc pkge, Collection<AccessFlag> exportsFlags, ModuleDesc... exportsToModules)
```

Adds an exported package.

Parameters:

- `pkge`: the exported package
- `exportsFlags`: the export flags
- `exportsToModules`: the modules to export to, or empty for an unqualified export

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_EXPORTS` location

## ModuleAttribute.exports(ModuleExportInfo)

```java
ModuleAttributeBuilder exports(ModuleExportInfo exports)
```

Adds an exported package.

Parameters:

- `exports`: the module export info

**Returns:** this builder

## ModuleAttribute.opens(PackageDesc, int, ModuleDesc...)

```java
ModuleAttributeBuilder opens(PackageDesc pkge, int opensFlagsMask, ModuleDesc... opensToModules)
```

Opens a package.

Parameters:

- `pkge`: the opened package
- `opensFlagsMask`: the open package flags
- `opensToModules`: the modules to open to, or empty for an unqualified open

**API note:** Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See `MethodHandles.privateLookupIn` for more details.

**Returns:** this builder

## ModuleAttribute.opens(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
default ModuleAttributeBuilder opens(PackageDesc pkge, Collection<AccessFlag> opensFlags, ModuleDesc... opensToModules)
```

Opens a package.

Parameters:

- `pkge`: the opened package
- `opensFlags`: the open package flags
- `opensToModules`: the modules to open to, or empty for an unqualified open

**API note:** Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See `MethodHandles.privateLookupIn` for more details.

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_OPENS` location

## ModuleAttribute.opens(ModuleOpenInfo)

```java
ModuleAttributeBuilder opens(ModuleOpenInfo opens)
```

Opens a package.

Parameters:

- `opens`: the module open info

**API note:** Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See `MethodHandles.privateLookupIn` for more details.

**Returns:** this builder

## ModuleAttribute.uses(ClassDesc)

```java
ModuleAttributeBuilder uses(ClassDesc service)
```

Declares use of a service.

Parameters:

- `service`: the service class used

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if `service` represents a primitive type

## ModuleAttribute.uses(ClassEntry)

```java
ModuleAttributeBuilder uses(ClassEntry uses)
```

Declares use of a service.

Parameters:

- `uses`: the service class used

**Returns:** this builder

## ModuleAttribute.provides(ClassDesc, ClassDesc...)

```java
ModuleAttributeBuilder provides(ClassDesc service, ClassDesc... implClasses)
```

Declares provision of a service.

Parameters:

- `service`: the service class provided
- `implClasses`: the implementation classes

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if `service` or any of the `implClasses` represents a primitive type

## ModuleAttribute.provides(ModuleProvideInfo)

```java
ModuleAttributeBuilder provides(ModuleProvideInfo provides)
```

Declares provision of a service.

Parameters:

- `provides`: the module provides info

**Returns:** this builder
