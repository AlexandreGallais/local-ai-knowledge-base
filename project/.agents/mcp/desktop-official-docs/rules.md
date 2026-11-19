# Official documentation of desktop applications

1. When your memory of Electron, Tauri or of building for Windows is not sure, look it up with the `desktop-official-docs` server: `search_docs`, then `read_doc` on one section.
2. It holds Electron, electron-builder, Electron Packager, Rebuild, Fuses and ASAR, Tauri 2, cross and cargo-xwin, Wine and its tools, NSIS, WiX and MSIX.
3. Search an Electron API by its name, as `BrowserWindow` or `contextBridge`; an electron-builder target by its name, as `nsis` or `appx`; a Tauri setting by its file, as `tauri.conf.json`.
4. Check the version of Electron or Tauri in the project's `package.json` or `Cargo.toml` before you write code: an API may differ from the version of this documentation.
5. Read one section at a time. Never read the folder `.agents/mcp/desktop-official-docs/library/` by hand.
