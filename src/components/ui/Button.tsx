import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button {...rest} className={`${className} p-2 w-full rounded-md text-white mt-5`}>
      {children}
    </button>
  );
};

export default Button;
