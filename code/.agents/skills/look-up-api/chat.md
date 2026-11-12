<!-- chat:begin id=lookup -->

3. Say that you cannot read the project files in this chat.
4. Ask the user for the installed version. Give the exact command, for example `npm ls @angular/core` or `dotnet --list-sdks`.
5. Ask the user to search with one narrow pattern and to paste about 20 lines around the match. For example: `grep -rn --include="*.d.ts" "declare function signal" node_modules/@angular/core/`
6. For a command option, ask the user to run `<tool> <command> --help` and to paste the output.
7. Answer only from the pasted text and from the documents of the knowledge. If the pasted text does not answer the question, say so.

<!-- chat:end -->
