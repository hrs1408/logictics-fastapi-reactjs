interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    
}

const Input = (props: InputProps) => {
    const {label, placeholder, type, value, onChange} = props;

    return (
        <div className="input flex flex-col gap-2">
            <label className={'font-bold'}>{label}</label>
            <input
                className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;