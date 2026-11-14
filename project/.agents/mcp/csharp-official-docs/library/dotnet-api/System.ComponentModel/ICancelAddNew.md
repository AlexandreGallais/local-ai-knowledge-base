---
title: "ICancelAddNew interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ICancelAddNew.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICancelAddNew interface

Namespace: `System.ComponentModel`

```csharp
public interface ICancelAddNew
```

Adds transactional capability when adding a new item to a collection.

#### Remarks
The `ICancelAddNew` interface enables a collection to add a new item in an extensible way. The new item subsequently can be committed or rolled back. The `IBindingList.AddNew` method of the collection is used to tentatively add the item, which is subsequently transacted through the following operations:

- The `ICancelAddNew.EndNew` method will explicitly commit the pending addition.

- Performing another collection operation, such as an insertion, removal, or move will implicitly commit the pending addition.

- The `ICancelAddNew.CancelNew` method will roll back the pending addition if it has not already been committed.

> **Note:**
>  In some scenarios, such as Windows Forms complex data binding, the collection may receive `ICancelAddNew.CancelNew` or `ICancelAddNew.EndNew` calls for items other than the newly added item. (Each item is typically a row in a data view.) Ignore these calls; cancel or commit the new item only when that item's index is specified.

There are two models that allow transactional addition of an item to a data-bound collection:

- The older model relies directly on a collection that implements the `IBindingList` interface and is data-bound directly using the `CurrencyManager` class. The `CurrencyManager.AddNew`, `CurrencyManager.EndCurrentEdit`, and `CurrencyManager.CancelCurrentEdit` methods of the `CurrencyManager` class are responsible for transactional support for adding new items. However, this functionality depends upon the items supporting transactional behavior through the `IEditableObject` interface. If the items do not support this interface, the item will always be added to the list, regardless of subsequent calls to `CurrencyManager.CancelCurrentEdit`.

- The newer model supports a more robust data-binding scenario through the generic `BindingList<T>` class, which implements the `IBindingList` and `ICancelAddNew` interfaces. In this case, the transactional support is managed by the `BindingList<T>` collection directly.

## ICancelAddNew.CancelNew(Int32) method

```csharp
public void CancelNew (int itemIndex);
```

Discards a pending new item from the collection.

Parameters:

- `itemIndex`: The index of the item that was previously added to the collection.

#### Remarks
The `ICancelAddNew.CancelNew` method rolls back a pending addition (`IBindingList.AddNew`) of an item previously added to the collection at position `itemIndex`. The index parameter is necessary because several new items can be simultaneously pending.

## ICancelAddNew.EndNew(Int32) method

```csharp
public void EndNew (int itemIndex);
```

Commits a pending new item to the collection.

Parameters:

- `itemIndex`: The index of the item that was previously added to the collection.

#### Remarks
The `ICancelAddNew.EndNew` commits a pending addition (`IBindingList.AddNew`) of an item previously added to the collection at position `itemIndex`. The index parameter is necessary because several new items can be simultaneously pending.
