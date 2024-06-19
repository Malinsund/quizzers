"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { savePost } from "../actions/actions";
import { FormDiv, FormInput, FormSelect, FormSubmitButton, FormTextArea, PostFormContainer } from './form.styles';
import { PostCreate, PostCreateSchema } from './validations/postSchema';

export default function PostForm(){
  const form = useForm<PostCreate>({ resolver: zodResolver(PostCreateSchema)})

  const {
    formState: { errors },
  } = form;

  
  const handleSubmit = async (data: PostCreate) => {
    await savePost(data);
    form.reset();
  };


  return (
    <FormDiv>


    <PostFormContainer onSubmit={form.handleSubmit(handleSubmit)}>
      <label htmlFor="pubName">Pub:</label>
      <FormInput
        type="text"
        id="pubName"
        {...form.register("pubName")} placeholder="Title"
      />
      {errors.pubName && <span>{errors.pubName.message}</span>}
      
      <label htmlFor="title">Titel:</label>
      <FormInput
      {...form.register("title")}
        type="text"
        id="title"
        name="title"
        
      />
      {errors.title && <span>{errors.title.message}</span>}

      <label htmlFor="content">Beskrivning:</label>
      <FormTextArea
      {...form.register("content")}
        id="content"
        name="content"
        rows={5}
        
      />
      {errors.content && <span>{errors.content.message}</span>}

      <label htmlFor="day">Dag:</label>
      <FormSelect
      {...form.register("dayOfWeek")}
        id="day"
        name="dayOfWeek"
        
      >
        <option value="">Välj en dag</option>
        <option value="Monday">Måndag</option>
        <option value="Tuesday">Tisdag</option>
        <option value="Wednesday">Onsdag</option>
        <option value="Thursday">Torsdag</option>
        <option value="Friday">Fredag</option>
        <option value="Saturday">Lördag</option>
        <option value="Sunday">Söndag</option>
      </FormSelect>

      <label htmlFor="time">Tid:</label>
      <FormInput
      {...form.register("time")}
        type="datetime-local"
        id="time"
        name="time"
        
      />
      

      <FormSubmitButton>Lägg till</FormSubmitButton>
    </PostFormContainer>
    </FormDiv>
  );
}