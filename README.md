# Morpho Technical Test

Welcome everyone. I implemented what I thought was useful for code quality. Unfortunately, I couldn't spend much time on the Chart, so I used the [Nivo](https://nivo.rocks) library to handle it.
You can play with the prototype.

# Getting started

Installing dependencies.

```bash
yarn
```

Running the dev server.

```
yarn dev
```

You can head over [http://localhost:5173](http://localhost:5173).

# Want to update the prices?

Head over CoinMarketCap, and get an API Key.

```bash
echo "export const CMC_KEY = \"$YOUR_API_KEY\"" >> env.mjs
yarn get-prices
```

# Legal

MIT Licensed, everything about Morpho (logo etc.) belongs to Morpho.
