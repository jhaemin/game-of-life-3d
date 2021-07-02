<p align="center">
  <img src="https://user-images.githubusercontent.com/19797697/124251008-643d1480-db60-11eb-9e01-4a37031c2887.png" width="280" />
</p>

<h1 align="center">Game of Life 3D</h1>

An implementation of the [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using multiple technologies including TypeScript, React, Rust, WebAssembly and Three.js.

It's not actually a 3D Game of Life, but Game of Life 3D which renders two-dimensional space into three-dimensional canvas where the cells are just cubes. The objectives of this project are i) to get an idea of combining unfamiliar (to me) technologies in a single software, ii) to expand knowledge and possibilities of the frontend development and iii) to help anyone who are interested in my interests to begin their own learning processes.

## Build

It requires

- [Rust toolchain](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/en/)

### Build Rust (WebAssembly)

Go to `wasm/` and run

```zsh
> wasm-pack build
```

### Build the app

Go to the root directory and run

```zsh
> npm install
> npm run build
```

Then serve the `build/` directory with your favorite tools. For example,

```zsh
> serve build
```

[Checkout serve](<(https://github.com/vercel/serve)>)

<p align="center">
  <img src="https://user-images.githubusercontent.com/19797697/124280313-81370f00-db83-11eb-95db-35372d8cadef.png" />
</p>
