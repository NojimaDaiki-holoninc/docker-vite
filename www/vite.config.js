import { defineConfig } from 'vite';
import {globSync} from 'glob';//ワイルドカードを使って各ファイルの名前を取得し一括で登録するため
import path from 'node:path';//上記の実行次にnpmのpathを利用
import { fileURLToPath } from 'node:url';//上記の実行時にURLをpathに変更させるため
import { ViteEjsPlugin } from "vite-plugin-ejs";
import json from "./src/lib/pagedata/data.json";

  const inputJsArray = globSync('src/common/js/**/*.js', { ignore: 
    ['node_modules/**','**/modules/**','**/html/**'] }).map(file => {
    return [
      path.relative(
        'src/js',
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url))
    ]
  });
  const inputHtmlArray = globSync(['src/**/*.html'], { ignore: ['node_modules/**']  
  }).map(file => {
    return [
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url))    
    ]
  });
  const inputScssArray = globSync('src/common/css/**/*.scss', { ignore: ['src/common/css/**/_*.scss'] }).map(file => {
    return [
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url))    
    ]
  });
  
  /**
  *　各ファイル情報の配列をまとめて、Objectにする設定
  */
  const inputObj = Object.fromEntries(inputJsArray.concat(inputHtmlArray, inputScssArray));
  console.log(inputObj);
  
  export default defineConfig({
    root: './src', //開発ディレクトリ設定
    base: './',//各ファイルのPathを絶対パスから相対パスにするようにするため
    build: {
      outDir: '../html', //出力場所の指定
      emptyOutDir: true,//build時に出力先ディレクトリを空にする
      rollupOptions: {//rollupOptionsにて出力ファイル名を元ファイルを元にする設定をする
        input: inputObj,
        output: {
          entryFileNames: `assets/js/entry-[name].js`,//JSファイルの出力設定
          chunkFileNames: `assets/js/modules/[name].js`,//chunkファイルをmoduleディレクトリに入れる
          assetFileNames: (assetInfo) => {
            if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
              return 'assets/images/[name].[ext]';//画像アセットの出力設定
            }
            if (/\.css$/.test(assetInfo.name)) {
              return 'assets/css/[name].[ext]';
            }
            return 'assets/[name].[ext]';
          },
        }
      }
    },
    server: {
      port: 3000,//開発サーバーは
      host: true,//Dockerなどの仮想から外に出すためには　host:trueとする
      strictPort: true,//
      watch: {
        usePolling: true //Dockerなどの仮想の場合この設定をしておくと吉
      }
    },
    plugins: [
      ViteEjsPlugin(json),//プラグインの追加　読み込んだjsonを引数にて渡す
    ]
  });
  