import { useState } from "react";
import Button from "../../UI/Button";

export default function MonsterStats({ monster }) {
    const [showMore, setShowMore] = useState(false);

    if (!monster) {
        return <div></div>;
    }

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="flex flex-col border-t-2 mt-2 pt-2">
            <div>AC: {monster.ac}</div>
            <div>HP: {monster.hp}</div>
            <div>LVL: {monster.level}</div>
            <div>Perception: {monster.perception}</div>
            <div>Strength: {monster.strength}</div>
            <div>Dexterity: {monster.dexterity}</div>
            <div>Constitution: {monster.constitution}</div>
            <div>Wisdom: {monster.wisdom}</div>
            <div>Intellect: {monster.intellect}</div>
            <div>Charisma: {monster.charisma}</div>
            <div>Fortitude Save: {monster.fortitude_save}</div>
            <div>Reflex Save: {monster.reflex_save}</div>
            <div>Will Save: {monster.will_save}</div>
            <div className="flex items-center justify-center my-2">
                <Button text={"Show More"} action={toggleShowMore} type="button"/>
            </div>
            {showMore && (
                <div>
                    <div>Type: {monster.type}</div>
                    <div>Size: {monster.size}</div>
                    <div>Immunities: {monster.immunities}</div>
                    <div>Speed: {monster.speed}</div>
                    <div>Other Speeds: {monster.other_speeds}</div>
                    <div>Senses: {monster.senses}</div>
                    <div>Languages: {monster.languages}</div>
                </div>
            )}
        </div>
    );
}