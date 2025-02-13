import { MdOutlinePhotoCamera } from "react-icons/md";
type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <div className="button-wrapper">
      <button onClick={onClick} className="button" type="button">
        <MdOutlinePhotoCamera size={35} /> {text}
      </button>
    </div>
  );
};

export default Button;
