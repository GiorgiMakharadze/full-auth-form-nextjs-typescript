import { BeatLoader } from "react-spinners";

interface SlideButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  slide_text: string;
  disabled: boolean;
  icon: JSX.Element;
}

const SlideButton: React.FC<SlideButtonProps> = (props) => {
  const { type, text, slide_text, disabled, icon } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className="relative w-full inline-flex items-center justify-center px-8 py-3 mt-4 overflow-hidden font-medium bg-green-400 transition duration-300 ease-outborder-2 rounded-md group"
    >
      {disabled ? (
        <BeatLoader color="#fff" size={15} />
      ) : (
        <>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
            {icon}&nbsp;{slide_text}
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            {text}
          </span>
          <span className="realative invisible">{text}</span>
        </>
      )}
    </button>
  );
};

export default SlideButton;
