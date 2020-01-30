module.exports = api => {
  api.cache(false)

  return {
    presets: [
      '@babel/preset-env'
      // add this only babel-loader
      // '@babel/preset-typescript',
      // '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  }
}
