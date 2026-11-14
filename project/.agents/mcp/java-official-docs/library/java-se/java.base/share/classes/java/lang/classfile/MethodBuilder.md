# MethodBuilder interface (java.lang.classfile)

```java
public sealed interface MethodBuilder extends ClassFileBuilder<MethodElement, MethodBuilder> permits ChainedMethodBuilder, TerminalMethodBuilder
```

A builder for methods.  The main way to obtain a method builder is via {@link
ClassBuilder#withMethod(String, MethodTypeDesc, int, Consumer)}.  {@link
ClassBuilder#withMethodBody(String, MethodTypeDesc, int, Consumer)} is
useful if no attribute on the method except {@link CodeModel Code} needs to
be configured, skipping the method handler.
<p>
Refer to {@link ClassFileBuilder} for general guidance and caution around
the use of builders for structures in the {@code class} file format.

@see MethodModel
@see MethodTransform
@jvms 4.6 Methods
@since 24

## MethodBuilder.withFlags(int)

```java
default MethodBuilder withFlags(int flags)
```

Sets the method access flags.  The {@link AccessFlag#STATIC} flag cannot
be modified after the builder is created.

@param flags the access flags, as a bit mask
@return this builder
@throws IllegalArgumentException if the {@link ClassFile#ACC_STATIC
        ACC_STATIC} flag is modified
@see AccessFlags
@see AccessFlag.Location#METHOD

## MethodBuilder.withFlags(AccessFlag...)

```java
default MethodBuilder withFlags(AccessFlag... flags)
```

Sets the method access flags.  The {@link AccessFlag#STATIC} flag cannot
be modified after the builder is created.

@param flags the access flags, as a bit mask
@return this builder
@throws IllegalArgumentException if the {@link ClassFile#ACC_STATIC
        ACC_STATIC} flag is modified
@see AccessFlags
@see AccessFlag.Location#METHOD

## MethodBuilder.withCode(Consumer<? super CodeBuilder>)

```java
MethodBuilder withCode(Consumer<? super CodeBuilder> code)
```

Build the method body for this method.

@param code a handler receiving a {@link CodeBuilder}
@return this builder
@see CodeModel

## MethodBuilder.transformCode(CodeModel, CodeTransform)

```java
MethodBuilder transformCode(CodeModel code, CodeTransform transform)
```

Build the method body for this method by transforming the body of another
method.
<p>
This method behaves as if:
{@snippet lang=java :
withCode(cob -> cob.transform(code, transform));
}

@param code the method body to be transformed
@param transform the transform to apply to the method body
@return this builder
@see CodeTransform