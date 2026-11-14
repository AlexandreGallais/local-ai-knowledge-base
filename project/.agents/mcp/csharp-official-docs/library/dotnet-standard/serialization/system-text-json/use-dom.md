---
title: "How to use a JSON DOM in System.Text.Json (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/use-dom.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use a JSON document object model in System.Text.Json

This article shows how to use a JSON document object model (DOM) for random access to data in a JSON payload.

## JSON DOM choices

Working with a DOM is an alternative to deserialization with `System.Text.Json.JsonSerializer` when:

* You don't have a type to deserialize into.
* The JSON you receive doesn't have a fixed schema and must be inspected to know what it contains.

`System.Text.Json` provides two ways to build a JSON DOM:

* `System.Text.Json.JsonDocument` provides the ability to build a read-only DOM by using `Utf8JsonReader`. The JSON elements that compose the payload can be accessed via the `System.Text.Json.JsonElement` type. The `JsonElement` type provides array and object enumerators along with APIs to convert JSON text to common .NET types. `JsonDocument` exposes a `System.Text.Json.JsonDocument.RootElement` property. For more information, see Use JsonDocument later in this article.

* `System.Text.Json.Nodes.JsonNode` and the classes that derive from it in the `System.Text.Json.Nodes` namespace provide the ability to create a mutable DOM. The JSON elements that compose the payload can be accessed via the `System.Text.Json.Nodes.JsonNode`, `System.Text.Json.Nodes.JsonObject`, `System.Text.Json.Nodes.JsonArray`, `System.Text.Json.Nodes.JsonValue`, and `System.Text.Json.JsonElement` types. For more information, see Use `JsonNode` later in this article.

Consider the following factors when choosing between `JsonDocument` and `JsonNode`:

* The `JsonNode` DOM can be changed after it's created. The `JsonDocument` DOM is immutable.
* The `JsonDocument` DOM provides faster access to its data.
