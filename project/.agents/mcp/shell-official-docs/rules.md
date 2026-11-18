# Official documentation of shell scripting

1. Before you write or explain a shell script, a command line or a PowerShell script, look up what you are not sure of with the `shell-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds the Bash Reference Manual, the manual page of dash (POSIX sh), the GNU manuals of coreutils, sed, grep and find, ShellCheck, the Google Shell Style Guide, the tldr pages (Linux, Windows, common), Bats, shfmt and PowerShell 7.5.
3. Search a builtin or a command by its name, as `getopts`, `trap` or `xargs`; a PowerShell cmdlet by its name, as `Get-ChildItem`; a short example of a command with `tool: "tldr"`.
4. For a script that must run under `sh`, check each construct in the manual page of dash: Bash adds what POSIX sh does not have.
5. Read one section at a time. Never read the folder `.agents/mcp/shell-official-docs/library/` by hand.
