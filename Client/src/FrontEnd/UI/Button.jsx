export default function Button({ text, action, callback, type = "button" }) {
    const handleClick = (event) => {
        event.stopPropagation();
        if (action) {
            const result = action();
            if (callback) {
                callback(result);
            }
        }
    };

    return (
        <button
            className="shadow-lg hover:cursor-pointer bg-tertiary-light dark:bg-tertiary-dark
            hover:bg-tertiary-light-2 hover:dark:bg-tertiary-dark-2 py-1 px-2 border rounded"
            onClick={handleClick}
            type={type}
        >
            {text}
        </button>
    );
}