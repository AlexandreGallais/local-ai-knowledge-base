# javamem

```octave
function jmem = javamem ()
```

@deftypefn  {} {} javamem ()
@deftypefnx {} {@var{jmem} =} javamem ()
Show the current memory usage of the Java virtual machine (JVM) and run the
garbage collector.

When no return argument is given the info is printed to the screen.
Otherwise, the output cell array @var{jmem} contains Maximum, Total, and
Free memory (in bytes).

All Java-based routines are run in the JVM's shared memory pool, a
dedicated and separate part of memory claimed by the JVM from your
computer's total memory (which comprises physical RAM and virtual memory /
swap space on hard disk).

The maximum allowable memory usage can be configured using the file
@file{java.opts}.  The directory where this file resides is determined by
the environment variable @w{@env{OCTAVE_JAVA_DIR}}.  If unset, the directory
where @file{javaaddpath.m} resides is used instead (typically
@file{@w{@env{OCTAVE_HOME}}/share/octave/@w{@env{OCTAVE_VERSION}}/m/java/}).

@file{java.opts} is a plain text file with one option per line.  The default
initial memory size and default maximum memory size (which are both system
dependent) can be overridden like so:

@nospell{-Xms64m}

@nospell{-Xmx512m}

(in megabytes in this example).
You can adapt these values to your own requirements if your system has
limited available physical memory or if you get Java memory errors.

@qcode{"Total memory"} is what the operating system has currently assigned
to the JVM and depends on actual and active memory usage.
@qcode{"Free memory"} is self-explanatory.  During operation of Java-based
Octave functions the amount of Total and Free memory will vary, due to
Java's own cleaning up and your operating system's memory management.
@end deftypefn
