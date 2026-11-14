# std::sys::personality::gcc

Implementation of panics backed by libgcc/libunwind (in some form).

For background on exception handling and stack unwinding please see
"Exception Handling in LLVM" (llvm.org/docs/ExceptionHandling.html) and
documents linked from it.
These are also good reads:
 * <https://itanium-cxx-abi.github.io/cxx-abi/abi-eh.html>
 * <https://nicolasbrailo.github.io/blog/projects_texts/13exceptionsunderthehood.html>
 * <https://www.airs.com/blog/index.php?s=exception+frames>

## A brief summary

Exception handling happens in two phases: a search phase and a cleanup
phase.

In both phases the unwinder walks stack frames from top to bottom using
information from the stack frame unwind sections of the current process's
modules ("module" here refers to an OS module, i.e., an executable or a
dynamic library).

For each stack frame, it invokes the associated "personality routine", whose
address is also stored in the unwind info section.

In the search phase, the job of a personality routine is to examine
exception object being thrown, and to decide whether it should be caught at
that stack frame. Once the handler frame has been identified, cleanup phase
begins.

In the cleanup phase, the unwinder invokes each personality routine again.
This time it decides which (if any) cleanup code needs to be run for
the current stack frame. If so, the control is transferred to a special
branch in the function body, the "landing pad", which invokes destructors,
frees memory, etc. At the end of the landing pad, control is transferred
back to the unwinder and unwinding resumes.

Once stack has been unwound down to the handler frame level, unwinding stops
and the last personality routine transfers control to the catch block.