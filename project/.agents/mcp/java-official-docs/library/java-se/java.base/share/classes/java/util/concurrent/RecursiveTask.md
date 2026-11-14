---
title: "RecursiveTask class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/RecursiveTask.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RecursiveTask class (java.util.concurrent)

```java
public abstract class RecursiveTask<V> extends ForkJoinTask<V>
```

A recursive result-bearing `ForkJoinTask`.

For example, here is a task-based program for computing Factorials:

```java
import java.util.concurrent.RecursiveTask;
import java.math.BigInteger;
public class Factorial {
  static class FactorialTask extends RecursiveTask<BigInteger> {
    private final int from, to;
    FactorialTask(int from, int to) { this.from = from; this.to = to; }
    protected BigInteger compute() {
      int range = to - from;
      if (range == 0) {                       // base case
        return BigInteger.valueOf(from);
      } else if (range == 1) {                // too small to parallelize
        return BigInteger.valueOf(from).multiply(BigInteger.valueOf(to));
      } else {                                // split in half
        int mid = from + range / 2;
        FactorialTask leftTask = new FactorialTask(from, mid);
        leftTask.fork();         // perform about half the work locally
        return new FactorialTask(mid + 1, to).compute()
               .multiply(leftTask.join());
      }
    }
  }
  static BigInteger factorial(int n) { // uses ForkJoinPool.commonPool()
    return (n <= 1) ? BigInteger.ONE : new FactorialTask(1, n).invoke();
  }
  public static void main(String[] args) {
    System.out.println(factorial(Integer.parseInt(args[0])));
  }
}
```

Parameters:

- `<V>`: the type of the result of the task

**Since:** 1.7

## RecursiveTask.RecursiveTask()

```java
public RecursiveTask()
```

Constructor for subclasses to call.

## RecursiveTask.compute()

```java
protected abstract V compute()
```

The main computation performed by this task.

**Returns:** the result of the computation

## RecursiveTask.exec()

```java
protected final boolean exec()
```

Implements execution conventions for RecursiveTask.
