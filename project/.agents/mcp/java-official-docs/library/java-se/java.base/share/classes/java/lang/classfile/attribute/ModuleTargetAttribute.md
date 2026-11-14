# ModuleTargetAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleTargetAttribute extends Attribute<ModuleTargetAttribute>, ClassElement permits BoundAttribute.BoundModuleTargetAttribute, UnboundAttribute.UnboundModuleTargetAttribute
```

Models the {@link Attributes#moduleTarget() ModuleTarget} attribute, which
can appear on classes that {@linkplain ClassModel#isModuleInfo() represent}
module descriptors, to represent constraints on the target platform.
<p>
The specification of the {@code ModuleTarget} attribute is:
<pre> {@code
TargetPlatform_attribute {
  // index to CONSTANT_utf8_info structure in constant pool representing
  // the string "ModuleTarget"
  u2 attribute_name_index;
  u4 attribute_length;

  // index to CONSTANT_utf8_info structure with the target platform
  u2 target_platform_index;
}
} </pre>
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the {@code jdk.jlink} module,
which defines the {@code jlink} and {@code jmod} tools.

@see Attributes#moduleTarget()
@see ModuleHashesAttribute
@see ModuleResolutionAttribute
@since 24

## ModuleTargetAttribute.targetPlatform()

```java
Utf8Entry targetPlatform()
```

{@return the target platform}

## ModuleTargetAttribute.of(String)

```java
static ModuleTargetAttribute of(String targetPlatform)
```

{@return a {@code ModuleTarget} attribute}

@param targetPlatform the target platform

## ModuleTargetAttribute.of(Utf8Entry)

```java
static ModuleTargetAttribute of(Utf8Entry targetPlatform)
```

{@return a {@code ModuleTarget} attribute}

@param targetPlatform the target platform