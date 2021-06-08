const fs = require('fs');
const request  = require('request');
var prompt = require('prompt');
let termName = process.argv[2];
const url = `https://icanhazdadjoke.com/search?term=`;

getJokes()
function getJokes () {
    console.log(url)
  request(url+termName,{ json: true }, function (error, response, body) {
    if(body.results.length == 0 )
    {
        console.log("No jokes were found! please enter another!")
        prompt.start();
        prompt.get(['term',], function (err, result) {
        termName = result.term
        getJokes();
          });
    }
    else
    {
        for(let i = 1 ; i<= body.total_pages ; i++)
        {
            request(`${url}${termName}&page=${i}`,{ json: true }, function (error, response, body) {
                body.results.forEach(element => {
                    fs.readFile('my_jokes.txt', 'utf8' , (err, data) => {
                        if(data && !data.includes(element.joke))
                        {
                            fs.appendFile('my_jokes.txt', `${element.joke}\n`, function (err) {
                                if (err) throw err;
                              });
                        }
                        else if(!data)
                        {
                            fs.appendFile('my_jokes.txt', `${element.joke}\n`, function (err) {
                                if (err) throw err;
                              });
        
                        }
                    })
                    
                
                });
            });
        }
         
    }  
});
}

