# BootstrapMethodsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface BootstrapMethodsAttribute extends Attribute<BootstrapMethodsAttribute> permits BoundAttribute.BoundBootstrapMethodsAttribute, UnboundAttribute.EmptyBootstrapAttribute
```

Models the {@link Attributes#bootstrapMethods() BootstrapMethods} attribute
(JVMS {@jvms 4.7.23}), which stores symbolic information for the execution of
bootstrap methods, used by dynamically-computed call sites and constants.
It is logically a part of the constant pool of a {@code class} file and thus
not delivered in {@link ClassModel} traversal; its elements are accessible
through {@link ConstantPool}.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute cannot be constructed directly; its entries can be constructed
through {@link ConstantPoolBuilder#bsmEntry}, resulting in at most one
attribute instance in the built {@code class} file.
<p>
The attribute was introduced in the Java SE Platform version 7, major version
{@value ClassFile#JAVA_7_VERSION}.

@see Attributes#bootstrapMethods()
@see java.lang.invoke##bsm Execution of bootstrap methods
@jvms 4.7.23 The {@code BootstrapMethods} Attribute
@since 24

## BootstrapMethodsAttribute.bootstrapMethods()

```java
List<BootstrapMethodEntry> bootstrapMethods()
```

{@return the elements of the bootstrap method table}

## BootstrapMethodsAttribute.bootstrapMethodsSize()

```java
int bootstrapMethodsSize()
```

{@return the size of the bootstrap methods table}