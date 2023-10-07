"use client";

// Imports
import axios from "axios"
import { cn } from "@/lib/utils"
import { Download, ImageIcon, MessageSquare } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

// Fonts
const font = Montserrat({ weight: "500", subsets: [] })

// Constants
const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Broski I need something to generate an image"
  }).max(100, {
    message: "Slow down Verstappen, Slow down!"
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1)
})

const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  {
    value: "4",
    label: "4 Photos"
  },
  {
    value: "5",
    label: "5 Photos"
  }
]

const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256"
  },
  {
    value: "512x512",
    label: "512x512"
  },
  {
    value: "1024x1024",
    label: "1024x1024"
  },
]

// Page
const ImagePage = () => {
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256"
    }
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      const response = await axios.post("/api/image", values)
      setImages(response.data.map((image: { url: string }) => image.url))
      form.reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center h-full">
      <Header icon={ImageIcon} header="Image Generator" desc="Create Images from descriptive text" iconColor="text-pink-700" bgColor="bg-pink-700/10"></Header>
      <div className="mt-4 w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col md:flex-row w-full p-4 border gap-2 items-center rounded-lg shadow-md justify-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input placeholder="Create me a Girlfriend" className="border-none focus-visible:ring-0 focus-visible:ring-transparent w-full md:text-lg text-sm"  {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full md:w-44">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-full focus-visible:ring-0 focus-visible:ring-transparent">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full h-full">
                      {amountOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="w-full md:w-44">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-full focus-visible:ring-0 focus-visible:ring-transparent">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full h-full">
                      {resolutionOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

        {(images.length == 0 && !(isLoading)) && (
          <Empty desc="No Images generated!" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 w-full">
          {images.map((image) => (
            <Card className="rounded-lg overflow-hidden bg-black/10 hover:shadow-md transition-all" key={image}>
              <div className="relative aspect-square">
                <Image src={image} fill alt="generated" />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(image)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ImagePage