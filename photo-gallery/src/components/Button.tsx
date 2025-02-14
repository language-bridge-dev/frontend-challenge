import { JSX } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
type ButtonProps = {
  text: string;
  onClick: () => void;
};

/**
 * A simple button component that displays a camera icon and the given text.
 * This component is used in the Camara component to take a photo.
 *
 * @param {ButtonProps} props
 * @prop {string} text - The text displayed on the button
 * @prop {() => void} onClick - The function to call when the button is clicked
 * @returns {JSX.Element}
 */
const Button = ({ onClick, text }: ButtonProps): JSX.Element => {
  return (
    <div className="button-wrapper">
      <button onClick={onClick} className="button" type="button">
        <MdOutlinePhotoCamera size={35} /> {text}
      </button>
    </div>
  );
};

export default Button;
