import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  SvgIcon,
  Toolbar,
  Typography,
  Box,
  Stack,
  BoxProps,
  Switch,
} from '@mui/material'
import * as Icons from '@mui/icons-material'
import { ReactComponent as Logo } from '../logos/dark/dark.svg'
import { AssetsTable } from '../components/AssetsTable'
import { Data, useMockedData } from '../data/mock'
import { ResponsivePie } from '@nivo/pie'
import * as assets from '../data/assets'
import * as quotes from '../data/quotes'
import { useStore } from '../store'
import { LogoAndSymbol } from '../components/Misc'
import { Join } from '../icons/Join'

const color = 'greys.transparent'
const border = (theme: any) => `1px solid ${theme.palette.lines.transparent}`
const CardTitle = ({ title }: { title: string }) => (
  <Typography fontSize={18} fontFamily="Prompt" sx={{ flex: 1 }}>
    {title}
  </Typography>
)

type SeeUSDProps = { visible: boolean; onClick: () => void }
const SeeUSDValue = ({ visible, onClick }: SeeUSDProps) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    component={Button}
    onClick={onClick}
  >
    {!visible && <Icons.Visibility fontSize="small" sx={{ color }} />}
    {visible && <Icons.VisibilityOff fontSize="small" sx={{ color }} />}
    <Typography
      fontSize={14}
      fontWeight={500}
      textAlign="center"
      sx={{ flex: 1, color }}
    >
      USD Value
    </Typography>
  </Stack>
)

const Info = () => <Icons.InfoOutlined fontSize="small" sx={{ color }} />
const InfoTootlip = () => (
  <Box sx={{ flex: 1, textAlign: 'right' }}>
    <Info />
  </Box>
)

const linearGradient = (theme: any) => {
  const blue = `${theme.palette.gauges.blue}90 40%`
  const crimson = `${theme.palette.gauges.crimson}90`
  const content = ['to right', blue, crimson].join(', ')
  return `linear-gradient(${content})`
}

type AbsProps = BoxProps & { t: number | string; l: number | string }
const Abs = ({ children, t, l, ...rest }: AbsProps) => {
  return (
    <Box {...rest} position="absolute" top={t} left={l}>
      {children}
    </Box>
  )
}

type BorrowCapacityProps = { borrowCapacity: number }
const BorrowCapacity = (props: BorrowCapacityProps) => {
  const capacity = props.borrowCapacity.toFixed(3)
  const left = (shift: number) => `calc(${props.borrowCapacity}% - ${shift}px)`
  return (
    <Stack direction="row" pt={5} pb={1} spacing={1} alignItems="center">
      <Typography>Borrow Capacity</Typography>
      <Info />
      <Box flex={1} position="relative" borderRadius={100}>
        <Box
          height={8}
          width="100%"
          borderRadius={100}
          border={border}
          sx={{ background: linearGradient }}
        />
        <Abs t={0} l={left(1)} height={8} width={2} bgcolor="greys.clear" />
        <Abs t={-20} l={left(20)} fontSize={12} color="greys.clear">
          {capacity} %
        </Abs>
      </Box>
    </Stack>
  )
}

const BorrowNewAsset = () => (
  <CardActions sx={{ justifyContent: 'flex-end' }}>
    <Button sx={{ color, textTransform: 'none' }} disableRipple>
      Borrow a new asset <Icons.Add fontSize="small" />
    </Button>
  </CardActions>
)

const computePieData = ({ markets }: Data) => {
  return markets.flatMap(({ symbol, borrow }) => {
    const { coins } = assets
    if (symbol in coins) {
      const label = symbol as keyof typeof coins
      const key = symbol.toLowerCase() as keyof typeof quotes
      const value = quotes[key] * parseFloat(borrow)
      return [{ id: label, label, value }]
    }
    return []
  })
}

const useCMCData = () => {
  const { data } = useMockedData()
  const capacity = parseFloat(data.borrowCapacity)
  const pieData = computePieData(data)
  return { capacity, pieData }
}

const hide = (str: string) => str.replace(/[0-9]/g, '*')

const Recap = ({ centerX, centerY }: any) => {
  const { data } = useMockedData()
  const store = useStore()
  const { visible } = store.state
  const totalUSD = visible ? data.totalUSD : hide(data.totalUSD)
  const percentAPY = (parseFloat(data.globalAPY) * 100).toFixed(2)
  const APY = visible ? percentAPY : hide(percentAPY)
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      fill="white"
      style={{
        fontSize: 30,
        fontFamily: 'DM Sans',
        fontWeight: 600,
      }}
    >
      <tspan>${totalUSD}</tspan>
      <tspan x={centerX} dy="30px" style={{ fontSize: 16, fontWeight: 400 }}>
        APY: <tspan style={{ fontWeight: 600 }}>{APY}%</tspan>
      </tspan>
    </text>
  )
}

const Tooltip = ({ datum }: any) => {
  const { data } = useMockedData()
  const value = data.markets.find(m => m.symbol === datum.label)?.borrow
  return (
    <Stack
      direction="row"
      sx={{ backgroundColor: 'primary.main', borderRadius: 4, p: 1 }}
      spacing={2}
      alignItems="center"
    >
      <LogoAndSymbol symbol={datum.label} />
      <Typography>{value}</Typography>
    </Stack>
  )
}

const MatchIconLearnMore = () => {
  return (
    <Stack
      position="relative"
      direction="row"
      alignItems="center"
      p={1}
      mt={4}
      spacing={1}
      sx={{
        borderRadius: 2,
        backgroundColor: theme => `${theme.palette.text.secondary}1A`,
      }}
    >
      <Join />
      <Typography textTransform="uppercase" fontSize={12} sx={{ flex: 1 }}>
        This icon appears when a position is matched P2P.
      </Typography>
      <Button
        size="small"
        sx={{
          color: 'greys.clear',
          p: 0,
          fontSize: 12,
          textDecoration: 'underline',
        }}
      >
        Learn more
      </Button>
    </Stack>
  )
}

const Togglers = () => {
  const store = useStore()
  const onChange = () =>
    store.dispatch({ type: 'root/TOGGLE_BORROW_VISIBILITY' })
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Toggle Borrow Capacity visibility</Typography>
            <Switch
              size="small"
              checked={store.state.borrowVisible}
              color="secondary"
              onChange={onChange}
            />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

type BorrowPieChartProps = { pieData: ReturnType<typeof computePieData> }
const BorrowPieChart = ({ pieData }: BorrowPieChartProps) => (
  <Box height={400}>
    <ResponsivePie
      tooltip={Tooltip}
      data={pieData}
      margin={{ top: 40, bottom: 40 }}
      innerRadius={0.85}
      padAngle={3}
      cornerRadius={1000}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      colors={({ data }) => assets.coins[data.label].color}
      layers={['arcs', Recap]}
    />
  </Box>
)

const App = () => {
  const store = useStore()
  const { borrowVisible } = store.state
  const { capacity, pieData } = useCMCData()
  return (
    <Container maxWidth={false} disableGutters>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <SvgIcon component={Logo} inheritViewBox fontSize="large" />
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }} maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" alignItems="center">
              <CardTitle title="Borrow" />
              <SeeUSDValue
                visible={store.state.visible}
                onClick={() =>
                  store.dispatch({ type: 'root/TOGGLE_VISIBILITY' })
                }
              />
              <InfoTootlip />
            </Stack>
            <BorrowPieChart pieData={pieData} />
            {borrowVisible && <BorrowCapacity borrowCapacity={capacity} />}
            {!borrowVisible && <MatchIconLearnMore />}
            <AssetsTable />
          </CardContent>
          <BorrowNewAsset />
        </Card>
      </Container>
      <Togglers />
    </Container>
  )
}

export default App
