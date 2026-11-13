---
title: "Identity Resolution - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/identity-resolution.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Identity Resolution - EF Core (part 2 of 3)

## Attaching a serialized graph

EF Core works with graphs of entities connected via foreign keys and navigation properties, as described in Changing Foreign Keys and Navigations. If these graphs are created outside of EF Core using, for example, from a JSON file, then they can have multiple instances of the same entity. These duplicates need to be resolved into single instances before the graph can be tracked.

### Graphs with no duplicates

Before going any further it is important to recognize that:

- Serializers often have options for handling loops and duplicate instances in the graph.
- The choice of object used as the graph root can often help reduce or remove duplicates.

If possible, use serialization options and choose roots that do not result in duplicates. For example, the following code uses Json.NET to serialize a list of blogs each with its associated posts:

```csharp
using var context = new BlogsContext();

var blogs = await context.Blogs.Include(e => e.Posts).ToListAsync();

var serialized = JsonConvert.SerializeObject(
    blogs,
    new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore, Formatting = Formatting.Indented });

Console.WriteLine(serialized);
```

The JSON generated from this code is:

```json
[
  {
    "Id": 1,
    "Name": ".NET Blog",
    "Summary": "Posts about .NET",
    "Posts": [
      {
        "Id": 1,
        "Title": "Announcing the Release of EF Core 5.0",
        "Content": "Announcing the release of EF Core 5.0, a full featured cross-platform...",
        "BlogId": 1
      },
      {
        "Id": 2,
        "Title": "Announcing F# 5",
        "Content": "F# 5 is the latest version of F#, the functional programming language...",
        "BlogId": 1
      }
    ]
  },
  {
    "Id": 2,
    "Name": "Visual Studio Blog",
    "Summary": "Posts about Visual Studio",
    "Posts": [
      {
        "Id": 3,
        "Title": "Disassembly improvements for optimized managed debugging",
        "Content": "If you are focused on squeezing out the last bits of performance for your .NET service or...",
        "BlogId": 2
      },
      {
        "Id": 4,
        "Title": "Database Profiling with Visual Studio",
        "Content": "Examine when database queries were executed and measure how long the take using...",
        "BlogId": 2
      }
    ]
  }
]
```

Notice that there are no duplicate blogs or posts in the JSON. This means that simple calls to `Update` will work to update these entities in the database:

```csharp
public static async Task UpdateBlogsFromJson(string json)
{
    using var context = new BlogsContext();

    var blogs = JsonConvert.DeserializeObject<List<Blog>>(json);

    foreach (var blog in blogs)
    {
        context.Update(blog);
    }

    await context.SaveChangesAsync();
}
```

### Handling duplicates

The code in the previous example serialized each blog with its associated posts. If this is changed to serialize each post with its associated blog, then duplicates are introduced into the serialized JSON. For example:

```csharp
using var context = new BlogsContext();

var posts = await context.Posts.Include(e => e.Blog).ToListAsync();

var serialized = JsonConvert.SerializeObject(
    posts,
    new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore, Formatting = Formatting.Indented });

Console.WriteLine(serialized);
```

The serialized JSON now looks like this:

```json
[
  {
    "Id": 1,
    "Title": "Announcing the Release of EF Core 5.0",
    "Content": "Announcing the release of EF Core 5.0, a full featured cross-platform...",
    "BlogId": 1,
    "Blog": {
      "Id": 1,
      "Name": ".NET Blog",
      "Summary": "Posts about .NET",
      "Posts": [
        {
          "Id": 2,
          "Title": "Announcing F# 5",
          "Content": "F# 5 is the latest version of F#, the functional programming language...",
          "BlogId": 1
        }
      ]
    }
  },
  {
    "Id": 2,
    "Title": "Announcing F# 5",
    "Content": "F# 5 is the latest version of F#, the functional programming language...",
    "BlogId": 1,
    "Blog": {
      "Id": 1,
      "Name": ".NET Blog",
      "Summary": "Posts about .NET",
      "Posts": [
        {
          "Id": 1,
          "Title": "Announcing the Release of EF Core 5.0",
          "Content": "Announcing the release of EF Core 5.0, a full featured cross-platform...",
          "BlogId": 1
        }
      ]
    }
  },
  {
    "Id": 3,
    "Title": "Disassembly improvements for optimized managed debugging",
    "Content": "If you are focused on squeezing out the last bits of performance for your .NET service or...",
    "BlogId": 2,
    "Blog": {
      "Id": 2,
      "Name": "Visual Studio Blog",
      "Summary": "Posts about Visual Studio",
      "Posts": [
        {
          "Id": 4,
          "Title": "Database Profiling with Visual Studio",
          "Content": "Examine when database queries were executed and measure how long the take using...",
          "BlogId": 2
        }
      ]
    }
  },
  {
    "Id": 4,
    "Title": "Database Profiling with Visual Studio",
    "Content": "Examine when database queries were executed and measure how long the take using...",
    "BlogId": 2,
    "Blog": {
      "Id": 2,
      "Name": "Visual Studio Blog",
      "Summary": "Posts about Visual Studio",
      "Posts": [
        {
          "Id": 3,
          "Title": "Disassembly improvements for optimized managed debugging",
          "Content": "If you are focused on squeezing out the last bits of performance for your .NET service or...",
          "BlogId": 2
        }
      ]
    }
  }
]
```

Notice that the graph now includes multiple Blog instances with the same key value, as well as multiple Post instances with the same key value. Attempting to track this graph like we did in the previous example will throw:

> System.InvalidOperationException: The instance of entity type 'Post' cannot be tracked because another instance with the key value '{Id: 2}' is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached.

We can fix this in two ways:

- Use JSON serialization options that preserve references
- Perform identity resolution while the graph is being tracked

#### Preserve references

Json.NET provides the `PreserveReferencesHandling` option to handle this. For example:

```csharp
var serialized = JsonConvert.SerializeObject(
    posts,
    new JsonSerializerSettings
    {
        PreserveReferencesHandling = PreserveReferencesHandling.All, Formatting = Formatting.Indented
    });
```

The resulting JSON now looks like this:

```json
{
  "$id": "1",
  "$values": [
    {
      "$id": "2",
      "Id": 1,
      "Title": "Announcing the Release of EF Core 5.0",
      "Content": "Announcing the release of EF Core 5.0, a full featured cross-platform...",
      "BlogId": 1,
      "Blog": {
        "$id": "3",
        "Id": 1,
        "Name": ".NET Blog",
        "Summary": "Posts about .NET",
        "Posts": [
          {
            "$ref": "2"
          },
          {
            "$id": "4",
            "Id": 2,
            "Title": "Announcing F# 5",
            "Content": "F# 5 is the latest version of F#, the functional programming language...",
            "BlogId": 1,
            "Blog": {
              "$ref": "3"
            }
          }
        ]
      }
    },
    {
      "$ref": "4"
    },
    {
      "$id": "5",
      "Id": 3,
      "Title": "Disassembly improvements for optimized managed debugging",
      "Content": "If you are focused on squeezing out the last bits of performance for your .NET service or...",
      "BlogId": 2,
      "Blog": {
        "$id": "6",
        "Id": 2,
        "Name": "Visual Studio Blog",
        "Summary": "Posts about Visual Studio",
        "Posts": [
          {
            "$ref": "5"
          },
          {
            "$id": "7",
            "Id": 4,
            "Title": "Database Profiling with Visual Studio",
            "Content": "Examine when database queries were executed and measure how long the take using...",
            "BlogId": 2,
            "Blog": {
              "$ref": "6"
            }
          }
        ]
      }
    },
    {
      "$ref": "7"
    }
  ]
}
```

Notice that this JSON has replaced duplicates with references like `"$ref": "5"` that refer to the already existing instance in the graph. This graph can again be tracked using the simple calls to `Update`, as shown above.

The `System.Text.Json` support in the .NET base class libraries (BCL) has a similar option which produces the same result. For example:

```csharp
var serialized = JsonSerializer.Serialize(
    posts, new JsonSerializerOptions { ReferenceHandler = ReferenceHandler.Preserve, WriteIndented = true });
```

#### Resolve duplicates

If it is not possible to eliminate duplicates in the serialization process, then `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.TrackGraph*` provides a way to handle this. TrackGraph works like `Add`, `Attach` and `Update` except that it generates a callback for every entity instance before tracking it. This callback can be used to either track the entity or ignore it. For example:

```csharp
public static async Task UpdatePostsFromJsonWithIdentityResolution(string json)
{
    using var context = new BlogsContext();

    var posts = JsonConvert.DeserializeObject<List<Post>>(json);

    foreach (var post in posts)
    {
        context.ChangeTracker.TrackGraph(
            post, node =>
            {
                var keyValue = node.Entry.Property("Id").CurrentValue;
                var entityType = node.Entry.Metadata;

                var existingEntity = node.Entry.Context.ChangeTracker.Entries()
                    .FirstOrDefault(
                        e => Equals(e.Metadata, entityType)
                             && Equals(e.Property("Id").CurrentValue, keyValue));

                if (existingEntity == null)
                {
                    Console.WriteLine($"Tracking {entityType.DisplayName()} entity with key value {keyValue}");

                    node.Entry.State = EntityState.Modified;
                }
                else
                {
                    Console.WriteLine($"Discarding duplicate {entityType.DisplayName()} entity with key value {keyValue}");
                }
            });
    }

    await context.SaveChangesAsync();
}
```

For each entity in the graph, this code will:

- Find the entity type and key value of the entity
- Lookup the entity with this key in the change tracker
  - If the entity is found, then no further action is taken as the entity is a duplicate
  - If the entity is not found, then it is tracked by setting the state to `Modified`

The output from running this code is:

```output
Tracking EntityType: Post entity with key value 1
Tracking EntityType: Blog entity with key value 1
Tracking EntityType: Post entity with key value 2
Discarding duplicate EntityType: Post entity with key value 2
Tracking EntityType: Post entity with key value 3
Tracking EntityType: Blog entity with key value 2
Tracking EntityType: Post entity with key value 4
Discarding duplicate EntityType: Post entity with key value 4
```

> **Important:**
> This code **assumes that all duplicates are identical**. This makes it safe to arbitrarily choose one of the duplicates to track while discarding the others. If the duplicates can differ, then the code will need to decide how to determine which one to use, and how to combine property and navigation values together.

> **Note:**
> For simplicity, this code assumes each entity has a primary key <example-value> called `Id`. This could be codified into an abstract base class or interface. Alternately, the primary key <example-value> or properties could be obtained from the `Microsoft.EntityFrameworkCore.Metadata.IEntityType` metadata such that this code would work with any type of entity.

## Failing to set key <example-value>

Entity types are often configured to use automatically generated key values. This is the default for integer and GUID properties of non-composite keys. However, if the entity type is not configured to use automatically generated key <example-value>, then an explicit key value must be set before tracking the entity. For example, using the following entity type:

```csharp
public class Pet
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }

    public string Name { get; set; }
}
```

Consider code that attempts to track two new entity instances without setting key <example-value>:

```csharp
using var context = new BlogsContext();

context.Add(new Pet { Name = "Smokey" });

try
{
    context.Add(new Pet { Name = "Clippy" }); // This will throw
}
catch (Exception e)
{
    Console.WriteLine($"{e.GetType().FullName}: {e.Message}");
}
```

This code will throw:

> System.InvalidOperationException: The instance of entity type 'Pet' cannot be tracked because another instance with the key value '{Id: 0}' is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached.

The fix for this is to either to set key <example-value> explicitly or configure the key <example-value> to use generated key values. See Generated Values for more information.

## Overusing a single DbContext instance

`Microsoft.EntityFrameworkCore.DbContext` is designed to represent a short-lived unit-of-work, as described in DbContext Initialization and Configuration, and elaborated on in Change Tracking in EF Core. Not following this guidance makes it easy to run into situations where an attempt is made to track multiple instances of the same entity. Common examples are:

- Using the same DbContext instance to both set up test state and then execute the test. This often results in the DbContext still tracking one entity instance from test setup, while then attempting to attach a new instance in the test proper. Instead, use a different DbContext instance for setting up test state and the test code proper.
- Using a shared DbContext instance in a repository or similar code. Instead, make sure your repository uses a single DbContext instance for each unit-of-work.
