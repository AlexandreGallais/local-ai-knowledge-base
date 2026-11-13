---
title: "Identity model customization in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/customize-identity-model.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Identity model customization in ASP.NET Core

By Arthur Vickers

ASP.NET Core Identity provides a framework for managing and storing user accounts in ASP.NET Core apps. Identity is added to your project when **Individual Accounts** is selected as the authentication mechanism. By default, Identity makes use of an Entity Framework (EF) Core data model. This article describes how to customize the Identity model.

## Identity and EF Core Migrations

Before examining the model, it's useful to understand how Identity works with EF Core Migrations to create and update a database. At the top level, the process is:

1. Define or update a data model in code.
1. Add a Migration to translate this model into changes that can be applied to the database.
1. Check that the Migration correctly represents your intentions.
1. Apply the Migration to update the database to be in sync with the model.
1. Repeat steps 1 through 4 to further refine the model and keep the database in sync.

Use one of the following approaches to add and apply Migrations:

* The **Package Manager Console** (PMC) window if using Visual Studio. For more information, see EF Core PMC tools.
* The .NET CLI if using the command line. For more information, see EF Core .NET command line tools.
* Clicking the **Apply Migrations** button on the error page when the app is run.

ASP.NET Core has a development-time error page handler. The handler can apply migrations when the app is run. Production apps typically generate SQL scripts from the migrations and deploy database changes as part of a controlled app and database deployment.

When a new app using Identity is created, steps 1 and 2 above have already been completed. That is, the initial data model already exists, and the initial migration has been added to the project. The initial migration still needs to be applied to the database. The initial migration can be applied via one of the following approaches:

* Run `Update-Database` in PMC.
* Run `dotnet ef database update` in a command shell.
* Click the **Apply Migrations** button on the error page when the app is run.

Repeat the preceding steps as changes are made to the model.

> **Important:**
> When Identity options that affect the underlying EF Core model are configured (for example, `options.Stores.MaxLengthForKeys` or `options.Stores.SchemaVersion`), those option values must also be applied at design time for EF Core Migrations to generate the correct model shape. If the EF tooling runs without these options configured, generated migrations may omit the intended changes. For more information, see efcore#36314.
To ensure Identity options are applied consistently during migration generation, use one of the following approaches:

* **Set the startup project:** Run `dotnet ef` commands (or PMC commands) with the application project that calls `AddDefaultIdentity` or `AddIdentityCore` set as the startup project. For example, when running commands from a class library project, specify the startup project with `dotnet ef migrations add {MIGRATION_NAME} --startup-project {PATH_TO_APP_PROJECT}`, where the `{MIGRATION_NAME}` placeholder is the migration name and the `{PATH_TO_APP_PROJECT}` placeholder is the path to the app project.
* **Implement `IDesignTimeDbContextFactory`:** Alternatively, implement an `IDesignTimeDbContextFactory<TContext>` that constructs the context and applies the equivalent Identity option configuration. For an Aspire-friendly solution, see efcore#35285 (comment).

Example Identity configuration in `Program.cs`:

```csharp
builder.Services
    .AddDefaultIdentity<ApplicationUser>(options =>
    {
        options.Stores.SchemaVersion = IdentitySchemaVersions.Version2;
        options.Stores.MaxLengthForKeys = 256;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

Example design-time factory:

```csharp
public class DesignTimeApplicationDbContextFactory
    : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlServer("{CONNECTION_STRING}");

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
```

> **Note:**
> You cannot access `options.Stores.MaxLengthForKeys` directly inside `OnModelCreating` because dependency injection isn't available at design time. Instead, specify the configured value directly (such as `HasMaxLength(256)`), or use a design-time mechanism to pass settings if needed.
> For more details, see Configure ASP.NET Core Identity.

> **Tip:**
> Always verify the resulting model snapshot reflects the intended key lengths or schema version after adding a migration.

## The Identity model

### Entity types

The Identity model consists of the following entity types.

|Entity type|Description                                                  |
|-----------|-------------------------------------------------------------|
|`User`     |Represents the user.                                         |
|`Role`     |Represents a role.                                           |
|`UserClaim`|Represents a claim that a user possesses.                    |
|`UserToken`|Represents an authentication token for a user.               |
|`UserLogin`|Associates a user with a login.                              |
|`RoleClaim`|Represents a claim that's granted to all users within a role.|
|`UserRole` |A join entity that associates users and roles.               |

### Entity type relationships

The entity types are related to each other in the following ways:

* Each `User` can have many `UserClaims`.
* Each `User` can have many `UserLogins`.
* Each `User` can have many `UserTokens`.
* Each `Role` can have many associated `RoleClaims`.
* Each `User` can have many associated `Roles`, and each `Role` can be associated with many `Users`. This is a many-to-many relationship that requires a join table in the database. The join table is represented by the `UserRole` entity.

### Default model configuration

Identity defines many *context classes* that inherit from `Microsoft.EntityFrameworkCore.DbContext` to configure and use the model. This configuration is done using the EF Core Code First Fluent API in the `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*` method of the context class. The default configuration is:

```csharp
builder.Entity<TUser>(b =>
{
    // Primary key
    b.HasKey(u => u.Id);

    // Indexes for "normalized" username and email, to allow efficient lookups
    b.HasIndex(u => u.NormalizedUserName).HasName("UserNameIndex").IsUnique();
    b.HasIndex(u => u.NormalizedEmail).HasName("EmailIndex");

    // Maps to the AspNetUsers table
    b.ToTable("AspNetUsers");

    // A concurrency token for use with the optimistic concurrency checking
    b.Property(u => u.ConcurrencyStamp).IsConcurrencyToken();

    // Limit the size of columns to use efficient database types
    b.Property(u => u.UserName).HasMaxLength(256);
    b.Property(u => u.NormalizedUserName).HasMaxLength(256);
    b.Property(u => u.Email).HasMaxLength(256);
    b.Property(u => u.NormalizedEmail).HasMaxLength(256);

    // The relationships between User and other entity types
    // Note that these relationships are configured with no navigation properties

    // Each User can have many UserClaims
    b.HasMany<TUserClaim>().WithOne().HasForeignKey(uc => uc.UserId).IsRequired();

    // Each User can have many UserLogins
    b.HasMany<TUserLogin>().WithOne().HasForeignKey(ul => ul.UserId).IsRequired();

    // Each User can have many UserTokens
    b.HasMany<TUserToken>().WithOne().HasForeignKey(ut => ut.UserId).IsRequired();

    // Each User can have many entries in the UserRole join table
    b.HasMany<TUserRole>().WithOne().HasForeignKey(ur => ur.UserId).IsRequired();
});

builder.Entity<TUserClaim>(b =>
{
    // Primary key
    b.HasKey(uc => uc.Id);

    // Maps to the AspNetUserClaims table
    b.ToTable("AspNetUserClaims");
});

builder.Entity<TUserLogin>(b =>
{
    // Composite primary key consisting of the LoginProvider and the key to use
    // with that provider
    b.HasKey(l => new { l.LoginProvider, l.ProviderKey });

    // Limit the size of the composite key columns due to common DB restrictions
    b.Property(l => l.LoginProvider).HasMaxLength(128);
    b.Property(l => l.ProviderKey).HasMaxLength(128);

    // Maps to the AspNetUserLogins table
    b.ToTable("AspNetUserLogins");
});

builder.Entity<TUserToken>(b =>
{
    // Composite primary key consisting of the UserId, LoginProvider and Name
    b.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });

    // Limit the size of the composite key columns due to common DB restrictions
    b.Property(t => t.LoginProvider).HasMaxLength(maxKeyLength);
    b.Property(t => t.Name).HasMaxLength(maxKeyLength);

    // Maps to the AspNetUserTokens table
    b.ToTable("AspNetUserTokens");
});

builder.Entity<TRole>(b =>
{
    // Primary key
    b.HasKey(r => r.Id);

    // Index for "normalized" role name to allow efficient lookups
    b.HasIndex(r => r.NormalizedName).HasName("RoleNameIndex").IsUnique();

    // Maps to the AspNetRoles table
    b.ToTable("AspNetRoles");

    // A concurrency token for use with the optimistic concurrency checking
    b.Property(r => r.ConcurrencyStamp).IsConcurrencyToken();

    // Limit the size of columns to use efficient database types
    b.Property(u => u.Name).HasMaxLength(256);
    b.Property(u => u.NormalizedName).HasMaxLength(256);

    // The relationships between Role and other entity types
    // Note that these relationships are configured with no navigation properties

    // Each Role can have many entries in the UserRole join table
    b.HasMany<TUserRole>().WithOne().HasForeignKey(ur => ur.RoleId).IsRequired();

    // Each Role can have many associated RoleClaims
    b.HasMany<TRoleClaim>().WithOne().HasForeignKey(rc => rc.RoleId).IsRequired();
});

builder.Entity<TRoleClaim>(b =>
{
    // Primary key
    b.HasKey(rc => rc.Id);

    // Maps to the AspNetRoleClaims table
    b.ToTable("AspNetRoleClaims");
});

builder.Entity<TUserRole>(b =>
{
    // Primary key
    b.HasKey(r => new { r.UserId, r.RoleId });

    // Maps to the AspNetUserRoles table
    b.ToTable("AspNetUserRoles");
});
```

### Model generic types

Identity defines default Common Language Runtime (CLR) types for each of the entity types listed above. These types are all prefixed with *Identity*:

* `IdentityUser`
* `IdentityRole`
* `IdentityUserClaim`
* `IdentityUserToken`
* `IdentityUserLogin`
* `IdentityRoleClaim`
* `IdentityUserRole`

Rather than using these types directly, the types can be used as base classes for the app's own types. The `DbContext` classes defined by Identity are generic, such that different CLR types can be used for one or more of the entity types in the model. These generic types also allow the `User` primary key (PK) data type to be changed.

When using Identity with support for roles, an `Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext` class should be used. For example:

```csharp
// Uses all the built-in Identity types
// Uses `string` as the key type
public class IdentityDbContext
    : IdentityDbContext<IdentityUser, IdentityRole, string>
{
}

// Uses the built-in Identity types except with a custom User type
// Uses `string` as the key type
public class IdentityDbContext<TUser>
    : IdentityDbContext<TUser, IdentityRole, string>
        where TUser : IdentityUser
{
}

// Uses the built-in Identity types except with custom User and Role types
// The key type is defined by TKey
public class IdentityDbContext<TUser, TRole, TKey> : IdentityDbContext<
    TUser, TRole, TKey, IdentityUserClaim<TKey>, IdentityUserRole<TKey>,
    IdentityUserLogin<TKey>, IdentityRoleClaim<TKey>, IdentityUserToken<TKey>>
        where TUser : IdentityUser<TKey>
        where TRole : IdentityRole<TKey>
        where TKey : IEquatable<TKey>
{
}

// No built-in Identity types are used; all are specified by generic arguments
// The key type is defined by TKey
public abstract class IdentityDbContext<
    TUser, TRole, TKey, TUserClaim, TUserRole, TUserLogin, TRoleClaim, TUserToken>
    : IdentityUserContext<TUser, TKey, TUserClaim, TUserLogin, TUserToken>
         where TUser : IdentityUser<TKey>
         where TRole : IdentityRole<TKey>
         where TKey : IEquatable<TKey>
         where TUserClaim : IdentityUserClaim<TKey>
         where TUserRole : IdentityUserRole<TKey>
         where TUserLogin : IdentityUserLogin<TKey>
         where TRoleClaim : IdentityRoleClaim<TKey>
         where TUserToken : IdentityUserToken<TKey>
```

It's also possible to use Identity without roles (only claims), in which case an `Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserContext`1` class should be used:

```csharp
// Uses the built-in non-role Identity types except with a custom User type
// Uses `string` as the key type
public class IdentityUserContext<TUser>
    : IdentityUserContext<TUser, string>
        where TUser : IdentityUser
{
}

// Uses the built-in non-role Identity types except with a custom User type
// The key type is defined by TKey
public class IdentityUserContext<TUser, TKey> : IdentityUserContext<
    TUser, TKey, IdentityUserClaim<TKey>, IdentityUserLogin<TKey>,
    IdentityUserToken<TKey>>
        where TUser : IdentityUser<TKey>
        where TKey : IEquatable<TKey>
{
}

// No built-in Identity types are used; all are specified by generic arguments, with no roles
// The key type is defined by TKey
public abstract class IdentityUserContext<
    TUser, TKey, TUserClaim, TUserLogin, TUserToken> : DbContext
        where TUser : IdentityUser<TKey>
        where TKey : IEquatable<TKey>
        where TUserClaim : IdentityUserClaim<TKey>
        where TUserLogin : IdentityUserLogin<TKey>
        where TUserToken : IdentityUserToken<TKey>
{
}
```
