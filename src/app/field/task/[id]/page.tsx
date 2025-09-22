
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getTaskById } from '@/lib/tasks';
import { Camera, CheckSquare, Image as ImageIcon, Send, TextCursorInput, ListChecks, Info } from 'lucide-react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';


const RequirementIcon = ({type}: {type: string}) => {
    switch (type) {
        case 'image': return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
        case 'data-entry': return <TextCursorInput className="h-5 w-5 text-muted-foreground" />;
        case 'checklist': return <ListChecks className="h-5 w-5 text-muted-foreground" />;
        default: return <Info className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function FieldSubmissionPage({ params }: { params: { id: string } }) {
  const task = getTaskById(params.id);
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!task) {
    notFound();
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
        title: "Submission Successful!",
        description: `Your submission for "${task.name}" has been recorded.`,
        className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700'
    });
    router.push('/field');
  }

  const isCompleted = task.status === 'Completed';

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {/* Left Column: Task Details */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle className="text-2xl">{task.name}</CardTitle>
                <CardDescription>
                    Please complete the requirements and submit your work.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mb-6">
                    <ReactMarkdown>{task.description || "No description provided for this task."}</ReactMarkdown>
                </div>
                <Separator />
                <h3 className="text-md font-semibold my-4">Requirements</h3>
                <div className="space-y-4">
                    {task.requirements?.map((req, index) => (
                         <div key={index} className="flex items-start gap-3 text-sm p-3 border rounded-lg bg-muted/30">
                            <RequirementIcon type={req.type} />
                            <div className="flex-1">
                                <p className='font-medium text-foreground'>{req.label}</p>
                                {req.type === 'image' && <p className="text-xs text-muted-foreground">Requires {req.min}-{req.max} image(s)</p>}
                                {req.type === 'checklist' && req.checklistItems && (
                                    <ul className='mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside'>
                                        {req.checklistItems.map((item, i) => <li key={i}>{item.text}</li>)}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                    {(!task.requirements || task.requirements.length === 0) && (
                        <p className="text-sm text-muted-foreground">No specific requirements for this task.</p>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Right Column: Submission Form */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Your Submission</CardTitle>
                    {isCompleted && <CardDescription>This task has already been completed. Viewing in read-only mode.</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-8">
                    {task.requirements && task.requirements.length > 0 ? (
                        task.requirements.map((req, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <RequirementIcon type={req.type} />
                                    <Label className='text-base font-semibold'>{req.label}</Label>
                                </div>
                                
                                <fieldset disabled={isCompleted} className="pl-8 space-y-4">
                                    {req.type === 'image' && (
                                        <div>
                                            <Input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                                <Camera className="mr-2 h-4 w-4" />
                                                Take Photo
                                            </Button>
                                            {imagePreview && (
                                                <div className="mt-4 overflow-hidden rounded-lg border w-fit">
                                                    <Image src={imagePreview} alt="Image preview" width={300} height={200} className="object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {req.type === 'data-entry' && (
                                        <div className='space-y-3'>
                                            {req.entryType === 'text' && <Textarea placeholder="Enter value..."/>}
                                            {req.entryType === 'single' && req.options && (
                                                <RadioGroup>
                                                    {req.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-2">
                                                            <RadioGroupItem value={option.text} id={`${req.label}-option-${optionIndex}`} />
                                                            <Label htmlFor={`${req.label}-option-${optionIndex}`}>{option.text}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            )}
                                            {req.entryType === 'multiple' && req.options && (
                                                <div className="space-y-2">
                                                    {req.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-2">
                                                            <Checkbox id={`${req.label}-option-${optionIndex}`} />
                                                            <Label htmlFor={`${req.label}-option-${optionIndex}`}>{option.text}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {req.type === 'checklist' && req.checklistItems && (
                                        <div className='space-y-3'>
                                            {req.checklistItems.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-3">
                                                    <Checkbox id={`checklist-${index}-${itemIndex}`} />
                                                    <Label htmlFor={`checklist-${index}-${itemIndex}`} className='font-normal'>{item.text}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </fieldset>
                                {index < task.requirements.length - 1 && <Separator className="mt-8"/>}
                            </div>
                        ))
                    ) : (
                         <p className="text-sm text-muted-foreground">No submission required. Click submit to mark as done.</p>
                    )}
                </CardContent>
                <CardFooter>
                     {!isCompleted && (
                        <Button type="submit" size="lg" className="w-full md:w-auto">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Task
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </form>
      </div>
    </div>
  );
}
