---
title: "ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest> struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ValueTuple`8.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest> struct (part 2 of 2)

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item7 field

```csharp
public T7 Item7;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's seventh element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Rest field

```csharp
public TRest Rest;
```

Gets the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's remaining elements.

#### Remarks
The `Rest` field returns a nested value tuple that allows access to the eighth though *n*th elements of the tuple. Depending on the total number of elements in the tuple, the values of the eighth through fourteenth components can be retrieved from the nested value tuple's `Item1` through `Item7` properties. You can then use the `Rest` property of a nested `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to retrieve the value tuple at the next level of nesting.
