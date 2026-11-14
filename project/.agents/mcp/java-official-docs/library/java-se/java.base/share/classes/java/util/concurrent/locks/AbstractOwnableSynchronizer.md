# AbstractOwnableSynchronizer class (java.util.concurrent.locks)

```java
public abstract class AbstractOwnableSynchronizer implements java.io.Serializable
```

A synchronizer that may be exclusively owned by a thread.  This
class provides a basis for creating locks and related synchronizers
that may entail a notion of ownership.  The
{@code AbstractOwnableSynchronizer} class itself does not manage or
use this information. However, subclasses and tools may use
appropriately maintained values to help control and monitor access
and provide diagnostics.

@since 1.6
@author Doug Lea

## AbstractOwnableSynchronizer.AbstractOwnableSynchronizer()

```java
protected AbstractOwnableSynchronizer()
```

Empty constructor for use by subclasses.

## AbstractOwnableSynchronizer.setExclusiveOwnerThread(Thread)

```java
protected final void setExclusiveOwnerThread(Thread thread)
```

Sets the thread that currently owns exclusive access.
A {@code null} argument indicates that no thread owns access.
This method does not otherwise impose any synchronization or
{@code volatile} field accesses.
@param thread the owner thread

## AbstractOwnableSynchronizer.getExclusiveOwnerThread()

```java
protected final Thread getExclusiveOwnerThread()
```

Returns the thread last set by {@code setExclusiveOwnerThread},
or {@code null} if never set.  This method does not otherwise
impose any synchronization or {@code volatile} field accesses.
@return the owner thread