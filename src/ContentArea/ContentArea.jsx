import RandomCombatGenerator from "./RandomCombatGenerator";

export default function ContentArea({ content }) {
    return (
    content === 'Combat Generator' && <RandomCombatGenerator />
    
    );
}