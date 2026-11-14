# BrokenBarrierException class (java.util.concurrent)

```java
public class BrokenBarrierException extends Exception
```

Exception thrown when a thread tries to wait upon a barrier that is
in a broken state, or which enters the broken state while the thread
is waiting.

@see CyclicBarrier

@since 1.5
@author Doug Lea

## BrokenBarrierException.BrokenBarrierException()

```java
public BrokenBarrierException()
```

Constructs a {@code BrokenBarrierException} with no specified detail
message.

## BrokenBarrierException.BrokenBarrierException(String)

```java
public BrokenBarrierException(String message)
```

Constructs a {@code BrokenBarrierException} with the specified
detail message.

@param message the detail message