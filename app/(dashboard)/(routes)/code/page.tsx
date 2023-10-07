"use client";
import axios from "axios"
import { cn } from "@/lib/utils"
import { CodeIcon, MessageSquare } from "lucide-react"
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
import ReactMarkdown from "react-markdown";
import Empty from "@/components/empty";


const font = Montserrat({ weight: "500", subsets: [] })

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Come on bro feel free to share with me!"
  }).max(100, {
    message: "Too much feelings ehh... Let's take it step by step"
  })
})

const CodePage = () => {
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
      const res = await axios.post("/api/code", { messages: newMessages })
      setMessages((curr) => [...curr, newMessage, res.data])
      form.reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center h-full">
      <Header icon={CodeIcon} header="Code Generation" desc="Generate code form descriptive text" iconColor="text-green-700" bgColor="bg-green-700/10"></Header>
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
          <Empty desc="No code generated" />
        )}
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {messages.map((message) => (
          <div className={cn("flex w-full p-4 mt-4 rounded-lg h-auto items-center justify-start", message.role === "user" ? "bg-violet-600/10" : "bg-orange-500/10")} key={message.content}>
            <Avatar className="md:w-12 md:h-12 w-8 h-8 mr-5">
              <AvatarImage src={message.role === "user" ? "/user.avif" : "/icon.png.png"} className="w-full h-full rounded-full"></AvatarImage>
            </Avatar>
            <ReactMarkdown components={{
              pre: ({ node, ...props }) => (
                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                  <pre {...props} />
                </div>
              ),
              code: ({ node, ...props }) => (
                <code className="bg-black/10 rounded-lg p-1" {...props} />
              )
            }} className="text-sm overflow-hidden leading-7">
              {message.content || ""}
            </ReactMarkdown>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CodePage