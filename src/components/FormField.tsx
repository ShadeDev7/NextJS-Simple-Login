export default function FormField({
    id,
    label,
    type,
    placeholder,
    value,
    changeValue,
}: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="ml-0.5 font-medium text-neutral-700">
                {label}
            </label>

            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="rounded-sm p-3 placeholder:text-sm"
                value={value}
                onChange={e => changeValue({ [e.target.id]: e.target.value })}
            />
        </div>
    );
}
