import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Gallery = () => {
  const images = useSelector((state: RootState) => state.gallery.images);
  return (
    <div className="gallery-wrapper">
      {images.map((img, index) => {
        return (
          <img className="img" src={img} alt={"picture " + index} key={index} />
        );
      })}
    </div>
  );
};

export default Gallery;
