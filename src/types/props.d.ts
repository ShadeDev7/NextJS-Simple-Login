type ButtonProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEventHandler<HTMLButtonElement, MouseEvent>) => void;
};

type FormFieldProps = {
    id: string;
    label: string;
    type: "text" | "password";
    placeholder: string;
    value: string;
    changeValue: (value: object) => void;
};
