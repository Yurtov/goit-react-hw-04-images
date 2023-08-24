import { Image } from './ImageGalleryItem.styled';
import Modal from 'react-modal';
import { Component } from 'react';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // zIndex: 1200,
  },
  content: {
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 24px)',
  },
};

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <div>
        <Image
          onClick={this.openModal}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          defaultStyles={customStyles}
        >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </div>
    );
  }
}
