import styled from "styled-components";

// Main.jsx
export const MainContainer = styled.main`
  /* height: 200vh; */
  background-color: #121212;
  padding-bottom: 50px;
`

export const WrapContainer = styled.div`
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(5, 270px);
  gap: 60px;
  justify-content: center;
  align-items: center;
`

export const Box = styled.div`
  background-color: #1E1E1E;
  width: 300px;
  height: 300px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  &:hover {
    transform: translateY(-10px);
  }
`

export const BoxContent = styled.div`
  padding: 1rem;
  color: white;
  font-weight: bold;
  font-size: 16px;
`

export const Boximg = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 3px;
`

export const BoxHeader = styled.p`
  color: white;
  font-weight: bold;
  font-size: 22px;
  padding: 23px 0 13px 20px;
  `

export const BoxNickname = styled.p`
  color: white;
  font-size: 15px;
  padding: 0 0 10px 20px;
`

export const BoxFooter = styled.p`
  color: white;
  font-size: 12px;
  padding: 0 0 10px 20px;
`



//Mypage.jsx
export const MypageHeader = styled.div`
  width: 1000px;
  height: 200px;
  align-items: center;
  margin: 0 auto;
  display: flex;
  gap: 10px;
`

export const MypageHeaderImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #ddd;
`

export const MypageHeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  margin-left: 20px;
`

export const MypageH2 = styled.h2`
  font-size: 35px;
`

export const MypageSpan = styled.span`
  margin-top: 5px;
  font-size: 18px;
`

export const MypageHeaderLine = styled.hr`
  width: 1200px;
  border: 1px solid #797979;
  margin-top: 20px;
`

export const MypageContainer = styled.div`
  width: 100%;
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 20px;
  justify-content: center;
  align-items: center;
`


//ProfileEdit.jsx
export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  margin-top: 50px;
`

export const ProfileImg = styled.div`
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
`

export const ProfileContainerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const ProfileContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ProfileContainerBodyMenu = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: #444444;
    margin-bottom: 12px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }
`

//Write.js
export const WriteBtnSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
`

export const MainWidthDiv = styled.div`
  width: 1200px;
  margin: auto;
`

export const TitleInput = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`

export const WriteExitBtn = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const WriteSaveBtn = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #43a047;
  }
`

export const WriteTitleInput = styled.input`
  width: 700px;
  padding: 8px;
  font-size: 24px;
  border-radius: 4px;
  margin: 16px;
  padding: 10px 20px;
  background-color: transparent;
  border-bottom: 1px solid #797979;
  color: white;
  &:focus {
    outline: none;
  }
`

export const EditorContainer = styled.div`
  background-color: white;
  position: relative;
`