import { useState } from 'react';
import { Photo } from '../../types';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { BsTrash3 } from 'react-icons/bs';

const PhotoGallery = ({
  photos,
  setPhotos,
  paginate,
  currentPage,
  pageCount,
  deletePhoto,
}: {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  pageCount: number;
  deletePhoto: (id: string) => void;
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleThumbnailClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleDeletePhoto = () => {
    if (selectedPhoto) {
      deletePhoto(selectedPhoto.id);
      closeModal();
    }
  };

  const handleDeleteAllPhotos = () => {
    if (window.confirm('Are you sure you want to delete all photos?')) {
      setPhotos([]);
      localStorage.removeItem('photos');
    }
  };

  return (
    <div className="min-w-80 w-full h-screen sm:w-80 bg-slate-700 p-2 relative overflow-hidden">
      <h1 className="text-violet-500 text-center font-bold text-lg mb-12">Photo Gallery</h1>
      {photos.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-2 place-items-center mb-6">
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={`Captured ${photo.id}`}
                className="w-full h-auto object-cover hover:opacity-75 hover:cursor-pointer"
                onClick={() => handleThumbnailClick(photo)}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex flex-col gap-8 justify-center items-center mt-4 absolute bottom-4 left-0 right-0">
            <div className="flex items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:cursor-pointer disabled:bg-slate-900 disabled:opacity-20 disabled:cursor-default transition-colors duration-200"
              >
                <MdNavigateBefore />
              </button>
              <span className="mx-4 text-white">
                Page {currentPage} of {pageCount}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:cursor-pointer disabled:bg-slate-900 disabled:opacity-20 disabled:cursor-default transition-colors duration-200"
              >
                <MdNavigateNext />
              </button>
            </div>
            <button
              onClick={handleDeleteAllPhotos}
              className="flex justify-center items-center gap-2 px-4 py-1 w-54 bg-red-700 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer transition-colors duration-200"
            >
              <BsTrash3 className="inline-block" />
              Delete All
            </button>
          </div>

          {/* Modal para mostrar la foto seleccionada */}
          {selectedPhoto && (
            <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center z-50" onClick={closeModal}>
              <img
                src={selectedPhoto.src}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={handleDeletePhoto}
                className="flex justify-center items-center gap-2 ml-10 px-4 py-1 w-26 bg-red-700 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer transition-colors duration-200"
              >
                <BsTrash3 className="inline-block" />
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-white mt-36">
          <p>Take some photos!</p>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
