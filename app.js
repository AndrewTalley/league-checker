const rp = require('request-promise')
const { Client } = require('discord.js')
const summonerInfo = require('./fn/summonerApi')
const rankedInfo = require('./fn/rankedApi')
const calculateWinRate = require('./fn/calculateWinRate')
const { token, apiKey } = require('./helper/config')

const client = new Client();

client.once('ready', () => {
    console.log(`${client.user.tag} is ready!`)
})

client.on('message', async message => {
    if (message.content.startsWith('!')) {
    const sumData = await summonerInfo(message.content.replace('!', '')).catch(f => f)
    const { id, summonerLevel } = sumData
    const rankedData = await rankedInfo(id).catch(d => d)
    const { summonerName, rank, tier, wins, losses, leaguePoints } = rankedData

    if (!rankedData) return message.reply(`This account is unranked. Please try another user.`)
    if (!summonerName) return message.reply('This account does not exist.')

    const finalData = [
        'SummonerName: ' + summonerName,
        'SummonerLevel: ' + summonerLevel,
        `Rank: ${tier}${rank}`,
        'Wins: ' + wins,
        'Loss: ' + losses,
        'WinRate: ' + await calculateWinRate(wins, losses),
        'LP: ' + leaguePoints
        ]
    message.channel.send(finalData)
    }
})

client.login(token)