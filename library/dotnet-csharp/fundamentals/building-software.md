---
title: "Building software"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/building-software/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build software

Often several algorithms or implementations can solve the same task correctly. The code you choose communicates a design. Developers and coding agents who read your code use its structure to infer your intent: what each operation needs, where it belongs, and when it runs.

> **Tip:**
> This article is part of the **Fundamentals** section for developers who know basic C# expressions, statements, and methods. If you're new to programming, start with the Get started tutorials first.

This section compares valid approaches to algorithms and explains subtle differences in their behavior and how readers interpret them. You'll combine familiar language elements, such as types, expressions, statements, and methods, and choose forms that communicate the design you intend.

## Compare behavior and design intent

Before choosing an implementation, consider how other code will use it. That code is the *caller*: it supplies inputs, invokes your operation, and uses the results. Does it need a completed result immediately, or can it process values one at a time? Is a helper part of this operation alone, or will other operations use it too? These questions help you compare both the behavior you need and the design your code communicates.

A short inline operation shows readers the steps at the point of use. For example, `Where(task => task.Priority > 3)` makes the filtering rule immediately visible. A named helper, as in `Where(IsUrgent)`, emphasizes the rule's purpose and lets readers inspect its details separately. Choose based on whether the steps or their purpose best explain the surrounding code.

Where you declare a helper communicates its intended scope. A local function inside `ShowDashboard` indicates that the helper belongs to that operation and prevents other members from calling it. A private method on the containing type makes the helper available to other members, suggesting that you expect reuse elsewhere in the type. Both can organize the same calculation, but they lead readers to different expectations about its role.

How you supply a helper's inputs communicates its dependencies. Passing a limit as a parameter, such as `IsUrgent(task, minimumPriority)`, makes that input visible at each call. A local function or lambda can instead *capture* `minimumPriority`, using the variable from its surrounding scope without receiving it as an argument. Capture connects the helper to the containing operation's context; explicit parameters make the supplied data easier to identify. Use a `static` local function or lambda when you want to enforce that it doesn't capture surrounding state.

How you return results communicates when the work happens. A method that builds and returns a collection completes that work before the caller receives the collection. An iterator produces elements as the caller requests them, so the caller can stop before all elements are produced. Both might produce the same values, but callers need to understand whether they're receiving completed results or a sequence whose computation still lies ahead.

For each choice, first identify the behavior the calling code needs. Then consider what another developer or coding agent will infer from the name, scope, inputs, and result. Choose a form that makes those expectations match your design, and explain important behavior that the code's shape alone doesn't reveal. The goal is to make a deliberate choice between valid alternatives, not to apply one form everywhere.

## Read design choices in an example

The following example illustrates how several choices communicate different parts of a design. It displays tasks that are urgent and ready to start. A `ProjectTask` holds a task's title, priority, and blocked status.

```csharp
var tasks = new[]
{
    new ProjectTask("Confirm venue", Priority: 3, IsBlocked: false),
    new ProjectTask("Print badges", Priority: 2, IsBlocked: true),
    new ProjectTask("Test microphones", Priority: 2, IsBlocked: false),
};

ShowDashboard("Community meetup", tasks, minimumPriority: 2);

static void ShowDashboard(
    string projectName,
    IEnumerable<ProjectTask> tasks,
    int minimumPriority)
{
    var urgentTasks = tasks.Where(
        task => task.Priority >= minimumPriority);

    foreach (ProjectTask task in ReadyTasks(urgentTasks))
    {
        Console.WriteLine(FormatTask(task));
    }

    string FormatTask(ProjectTask task) =>
        $"{projectName}: {task.Title}";
}

static IEnumerable<ProjectTask> ReadyTasks(
    IEnumerable<ProjectTask> tasks)
{
    foreach (ProjectTask task in tasks)
    {
        if (!task.IsBlocked)
        {
            yield return task;
        }
    }
}

record ProjectTask(string Title, int Priority, bool IsBlocked);
```
Each choice keeps a different part of the work clear:

- The lambda passed to `Where` puts a short priority rule beside the operation that uses it.
- The local function `FormatTask` names a formatting step that belongs only to `ShowDashboard`.
- The iterator `ReadyTasks` lets callers consume ready tasks without creating an intermediate collection.
- The `foreach` loop makes the final action, writing each result, explicit.

For comparison, `Where(static task => !task.IsBlocked)` could replace `ReadyTasks` because this readiness test is a simple filter. Both forms defer the filter until enumeration. The lambda puts the rule at the call site; `ReadyTasks` gives the rule a name. Choose between them based on which information helps readers understand the caller.

The articles that follow use comparisons like these to explain when each approach fits and what readers can infer from your choice.

## Next steps

- Tutorial: Combine C# techniques to generate badge labels
- Pass <example-value> with lambda expressions
- Organize helper logic with local functions
- Produce sequences with iterators
