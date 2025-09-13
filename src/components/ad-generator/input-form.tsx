"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateAds } from "@/app/actions";
import { type AdData } from "@/lib/types";

const formSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters."),
  productDescription: z.string().min(10, "Description must be at least 10 characters."),
  targetAudience: z.string().min(5, "Target audience must be at least 5 characters."),
  tone: z.enum(["Funny", "Professional", "Bold", "Friendly"]).optional(),
});

type AdInputFormProps = {
  onAdsGenerated: (ads: AdData[] | null) => void;
  onSetLoading: () => void;
};

export function AdInputForm({ onAdsGenerated, onSetLoading }: AdInputFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      targetAudience: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSetLoading();
    startTransition(async () => {
      const ads = await generateAds(values);
      onAdsGenerated(ads);
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Create New Ads</CardTitle>
          <CardDescription>Fill in the details below to generate ad variations with AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Quantum Sneakers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product in a few sentences..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Young athletes, tech enthusiasts" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone/Style (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone for your ads" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Funny">Funny</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Bold">Bold</SelectItem>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full" size="lg">
                <Wand2 className="mr-2 h-5 w-5" />
                {isPending ? "Generating..." : "Generate Ads"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
