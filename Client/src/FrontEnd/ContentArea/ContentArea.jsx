import RandomCombatGenerator from "./CombatGenerator/RandomCombatGenerator";
import Canvas from "./Canvas/Canvas";
export default function ContentArea({ content }) {
    return (
        <div className="w-full h-full">
            {content === 'Combat Generator' && <RandomCombatGenerator />}
            {content === 'Map' && <Canvas />}
        </div>
    );
}