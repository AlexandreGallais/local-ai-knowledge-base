<!-- chat:begin id=analyze -->

2. Check the code against the C# rule documents of the knowledge. Fix what breaks a rule. Show the fixed code.
3. Give the user these commands to run, in this order: `bash scripts/format-csharp.sh`, then `dotnet build --no-restore -tl:off -nologo -v:q`.
4. Ask the user to paste the output lines that contain `error`.
5. For each pasted error: name its ID, give the cause in one sentence, and show the fixed code.
6. Ask the user to run the commands again. Repeat until the user reports zero errors.

<!-- chat:end -->
