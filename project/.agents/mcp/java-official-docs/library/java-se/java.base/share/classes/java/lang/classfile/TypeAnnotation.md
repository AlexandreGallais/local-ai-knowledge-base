# TypeAnnotation interface (java.lang.classfile)

```java
public sealed interface TypeAnnotation permits UnboundAttribute.UnboundTypeAnnotation
```

Models a {@code type_annotation} structure (JVMS {@jvms 4.7.20}). This model
indicates the annotated type within a declaration or expression and the part
of the indicated type that is annotated, in addition to what is {@linkplain
#annotation() available} in an {@code Annotation}.
<p>
This model can reconstruct an annotation on a type or a part of a type, given
the location of the {@code type_annotation} structure in the class file and
the definition of the annotation interface.
<p>
Two {@code TypeAnnotation} objects should be compared using the {@link
Object#equals(Object) equals} method.

@see Annotation
@see RuntimeVisibleTypeAnnotationsAttribute
@see RuntimeInvisibleTypeAnnotationsAttribute

@since 24

## TypeAnnotation.CLASS_TYPE_PARAMETER(TARGET_CLASS_TYPE_PARAMETER, 1), /** For annotations on a method type parameter declaration. */ METHOD_TYPE_PARAMETER(TARGET_METHOD_TYPE_PARAMETER, 1), /** For annotations on the type of an "extends" or "implements" clause. */ CLASS_EXTENDS(TARGET_CLASS_EXTENDS, 2), /** For annotations on a bound of a type parameter of a class. */ CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CLASS_TYPE_PARAMETER(TARGET_CLASS_TYPE_PARAMETER, 1), /** For annotations on a method type parameter declaration. */ METHOD_TYPE_PARAMETER(TARGET_METHOD_TYPE_PARAMETER, 1), /** For annotations on the type of an "extends" or "implements" clause. */ CLASS_EXTENDS(TARGET_CLASS_EXTENDS, 2), /** For annotations on a bound of a type parameter of a class. */ CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a class type parameter declaration.

## TypeAnnotation.METHOD_TYPE_PARAMETER(TARGET_METHOD_TYPE_PARAMETER, 1), /** For annotations on the type of an "extends" or "implements" clause. */ CLASS_EXTENDS(TARGET_CLASS_EXTENDS, 2), /** For annotations on a bound of a type parameter of a class. */ CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_TYPE_PARAMETER(TARGET_METHOD_TYPE_PARAMETER, 1), /** For annotations on the type of an "extends" or "implements" clause. */ CLASS_EXTENDS(TARGET_CLASS_EXTENDS, 2), /** For annotations on a bound of a type parameter of a class. */ CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a method type parameter declaration.

## TypeAnnotation.CLASS_EXTENDS(TARGET_CLASS_EXTENDS, 2), /** For annotations on a bound of a type parameter of a class. */ CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CLASS_EXTENDS(TARGET_CLASS_EXTENDS, 2), /** For annotations on a bound of a type parameter of a class. */ CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on the type of an "extends" or "implements" clause.

## TypeAnnotation.CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CLASS_TYPE_PARAMETER_BOUND(TARGET_CLASS_TYPE_PARAMETER_BOUND, 2), /** For annotations on a bound of a type parameter of a method. */ METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a bound of a type parameter of a class.

## TypeAnnotation.METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_TYPE_PARAMETER_BOUND(TARGET_METHOD_TYPE_PARAMETER_BOUND, 2), /** For annotations on a field. */ FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a bound of a type parameter of a method.

## TypeAnnotation.FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
FIELD(TARGET_FIELD, 0), /** For annotations on a method return type. */ METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a field.

## TypeAnnotation.METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_RETURN(TARGET_METHOD_RETURN, 0), /** For annotations on the method receiver. */ METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a method return type.

## TypeAnnotation.METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_RECEIVER(TARGET_METHOD_RECEIVER, 0), /** For annotations on a method parameter. */ METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on the method receiver.

## TypeAnnotation.METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_FORMAL_PARAMETER(TARGET_METHOD_FORMAL_PARAMETER, 1), /** For annotations on a throws clause in a method declaration. */ THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a method parameter.

## TypeAnnotation.THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
THROWS(TARGET_THROWS, 2), /** For annotations on a local variable. */ LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a throws clause in a method declaration.

## TypeAnnotation.LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
LOCAL_VARIABLE(TARGET_LOCAL_VARIABLE, -1), /** For annotations on a resource variable. */ RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a local variable.

## TypeAnnotation.RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
RESOURCE_VARIABLE(TARGET_RESOURCE_VARIABLE, -1), /** For annotations on an exception parameter. */ EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a resource variable.

## TypeAnnotation.EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
EXCEPTION_PARAMETER(TARGET_EXCEPTION_PARAMETER, 2), /** For annotations on a type test. */ INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on an exception parameter.

## TypeAnnotation.INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
INSTANCEOF(TARGET_INSTANCEOF, 2), /** For annotations on an object creation expression. */ NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type test.

## TypeAnnotation.NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
NEW(TARGET_NEW, 2), /** For annotations on a constructor reference receiver. */ CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on an object creation expression.

## TypeAnnotation.CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CONSTRUCTOR_REFERENCE(TARGET_CONSTRUCTOR_REFERENCE, 2), /** For annotations on a method reference receiver. */ METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a constructor reference receiver.

## TypeAnnotation.METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_REFERENCE(TARGET_METHOD_REFERENCE, 2), /** For annotations on a typecast. */ CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a method reference receiver.

## TypeAnnotation.CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CAST(TARGET_CAST, 3), /** For annotations on a type argument of an object creation expression. */ CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a typecast.

## TypeAnnotation.CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method call. */ METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of an object creation expression.

## TypeAnnotation.METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_INVOCATION_TYPE_ARGUMENT(TARGET_METHOD_INVOCATION_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a constructor reference. */ CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of a method call.

## TypeAnnotation.CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT(TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT, 3), /** For annotations on a type argument of a method reference. */ METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of a constructor reference.

## TypeAnnotation.METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)

```java
METHOD_REFERENCE_TYPE_ARGUMENT(TARGET_METHOD_REFERENCE_TYPE_ARGUMENT, 3)
```

For annotations on a type argument of a method reference.

## TypeAnnotation.targetTypeValue()

```java
public int targetTypeValue()
```

{@return the target type value}

@apiNote
{@code TARGET_}-prefixed constants in {@link TargetInfo}, such as {@link
TargetInfo#TARGET_CLASS_TYPE_PARAMETER}, describe the possible return
values of this method.

## TypeAnnotation.sizeIfFixed()

```java
public int sizeIfFixed()
```

{@return the size of the target type if fixed or -1 if variable}

## TypeAnnotation.targetInfo()

```java
TargetInfo targetInfo()
```

{@return information describing precisely which type in a declaration or expression
is annotated} This models the {@code target_type} and {@code target_info} items.

## TypeAnnotation.targetPath()

```java
List<TypePathComponent> targetPath()
```

{@return which part of the type indicated by {@link #targetInfo()} is annotated}

## TypeAnnotation.annotation()

```java
Annotation annotation()
```

{@return the annotation applied to the part indicated by {@link #targetPath()}}
This models the interface of the annotation and the set of element-value pairs,
the subset of the {@code type_annotation} structure that is identical to the
{@code annotation} structure.

## TypeAnnotation.of(TargetInfo, List<TypePathComponent>, Annotation)

```java
static TypeAnnotation of(TargetInfo targetInfo, List<TypePathComponent> targetPath, Annotation annotation)
```

{@return a {@code type_annotation} structure}
@param targetInfo which type in a declaration or expression is annotated
@param targetPath which part of the type is annotated
@param annotation the annotation

## TypeAnnotation.TARGET_CLASS_TYPE_PARAMETER

```java
int TARGET_CLASS_TYPE_PARAMETER
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CLASS_TYPE_PARAMETER CLASS_TYPE_PARAMETER}.

## TypeAnnotation.TARGET_METHOD_TYPE_PARAMETER

```java
int TARGET_METHOD_TYPE_PARAMETER
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_TYPE_PARAMETER METHOD_TYPE_PARAMETER}.

## TypeAnnotation.TARGET_CLASS_EXTENDS

```java
int TARGET_CLASS_EXTENDS
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CLASS_EXTENDS CLASS_EXTENDS}.

## TypeAnnotation.TARGET_CLASS_TYPE_PARAMETER_BOUND

```java
int TARGET_CLASS_TYPE_PARAMETER_BOUND
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CLASS_TYPE_PARAMETER_BOUND
CLASS_TYPE_PARAMETER_BOUND}.

## TypeAnnotation.TARGET_METHOD_TYPE_PARAMETER_BOUND

```java
int TARGET_METHOD_TYPE_PARAMETER_BOUND
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_TYPE_PARAMETER_BOUND
METHOD_TYPE_PARAMETER_BOUND}.

## TypeAnnotation.TARGET_FIELD

```java
int TARGET_FIELD
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#FIELD FIELD}.

## TypeAnnotation.TARGET_METHOD_RETURN

```java
int TARGET_METHOD_RETURN
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_RETURN METHOD_RETURN}.

## TypeAnnotation.TARGET_METHOD_RECEIVER

```java
int TARGET_METHOD_RECEIVER
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_RECEIVER METHOD_RECEIVER}.

## TypeAnnotation.TARGET_METHOD_FORMAL_PARAMETER

```java
int TARGET_METHOD_FORMAL_PARAMETER
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_FORMAL_PARAMETER
METHOD_FORMAL_PARAMETER}.

## TypeAnnotation.TARGET_THROWS

```java
int TARGET_THROWS
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#THROWS THROWS}.

## TypeAnnotation.TARGET_LOCAL_VARIABLE

```java
int TARGET_LOCAL_VARIABLE
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#LOCAL_VARIABLE LOCAL_VARIABLE}.

## TypeAnnotation.TARGET_RESOURCE_VARIABLE

```java
int TARGET_RESOURCE_VARIABLE
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#RESOURCE_VARIABLE RESOURCE_VARIABLE}.

## TypeAnnotation.TARGET_EXCEPTION_PARAMETER

```java
int TARGET_EXCEPTION_PARAMETER
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#EXCEPTION_PARAMETER EXCEPTION_PARAMETER}.

## TypeAnnotation.TARGET_INSTANCEOF

```java
int TARGET_INSTANCEOF
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#INSTANCEOF INSTANCEOF}.

## TypeAnnotation.TARGET_NEW

```java
int TARGET_NEW
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#NEW NEW}.

## TypeAnnotation.TARGET_CONSTRUCTOR_REFERENCE

```java
int TARGET_CONSTRUCTOR_REFERENCE
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CONSTRUCTOR_REFERENCE
CONSTRUCTOR_REFERENCE}.

## TypeAnnotation.TARGET_METHOD_REFERENCE

```java
int TARGET_METHOD_REFERENCE
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_REFERENCE METHOD_REFERENCE}.

## TypeAnnotation.TARGET_CAST

```java
int TARGET_CAST
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CAST CAST}.

## TypeAnnotation.TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT

```java
int TARGET_CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT
CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT}.

## TypeAnnotation.TARGET_METHOD_INVOCATION_TYPE_ARGUMENT

```java
int TARGET_METHOD_INVOCATION_TYPE_ARGUMENT
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_INVOCATION_TYPE_ARGUMENT
METHOD_INVOCATION_TYPE_ARGUMENT}.

## TypeAnnotation.TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT

```java
int TARGET_CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT
CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT}.

## TypeAnnotation.TARGET_METHOD_REFERENCE_TYPE_ARGUMENT

```java
int TARGET_METHOD_REFERENCE_TYPE_ARGUMENT
```

The {@linkplain TargetType#targetTypeValue() value} of type annotation {@linkplain
#targetType target type} {@link TargetType#METHOD_REFERENCE_TYPE_ARGUMENT
METHOD_REFERENCE_TYPE_ARGUMENT}.

## TypeAnnotation.targetType()

```java
TargetType targetType()
```

{@return the type of the target}

## TypeAnnotation.size()

```java
default int size()
```

{@return the size of the target info}

## TypeAnnotation.ofTypeParameter(TargetType, int)

```java
static TypeParameterTarget ofTypeParameter(TargetType targetType, int typeParameterIndex)
```

{@return a target for annotations on a class or method type parameter declaration}
@param targetType {@link TargetType#CLASS_TYPE_PARAMETER} or {@link TargetType#METHOD_TYPE_PARAMETER}
@param typeParameterIndex specifies which type parameter declaration is annotated

## TypeAnnotation.ofClassTypeParameter(int)

```java
static TypeParameterTarget ofClassTypeParameter(int typeParameterIndex)
```

{@return a target for annotations on a class type parameter declaration}
@param typeParameterIndex specifies which type parameter declaration is annotated

## TypeAnnotation.ofMethodTypeParameter(int)

```java
static TypeParameterTarget ofMethodTypeParameter(int typeParameterIndex)
```

{@return a target for annotations on a method type parameter declaration}
@param typeParameterIndex specifies which type parameter declaration is annotated

## TypeAnnotation.ofClassExtends(int)

```java
static SupertypeTarget ofClassExtends(int supertypeIndex)
```

{@return a target for annotations on the type of an "extends" or "implements" clause}
@param supertypeIndex the index into the interfaces array or 65535 to indicate it is the superclass

## TypeAnnotation.ofTypeParameterBound(TargetType, int, int)

```java
static TypeParameterBoundTarget ofTypeParameterBound(TargetType targetType, int typeParameterIndex, int boundIndex)
```

{@return a target for annotations on the i'th bound of the j'th type parameter declaration of
a generic class, interface, method, or constructor}
@param targetType {@link TargetType#CLASS_TYPE_PARAMETER_BOUND} or {@link TargetType#METHOD_TYPE_PARAMETER_BOUND}
@param typeParameterIndex specifies which type parameter declaration is annotated
@param boundIndex specifies which bound of the type parameter declaration is annotated

## TypeAnnotation.ofClassTypeParameterBound(int, int)

```java
static TypeParameterBoundTarget ofClassTypeParameterBound(int typeParameterIndex, int boundIndex)
```

{@return a target for annotations on the i'th bound of the j'th type parameter declaration of
a generic class, or interface}
@param typeParameterIndex specifies which type parameter declaration is annotated
@param boundIndex specifies which bound of the type parameter declaration is annotated

## TypeAnnotation.ofMethodTypeParameterBound(int, int)

```java
static TypeParameterBoundTarget ofMethodTypeParameterBound(int typeParameterIndex, int boundIndex)
```

{@return a target for annotations on the i'th bound of the j'th type parameter declaration of
a generic method, or constructor}
@param typeParameterIndex specifies which type parameter declaration is annotated
@param boundIndex specifies which bound of the type parameter declaration is annotated

## TypeAnnotation.of(TargetType)

```java
static EmptyTarget of(TargetType targetType)
```

{@return a target for annotations}
@param targetType {@link TargetType#FIELD}, {@link TargetType#METHOD_RETURN} or {@link TargetType#METHOD_RECEIVER}

## TypeAnnotation.ofField()

```java
static EmptyTarget ofField()
```

{@return a target for annotations on the type in a field or record declaration}

## TypeAnnotation.ofMethodReturn()

```java
static EmptyTarget ofMethodReturn()
```

{@return a target for annotations on the return type of a method or a newly constructed object}

## TypeAnnotation.ofMethodReceiver()

```java
static EmptyTarget ofMethodReceiver()
```

{@return a target for annotations on the receiver type of a method or constructor}

## TypeAnnotation.ofMethodFormalParameter(int)

```java
static FormalParameterTarget ofMethodFormalParameter(int formalParameterIndex)
```

{@return a target for annotations on the type in a formal parameter
declaration of a method, constructor, or lambda expression}  The
index may differ from the index in the method descriptor because some
synthetic or implicit parameters are omitted.

@param formalParameterIndex specifies which formal parameter declaration has an annotated type

## TypeAnnotation.ofThrows(int)

```java
static ThrowsTarget ofThrows(int throwsTargetIndex)
```

{@return a target for annotations on the i'th type in the throws clause of a method or
constructor declaration}
@param throwsTargetIndex the index into the exception table of the Exceptions attribute of the method

## TypeAnnotation.ofVariable(TargetType, List<LocalVarTargetInfo>)

```java
static LocalVarTarget ofVariable(TargetType targetType, List<LocalVarTargetInfo> table)
```

{@return a target for annotations on the type in a local variable declaration,
including a variable declared as a resource in a try-with-resources statement}
@param targetType {@link TargetType#LOCAL_VARIABLE} or {@link TargetType#RESOURCE_VARIABLE}
@param table the list of local variable targets

## TypeAnnotation.ofLocalVariable(List<LocalVarTargetInfo>)

```java
static LocalVarTarget ofLocalVariable(List<LocalVarTargetInfo> table)
```

{@return a target for annotations on the type in a local variable declaration}
@param table the list of local variable targets

## TypeAnnotation.ofResourceVariable(List<LocalVarTargetInfo>)

```java
static LocalVarTarget ofResourceVariable(List<LocalVarTargetInfo> table)
```

{@return a target for annotations on the type in a local variable declared
as a resource in a try-with-resources statement}
@param table the list of local variable targets

## TypeAnnotation.ofExceptionParameter(int)

```java
static CatchTarget ofExceptionParameter(int exceptionTableIndex)
```

{@return a target for annotations on the i'th type in an exception parameter declaration}
@param exceptionTableIndex the index into the exception table of the Code attribute

## TypeAnnotation.ofOffset(TargetType, Label)

```java
static OffsetTarget ofOffset(TargetType targetType, Label target)
```

{@return a target for annotations on the type in an instanceof expression or a new expression,
or the type before the :: in a method reference expression}
@param targetType {@link TargetType#INSTANCEOF}, {@link TargetType#NEW},
                  {@link TargetType#CONSTRUCTOR_REFERENCE},
                  or {@link TargetType#METHOD_REFERENCE}
@param target the label right before the instruction

## TypeAnnotation.ofInstanceofExpr(Label)

```java
static OffsetTarget ofInstanceofExpr(Label target)
```

{@return a target for annotations on the type in an instanceof expression}
@param target the label right before the instruction

## TypeAnnotation.ofNewExpr(Label)

```java
static OffsetTarget ofNewExpr(Label target)
```

{@return a target for annotations on the type in a new expression}
@param target the label right before the instruction

## TypeAnnotation.ofConstructorReference(Label)

```java
static OffsetTarget ofConstructorReference(Label target)
```

{@return a target for annotations on the type before the :: in a constructor reference expression}
@param target the label right before the instruction

## TypeAnnotation.ofMethodReference(Label)

```java
static OffsetTarget ofMethodReference(Label target)
```

{@return a target for annotations on the type before the :: in a method reference expression}
@param target the label right before the instruction

## TypeAnnotation.ofTypeArgument(TargetType, Label, int)

```java
static TypeArgumentTarget ofTypeArgument(TargetType targetType, Label target, int typeArgumentIndex)
```

{@return a target for annotations on the i'th type in a cast expression,
or on the i'th type argument in the explicit type argument list for any of the following:
a new expression, an explicit constructor invocation statement, a method invocation expression,
or a method reference expression}
@param targetType {@link TargetType#CAST}, {@link TargetType#CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT},
                  {@link TargetType#METHOD_INVOCATION_TYPE_ARGUMENT},
                  {@link TargetType#CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT},
                  or {@link TargetType#METHOD_REFERENCE_TYPE_ARGUMENT}
@param target the label right before the instruction
@param typeArgumentIndex specifies which type in the cast operator or argument is annotated

## TypeAnnotation.ofCastExpr(Label, int)

```java
static TypeArgumentTarget ofCastExpr(Label target, int typeArgumentIndex)
```

{@return a target for annotations on the i'th type in a cast expression}
@param target the label right before the instruction
@param typeArgumentIndex specifies which type in the cast operator is annotated

## TypeAnnotation.ofConstructorInvocationTypeArgument(Label, int)

```java
static TypeArgumentTarget ofConstructorInvocationTypeArgument(Label target, int typeArgumentIndex)
```

{@return a target for annotations on the i'th type argument in the explicit type argument list for
an explicit constructor invocation statement}
@param target the label right before the instruction
@param typeArgumentIndex specifies which type in the argument is annotated

## TypeAnnotation.ofMethodInvocationTypeArgument(Label, int)

```java
static TypeArgumentTarget ofMethodInvocationTypeArgument(Label target, int typeArgumentIndex)
```

{@return a target for annotations on the i'th type argument in the explicit type argument list for
a method invocation expression}
@param target the label right before the instruction
@param typeArgumentIndex specifies which type in the argument is annotated

## TypeAnnotation.ofConstructorReferenceTypeArgument(Label, int)

```java
static TypeArgumentTarget ofConstructorReferenceTypeArgument(Label target, int typeArgumentIndex)
```

{@return a target for annotations on the i'th type argument in the explicit type argument list for
a new expression}
@param target the label right before the instruction
@param typeArgumentIndex specifies which type in the argument is annotated

## TypeAnnotation.ofMethodReferenceTypeArgument(Label, int)

```java
static TypeArgumentTarget ofMethodReferenceTypeArgument(Label target, int typeArgumentIndex)
```

{@return a target for annotations on the i'th type argument in the explicit type argument list for
a method reference expression}
@param target the label right before the instruction
@param typeArgumentIndex specifies which type in the argument is annotated

## TypeAnnotation.typeParameterIndex()

```java
int typeParameterIndex()
```

JVMS: The value of the type_parameter_index item specifies which type parameter declaration is annotated.
A type_parameter_index value of 0 specifies the first type parameter declaration.

@return the index into the type parameters

## TypeAnnotation.supertypeIndex()

```java
int supertypeIndex()
```

JVMS: A supertype_index value of 65535 specifies that the annotation appears on the superclass in an extends
clause of a class declaration.

Any other supertype_index value is an index into the interfaces array of the enclosing ClassFile structure,
and specifies that the annotation appears on that superinterface in either the implements clause of a class
declaration or the extends clause of an interface declaration.

@return the index into the interfaces array or 65535 to indicate it is the superclass

## TypeAnnotation.typeParameterIndex()

```java
int typeParameterIndex()
```

Which type parameter declaration has an annotated bound.

@return the zero-origin index into the type parameters

## TypeAnnotation.boundIndex()

```java
int boundIndex()
```

Which bound of the type parameter declaration is annotated.

@return the zero-origin index into bounds on the type parameter

## TypeAnnotation.formalParameterIndex()

```java
int formalParameterIndex()
```

{@return the index into the formal parameter declarations, in the
order declared in the source code}  The index may differ from the
index in the method descriptor because some synthetic or implicit
parameters are omitted.

## TypeAnnotation.throwsTargetIndex()

```java
int throwsTargetIndex()
```

The index into the exception_index_table array of the
Exceptions attribute of the method_info structure enclosing the
RuntimeVisibleTypeAnnotations attribute.

@return the index into the list java.lang.classfile.attribute.ExceptionsAttribute.exceptions()

## TypeAnnotation.table()

```java
List<LocalVarTargetInfo> table()
```

{@return the table of local variable location/indices}

## TypeAnnotation.startLabel()

```java
Label startLabel()
```

The given local variable has a value at indices into the code array in the interval
[start_pc, start_pc + length), that is, between start_pc inclusive and start_pc + length exclusive.

@return the start of the bytecode section

## TypeAnnotation.endLabel()

```java
Label endLabel()
```

The given local variable has a value at indices into the code array in the interval
[start_pc, start_pc + length), that is, between start_pc inclusive and start_pc + length exclusive.

@return the end of the bytecode section

## TypeAnnotation.index()

```java
int index()
```

The given local variable must be at index in the local variable array of the current frame.

If the local variable at index is of type double or long, it occupies both index and index + 1.

@return the index into the local variables

## TypeAnnotation.of(Label, Label, int)

```java
static LocalVarTargetInfo of(Label startLabel, Label endLabel, int index)
```

{@return local variable target info}
@param startLabel the code label indicating start of an interval where variable has value
@param endLabel the code label indicating start of an interval where variable has value
@param index index into the local variables

## TypeAnnotation.exceptionTableIndex()

```java
int exceptionTableIndex()
```

The index into the exception_table array of the Code
attribute enclosing the RuntimeVisibleTypeAnnotations attribute.

@return the index into the exception table

## TypeAnnotation.target()

```java
Label target()
```

The label right before the {@link Instruction} corresponding to the
instanceof expression, the new expression, or the method reference
expression.

@return the label right before the instruction

## TypeAnnotation.target()

```java
Label target()
```

The label right before the {@link Instruction} corresponding to the
cast expression, the new expression, the explicit constructor
invocation statement, the method invocation expression, or the method
reference expression.

@return the label right before the instruction

## TypeAnnotation.typeArgumentIndex()

```java
int typeArgumentIndex()
```

For a cast expression, the value of the type_argument_index item specifies which type in the cast
operator is annotated. A type_argument_index value of 0 specifies the first (or only) type in the cast
operator.

The possibility of more than one type in a cast expression arises from a cast to an intersection type.

For an explicit type argument list, the value of the type_argument_index item specifies which type argument
is annotated. A type_argument_index value of 0 specifies the first type argument.

@return the index into the type arguments

## TypeAnnotation.ARRAY(0), /** Annotation is deeper in a nested type */ INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)

```java
ARRAY(0), /** Annotation is deeper in a nested type */ INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)
```

Annotation is deeper in an array type

## TypeAnnotation.INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)

```java
INNER_TYPE(1), /** Annotation is on the bound of a wildcard type argument of a parameterized type */ WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)
```

Annotation is deeper in a nested type

## TypeAnnotation.WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)

```java
WILDCARD(2), /** Annotation is on a type argument of a parameterized type */ TYPE_ARGUMENT(3)
```

Annotation is on the bound of a wildcard type argument of a parameterized type

## TypeAnnotation.TYPE_ARGUMENT(3)

```java
TYPE_ARGUMENT(3)
```

Annotation is on a type argument of a parameterized type

## TypeAnnotation.tag()

```java
public int tag()
```

{@return the type path kind value}

## TypeAnnotation.ARRAY

```java
TypePathComponent ARRAY
```

static instance for annotation is deeper in an array type

## TypeAnnotation.INNER_TYPE

```java
TypePathComponent INNER_TYPE
```

static instance for annotation is deeper in a nested type

## TypeAnnotation.WILDCARD

```java
TypePathComponent WILDCARD
```

static instance for annotation is on the bound of a wildcard type argument of a parameterized type

## TypeAnnotation.typePathKind()

```java
Kind typePathKind()
```

The type path kind items from JVMS Table 4.7.20.2-A.

@return the kind of path element

## TypeAnnotation.typeArgumentIndex()

```java
int typeArgumentIndex()
```

JVMS: type_argument_index
If the value of the type_path_kind item is 0, 1, or 2, then the value of the type_argument_index item is 0.

If the value of the type_path_kind item is 3, then the value of the type_argument_index item specifies which
type argument of a parameterized type is annotated, where 0 indicates the first type argument of a
parameterized type.

@return the index within the type component

## TypeAnnotation.of(Kind, int)

```java
static TypePathComponent of(Kind typePathKind, int typeArgumentIndex)
```

{@return type path component of an annotation}
@param typePathKind the kind of path element
@param typeArgumentIndex the type argument index