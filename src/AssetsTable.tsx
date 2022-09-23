import {
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import * as assets from './assets'
import { useMockedData } from './mock'

const border = (theme: any) => `1px solid ${theme.palette.lines.transparent}`

// Table Stuff
const Cell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  color: theme.palette.greys.clear,
  fontSize: 16,
}))
const Row = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

// Image Stuff
const SymbolImg = styled('img')(() => ({ width: 20, height: 20 }))
const MorphoTk_ = styled('img')(() => ({ width: 14, height: 14 }))
const MorphoTk = () => {
  const src = assets.getLogoSvgUrl('MORPHO')
  return <MorphoTk_ src={src} />
}

const FormatPercent = ({ value }: { value: string }) => {
  const asNum = parseFloat(value)
  const asPercent = asNum * 100
  const content = asPercent.toFixed(2)
  return <>{content} %</>
}

const MorphoRewards = ({ rewards }: { rewards: string }) => {
  const color = 'greys.transparent'
  const sx = { p: '2px 4px', border, borderRadius: 2, color }
  return (
    <Stack alignItems="center" direction="row" spacing={1} sx={sx}>
      <MorphoTk />
      <div>+{rewards}</div>
    </Stack>
  )
}

export const AssetsTable = () => {
  const { data } = useMockedData()
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ my: 1, borderRadius: 3, border, backgroundColor: 'primary.main' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <Cell>Assets</Cell>
            <Cell>Borrow</Cell>
            <Cell>Compound APY</Cell>
            <Cell>Your APY</Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.markets.map(market => (
            <Row>
              <Cell>
                <Stack spacing="4px" alignItems="flex-start">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SymbolImg src={assets.getLogoSvgUrl(market.symbol)} />
                    <Typography>{market.symbol}</Typography>
                  </Stack>
                  <MorphoRewards rewards={market.morphoRewards} />
                </Stack>
              </Cell>
              <Cell>{market.borrow}</Cell>
              <Cell>
                <FormatPercent value={market.poolAPY} />
              </Cell>
              <Cell>
                <FormatPercent value={market.userAPY} />
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
