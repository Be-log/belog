import styled from 'styled-components';

export const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(18,18,18,0.6);
`

export const MainSection = styled.section`
  width: 850px;
  height: 700px;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ImageDiv = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1E1E1E;
`

export const PopupImage = styled.img`
  width: 170px;
  height: 170px;
`

export const PopupText = styled.h1`
  color: #D9D9D9;
  font-size: 30px;
  font-weight: bold;
`

export const InfoDiv = styled.div`
  width: 65%;
  background-color: #121212;
`

export const InfoCloseP = styled.p`
  position: relative;
  top: 10px;
  left: 515px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`

export const InfoH1 = styled.p`
  color: white;
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const GuideTextP = styled.p`
  margin-top: 20px;
  color: red;
`

export const ButtonDiv = styled.div`
margin-top: 25px;
display: flex;
justify-content: center;
gap: 10px;
`