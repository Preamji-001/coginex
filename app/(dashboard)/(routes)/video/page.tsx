"use client";
import axios from "axios"
import { cn } from "@/lib/utils"
import { MessageSquare, Music, Music2, Video } from "lucide-react"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ChatCompletionRequestMessage } from "openai";
import Loader from "@/components/loader";
import Header from "@/components/header";
import Empty from "@/components/empty";

const font = Montserrat({ weight: "500", subsets: [] })

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt can't be empty"
  })
})

const VideoPage = () => {
  const [video, setVideo] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined)
      const response = await axios.post("/api/video", values)
      setVideo(response.data[0])
      form.reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center h-full">
      <Header icon={Video} header="Video Generator" desc="Descriptive Text to Videos" iconColor="text-orange-500" bgColor="bg-orange-500/10"></Header>
      <div className="mt-4 w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col md:flex-row w-full p-4 border gap-2 items-center rounded-lg shadow-md justify-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input placeholder="Mr Bean doing a backflip" className="border-none focus-visible:ring-0 focus-visible:ring-transparent w-full text-lg"  {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full md:w-32 p-4">
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-full h-auto pl-10 pr-10 pb-4 mt-5 flex flex-col items-center">
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}

        {!video && !isLoading && (
          <Empty desc="No conversation yet" />
        )}

        {video && (
          <video controls className="w-3/4 aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
        )}
      </div>

    </div>
  )
}

export default VideoPage