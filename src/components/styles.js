import styled from "styled-components";

// Main.jsx
export const MainContainer = styled.main`
  height: 100vh;
  background-color: #121212;
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
`

export const MypageHeaderLine = styled.div`
  background: black;
  width: 1200px;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  display: block;
  margin: 0 auto;
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
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  width: 700px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin: 10px;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 16px;
`
