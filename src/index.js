import fs from 'fs'
import path from 'path'
import readline from 'readline/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Source: the `template/` folder shipped inside the npm package
const TEMPLATE_DIR = path.resolve(__dirname, '..', 'template')

// Destination: the user's current working directory (where they ran npx)
const TARGET_DIR = process.cwd()
const args = process.argv.slice(2)
const GITIGNORE_BLOCK = [
  '# DEV-BOOSTER',
  '.devbooster/',
  'DEVBOOSTER_INIT.md',
]
const GITIGNORE_MARKER = '# DEV-BOOSTER'
const IDE_BRIDGE_BLOCK = [
  '# 🤖 DEV BOOSTER — AGENTIC KIT BOOTSTRAP',
  '',
  'Before any action, read `.devbooster/rules/PROTOCOL.md` for full governance rules.',
]
const IDE_BRIDGE_MARKER = '.devbooster/rules/PROTOCOL.md'
const IDE_BRIDGE_FALLBACK_FLAG = path.join('hub', 'flags', 'needs-ide-bridge')
const IDE_BRIDGE_TARGETS = [
  '.rules',
  '.cursorrules',
  '.windsurfrules',
  '.clinerules',
  'AGENT.md',
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md',
  '.github/copilot-instructions.md',
]

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function removeDirContents(targetDir) {
  if (!fs.existsSync(targetDir)) return

  for (const entry of fs.readdirSync(targetDir, { withFileTypes: true })) {
    const entryPath = path.join(targetDir, entry.name)
    fs.rmSync(entryPath, { recursive: true, force: true })
  }
}

function syncDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  removeDirContents(dest)
  copyDir(src, dest)
}

function isUpdateMode() {
  return args.includes('--update') || args.includes('update')
}

function ensureTrailingNewline(content) {
  return content.endsWith('\n') ? content : `${content}\n`
}

function appendUniqueBlock(filePath, blockLines, marker) {
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
  if (existing.includes(marker)) {
    return false
  }

  const trimmedEnd = existing.replace(/\s*$/, '')
  const prefix = trimmedEnd.length > 0 ? `${trimmedEnd}\n\n` : ''
  const nextContent = `${prefix}${blockLines.join('\n')}\n`
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, nextContent)
  return true
}

async function askYesNo(question, defaultYes = true) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return defaultYes
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    const suffix = defaultYes ? ' (Y/n) ' : ' (y/N) '
    const answer = (await rl.question(`${question}${suffix}`)).trim().toLowerCase()

    if (!answer) return defaultYes
    if (answer === 'y' || answer === 'yes') return true
    if (answer === 'n' || answer === 'no') return false
    return defaultYes
  } finally {
    rl.close()
  }
}

async function maybeAddDevBoosterToGitignore() {
  const shouldIgnore = await askYesNo('Add Dev Booster to your .gitignore?', true)

  if (!shouldIgnore) {
    console.log('▸ .gitignore')
    console.log('  status: skipped by user\n')
    return
  }

  const gitignorePath = path.join(TARGET_DIR, '.gitignore')
  const changed = appendUniqueBlock(gitignorePath, GITIGNORE_BLOCK, GITIGNORE_MARKER)

  console.log('▸ .gitignore')
  if (changed) {
    console.log('  status: updated')
    console.log('  entries: # DEV-BOOSTER, .devbooster/, DEVBOOSTER_INIT.md\n')
  } else {
    console.log('  status: already configured')
    console.log('  entries: # DEV-BOOSTER, .devbooster/, DEVBOOSTER_INIT.md\n')
  }
}

function writeIdeBridgeFallbackFlag() {
  const flagPath = path.join(TARGET_DIR, '.devbooster', IDE_BRIDGE_FALLBACK_FLAG)
  fs.mkdirSync(path.dirname(flagPath), { recursive: true })
  fs.writeFileSync(flagPath, 'create AGENTS.md fallback bridge\n')
}

function clearIdeBridgeFallbackFlag() {
  const flagPath = path.join(TARGET_DIR, '.devbooster', IDE_BRIDGE_FALLBACK_FLAG)
  if (fs.existsSync(flagPath)) {
    fs.rmSync(flagPath, { force: true })
  }
}

function setupIdeBridgeFiles() {
  const touchedFiles = []

  for (const relativeTarget of IDE_BRIDGE_TARGETS) {
    const targetPath = path.join(TARGET_DIR, relativeTarget)
    if (!fs.existsSync(targetPath)) continue

    appendUniqueBlock(targetPath, IDE_BRIDGE_BLOCK, IDE_BRIDGE_MARKER)
    touchedFiles.push(relativeTarget)
  }

  console.log('▸ IDE bridge files')
  if (touchedFiles.length > 0) {
    clearIdeBridgeFallbackFlag()
    console.log('  status: bridge instructions appended where applicable')
    console.log(`  files: ${touchedFiles.join(', ')}\n`)
    return
  }

  writeIdeBridgeFallbackFlag()
  console.log('  status: no known IDE instruction file found')
  console.log('  action: bootstrap fallback flag created for DEVBOOSTER_INIT.md\n')
}

function printHeader(subtitle) {
  console.log(`
╭──────────────────────────────────────────────╮
│               DEV BOOSTER                    │
│ ${subtitle.padEnd(44)} │
╰──────────────────────────────────────────────╯
`)
}

async function runInstall() {
  printHeader('agentic kit installer')

  // 1. Copy the full .devbooster/ kit to the user's project
  const agentSrc = path.join(TEMPLATE_DIR, '.devbooster')
  const agentDest = path.join(TARGET_DIR, '.devbooster')

  if (fs.existsSync(agentDest)) {
    console.log('▸ .devbooster/')
    console.log('  status: already exists in this project')
    console.log('  action: copy skipped to avoid overwrite')
    console.log('  tip: rename or remove the folder if you want a fresh install\n')
  } else {
    copyDir(agentSrc, agentDest)
    console.log('▸ .devbooster/')
    console.log('  status: installed successfully\n')
  }

  // 2. Drop DEVBOOSTER_INIT.md at the root of the user's project
  const initSrc = path.join(TEMPLATE_DIR, 'DEVBOOSTER_INIT.md')
  const initDest = path.join(TARGET_DIR, 'DEVBOOSTER_INIT.md')

  if (fs.existsSync(initDest)) {
    console.log('▸ DEVBOOSTER_INIT.md')
    console.log('  status: already exists in this project')
    console.log('  action: creation skipped\n')
  } else {
    fs.copyFileSync(initSrc, initDest)
    console.log('▸ DEVBOOSTER_INIT.md')
    console.log('  status: created at project root\n')
  }

  await maybeAddDevBoosterToGitignore()
  setupIdeBridgeFiles()

  console.log(`
╭──────────────────────────────────────────────╮
│                   NEXT STEP                  │
╰──────────────────────────────────────────────╯

Open your AI assistant in this project and send:

  "Read DEVBOOSTER_INIT.md and execute all bootstrap steps."

The kit will configure itself based on your project's stack.
`)
}

function runUpdate() {
  printHeader('safe kit update')

  const kitRoot = path.join(TARGET_DIR, '.devbooster')
  const templateRoot = path.join(TEMPLATE_DIR, '.devbooster')

  if (!fs.existsSync(kitRoot)) {
    console.log('▸ .devbooster/')
    console.log('  status: not found in this project')
    console.log('  action: run `npx dev-booster` first to install the kit\n')
    return
  }

  const updateTargets = [
    { name: 'boosters', src: path.join(templateRoot, 'boosters'), dest: path.join(kitRoot, 'boosters') },
    { name: 'hub', src: path.join(templateRoot, 'hub'), dest: path.join(kitRoot, 'hub') },
  ]

  for (const target of updateTargets) {
    syncDir(target.src, target.dest)
    console.log(`▸ .devbooster/${target.name}/`)
    console.log('  status: updated successfully')
  }

  console.log('')
  console.log('▸ rules/')
  console.log('  status: preserved')
  console.log('  action: no local files were overwritten')
  console.log('')
  console.log('▸ DEVBOOSTER_INIT.md')
  console.log('  status: preserved')
  console.log('  action: no local files were overwritten\n')

  console.log(`
╭──────────────────────────────────────────────╮
│                   NEXT STEP                  │
╰──────────────────────────────────────────────╯

Review the updated kit files in your project and, if you want,
reopen your AI assistant to keep working with the refreshed boosters.
`)
}

export async function run() {
  if (isUpdateMode()) {
    runUpdate()
    return
  }

  await runInstall()
}
