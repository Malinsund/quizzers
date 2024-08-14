"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleSubmitForm } from "../actions/actions";
import {
  FormContainer,
  FormInput,
  FormSelect,
  FormSubmitButton,
  FormTextArea,
} from "../styles/form.styles";
import { PostCreate, PostCreateSchema } from "../validations/post";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreate>({
    resolver: zodResolver(PostCreateSchema),
  });

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitForm)}>
      <FormInput {...register("title")} type="text" placeholder="Titel" />
      {errors.title && <span>{errors.title.message}</span>}

      <FormInput {...register("pubName")} type="text" placeholder="Pubnamn" />
      {errors.pubName && <span>{errors.pubName.message}</span>}

      <FormTextArea {...register("content")} rows={4} placeholder="Innehåll" />
      {errors.content && <span>{errors.content.message}</span>}

      <FormSelect {...register("dayOfWeek")}>
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

      <FormInput {...register("time")} type="time" />
      {errors.time && <span>{errors.time.message}</span>}

      <FormInput
        {...register("website")}
        type="url"
        placeholder="Länk till hemsidan"
      />
      {errors.website && <span>{errors.website.message}</span>}

      <FormSubmitButton type="submit">Lägg till</FormSubmitButton>
    </FormContainer>
  );
}
