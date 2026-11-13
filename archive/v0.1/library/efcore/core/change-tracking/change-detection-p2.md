---
title: "Change Detection and Notifications - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/change-detection.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Change Detection and Notifications - EF Core (part 2 of 2)

## Notification entities

Snapshot change tracking is recommended for most applications. However, applications that track many entities and/or make many changes to those entities may benefit from implementing entities that automatically notify EF Core when their property and navigation values change. These are known as "notification entities".

### Implementing notification entities

Notification entities make use of the `System.ComponentModel.INotifyPropertyChanging` and `System.ComponentModel.INotifyPropertyChanged` interfaces, which are part of the .NET base class library (BCL). These interfaces define events that must be fired before and after changing a property value. For example:

```csharp
public class Blog : INotifyPropertyChanging, INotifyPropertyChanged
{
    public event PropertyChangingEventHandler PropertyChanging;
    public event PropertyChangedEventHandler PropertyChanged;

    private int _id;

    public int Id
    {
        get => _id;
        set
        {
            PropertyChanging?.Invoke(this, new PropertyChangingEventArgs(nameof(Id)));
            _id = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Id)));
        }
    }

    private string _name;

    public string Name
    {
        get => _name;
        set
        {
            PropertyChanging?.Invoke(this, new PropertyChangingEventArgs(nameof(Name)));
            _name = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
        }
    }

    public IList<Post> Posts { get; } = new ObservableCollection<Post>();
}
```

In addition, any collection navigations must implement `INotifyCollectionChanged`; in the example above this is satisfied by using an `System.Collections.ObjectModel.ObservableCollection`1` of posts. EF Core also ships with an `Microsoft.EntityFrameworkCore.ChangeTracking.ObservableHashSet`1` implementation that has more efficient lookups at the expense of stable ordering.

Most of this notification code is typically moved into an unmapped base class. For example:

```csharp
public class Blog : NotifyingEntity
{
    private int _id;

    public int Id
    {
        get => _id;
        set => SetWithNotify(value, out _id);
    }

    private string _name;

    public string Name
    {
        get => _name;
        set => SetWithNotify(value, out _name);
    }

    public IList<Post> Posts { get; } = new ObservableCollection<Post>();
}

public abstract class NotifyingEntity : INotifyPropertyChanging, INotifyPropertyChanged
{
    protected void SetWithNotify<T>(T value, out T field, [CallerMemberName] string propertyName = "")
    {
        NotifyChanging(propertyName);
        field = value;
        NotifyChanged(propertyName);
    }

    public event PropertyChangingEventHandler PropertyChanging;
    public event PropertyChangedEventHandler PropertyChanged;

    private void NotifyChanged(string propertyName)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

    private void NotifyChanging(string propertyName)
        => PropertyChanging?.Invoke(this, new PropertyChangingEventArgs(propertyName));
}
```

### Configuring notification entities

There is no way for EF Core to validate that `INotifyPropertyChanging` or `INotifyPropertyChanged` are fully implemented for use with EF Core. In particular, some uses of these interfaces do so with notifications only on certain properties, rather than on all properties (including navigations) as required by EF Core. For this reason, EF Core does not automatically hook into these events.

Instead, EF Core must be configured to use these notification entities. This is usually done for all entity types by calling `Microsoft.EntityFrameworkCore.ModelBuilder.HasChangeTrackingStrategy*`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.HasChangeTrackingStrategy(ChangeTrackingStrategy.ChangingAndChangedNotifications);
}
```

(The strategy can also be set differently for different entity types using `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder.HasChangeTrackingStrategy*`, but this is usually counterproductive since DetectChanges is still required for those types that are not notification entities.)

Full notification change tracking requires that both `INotifyPropertyChanging` and `INotifyPropertyChanged` are implemented. This allows original values to be saved just before the property value is changed, avoiding the need for EF Core to create a snapshot when tracking the entity. Entity types that implement only `INotifyPropertyChanged` can also be used with EF Core. In this case, EF still creates a snapshot when tracking an entity to keep track of original values, but then uses the notifications to detect changes immediately, rather than needing DetectChanges to be called.

The different `Microsoft.EntityFrameworkCore.ChangeTrackingStrategy` values are summarized in the following table.

| ChangeTrackingStrategy                              | Interfaces needed                                      | Needs DetectChanges | Snapshots original values
|:----------------------------------------------------|--------------------------------------------------------|---------------------|--------------------------
| Snapshot                                            | None                                                   | Yes                 | Yes
| ChangedNotifications                                | INotifyPropertyChanged                                 | No                  | Yes
| ChangingAndChangedNotifications                     | INotifyPropertyChanged and INotifyPropertyChanging     | No                  | No
| ChangingAndChangedNotificationsWithOriginalValues   | INotifyPropertyChanged and INotifyPropertyChanging     | No                  | Yes

### Using notification entities

Notification entities behave like any other entities, except that making changes to the entity instances do not require a call to `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges` to detect these changes. For example:

```csharp
using var context = new BlogsContext();
var blog = await context.Blogs.Include(e => e.Posts).FirstAsync(e => e.Name == ".NET Blog");

// Change a property value
blog.Name = ".NET Blog (Updated!)";

// Add a new entity to a navigation
blog.Posts.Add(
    new Post
    {
        Title = "What’s next for System.Text.Json?", Content = ".NET 5.0 was released recently and has come with many..."
    });

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

With normal entities, the change tracker debug view showed that these changes were not detected until DetectChanges was called. Looking at the debug view when notification entities are used shows that these changes have been detected immediately:

```output
Blog {Id: 1} Modified
  Id: 1 PK
  Name: '.NET Blog (Updated!)' Modified
  Posts: [{Id: 1}, {Id: 2}, {Id: -2147482643}]
Post {Id: -2147482643} Added
  Id: -2147482643 PK Temporary
  BlogId: 1 FK
  Content: '.NET 5.0 was released recently and has come with many...'
  Title: 'What's next for System.Text.Json?'
  Blog: {Id: 1}
Post {Id: 1} Unchanged
  Id: 1 PK
  BlogId: 1 FK
  Content: 'Announcing the release of EF Core 5.0, a full featured cross...'
  Title: 'Announcing the Release of EF Core 5.0'
  Blog: {Id: 1}
Post {Id: 2} Unchanged
  Id: 2 PK
  BlogId: 1 FK
  Content: 'F# 5 is the latest version of F#, the functional programming...'
  Title: 'Announcing F# 5'
  Blog: {Id: 1}
```

## Change-tracking proxies

EF Core can dynamically generate proxy types that implement `System.ComponentModel.INotifyPropertyChanging` and `System.ComponentModel.INotifyPropertyChanged`. This requires installing the Microsoft.EntityFrameworkCore.Proxies NuGet package, and enabling change-tracking proxies with `Microsoft.EntityFrameworkCore.ProxiesExtensions.UseChangeTrackingProxies*` For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseChangeTrackingProxies();
```

Creating a dynamic proxy involves creating a new, dynamic .NET type (using the Castle.Core proxies implementation), which inherits from the entity type and then overrides all property setters. Entity types for proxies must therefore be types that can be inherited from and must have properties that can be overridden. Also, collection navigations created explicitly must implement `System.Collections.Specialized.INotifyCollectionChanged` For example:

```csharp
public class Blog
{
    public virtual int Id { get; set; }
    public virtual string Name { get; set; }

    public virtual IList<Post> Posts { get; } = new ObservableCollection<Post>();
}

public class Post
{
    public virtual int Id { get; set; }
    public virtual string Title { get; set; }
    public virtual string Content { get; set; }

    public virtual int BlogId { get; set; }
    public virtual Blog Blog { get; set; }
}
```

One significant downside to change-tracking proxies is that EF Core must always track instances of the proxy, never instances of the underlying entity type. This is because instances of the underlying entity type will not generate notifications, which means changes made to these entities will be missed.

EF Core creates proxy instances automatically when querying the database, so this downside is generally limited to tracking new entity instances. These instances must be created using the `Microsoft.EntityFrameworkCore.ProxiesExtensions.CreateProxy*` extension methods, and **not** in the normal way using `new`. This means the code from the previous examples must now make use of `CreateProxy`:

```csharp
using var context = new BlogsContext();
var blog = await context.Blogs.Include(e => e.Posts).FirstAsync(e => e.Name == ".NET Blog");

// Change a property value
blog.Name = ".NET Blog (Updated!)";

// Add a new entity to a navigation
blog.Posts.Add(
    context.CreateProxy<Post>(
        p =>
        {
            p.Title = "What’s next for System.Text.Json?";
            p.Content = ".NET 5.0 was released recently and has come with many...";
        }));

Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

## Change tracking events

EF Core fires the `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Tracked` event when an entity is tracked for the first time. Future entity state changes result in `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.StateChanged` events. See .NET Events in EF Core for more information.

> **Note:**
> The `StateChanged` event is not fired when an entity is first tracked, even though the state has changed from `Detached` to one of the other states. Make sure to listen for both `StateChanged` and `Tracked` events to get all relevant notifications.
