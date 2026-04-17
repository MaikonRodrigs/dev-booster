import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const SOURCE_DIR = path.join(ROOT_DIR, '.devbooster')
const TEMPLATE_DIR = path.join(ROOT_DIR, 'template')
const TEMPLATE_KIT_DIR = path.join(TEMPLATE_DIR, '.devbooster')
const INIT_FILE = 'DEVBOOSTER_INIT.md'

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

function ensureExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} not found: ${targetPath}`)
  }
}

function run() {
  ensureExists(SOURCE_DIR, 'Source kit')
  ensureExists(path.join(ROOT_DIR, INIT_FILE), 'Root init file')

  fs.mkdirSync(TEMPLATE_DIR, { recursive: true })
  fs.rmSync(TEMPLATE_KIT_DIR, { recursive: true, force: true })
  copyDir(SOURCE_DIR, TEMPLATE_KIT_DIR)
  fs.copyFileSync(path.join(ROOT_DIR, INIT_FILE), path.join(TEMPLATE_DIR, INIT_FILE))

  console.log('╭──────────────────────────────────────────────╮')
  console.log('│          DEV BOOSTER TEMPLATE SYNC          │')
  console.log('╰──────────────────────────────────────────────╯')
  console.log('')
  console.log('▸ origem: .devbooster/')
  console.log('▸ destino: template/.devbooster/')
  console.log(`▸ init: template/${INIT_FILE}`)
  console.log('')
  console.log('status: sync concluido com sucesso')
}

run()
