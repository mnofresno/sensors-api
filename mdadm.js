var _            = require('lodash');
var childProcess = require('child_process');

var processDisks = function(data)
{
    discos = data.toString();
    discos = discos.split("\n");
    var output = {};
    var matchBraces = /\[(.*?)\]/g;
    
    discos = _.filter(discos, function(l)
    {
        return l.trim() !== '';
    });
    _.forEach(discos, function(line)
    {
        var o = {};
        
        var s = _.map(line.split(":"), function(val)
        {
            return val.trim();
        });
        
        var key = s[0];
        var value = s[1];
        
        if(key.indexOf('recovery') > -1)
        {
            key = 'recovering';
            value = s[0];
        }
        
        if(key.indexOf('blocks') > -1)
        {
            key = 'definition';
            value = s[0];
        }
        
        if(key === "Personalities")
        {
            key = "personalities";
            value = _.map(value.match(matchBraces), function(p)
            {
                return p.replace("[","").replace("]",""); 
            }); 
        }
        
        if(/md\d/.test(key))
        {
            var components = value.split(" ");
            value = components;
            output.status = components[0];
            output.type = components[1];
            output[key] = components.splice(0, 2);
        }
        
        output[key] = value;
    });
    return output;
};

var getMdStats = function(callback)
{
    childProcess.exec('cat /proc/mdstat', function(error, stdout, stderr)
    {
        callback(processDisks(stdout), error);
    });
};

module.exports = { process: processDisks, stats: getMdStats };