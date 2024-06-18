"use client"
import styled from "styled-components";

export const FormTitleDiv = styled.div `

`;

export const FormTitle = styled.h1 `
display: flex;
justify-content: center;
font-family: Roboto;
`;

export const TitleLineOne = styled.hr `
width: 50%;

`;

export const TitleLineTwo = styled.hr `
width: 40%;

`;

export const FormDiv = styled.div `
display: flex;
justify-content: center;
`;

export const PostFormContainer = styled.form `
display: flex;
flex-direction: column;
gap: 5px;
`;

export const FormInput = styled.input `
display: flex;
width: 300px;
height: 30px;
background-color: #ebe9e8;
border-radius: 5px;
border: none;

`;

export const FormSelect = styled.select`
height: 30px;
background-color: #ebe9e8;
border-radius: 5px;
border: none;
`;

export const FormTextArea = styled.textarea `
background-color: #ebe9e8;
border-radius: 5px;
border: none;
`;

export const FormSubmitButton = styled.button `
margin: 10px;
height: 30px;
background-color: #010101;
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
`;
