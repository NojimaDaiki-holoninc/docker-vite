# マルチアーキテクチャ対応のベースイメージを使用
FROM --platform=linux/arm64 debian:bullseye-slim

# 必要なパッケージのインストール
RUN set -ex; \
    apt-get update; \
    apt-get install -y wget curl git build-essential; \
    # Node.jsとnpmのインストール
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -; \
    apt-get install -y nodejs; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*;

# 作業ディレクトリの設定
WORKDIR /app

# アプリケーションのコピー（アプリケーションが存在する場合）
# COPY . .

# アプリケーションの依存関係のインストール（package.jsonが存在する場合）
# RUN npm install

# アプリケーションの起動コマンド
# CMD ["npm", "start"]
