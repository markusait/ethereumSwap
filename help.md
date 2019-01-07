original

  "scripts": {
    "start": "webpack-dev-server --open --mode development",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

Electron stuff





truffle box.json
{
  "ignore": ["README.md", ".gitignore", "box-img-lg.png", "box-img-sm.png", ".github"],
  "commands": {
    "Compile": "truffle compile",
    "Migrate": "truffle migrate",
    "Test contracts": "truffle test",
    "Test dapp": "cd client && npm test",
    "Run dev server": "cd client && npm run start",
    "Build for production": "cd client && npm run build"
  },
  "hooks": {
    "post-unpack": "cd client && npm install"
  }
}q
