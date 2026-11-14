# ModuleAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleAttribute extends Attribute<ModuleAttribute>, ClassElement permits BoundAttribute.BoundModuleAttribute, UnboundAttribute.UnboundModuleAttribute
```

Models the {@link Attributes#module() Module} attribute (JVMS {@jvms 4.7.25}),
which always appears on classes that {@linkplain ClassModel#isModuleInfo()
represent} module descriptors.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeMapper.AttributeStability#CP_REFS
constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 9, major version
{@value ClassFile#JAVA_9_VERSION}.

@see Attributes#module()
@see ModuleDescriptor
@jvms 4.7.25 The {@code Module} Attribute
@since 24

## ModuleAttribute.moduleName()

```java
ModuleEntry moduleName()
```

{@return the name of the module}

@see ModuleDescriptor#name()

## ModuleAttribute.moduleFlagsMask()

```java
int moduleFlagsMask()
```

{@return the module flags of the module, as a bit mask}  It is in the
range of unsigned short, {@code [0, 0xFFFF]}.

@see ModuleDescriptor#modifiers()
@see AccessFlag.Location#MODULE

## ModuleAttribute.moduleFlags()

```java
default Set<AccessFlag> moduleFlags()
```

{@return the module flags of the module, as a set of enum constants}

@throws IllegalArgumentException if the flags mask has any undefined bit set
@see ModuleDescriptor#accessFlags()
@see AccessFlag.Location#MODULE

## ModuleAttribute.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Tests presence of module flag.

@param flag the module flag
@return true if the flag is set
@see AccessFlag.Location#MODULE

## ModuleAttribute.moduleVersion()

```java
Optional<Utf8Entry> moduleVersion()
```

{@return the version of the module, if present}

@see ModuleDescriptor#version()

## ModuleAttribute.requires()

```java
List<ModuleRequireInfo> requires()
```

{@return the modules required by this module}

@see ModuleDescriptor#requires()

## ModuleAttribute.exports()

```java
List<ModuleExportInfo> exports()
```

{@return the packages exported by this module}

@see ModuleDescriptor#packages()

## ModuleAttribute.opens()

```java
List<ModuleOpenInfo> opens()
```

{@return the packages opened by this module}

@apiNote
Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See {@link
MethodHandles#privateLookupIn} for more details.

@see ModuleDescriptor#opens()

## ModuleAttribute.uses()

```java
List<ClassEntry> uses()
```

{@return the services used by this module}  Services may be discovered via
{@link ServiceLoader}.

@see ModuleDescriptor#uses()

## ModuleAttribute.provides()

```java
List<ModuleProvideInfo> provides()
```

{@return the service implementations provided by this module}

@see ModuleDescriptor#provides()

## ModuleAttribute.of(ModuleEntry, int, Utf8Entry, Collection<ModuleRequireInfo>, Collection<ModuleExportInfo>, Collection<ModuleOpenInfo>, Collection<ClassEntry>, Collection<ModuleProvideInfo>)

```java
static ModuleAttribute of(ModuleEntry moduleName, int moduleFlags, Utf8Entry moduleVersion, Collection<ModuleRequireInfo> requires, Collection<ModuleExportInfo> exports, Collection<ModuleOpenInfo> opens, Collection<ClassEntry> uses, Collection<ModuleProvideInfo> provides)
```

{@return a {@code Module} attribute}

@param moduleName the module name
@param moduleFlags the module flags
@param moduleVersion the module version, may be {@code null}
@param requires the required packages
@param exports the exported packages
@param opens the opened packages
@param uses the consumed services
@param provides the provided services

## ModuleAttribute.of(ModuleDesc, Consumer<ModuleAttributeBuilder>)

```java
static ModuleAttribute of(ModuleDesc moduleName, Consumer<ModuleAttributeBuilder> attrHandler)
```

{@return a {@code Module} attribute}

@param moduleName the module name
@param attrHandler a handler that receives a {@link ModuleAttributeBuilder}

## ModuleAttribute.of(ModuleEntry, Consumer<ModuleAttributeBuilder>)

```java
static ModuleAttribute of(ModuleEntry moduleName, Consumer<ModuleAttributeBuilder> attrHandler)
```

{@return a {@code Module} attribute}

@param moduleName the module name
@param attrHandler a handler that receives a {@link ModuleAttributeBuilder}

## ModuleAttribute.moduleName(ModuleDesc)

```java
ModuleAttributeBuilder moduleName(ModuleDesc moduleName)
```

Sets the module name.

@param moduleName the module name
@return this builder

## ModuleAttribute.moduleFlags(int)

```java
ModuleAttributeBuilder moduleFlags(int flagsMask)
```

Sets the module flags.

@param flagsMask the module flags
@return this builder

## ModuleAttribute.moduleFlags(AccessFlag...)

```java
default ModuleAttributeBuilder moduleFlags(AccessFlag... moduleFlags)
```

Sets the module flags.

@param moduleFlags the module flags
@return this builder
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE} location

## ModuleAttribute.moduleVersion(String)

```java
ModuleAttributeBuilder moduleVersion(String version)
```

Sets the module version, which may be {@code null}.

@param version the module version, may be {@code null}
@return this builder

## ModuleAttribute.requires(ModuleDesc, int, String)

```java
ModuleAttributeBuilder requires(ModuleDesc module, int requiresFlagsMask, String version)
```

Adds a module requirement.

@param module the required module
@param requiresFlagsMask the requires flags
@param version the required module version, may be {@code null}
@return this builder

## ModuleAttribute.requires(ModuleDesc, Collection<AccessFlag>, String)

```java
default ModuleAttributeBuilder requires(ModuleDesc module, Collection<AccessFlag> requiresFlags, String version)
```

Adds a module requirement.

@param module the required module
@param requiresFlags the requires flags
@param version the required module version, may be {@code null}
@return this builder
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_REQUIRES} location

## ModuleAttribute.requires(ModuleRequireInfo)

```java
ModuleAttributeBuilder requires(ModuleRequireInfo requires)
```

Adds module requirement.

@param requires the module require info
@return this builder

## ModuleAttribute.exports(PackageDesc, int, ModuleDesc...)

```java
ModuleAttributeBuilder exports(PackageDesc pkge, int exportsFlagsMask, ModuleDesc... exportsToModules)
```

Adds an exported package.

@param pkge the exported package
@param exportsFlagsMask the export flags
@param exportsToModules the modules to export to, or empty for an unqualified export
@return this builder

## ModuleAttribute.exports(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
default ModuleAttributeBuilder exports(PackageDesc pkge, Collection<AccessFlag> exportsFlags, ModuleDesc... exportsToModules)
```

Adds an exported package.

@param pkge the exported package
@param exportsFlags the export flags
@param exportsToModules the modules to export to, or empty for an unqualified export
@return this builder
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_EXPORTS} location

## ModuleAttribute.exports(ModuleExportInfo)

```java
ModuleAttributeBuilder exports(ModuleExportInfo exports)
```

Adds an exported package.

@param exports the module export info
@return this builder

## ModuleAttribute.opens(PackageDesc, int, ModuleDesc...)

```java
ModuleAttributeBuilder opens(PackageDesc pkge, int opensFlagsMask, ModuleDesc... opensToModules)
```

Opens a package.

@apiNote
Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See {@link
MethodHandles#privateLookupIn} for more details.

@param pkge the opened package
@param opensFlagsMask the open package flags
@param opensToModules the modules to open to, or empty for an unqualified open
@return this builder

## ModuleAttribute.opens(PackageDesc, Collection<AccessFlag>, ModuleDesc...)

```java
default ModuleAttributeBuilder opens(PackageDesc pkge, Collection<AccessFlag> opensFlags, ModuleDesc... opensToModules)
```

Opens a package.

@apiNote
Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See {@link
MethodHandles#privateLookupIn} for more details.

@param pkge the opened package
@param opensFlags the open package flags
@param opensToModules the modules to open to, or empty for an unqualified open
@return this builder
@throws IllegalArgumentException if any flag cannot be applied to the
        {@link AccessFlag.Location#MODULE_OPENS} location

## ModuleAttribute.opens(ModuleOpenInfo)

```java
ModuleAttributeBuilder opens(ModuleOpenInfo opens)
```

Opens a package.

@apiNote
Opening a package to another module allows that other module to gain
the same full privilege access as members in this module.  See {@link
MethodHandles#privateLookupIn} for more details.

@param opens the module open info
@return this builder

## ModuleAttribute.uses(ClassDesc)

```java
ModuleAttributeBuilder uses(ClassDesc service)
```

Declares use of a service.

@param service the service class used
@return this builder
@throws IllegalArgumentException if {@code service} represents a primitive type

## ModuleAttribute.uses(ClassEntry)

```java
ModuleAttributeBuilder uses(ClassEntry uses)
```

Declares use of a service.

@param uses the service class used
@return this builder

## ModuleAttribute.provides(ClassDesc, ClassDesc...)

```java
ModuleAttributeBuilder provides(ClassDesc service, ClassDesc... implClasses)
```

Declares provision of a service.

@param service the service class provided
@param implClasses the implementation classes
@return this builder
@throws IllegalArgumentException if {@code service} or any of the {@code implClasses} represents a primitive type

## ModuleAttribute.provides(ModuleProvideInfo)

```java
ModuleAttributeBuilder provides(ModuleProvideInfo provides)
```

Declares provision of a service.

@param provides the module provides info
@return this builder