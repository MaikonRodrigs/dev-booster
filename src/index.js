import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import readline from "readline/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Source: the `template/` folder shipped inside the npm package
const TEMPLATE_DIR = path.resolve(__dirname, "..", "template");

// Destination: the user's current working directory (where they ran npx)
const TARGET_DIR = process.cwd();
const args = process.argv.slice(2);
const GITIGNORE_BLOCK = ["# DEV-BOOSTER", ".devbooster/", "DEVBOOSTER_INIT.md"];
const GITIGNORE_MARKER = "# DEV-BOOSTER";
const IDE_BRIDGE_BLOCK = [
  "# 🤖 DEV BOOSTER — AGENTIC KIT BOOTSTRAP",
  "",
  "Before any action, read `.devbooster/rules/PROTOCOL.md` for full governance rules.",
  "For `@Obsidian` search, retrieval, reading, summary, historical investigation, or explanation, use only Obsidian MCP search/read operations. Do not inspect the local project or run local tools unless the user explicitly requests a comparison with identified current code or a named project.",
];
const IDE_BRIDGE_MARKER = ".devbooster/rules/PROTOCOL.md";

const AGENTS_TRIGGER_BLOCK = [
  "",
  "## Instant Triggers",
  "",
  "You can instantly activate any Dev Booster behavior by typing the corresponding `@` trigger in chat.",
  "",
  "**Important:** A trigger activates the booster's contract mode only (Armed/Stage 0).",
  "It does NOT authorize the booster to analyze, investigate, or modify the project.",
  "For `@Obsidian` search/read requests, use only Obsidian MCP operations; project inspection requires an explicit comparison request.",
  "After activation, provide the concrete task or symptom before the booster proceeds.",
  "",
  "Read `.devbooster/rules/TRIGGERS.md` for the complete trigger dictionary.",
  "",
  "Common examples:",
  "- `@Frontend` — activate frontend specialist",
  "- `@Backend` — activate backend architect",
  "- `@Debug` — systematic root cause analysis",
  "- `@Audit` — lint and typecheck audit",
  "- `@Refactor` — clean code and SOLID refactoring",
  "- `@Performance` — Web Vitals and optimization",
  "- `@Testing` — test strategy and coordination",
  "- `@Advisor` — kit GPS to choose the right booster",
];
const AGENTS_TRIGGER_MARKER = "TRIGGERS.md";
const IDE_BRIDGE_FALLBACK_FLAG = path.join("hub", "flags", "needs-ide-bridge");
const IDE_BRIDGE_TARGETS = [
  ".rules",
  ".cursorrules",
  ".windsurfrules",
  ".clinerules",
  "AGENT.md",
  "AGENTS.md",
  "CLAUDE.md",
  "GEMINI.md",
  ".github/copilot-instructions.md",
];

const PROTECTED_FILES = [
  "DEVBOOSTER_INIT.md",
  ".devbooster/rules/PROJECT.md",
  ".devbooster/rules/FRONTEND.md",
  ".devbooster/rules/BACKEND.md",
  ".devbooster/rules/COMMERCIAL.md",
  ".devbooster/rules/USER_PREFERENCES.md",
  ".devbooster/rules/CODEBASE.md",
];

function safeCopyFile(src, dest, dryRun = false) {
  const relativeDest = path.relative(TARGET_DIR, dest);
  if (fs.existsSync(dest) && PROTECTED_FILES.includes(relativeDest)) {
    return false; // Preserved
  }
  if (!dryRun) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
  return true; // Copied/Updated
}

function copyDirSafe(src, dest, dryRun = false) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSafe(srcPath, destPath, dryRun);
    } else {
      safeCopyFile(srcPath, destPath, dryRun);
    }
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function removeDirContents(targetDir) {
  if (!fs.existsSync(targetDir)) return;

  for (const entry of fs.readdirSync(targetDir, { withFileTypes: true })) {
    const entryPath = path.join(targetDir, entry.name);
    fs.rmSync(entryPath, { recursive: true, force: true });
  }
}

function syncDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  removeDirContents(dest);
  copyDir(src, dest);
}

function isDryRunMode() {
  return args.includes("--dry-run") || args.includes("dry-run");
}

function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

function appendUniqueBlock(filePath, blockLines, marker, dryRun = false) {
  const existing = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (existing.includes(marker)) {
    return false;
  }

  if (!dryRun) {
    const trimmedEnd = existing.replace(/\s*$/, "");
    const prefix = trimmedEnd.length > 0 ? `${trimmedEnd}\n\n` : "";
    const nextContent = `${prefix}${blockLines.join("\n")}\n`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, nextContent);
  }
  return true;
}

async function askYesNo(question, defaultYes = true) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return defaultYes;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const suffix = defaultYes ? " (Y/n) " : " (y/N) ";
    const answer = (await rl.question(`${question}${suffix}`))
      .trim()
      .toLowerCase();

    if (!answer) return defaultYes;
    if (answer === "y" || answer === "yes") return true;
    if (answer === "n" || answer === "no") return false;
    return defaultYes;
  } finally {
    rl.close();
  }
}

async function maybeAddDevBoosterToGitignore(dryRun) {
  const shouldIgnore = await askYesNo(
    "Add Dev Booster to your .gitignore?",
    true,
  );

  if (!shouldIgnore) {
    console.log("▸ .gitignore");
    console.log("  status: skipped by user\n");
    return;
  }

  const gitignorePath = path.join(TARGET_DIR, ".gitignore");
  const changed = appendUniqueBlock(
    gitignorePath,
    GITIGNORE_BLOCK,
    GITIGNORE_MARKER,
    dryRun,
  );

  console.log("▸ .gitignore");
  if (changed) {
    console.log(`  status: ${dryRun ? "would be updated" : "updated"}`);
    console.log("  entries: # DEV-BOOSTER, .devbooster/, DEVBOOSTER_INIT.md\n");
  } else {
    console.log("  status: already configured");
    console.log("  entries: # DEV-BOOSTER, .devbooster/, DEVBOOSTER_INIT.md\n");
  }
}

function writeIdeBridgeFallbackFlag() {
  const flagPath = path.join(
    TARGET_DIR,
    ".devbooster",
    IDE_BRIDGE_FALLBACK_FLAG,
  );
  fs.mkdirSync(path.dirname(flagPath), { recursive: true });
  fs.writeFileSync(flagPath, "create AGENTS.md fallback bridge\n");
}

function clearIdeBridgeFallbackFlag() {
  const flagPath = path.join(
    TARGET_DIR,
    ".devbooster",
    IDE_BRIDGE_FALLBACK_FLAG,
  );
  if (fs.existsSync(flagPath)) {
    fs.rmSync(flagPath, { force: true });
  }
}

function setupIdeBridgeFiles(dryRun) {
  const touchedFiles = [];

  for (const relativeTarget of IDE_BRIDGE_TARGETS) {
    const targetPath = path.join(TARGET_DIR, relativeTarget);
    if (!fs.existsSync(targetPath)) continue;

    const wouldChange = appendUniqueBlock(
      targetPath,
      IDE_BRIDGE_BLOCK,
      IDE_BRIDGE_MARKER,
      dryRun,
    );
    if (wouldChange) touchedFiles.push(relativeTarget);
  }

  console.log("▸ IDE bridge files");
  if (touchedFiles.length > 0) {
    if (!dryRun) clearIdeBridgeFallbackFlag();
    console.log(
      `  status: bridge instructions ${dryRun ? "would be appended" : "appended"} where applicable`,
    );
    console.log(`  files: ${touchedFiles.join(", ")}\n`);
    return;
  }

  if (!dryRun) writeIdeBridgeFallbackFlag();
  console.log("  status: no known IDE instruction file found");
  console.log(
    `  action: bootstrap fallback flag ${dryRun ? "would be created" : "created"} for DEVBOOSTER_INIT.md\n`,
  );
}

function ensureAgentsTriggers(dryRun) {
  const agentsPath = path.join(TARGET_DIR, "AGENTS.md");

  if (!fs.existsSync(agentsPath)) {
    if (!dryRun) {
      const fullBlock = [
        "# 🤖 DEV BOOSTER — AGENTIC KIT BOOTSTRAP",
        "",
        "Before any action, read `.devbooster/rules/PROTOCOL.md` for full governance rules.",
        ...AGENTS_TRIGGER_BLOCK,
        "",
      ];
      fs.writeFileSync(agentsPath, fullBlock.join("\n"));
    }
    console.log(
      `  status: ${dryRun ? "would be created" : "created"} with protocol + triggers`,
    );
    return;
  }

  const existing = fs.readFileSync(agentsPath, "utf8");
  if (existing.includes(AGENTS_TRIGGER_MARKER)) {
    console.log("  status: triggers already present (preserved)");
    return;
  }

  if (!dryRun) {
    const updated =
      existing.trimEnd() + "\n\n" + AGENTS_TRIGGER_BLOCK.join("\n") + "\n";
    fs.writeFileSync(agentsPath, updated);
  }
  console.log(
    `  status: triggers section ${dryRun ? "would be appended" : "appended"}`,
  );
}

function checkLocalInstall() {
  try {
    const localPkg = path.join(
      TARGET_DIR,
      "node_modules",
      "dev-booster",
      "package.json",
    );
    if (fs.existsSync(localPkg)) {
      const pkg = JSON.parse(fs.readFileSync(localPkg, "utf8"));
      console.log(
        `\n⚠️  Dev Booster detected as a local dependency (npm i dev-booster) version ${pkg.version}.`,
      );
      console.log("   Removing local dependency to avoid version conflicts...");
      console.log();
      execSync("npm uninstall dev-booster", {
        cwd: TARGET_DIR,
        stdio: "inherit",
      });
      console.log("\n✔ Local dependency removed successfully.");
      console.log(
        "   Always use npx --yes dev-booster@latest to get the latest version.\n",
      );
    }
  } catch {
    // Silently ignore if we cannot read the local package or uninstall fails
  }
}

function printHeader(subtitle) {
  console.log(`
╭──────────────────────────────────────────────╮
│               DEV BOOSTER                    │
│ ${subtitle.padEnd(44)} │
╰──────────────────────────────────────────────╯
`);
}

async function runInstall() {
  const dryRun = isDryRunMode();
  printHeader("agentic kit installer");
  if (dryRun) console.log("🔍 [DRY RUN MODE] No real changes will be made.\n");

  const agentSrc = path.join(TEMPLATE_DIR, ".devbooster");
  const agentDest = path.join(TARGET_DIR, ".devbooster");

  const boostersCount = fs.existsSync(path.join(agentSrc, "boosters"))
    ? fs
        .readdirSync(path.join(agentSrc, "boosters"))
        .filter((f) => f !== ".DS_Store" && f !== "templates").length
    : 28;
  const hubCount = fs.existsSync(path.join(agentSrc, "hub", "scripts"))
    ? fs
        .readdirSync(path.join(agentSrc, "hub", "scripts"))
        .filter((f) => f !== ".DS_Store").length
    : 21;

  const isOverlap = fs.existsSync(agentDest);

  if (isOverlap) {
    console.log("▸ Existing Kit Detected:");
    console.log(
      `  ├── boosters/     ➔ ${boostersCount} expert activators updated successfully`,
    );
    console.log(
      `  ├── hub/          ➔ ${hubCount} operational scripts updated successfully`,
    );
    console.log(
      "  └── rules/        ➔ Core rules updated, project rules preserved",
    );
    console.log("                    ✔ PROTOCOL.md  (updated)");
    console.log("                    ✔ GUIDE.md     (updated)");
    console.log("                    ✔ TRIGGERS.md  (updated)");
    console.log(
      "                    ℹ PROJECT.md, FRONTEND.md, BACKEND.md, etc. (preserved)\n",
    );
  } else {
    console.log("▸ Installing Kit Structure:");
    console.log(
      `  ├── boosters/     ➔ ${boostersCount} expert activators created successfully`,
    );
    console.log(
      `  ├── hub/          ➔ ${hubCount} operational scripts created successfully`,
    );
    console.log("  └── rules/        ➔ Core rules and templates initialized");
    console.log("                    ✔ 8 rules created\n");
  }

  copyDirSafe(agentSrc, agentDest, dryRun);

  // 2. Drop DEVBOOSTER_INIT.md at the root of the user's project safely
  const initSrc = path.join(TEMPLATE_DIR, "DEVBOOSTER_INIT.md");
  const initDest = path.join(TARGET_DIR, "DEVBOOSTER_INIT.md");

  const copiedInit = safeCopyFile(initSrc, initDest, dryRun);
  console.log("▸ DEVBOOSTER_INIT.md");
  if (copiedInit) {
    console.log(
      `  status: ${dryRun ? "would be created" : "created"} at project root\n`,
    );
  } else {
    console.log("  status: already exists (preserved)\n");
  }

  await maybeAddDevBoosterToGitignore(dryRun);
  setupIdeBridgeFiles(dryRun);
  ensureAgentsTriggers(dryRun);

  console.log(`
╭──────────────────────────────────────────────╮
│                   NEXT STEP                  │
╰──────────────────────────────────────────────╯

Open your AI assistant in this project and send:

  "Read DEVBOOSTER_INIT.md and execute all bootstrap steps."

The kit will configure itself based on your project's stack.
`);
}

function runUpdate() {
  const dryRun = isDryRunMode();
  printHeader("safe kit update");
  if (dryRun) console.log("🔍 [DRY RUN MODE] No real changes will be made.\n");

  const kitRoot = path.join(TARGET_DIR, ".devbooster");
  const templateRoot = path.join(TEMPLATE_DIR, ".devbooster");

  if (!fs.existsSync(kitRoot)) {
    console.log("▸ .devbooster/");
    console.log("  status: not found in this project");
    console.log("  action: run `npx dev-booster` first to install the kit\n");
    return;
  }

  const boostersCount = fs.existsSync(path.join(templateRoot, "boosters"))
    ? fs
        .readdirSync(path.join(templateRoot, "boosters"))
        .filter((f) => f !== ".DS_Store" && f !== "templates").length
    : 28;
  const hubCount = fs.existsSync(path.join(templateRoot, "hub", "scripts"))
    ? fs
        .readdirSync(path.join(templateRoot, "hub", "scripts"))
        .filter((f) => f !== ".DS_Store").length
    : 21;

  // 1. Sync boosters and hub (fully wiped and overwritten)
  const updateTargets = [
    {
      name: "boosters",
      src: path.join(templateRoot, "boosters"),
      dest: path.join(kitRoot, "boosters"),
    },
    {
      name: "hub",
      src: path.join(templateRoot, "hub"),
      dest: path.join(kitRoot, "hub"),
    },
  ];

  console.log("▸ Updating Kit Core:");

  for (const target of updateTargets) {
    if (!dryRun) syncDir(target.src, target.dest);
  }
  console.log(
    `  ├── boosters/     ➔ ${boostersCount} expert activators synced & updated`,
  );
  console.log(
    `  ├── hub/          ➔ ${hubCount} operational scripts synced & updated`,
  );

  // 2. Safe-copy rules directory recursively (overwriting core rules, preserving custom ones)
  const rulesSrc = path.join(templateRoot, "rules");
  const rulesDest = path.join(kitRoot, "rules");
  copyDirSafe(rulesSrc, rulesDest, dryRun);

  // 3. Safe-copy core files
  safeCopyFile(
    path.join(templateRoot, "MANIFEST.md"),
    path.join(kitRoot, "MANIFEST.md"),
    dryRun,
  );

  console.log("  ├── MANIFEST.md   ➔ Inventory updated");
  console.log(
    "  └── rules/        ➔ Core rules updated, customized rules preserved",
  );
  console.log("                    ✔ PROTOCOL.md  (updated)");
  console.log("                    ✔ GUIDE.md     (updated)");
  console.log("                    ✔ TRIGGERS.md  (updated)");
  console.log("                    ℹ Whitelabel stack rules (preserved)\n");

  ensureAgentsTriggers(dryRun);

  console.log("▸ DEVBOOSTER_INIT.md");
  console.log("  status: preserved (no changes made)\n");

  console.log(`
╭──────────────────────────────────────────────╮
│                   NEXT STEP                  │
╰──────────────────────────────────────────────╯

The kit changed. Open your AI assistant in this project and send:

  "Read DEVBOOSTER_INIT.md and re-execute all bootstrap steps."

Re-running the bootstrap applies the new structure (CODEBASE snapshot, rules, triggers).
`);
}

export async function run() {
  checkLocalInstall();

  // Detect an existing install by the files on disk, not by CLI flags.
  // If the kit is already present, the user is updating: keep their files as-is
  // and orient them to re-run the bootstrap (the kit changed — CODEBASE added).
  const hasKit =
    fs.existsSync(path.join(TARGET_DIR, ".devbooster")) ||
    fs.existsSync(path.join(TARGET_DIR, "DEVBOOSTER_INIT.md"));

  if (hasKit) {
    runUpdate();
    return;
  }

  await runInstall();
}
