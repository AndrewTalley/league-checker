const { Client } = require('discord.js')
const fetch = require('node-fetch')
const calculateRankedData = require('./fn/calculateRankedData')
const { token, apiKey } = require('./helper/config')

const client = new Client();

client.once('ready', () => {
    console.log(`${client.user.tag} is ready!`)
})


client.on('message', message => {
    const addNameToURL = message.content.replace('!', '')
    if (message.content.startsWith('!')) {
    const newUrl = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${addNameToURL}?api_key=${apiKey}`
    
    module.exports = summonerInfo = async () => {
        const response = await fetch(newUrl)
        const { id, summonerLevel } = await response.json()
        const summonerData = { id: id, summonerLevel: summonerLevel }
        return summonerData
    }

    module.exports = rankedInfo = async resultUrl => {
        const response = await fetch(resultUrl);
        const result = await response.json();
        if (result.status) return response
        const rankedData = await result.find(f => f.queueType === 'RANKED_SOLO_5x5')
        return rankedData
    }
    const sumRankInfo = async () => {
        const { finalData, rankedInfoData, summonerName } = await calculateRankedData()

        if (!rankedInfoData) return message.reply(`This account is unranked. Please try another user.`)
        if (summonerName === undefined) return message.reply('This account does not exist.')
        
        message.channel.send(finalData)
        }
    return sumRankInfo()
    }
})


client.login(token)