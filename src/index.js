import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Source: the `template/` folder shipped inside the npm package
const TEMPLATE_DIR = path.resolve(__dirname, '..', 'template')

// Destination: the user's current working directory (where they ran npx)
const TARGET_DIR = process.cwd()

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

export function run() {
  console.log(`
╭──────────────────────────────────────────────╮
│               DEV BOOSTER                    │
│        instalador do kit agentico           │
╰──────────────────────────────────────────────╯
`)

  // 1. Copy the full .devbooster/ kit to the user's project
  const agentSrc = path.join(TEMPLATE_DIR, '.devbooster')
  const agentDest = path.join(TARGET_DIR, '.devbooster')

  if (fs.existsSync(agentDest)) {
    console.log('▸ .devbooster/')
    console.log('  status: ja existe no projeto')
    console.log('  acao: copia ignorada para evitar sobrescrita')
    console.log('  dica: renomeie ou remova a pasta se quiser reinstalar\n')
  } else {
    copyDir(agentSrc, agentDest)
    console.log('▸ .devbooster/')
    console.log('  status: instalado com sucesso\n')
  }

  // 2. Drop DEVBOOSTER_INIT.md at the root of the user's project
  const initSrc = path.join(TEMPLATE_DIR, 'DEVBOOSTER_INIT.md')
  const initDest = path.join(TARGET_DIR, 'DEVBOOSTER_INIT.md')

  if (fs.existsSync(initDest)) {
    console.log('▸ DEVBOOSTER_INIT.md')
    console.log('  status: ja existe no projeto')
    console.log('  acao: criacao ignorada\n')
  } else {
    fs.copyFileSync(initSrc, initDest)
    console.log('▸ DEVBOOSTER_INIT.md')
    console.log('  status: criado na raiz do projeto\n')
  }

  console.log(`
╭──────────────────────────────────────────────╮
│                 PROXIMO PASSO                │
╰──────────────────────────────────────────────╯

Abra sua LLM / assistente de IA neste projeto e envie:

  "Leia o DEVBOOSTER_INIT.md e execute todos os passos de bootstrap."

O kit vai se configurar com base no stack do projeto.
`)
}
