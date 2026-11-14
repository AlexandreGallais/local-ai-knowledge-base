# ThreadDeath class (java.lang)

```java
public class ThreadDeath extends Error
```

An instance of {@code ThreadDeath} was originally specified to be thrown
by a victim thread when "stopped" with {@link Thread#stop()}.

@deprecated {@link Thread#stop()} was originally specified to "stop" a victim
     thread by causing the victim thread to throw a {@code ThreadDeath}. It
     was inherently unsafe and deprecated in an early JDK release. The ability
     to "stop" a thread with {@code Thread.stop} has been removed and the
     {@code Thread.stop} method changed to throw an exception. Consequently,
     {@code ThreadDeath} is also deprecated, for removal.

@since   1.0

## ThreadDeath.ThreadDeath()

```java
public ThreadDeath()
```

Constructs a {@code ThreadDeath}.