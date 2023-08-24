import { MagnifyingGlass } from 'react-loader-spinner';

export const Spiner = () => {
  return (
    <MagnifyingGlass
      visible={true}
      marginLeft="auto"
      marginRight="auto"
      height="150"
      width="150"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#3f51b5"
    />
  );
};
