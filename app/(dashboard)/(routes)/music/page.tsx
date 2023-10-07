"use client";
import axios from "axios"
import { cn } from "@/lib/utils"
import { MessageSquare, Music, Music2 } from "lucide-react"
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

const MusicPage = () => {
  const [music, setMusic] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined)
      const response = await axios.post("/api/music", values)
      setMusic(response.data.audio)
      form.reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center h-full">
      <Header icon={Music} header="Music Generator" desc="Descriptive Text to Music" iconColor="text-emerald-500" bgColor="bg-emerald-500/10"></Header>
      <div className="mt-4 w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col md:flex-row w-full p-4 border gap-2 items-center rounded-lg shadow-md justify-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input placeholder="Piano and guitar fusion" className="border-none focus-visible:ring-0 focus-visible:ring-transparent w-full text-lg"  {...field}></Input>
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

        {!music && !isLoading && (
          <Empty desc="No conversation yet" />
        )}

        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>

    </div>
  )
}

export default MusicPage