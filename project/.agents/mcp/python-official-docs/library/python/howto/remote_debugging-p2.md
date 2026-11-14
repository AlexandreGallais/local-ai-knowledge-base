---
title: "Remote debugging attachment protocol (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/remote_debugging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Remote debugging attachment protocol (part 2 of 4)

## Disabling remote debugging

To disable remote debugging support, use any of the following:

- Set the `PYTHON_DISABLE_REMOTE_DEBUG` environment variable to `1` before
starting the interpreter.
- Use the `-X disable-remote-debug` command-line option.
- Compile Python with the `--without-remote-debug` build flag.

# Permission requirements

Attaching to a running Python process for remote debugging requires special
configuration on most platforms. The specific requirements and troubleshooting
steps depend on your operating system:

**Linux**

In general, you can debug your own processes, but there are several common
configurations that may disable this. Some Linux distributions enable **ptrace
restrictions**, aka "Yama," as a form of system hardening. Recent versions of
the `setpriv` command (util-linux 2.41, released June 2025) let you loosen
ptrace restrictions on a per-process basis:

`setpriv --ptracer any python3`

(This is configured on the process *being debugged*.) You can also turn off
ptrace restrictions for all processes until reboot with:

`echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope`

This can also be configured persistently, usually in `/etc/sysctl.d`.

> **Note:** Disabling `ptrace_scope` reduces system hardening and should only be done
> in low-security environments.

It is also possible that the `ptrace` system call is disabled because of a
security filter. In particular, this was common with older versions of some
container software. Docker 19.03 or newer (released 2019) and containerd 1.6.7
or newer (released 2022) will automatically allow usage of the `ptrace`
system call inside containers, when running on Linux kernel 4.8 or higher. If
you cannot upgrade to these versions, you can create your container with an
option like `--security-opt seccomp=unconfined` to disable the system call
security filter for that container. This weakens the container's isolation and
should only be done in low-security environments.

If you need to trace a process that you *do not* own, you will need superuser
access or equivalent. This also applies to processes that have changed their
security credentials, e.g., set-user-ID or set-group-ID processes (though this
is unusual for Python). Try running the debugging command with `sudo -E`.

> **Note:** The `CAP_SYS_PTRACE` capability is equivalent to superuser access, in
> that it allows debugging *any* process, not just your own. You may see
> advice on the internet suggesting using it to work around ptrace
> restrictions or system call filters. This may work in practice, as would
> `sudo`, but this gives the debugging process much more access than it
> needs and should only be done in low-security environments.

Finally, note that a process can only have one tracer at a time. If you have
already attached to a Python process under `strace`, `gdb`, etc., you
won't be able to simultaneously use remote debugging. (Superuser access cannot
get around this restriction.)

**macOS**

By default, macOS disables the ability to debug other processes.

You can modify your Python binary to opt in to being debugged by giving it an
**ad-hoc code signature** with an **entitlement** enabling it to be debugged.
(An ad-hoc "signature" is just a configuration without any actual cryptographic
signature or a need for a certificate or anything else such as an Apple
developer program membership.)

The following commands will create a file `get-task-allow.plist` with the
necessary entitlement and add it to the Python binary:

```sh
echo '{"com.apple.security.get-task-allow": true}' | plutil -convert xml1 -o get-task-allow.plist -
codesign --sign - --entitlements get-task-allow.plist path/to/bin/python3
```

where `path/to/bin/python3` is the path to your Python binary, which you can
find by e.g. running `which python3` or evaluating `sys.base_executable` at
the Python REPL. (These instructions are for a non-framework build of Python.
Framework builds may need to be configured differently.)

You should then be able to debug your own Python processes started with that
binary.

Alternatively, much as with Linux, processes with superuser privileges e.g. `sudo`
are not subject to this check and can debug any user's process on the system
(though there are additional checks on specific binaries, such as OS-provided
commands, due to System Integrity Protection).

**Windows**

To attach to another process, you usually need to run your debugging tool
with administrative privileges. Start the command prompt or terminal as
Administrator.

Some processes may still be inaccessible even with Administrator rights,
unless you have the `SeDebugPrivilege` privilege enabled.

To resolve file or folder access issues, adjust the security permissions:

1. Right-click the file or folder and select **Properties**.
1. Go to the **Security** tab to view users and groups with access.
1. Click **Edit** to modify permissions.
1. Select your user account.
1. In **Permissions**, check **Read** or **Full control** as needed.
1. Click **Apply**, then **OK** to confirm.

> **Note:** Ensure you've satisfied all permission-requirements before proceeding.

This section describes the low-level protocol that enables external tools to
inject and execute a Python script within a running CPython process.

This mechanism forms the basis of the `sys.remote_exec()` function, which
instructs a remote Python process to execute a `.py` file. However, this
section does not document the usage of that function. Instead, it provides a
detailed explanation of the underlying protocol, which takes as input the
`pid` of a target Python process and the path to a Python source file to be
executed. This information supports independent reimplementation of the
protocol, regardless of programming language.

> **Warning:** The execution of the injected script depends on the interpreter reaching a
> safe evaluation point. As a result, execution may be delayed depending on
> the runtime state of the target process.

Once injected, the script is executed by the interpreter within the target
process the next time a safe evaluation point is reached. This approach enables
remote execution capabilities without modifying the behavior or structure of
the running Python application.

Subsequent sections provide a step-by-step description of the protocol,
including techniques for locating interpreter structures in memory, safely
accessing internal fields, and triggering code execution. Platform-specific
variations are noted where applicable, and example implementations are included
to clarify each operation.

# Locating the PyRuntime structure

CPython places the `PyRuntime` structure in a dedicated binary section to
help external tools find it at runtime. The name and format of this section
vary by platform. For example, `.PyRuntime` is used on ELF systems, and
`__DATA,__PyRuntime` is used on macOS. Tools can find the offset of this
structure by examining the binary on disk.

The `PyRuntime` structure contains CPython’s global interpreter state and
provides access to other internal data, including the list of interpreters,
thread states, and debugger support fields.

To work with a remote Python process, a debugger must first find the memory
address of the `PyRuntime` structure in the target process. This address
can’t be hardcoded or calculated from a symbol name, because it depends on
where the operating system loaded the binary.

The method for finding `PyRuntime` depends on the platform, but the steps are
the same in general:

1. Find the base address where the Python binary or shared library was loaded
in the target process.
1. Use the on-disk binary to locate the offset of the `.PyRuntime` section.
1. Add the section offset to the base address to compute the address in memory.

The sections below explain how to do this on each supported platform and
include example code.

**Linux (ELF)**

To find the `PyRuntime` structure on Linux:

1. Read the process’s memory map (for example, `/proc/<pid>/maps`) to find
the address where the Python executable or `libpython` was loaded.
1. Parse the ELF section headers in the binary to get the offset of the
`.PyRuntime` section.
1. Add that offset to the base address from step 1 to get the memory address of
`PyRuntime`.

The following is an example implementation:

```
def find_py_runtime_linux(pid: int) -> int:
    # Step 1: Try to find the Python executable in memory
    binary_path, base_address = find_mapped_binary(
        pid, name_contains="python"
    )

    # Step 2: Fallback to shared library if executable is not found
    if binary_path is None:
        binary_path, base_address = find_mapped_binary(
            pid, name_contains="libpython"
        )

    # Step 3: Parse ELF headers to get .PyRuntime section offset
    section_offset = parse_elf_section_offset(
        binary_path, ".PyRuntime"
    )

    # Step 4: Compute PyRuntime address in memory
    return base_address + section_offset
```

On Linux systems, there are two main approaches to read memory from another
process. The first is through the `/proc` filesystem, specifically by reading from
`/proc/[pid]/mem` which provides direct access to the process's memory. This
requires appropriate permissions - either being the same user as the target
process or having root access. The second approach is using the
`process_vm_readv()` system call which provides a more efficient way to copy
memory between processes. While ptrace's `PTRACE_PEEKTEXT` operation can also be
used to read memory, it is significantly slower as it only reads one word at a
time and requires multiple context switches between the tracer and tracee
processes.

For parsing ELF sections, the process involves reading and interpreting the ELF
file format structures from the binary file on disk. The ELF header contains a
pointer to the section header table. Each section header contains metadata about
a section including its name (stored in a separate string table), offset, and
size. To find a specific section like .PyRuntime, you need to walk through these
headers and match the section name. The section header then provides the offset
where that section exists in the file, which can be used to calculate its
runtime address when the binary is loaded into memory.

You can read more about the ELF file format in the `ELF specification
<https://en.wikipedia.org/wiki/Executable_and_Linkable_Format>`_.

**macOS (Mach-O)**

To find the `PyRuntime` structure on macOS:

1. Call `task_for_pid()` to get the `mach_port_t` task port for the target
process. This handle is needed to read memory using APIs like
`mach_vm_read_overwrite` and `mach_vm_region`.
1. Scan the memory regions to find the one containing the Python executable or
`libpython`.
1. Load the binary file from disk and parse the Mach-O headers to find the
section named `PyRuntime` in the `__DATA` segment.  On macOS, symbol
names are automatically prefixed with an underscore, so the `PyRuntime`
symbol appears as `_PyRuntime` in the symbol table, but the section name
is not affected.

The following is an example implementation:

```
def find_py_runtime_macos(pid: int) -> int:
    # Step 1: Get access to the process's memory
    handle = get_memory_access_handle(pid)

    # Step 2: Try to find the Python executable in memory
    binary_path, base_address = find_mapped_binary(
        handle, name_contains="python"
    )

    # Step 3: Fallback to libpython if the executable is not found
    if binary_path is None:
        binary_path, base_address = find_mapped_binary(
            handle, name_contains="libpython"
        )

    # Step 4: Parse Mach-O headers to get __DATA,__PyRuntime section offset
    section_offset = parse_macho_section_offset(
        binary_path, "__DATA", "__PyRuntime"
    )

    # Step 5: Compute the PyRuntime address in memory
    return base_address + section_offset
```

On macOS, accessing another process's memory requires using Mach-O specific APIs
and file formats. The first step is obtaining a `task_port` handle via
`task_for_pid()`, which provides access to the target process's memory space.
This handle enables memory operations through APIs like
`mach_vm_read_overwrite()`.

The process memory can be examined using `mach_vm_region()` to scan through the
virtual memory space, while `proc_regionfilename()` helps identify which binary
files are loaded at each memory region. When the Python binary or library is
found, its Mach-O headers need to be parsed to locate the `PyRuntime` structure.

The Mach-O format organizes code and data into segments and sections. The
`PyRuntime` structure lives in a section named `__PyRuntime` within the
`__DATA` segment. The actual runtime address calculation involves finding the
`__TEXT` segment which serves as the binary's base address, then locating the
`__DATA` segment containing our target section. The final address is computed by
combining the base address with the appropriate section offsets from the Mach-O
headers.

Note that accessing another process's memory on macOS typically requires
elevated privileges - either root access or special security entitlements
granted to the debugging process.

**Windows (PE)**

To find the `PyRuntime` structure on Windows:

1. Use the ToolHelp API to enumerate all modules loaded in the target process.
This is done using functions such as `CreateToolhelp32Snapshot
<https://learn.microsoft.com/en-us/windows/win32/api/tlhelp32/nf-tlhelp32-createtoolhelp32snapshot>`_,
`Module32First
<https://learn.microsoft.com/en-us/windows/win32/api/tlhelp32/nf-tlhelp32-module32first>`_,
and `Module32Next
<https://learn.microsoft.com/en-us/windows/win32/api/tlhelp32/nf-tlhelp32-module32next>`_.
1. Identify the module corresponding to `python.exe` or
`python{XY}.dll`, where `X` and `Y` are the major and minor
version numbers of the Python version, and record its base address.
1. Locate the `PyRuntim` section. Due to the PE format's 8-character limit
on section names (defined as `IMAGE_SIZEOF_SHORT_NAME`), the original
name `PyRuntime` is truncated. This section contains the `PyRuntime`
structure.
1. Retrieve the section’s relative virtual address (RVA) and add it to the base
address of the module.

The following is an example implementation:
