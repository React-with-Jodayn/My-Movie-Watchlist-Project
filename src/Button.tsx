type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-xl transition bg-teal-500  hover:text-black hover:bg-teal-400 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
