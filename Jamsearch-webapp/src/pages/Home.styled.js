import styled from 'styled-components';

export const SearchInput = styled.input`
  display: block;
  font-family: 'Roboto', sans-serif;
  width: 200px;
  margin: auto;
  outline: none;
  padding: 13px 15px;
  border: 1px solid #dbdbdb;
  box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.5);
  font-size: 14px;
  border-radius: 12px;
  color: #8d8d8d;

  &::placeholder {
    font-weight: 300;
    color: #8d8d8d;
  }
`;

export const SearchButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 35px;
  margin-top: 20px;

  button {
    margin: 10px;
    color: #fff;
    background-color: ${({ theme }) => theme.mainColors.blue};
    /* margin: auto; */
    padding: 10px 50px;
    font-size: 15px;
    border: none;
    outline: none;
    border-radius: 12px;
    &:hover {
      cursor: pointer;
    }
  }
`;

// export const PredictButtonWrapper = styled.div`

//   margin: 10px;
//   color: #fff;
//   background-color: ${({ theme }) => theme.mainColors.blue};
//   margin: auto;
//   padding: 10px 50px;
//   font-size: 15px;
//   border: none;
//   outline: none;
//   border-radius: 12px;
//   &:hover {
//     cursor: pointer;
//   }
// `;
