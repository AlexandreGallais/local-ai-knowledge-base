---
title: "Supported types in System.Text.Json (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/supported-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Supported types in System.Text.Json

This article gives an overview of which types are supported for serialization and deserialization.

## Types that serialize as JSON objects

The following types serialize as JSON objects:

* Classes*
* Structs
* Interfaces
* Records and struct records

\* Non-dictionary types that implement `System.Collections.Generic.IEnumerable`1` serialize as JSON arrays. Dictionary types, which do implement `System.Collections.Generic.IEnumerable`1`, serialize as JSON objects.

The following code snippet shows the serialization of a simple struct.

```csharp
public static void Main()
{
    var coordinates = new Coords(1.0, 2.0);
    string json = JsonSerializer.Serialize(coordinates);
    Console.WriteLine(json);

    // Output:
    // {"X":1,"Y":2}
}

public readonly struct Coords
{
    public Coords(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { get; }
    public double Y { get; }
}
```
