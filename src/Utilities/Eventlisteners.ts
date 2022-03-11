import { resetGame, tock } from '../Game';
import { reset } from '../Main/Reset/Refresh';
import { Player } from '../types/player';
import { hideStuff } from './UpdateHTML';
import { getElementById } from './Render';
import { testFighter } from '../Main/Combat/Player/Fighter';

export const generateEventHandlers = (player: Player) => {
    getElementById('main-tab-nav').addEventListener('click', () => hideStuff('Main'));
    getElementById('upgrade-tab-nav').addEventListener('click', () => hideStuff('Upgrades'));
    getElementById('talent-tab-nav').addEventListener('click', () => hideStuff('Talents'))
    getElementById('dueling-tab-nav').addEventListener('click', () => hideStuff('Dueling'))

    getElementById('buy-coin-bar-speed').addEventListener(
        'click',
        (event) => player.coinUpgrades.barSpeed.purchaseLevels(1, event)
    );
    getElementById('buy-coin-bar-momentum').addEventListener(
        'click',
        (event) => player.coinUpgrades.barMomentum.purchaseLevels(1, event)
    );
    getElementById('buy-coin-bar-reverberation').addEventListener(
        'click',
        (event) => player.coinUpgrades.barReverberation.purchaseLevels(1, event)
    )
    getElementById('buy-coin-bar-vibration').addEventListener(
        'click',
        (event) => player.coinUpgrades.barVibration.purchaseLevels(1, event)
    )
    getElementById('buy-coin-bar-agitation').addEventListener(
        'click',
        (event) => player.coinUpgrades.barAgitation.purchaseLevels(1, event)
    )
    getElementById('buy-coin-bar-adoption').addEventListener(
        'click',
        (event) => player.coinUpgrades.barAdoption.purchaseLevels(1, event)
    )
    getElementById('buy-coin-bar-empowerment').addEventListener(
        'click',
        (event) => player.coinUpgrades.barEmpowerment.purchaseLevels(1, event)
    )
    getElementById('buy-coin-bar-reinforcement').addEventListener(
        'click',
        (event) => player.coinUpgrades.barReinforcement.purchaseLevels(1, event)
    )
    getElementById('buy-coin-bar-resonance').addEventListener(
        'click',
        (event) => player.coinUpgrades.barResonance.purchaseLevels(1, event)
    )
    getElementById('buy-reset').addEventListener('click', () => reset('Refresh', player));
    getElementById('reset-game').addEventListener('click', () => void resetGame());
    getElementById('simulate-time').addEventListener('click', () => void tock(3600))

    getElementById('talentCriticalChanceSacrifice').addEventListener(
        'click',
        () => void player.talents.barCriticalChance.sacrificeFragments()
    );

    getElementById('talentProgressSpeedSacrifice').addEventListener(
        'click',
        () => void player.talents.barSpeed.sacrificeFragments()
    );

    getElementById('talentCoinGainSacrifice').addEventListener(
        'click',
        () => void player.talents.coinGain.sacrificeFragments()
    );

    getElementById('basicAttack').addEventListener(
        'click',
        () => void testFighter.attack()
    );
}
