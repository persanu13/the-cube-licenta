import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";

interface InputProps {
  label: string;
  name: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  icon?: "user" | "key" | "at";
  required?: boolean;
  errors?: string[];
  className?: string;
  defaultValue?: string;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  icon,
  defaultValue,
  required = false,
  errors = [],
  ...props
}: InputProps) {
  const icons = {
    user: UserIcon,
    key: KeyIcon,
    at: AtSymbolIcon,
  };
  const IconComponent = icon ? icons[icon] : null;

  return (
    <div className="flex flex-col w-full font-hanuman text-charade-950 text-sm gap-1">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-carnation-600 ml-[2px]">*</span>}
      </label>
      <div className="relative">
        <input
          className="bg-spring-white block w-full rounded-sm  py-2 pl-8
          outline-1 outline-tuatara-400 placeholder:text-tuatara-400 placeholder:font-light
          focus:outline-carnation-400 focus:border-carnation-400 focus:shadow-glow-carnation"
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-describedby={`${name}-error`}
        />
        {IconComponent && (
          <IconComponent className="pointer-events-none absolute stroke-2 left-2  top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-carnation-400" />
        )}
      </div>
      {errors.length > 0 && (
        <div>
          {errors.map((eroor, index) => {
            return (
              <p key={index} className="text-carnation-600 font-light font-">
                {eroor}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
