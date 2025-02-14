import { data } from "autoprefixer";

export default function Selections({ Data }) {
    return(
        <div>
            {Data.map((item) => (
                <div className="hover:cursor-pointer">
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    )
}