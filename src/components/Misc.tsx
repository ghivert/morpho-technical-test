import { Stack, styled, TableCell, TableRow, Typography } from '@mui/material'
import * as assets from '../data/assets'

export type LogoAndSymbolProps = { symbol: string; children?: React.ReactNode }
export const LogoAndSymbol = ({ symbol, children }: LogoAndSymbolProps) => {
  return (
    <Stack spacing="4px" alignItems="flex-start">
      <Stack direction="row" spacing={1} alignItems="center">
        <SymbolImg src={assets.getLogoSvgUrl(symbol)} />
        <Typography>{symbol}</Typography>
      </Stack>
      {children}
    </Stack>
  )
}

// Table Stuff
export const Cell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  color: theme.palette.greys.clear,
  fontSize: 16,
}))
export const Row = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

// Image Stuff
export const SymbolImg = styled('img')(() => ({ width: 20, height: 20 }))
const MorphoTk_ = styled('img')(() => ({ width: 14, height: 14 }))
export const MorphoTk = () => {
  const src = assets.getLogoSvgUrl('MORPHO')
  return <MorphoTk_ src={src} />
}
