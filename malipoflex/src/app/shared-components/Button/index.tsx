enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
}

interface ButtonProps {
  buttonText: string;
  variant: string;
  onClickHandler: () => void;
}

const Button = ({ buttonText, variant, onClickHandler }: ButtonProps) => {
  function variantStyles() {
    switch (variant) {
      case ButtonVariants.primary:
        return "bg-[#09675f] text-white"; 
      case ButtonVariants.secondary:
        return "bg-white text-[#be2f3f] border border-[#be2f3f]"; 
      default:
        return "";
    }
  }
  
  const variantClass = variantStyles();

  return (
    <button
      className={`${variantClass} px-[16px] py-[12px] rounded-md cursor-pointer transition-colors hover:opacity-90`}
      onClick={onClickHandler}
      type="button"
    >
      {buttonText}
    </button>
  );
};

export default Button;
