---
title: "Modeling - Azure Cosmos DB Provider - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/cosmos/modeling.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Modeling - Azure Cosmos DB Provider - EF Core (part 2 of 2)

## Embedded entities

> **Note:**
> Related entity types are configured as owned by default. To prevent this for a specific entity type call `Microsoft.EntityFrameworkCore.ModelBuilder.Entity*`.

For Azure Cosmos DB, owned entities are embedded in the same item as the owner. To change a property name use ToJsonProperty:

```csharp
modelBuilder.Entity<Order>().OwnsOne(
    o => o.ShippingAddress,
    sa =>
    {
        sa.ToJsonProperty("Address");
        sa.Property(p => p.Street).ToJsonProperty("ShipsToStreet");
        sa.Property(p => p.City).ToJsonProperty("ShipsToCity");
    });
```

With this configuration the order from the example above is stored like this:

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
    "_rid": "6QEKAM+BOOABAAAAAAAAAA==",
    "_self": "dbs/6QEKAA==/colls/6QEKAM+BOOA=/docs/6QEKAM+BOOABAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-683c-692e763901d5\"",
    "_attachments": "attachments/",
    "_ts": 1568163674
}
```

Collections of owned entities are embedded as well. For the next example we'll use the `Distributor` class with a collection of `StreetAddress`:

```csharp
public class Distributor
{
    public int Id { get; set; }
    public string ETag { get; set; }
    public ICollection<StreetAddress> ShippingCenters { get; set; }
}
```

The owned entities don't need to provide explicit key <example-value> to be stored:

```csharp
var distributor = new Distributor
{
    Id = 1,
    ShippingCenters = new HashSet<StreetAddress>
    {
        new StreetAddress { City = "Phoenix", Street = "500 S 48th Street" },
        new StreetAddress { City = "Anaheim", Street = "5650 Dolly Ave" }
    }
};

using (var context = new OrderContext())
{
    context.Add(distributor);

    await context.SaveChangesAsync();
}
```

They will be persisted in this way:

```json
{
    "Id": 1,
    "Discriminator": "Distributor",
    "id": "Distributor|1",
    "ShippingCenters": [
        {
            "City": "Phoenix",
            "Street": "500 S 48th Street"
        },
        {
            "City": "Anaheim",
            "Street": "5650 Dolly Ave"
        }
    ],
    "_rid": "6QEKANzISj0BAAAAAAAAAA==",
    "_self": "dbs/6QEKAA==/colls/6QEKANzISj0=/docs/6QEKANzISj0BAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-683c-7b2b439701d5\"",
    "_attachments": "attachments/",
    "_ts": 1568163705
}
```

Internally EF Core always needs to have unique key <example-value> for all tracked entities. The primary key <example-value> by default for collections of owned types consists of the foreign key <example-value> pointing to the owner and an `int` property corresponding to the index in the JSON array. To retrieve these values entry API could be used:

```csharp
using (var context = new OrderContext())
{
    var firstDistributor = await context.Distributors.FirstAsync();
    Console.WriteLine($"Number of shipping centers: {firstDistributor.ShippingCenters.Count}");

    var addressEntry = context.Entry(firstDistributor.ShippingCenters.First());
    var addressPKProperties = addressEntry.Metadata.FindPrimaryKey().Properties;

    Console.WriteLine(
        $"First shipping center PK: ({addressEntry.Property(addressPKProperties[0].Name).CurrentValue}, {addressEntry.Property(addressPKProperties[1].Name).CurrentValue})");
    Console.WriteLine();
}
```

> **Tip:**
> When necessary the default primary key for the owned entity types can be changed, but then key <example-value> should be provided explicitly.

### Collections of primitive types

Collections of supported primitive types, such as `string` and `int`, are discovered and mapped automatically. Supported collections are all types that implement `System.Collections.Generic.IReadOnlyList`1` or `System.Collections.Generic.IReadOnlyDictionary`2`. For example, consider this entity type:

```csharp
public class Book
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public IList<string> Quotes { get; set; }
    public IDictionary<string, string> Notes { get; set; }
}
```

The `IList` and the `IDictionary` can be populated and persisted to the database:

```csharp
using var context = new BooksContext();

var book = new Book
{
    Title = "How It Works: Incredible History",
    Quotes = new List<string>
    {
        "Thomas (Tommy) Flowers was the British engineer behind the design of the Colossus computer.",
        "Invented originally for Guinness, plastic widgets are nitrogen-filled spheres.",
        "For 20 years after its introduction in 1979, the Walkman dominated the personal stereo market."
    },
    Notes = new Dictionary<string, string>
    {
        { "121", "Fridges" },
        { "144", "Peter Higgs" },
        { "48", "Saint Mark's Basilica" },
        { "36", "The Terracotta Army" }
    }
};

context.Add(book);
await context.SaveChangesAsync();
```

This results in the following JSON document:

```json
{
    "Id": "0b32283e-22a8-4103-bb4f-6052604868bd",
    "Discriminator": "Book",
    "Notes": {
        "36": "The Terracotta Army",
        "48": "Saint Mark's Basilica",
        "121": "Fridges",
        "144": "Peter Higgs"
    },
    "Quotes": [
        "Thomas (Tommy) Flowers was the British engineer behind the design of the Colossus computer.",
        "Invented originally for Guinness, plastic widgets are nitrogen-filled spheres.",
        "For 20 years after its introduction in 1979, the Walkman dominated the personal stereo market."
    ],
    "Title": "How It Works: Incredible History",
    "id": "Book|0b32283e-22a8-4103-bb4f-6052604868bd",
    "_rid": "t-E3AIxaencBAAAAAAAAAA==",
    "_self": "dbs/t-E3AA==/colls/t-E3AIxaenc=/docs/t-E3AIxaencBAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-9b50-fc769dc901d7\"",
    "_attachments": "attachments/",
    "_ts": 1630075016
}
```

These collections can then be updated, again in the normal way:

```csharp
book.Quotes.Add("Pressing the emergency button lowered the rods again.");
book.Notes["48"] = "Chiesa d'Oro";

await context.SaveChangesAsync();
```

Limitations:

* Only dictionaries with string keys are supported.
* Support for querying into primitive collections was added in EF Core 9.0.

## Optimistic concurrency with eTags

To configure an entity type to use optimistic concurrency call `Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.UseETagConcurrency*`. This call will create an `_etag` property in shadow state and set it as the concurrency token.

```csharp
modelBuilder.Entity<Order>()
    .UseETagConcurrency();
```

To make it easier to resolve concurrency errors you can map the eTag to a CLR property using `Microsoft.EntityFrameworkCore.CosmosPropertyBuilderExtensions.IsETagConcurrency*`.

```csharp
modelBuilder.Entity<Distributor>()
    .Property(d => d.ETag)
    .IsETagConcurrency();
```

## Database triggers

> **Note:**
> Database trigger execution support was introduced in EF Core 10.0.

Azure Cosmos DB supports pre- and post-triggers that run before or after database operations. EF Core can be configured to execute these triggers when performing save operations.

> **Important:**
> Triggers are executed server-side by Azure Cosmos DB when EF Core performs operations, but they are not enforced - operations can be performed without running triggers if accessing the database directly. This means triggers should not be used for security-related functionality such as authentication or auditing, as they can be bypassed by applications that access the database directly without using EF Core.

To configure triggers on an entity type, use the `HasTrigger` method:

```csharp
// Configure pre-trigger for create operations
entity.HasTrigger("PreInsertTrigger", TriggerType.Pre, TriggerOperation.Create);

// Configure post-trigger for delete operations
entity.HasTrigger("PostDeleteTrigger", TriggerType.Post, TriggerOperation.Delete);

// Configure trigger for replace operations
entity.HasTrigger("UpdateTrigger", TriggerType.Pre, TriggerOperation.Replace);
```

The `HasTrigger` method requires:

* **modelName**: The name of the trigger in Azure Cosmos DB
* **triggerType**: Either `TriggerType.Pre` (executed before the operation) or `TriggerType.Post` (executed after the operation)
* **triggerOperation**: The operation that should execute the trigger - `Create`, `Replace`, `Delete`, or `All`

Before triggers can be executed, they must be created in Azure Cosmos DB using the Cosmos SDK or Azure portal. The trigger name configured in EF Core must match the trigger name in Azure Cosmos DB.
