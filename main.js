var lm_sensors = require('sensors.js');
var http       = require('http');

function readSensors(response)
{
    lm_sensors.sensors(function (data, error)
    {
        if (error) throw error;
        response.end(JSON.stringify(data));
    });
}

const PORT=8922; 

function handleRequest(request, response)
{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if ( request.method === 'OPTIONS' ) 
    {
        response.writeHead(202);
        response.end();
        return;
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    
    readSensors(response);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function()
{
    console.log("Server listening on: http://localhost:%s", PORT);
});