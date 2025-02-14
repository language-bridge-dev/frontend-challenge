import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showImage } from "../redux/slices/imageSlice";

const Gallery = () => {
  const images = useSelector((state: RootState) => state.gallery.images);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const imagesPerPage = 8;
  const total =
    images.length === 0 ? 1 : Math.ceil(images.length / imagesPerPage);

  const getPage = (currentPage: number) => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return images.slice(startIndex, endIndex);
  };

  const renderedImages = getPage(currentPage);
  const firstImg = (currentPage - 1) * imagesPerPage + 1;
  const lastImg = Math.min(firstImg + renderedImages.length - 1, images.length);
  const changepage = (page: number) => {
    if (page >= 1 && page <= total) setCurrentPage(page);
  };
  const showphoto = (image: string) => {
    dispatch(showImage(image));
  };

  return (
    <div className="gallery-wrapper">
      <div className="image-wrapper">
        {renderedImages.map((img, index) => {
          return (
            <img
              className="img"
              src={img}
              alt={`Gallery image ${index + firstImg}`}
              key={index}
              onClick={() => {
                showphoto(img);
              }}
            />
          );
        })}
      </div>
      <nav className="pagination-wrapper" aria-label="Image pagination">
        <p>{`Showing ${firstImg}-${lastImg} of ${images.length} photos`}</p>
        <div className="pagination-buttons">
          <button
            type="button"
            onClick={() => changepage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <MdOutlineKeyboardArrowLeft size={20} />
          </button>
          <p>{currentPage + " / " + total}</p>
          <button
            type="button"
            onClick={() => changepage(currentPage + 1)}
            disabled={currentPage === total}
            aria-label="Next Page"
          >
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Gallery;
