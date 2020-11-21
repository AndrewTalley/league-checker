const rp = require('request-promise')
const { apiKey } = require('../helper/config')

const rankedInfo = async playerId => {
    var options = {
        uri: `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerId}`,
        qs: {
            api_key: apiKey // -> uri + '?api_key=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    const rankedData = await rp(options)
    const soloQueue = rankedData.find(f => f.queueType === 'RANKED_SOLO_5x5')
    return { ...soloQueue }
    }
    
module.exports = rankedInfo