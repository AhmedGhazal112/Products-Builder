import { InputHTMLAttributes } from "react";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({...rest}: IProps) => {
  return <input className="p-2 rounded-md focus:outline-indigo-500 shadow-md border focus:border-indigo-500 border-gray-400" {...rest} />;
};
