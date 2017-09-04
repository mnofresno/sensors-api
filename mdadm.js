var _ = require('lodash');

var data = 'Personalities : [raid6] [raid5] [raid4] \nmd0 : active raid5 sda[4] sdd[3] sdc[5]\n      3906766752 blocks super 1.2 level 5, 4k chunk, algorithm 2 [3/3] [UUU]\n      \nunused devices: <none>\n';

var processDisks = function(discos)
{
    discos = data;
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
        
        if(key.startsWith("md"))
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

module.exports = { process: processDisks };