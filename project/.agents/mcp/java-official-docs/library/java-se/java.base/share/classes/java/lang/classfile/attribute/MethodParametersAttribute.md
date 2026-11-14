# MethodParametersAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface MethodParametersAttribute extends Attribute<MethodParametersAttribute>, MethodElement permits BoundAttribute.BoundMethodParametersAttribute, UnboundAttribute.UnboundMethodParametersAttribute
```

Models the {@link Attributes#methodParameters() MethodParameters} attribute
(JVMS {@jvms 4.7.24}), which records reflective information about this
method's parameters such as access modifiers.
<p>
This attribute only appears on methods, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a method.  It has a
data dependency on the {@linkplain AttributeMapper.AttributeStability#CP_REFS
constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 8, major version
{@value ClassFile#JAVA_8_VERSION}.

@see Attributes#methodParameters()
@see Executable#getParameters()
@jvms 4.7.24 The {@code MethodParameters} Attribute
@since 24

## MethodParametersAttribute.parameters()

```java
List<MethodParameterInfo> parameters()
```

{@return information about the parameters of the method}  The i'th entry
in the list corresponds to the i'th parameter in the method descriptor.

## MethodParametersAttribute.of(List<MethodParameterInfo>)

```java
static MethodParametersAttribute of(List<MethodParameterInfo> parameters)
```

{@return a {@code MethodParameters} attribute}
@param parameters the method parameter descriptions

## MethodParametersAttribute.of(MethodParameterInfo...)

```java
static MethodParametersAttribute of(MethodParameterInfo... parameters)
```

{@return a {@code MethodParameters} attribute}
@param parameters the method parameter descriptions