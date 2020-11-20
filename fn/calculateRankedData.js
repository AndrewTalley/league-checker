const { apiKey } = require('../helper/config')
const { newUrl } = require('../app')

const calculateRankedData = async () => {
    const summonerInfoData = await summonerInfo(newUrl) 
    const { id, summonerLevel } = summonerInfoData
    const updatedUrl = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}`
    const rankedInfoData = await rankedInfo(updatedUrl)
    const { summonerName, rank, tier, wins, losses, leaguePoints } = Object.assign({}, rankedInfoData, summonerInfoData)
        
    const totalGames = wins + losses
    const winPercentage = wins * 100 / totalGames 
    const total = winPercentage.toFixed() + '%'
    const finalData = [
        'SummonerName: ' + summonerName,
        'SummonerLevel: ' + summonerLevel,
        `Rank: ${tier}${rank}`,
        'Wins: ' + wins,
        'Loss: ' + losses,
        'WinRate: ' + total,
        'LP: ' + leaguePoints
        ]
    return { finalData, rankedInfoData, summonerName }
}

module.exports = calculateRankedData