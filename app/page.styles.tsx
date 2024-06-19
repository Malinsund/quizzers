"use client"

import styled from "styled-components";

export const HomeTitle = styled.h1`
text-align: center;
`;

export const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  
  `;

export const PostDiv = styled.div`
  padding: 40px;
  border:solid;
  border-radius: 20px;
  margin-bottom: 5px;
`;
export const PostTitle = styled.h2 `
text-decoration: underline;
margin-bottom: 2px;
margin-top: 0;
`;

export const PostContent = styled.p `
background-color: #d3cdcd;
padding: 3px;
border-radius: 5px;
`;

export const PostPubName = styled.p`
font-weight: bold;
margin-top: 0;
`;



export const PostTime = styled.span`

`;

export const ButtonDiv = styled.div`
display: flex;
justify-content: center;
`;

export const Button = styled.button`
  margin: 10px;
  height: 30px;
  background-color: #010101;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

`;

export const WeekDayContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  text-decoration: none;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledWeekdayLink = styled.span`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 20px;
  color: black;
  display: block;
  transition: 0.3s;
`;

export const DropdownContainer = styled.div`
  display: none;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const DropdownSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  appearance: none; /* Removes default arrow icon */
`;

export const DropdownOption = styled.option`
  padding: 8px;
  font-size: 16px;
`;

export const DropdownButton = styled.button`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
`;