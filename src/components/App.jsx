import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import { Button } from './Button/Button';
import { fetchImage } from '../api/Api.js';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import { Layout, Preloader } from './Loyaut';
import { Spiner } from './Spinner/Spiner';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;

    async function getImages() {
      const indexOfQuery = query.indexOf('/') + 1;
      const valueOfQuery = query.slice(indexOfQuery).toLowerCase();

      if (valueOfQuery === '') {
        return toast.error(
          'You cannot send an empty request, please write something'
        );
      }

      try {
        setLoading(true);
        const { hits, total } = await fetchImage(page, valueOfQuery);

        if (total === 0 || !hits) {
          return toast.error('Didnt find it, try again');
        }

        setImages(page === 1 ? hits : prevState => [...prevState, ...hits]);
        setTotal(total);
      } catch (error) {
        toast.error(`Oops, ${error}. Please try again.`);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const heandleChange = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();
    const reqId = nanoid();
    setQuery(`${reqId}/${newQuery}`);
    setImages([]);
    setPage(1);
    setTotal(null);
    e.target.reset();
  };

  const heandleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Layout>
      <Searchbar onChange={heandleChange} />
      {loading && (
        <Preloader>
          <Spiner />
        </Preloader>
      )}
      {images.length > 0 && <ImageGallery images={images} />}

      {total && total !== images.length && <Button onClick={heandleLoadMore} />}
      <ScrollToTop smooth />
      <Toaster />
      <GlobalStyle />
    </Layout>
  );
};
