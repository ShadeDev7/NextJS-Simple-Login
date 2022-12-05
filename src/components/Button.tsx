export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            className="w-full rounded-sm bg-indigo-500 p-3 font-bold text-white transition-colors duration-300 hover:bg-indigo-600"
            {...(onClick && { onClick })}
        >
            {children}
        </button>
    );
}
