---
title: "SortDescription struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/SortDescription.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortDescription struct

Namespace: `System.ComponentModel`

```csharp
public struct SortDescription
```

Defines the direction and the property name to be used as the criteria for sorting a collection.

To be added.

## SortDescription.SortDescription(String, ListSortDirection) constructor

```csharp
public SortDescription (string propertyName, System.ComponentModel.ListSortDirection direction);
```

Initializes a new instance of the `SortDescription` structure.

Parameters:

- `propertyName`: The name of the property to sort the list by. If the collection contains strings or value types, set this parameter to the empty string (`""`).
- `direction`: The sort order.

Exceptions:

- `InvalidEnumArgumentException`: The `direction` parameter does not specify a valid value.

To be added.

## SortDescription.Direction property

```csharp
public System.ComponentModel.ListSortDirection Direction { get; set; }
```

Gets or sets a value that indicates whether to sort in ascending or descending order.

Returns: A `ListSortDirection` value to indicate whether to sort in ascending or descending order.

To be added.

## SortDescription.IsSealed property

```csharp
public bool IsSealed { get; }
```

Gets a value that indicates whether this object is in an immutable state.

Returns: `true` if this object is in use; otherwise, `false`.

To be added.

## SortDescription.PropertyName property

```csharp
public string PropertyName { get; set; }
```

Gets or sets the property name being used as the sorting criteria.

Returns: The default value is null.

#### Remarks
This property should be a public property of the items in the underlying collection.

The string is interpreted by the particular `ICollectionView` object involved in the sorting. `BindingListCollectionView` only supports simple column names. `ListCollectionView` supports general property paths and `XPath` for XML data. Therefore, when the view is a `ListCollectionView` object, you can sort XML nodes in an `XmlDataProvider` based on an attribute of those nodes. For example, if the attribute name is `Cost`, you would specify "@Cost" for the `SortDescription.PropertyName` in the `SortDescription`.

## SortDescription.Equals(Object) method

```csharp
public override bool Equals (object obj);
```

Compares the specified instance and the current instance of `SortDescription` for value equality.

Parameters:

- `obj`: The `SortDescription` instance to compare.

Returns: `true` if `obj` and this instance of `SortDescription` have the same values.

To be added.

## SortDescription.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance of `SortDescription`.

Returns: The hash code for this instance of `SortDescription`.

To be added.

## SortDescription.op_Equality(SortDescription, SortDescription) method

```csharp
public static bool operator == (System.ComponentModel.SortDescription sd1, System.ComponentModel.SortDescription sd2);
```

Compares two `SortDescription` objects for value equality.

Parameters:

- `sd1`: The first instance to compare.
- `sd2`: The second instance to compare.

Returns: `true` if the two objects are equal; otherwise, `false`.

The equivalent method for this operator is `SortDescription.Equals`.

## SortDescription.op_Inequality(SortDescription, SortDescription) method

```csharp
public static bool operator != (System.ComponentModel.SortDescription sd1, System.ComponentModel.SortDescription sd2);
```

Compares two `SortDescription` objects for value inequality.

Parameters:

- `sd1`: The first instance to compare.
- `sd2`: The second instance to compare.

Returns: `true` if the values are not equal; otherwise, `false`.

The equivalent method for this operator is `SortDescription.Equals`.
