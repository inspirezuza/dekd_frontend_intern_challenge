"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import NovelCard from "@/components/component/NovelCard";
// import { toast } from "@/components/ui/use-toast";

const novels = [
  {
    author: "Khalid83",
    chapter_number: 7,
    last_visit: "2027-10-21T20:34:14.494Z",
    id: "1",
  },
  {
    author: "Zion.Hickle81",
    chapter_number: 9,
    last_visit: "2055-12-23T21:29:38.440Z",
    id: "2",
  },
  {
    author: "Maureen_Schroeder12",
    chapter_number: 49,
    last_visit: "2072-05-07T20:28:19.320Z",
    id: "3",
  },
  {
    author: "Maureen_Schroeder12",
    chapter_number: 49,
    last_visit: "2072-05-07T20:28:19.320Z",
    id: "3",
  },
  {
    author: "Maureen_Schroeder12",
    chapter_number: 49,
    last_visit: "2072-05-07T20:28:19.320Z",
    id: "3",
  },
];

const FormSchema = z.object({
  novels: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "โปรดเลือกอย่างน้อย 1 ตัวเลือก",
  }),
});

export default function CheckboxReactHookFormMultiple() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      novels: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="novels"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the novels you want to display in the sidebar.
                </FormDescription>
              </div>
              {novels.map((novel) => (
                <FormField
                  key={novel.id}
                  control={form.control}
                  name="novels"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={novel.id}
                        className="flex flex-row items-start "
                      >
                        <NovelCard novel={novel} />
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(novel.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, novel.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== novel.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
