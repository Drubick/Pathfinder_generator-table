import LeftMenuItem from "./LeftMenuItem";

const navItems = [
    {
        title: "Random Generators", options: ["Encounter Generator asdasdyagfsudgauysdfausydfaiusydtfas", "Map Generator",], colapsed: true, 
    },
    {
        title: "Builders", options: ["Encounter Builders", "Map Builder"], colapsed: true
    },
    {
        title: "AI Assistance", options: ["General chatbot", "Combat generator"], colapsed: true
    }
];

export default function LeftMenu({setContent}) {
    return (
        <div className="max-w-40
         bg-neutral-200 break-words pl-2">
            <LeftMenuItem item={navItems} setContent={setContent}/>
        </div>
    );
};
