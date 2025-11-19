"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
type FormData = {
  message: string;
};

export default function ChatInput() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const router = useRouter();
  const onSubmit = (data: FormData) => {
    router.push(`/room/${data.message}`)
    reset(); // clears the input after sending
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input
        {...register("message", { required: true })}
        placeholder="Type your message..."
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded"
      >
        Send
      </button>
    </form>
  );
}