---
title: "Debugging C API extensions and CPython Internals with GDB (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/gdb_helpers.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Debugging C API extensions and CPython Internals with GDB (part 3 of 3)

## Use with GDB commands

The extension commands complement GDB's built-in commands.
For example, you can use a frame numbers shown by `py-bt` with the `frame`
command to go a specific frame within the selected thread, like this:

```
(gdb) py-bt
(output snipped)
#68 Frame 0xaa4560, for file Lib/test/regrtest.py, line 1548, in <module> ()
        main()
(gdb) frame 68
#68 0x00000000004cd1e6 in PyEval_EvalFrameEx (f=Frame 0xaa4560, for file Lib/test/regrtest.py, line 1548, in <module> (), throwflag=0) at Python/ceval.c:2665
2665                            x = call_function(&sp, oparg);
(gdb) py-list
1543        # Run the tests in a context manager that temporary changes the CWD to a
1544        # temporary and writable directory. If it's not possible to create or
1545        # change the CWD, the original CWD will be used. The original CWD is
1546        # available from test_support.SAVEDCWD.
1547        with test_support.temp_cwd(TESTCWD, quiet=True):
>1548            main()
```

The `info threads` command will give you a list of the threads within the
process, and you can use the `thread` command to select a different one:

```
(gdb) info threads
  105 Thread 0x7fffefa18710 (LWP 10260)  sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:86
  104 Thread 0x7fffdf5fe710 (LWP 10259)  sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:86
* 1 Thread 0x7ffff7fe2700 (LWP 10145)  0x00000038e46d73e3 in select () at ../sysdeps/unix/syscall-template.S:82
```

You can use `thread apply all COMMAND` or (`t a a COMMAND` for short) to run
a command on all threads.  With `py-bt`, this lets you see what every
thread is doing at the Python level:

```
(gdb) t a a py-bt

Thread 105 (Thread 0x7fffefa18710 (LWP 10260)):
#5 Frame 0x7fffd00019d0, for file /home/david/coding/python-svn/Lib/threading.py, line 155, in _acquire_restore (self=<_RLock(_Verbose__verbose=False, _RLock__owner=140737354016512, _RLock__block=<thread.lock at remote 0x858770>, _RLock__count=1) at remote 0xd7ff40>, count_owner=(1, 140737213728528), count=1, owner=140737213728528)
        self.__block.acquire()
#8 Frame 0x7fffac001640, for file /home/david/coding/python-svn/Lib/threading.py, line 269, in wait (self=<_Condition(_Condition__lock=<_RLock(_Verbose__verbose=False, _RLock__owner=140737354016512, _RLock__block=<thread.lock at remote 0x858770>, _RLock__count=1) at remote 0xd7ff40>, acquire=<instancemethod at remote 0xd80260>, _is_owned=<instancemethod at remote 0xd80160>, _release_save=<instancemethod at remote 0xd803e0>, release=<instancemethod at remote 0xd802e0>, _acquire_restore=<instancemethod at remote 0xd7ee60>, _Verbose__verbose=False, _Condition__waiters=[]) at remote 0xd7fd10>, timeout=None, waiter=<thread.lock at remote 0x858a90>, saved_state=(1, 140737213728528))
            self._acquire_restore(saved_state)
#12 Frame 0x7fffb8001a10, for file /home/david/coding/python-svn/Lib/test/lock_tests.py, line 348, in f ()
            cond.wait()
#16 Frame 0x7fffb8001c40, for file /home/david/coding/python-svn/Lib/test/lock_tests.py, line 37, in task (tid=140737213728528)
                f()

Thread 104 (Thread 0x7fffdf5fe710 (LWP 10259)):
#5 Frame 0x7fffe4001580, for file /home/david/coding/python-svn/Lib/threading.py, line 155, in _acquire_restore (self=<_RLock(_Verbose__verbose=False, _RLock__owner=140737354016512, _RLock__block=<thread.lock at remote 0x858770>, _RLock__count=1) at remote 0xd7ff40>, count_owner=(1, 140736940992272), count=1, owner=140736940992272)
        self.__block.acquire()
#8 Frame 0x7fffc8002090, for file /home/david/coding/python-svn/Lib/threading.py, line 269, in wait (self=<_Condition(_Condition__lock=<_RLock(_Verbose__verbose=False, _RLock__owner=140737354016512, _RLock__block=<thread.lock at remote 0x858770>, _RLock__count=1) at remote 0xd7ff40>, acquire=<instancemethod at remote 0xd80260>, _is_owned=<instancemethod at remote 0xd80160>, _release_save=<instancemethod at remote 0xd803e0>, release=<instancemethod at remote 0xd802e0>, _acquire_restore=<instancemethod at remote 0xd7ee60>, _Verbose__verbose=False, _Condition__waiters=[]) at remote 0xd7fd10>, timeout=None, waiter=<thread.lock at remote 0x858860>, saved_state=(1, 140736940992272))
            self._acquire_restore(saved_state)
#12 Frame 0x7fffac001c90, for file /home/david/coding/python-svn/Lib/test/lock_tests.py, line 348, in f ()
            cond.wait()
#16 Frame 0x7fffac0011c0, for file /home/david/coding/python-svn/Lib/test/lock_tests.py, line 37, in task (tid=140736940992272)
                f()

Thread 1 (Thread 0x7ffff7fe2700 (LWP 10145)):
#5 Frame 0xcb5380, for file /home/david/coding/python-svn/Lib/test/lock_tests.py, line 16, in _wait ()
    time.sleep(0.01)
#8 Frame 0x7fffd00024a0, for file /home/david/coding/python-svn/Lib/test/lock_tests.py, line 378, in _check_notify (self=<ConditionTests(_testMethodName='test_notify', _resultForDoCleanups=<TestResult(_original_stdout=<cStringIO.StringO at remote 0xc191e0>, skipped=[], _mirrorOutput=False, testsRun=39, buffer=False, _original_stderr=<file at remote 0x7ffff7fc6340>, _stdout_buffer=<cStringIO.StringO at remote 0xc9c7f8>, _stderr_buffer=<cStringIO.StringO at remote 0xc9c790>, _moduleSetUpFailed=False, expectedFailures=[], errors=[], _previousTestClass=<type at remote 0x928310>, unexpectedSuccesses=[], failures=[], shouldStop=False, failfast=False) at remote 0xc185a0>, _threads=(0,), _cleanups=[], _type_equality_funcs={<type at remote 0x7eba00>: <instancemethod at remote 0xd750e0>, <type at remote 0x7e7820>: <instancemethod at remote 0xd75160>, <type at remote 0x7e30e0>: <instancemethod at remote 0xd75060>, <type at remote 0x7e7d20>: <instancemethod at remote 0xd751e0>, <type at remote 0x7f19e0...(truncated)
        _wait()
```
