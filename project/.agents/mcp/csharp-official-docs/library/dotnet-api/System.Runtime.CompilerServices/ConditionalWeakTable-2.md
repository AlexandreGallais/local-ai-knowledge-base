---
title: "ConditionalWeakTable<TKey,TValue> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConditionalWeakTable`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConditionalWeakTable<TKey,TValue> class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class ConditionalWeakTable<TKey,TValue> : System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> where TKey : class where TValue : class
```

Enables compilers to dynamically attach object fields to managed objects.

Parameters:

- `TKey`: The reference type to which the field is attached.
- `TValue`: The field's type. This must be a reference type.

#### Remarks
The `ConditionalWeakTable<T1,T2>` class enables language compilers to attach arbitrary properties to managed objects at run time. A `ConditionalWeakTable<T1,T2>` object is a dictionary that binds a managed object, which is represented by a key, to its attached property, which is represented by a value. The object's keys are the individual instances of the `TKey` class to which the property is attached, and its values are the property values that are assigned to the corresponding objects.

Keys must be unique; in other words, the `ConditionalWeakTable<T1,T2>` class supports one attached value per managed object. Two keys are equal if passing them to the `Object.ReferenceEquals` method returns `true`.

> **Note:**
>  You cannot control equality comparisons by overriding `Object.GetHashCode` to explicitly set the hash code for a key. The `ConditionalWeakTable<T1,T2>` class does not use the `Object.GetHashCode` method to compute hash codes, and therefore does not invoke `Object.GetHashCode` overrides.

Although the `ConditionalWeakTable<T1,T2>` class holds a collection of key/value pairs, it is best thought of as a table rather than a dictionary object. The `ConditionalWeakTable<T1,T2>` class differs from a dictionary in several ways:

- It does not persist keys. That is, a key is not kept alive only because it is a member of the collection.

- It does not include all the methods (such as `GetEnumerator` or `Contains`) that a dictionary typically has.

- It does not implement the `IDictionary<T1,T2>` interface.

The `ConditionalWeakTable<T1,T2>` class differs from other collection objects in its management of the object lifetime of keys stored in the collection. Ordinarily, when an object is stored in a collection, its lifetime lasts until it is removed (and there are no additional references to the object) or until the collection object itself is destroyed. However, in the `ConditionalWeakTable<T1,T2>` class, adding a key/value pair to the table does not ensure that the key will persist, even if it can be reached directly from a value stored in the table (for example, if the table contains one key, A, with a value V1, and a second key, B, with a value P2 that contains a reference to A). Instead, `ConditionalWeakTable<T1,T2>` automatically removes the key/value entry as soon as no other references to a key exist outside the table. The example provides an illustration.

#### Examples
The following example illustrates that a key <example-value> in the `ConditionalWeakTable<T1,T2>` table does not persist after references to it outside the table are destroyed. The example defines two classes: `ManagedClass`, which represents the key in the table, and `ClassData`, which represents the key's value. The example instantiates three objects of each type. It also instantiates a `WeakReference` object that represents the second `ManagedClass`, and then destroys the second `ManagedClass` instance. The attempt to retrieve the second `ManagedClass` object from the `Target` property indicates that no references to the object remain.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/ConditionalWeakTableTKey,TValue/Overview/example1.cs._

## ConditionalWeakTable<TKey,TValue>.ConditionalWeakTable() constructor

```csharp
public ConditionalWeakTable ();
```

Initializes a new instance of the `ConditionalWeakTable<T1,T2>` class.

#### Remarks
The `ConditionalWeakTable<T1,T2>.%23ctor` constructor instantiates an empty `ConditionalWeakTable<T1,T2>` table; that is, the table contains no key/value pairs. You can add key/value pairs by calling the `ConditionalWeakTable<T1,T2>.Add`, `ConditionalWeakTable<T1,T2>.GetValue`, or `ConditionalWeakTable<T1,T2>.GetOrCreateValue` method.

Every key in a `ConditionalWeakTable<T1,T2>` object must be unique. Keys are not unique if they refer to the same object (that is, if passing them as arguments to the `Object.ReferenceEquals` method returns `true`).

## ConditionalWeakTable<TKey,TValue>.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds a key to the table.

Parameters:

- `key`: The key to add. `key` represents the object to which the property is attached.
- `value`: The key's property value.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` already exists.

#### Remarks
Every key in a `ConditionalWeakTable<T1,T2>` object must be unique. Keys are not unique if they refer to the same object (that is, if passing them as arguments to the `Object.ReferenceEquals` method returns `true`).

If the key is garbage-collected during the addition operation, the existing key/value pair is removed and the new key/value pair is added without an exception being thrown.

#### Examples
The following example defines a `MainClass` class and a `MainInfo` class, which provides information about the `MainClass` instance. The example then calls the `ConditionalWeakTable<T1,T2>.Add` method to add a `MainClass` object and its attached `MainInfo` object to a `ConditionalWeakTable<T1,T2>` table. The example also illustrates calls to the `ConditionalWeakTable<T1,T2>.GetOrCreateValue` and `ConditionalWeakTable<T1,T2>.GetValue` methods to add key/value pairs to the table, and to the `ConditionalWeakTable<T1,T2>.TryGetValue` method to retrieve the value of an existing key.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/ConditionalWeakTableTKey,TValue+CreateValueCallback/Overview/getvalue1.cs._

## ConditionalWeakTable<TKey,TValue>.AddOrUpdate(TKey, TValue) method

```csharp
public void AddOrUpdate (TKey key, TValue value);
```

Adds the key and value if the key doesn't exist, or updates the existing key's value if it does exist.

Parameters:

- `key`: The key to add or update. May not be `null`.
- `value`: The value to associate with `key`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConditionalWeakTable<TKey,TValue>.Clear() method

```csharp
public void Clear ();
```

Clears all the key/value pairs.

To be added.

## ConditionalWeakTable<TKey,TValue>.GetOrAdd(TKey, Func<TKey,TValue>) method

```csharp
public TValue GetOrAdd (TKey key, Func<TKey,TValue> valueFactory);
```

Searches for a specified key in the table and returns the corresponding value. If the key does not exist in the table, the method invokes the supplied factory to create a value that is bound to the specified key.

Parameters:

- `key`: The key of the value to find. It cannot be `null`.
- `valueFactory`: The callback that creates a value for key, if one does not exist already. It cannot be `null`.

Returns: The value bound to `TKey` in the current `ConditionalWeakTable<T1,T2>` instance, after the method completes.

Exceptions:

- `ArgumentNullException`: `key` or `valueFactory` is `null`.

If multiple threads try to initialize the same key, the table may invoke `valueFactory` multiple times with the same key. Exactly one of these calls will succeed and the returned value of that call will be the one added to the table and returned by all the racing `ConditionalWeakTable<T1,T2>.GetOrAdd` calls. This rule permits the table to invoke `valueFactory` outside the internal table lock, to prevent deadlocks.

## ConditionalWeakTable<TKey,TValue>.GetOrAdd(TKey, TValue) method

```csharp
public TValue GetOrAdd (TKey key, TValue value);
```

Searches for a specified key in the table and returns the corresponding value. If the key does not exist in the table, the method adds the given value and binds it to the specified key.

Parameters:

- `key`: The key of the value to find. It cannot be `null`.
- `value`: The value to add and bind to `TKey`, if one does not exist already.

Returns: The value bound to `TKey` in the current `ConditionalWeakTable<T1,T2>` instance, after the method completes.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConditionalWeakTable<TKey,TValue>.GetOrAdd<TArg>(TKey, Func<TKey,TArg,TValue>, TArg) method

```csharp
public TValue GetOrAdd<TArg> (TKey key, Func<TKey,TArg,TValue> valueFactory, TArg factoryArgument) where TArg : allows ref struct;
```

Searches for a specified key in the table and returns the corresponding value. If the key does not exist in the table, the method invokes the supplied factory to create a value that is bound to the specified key.

Parameters:

- `TArg`: The type of the additional argument to use with the value factory.
- `key`: The key of the value to find. It cannot be `null`.
- `valueFactory`: The callback that creates a value for key, if one does not exist already. It cannot be `null`.
- `factoryArgument`: The additional argument to supply to `valueFactory` upon invocation.

Returns: The value bound to `TKey` in the current `ConditionalWeakTable<T1,T2>` instance, after the method completes.

Exceptions:

- `ArgumentNullException`: `key` or `valueFactory` is `null`.

If multiple threads try to initialize the same key, the table may invoke `valueFactory` multiple times with the same key. Exactly one of these calls will succeed and the returned value of that call will be the one added to the table and returned by all the racing `ConditionalWeakTable<T1,T2>.GetOrAdd<T>` calls. This rule permits the table to invoke `valueFactory` outside the internal table lock, to prevent deadlocks.

## ConditionalWeakTable<TKey,TValue>.GetOrCreateValue(TKey) method

```csharp
public TValue GetOrCreateValue (TKey key);
```

Atomically searches for a specified key in the table and returns the corresponding value. If the key does not exist in the table, the method invokes the parameterless constructor of the class that represents the table's value to create a value that is bound to the specified key.

Parameters:

- `key`: The key to search for. `key` represents the object to which the property is attached.

Returns: The value that corresponds to `key`, if `key` already exists in the table; otherwise, a new value created by the parameterless constructor of the class defined by the `TValue` generic type parameter.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `MissingMethodException`: The class that represents the table's value does not define a parameterless constructor.

#### Remarks
If `key` does not exist in the table, the method adds it, along with the object that is instantiated by calling the parameterless constructor of the class defined by the `TValue` generic type parameter. If the `TValue` class has no parameterless constructor, a `MissingMethodException` is thrown.

This is the recommended method of retrieving an existing value or adding a new value to the `ConditionalWeakTable<T1,T2>` table if the class of the table's value defines a parameterless constructor. If it does not define a parameterless constructor, you can instead call the `ConditionalWeakTable<T1,T2>.GetValue` method, which relies on a callback-provided method to instantiate the object representing the table's value

To retrieve the value of an existing key <example-value> adding the key/value pair if the key is not found in the table, call the `ConditionalWeakTable<T1,T2>.TryGetValue` method.

#### Examples
The following example defines a `MainClass` class and a `MainInfo` class, which provides information about the `MainClass` instance. The example calls the `ConditionalWeakTable<T1,T2>.GetOrCreateValue` method to add a `MainClass` object and its attached `MainInfo` object to a `ConditionalWeakTable<T1,T2>` table. The example also illustrates calls to the `ConditionalWeakTable<T1,T2>.Add` and `ConditionalWeakTable<T1,T2>.GetValue` methods to add key/value pairs to the table, and to the `ConditionalWeakTable<T1,T2>.TryGetValue` method to retrieve the value of an existing key.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/ConditionalWeakTableTKey,TValue+CreateValueCallback/Overview/getvalue1.cs._
