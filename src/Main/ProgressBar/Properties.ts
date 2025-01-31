import { Player } from '../../types/player'
import { format } from '../../Utilities/Format'
import { updateElementById, updateStyleById } from '../../Utilities/Render'
import { onCriticalHit, unlockStuff } from '../../Utilities/UpdateHTML'
import { getElementById } from '../../Utilities/Render'
import { checkChallenge } from '../Challenges/checkChallenge'
import { Challenges } from '../Challenges/types'
import { toggleChallenge } from '../Challenges/toggles'
import { Alert } from '../../HTML/Popups'

/**
 * Basic Bar Stats
 */
const baseEXPReq = 5
let currentPerSec = 0
let previousPerSec = 0

export const computeMainBarTNL = (player: Player) => {
    const squareMultiplier = Math.pow(player.barLevel + 1, 2)
    const exponentialMultiplier = Math.pow(1.5, player.barLevel + 1) / 10
    return baseEXPReq * Math.max(squareMultiplier, exponentialMultiplier)
}

export const incrementMainBarEXP = (delta: number, player: Player, forceCrit = false) => {
    if (delta === undefined || delta === null) {
        return
    }
    let baseAmountPerSecond = 1
    baseAmountPerSecond += player.coinUpgrades.barSpeed.upgradeEffect()
    baseAmountPerSecond *= player.barFragments.unspentBonus()
    baseAmountPerSecond *= Math.pow(
        1 + player.coinUpgrades.barMomentum.upgradeEffect(),
        Math.sqrt(100 * Math.min(1, player.barEXP / player.barTNL))
    )

    baseAmountPerSecond *= player.talents.barSpeed.talentEffect()
    baseAmountPerSecond *= Math.pow(1 + player.coinUpgrades.barEmpowerment.upgradeEffect(), player.barLevel)

    const criticalRoll = (forceCrit) ? -1 : Math.random()

    if (criticalRoll < getCritTickChance(player)) {
        let superCrit = false
        baseAmountPerSecond *= player.coinUpgrades.barVibration.upgradeEffect()
        player.talents.barCriticalChance.gainEXP(delta)
        player.criticalHits += 1
        player.criticalHitsThisRefresh += 1

        const superCriticalRoll = Math.random()
        if (superCriticalRoll < player.coinUpgrades.barResonance.upgradeEffect()) {
            baseAmountPerSecond *= 3
            player.coins.gain(Math.floor(player.barLevel / 5) + 3)
            superCrit = true
        }

        onCriticalHit(player, superCrit)
    }

    const actualAmount = baseAmountPerSecond * delta
    player.barEXP += actualAmount
    currentPerSec += actualAmount

    updateElementById(
        'perSecCurr',
        { textContent: `+${format(currentPerSec,2)} this sec` }
    )
}

/**
 * Obtain the width of a progress bar given current progress and required progress
 * @param currScore The amount of progress (number) the player has toward something
 * @param targetScore How much progress is needed to fill the progress bar
 * @returns a Number [0, 100] indicating how wide the bar should be, with precision 0.1
 */
export const getBarWidth = (currScore: number, targetScore: number) => {
    // Only return increments of 0.1%
    return Math.min(100, 0.1 * Math.floor(1000 * currScore / targetScore))
}

export const updateMainBar = (width: number) => {
    updateStyleById(
        'progression',
        { width: `${width}%` }
    )
}

export const backgroundColorCreation = (player: Player) => {

    // Challenge
    if (player.currentChallenge !== 'None') {
        return 'lightgoldenrodyellow'
    }

    // "BOSS"
    if (player.barLevel % 5 === 0) {
        if (player.barLevel >= 320) return '#FF0000'

        const R = (128 + 4 * Math.floor(player.barLevel / 10)).toString(16).padStart(2, '0')
        return `#${R}0000`
    }

    if (player.barLevel >= 128) return '#FFFFFF'

    const R = (128 + player.barLevel).toString(16).padStart(2, '0')
    const G = (2 * player.barLevel).toString(16).padStart(2, '0')
    const B = (128 + player.barLevel).toString(16).padStart(2, '0')

    return `#${R}${G}${B}`
}

export const levelUpBar = (player: Player) => {
    player.coins.gain(player.coinValueCache)
    player.coinValueCache = computeMainBarCoinWorth(player)
    player.barEXP -= player.barTNL
    player.barLevel += 1

    if (player.barLevel > player.highestBarLevel) {
        player.highestBarLevel = player.barLevel
        unlockStuff(player)
    }

    const barColor = backgroundColorCreation(player)
    updateStyleById(
        'progression',
        { backgroundColor: barColor }
    )

    player.barTNL = computeMainBarTNL(player)

    // Adjust barEXP to prevent overleveling / snowball effect on levels
    player.barEXP /= 10
    player.barEXP = Math.min(player.barEXP, Math.floor(player.barTNL / 10))

    const width = getBarWidth(player.barEXP, player.barTNL)
    updateMainBar(width)

    updateElementById(
        'coinWorth',
        { textContent: `Worth ${format(player.coinValueCache)} coins` }
    )
    player.barFragments.updateHTML()

    if (player.barLevel === 20) {
        player.talents.barCriticalChance.updateHTML('Level20')
        player.talents.barSpeed.updateHTML('Level20')
    }

    if (player.currentChallenge !== 'None') {
        const name = player.currentChallenge
        if (checkChallenge(name, player)) {
            type c = keyof typeof player.completedChallenges
            const conversion: Record<Challenges, c> = {
                'Basic Challenge': 'basicChallenge',
                'No Refresh': 'noRefresh',
                'No Coin Upgrades': 'noCoinUpgrades',
                'Reduced Bar Fragments': 'reducedFragments',
                'None': 'reducedFragments' // This code is awful, so awful I never want to write code again. -Platonic
            }
            const dictKey = conversion[name]
            player.completedChallenges[dictKey] += 1

            void toggleChallenge('None', player, true)
            return Alert(`Congratulations! You have completed 
            ${name} #${player.completedChallenges[dictKey]}! 
            Ant God is satisfied.`)
        }
    }
}

export const updateMainBarInformation = (player: Player) => {
    updateElementById(
        'level',
        { textContent: `Level: ${player.barLevel}` }
    )
    updateElementById(
        'exp',
        { textContent: `EXP: ${format(player.barEXP)}/${format(player.barTNL)}` }
    )
}

export const updateDPS = (player: Player) => {
    previousPerSec = currentPerSec
    currentPerSec = 0
    updateElementById(
        'perSecPrev',
        { textContent: `+${format(previousPerSec,2)} prev sec` }
    )

    player.talents.barCriticalChance.updateHTML('Time')
    player.talents.barSpeed.gainEXP(previousPerSec)
    player.talents.barSpeed.updateHTML('Time')
    player.talents.coinGain.updateHTML('Time')

}

export const computeMainBarCoinWorth = (player: Player) => {
    let baseWorth = 0

    const nextLevel = 1 + player.barLevel

    // Every level: 33.3% chance to be worth coins
    if (Math.random() < 1/3 && nextLevel >= 10) {
        baseWorth += Math.floor(nextLevel / 10) + 1
    }

    if (nextLevel === 5) {
        baseWorth += 3
    }

    if (nextLevel === 10) {
        baseWorth += 5
    }

    if (nextLevel > player.highestBarLevel) {
        baseWorth += 3
    }

    if (nextLevel >= 101 && player.completedChallenges.basicChallenge > 0) {
        baseWorth += 1
    }

    baseWorth *= (1 + player.talents.coinGain.talentEffect())
    baseWorth *= (1 + player.completedChallenges.basicChallenge / 100)
    baseWorth *= (player.completedChallenges.basicChallenge === 25) ? 1.15 : 1

    if (baseWorth > 100) {
        baseWorth = 10 * Math.pow(baseWorth, 1/2)
    }

    const RNGCoin = baseWorth - Math.floor(baseWorth)
    if (Math.random() < RNGCoin) {
        baseWorth += 1
    }

    baseWorth = Math.floor(baseWorth)

    const coinHTML = getElementById('coinWorth')
    coinHTML.style.color = (baseWorth > 0) ? 'gold' : 'grey'


    return baseWorth
}

export const getCritTickChance = (player: Player) => {
    return player.coinUpgrades.barReverberation.upgradeEffect() +
            player.talents.barCriticalChance.talentEffect()
}