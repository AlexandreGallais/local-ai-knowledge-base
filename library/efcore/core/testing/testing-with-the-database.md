---
title: "Testing against your Production Database System - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/testing/testing-with-the-database.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Testing against your production database system

In this page, we discuss techniques for writing automated tests which involve the database system against which the application runs in production. Alternate testing approaches exist, where the production database system is swapped out by test doubles; see the testing overview page for more information. Note that testing against a different database than what is used in production (e.g. Sqlite) is not covered here, since the different database is used as a test double; this approach is covered in Testing without your production database system.

The main hurdle with testing which involves a real database is to ensure proper test isolation, so that tests running in parallel (or even in serial) don't interfere with each other. The full sample code for the below can be viewed here.

> **Tip:**
> This page shows xUnit techniques, but similar concepts exist in other testing frameworks, including NUnit.

## Setting up your database system

Most database systems nowadays can be easily installed, both in CI environments and on developer machines. While it's frequently easy enough to install the database via the regular installation mechanism, ready-to-use Docker images are available for most major databases and can make installation particularly easy in CI. Libraries like Testcontainers can further simplify this by automatically managing containerized database instances during testing. For the developer environment, GitHub Workspaces, Dev Container can set up all needed services and dependencies - including the database. While this requires an initial investment in setup, once that's done you have a working testing environment and can concentrate on more important things.

In certain cases, databases have a special edition or version which can be helpful for testing. When using SQL Server, LocalDB can be used to run tests locally with virtually no setup at all, spinning up the database instance on demand and possibly saving resources on less powerful developer machines. However, LocalDB is not without its issues:

* It doesn't support everything that SQL Server Developer Edition does.
* It's only available on Windows.
* It can cause lag on first test run as the service is spun up.

We generally recommend installing SQL Server Developer edition rather than LocalDB, since it provides the full SQL Server feature set and is generally very easy to do.

When using a cloud database, it's usually appropriate to test against a local version of the database, both to improve speed and to decrease costs. For example, when using SQL Azure in production, you can test against a locally-installed SQL Server - the two are extremely similar (though it's still wise to run tests against SQL Azure itself before going into production). When using Azure Cosmos DB, the Azure Cosmos DB emulator is a useful tool both for developing locally and for running tests.

## Creating, seeding and managing a test database

Once your database is installed, you're ready to start using it in your tests. In most simple cases, your test suite has a single database that's shared between multiple tests across multiple test classes, so we need some logic to make sure the database is created and seeded exactly once during the lifetime of the test run.

When using Xunit, this can be done via a class fixture, which represents the database and is shared across multiple test runs:

```csharp
public class TestDatabaseFixture
{
    private const string ConnectionString = @"Server=(localdb)\mssqllocaldb;Database=EFTestSample;Trusted_Connection=True;ConnectRetryCount=0";

    private static readonly object _lock = new();
    private static bool _databaseInitialized;

    public TestDatabaseFixture()
    {
        lock (_lock)
        {
            if (!_databaseInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();

                    context.AddRange(
                        new Blog { Name = "Blog1", Url = "http://blog1.com" },
                        new Blog { Name = "Blog2", Url = "http://blog2.com" });
                    context.SaveChanges();
                }

                _databaseInitialized = true;
            }
        }
    }

    public BloggingContext CreateContext()
        => new BloggingContext(
            new DbContextOptionsBuilder<BloggingContext>()
                .UseSqlServer(ConnectionString)
                .Options);
}
```

When the above fixture is instantiated, it uses `Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator.EnsureDeleted` to drop the database (in case it exists from a previous run), and then `Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator.EnsureCreated` to create it with your latest model configuration (see the docs for these APIs). Once the database is created, the fixture seeds it with some data our tests can use. It's worth spending some time thinking about your seed data, since changing it later for a new test may cause existing tests to fail.

To use the fixture in a test class, simply implement `IClassFixture` over your fixture type, and xUnit will inject it into your constructor:

```csharp
public class BloggingControllerTest : IClassFixture<TestDatabaseFixture>
{
    public BloggingControllerTest(TestDatabaseFixture fixture)
        => Fixture = fixture;

    public TestDatabaseFixture Fixture { get; }
```

Your test class now has a `Fixture` property which can be used by tests to create a fully functional context instance:

```csharp
[Fact]
public async Task GetBlog()
{
    using var context = Fixture.CreateContext();
    var controller = new BloggingController(context);

    var blog = (await controller.GetBlog("Blog2")).Value;

    Assert.Equal("http://blog2.com", blog.Url);
}
```

Finally, you may have noticed some locking in the fixture's creation logic above. If the fixture is only used in a single test class, it is guaranteed to be instantiated exactly once by xUnit; but it's common to use the same database fixture in multiple test classes. xUnit does provide collection fixtures, but that mechanism prevents your test classes from running in parallel, which is important for test performance. To safely manage this with an xUnit class fixture, we take a simple lock around database creation and seeding, and use a static flag to make sure we never have to do it twice.

## Tests which modify data

The above example showed a read-only test, which is the easy case from a test isolation standpoint: since nothing is being modified, test interference isn't possible. In contrast, tests which modify data are more problematic, since they may interfere with one another. One common technique to isolate writing tests is to wrap the test in a transaction, and to have that transaction rolled back at the end of the test. Since nothing is actually committed to the database, other tests don't see any modifications and interference is avoided.

Here's a controller method which adds a Blog to our database:

```csharp
[HttpPost]
public async Task<ActionResult> AddBlog(string name, string url)
{
    _context.Blogs.Add(new Blog { Name = name, Url = url });
    await _context.SaveChangesAsync();

    return Ok();
}
```

We can test this method with the following:

```csharp
[Fact]
public async Task AddBlog()
{
    using var context = Fixture.CreateContext();
    context.Database.BeginTransaction();

    var controller = new BloggingController(context);
    await controller.AddBlog("Blog3", "http://blog3.com");

    context.ChangeTracker.Clear();

    var blog = await context.Blogs.SingleAsync(b => b.Name == "Blog3");
    Assert.Equal("http://blog3.com", blog.Url);

}
```

Some notes on the test code above:

* We start a transaction to make sure the changes below aren't committed to the database, and don't interfere with other tests. Since the transaction is never committed, it is implicitly rolled back at the end of the test when the context instance is disposed.
* After making the updates we want, we clear the context instance's change tracker with `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Clear*`, to make sure we actually load the blog from the database below. We could use two context instances instead, but we'd then have to make sure the same transaction is used by both instances.
* You may even want to start the transaction in the fixture's `CreateContext`, so that tests receive a context instance that's already in a transaction, and ready for updates. This can help prevent cases where the transaction is accidentally forgotten, leading to test interference which can be hard to debug. You may also want to separate read-only and write tests in different test classes as well.

## Tests which explicitly manage transactions

There is one final category of tests which presents an additional difficulty: tests which modify data and also explicitly manage transactions. Because databases do not typically support nested transactions, it isn't possible to use transactions for isolation as above, since they need to be used by actual product code. While these tests tend to be more rare, it's necessary to handle them in a special way: you must clean up your database to its original state after each test, and parallelization must be disabled so that these tests don't interfere with each other.

Let's examine the following controller method as an example:

```csharp
[HttpPost]
public async Task<ActionResult> UpdateBlogUrl(string name, string url)
{
    // Note: it isn't usually necessary to start a transaction for updating. This is done here for illustration purposes only.
    await using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

    var blog = await _context.Blogs.FirstOrDefaultAsync(b => b.Name == name);
    if (blog is null)
    {
        return NotFound();
    }

    blog.Url = url;
    await _context.SaveChangesAsync();

    await transaction.CommitAsync();
    return Ok();
}
```

Let's assume that for some reason, the method requires a serializable transaction to be used (this isn't typically the case). As a result, we cannot use a transaction to guarantee test isolation. Since the test will actually commit changes to the database, we'll define another fixture with its own, separate database, to make sure we don't interfere with the other tests already shown above:

```csharp
public class TransactionalTestDatabaseFixture
{
    private const string ConnectionString = @"Server=(localdb)\mssqllocaldb;Database=EFTransactionalTestSample;Trusted_Connection=True;ConnectRetryCount=0";

    public BloggingContext CreateContext()
        => new BloggingContext(
            new DbContextOptionsBuilder<BloggingContext>()
                .UseSqlServer(ConnectionString)
                .Options);

    public TransactionalTestDatabaseFixture()
    {
        using var context = CreateContext();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        Cleanup();
    }

    public void Cleanup()
    {
        using var context = CreateContext();

        context.Blogs.RemoveRange(context.Blogs);

        context.AddRange(
            new Blog { Name = "Blog1", Url = "http://blog1.com" },
            new Blog { Name = "Blog2", Url = "http://blog2.com" });
        context.SaveChanges();
```

This fixture is similar to the one used above, but notably contains a `Cleanup` method; we'll call this after every test to ensure that the database is reset to its starting state.

If this fixture will only be used by a single test class, we can reference it as a class fixture as above - xUnit doesn't parallelize tests within the same class (read more about test collections and parallelization in the xUnit docs). If, however, we want to share this fixture between multiple classes, we must make sure these classes don't run in parallel, to avoid any interference. To do that, we will use this as an xUnit collection fixture rather than as a class fixture.

First, we define a *test collection*, which references our fixture and will be used by all transactional test classes which require it:

```csharp
[CollectionDefinition("TransactionalTests")]
public class TransactionalTestsCollection : ICollectionFixture<TransactionalTestDatabaseFixture>
{
}
```

We now reference the test collection in our test class, and accept the fixture in the constructor as before:

```csharp
[Collection("TransactionalTests")]
public class TransactionalBloggingControllerTest : IDisposable
{
    public TransactionalBloggingControllerTest(TransactionalTestDatabaseFixture fixture)
        => Fixture = fixture;

    public TransactionalTestDatabaseFixture Fixture { get; }
```

Finally, we make our test class disposable, arranging for the fixture's `Cleanup` method to be called after each test:

```csharp
public void Dispose()
    => Fixture.Cleanup();
```

Note that since xUnit only ever instantiates the collection fixture once, there is no need for us to use locking around database creation and seeding as we did above.

The full sample code for the above can be viewed here.

> **Tip:**
> If you have multiple test classes with tests which modify the database, you can still run them in parallel by having different fixtures, each referencing its own database. Creating and using many test databases isn't problematic and should be done whenever it's helpful.

## Efficient database creation

In the samples above, we used `Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator.EnsureDeleted` and `Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator.EnsureCreated` before running tests, to make sure we have an up-to-date test database. These operations can be a bit slow in certain databases, which can be a problem as you iterate over code changes and re-run tests over and over. If that's the case, you may want to temporarily comment out `EnsureDeleted` in your fixture's constructor: this will reuse the same database across test runs.

The disadvantage of this approach is that if you change your EF Core model, your database schema won't be up to date, and tests may fail. As a result, we only recommend doing this temporarily during the development cycle.
