# TimerTask class (java.util)

```java
public abstract class TimerTask implements Runnable
```

A task that can be scheduled for one-time or repeated execution by a
{@link Timer}.

<p>A timer task is <em>not</em> reusable.  Once a task has been scheduled
for execution on a {@code Timer} or cancelled, subsequent attempts to
schedule it for execution will throw {@code IllegalStateException}.

@author  Josh Bloch
@since   1.3

## TimerTask.TimerTask()

```java
protected TimerTask()
```

Creates a new timer task.

## TimerTask.run()

```java
public abstract void run()
```

The action to be performed by this timer task.

## TimerTask.cancel()

```java
public boolean cancel()
```

Cancels this timer task.  If the task has been scheduled for one-time
execution and has not yet run, or has not yet been scheduled, it will
never run.  If the task has been scheduled for repeated execution, it
will never run again.  (If the task is running when this call occurs,
the task will run to completion, but will never run again.)

<p>Note that calling this method from within the {@code run} method of
a repeating timer task absolutely guarantees that the timer task will
not run again.

<p>This method may be called repeatedly; the second and subsequent
calls have no effect.

@return true if this task is scheduled for one-time execution and has
        not yet run, or this task is scheduled for repeated execution.
        Returns false if the task was scheduled for one-time execution
        and has already run, or if the task was never scheduled, or if
        the task was already cancelled.  (Loosely speaking, this method
        returns {@code true} if it prevents one or more scheduled
        executions from taking place.)

## TimerTask.scheduledExecutionTime()

```java
public long scheduledExecutionTime()
```

Returns the <i>scheduled</i> execution time of the most recent
<i>actual</i> execution of this task.  (If this method is invoked
while task execution is in progress, the return value is the scheduled
execution time of the ongoing task execution.)

<p>This method is typically invoked from within a task's run method, to
determine whether the current execution of the task is sufficiently
timely to warrant performing the scheduled activity:
<pre>{@code
  public void run() {
      if (System.currentTimeMillis() - scheduledExecutionTime() >=
          MAX_TARDINESS)
              return;  // Too late; skip this execution.
      // Perform the task
  }
}</pre>
This method is typically <i>not</i> used in conjunction with
<i>fixed-delay execution</i> repeating tasks, as their scheduled
execution times are allowed to drift over time, and so are not terribly
significant.

@return the time at which the most recent execution of this task was
        scheduled to occur, in the format returned by Date.getTime().
        The return value is undefined if the task has yet to commence
        its first execution.
@see Date#getTime()