---
title: "How to use a JSON DOM in System.Text.Json (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/use-dom.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use a JSON DOM in System.Text.Json (part 3 of 4)

### Manipulate property order

`System.Text.Json.Nodes.JsonObject` is one of the elements in the payload of a `System.Text.Json.Nodes.JsonNode`, and it represents a mutable JSON object. Even though the type is modelled as an `IDictionary<string, JsonNode>`, where each entry is a property of the object, it encapsulate an implicit property order. However, APIs such as `System.Text.Json.Nodes.JsonObject.Insert(System.Int32,System.String,System.Text.Json.Nodes.JsonNode)` and `System.Text.Json.Nodes.JsonObject.RemoveAt(System.Int32)` effectively model the type as an ordered dictionary by letting you insert and remove items at a specific index. These APIs allow modifications to object instances that can directly influence property order.

The following code shows an example of adding or moving a specific property to the start of the object.

```csharp
﻿using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Schema;

namespace JsonNodePropertyOrder;

public class Program
{
    public static void Main()
    {
        var schema = (JsonObject)JsonSerializerOptions.Default.GetJsonSchemaAsNode(typeof(MyPoco));

        JsonNode? idValue;
        switch (schema.IndexOf("$id"))
        {
            // $id property missing.
            case < 0:
                idValue = (JsonNode)"https://example.com/schema";
                schema.Insert(0, "$id", idValue);
                break;

            // $id property already at the start of the object.
            case 0:
                break;

            // $id exists but not at the start of the object.
            case int index:
                idValue = schema[index];
                schema.RemoveAt(index);
                schema.Insert(0, "$id", idValue);
                break;
        }
    }
}

class MyPoco { }
```
### Compare JsonNodes

To compare two `JsonNode` objects for equality, including their descendant elements, use the `System.Text.Json.Nodes.JsonNode.DeepEquals(System.Text.Json.Nodes.JsonNode,System.Text.Json.Nodes.JsonNode)` method.
