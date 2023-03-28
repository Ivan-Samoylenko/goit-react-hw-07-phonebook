import { Name, Phone, DeleteBtn } from './Contact.styled';
import { TiDocumentDelete } from 'react-icons/ti';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, phone, id } = contact;

  return (
    <>
      <Name>{name}</Name>
      <Phone>{phone}</Phone>
      <DeleteBtn
        onClick={() => {
          dispatch(deleteContact(id));
        }}
      >
        <TiDocumentDelete size="30" />
        delete
      </DeleteBtn>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
