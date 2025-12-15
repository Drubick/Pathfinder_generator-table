export default function Button({ text, action, callback, type = "button", isFileUpload = false, accept, onChange }) {
    const handleClick = (event) => {
        event.stopPropagation();
        if (action) {
            const result = action();
            if (callback) {
                callback(result);
            }
        }
    };

    // Si es un botón de upload de archivos
    if (isFileUpload) {
        return (
            <label className="shadow-lg hover:cursor-pointer bg-tertiary-light dark:bg-tertiary-dark
                hover:bg-tertiary-light-2 hover:dark:bg-tertiary-dark-2 py-1 px-2 border rounded inline-block text-center">
                {text}
                <input 
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                />
            </label>
        );
    }

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