import { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import { Button } from './Button/Button';
import { fetchImage } from '../api/Api.js';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from 'GlobalStyle';
import { Layout, SpinerMargin } from './Loyaut';
import { Spiner } from './Spinner/Spiner';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    total: null,
    loading: false,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const { query, page } = this.state;
      const indexOfQuery = query.indexOf('/') + 1;
      const valueOfQuery = query.slice(indexOfQuery);
      if (valueOfQuery === '') {
        return toast.error(
          'You cannot send an empty request, please write something'
        );
      }
      try {
        this.setState({ loading: true });
        const { hits, total } = await fetchImage(page, valueOfQuery);

        if (total === 0 || !hits) {
          return toast.error('Didnt find it, try again');
        }

        this.setState({
          images: page === 1 ? hits : [...prevState.images, ...hits],
          total: total,
        });
      } catch (error) {
        toast.error(`Oops, ${error}. Please try again.`);
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  heanleChange = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();
    const reqId = nanoid();
    this.setState({
      query: `${reqId}/${newQuery}`,
      images: [],
      page: 1,
      total: null,
    });
    e.target.reset();
  };

  heandleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, total } = this.state;

    return (
      <Layout>
        <Searchbar onChange={this.heanleChange} />
        {loading ? (
          <SpinerMargin>
            <Spiner />
          </SpinerMargin>
        ) : (
          <ImageGallery images={images} />
        )}
        {total && total !== images.length && (
          <Button onClick={this.heandleLoadMore} />
        )}
        <ScrollToTop smooth />
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
