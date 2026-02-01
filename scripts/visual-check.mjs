import { chromium } from 'playwright'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

const args = process.argv.slice(2)
const readFlag = (name) => {
  const prefix = `--${name}=`
  const direct = args.find((arg) => arg.startsWith(prefix))
  if (direct) return direct.slice(prefix.length)
  const index = args.findIndex((arg) => arg === `--${name}`)
  if (index >= 0) return args[index + 1]
  return undefined
}

const url =
  readFlag('url') ||
  process.env.VISUAL_CHECK_URL ||
  'http://localhost:5173'
const outDir =
  readFlag('out') ||
  process.env.VISUAL_CHECK_OUT ||
  'artifacts/visual'
const minTurn = Number(readFlag('turn') || process.env.VISUAL_CHECK_TURN || '3')

const safeTimestamp = () =>
  new Date().toISOString().replace(/[:.]/g, '-')

const getDefaultCacheDir = () => {
  if (process.env.PLAYWRIGHT_BROWSERS_PATH) {
    return process.env.PLAYWRIGHT_BROWSERS_PATH
  }
  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library/Caches/ms-playwright')
  }
  if (process.platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData/Local')
    return path.join(localAppData, 'ms-playwright')
  }
  return path.join(os.homedir(), '.cache/ms-playwright')
}

const findLatestDir = (root, prefix) => {
  if (!fs.existsSync(root)) return null
  const entries = fs
    .readdirSync(root)
    .filter((entry) => entry.startsWith(prefix))
    .sort()
  return entries.length ? path.join(root, entries[entries.length - 1]) : null
}

const resolveChromiumExecutable = () => {
  const cacheDir = getDefaultCacheDir()
  const platform =
    process.platform === 'darwin' ? 'mac' : process.platform === 'win32' ? 'win' : 'linux'
  const arch = process.arch === 'arm64' ? 'arm64' : 'x64'

  const headlessRoot = findLatestDir(cacheDir, 'chromium_headless_shell-')
  if (headlessRoot) {
    const headlessPath = path.join(
      headlessRoot,
      `chrome-headless-shell-${platform}-${arch}`,
      process.platform === 'win32' ? 'chrome-headless-shell.exe' : 'chrome-headless-shell',
    )
    if (fs.existsSync(headlessPath)) {
      return headlessPath
    }
  }

  const chromiumRoot = findLatestDir(cacheDir, 'chromium-')
  if (chromiumRoot) {
    const chromeDir = path.join(chromiumRoot, `chrome-${platform}-${arch}`)
    const chromePath =
      process.platform === 'darwin'
        ? path.join(
            chromeDir,
            'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
          )
        : path.join(chromeDir, process.platform === 'win32' ? 'chrome.exe' : 'chrome')
    if (fs.existsSync(chromePath)) {
      return chromePath
    }
  }

  return null
}

const run = async () => {
  fs.mkdirSync(outDir, { recursive: true })

  const executablePath = resolveChromiumExecutable()
  const browser = await chromium.launch({
    executablePath: executablePath ?? undefined,
  })
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  page.setDefaultTimeout(15000)

  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.game-stage__canvas')

  const target = page.locator('.game-stage__canvas')
  const timestamp = safeTimestamp()
  const initialPath = path.join(outDir, `poc-${timestamp}-t0.png`)
  await target.screenshot({ path: initialPath })

  const runButton = page.getByRole('button', { name: /run trial/i })
  if ((await runButton.count()) > 0 && (await runButton.isEnabled())) {
    await runButton.click()
  }

  try {
    await page.waitForFunction(
      (turn) => {
        const el = document.querySelector('.playback-readout')
        if (!el) return false
        const match = /Turn\s+(\d+)/.exec(el.textContent ?? '')
        return match ? Number(match[1]) >= turn : false
      },
      minTurn,
      { timeout: 8000 },
    )
  } catch {
    // Fallback to a small delay if playback readout is unavailable.
    await page.waitForTimeout(1200)
  }

  const afterPath = path.join(outDir, `poc-${timestamp}-t${minTurn}.png`)
  await target.screenshot({ path: afterPath })

  await browser.close()
  console.log(`Saved ${initialPath}`)
  console.log(`Saved ${afterPath}`)
}

run().catch((error) => {
  console.error('visual-check failed:', error)
  process.exit(1)
})
