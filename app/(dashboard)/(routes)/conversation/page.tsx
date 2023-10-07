"use client";
import axios from "axios"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"
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
    message: "Come on bro feel free to share with me!"
  }).max(100, {
    message: "Too much feelings ehh... Let's take it step by step"
  })
})

const ConversationPage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      const newMessage: ChatCompletionRequestMessage = {
        "role": "user",
        "content": values.prompt
      }
      const newMessages = [...messages, newMessage]
      const res = await axios.post("/api/conversation", { messages: newMessages })
      setMessages((curr) => [...curr, newMessage, res.data])
      form.reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center h-full">
      <Header icon={MessageSquare} header="Feeling Lonely?" desc="Start a conversation right away" iconColor="text-violet-500" bgColor="bg-violet-500/10"></Header>
      <div className="mt-4 w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col md:flex-row w-full p-4 border gap-2 items-center rounded-lg shadow-md justify-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input placeholder="I am here for you bro!" className="border-none focus-visible:ring-0 focus-visible:ring-transparent w-full text-lg"  {...field}></Input>
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
        {messages.length == 0 && (
          <Empty desc="No conversation yet" />
        )}


        {isLoading && (
          <div>
            <Loader />
          </div>
        )}

        {messages.map((message) => (
          <div className={cn("flex w-full p-4 mt-4 rounded-lg h-auto items-center justify-start", message.role === "user" ? "bg-violet-600/10" : "bg-orange-500/10")} key={message.content}>
            <Avatar className="md:w-12 md:h-12 w-8 h-8">
              <AvatarImage src={message.role === "user" ? "/user.avif" : "/icon.png.png"} className="w-full h-full rounded-full"></AvatarImage>
            </Avatar>
            <div className="ml-4 md:text-lg">
              {message.content}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ConversationPage