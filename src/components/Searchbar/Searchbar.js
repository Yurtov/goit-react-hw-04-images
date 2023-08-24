import {
  Form,
  Input,
  SearchbarButton,
  SearchbarHeader,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onChange }) => {
  return (
    <SearchbarHeader>
      <Form onSubmit={onChange}>
        <SearchbarButton type="submit">
          <BsSearch size={25} />
        </SearchbarButton>
        <Input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
};
