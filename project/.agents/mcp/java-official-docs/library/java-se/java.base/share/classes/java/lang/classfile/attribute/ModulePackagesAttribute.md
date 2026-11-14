# ModulePackagesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModulePackagesAttribute extends Attribute<ModulePackagesAttribute>, ClassElement permits BoundAttribute.BoundModulePackagesAttribute, UnboundAttribute.UnboundModulePackagesAttribute
```

Models the {@link Attributes#modulePackages() ModulePackages} attribute (JVMS
{@jvms 4.7.26}), which can appear on classes that {@linkplain
ClassModel#isModuleInfo() represent} module descriptors to indicate packages
in the module used by the module descriptor.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 9, major version
{@value ClassFile#JAVA_9_VERSION}.

@see Attributes#modulePackages()
@see ModuleDescriptor#packages()
@jvms 4.7.26 The {@code ModulePackages} Attribute
@since 24

## ModulePackagesAttribute.packages()

```java
List<PackageEntry> packages()
```

{@return the packages used by the module descriptor}  This must include
all packages opened or exported by the module, as well as the packages of
any service providers, and the package for the main class.

## ModulePackagesAttribute.of(List<PackageEntry>)

```java
static ModulePackagesAttribute of(List<PackageEntry> packages)
```

{@return a {@code ModulePackages} attribute}
@param packages the packages

## ModulePackagesAttribute.of(PackageEntry...)

```java
static ModulePackagesAttribute of(PackageEntry... packages)
```

{@return a {@code ModulePackages} attribute}
@param packages the packages

## ModulePackagesAttribute.ofNames(List<PackageDesc>)

```java
static ModulePackagesAttribute ofNames(List<PackageDesc> packages)
```

{@return a {@code ModulePackages} attribute}
@param packages the packages

## ModulePackagesAttribute.ofNames(PackageDesc...)

```java
static ModulePackagesAttribute ofNames(PackageDesc... packages)
```

{@return a {@code ModulePackages} attribute}
@param packages the packages