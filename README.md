# Simple Node Express Proxy Server

A simple Node.js + Express proxy server to locally emulate the **elf Fastly (`glow.elfcosmetics.com`) proxy**.

---

## 🚀 Installation

1. **Clone the repository**
```
git clone https://github.com/marcusgilson/glow-proxy.git
cd glow-proxy
```
2. **Install Dependencies**
```
npm install
```
3. **Start Server**
```
node server.js
```

The server listens on `localhost:8080` and will redirect requests to `localhost:5097`

It will transform URLs that include a locale: `<host>/<locale>/<path>`

to the format `<host>/service/api/<path>` and add an x-locale header with the `<locale>` in it.

Example:

`localhost:8080/en-us/v4/products`

is rewritten and forwarded to:

`localhost:5097/service/api/v4/products`

with a header added of:

`x-locale: en-us`
