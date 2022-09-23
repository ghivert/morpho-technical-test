import { createTheme } from '@mui/material'

const dark = '#00011D'
const main = '#14183D'
const light = '#1E2356'

export default createTheme({
	palette: {
		greys: {
			primary: '#EFF0FB',
			clear: '#EFF0FBCC',
			transparent: '#EFF0FB80',
		},
		gauges: {
			blue: '#3543C2',
			red: '#DF0028',
			crimson: '#B50329',
			grass: '#05882A',
			green: '#04BE2D',
		},
		lines: {
			primary: '#F8FBFFB3',
			light: '#F8FBFF66',
			transparent: '#F8FBFF1A',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#5B8CFF',
		},
		primary: { main, dark, light },
		background: {
			default: dark,
			paper: `${main}99`,
		},
	},
	typography: {
		fontFamily: ['DM Sans'].join(','),
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					background: dark,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 15,
					border: `1px solid ${light}`,
				},
			},
		},
	},
})

declare module '@mui/material/styles' {
	interface PaletteOptions {
		greys: {
			primary: string
			clear: string
			transparent: string
		}
		gauges: {
			blue: string
			red: string
			crimson: string
			grass: string
			green: string
		}
		lines: {
			primary: string
			light: string
			transparent: string
		}
	}

	interface Palette {
		greys: {
			primary: string
			clear: string
			transparent: string
		}
		gauges: {
			blue: string
			red: string
			crimson: string
			grass: string
			green: string
		}
		lines: {
			primary: string
			light: string
			transparent: string
		}
	}
}
