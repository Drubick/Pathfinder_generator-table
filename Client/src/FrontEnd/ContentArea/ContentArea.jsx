import RandomCombatGenerator from "./CombatGenerator/RandomCombatGenerator";
import Canvas from "./Canvas/Canvas";
export default function ContentArea({ content }) {
    return (
        <>
            {content === 'Combat Generator' && <RandomCombatGenerator />}
            {content === 'Map' && <Canvas />}
        </>
    );
}