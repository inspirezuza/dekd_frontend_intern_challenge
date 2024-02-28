"use client";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRouter } from "next/navigation";

import { faker } from "@faker-js/faker";
import { formatDateThai } from "@/lib/formatDateThai";

interface Novel {
  author: string;
  chapter_number: number;
  last_visit: string;
  id: string;
}

import { useState } from "react";
import { LoadingSpinner } from "../ui/loadingspinner";
import { Loader2, Router } from "lucide-react";
import { AddBookMarkButton } from "./AddBookMarkButton";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";

const FormSchema = z.object({
  novels: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "โปรดเลือกอย่างน้อย 1 ตัวเลือก",
  }),
});

export default function NovelSection({ novels }: { novels: Novel[] }) {
  const router = useRouter();
  const [isEnableCheckBox, setIsEnableCheckBox] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      novels: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const arrNovelId = data.novels;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_MOCK_NOVELS_API}/api/novels`
    );

    try {
      toast.loading("กำลังลบ...");

      const deletePromises = arrNovelId.map(async (id) => {
        console.log(id);
        const response = await fetch(`${url}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to delete novel with ID ${id}. Status: ${response.status}`
          );
        }

        return response.json();
      });

      await Promise.all(deletePromises);

      toast.dismiss();

      toast.success("ลบเรียบร้อยแล้ว!");

      router.refresh();

      form.setValue("novels", []);
    } catch (error) {
      console.error("An error occurred while deleting novels:", error);
      toast.dismiss();
      toast.error("ลบไม่สำเร็จ");
    } finally {
      setIsEnableCheckBox(false);
      setCheckedCount(0);
    }
  }

  function EditBookMarkButton({ checkedCount }: { checkedCount: number }) {
    return (
      <>
        {!isEnableCheckBox ? (
          <TooltipProvider delayDuration={400} skipDelayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="text-slate-400 rounded-full"
                  onClick={() => setIsEnableCheckBox(!isEnableCheckBox)}
                >
                  แก้ไข
                </Button>
              </TooltipTrigger>
              <TooltipContent className="transition-transform transform">
                <p>แก้ไขรายการที่คั่นไว้</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <Button
              onClick={() => setIsEnableCheckBox(!isEnableCheckBox)}
              variant="outline"
              className="text-slate-400 rounded-full"
            >
              ยกเลิก
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {checkedCount === 0 ? (
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    disabled
                  >
                    <Image
                      src={`/trashcan.svg`}
                      alt="bookmark icon"
                      width={12}
                      height={14}
                      className="mr-1 "
                    />
                    <div className="flex justify-center items-center">{`${checkedCount} รายการ`}</div>
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    // type="submit"
                    className="rounded-full"
                  >
                    <Image
                      src={`/trashcan.svg`}
                      alt="bookmark icon"
                      width={12}
                      height={14}
                      className="mr-1 "
                    />
                    <div className="flex justify-center items-center">{`${checkedCount} รายการ`}</div>
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>โปรดตรวจสอบอีกครั้ง</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`คุณต้องการที่จะลบ ${checkedCount} รายการที่คั่นทิ้งหรือไม่?`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">
                    ยกเลิก
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className={` ${buttonVariants({
                      variant: "destructive",
                    })} rounded-full`}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    ลบ
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto p-4 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between items-center py-2 md:py-5 ">
              <div className="text-sm text-slate-400">{`จำนวนทั้งหมด ${novels.length} รายการ`}</div>
              <div className="flex gap-4">
                <AddBookMarkButton />
                <EditBookMarkButton checkedCount={checkedCount} />
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-4 justify-center"> */}
            <FormField
              control={form.control}
              name="novels"
              render={() => (
                <FormItem>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center animate-fade-up animate-ease-out">
                    {novels.map((novel) => (
                      <FormField
                        key={novel.id}
                        control={form.control}
                        name="novels"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={novel.id}
                              className="flex flex-row novels-start space-x-3 space-y-0"
                            >
                              <NovelCard novel={novel} />
                              {isEnableCheckBox && (
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(novel.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setCheckedCount(
                                          (prevCount) => prevCount + 1
                                        ); // Increment count when checkbox is checked
                                        field.onChange([
                                          ...field.value,
                                          novel.id,
                                        ]);
                                      } else {
                                        setCheckedCount(
                                          (prevCount) => prevCount - 1
                                        ); // Decrement count when checkbox is unchecked
                                        field.onChange(
                                          field.value?.filter(
                                            (value) => value !== novel.id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
