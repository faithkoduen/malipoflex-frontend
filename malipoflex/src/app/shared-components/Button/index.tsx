

interface ButtonProps {
  buttonText: string;
  variant: string;
  onClickHandler: () => void;
}

const Button = ({ buttonText, variant, onClickHandler }: ButtonProps) => {
  const buttonVariants = () => {
    switch (variant.toLowerCase()) {
      case 'primary':
        return 'bg-custom-yellow text-white ';
      case 'secondary':
        return 'bg-[#F6A704] text-white border-white-500 w-50 text-2xl font-semibold';
      default:
        return 'bg-custom-blue text-white';
    }
  };

  const variantStyles = buttonVariants();

  return (
    <button
      className={`${variantStyles} px-[20px] py-[16px] cursor-pointer rounded-md border-none`}
      onClick={onClickHandler}
    >
      {buttonText}
    </button>
  );
};

export default Button;