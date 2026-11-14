---
title: "Interceptors - EF Core (part 6 of 6)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/logging-events-diagnostics/interceptors.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Interceptors - EF Core (part 6 of 6)

## Query expression interception

`Microsoft.EntityFrameworkCore.Diagnostics.IQueryExpressionInterceptor` allows interception of the LINQ expression tree for a query before it is compiled. This can be used to dynamically modify queries in ways that apply across the application.

> **Note:**
> `IQueryExpressionInterceptor` is a singleton interceptor, meaning a single instance is typically shared between all `DbContext` instances.

> **Warning:**
> Interceptors are powerful, but it's easy to get things wrong when working with expression trees. Always consider if there is an easier way of achieving what you want, such as modifying the query directly.

### Example: Inject ordering into queries for stable sorting

Consider a method that returns a page of customers:

```csharp
Task<List<Customer>> GetPageOfCustomers(string sortProperty, int page)
{
    using var context = new CustomerContext();

    return context.Customers
        .OrderBy(e => EF.Property<object>(e, sortProperty))
        .Skip(page * 20).Take(20).ToListAsync();
}
```

> **Tip:**
> This query uses the `Microsoft.EntityFrameworkCore.EF.Property*` method to specify the property to sort by. This allows the application to dynamically pass in the property name, allowing sorting by any property of the entity type. Be aware that sorting by non-indexed columns can be slow.

This will work fine as long as the property used for sorting always returns a stable ordering. But this may not always be the case. For example, the LINQ query above generates the following on SQLite when ordering by `Customer.City`:

```sql
SELECT "c"."Id", "c"."City", "c"."Name", "c"."PhoneNumber"
FROM "Customers" AS "c"
ORDER BY "c"."City"
LIMIT @__p_1 OFFSET @__p_0
```

If there are multiple customers with the same `City`, then the ordering of this query is not stable. This could lead to missing or duplicate results as the user pages through the data.

A common way to fix this problem is to perform a secondary sorting by primary key. However, rather than manually adding this to every query, an interceptor can add the secondary ordering dynamically. To facilitate this, we define an interface for any entity that has an integer primary key:

```csharp
public interface IHasIntKey
{
    int Id { get; }
}
```

This interface is implemented by the entity types of interest:

```csharp
public class Customer : IHasIntKey
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? City { get; set; }
    public string? PhoneNumber { get; set; }
}
```

We then need an interceptor that implements `Microsoft.EntityFrameworkCore.Diagnostics.IQueryExpressionInterceptor`:

```csharp
public class KeyOrderingExpressionInterceptor : IQueryExpressionInterceptor
{
    public Expression QueryCompilationStarting(Expression queryExpression, QueryExpressionEventData eventData)
        => new KeyOrderingExpressionVisitor().Visit(queryExpression);

    private class KeyOrderingExpressionVisitor : ExpressionVisitor
    {
        private static readonly MethodInfo ThenByMethod
            = typeof(Queryable).GetMethods()
                .Single(m => m.Name == nameof(Queryable.ThenBy) && m.GetParameters().Length == 2);

        protected override Expression VisitMethodCall(MethodCallExpression? methodCallExpression)
        {
            var methodInfo = methodCallExpression!.Method;
            if (methodInfo.DeclaringType == typeof(Queryable)
                && methodInfo.Name == nameof(Queryable.OrderBy)
                && methodInfo.GetParameters().Length == 2)
            {
                var sourceType = methodCallExpression.Type.GetGenericArguments()[0];
                if (typeof(IHasIntKey).IsAssignableFrom(sourceType))
                {
                    var lambdaExpression = (LambdaExpression)((UnaryExpression)methodCallExpression.Arguments[1]).Operand;
                    var entityParameterExpression = lambdaExpression.Parameters[0];

                    return Expression.Call(
                        ThenByMethod.MakeGenericMethod(
                            sourceType,
                            typeof(int)),
                        methodCallExpression,
                        Expression.Lambda(
                            typeof(Func<,>).MakeGenericType(entityParameterExpression.Type, typeof(int)),
                            Expression.Property(entityParameterExpression, nameof(IHasIntKey.Id)),
                            entityParameterExpression));
                }
            }

            return base.VisitMethodCall(methodCallExpression);
        }
    }
}
```

This probably looks pretty complicated--and it is! Working with expression trees is typically not easy. Let's look at what's happening:

* Fundamentally, the interceptor encapsulates an `System.Linq.Expressions.ExpressionVisitor`. The visitor overrides `System.Linq.Expressions.ExpressionVisitor.VisitMethodCall*`, which will be called whenever there is a call to a method in the query expression tree.

* The visitor checks whether or not this is a call to the `System.Linq.Queryable.OrderBy*` method we are interested in.
* If it is, then the visitor further checks if the generic method call is for a type that implements our `IHasIntKey` interface.
* At this point we know that the method call is of the form `OrderBy(e => ...)`. We extract the lambda expression from this call and get the parameter used in that expression--that is, the `e`.
* We now build a new `System.Linq.Expressions.MethodCallExpression` using the `System.Linq.Expressions.Expression.Call*` builder method. In this case, the method being called is `ThenBy(e => e.Id)`. We build this using the parameter extracted above and a property access to the `Id` property of the `IHasIntKey` interface.
* The input into this call is the original `OrderBy(e => ...)`, and so the end result is an expression for `OrderBy(e => ...).ThenBy(e => e.Id)`.
* This modified expression is returned from the visitor, which means the LINQ query has now been appropriately modified to include a `ThenBy` call.
* EF Core continues and compiles this query expression into the appropriate SQL for the database being used.

Registering this interceptor and executing `GetPageOfCustomers` now generates the following SQL:

```sql
SELECT "c"."Id", "c"."City", "c"."Name", "c"."PhoneNumber"
FROM "Customers" AS "c"
ORDER BY "c"."City", "c"."Id"
LIMIT @__p_1 OFFSET @__p_0
```

This will now always produce a stable ordering, even if there are multiple customers with the same `City`.

In many cases, the same thing can be achieved more simply by modifying the query directly. For example:

```csharp
Task<List<Customer>> GetPageOfCustomers2(string sortProperty, int page)
{
    using var context = new CustomerContext();

    return context.Customers
        .OrderBy(e => EF.Property<object>(e, sortProperty))
        .ThenBy(e => e.Id)
        .Skip(page * 20).Take(20).ToListAsync();
}
```

In this case the `ThenBy` is simply added to the query. Yes, it may need to be done separately to every query, but it's simple, easy to understand, and will always work.

## Identity resolution interception

`Microsoft.EntityFrameworkCore.Diagnostics.IIdentityResolutionInterceptor` allows interception of identity resolution conflicts when the `Microsoft.EntityFrameworkCore.DbContext` starts tracking new entity instances.

> **Note:**
> This interceptor is currently only called when `DbContext.Update`, `DbContext.Attach`, and similar methods are used to track entities that are already being tracked with the same key. It is not called for entities returned from queries. This may change in a future release; see this issue.

A `DbContext` can only track one entity instance with any given primary key value. This means multiple instances of an entity with the same key value must be resolved to a single instance. An interceptor of this type is called with the existing tracked instance and the new instance and must apply any property values and relationship changes from the new instance into the existing instance. The new instance is then discarded.

EF Core provides a built-in implementation, `Microsoft.EntityFrameworkCore.Diagnostics.UpdatingIdentityResolutionInterceptor`, which updates the existing tracked entity with values from the new instance. This can be registered when configuring the context:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .AddInterceptors(new UpdatingIdentityResolutionInterceptor());
```

To implement custom identity resolution logic, create a class that implements `IIdentityResolutionInterceptor` and override the `UpdateTrackedInstance` method:

```csharp
public class CustomIdentityResolutionInterceptor : IIdentityResolutionInterceptor
{
    public void UpdateTrackedInstance(
        IdentityResolutionInterceptionData interceptionData,
        EntityEntry existingEntry,
        object newEntity)
    {
        // Custom logic to merge property values from newEntity into the existing tracked entity
        existingEntry.CurrentValues.SetValues(newEntity);
    }
}
```
