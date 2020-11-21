const rp = require('request-promise')
const { apiKey } = require('../helper/config')

const summonerInfo = async playerName => {
    var options = {
        uri: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}`,
        qs: {
            api_key: apiKey // -> uri + '?api_key=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    const sumInfo = await rp(options)
    return { ...sumInfo }
    }

module.exports = summonerInfo