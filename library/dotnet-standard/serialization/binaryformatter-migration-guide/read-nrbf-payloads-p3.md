---
title: "BinaryFormatter migration guide: Read BinaryFormatter (NRBF) payloads (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-migration-guide/read-nrbf-payloads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter migration guide: Read BinaryFormatter (NRBF) payloads (part 3 of 3)

### Safely read NRBF payloads

The NRBF payload consists of serialization records that represent the serialized objects and their metadata. To read the whole payload and get the root object, you need to call the `System.Formats.Nrbf.NrbfDecoder.Decode*` method.

The `System.Formats.Nrbf.NrbfDecoder.Decode*` method returns a `System.Formats.Nrbf.SerializationRecord` instance. `System.Formats.Nrbf.SerializationRecord` is an abstract class that represents the serialization record and provides three self-describing properties: `System.Formats.Nrbf.SerializationRecord.Id`, `System.Formats.Nrbf.SerializationRecord.RecordType`, and `System.Formats.Nrbf.SerializationRecord.TypeName`.

> **Note:**
> An attacker could create a payload with cycles (example: class or an array of objects with a reference to itself). The `System.Formats.Nrbf.SerializationRecord.Id` returns an instance of `System.Formats.Nrbf.SerializationRecordId` which implements `System.IEquatable`1` and amongst other things, it can be used to detect cycles in decoded records.

`System.Formats.Nrbf.SerializationRecord` exposes one method, `System.Formats.Nrbf.SerializationRecord.TypeNameMatches*`, which compares the type name read from the payload (and exposed via `System.Formats.Nrbf.SerializationRecord.TypeName` property) against the specified type. This method ignores assembly names, so users don't need to worry about type forwarding and assembly versioning. It also does not consider member names or their types (because getting this information would require type loading).

```csharp
using System.Formats.Nrbf;

static Animal Pseudocode(Stream payload)
{
    SerializationRecord record = NrbfDecoder.Read(payload);
    if (record.TypeNameMatches(typeof(Cat)) && record is ClassRecord catRecord)
    {
        return new Cat()
        {
            Name = catRecord.GetString("Name"),
            WorshippersCount = catRecord.GetInt32("WorshippersCount")
        };
    }
    else if (record.TypeNameMatches(typeof(Dog)) && record is ClassRecord dogRecord)
    {
        return new Dog()
        {
            Name = dogRecord.GetString("Name"),
            FriendsCount = dogRecord.GetInt32("FriendsCount")
        };
    }
    else
    {
        throw new Exception($"Unexpected record: `{record.TypeName.AssemblyQualifiedName}`.");
    }
}
```

There are more than a dozen different serialization record types. This library provides a set of abstractions, so you only need to learn a few of them:

- `System.Formats.Nrbf.PrimitiveTypeRecord`1`: describes all primitive types natively supported by the NRBF (`string`, `bool`, `byte`, `sbyte`, `char`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `decimal`, `TimeSpan`, and `DateTime`).
  - Exposes the value via the `Value` property.
  - `System.Formats.Nrbf.PrimitiveTypeRecord`1` derives from the non-generic `System.Formats.Nrbf.PrimitiveTypeRecord`, which also exposes a `System.Formats.Nrbf.PrimitiveTypeRecord.Value` property. But on the base class, the value is returned as `object` (which introduces boxing for value types).
- `System.Formats.Nrbf.ClassRecord`: describes all `class` and `struct` besides the aforementioned  primitive types.
- `System.Formats.Nrbf.ArrayRecord`: describes all array records, including jagged and multi-dimensional arrays.
- `System.Formats.Nrbf.SZArrayRecord`1`: describes single-dimensional, zero-indexed array records, where `T` can be either a primitive type or a `System.Formats.Nrbf.SerializationRecord`.

```csharp
SerializationRecord rootObject = NrbfDecoder.Decode(payload); // payload is a Stream

if (rootObject is PrimitiveTypeRecord primitiveRecord)
{
    Console.WriteLine($"It was a primitive value: '{primitiveRecord.Value}'");
}
else if (rootObject is ClassRecord classRecord)
{
    Console.WriteLine($"It was a class record of '{classRecord.TypeName.AssemblyQualifiedName}' type name.");
}
else if (rootObject is SZArrayRecord<byte> arrayOfBytes)
{
    Console.WriteLine($"It was an array of `{arrayOfBytes.Length}`-many bytes.");
}
```

Beside `System.Formats.Nrbf.NrbfDecoder.Decode*`, the [NrbfDecoder] exposes a `System.Formats.Nrbf.NrbfDecoder.DecodeClassRecord*` method that returns `System.Formats.Nrbf.ClassRecord` (or throws).

#### ClassRecord

The most important type that derives from `System.Formats.Nrbf.SerializationRecord` is `System.Formats.Nrbf.ClassRecord`, which represents **all `class` and `struct` instances beside arrays and natively supported primitive types**. It allows you to read all member names and values. To understand what *member* is, see the BinaryFormatter functionality reference.

The API it provides:

- `System.Formats.Nrbf.ClassRecord.MemberNames` property that gets the names of serialized members.
- `System.Formats.Nrbf.ClassRecord.HasMember*` method that checks if member of given name was present in the payload. It was designed for handling versioning scenarios where given member could have been renamed.
- A set of dedicated methods for retrieving primitive values of the provided member name: `System.Formats.Nrbf.ClassRecord.GetString*`, `System.Formats.Nrbf.ClassRecord.GetBoolean*`, `System.Formats.Nrbf.ClassRecord.GetByte*`, `System.Formats.Nrbf.ClassRecord.GetSByte*`, `System.Formats.Nrbf.ClassRecord.GetChar*`, `System.Formats.Nrbf.ClassRecord.GetInt16*`, `System.Formats.Nrbf.ClassRecord.GetUInt16*`, `System.Formats.Nrbf.ClassRecord.GetInt32*`, `System.Formats.Nrbf.ClassRecord.GetUInt32*`, `System.Formats.Nrbf.ClassRecord.GetInt64*`, `System.Formats.Nrbf.ClassRecord.GetUInt64*`, `System.Formats.Nrbf.ClassRecord.GetSingle*`, `System.Formats.Nrbf.ClassRecord.GetDouble*`, `System.Formats.Nrbf.ClassRecord.GetDecimal*`, `System.Formats.Nrbf.ClassRecord.GetTimeSpan*`, and `System.Formats.Nrbf.ClassRecord.GetDateTime*`.
- `System.Formats.Nrbf.ClassRecord.GetClassRecord*` retrieves an instance of [ClassRecord]. In case of a cycle, it's the same instance of the current [ClassRecord] with the same `System.Formats.Nrbf.SerializationRecord.Id`.
- `System.Formats.Nrbf.ClassRecord.GetArrayRecord*` retrieves an instance of [ArrayRecord].
- `System.Formats.Nrbf.ClassRecord.GetSerializationRecord*` to retrieve any serialization record and `System.Formats.Nrbf.ClassRecord.GetRawValue*` to retrieve any serialization record or a raw primitive value.

The following code snippet shows `System.Formats.Nrbf.ClassRecord` in action:

```csharp
[Serializable]
public class Sample
{
    public int Integer;
    public string? Text;
    public byte[]? ArrayOfBytes;
    public Sample? ClassInstance;
}

ClassRecord rootRecord = NrbfDecoder.DecodeClassRecord(payload);
Sample output = new()
{
    // using the dedicated methods to read primitive values
    Integer = rootRecord.GetInt32(nameof(Sample.Integer)),
    Text = rootRecord.GetString(nameof(Sample.Text)),
    // using dedicated method to read an array of bytes
    ArrayOfBytes = ((SZArrayRecord<byte>)rootRecord.GetArrayRecord(nameof(Sample.ArrayOfBytes))).GetArray(),
};

// using GetClassRecord to read a class record
ClassRecord? referenced = rootRecord.GetClassRecord(nameof(Sample.ClassInstance));
if (referenced is not null)
{
    if (referenced.Id.Equals(rootRecord.Id))
    {
        throw new Exception("Unexpected cycle detected!");
    }

    output.ClassInstance = new()
    {
        Text = referenced.GetString(nameof(Sample.Text))
    };
}
```

#### ArrayRecord

`System.Formats.Nrbf.ArrayRecord` defines the core behavior for NRBF array records and provides a base for derived classes. It provides two properties:

- `System.Formats.Nrbf.ArrayRecord.Rank`, which gets the rank of the array.
- `System.Formats.Nrbf.ArrayRecord.Lengths`, which gets a buffer of integers that represent the number of elements in every dimension. It's recommended to **check the total length of the provided array record** before calling `System.Formats.Nrbf.ArrayRecord.GetArray*`.

It also provides one method: `System.Formats.Nrbf.ArrayRecord.GetArray*`. When used for the first time, it allocates an array and fills it with the data provided in the serialized records (in case of the natively supported primitive types like `string` or `int`) or the serialized records themselves (in case of arrays of complex types).

`System.Formats.Nrbf.ArrayRecord.GetArray*` requires a mandatory argument that specifies the type of the expected array. For example, if the record should be a 2D array of integers, the `expectedArrayType` must be provided as `typeof(int[,])` and the returned array is also `int[,]`:

```csharp
ArrayRecord arrayRecord = (ArrayRecord)NrbfDecoder.Decode(stream);
if (arrayRecord.Rank != 2 || arrayRecord.Lengths[0] * arrayRecord.Lengths[1] > 10_000)
{
    throw new Exception("The array had unexpected rank or length!");
}
int[,] array2d = (int[,])arrayRecord.GetArray(typeof(int[,]));
```

If there is a type mismatch (example: the attacker has provided a payload with an array of two billion strings), the method throws `System.InvalidOperationException`.

> **Caution:**
> Unfortunately, the NRBF format makes it easy for an attacker to compress a large number of null array items. That's why it's recommended to always check the total length of the array before calling `System.Formats.Nrbf.ArrayRecord.GetArray*`. Moreover, `System.Formats.Nrbf.ArrayRecord.GetArray*` accepts an optional `allowNulls` Boolean argument, which, when set to `false`, will throw for nulls.

[NrbfDecoder] does not load or instantiate any custom types, so in case of arrays of complex types, it returns an array of `System.Formats.Nrbf.SerializationRecord`.

```csharp
[Serializable]
public class ComplexType3D
{
    public int I, J, K;
}

ArrayRecord arrayRecord = (ArrayRecord)NrbfDecoder.Decode(payload);
if (arrayRecord.Rank != 1 || arrayRecord.Lengths[0] > 10_000)
{
    throw new Exception("The array had unexpected rank or length!");
}

SerializationRecord[] records = (SerializationRecord[])arrayRecord.GetArray(expectedArrayType: typeof(ComplexType3D[]), allowNulls: false);
ComplexType3D[] output = records.OfType<ClassRecord>().Select(classRecord => new ComplexType3D()
{
    I = classRecord.GetInt32(nameof(ComplexType3D.I)),
    J = classRecord.GetInt32(nameof(ComplexType3D.J)),
    K = classRecord.GetInt32(nameof(ComplexType3D.K)),
}).ToArray();
```

.NET Framework supported non-zero indexed arrays within NRBF payloads, but this support was never ported to .NET (Core). [NrbfDecoder] therefore does not support decoding non-zero indexed arrays.

#### SZArrayRecord

`SZArrayRecord<T>` defines the core behavior for NRBF single dimensional, zero-indexed array records and provides a base for derived classes. The `T` can be one of the natively supported primitive types or `System.Formats.Nrbf.SerializationRecord`.

It provides a `System.Formats.Nrbf.SZArrayRecord`1.Length` property and a `System.Formats.Nrbf.SZArrayRecord`1.GetArray*` overload that returns `T[]`.

```csharp
[Serializable]
public class PrimitiveArrayFields
{
    public byte[]? Bytes;
    public uint[]? UnsignedIntegers;
}

ClassRecord rootRecord = NrbfDecoder.DecodeClassRecord(payload);
SZArrayRecord<byte> bytes = (SZArrayRecord<byte>)rootRecord.GetArrayRecord(nameof(PrimitiveArrayFields.Bytes));
SZArrayRecord<uint> uints = (SZArrayRecord<uint>)rootRecord.GetArrayRecord(nameof(PrimitiveArrayFields.UnsignedIntegers));
if (bytes.Length > 100_000 || uints.Length > 100_000)
{
    throw new Exception("The array exceeded our limit");
}

PrimitiveArrayFields output = new()
{
    Bytes = bytes.GetArray(),
    UnsignedIntegers = uints.GetArray()
};
```
