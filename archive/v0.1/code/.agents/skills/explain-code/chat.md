<!-- chat:begin id=guides -->

2. Search your knowledge for the reading guide of that language.
   - Search for the embedded C idioms too when the code touches registers, bit masks, fixed-point math or interrupt handlers.
   - Search for a build-file guide only when the question is about a build file.

<!-- chat:end -->

<!-- chat:begin id=definitions -->

4. Ask the user for each definition that you need.
   - Ask in one message: "Paste the definition of `NAME`."
   - For a C or C++ macro, you can ask: "Run `gcc -E -P <file>` with the options of your build, and paste the lines around this code."
   - For a Rust macro, you can ask: "Run `cargo expand <path::to::item>` and paste the output."
   - When the user does not have the definition, continue. Add the name to the list "Not visible in this excerpt".

<!-- chat:end -->
