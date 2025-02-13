export default function Button({text}){
    return(
        <button className=" shadow-lg hover:cursor-pointer  bg-tertiary-light
        dark:bg-tertiary-dark hover:bg-tertiary-light-2 hover:dark:bg-tertiary-dark-2
        py-1 px-2 border rounded">{text}</button>
    )
    }