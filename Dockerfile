FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build:ssr

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist/lautarovulcano ./dist/lautarovulcano
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN mkdir -p dist/lautarovulcano/browser && touch dist/lautarovulcano/browser/.env
RUN npm ci --omit=dev

ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/lautarovulcano/server/server.mjs"]
