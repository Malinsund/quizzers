"use client"

import styled from "styled-components";

export const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PostDiv = styled.div`
  margin-bottom: 20px;
`;

export const Button = styled.button`
  margin-top: 20px;
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export const WeekDayContainer = styled.div`
display: flex;
justify-content: center;
margin-bottom: 20px;
gap: 10px;

`;
export const StyledWeekdayLink = styled.span`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 20px;
  color: black;
  display: block;
  transition: 0.3s;
`;