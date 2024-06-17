"use client"
import React, { FormEvent, useState } from 'react';
import PostSchema from './validations/postSchema';

export default function PostForm() {
  const [formData, setFormData] = useState({
    id: 0, 
    title: '',
    content: '',
    dayOfWeek: '',
    time: '',
    pubName: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validera formulärdata mot Zod-schema
      const validatedData = PostSchema.parse(formData);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (res.ok) {
        alert('Ditt Quiz har blivit tillagt!');
        e.currentTarget.reset();
      } else {
        alert('Lyckades inte lägga till quiz');
      }
    } catch (error) {
      console.error('uppladdningen misslyckades', error);
      alert('Uppladdningen misslyckades');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pubName">Pub:</label>
      <input
        type="text"
        id="pubName"
        name="pubName"
        value={formData.pubName}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="title">Titel:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Beskrivning:</label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <label htmlFor="day">Dag:</label>
      <select
        id="day"
        name="dayOfWeek"
        value={formData.dayOfWeek}
        onChange={handleChange}
        required
      >
        <option value="">Välj en dag</option>
        <option value="Monday">Måndag</option>
        <option value="Tuesday">Tisdag</option>
        <option value="Wednesday">Onsdag</option>
        <option value="Thursday">Torsdag</option>
        <option value="Friday">Fredag</option>
        <option value="Saturday">Lördag</option>
        <option value="Sunday">Söndag</option>
      </select>

      <label htmlFor="time">Tid:</label>
      <input
        type="datetime-local"
        id="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <button type="submit">Lägg till</button>
    </form>
  );
}