type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-xl transition   ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
