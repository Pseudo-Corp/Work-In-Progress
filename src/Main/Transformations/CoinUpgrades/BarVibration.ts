import type { Player } from '../../../types/player'
import { getProperty } from 'dot-prop'
import { CoinBarVibration, coinUpgradeCosts } from '../../Upgrades/Variants/Coin'

const path = 'coinUpgrades.barVibration' as const

export const transform = (data: Partial<Player>, player: Player) => {
    const value = getProperty(data, path) ?? getProperty(player, path)

    return new CoinBarVibration(
        value?.level ?? 0,
        coinUpgradeCosts.barVibration,
        player
    )
}