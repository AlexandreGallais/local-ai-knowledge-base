---
title: "Reverse Engineering - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/managing-schemas/scaffolding/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Scaffolding (Reverse Engineering)

Reverse engineering is the process of scaffolding entity type classes and a DbContext class based on a database schema. It can be performed using the `Scaffold-DbContext` command of the EF Core Package Manager Console (PMC) tools or the `dotnet ef dbcontext scaffold` command of the .NET Command-line Interface (CLI) tools.

> **Note:**
> The scaffolding of a `DbContext` and entity types documented here is distinct from the scaffolding of controllers in ASP.NET Core using Visual Studio, which is not documented here.

> **Tip:**
> If you use Visual Studio, try out the EF Core Power Tools community extension. These tools provide a graphical tool which builds on top of the EF Core command line tools and offers additional workflow and customization options.

## Prerequisites

- Before scaffolding, you'll need to install either the PMC tools, which work on Visual Studio only, or the .NET CLI tools, which work across all platforms supported by .NET.
- Install the NuGet package for `Microsoft.EntityFrameworkCore.Design` in the project you are scaffolding to.
- Install the NuGet package for the database provider that targets the database schema you want to scaffold from.

## Required arguments

Both the PMC and the .NET CLI commands have two required arguments: the connection string to the database, and the EF Core database provider to use.

### Connection string

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

The first argument to the command is a connection string to the database. The tools use this connection string to read the database schema.

How the connection string is quoted and escaped depends on the shell that is used to run the command. Refer to the shell's documentation. For example, PowerShell requires escaping `$`, but not `\`.

The following example scaffolds entity types and a `DbContext` from the `Chinook` database located on the machine's SQL Server LocalDB instance, making use of the `Microsoft.EntityFrameworkCore.SqlServer` database provider.

#### .NET CLI

```dotnetcli
dotnet ef dbcontext scaffold "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook" Microsoft.EntityFrameworkCore.SqlServer
```

#### Visual Studio PMC

```powershell
Scaffold-DbContext 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook' Microsoft.EntityFrameworkCore.SqlServer
```

***

> **Tip:**
> You can use Configuration to store and retrieve the connection string

#### Connection strings in the scaffolded code

By default, the scaffolder will include the connection string in the scaffolded code, but with a warning. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
    => optionsBuilder.UseSqlServer("Data Source=(LocalDb)\\MSSQLLocalDB;Database=AllTogetherNow");
```

This is done so that the generated code does not crash when first used, which would be a very poor learning experience. However, as the warning says, connection strings should not exist in production code. See _DbContext Lifetime, Configuration, and Initialization_ for the various ways that connection strings can be managed.

> **Tip:**
> The `-NoOnConfiguring` (Visual Studio PMC) or `--no-onconfiguring` (.NET CLI) option can be passed to suppress creation of the `OnConfiguring` method containing the connection string.

### Provider name

The second argument is the provider name. The provider name is typically the same as the provider's NuGet package name. For example, for SQL Server or Azure SQL, use `Microsoft.EntityFrameworkCore.SqlServer`.

## Command line options

The scaffolding process can be controlled by various command line options.

### Specifying tables and views

By default, all tables and views in the database schema are scaffolded into entity types. You can limit which tables and views are scaffolded by specifying schemas and tables.

The `-Schemas` (Visual Studio PMC) or `--schema` (.NET CLI) argument specifies the schemas of tables and views for which entity types will be generated. If this argument is omitted, then all schemas are included. If this option is used, then all tables and views in the schemas will be included in the model, even if they are not explicitly included using `-Tables` or `--table`.

The `-Tables` (Visual Studio PMC) or `--table` (.NET CLI) argument specified the tables and views for which entity types will be generated. Tables or views in a specific schema can be included using the 'schema.table' or 'schema.view' format. If this option is omitted, then all tables and views are included.                                              |

For example, to scaffold only the `Artists` and `Albums` tables:

#### .NET CLI

```dotnetcli
dotnet ef dbcontext scaffold ... --table Artist --table Album
```

#### Visual Studio PMC

```powershell
Scaffold-DbContext ... -Tables Artists, Albums
```

***

To scaffold all tables and views from the `Customer` and `Contractor` schemas:

#### .NET CLI

```dotnetcli
dotnet ef dbcontext scaffold ... --schema Customer --schema Contractor
```

#### Visual Studio PMC

```powershell
Scaffold-DbContext ... -Schemas Customer, Contractor
```

***

For example, to scaffold the `Purchases` table from the `Customer` schema, and the `Accounts` and `Contracts` tables from the `Contractor` schema:

#### .NET CLI

```dotnetcli
dotnet ef dbcontext scaffold ... --table Customer.Purchases --table Contractor.Accounts --table Contractor.Contracts
```

#### Visual Studio PMC

```powershell
Scaffold-DbContext ... -Tables Customer.Purchases, Contractor.Accounts, Contractor.Contracts
```

***

### Preserving database names

Table and column names are fixed up to better match the .NET naming conventions for types and properties by default. Specifying `-UseDatabaseNames` (Visual Studio PMC) or `--use-database-names` (.NET CLI) will disable this behavior preserving the original database names as much as possible. Invalid .NET identifiers will still be fixed and synthesized names like navigation properties will still conform to .NET naming conventions.

To disable the pluralizer when scaffolding reverse-engineered models, use `-NoPluralize` (Visual Studio PMC) or `--no-pluralize` (.NET CLI).

For example, consider the following tables:

```sql
CREATE TABLE [BLOGS] (
    [ID] int NOT NULL IDENTITY,
    [Blog_Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Blogs] PRIMARY KEY ([ID]));

CREATE TABLE [posts] (
    [id] int NOT NULL IDENTITY,
    [postTitle] nvarchar(max) NOT NULL,
    [post content] nvarchar(max) NOT NULL,
    [1 PublishedON] datetime2 NOT NULL,
    [2 DeletedON] datetime2 NULL,
    [BlogID] int NOT NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([id]),
    CONSTRAINT [FK_Posts_Blogs_BlogId] FOREIGN KEY ([BlogID]) REFERENCES [Blogs] ([ID]) ON DELETE CASCADE);
```

By default, the following entity types will be scaffolded from these tables:

```csharp
public partial class Blog
{
    public int Id { get; set; }
    public string BlogName { get; set; } = null!;
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}

public partial class Post
{
    public int Id { get; set; }
    public string PostTitle { get; set; } = null!;
    public string PostContent { get; set; } = null!;
    public DateTime _1PublishedOn { get; set; }
    public DateTime? _2DeletedOn { get; set; }
    public int BlogId { get; set; }
    public virtual Blog Blog { get; set; } = null!;
    public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();
}
```

However, using `-UseDatabaseNames` or `--use-database-names` results in the following entity types:

```csharp
public partial class BLOG
{
    public int ID { get; set; }
    public string Blog_Name { get; set; } = null!;
    public virtual ICollection<post> posts { get; set; } = new List<post>();
}

public partial class post
{
    public int id { get; set; }
    public string postTitle { get; set; } = null!;
    public string post_content { get; set; } = null!;
    public DateTime _1_PublishedON { get; set; }
    public DateTime? _2_DeletedON { get; set; }
    public int BlogID { get; set; }
    public virtual BLOG Blog { get; set; } = null!;
}
```

### Use mapping attributes (aka Data Annotations)

Entity types are configured using the `ModelBuilder` API in `OnModelCreating` by default. Specify `-DataAnnotations` (PMC) or `--data-annotations` (.NET CLI) to instead use mapping attributes when possible.

For example, using the Fluent API will scaffold this:

```csharp
entity.Property(e => e.Title)
    .IsRequired()
    .HasMaxLength(160);
```

While using Data Annotations will scaffold this:

```csharp
[Required]
[StringLength(160)]
public string Title { get; set; }
```

> **Tip:**
> Some aspects of the model cannot be configured using mapping attributes. The scaffolder will still use the model building API to handle these cases.

### DbContext name

The scaffolded `DbContext` class name will be the name of the database suffixed with _Context_ by default. To specify a different one, use `-Context` in PMC and `--context` in the .NET CLI.

### Target directories and namespaces

The entity classes and a DbContext class are scaffolded into the project's root directory and use the project's default namespace.

#### .NET CLI

You can specify the directory where classes are scaffolded using `--output-dir`, and `--context-dir` can be used to scaffold the DbContext class into a separate directory from the entity type classes:

```dotnetcli
dotnet ef dbcontext scaffold ... --context-dir Data --output-dir Models
```

By default, the namespace will be the root namespace plus the names of any subdirectories under the project's root directory. However, you can override the namespace for all output classes by using `--namespace`. You can also override the namespace for just the DbContext class using `--context-namespace`:

```dotnetcli
dotnet ef dbcontext scaffold ... --namespace Your.Namespace --context-namespace Your.DbContext.Namespace
```

#### Visual Studio PMC

You can specify the directory where classes are scaffolded using `-OutputDir`, and `-ContextDir` can be used to scaffold the DbContext class into a separate directory from the entity type classes:

```powershell
Scaffold-DbContext ... -ContextDir Data -OutputDir Models
```

By default, the namespace will be the root namespace plus the names of any subdirectories under the project's root directory. However, you can override the namespace for all output classes by using `-Namespace`. You can also override the namespace for just the DbContext class using `-ContextNamespace`.

```powershell
Scaffold-DbContext ... -Namespace Your.Namespace -ContextNamespace Your.DbContext.Namespace
```

***
