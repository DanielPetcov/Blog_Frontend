"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverTitle,
} from "@/components/ui/popover";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CreateArticle() {
  return (
    <div>
      <CreateArticlePopover />
    </div>
  );
}

type Inputs = {
  title: string;
  description: string;
};

function CreateArticlePopover() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("http://localhost:3001/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Good");
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Create a new article</PopoverTitle>
          <form className="mt-2 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>Title</p>
              <Input
                placeholder="How to ..."
                {...register("title", { required: true })}
              />
            </div>

            <div>
              <p>Some body text</p>
              <Input {...register("description", { required: true })} />
            </div>

            {errors.title && (
              <p className="text-sm text-red-500">Title is required</p>
            )}
            {errors.description && (
              <p className="text-sm text-red-500">Description is required</p>
            )}

            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
