import RandomCombatGenerator from "./CombatGenerator/RandomCombatGenerator";
export default function ContentArea({ content }) {
    return (
    content === 'Combat Generator' && <RandomCombatGenerator />
    
    );
}