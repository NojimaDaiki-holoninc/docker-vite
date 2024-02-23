module.exports = () => ({
  plugins: 
      [
          require('autoprefixer')({}),
          require('postcss-sort-media-queries')({
                  sort: 'mobile-first'
              }
          ),
          /*require('postcss-clip-path-polyfill')(),*/
          require('postcss-url')({
              url: 'inline',
              maxSize: 150,//インラインにする画像ファイルの容量上限
          }),
          
      ]
})