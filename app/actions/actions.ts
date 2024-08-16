export async function handleSubmitForm(data: any) {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const result = await response.json();
    console.log("Post saved successfully:", result);

    window.location.href = "/";
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}