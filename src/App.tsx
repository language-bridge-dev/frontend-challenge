import CameraCapture from './components/CameraCapture';
import PhotoGallery from './components/PhotoGallery';
import { useEffect, useState } from 'react';
import { Photo } from '../types';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const photosPerPage = 6;

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageCount = Math.ceil(photos.length / photosPerPage);

  const deletePhoto = (id: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    setPhotos(updatedPhotos);
    localStorage.setItem('photos', JSON.stringify(updatedPhotos));

    const updatedPageCount = Math.ceil(updatedPhotos.length / photosPerPage);

    if (currentPage > updatedPageCount) {
      setCurrentPage(updatedPageCount);
    }

    if (updatedPhotos.length === 0) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const storedPhotos = localStorage.getItem('photos');
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem('photos', JSON.stringify(photos));
    }
  }, [photos]);

  return (
    <div className="flex flex-wrap sm:flex-nowrap">
      <PhotoGallery
        photos={currentPhotos}
        setPhotos={setPhotos}
        paginate={paginate}
        currentPage={currentPage}
        pageCount={pageCount}
        deletePhoto={deletePhoto}
      />
      <CameraCapture setPhotos={setPhotos} />
    </div>
  );
}

export default App;
