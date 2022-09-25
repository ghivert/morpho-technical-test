import { useTheme } from '@mui/material'

export const Join = () => {
	const theme = useTheme()
	return (
		<svg
			style={{
				backgroundColor: `${theme.palette.text.secondary}4D`,
				borderRadius: 4,
			}}
			viewBox="0 0 27 16"
			width="27"
			height="16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_b_5305_1297)">
				<rect
					width="27"
					height="16"
					rx="7"
					fill={`${theme.palette.text.secondary}4D`}
				></rect>
			</g>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.6008 11.6668C12.1106 11.8811 11.5692 12 11 12C8.79086 12 7 10.2091 7 8C7 5.79086 8.79086 4 11 4C11.5692 4 12.1106 4.11889 12.6008 4.33318C11.6162 5.24635 11 6.55122 11 8C11 9.44878 11.6162 10.7536 12.6008 11.6668ZM13.5 12.3311C12.7646 12.7565 11.9107 13 11 13C8.23858 13 6 10.7614 6 8C6 5.23858 8.23858 3 11 3C11.9107 3 12.7646 3.24349 13.5 3.66891C14.2354 3.24349 15.0893 3 16 3C18.7614 3 21 5.23858 21 8C21 10.7614 18.7614 13 16 13C15.0893 13 14.2354 12.7565 13.5 12.3311ZM14.3992 4.33318C14.8894 4.11888 15.4308 4 16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C15.4308 12 14.8894 11.8811 14.3992 11.6668C15.3838 10.7536 16 9.44878 16 8C16 6.55122 15.3838 5.24635 14.3992 4.33318ZM13.5 4.87731C14.4145 5.61038 15 6.73681 15 8C15 9.26319 14.4145 10.3896 13.5 11.1227C12.5855 10.3896 12 9.26319 12 8C12 6.73681 12.5855 5.61038 13.5 4.87731Z"
				fill={theme.palette.text.secondary}
			></path>
			<defs>
				<filter
					id="filter0_b_5305_1297"
					x="-14"
					y="-14"
					width="55"
					height="44"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
					<feGaussianBlur
						in="BackgroundImage"
						stdDeviation="7"
					></feGaussianBlur>
					<feComposite
						in2="SourceAlpha"
						operator="in"
						result="effect1_backgroundBlur_5305_1297"
					></feComposite>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_backgroundBlur_5305_1297"
						result="shape"
					></feBlend>
				</filter>
			</defs>
		</svg>
	)
}
