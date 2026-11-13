---
title: "Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/concurrency.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency

Tom Dykstra, and Jon P Smith

The Contoso University web app demonstrates how to create Razor Pages web apps using EF Core and Visual Studio. For information about the tutorial series, see the first tutorial.

If you run into problems you can't solve, download the completed app and compare that code to what you created by following the tutorial.

This tutorial shows how to handle conflicts when multiple users update an entity concurrently.

## Concurrency conflicts

A concurrency conflict occurs when:

* A user navigates to the edit page for an entity.
* Another user updates the same entity before the first user's change is written to the database.

If concurrency detection isn't enabled, whoever updates the database last overwrites the other user's changes. If this risk is acceptable, the cost of programming for concurrency might outweigh the benefit.

### Pessimistic concurrency

One way to prevent concurrency conflicts is to use database locks. This is called pessimistic concurrency. Before the app reads a database row that it intends to update, it requests a lock. Once a row is locked for update access, no other users are allowed to lock the row until the first lock is released.

Managing locks has disadvantages. It can be complex to program and can cause performance problems as the number of users increases. Entity Framework Core provides no built-in support for pessimistic concurrency.

### Optimistic concurrency

Optimistic concurrency allows concurrency conflicts to happen, and then reacts appropriately when they do. For example, Jane visits the Department edit page and changes the budget for the English department from $350,000.00 to $0.00.

Before Jane clicks **Save**, John visits the same page and changes the Start Date field from 9/1/2007 to 9/1/2013.

Jane clicks **Save** first and sees her change take effect, since the browser displays the Index page with zero as the Budget amount.

John clicks **Save** on an Edit page that still shows a budget of $350,000.00. What happens next is determined by how you handle concurrency conflicts:

* Keep track of which property a user has modified and update only the corresponding columns in the database.

  In the scenario, no data would be lost. Different properties were updated by the two users. The next time someone browses the English department, they will see both Jane's and John's changes. This method of updating can reduce the number of conflicts that could result in data loss. This approach has some disadvantages:

  * Can't avoid data loss if competing changes are made to the same property.
  * Is generally not practical in a web app. It requires maintaining significant state in order to keep track of all fetched values and new values. Maintaining large amounts of state can affect app performance.
  * Can increase app complexity compared to concurrency detection on an entity.

* Let John's change overwrite Jane's change.

  The next time someone browses the English department, they will see 9/1/2013 and the fetched $350,000.00 value. This approach is called a *Client Wins* or *Last in Wins* scenario. All values from the client take precedence over what's in the data store. The scaffolded code does no concurrency handling, Client Wins happens automatically.

* Prevent John's change from being updated in the database. Typically, the app would:

  * Display an error message.
  * Show the current state of the data.
  * Allow the user to reapply the changes.

  This is called a *Store Wins* scenario. The data-store values take precedence over the values submitted by the client. The Store Wins scenario is used in this tutorial. This method ensures that no changes are overwritten without a user being alerted.

## Conflict detection in EF Core

Properties configured as concurrency tokens are used to implement optimistic concurrency control. When an update or delete operation is triggered by  `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` or `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*`, the value of the concurrency token in the database is compared against the original value read by EF Core:

* If the values match, the operation can complete.
* If the values do not match, EF Core assumes that another user has performed a conflicting operation, aborts the current transaction, and throws a  `Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException`.

Another user or process performing an operation that conflicts with the current operation is known as *concurrency conflict*.

On relational databases EF Core checks for the value of the concurrency token in the `WHERE` clause of `UPDATE` and `DELETE` statements to detect a concurrency conflict.

The data model must be configured to enable conflict detection by including a tracking column that can be used to determine when a row has been changed. EF provides two approaches for concurrency tokens:

  * Applying `[ConcurrencyCheck]` or `Microsoft.EntityFrameworkCore.Metadata.IProperty.IsConcurrencyToken` to a property on the model. This approach is not recommended. For more information, see Concurrency Tokens in EF Core.

  * Applying `System.ComponentModel.DataAnnotations.TimestampAttribute` or `Microsoft.EntityFrameworkCore.Metadata.Builders.PropertyBuilder.IsRowVersion*` to a concurrency token in the model. This is the approach used in this tutorial.

The  SQL Server approach and SQLite implementation details are slightly different. A difference file is shown later in the tutorial listing the differences. The Visual Studio tab shows the SQL Server approach. The Visual Studio Code tab shows the approach for non-SQL Server databases, such as SQLite.

# Visual Studio

  * In the model, include a tracking column that is used to determine when a row has been changed.
  * Apply the `System.ComponentModel.DataAnnotations.TimestampAttribute` to the concurrency property.

  Update the `Models/Department.cs` file with the following highlighted code:

  ```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversity.Models
{
    public class Department
    {
        public int DepartmentID { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Budget { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}",
                       ApplyFormatInEditMode = true)]
        [Display(Name = "Start Date")]
        public DateTime StartDate { get; set; }

        public int? InstructorID { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }

        public Instructor Administrator { get; set; }
        public ICollection<Course> Courses { get; set; }
    }
}
```

The `System.ComponentModel.DataAnnotations.TimestampAttribute` is what identifies the column as a concurrency tracking column. The fluent API is an alternative way to specify the tracking property:

```csharp
modelBuilder.Entity<Department>()
  .Property<byte[]>("<example-value>")
  .IsRowVersion();
```

The `[Timestamp]` attribute on an entity property generates the following code in the `Microsoft.EntityFrameworkCore.ModelBuilder` method:

```csharp
 b.Property<byte[]>("<example-value>")
     .IsConcurrencyToken()
     .ValueGeneratedOnAddOrUpdate()
     .HasColumnType("rowversion");
```

The preceding code:

* Sets the property type `ConcurrencyToken` to byte array. `byte[]` is the required type for SQL Server.
* Calls `Microsoft.EntityFrameworkCore.Metadata.Builders.PropertyBuilder.IsConcurrencyToken*`.  `IsConcurrencyToken` configures the property as a concurrency token. On updates, the concurrency token value in the database is compared to the original value to ensure it has not changed since the instance was retrieved from the database. If it has changed, a `Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException` is thrown and changes are not applied.
* Calls `Microsoft.EntityFrameworkCore.Metadata.Builders.PropertyBuilder.ValueGeneratedOnAddOrUpdate*`, which configures the `ConcurrencyToken` property to have a value automatically generated when adding or updating an entity.
* `HasColumnType("rowversion")` sets the column type in the SQL Server database to rowversion.

The following code shows a portion of the T-SQL generated by EF Core when the `Department` name is updated:

```sql
SET NOCOUNT ON;
UPDATE [Departments] SET [Name] = @p0
WHERE [DepartmentID] = @p1 AND [ConcurrencyToken] = @p2;
SELECT [ConcurrencyToken]
FROM [Departments]
WHERE @@ROWCOUNT = 1 AND [DepartmentID] = @p1;
```

The preceding highlighted code shows the `WHERE` clause containing `ConcurrencyToken`. If the database `ConcurrencyToken` doesn't equal the `ConcurrencyToken` parameter `@p2`, no rows are updated.

The following highlighted code shows the T-SQL that verifies exactly one row was updated:

```sql
SET NOCOUNT ON;
UPDATE [Departments] SET [Name] = @p0
WHERE [DepartmentID] = @p1 AND [ConcurrencyToken] = @p2;
SELECT [ConcurrencyToken]
FROM [Departments]
WHERE @@ROWCOUNT = 1 AND [DepartmentID] = @p1;
```

@@ROWCOUNT returns the number of rows affected by the last statement. If no rows are updated, EF Core throws a `DbUpdateConcurrencyException`.

# Visual Studio Code

  * In the model, include a tracking column that can be used to determine when a row has been changed. In this sample, a `GUID` is used. Update the `Models/Department.cs` file with the following highlighted code:

    ```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversity.Models
{
    public class Department
    {
        public int DepartmentID { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Budget { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}",
                       ApplyFormatInEditMode = true)]
        [Display(Name = "Start Date")]
        public DateTime StartDate { get; set; }

        public int? InstructorID { get; set; }

        public Guid ConcurrencyToken { get; set; } = Guid.NewGuid();

        public Instructor Administrator { get; set; }
        public ICollection<Course> Courses { get; set; }
    }
}
```

  * Update the `Data/SchoolContext.cs` file by calling `Microsoft.EntityFrameworkCore.Metadata.IProperty.IsConcurrencyToken` on the `Department.ConcurrencyToken` property:

    ```csharp
public class SchoolContext : DbContext
{
    public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Instructor> Instructors { get; set; }
    public DbSet<OfficeAssignment> OfficeAssignments { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>().ToTable(nameof(Course))
            .HasMany(c => c.Instructors)
            .WithMany(i => i.Courses);
        modelBuilder.Entity<Student>().ToTable(nameof(Student));
        modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
        modelBuilder.Entity<Instructor>().ToTable(nameof(Instructor));
        modelBuilder.Entity<Department>()
            .Property(d => d.ConcurrencyToken)
            .IsConcurrencyToken();
    }
}
```

    `IsConcurrencyToken` configures the property as a concurrency token. On updates, the concurrency token value in the database is compared to the original value to ensure it has not changed since the instance was retrieved from the database. If it has changed, a `Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException` is thrown and changes are not applied.

  * In the code that updates the entity, update the value of the concurrency token. In this sample, the method that updates the entity uses the following code. This step will be done later in the tutorial.

    ```csharp
    departmentToUpdate.ConcurrencyToken = Guid.NewGuid();
    ```

  An alternative to updating the concurrency token in the update method is to set up a trigger so it's automatically updated by the database. For more information, see SQLite and EF Core Concurrency Tokens.

---
