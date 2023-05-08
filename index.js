const fs = require("fs")
const http = require("http")
const url = require("url")
  const replaceTemplate =require('./modules/replaceTemplate')

const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/tempcard.html`, "utf-8")
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8")
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)
const server = http.createServer((req, res) => {
 
  const {query,pathname}=(url.parse(req.url, true));

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj.map((e1) => replaceTemplate(tempCard, e1)).join("")
    const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml)

    res.end(output)
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product=dataObj[query.id ];
    const output=replaceTemplate(tempProduct,product);

    res.end(output)
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" })
    res.end(data)
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "This is my first url",
    })
    res.end("<h1>this page is not found!!</h1>")
  }

  // res.end("hello from the server")
})
server.listen(9000, "localhost", () => {
  console.log("server is started on the local host")
})
