import PostForm from "../components/PostForm";
import {
  FormTitle,
  FormTitleDiv,
  TitleLineOne,
  TitleLineTwo,
} from "../styles/form.styles";

export default function FormPage() {
  return (
    <FormTitleDiv>
      <FormTitle>Lägg till quiz</FormTitle>
      <TitleLineOne />
      <TitleLineTwo />
      <PostForm />
    </FormTitleDiv>
  );
}
