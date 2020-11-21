const calculateWinRate = async (wins, losses) => {
    const totalGames = wins + losses
    const winPercentage = wins * 100 / totalGames
    const total = winPercentage.toFixed() + '%'
    return total
}

module.exports = calculateWinRate