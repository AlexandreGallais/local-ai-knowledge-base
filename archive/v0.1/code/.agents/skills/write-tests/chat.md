<!-- chat:begin id=read -->

2. Ask the user for the runner of the project: the `"runner"` line of `global.json` and the test package of the test project for C#, or the `test` target of `angular.json` for Angular. Ask for one existing test of the project.
3. Search the knowledge for the rules and the old-to-new table of the stack.

<!-- chat:end -->

<!-- chat:begin id=run -->

6. Show the tests as code, with the file to put them in.
7. Give the user the command that runs only these tests, from the knowledge, and ask for the end of its output.
8. When the user pastes a failure, decide from the request whether the code or the test is wrong. Show the fix of the code; change a test only when it contradicts the request.
9. Give the command that runs all the tests.

<!-- chat:end -->
