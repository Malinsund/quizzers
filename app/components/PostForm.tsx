"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { savePost } from "../actions/actions";
import {
  FormDiv,
  FormInput,
  FormSelect,
  FormSubmitButton,
  FormTextArea,
  PostFormContainer,
} from "../styles/form.styles";
import { PostCreate, PostCreateSchema } from "../validations/post";

export default function PostForm() {
  const form = useForm<PostCreate>({ resolver: zodResolver(PostCreateSchema) });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: PostCreate) => {
    console.log("Form data submitted:", data);
    try {
      await savePost(data);
      form.reset();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <FormDiv>
      <PostFormContainer
        onSubmit={(event) => {
          console.log("knappen är trckt!");
          form.handleSubmit(handleSubmit)(event);
        }}
      >
        <FormInput
          {...form.register("pubName", { required: true })}
          placeholder="Pub namn"
          type="text"
        />
        {errors.pubName && <span>{errors.pubName.message}</span>}
        <FormInput
          {...form.register("title", { required: true })}
          type="text"
          placeholder="Titel"
        />
        {errors.title && <span>{errors.title.message}</span>}
        <FormTextArea
          {...form.register("content", { required: true })}
          rows={5}
          placeholder="Ange beskrivning"
        />
        {errors.content && <span>{errors.content.message}</span>}

        <FormSelect {...form.register("dayOfWeek", { required: true })}>
          <option value="">Välj en dag</option>
          <option value="Måndag">Måndag</option>
          <option value="Tisdag">Tisdag</option>
          <option value="Onsdag">Onsdag</option>
          <option value="Torsdag">Torsdag</option>
          <option value="Fredag">Fredag</option>
          <option value="Lördag">Lördag</option>
          <option value="Söndag">Söndag</option>
        </FormSelect>
        {errors.dayOfWeek && <span>{errors.dayOfWeek.message}</span>}

        <FormInput
          {...form.register("time", { required: true })}
          type="datetime-local"
          placeholder="Välj datum"
        />
        {errors.time && <span>{errors.time.message}</span>}

        <FormSubmitButton type="submit">Lägg till</FormSubmitButton>
      </PostFormContainer>
    </FormDiv>
  );
}
