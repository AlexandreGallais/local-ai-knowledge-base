# RecordComponent class (java.lang.reflect)

```java
public final class RecordComponent implements AnnotatedElement
```

A {@code RecordComponent} provides information about, and dynamic access to, a
component of a record class.

@see Class#getRecordComponents()
@see java.lang.Record
@jls 8.10 Record Classes
@since 16

## RecordComponent.getName()

```java
public String getName()
```

Returns the name of this record component.

@return the name of this record component

## RecordComponent.getType()

```java
public Class<?> getType()
```

Returns a {@code Class} that identifies the declared type for this
record component.

@return a {@code Class} identifying the declared type of the component
represented by this record component

## RecordComponent.getGenericSignature()

```java
public String getGenericSignature()
```

Returns a {@code String} that describes the generic type signature for
this record component.

@return a {@code String} that describes the generic type signature for
this record component

@jvms 4.7.9.1 Signatures

## RecordComponent.getGenericType()

```java
public Type getGenericType()
```

Returns a {@code Type} object that represents the declared type for
this record component.

<p>If the declared type of the record component is a parameterized type,
the {@code Type} object returned reflects the actual type arguments used
in the source code.

<p>If the type of the underlying record component is a type variable or a
parameterized type, it is created. Otherwise, it is resolved.

@return a {@code Type} object that represents the declared type for
        this record component
@throws GenericSignatureFormatError if the generic record component
        signature does not conform to the format specified in
        <cite>The Java Virtual Machine Specification</cite>
@throws TypeNotPresentException if the generic type
        signature of the underlying record component refers to a non-existent
        type declaration
@throws MalformedParameterizedTypeException if the generic
        signature of the underlying record component refers to a parameterized
        type that cannot be instantiated for any reason

## RecordComponent.getAnnotatedType()

```java
public AnnotatedType getAnnotatedType()
```

Returns an {@code AnnotatedType} object that represents the use of a type to specify
the declared type of this record component.

@return an object representing the declared type of this record component

## RecordComponent.getAccessor()

```java
public Method getAccessor()
```

Returns a {@code Method} that represents the accessor for this record
component.

@return a {@code Method} that represents the accessor for this record
component

## RecordComponent.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.
@throws NullPointerException {@inheritDoc}

## RecordComponent.getAnnotations()

```java
public Annotation[] getAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

## RecordComponent.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

## RecordComponent.toString()

```java
public String toString()
```

Returns a string describing this record component. The format is
the record component type, followed by a space, followed by the name
of the record component.
For example:
<pre>
   java.lang.String name
   int age
</pre>

@return a string describing this record component

## RecordComponent.getDeclaringRecord()

```java
public Class<?> getDeclaringRecord()
```

Returns the record class which declares this record component.

@return The record class declaring this record component.