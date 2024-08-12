import { cn } from "@/utils/cn.js";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-[--primary] px-3 py-2 m-0.5 border-none rounded-md hover:shadow-md",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
