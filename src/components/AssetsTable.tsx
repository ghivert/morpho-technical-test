import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useMockedData, Market } from '../data/mock'
import { Join } from '../icons/Join'
import { Cell, LogoAndSymbol, MorphoTk, Row } from './Misc'

const border = (theme: any) => `1px solid ${theme.palette.lines.transparent}`

const FormatPercent = ({ value }: { value: string }) => {
  const asNum = parseFloat(value)
  const asPercent = asNum < 1 ? asNum * 100 : asNum
  const content = asPercent.toFixed(2)
  return <>{content} %</>
}

const MorphoRewards = ({ rewards }: { rewards: string }) => {
  const color = 'greys.transparent'
  const border = (theme: any) => `1px solid ${theme.palette.lines.light}`
  const sx = { p: '2px 4px', border, borderRadius: 2, color }
  return (
    <Stack alignItems="center" direction="row" spacing={1} sx={sx}>
      <MorphoTk />
      <div>+{rewards}</div>
    </Stack>
  )
}

const AssetRow = ({ market }: { market: Market }) => {
  const { isMatched } = market
  return (
    <Row key={market.symbol}>
      <Cell>
        <LogoAndSymbol symbol={market.symbol}>
          <MorphoRewards rewards={market.morphoRewards} />
        </LogoAndSymbol>
      </Cell>
      <Cell>{market.borrow}</Cell>
      <Cell>
        <FormatPercent value={market.poolAPY} />
      </Cell>
      <Cell>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Box color={isMatched ? 'text.secondary' : 'text.primary'}>
            <FormatPercent value={market.userAPY} />
          </Box>
          {isMatched && <Join />}
        </Stack>
      </Cell>
    </Row>
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
            <Cell>
              <Box textAlign="center">Your APY</Box>
            </Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.markets.map(market => (
            <AssetRow market={market} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
