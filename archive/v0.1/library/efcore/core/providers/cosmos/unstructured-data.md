---
title: "Azure Cosmos DB Provider - Working with Unstructured Data - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/cosmos/unstructured-data.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Working with Unstructured Data in EF Core Azure Cosmos DB Provider

EF Core was designed to make it easy to work with data that follows a schema defined in the model. However one of the strengths of Azure Cosmos DB is the flexibility in the shape of the data stored.

## Accessing the raw JSON

> **Note:**
> The `"__jObject"` shadow property was removed in EF Core 11. See Breaking changes in EF Core 11 for details.

In EF Core 10 and earlier, it was possible to access properties not tracked by EF Core through a special property in shadow-state named `"__jObject"` that contained a `JObject` representing the data received from the store and data that will be stored:

```csharp
using (var context = new OrderContext())
{
    await context.Database.EnsureDeletedAsync();
    await context.Database.EnsureCreatedAsync();

    var order = new Order
    {
        Id = 1, ShippingAddress = new StreetAddress { City = "London", Street = "221 B Baker St" }, PartitionKey = "1"
    };

    context.Add(order);

    await context.SaveChangesAsync();
}

using (var context = new OrderContext())
{
    var order = await context.Orders.FirstAsync();
    var orderEntry = context.Entry(order);

    var jsonProperty = orderEntry.Property<JObject>("__jObject");
    jsonProperty.CurrentValue["BillingAddress"] = "Clarence House";

    orderEntry.State = EntityState.Modified;

    await context.SaveChangesAsync();
}

using (var context = new OrderContext())
{
    var order = await context.Orders.FirstAsync();
    var orderEntry = context.Entry(order);
    var jsonProperty = orderEntry.Property<JObject>("__jObject");

    Console.WriteLine($"First order will be billed to: {jsonProperty.CurrentValue["BillingAddress"]}");
}
```

```json
{
    "Id": 1,
    "PartitionKey": "1",
    "TrackingNumber": null,
    "id": "1",
    "Address": {
        "ShipsToCity": "London",
        "ShipsToStreet": "221 B Baker St"
    },
    "_rid": "eLMaAK8TzkIBAAAAAAAAAA==",
    "_self": "dbs/eLMaAA==/colls/eLMaAK8TzkI=/docs/eLMaAK8TzkIBAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-683e-0a12bf8d01d5\"",
    "_attachments": "attachments/",
    "BillingAddress": "Clarence House",
    "_ts": 1568164374
}
```

> **Warning:**
> The `"__jObject"` property was part of the EF Core infrastructure. It exists only in EF Core 10 and earlier, and has been removed starting with EF Core 11.

## Using CosmosClient

To decouple completely from EF Core get the CosmosClient object that is part of the Azure Cosmos DB SDK from `DbContext`:

```csharp
using (var context = new OrderContext())
{
    var cosmosClient = context.Database.GetCosmosClient();
    var database = cosmosClient.GetDatabase("OrdersDB");
    var container = database.GetContainer("Orders");

    var resultSet = container.GetItemQueryIterator<JObject>(new QueryDefinition("select * from o"));
    var order = (await resultSet.ReadNextAsync()).First();

    Console.WriteLine($"First order JSON: {order}");

    order.Remove("TrackingNumber");

    await container.ReplaceItemAsync(order, order["id"].ToString());
}
```

## Missing property values

In the previous example we removed the `"TrackingNumber"` property from the order. Because of how indexing works in Azure Cosmos DB, queries that reference the missing property somewhere else than in the projection could return unexpected results. For example:

```csharp
using (var context = new OrderContext())
{
    var orders = await context.Orders.ToListAsync();
    var sortedOrders = await context.Orders.OrderBy(o => o.TrackingNumber).ToListAsync();

    Console.WriteLine($"Number of orders: {orders.Count}");
    Console.WriteLine($"Number of sorted orders: {sortedOrders.Count}");
}
```

The sorted query actually returns no results. This means that one should take care to always populate properties mapped by EF Core when working with the store directly.

> **Note:**
> This behavior might change in future versions of Azure Cosmos DB. For instance, currently if the indexing policy defines the composite index {Id/? ASC, TrackingNumber/? ASC)}, then a query that has 'ORDER BY c.Id ASC, c.Discriminator ASC' __would__ return items that are missing the `"TrackingNumber"` property.
