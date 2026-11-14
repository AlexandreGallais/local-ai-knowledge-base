# ClassSpecializer class (java.lang.invoke)

```java
/*non-public*/ abstract class ClassSpecializer<T,K,S extends ClassSpecializer<T,K,S>.SpeciesData>
```

Class specialization code.
@param <T> top class under which species classes are created.
@param <K> key which identifies individual specializations.
@param <S> species data type.

## ClassSpecializer.topClass()

```java
public final Class<T> topClass()
```

Return the top type mirror, for type {@code T}

## ClassSpecializer.keyType()

```java
public final Class<K> keyType()
```

Return the key type mirror, for type {@code K}

## ClassSpecializer.metaType()

```java
public final Class<S> metaType()
```

Return the species metadata type mirror, for type {@code S}

## ClassSpecializer.baseConstructorType()

```java
protected MethodType baseConstructorType()
```

Report the leading arguments (if any) required by every species factory.
Every species factory adds its own field types as additional arguments,
but these arguments always come first, in every factory method.

## ClassSpecializer.topSpecies()

```java
protected final S topSpecies()
```

Return the trivial species for the null sequence of arguments.

## ClassSpecializer.transformMethods()

```java
protected final List<MemberName> transformMethods()
```

Return the list of transform methods originally given at creation of this specializer.

## ClassSpecializer.factory()

```java
protected final Factory factory()
```

Return the factory object used to build and load concrete species code.

## ClassSpecializer.ClassSpecializer(Class<T>, Class<K>, Class<S>, MethodType, MemberName, String, List<MemberName>)

```java
protected ClassSpecializer(Class<T> topClass, Class<K> keyType, Class<S> metaType, MethodType baseConstructorType, MemberName sdAccessor, String sdFieldName, List<MemberName> transformMethods)
```

Constructor for this class specializer.
@param topClass type mirror for T
@param keyType type mirror for K
@param metaType type mirror for S
@param baseConstructorType principal constructor type
@param sdAccessor the method used to get the speciesData
@param sdFieldName the name of the species data field, inject the speciesData object
@param transformMethods optional list of transformMethods

## ClassSpecializer.speciesCode()

```java
protected final Class<? extends T> speciesCode()
```

Throws NPE if this species is not yet resolved.

## ClassSpecializer.getter(int)

```java
protected MethodHandle getter(int i)
```

Return a {@link MethodHandle} which can get the indexed field of this species.
The return type is the type of the species field it accesses.
The argument type is the {@code fieldHolder} class of this species.

## ClassSpecializer.getterFunction(int)

```java
protected LambdaForm.NamedFunction getterFunction(int i)
```

Return a {@link LambdaForm.Name} containing a {@link LambdaForm.NamedFunction} that
represents a MH bound to a generic invoker, which in turn forwards to the corresponding
getter.

## ClassSpecializer.deriveFieldTypes(K)

```java
protected abstract List<Class<?>> deriveFieldTypes(K key)
```

Given a key, derive the list of field types, which all instances of this
species must store.

## ClassSpecializer.deriveTransformHelper(MemberName, int)

```java
protected abstract MethodHandle deriveTransformHelper(MemberName transform, int whichtm)
```

Given the index of a method in the transforms list, supply a factory
method that takes the arguments of the transform, plus the local fields,
and produce a value of the required type.
You can override this to return null or throw if there are no transforms.
This method exists so that the transforms can be "grown" lazily.
This is necessary if the transform *adds* a field to an instance,
which sometimes requires the creation, on the fly, of an extended species.
This method is only called once for any particular parameter.
The species caches the result in a private array.

@param transform the transform being implemented
@param whichtm the index of that transform in the original list of transforms
@return the method handle which creates a new result from a mix of transform
arguments and field values

## ClassSpecializer.deriveTransformHelperArguments(MemberName, int, List<X>, List<X>)

```java
protected abstract <X> List<X> deriveTransformHelperArguments(MemberName transform, int whichtm, List<X> args, List<X> fields)
```

During code generation, this method is called once per transform to determine
what is the mix of arguments to hand to the transform-helper.  The bytecode
which marshals these arguments is open-coded in the species-specific transform.
The two lists are of opaque objects, which you shouldn't do anything with besides
reordering them into the output list.  (They are both mutable, to make editing
easier.)  The imputed types of the args correspond to the transform's parameter
list, while the imputed types of the fields correspond to the species field types.
After code generation, this method may be called occasionally by error-checking code.

@param transform the transform being implemented
@param whichtm the index of that transform in the original list of transforms
@param args a list of opaque objects representing the incoming transform arguments
@param fields a list of opaque objects representing the field values of the receiver
@param <X> the common element type of the various lists
@return a new list

## ClassSpecializer.deriveClassName()

```java
protected String deriveClassName()
```

Given a key, generate the name of the class which implements the species for that key.
This algorithm must be stable.

@return class name, which by default is {@code outer().topClass().getName() + "$Species_" + deriveTypeString(key)}

## ClassSpecializer.deriveTypeString()

```java
protected String deriveTypeString()
```

Default implementation collects basic type characters,
plus possibly type names, if some types don't correspond
to basic types.

@return a string suitable for use in a class name

## ClassSpecializer.deriveSuperClass()

```java
protected Class<? extends T> deriveSuperClass()
```

Report what immediate super-class to use for the concrete class of this species.
Normally this is {@code topClass}, but if that is an interface, the factory must override.
The super-class must provide a constructor which takes the {@code baseConstructorType} arguments, if any.
This hook also allows the code generator to use more than one canned supertype for species.

@return the super-class of the class to be generated

## ClassSpecializer.chooseFieldName(Class<?>, int)

```java
protected String chooseFieldName(Class<?> type, int index)
```

Field names in concrete species classes adhere to this pattern:
type + index, where type is a single character (L, I, J, F, D).
The factory subclass can customize this.
The name is purely cosmetic, since it applies to a private field.

## ClassSpecializer.makeFactory()

```java
protected Factory makeFactory()
```

Hook that virtualizes the Factory class, allowing subclasses to extend it.