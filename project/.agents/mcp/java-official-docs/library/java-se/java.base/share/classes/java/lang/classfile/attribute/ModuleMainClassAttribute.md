# ModuleMainClassAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleMainClassAttribute extends Attribute<ModuleMainClassAttribute>, ClassElement permits BoundAttribute.BoundModuleMainClassAttribute, UnboundAttribute.UnboundModuleMainClassAttribute
```

Models the {@link Attributes#moduleMainClass() ModuleMainClass} attribute
(JVMS {@jvms 4.7.27}), which appears on classes that {@linkplain
ClassModel#isModuleInfo() represent} module descriptors to indicate the main
class of the module.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 9, major version
{@value ClassFile#JAVA_9_VERSION}.

@see Attributes#moduleMainClass()
@see ModuleDescriptor#mainClass()
@jvms 4.7.27 The {@code ModuleMainClass} Attribute
@since 24

## ModuleMainClassAttribute.mainClass()

```java
ClassEntry mainClass()
```

{@return main class for this module}

## ModuleMainClassAttribute.of(ClassEntry)

```java
static ModuleMainClassAttribute of(ClassEntry mainClass)
```

{@return a {@code ModuleMainClass} attribute}
@param mainClass the main class

## ModuleMainClassAttribute.of(ClassDesc)

```java
static ModuleMainClassAttribute of(ClassDesc mainClass)
```

{@return a {@code ModuleMainClass} attribute}
@param mainClass the main class
@throws IllegalArgumentException if {@code mainClass} represents a primitive type