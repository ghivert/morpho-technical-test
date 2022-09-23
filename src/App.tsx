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
} from '@mui/material'
import * as Icons from '@mui/icons-material'
import { ReactComponent as Logo } from './logos/dark/dark.svg'
import { AssetsTable } from './AssetsTable'
import { useMockedData } from './mock'
import { useState } from 'react'

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

const App = () => {
  const { data } = useMockedData()
  const [visibleValue, setVisibleValue] = useState(true)
  const capacity = parseFloat(data.borrowCapacity)
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
                visible={visibleValue}
                onClick={() => setVisibleValue(v => !v)}
              />
              <InfoTootlip />
            </Stack>
            <BorrowCapacity borrowCapacity={capacity} />
            <AssetsTable />
          </CardContent>
          <BorrowNewAsset />
        </Card>
      </Container>
    </Container>
  )
}

export default App
