# MethodModel interface (java.lang.classfile)

```java
public sealed interface MethodModel extends CompoundElement<MethodElement>, AttributedElement, ClassElement permits BufferedMethodBuilder.Model, MethodImpl
```

Models a method.  A method can be viewed as a {@linkplain CompoundElement
composition} of {@link MethodElement}s, or by random access via accessor
methods if only specific parts of the method is needed.
<p>
Methods can be obtained from {@link ClassModel#methods()}, or in the
traversal of member elements of a class.
<p>
{@link ClassBuilder#withMethod(String, MethodTypeDesc, int, Consumer)} is the
main way to construct methods.  {@link ClassBuilder#transformMethod} allows
creating a new method by selectively processing the original method elements
and directing the results to a method builder.
<p>
All method attributes are accessible as member elements.

@see ClassModel#methods()
@see MethodTransform
@jvms 4.6 Methods
@since 24

## MethodModel.flags()

```java
AccessFlags flags()
```

{@return the access flags}

@see AccessFlag.Location#METHOD

## MethodModel.parent()

```java
Optional<ClassModel> parent()
```

{@return the class model this method is a member of, if known}

## MethodModel.methodName()

```java
Utf8Entry methodName()
```

{@return the name of this method}

## MethodModel.methodType()

```java
Utf8Entry methodType()
```

{@return the method descriptor string of this method}

## MethodModel.methodTypeSymbol()

```java
default MethodTypeDesc methodTypeSymbol()
```

{@return the method type, as a symbolic descriptor}

## MethodModel.code()

```java
Optional<CodeModel> code()
```

{@return the body of this method, if there is one}