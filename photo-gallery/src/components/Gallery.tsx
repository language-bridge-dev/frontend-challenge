import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showImage } from "../redux/slices/imageSlice";

/**
 * The Gallery component displays a list of images saved in redux state.
 * @returns The Gallery component.
 */
const Gallery = () => {
  const images = useSelector((state: RootState) => state.gallery.images);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const imagesPerPage = 8;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  /**
   * This function takes a page number and returns a slice of the images array
   * @param pageNumber The page number to get the images for.
   * @returns A slice of the images array.
   */
  const getPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return images.slice(startIndex, endIndex);
  };

  const pageImages = getPage(pageNumber);
  const firstImage = (pageNumber - 1) * imagesPerPage + 1;
  const lastImage = Math.min(firstImage + pageImages.length - 1, images.length);

  /**
   * This function takes a new page number and sets the state to the new page number.
   * @param newPageNumber The new page number to set.
   */
  const changePage = (newPageNumber: number) => {
    if (newPageNumber >= 1 && newPageNumber <= totalPages)
      setPageNumber(newPageNumber);
  };

  /**
   * This function takes an image and dispatches an action to show the image.
   * @param image The image to show.
   */
  const showphoto = (image: string) => {
    dispatch(showImage(image));
  };

  return (
    <div className="gallery-wrapper">
      <div className="image-wrapper">
        {pageImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery image ${firstImage + index}`}
            className="img"
            onClick={() => showphoto(image)}
          />
        ))}
      </div>
      <nav className="pagination-wrapper" aria-label="Image pagination">
        <p>{`Showing ${firstImage}-${lastImage} of ${images.length} photos`}</p>
        <div className="pagination-buttons">
          <button
            type="button"
            onClick={() => changePage(pageNumber - 1)}
            disabled={pageNumber === 1}
            aria-label="Previous Page"
          >
            <MdOutlineKeyboardArrowLeft size={20} />
          </button>
          <p>{pageNumber + " / " + totalPages}</p>
          <button
            type="button"
            onClick={() => changePage(pageNumber + 1)}
            disabled={pageNumber === totalPages}
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
