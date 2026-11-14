---
title: "KeyedCollection<TKey,TItem> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/KeyedCollection`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyedCollection<TKey,TItem> class

Namespace: `System.Collections.ObjectModel`

```csharp
public abstract class KeyedCollection<TKey,TItem> : System.Collections.ObjectModel.Collection<TItem>
```

Provides the abstract base class for a collection whose keys are embedded in the values.

Parameters:

- `TKey`: The type of keys in the collection.
- `TItem`: The type of items in the collection.

#### Remarks
The `KeyedCollection<T1,T2>` class provides both O(1) indexed retrieval and keyed retrieval that approaches O(1). It is an abstract type, or more accurately an infinite set of abstract types, because each of its constructed generic types is an abstract base class. To use `KeyedCollection<T1,T2>`, derive your collection type from the appropriate constructed type.

The `KeyedCollection<T1,T2>` class is a hybrid between a collection based on the `IList<T>` generic interface and a collection based on the `IDictionary<T1,T2>` generic interface. Like collections based on the `IList<T>` generic interface, `KeyedCollection<T1,T2>` is an indexed list of items. Like collections based on the `IDictionary<T1,T2>` generic interface, `KeyedCollection<T1,T2>` has a key <example-value> with each element.

Unlike dictionaries, an element of `KeyedCollection<T1,T2>` is not a key/value pair; instead, the entire element is the value and the key is embedded within the value.  For example, an element of a collection derived from `KeyedCollection\<String,String>` (`KeyedCollection(Of String, String)` in Visual Basic) might be "John Doe Jr." where the value is "John Doe Jr." and the key is "Doe"; or a collection of employee records containing integer keys could be derived from `KeyedCollection\<int,Employee>`. The abstract `KeyedCollection<T1,T2>.GetKeyForItem` method extracts the key from the element.

By default, the `KeyedCollection<T1,T2>` includes a lookup dictionary that you can obtain with the `Dictionary` property.  When an item is added to the `KeyedCollection<T1,T2>`, the item's key is extracted once and saved in the lookup dictionary for faster searches. This behavior is overridden by specifying a dictionary creation threshold when you create the `KeyedCollection<T1,T2>`. The lookup dictionary is created the first time the number of elements exceeds that threshold.  If you specify -1 as the threshold, the lookup dictionary is never created.

> **Note:**
> When the internal lookup dictionary is used, it contains references to all the items in the collection if `TItem` is a reference type, or copies of all the items in the collection if `TItem` is a value type. Thus, using the lookup dictionary may not be appropriate if `TItem` is a value type.

You can access an item by its index or key by using the `KeyedCollection<T1,T2>.Item` property. You can add items without a key, but these items can subsequently be accessed only by index.

#### Examples
This section contains two code examples. The first example shows the minimum code required to derive from `KeyedCollection<T1,T2>`, and demonstrates many of the inherited methods. The second example shows how to override the protected methods of `KeyedCollection<T1,T2>` to provide custom behavior.

**Example 1**

This code example shows the minimum code necessary to derive a collection class from `KeyedCollection<T1,T2>`: overriding the `KeyedCollection<T1,T2>.GetKeyForItem` method and providing a public constructor that delegates to a base class constructor. The code example also demonstrates many of the properties and methods inherited from `KeyedCollection<T1,T2>` and `Collection<T>` classes.

The `SimpleOrder` class is a very simple requisition list that contains `OrderItem` objects, each of which represents a line item in the order. The key of `OrderItem` is immutable, an important consideration for classes that derive from `KeyedCollection<T1,T2>`. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source.cs._

**Example 2**

The following code example shows how to override the protected `KeyedCollection<T1,T2>.InsertItem`, `KeyedCollection<T1,T2>.RemoveItem`, `KeyedCollection<T1,T2>.ClearItems`, and `KeyedCollection<T1,T2>.SetItem` methods, to provide custom behavior for the `Collection<T>.Add`, `KeyedCollection<T1,T2>.Remove`, and `Collection<T>.Clear` methods, and for setting the default `Collection<T>.Item` property (the indexer in C#). The custom behavior provided in this example is a notification event named `Changed`, which is raised at the end of each of the overridden methods.

The code example creates the `SimpleOrder` class, which derives from `KeyedCollection<T1,T2>` and represents a simple order form. The order form contains `OrderItem` objects representing items ordered. The code example also creates a `SimpleOrderChangedEventArgs` class to contain the event information, and an enumeration to identify the type of change.

The code example demonstrates the custom behavior by calling the properties and methods of the derived class, in the `Main` method of the `Demo` class.

This code example uses objects with immutable keys. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source1.cs._

## KeyedCollection<TKey,TItem>.KeyedCollection() constructor

```csharp
protected KeyedCollection ();
```

Initializes a new instance of the `KeyedCollection<T1,T2>` class that uses the default equality comparer.

#### Remarks
A `KeyedCollection<T1,T2>` created with this constructor uses the default generic equality comparer for the type of the key, obtained from `EqualityComparer<T>.Default`. To specify a different generic equality comparer, use the `%23ctor` constructor or the `%23ctor` constructor.

By default, the `KeyedCollection<T1,T2>` includes a lookup dictionary that is created when the first item is added. When an item is added to the `KeyedCollection<T1,T2>`, the item's key is extracted once and saved in the lookup dictionary for faster searches. This behavior can be overridden by using the `%23ctor` constructor and specifying a dictionary creation threshold.

> **Note:**
> Because the `KeyedCollection<T1,T2>` class is abstract (`MustInherit` in Visual Basic), you must derive from it in order to use it. In the constructor for your derived type, call the appropriate `KeyedCollection<T1,T2>` constructor. It is not necessary to expose functionality like the equality comparer or the dictionary creation threshold in your constructors.

This constructor is an O(1) operation.

#### Examples
This code example shows the minimum code necessary to derive a collection class from `KeyedCollection<T1,T2>`: overriding the `KeyedCollection<T1,T2>.GetKeyForItem` method and providing a public constructor that delegates to a base class constructor. The code example also demonstrates many of the properties and methods inherited from `KeyedCollection<T1,T2>` and `Collection<T>` classes.

The `SimpleOrder` class is a very simple requisition list that contains `OrderItem` objects, each of which represents a line item in the order. The key of `OrderItem` is immutable, an important consideration for classes that derive from `KeyedCollection<T1,T2>`. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source.cs._

## KeyedCollection<TKey,TItem>.KeyedCollection(IEqualityComparer<TKey>) constructor

```csharp
protected KeyedCollection (System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `KeyedCollection<T1,T2>` class that uses the specified equality comparer.

Parameters:

- `comparer`: The implementation of the `IEqualityComparer<T>` generic interface to use when comparing keys, or `null` to use the default equality comparer for the type of the key, obtained from `EqualityComparer<T>.Default`.

#### Remarks
By default, the `KeyedCollection<T1,T2>` includes a lookup dictionary that is created when the first item is added. When an item is added to the `KeyedCollection<T1,T2>`, the item's key is extracted once and saved in the lookup dictionary for faster searches. This behavior can be overridden by using the `%23ctor` constructor and specifying a dictionary creation threshold.

> **Note:**
> Because the `KeyedCollection<T1,T2>` class is abstract (`MustInherit` in Visual Basic), you must derive from it in order to use it. In the constructor for your derived type, call the appropriate `KeyedCollection<T1,T2>` constructor. It is not necessary to expose functionality like the equality comparer or the dictionary creation threshold in your constructors.

This constructor is an O(1) operation.

## KeyedCollection<TKey,TItem>.KeyedCollection(IEqualityComparer<TKey>, Int32) constructor

```csharp
protected KeyedCollection (System.Collections.Generic.IEqualityComparer<TKey>? comparer, int dictionaryCreationThreshold);
```

Initializes a new instance of the `KeyedCollection<T1,T2>` class that uses the specified equality comparer and creates a lookup dictionary when the specified threshold is exceeded.

Parameters:

- `comparer`: The implementation of the `IEqualityComparer<T>` generic interface to use when comparing keys, or `null` to use the default equality comparer for the type of the key, obtained from `EqualityComparer<T>.Default`.
- `dictionaryCreationThreshold`: The number of elements the collection can hold without creating a lookup dictionary (0 creates the lookup dictionary when the first item is added), or -1 to specify that a lookup dictionary is never created.

Exceptions:

- `ArgumentOutOfRangeException`: `dictionaryCreationThreshold` is less than -1.

#### Remarks
By default, the `KeyedCollection<T1,T2>` includes a lookup dictionary that is created when the first item is added. When an item is added to the `KeyedCollection<T1,T2>`, the item's key is extracted once and saved in the lookup dictionary for faster searches. This constructor allows you to override that behavior. Specify 0 to create the dictionary when the first element is added, 1 to create the dictionary when the second element is added, and so on. If you specify -1 as the threshold, the lookup dictionary is never created.

For very small collections the improvement in retrieval speed provided by the lookup dictionary might not be worth the extra memory required by the dictionary. Setting a threshold allows you to decide when to make that tradeoff.

> **Note:**
> Because the `KeyedCollection<T1,T2>` class is abstract (`MustInherit` in Visual Basic), you must derive from it in order to use it. In the constructor for your derived type, call the appropriate `KeyedCollection<T1,T2>` constructor. It is not necessary to expose functionality like the equality comparer or the dictionary creation threshold in your constructors.

This constructor is an O(1) operation.

#### Examples
The following code example shows how to override the protected `KeyedCollection<T1,T2>.InsertItem`, `KeyedCollection<T1,T2>.RemoveItem`, `KeyedCollection<T1,T2>.ClearItems`, and `KeyedCollection<T1,T2>.SetItem` methods, to provide custom behavior for the `Collection<T>.Add`, `KeyedCollection<T1,T2>.Remove`, and `Collection<T>.Clear` methods, and for setting the default `Collection<T>.Item` property (the indexer in C#). The custom behavior provided in this example is a notification event named `Changed`, which is raised at the end of each of the overridden methods.

The code example uses the `%23ctor` constructor with a threshold of 0, so that the internal dictionary is created the first time an object is added to the collection.

The code example creates the `SimpleOrder` class, which derives from `KeyedCollection<T1,T2>` and represents a simple order form. The order form contains `OrderItem` objects representing items ordered. The code example also creates a `SimpleOrderChangedEventArgs` class to contain the event information, and an enumeration to identify the type of change.

The code example demonstrates the custom behavior by calling the properties and methods of the derived class, in the `Main` method of the `Demo` class.

This code example uses objects with immutable keys. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source1.cs._

## KeyedCollection<TKey,TItem>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> Comparer { get; }
```

Gets the generic equality comparer that is used to determine equality of keys in the collection.

Returns: The implementation of the `IEqualityComparer<T>` generic interface that is used to determine equality of keys in the collection.

#### Remarks
Retrieving the value of this property is an O(1) operation.
