---
title: "What's New in EF Core 7.0 (part 2 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 2 of 16)

## JSON Columns

Most relational databases support columns that contain JSON documents. The JSON in these columns can be drilled into with queries. This allows, for example, filtering and sorting by the elements of the documents, as well as the projection of elements out of the documents into results. JSON columns allow relational databases to take on some of the characteristics of document databases, creating a useful hybrid between the two.

EF7 contains provider-agnostic support for JSON columns, with an implementation for SQL Server. This support allows the mapping of aggregates built from .NET types to JSON documents. Normal LINQ queries can be used on the aggregates, and these will be translated to the appropriate query constructs needed to drill into the JSON. EF7 also supports updating and saving changes to JSON documents.

> **Note:**
> SQLite support for JSON is planned for post EF7. The PostgreSQL and Pomelo MySQL providers already contain some support for JSON columns. We will be working with the authors of those providers to align JSON support across all providers.

### Mapping to JSON columns

In EF Core, aggregate types are defined using `OwnsOne` and `OwnsMany`. For example, consider the aggregate type from our sample model used to store contact information:

```csharp
public class ContactDetails
{
    public Address Address { get; set; } = null!;
    public string? Phone { get; set; }
}

public class Address
{
    public Address(string street, string city, string postcode, string country)
    {
        Street = street;
        City = city;
        Postcode = postcode;
        Country = country;
    }

    public string Street { get; set; }
    public string City { get; set; }
    public string Postcode { get; set; }
    public string Country { get; set; }
}
```

This can then be used in an "owner" entity type, for example, to store the contact details of an author:

```csharp
public class Author
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ContactDetails Contact { get; set; }
}
```

The aggregate type is configured  in `OnModelCreating` using `OwnsOne`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Author>().OwnsOne(
        author => author.Contact, ownedNavigationBuilder =>
        {
            ownedNavigationBuilder.OwnsOne(contactDetails => contactDetails.Address);
        });
}
```

> **Tip:**
> The code shown here comes from JsonColumnsSample.cs.

By default, relational database providers map aggregate types like this to the same table as the owning entity type. That is, each property of the `ContactDetails` and `Address` classes is mapped to a column in the `Authors` table.

Some saved authors with contact details will look like this:

**Authors**

| Id  | Name             | Contact\_Address\_Street | Contact\_Address\_City | Contact\_Address\_Postcode | Contact\_Address\_Country | Contact\_Phone |
|:----|:-----------------|:-------------------------|:-----------------------|:---------------------------|:--------------------------|:---------------|
| 1   | Maddy Montaquila | 1 Main St                | Camberwick Green       | CW1 5ZH                    | UK                        | 01632 12345    |
| 2   | Jeremy Likness   | 2 Main St                | Chigley                | CW1 5ZH                    | UK                        | 01632 12346    |
| 3   | Daniel Roth      | 3 Main St                | Camberwick Green       | CW1 5ZH                    | UK                        | 01632 12347    |
| 4   | Arthur Vickers   | 15a Main St              | Chigley                | CW1 5ZH                    | United Kingdom            | 01632 22345    |
| 5   | Brice Lambson    | 4 Main St                | Chigley                | CW1 5ZH                    | UK                        | 01632 12349    |

If desired, each entity type making up the aggregate can be mapped to its own table instead:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Author>().OwnsOne(
        author => author.Contact, ownedNavigationBuilder =>
        {
            ownedNavigationBuilder.ToTable("Contacts");
            ownedNavigationBuilder.OwnsOne(
                contactDetails => contactDetails.Address, ownedOwnedNavigationBuilder =>
                {
                    ownedOwnedNavigationBuilder.ToTable("Addresses");
                });
        });
}
```

The same data is then stored across three tables:

**Authors**

| Id  | Name             |
|:----|:-----------------|
| 1   | Maddy Montaquila |
| 2   | Jeremy Likness   |
| 3   | Daniel Roth      |
| 4   | Arthur Vickers   |
| 5   | Brice Lambson    |

**Contacts**

| AuthorId | Phone       |
|:---------|:------------|
| 1        | 01632 12345 |
| 2        | 01632 12346 |
| 3        | 01632 12347 |
| 4        | 01632 22345 |
| 5        | 01632 12349 |

**Addresses**

| ContactDetailsAuthorId | Street      | City             | Postcode | Country        |
|:-----------------------|:------------|:-----------------|:---------|:---------------|
| 1                      | 1 Main St   | Camberwick Green | CW1 5ZH  | UK             |
| 2                      | 2 Main St   | Chigley          | CW1 5ZH  | UK             |
| 3                      | 3 Main St   | Camberwick Green | CW1 5ZH  | UK             |
| 4                      | 15a Main St | Chigley          | CW1 5ZH  | United Kingdom |
| 5                      | 4 Main St   | Chigley          | CW1 5ZH  | UK             |

Now, for the interesting part. In EF7, the `ContactDetails` aggregate type can be mapped to a JSON column. This requires just one call to `ToJson()` when configuring the aggregate type:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Author>().OwnsOne(
        author => author.Contact, ownedNavigationBuilder =>
        {
            ownedNavigationBuilder.ToJson();
            ownedNavigationBuilder.OwnsOne(contactDetails => contactDetails.Address);
        });
}
```

The `Authors` table will now contain a JSON column for `ContactDetails` populated with a JSON document for each author:

**Authors**

| Id  | Name             | Contact                                                                                                                                                                                                                                                                                             |
|:----|:-----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1   | Maddy Montaquila | {  "Phone":"01632 12345",  "Address": {    "City":"Camberwick Green",    "Country":"UK",    "Postcode":"CW1 5ZH",    "Street":"1 Main St"  }} |
| 2   | Jeremy Likness   | {  "Phone":"01632 12346",  "Address": {    "City":"Chigley",    "Country":"UK",    "Postcode":"CH1 5ZH",    "Street":"2 Main St"  }}          |
| 3   | Daniel Roth      | {  "Phone":"01632 12347",  "Address": {    "City":"Camberwick Green",    "Country":"UK",    "Postcode":"CW1 5ZH",    "Street":"3 Main St"  }} |
| 4   | Arthur Vickers   | {  "Phone":"01632 12348",  "Address": {    "City":"Chigley",    "Country":"UK",    "Postcode":"CH1 5ZH",    "Street":"15a Main St"  }}        |
| 5   | Brice Lambson    | {  "Phone":"01632 12349",  "Address": {    "City":"Chigley",    "Country":"UK",    "Postcode":"CH1 5ZH",    "Street":"4 Main St"  }}          |

> **Tip:**
> This use of aggregates is very similar to the way JSON documents are mapped when using the EF Core provider for Azure Cosmos DB. JSON columns bring the capabilities of using EF Core against document databases to documents embedded in a relational database.

The JSON documents shown above are very simple, but this mapping capability can also be used with more complex document structures. For example, consider another aggregate type from our sample model, used to represent metadata about a post:

```csharp
public class PostMetadata
{
    public PostMetadata(int views)
    {
        Views = views;
    }

    public int Views { get; set; }
    public List<SearchTerm> TopSearches { get; } = new();
    public List<Visits> TopGeographies { get; } = new();
    public List<PostUpdate> Updates { get; } = new();
}

public class SearchTerm
{
    public SearchTerm(string term, int count)
    {
        Term = term;
        Count = count;
    }

    public string Term { get; private set; }
    public int Count { get; private set; }
}

public class Visits
{
    public Visits(double latitude, double longitude, int count)
    {
        Latitude = latitude;
        Longitude = longitude;
        Count = count;
    }

    public double Latitude { get; private set; }
    public double Longitude { get; private set; }
    public int Count { get; private set; }
    public List<string>? Browsers { get; set; }
}

public class PostUpdate
{
    public PostUpdate(IPAddress postedFrom, DateTime updatedOn)
    {
        PostedFrom = postedFrom;
        UpdatedOn = updatedOn;
    }

    public IPAddress PostedFrom { get; private set; }
    public string? UpdatedBy { get; init; }
    public DateTime UpdatedOn { get; private set; }
    public List<Commit> Commits { get; } = new();
}

public class Commit
{
    public Commit(DateTime committedOn, string comment)
    {
        CommittedOn = committedOn;
        Comment = comment;
    }

    public DateTime CommittedOn { get; private set; }
    public string Comment { get; set; }
}
```

This aggregate type contains several nested types and collections. Calls to `OwnsOne` and `OwnsMany` are used to map this aggregate type:

```csharp
modelBuilder.Entity<Post>().OwnsOne(
    post => post.Metadata, ownedNavigationBuilder =>
    {
        ownedNavigationBuilder.ToJson();
        ownedNavigationBuilder.OwnsMany(metadata => metadata.TopSearches);
        ownedNavigationBuilder.OwnsMany(metadata => metadata.TopGeographies);
        ownedNavigationBuilder.OwnsMany(
            metadata => metadata.Updates,
            ownedOwnedNavigationBuilder => ownedOwnedNavigationBuilder.OwnsMany(update => update.Commits));
    });
```

> **Tip:**
> `ToJson` is only needed on the aggregate root to map the entire aggregate to a JSON document.

With this mapping, EF7 can create and query into a complex JSON document like this:

```json
{
  "Views": 5085,
  "TopGeographies": [
    {
      "Browsers": "Firefox, Netscape",
      "Count": 924,
      "Latitude": 110.793,
      "Longitude": 39.2431
    },
    {
      "Browsers": "Firefox, Netscape",
      "Count": 885,
      "Latitude": 133.793,
      "Longitude": 45.2431
    }
  ],
  "TopSearches": [
    {
      "Count": 9359,
      "Term": "Search #1"
    }
  ],
  "Updates": [
    {
      "PostedFrom": "127.0.0.1",
      "UpdatedBy": "Admin",
      "UpdatedOn": "1996-02-17T19:24:29.5429092Z",
      "Commits": []
    },
    {
      "PostedFrom": "127.0.0.1",
      "UpdatedBy": "Admin",
      "UpdatedOn": "2019-11-24T19:24:29.5429093Z",
      "Commits": [
        {
          "Comment": "Commit #1",
          "CommittedOn": "2022-08-21T00:00:00+01:00"
        }
      ]
    },
    {
      "PostedFrom": "127.0.0.1",
      "UpdatedBy": "Admin",
      "UpdatedOn": "1997-05-28T19:24:29.5429097Z",
      "Commits": [
        {
          "Comment": "Commit #1",
          "CommittedOn": "2022-08-21T00:00:00+01:00"
        },
        {
          "Comment": "Commit #2",
          "CommittedOn": "2022-08-21T00:00:00+01:00"
        }
      ]
    }
  ]
}
```

> **Note:**
> Mapping spatial types directly to JSON is not yet supported. The document above uses `double` values as a workaround. Vote for Support spatial types in JSON columns if this is something you are interested in.

> **Note:**
> Mapping collections of primitive types to JSON is not yet supported. The document above uses a value converter to transform the collection into a comma-separated string. Vote for Json: add support for collection of primitive types if this is something you are interested in.

> **Note:**
> Mapping of owned types to JSON is not yet supported in conjunction with TPT or TPC inheritance. Vote for Support JSON properties with TPT/TPC inheritance mapping if this is something you are interested in.
