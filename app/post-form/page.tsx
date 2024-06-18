import PostForm from './PostForm';
import { FormTitle, FormTitleDiv, TitleLineOne, TitleLineTwo } from './form.styles';

export default function FormPage() {
  return (
    <FormTitleDiv>
      <FormTitle>Lägg till quiz</FormTitle>
      <TitleLineOne/>
      <TitleLineTwo/>
      <PostForm />
    </FormTitleDiv>
  );
}