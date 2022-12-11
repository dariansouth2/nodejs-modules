const http = require("http");


http
.createServer((request, response) => {
const {url, method} = request;
const chunks = [];

http.request.on("error", (error)=> {
    response.statusCode = 400;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(error));
})
    .on("data", (chunk) =>{
        chunks.push(chunk);
    }).on("end", ( () =>{
        console.log(chunks)

        const body = Buffer.concat(chunks).toString()
        const responseBody = {
            url,
            method,
            body,
        }

        response.on("error", (error) =>{
            response.statusCode = 500;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            response.end()
        })
   

    switch(url){
        case"/":
        response.setHeader("Content-Type", "text/html");
        response.write(populateHTML("Raise the Anthem, Burlywood"));
        break;
        case"/about":
         const details = {
            name: "Darian",
            city: "Chicago"
         };

         response.setHeader("Content-Type", "application/json");
         response.write(JSON.stringify(details));
        break;
        case "/echo":
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(responseBody));
        break;
        default:
            response.setHeader("Content-Type", "text/html");
            response.write(populateHTML("404 Not Found. Try <a href= 'http://localhost:3000>this</a>"));
    }
    return response.end();
 }))
})
.listen(3000, ()=> console.log("Server listening on port 3000..."));
