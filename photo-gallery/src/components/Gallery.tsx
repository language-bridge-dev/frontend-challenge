import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Gallery = () => {
  const images = useSelector((state: RootState) => state.gallery.images);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (action: number) => {};
  const imagesPerPage = 8;
  const total =
    images.length === 0 ? 1 : Math.ceil(images.length / imagesPerPage);
  let firstImg;
  let lastImg;

  const getPage = (currentPage: number) => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const imgs = images.slice(startIndex, endIndex);
    firstImg = startIndex + 1;
    lastImg = startIndex + imgs.length;
    return imgs;
  };

  const renderedImages = getPage(currentPage);
  const changepage = (page: number) => {
    if (page >= 1 && page <= total) setCurrentPage(page);
  };
  return (
    <div className="gallery-wrapper">
      <div className="image-wrapper">
        {renderedImages.map((img, index) => {
          return (
            <img
              className="img"
              src={img}
              alt={"picture " + index}
              key={index}
            />
          );
        })}
      </div>
      <div className="pagination-wrapper">
        <p>{`Showing ${firstImg}-${lastImg} of ${images.length} photos`}</p>
        <div className="pagination-buttons">
          <MdOutlineKeyboardArrowLeft
            size={20}
            type="button"
            onClick={() => changepage(currentPage - 1)}
          />
          <p>{currentPage + " / " + total}</p>
          <MdOutlineKeyboardArrowRight
            size={20}
            type="button"
            onClick={() => changepage(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
