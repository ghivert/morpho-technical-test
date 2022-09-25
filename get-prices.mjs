import * as fs from 'fs/promises'
import fetch from 'node-fetch'
import path from 'path'
import { CMC_KEY } from './env.mjs'

const symbols = [
  'DAI',
  'BAT',
  'USDC',
  'COMP',
  'WMATIC',
  'MATIC',
  'WAVAX',
  'AVAX',
  'UNI',
  'USDT',
  'WBTC',
  'AAVE',
  'MORPHO',
  'REP',
  'WETH',
  'FEI',
  'CRV',
  'stETH',
  'BNB',
  'BUSD',
  'XRP',
  'ADA',
  'SOL',
  'DOT',
  'TRX',
  'SHIB',
]

const endpoint = '/v2/cryptocurrency/quotes/latest'
const base = 'https://pro-api.coinmarketcap.com'
const url = [base, endpoint].join('')
const queryString = `symbol=${symbols.join(',')}`
const headers = { 'X-CMC_PRO_API_KEY': CMC_KEY }
const result = await fetch(`${url}?${queryString}`, { headers })
const body = await result.json()

const datas = Object.entries(body.data).reduce((acc, [symbol, data]) => {
  const quote = data[0]?.quote.USD.price
  if (!quote) return acc
  return `${acc}export const ${symbol.toLowerCase()} = ${quote}\n`
}, '')

const cwd = process.cwd()
const fileName = path.resolve(cwd, 'src/data/quotes.ts')
await fs.writeFile(fileName, `${datas}export const morpho = 1\n`)
