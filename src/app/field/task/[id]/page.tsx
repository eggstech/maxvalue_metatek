'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getTaskById } from '@/lib/tasks';
import { Camera, CheckSquare, Image as ImageIcon, Send, TextCursorInput, ListChecks, Info, AlertCircle, FileText, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { notFound, useRouter, useParams } from 'next/navigation';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getLastSubmissionForTask } from '@/lib/submissions';
import { validateVisualStandard } from '@/ai/flows/validate-visual-standard';
import { ValidateVisualStandardOutput } from '@/ai/flows/validate-visual-standard-types';


const RequirementIcon = ({type}: {type: string}) => {
    switch (type) {
        case 'image': return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
        case 'data-entry': return <TextCursorInput className="h-5 w-5 text-muted-foreground" />;
        case 'checklist': return <ListChecks className="h-5 w-5 text-muted-foreground" />;
        case 'pdf-standard': return <FileText className="h-5 w-5 text-muted-foreground" />;
        default: return <Info className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function FieldSubmissionPage() {
  const params = useParams();
  const id = params.id as string;
  const task = getTaskById(id);
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  if (!task) {
    notFound();
  }

  const lastSubmission = task.status === 'Rejected' ? getLastSubmissionForTask(task.id) : null;
  const isActionable = ['Active', 'Overdue', 'Rejected'].includes(task.status);
  const hasPdfStandard = task.requirements?.some(req => req.type === 'pdf-standard');


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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // If it's a visual standard task, run AI validation
    if (hasPdfStandard && imagePreview) {
      const pdfRequirement = task.requirements?.find(req => req.type === 'pdf-standard');
      if (pdfRequirement?.pdfUrl) {
          try {
              const validationResult = await validateVisualStandard({
                  photoDataUri: imagePreview,
                  standardPdfUrl: new URL(pdfRequirement.pdfUrl, window.location.origin).toString(), // Ensure it's a full URL
              });

              if (validationResult.status === 'OK') {
                   toast({
                        title: "AI Check: PASSED",
                        description: `The submission meets the visual standard.`,
                        className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700'
                    });
              } else {
                   toast({
                        variant: "destructive",
                        title: "AI Check: FAILED",
                        description: `${validationResult.failedZones?.length || 0} issue(s) found. ${validationResult.failureReason || ''}`,
                    });
                     setIsSubmitting(false);
                    // In a real app, you would likely stop submission here or ask for user confirmation
                    // For now, we will stop submission to show the feedback.
                    // To continue submission, you would remove the next line and proceed.
                    return; 
              }
          } catch (error) {
              console.error("AI validation failed", error);
              toast({
                  variant: "destructive",
                  title: "AI Validation Error",
                  description: "Could not run the AI validation check. Please try again.",
              });
              setIsSubmitting(false);
              return;
          }
      }
    }


    // Proceed with standard submission logic
    toast({
        title: "Submission Successful!",
        description: `Your submission for "${task.name}" has been recorded.`,
        className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700'
    });

    // Simulate final submission delay
    setTimeout(() => {
        setIsSubmitting(false);
        router.push('/field/tasks');
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {task.status === 'Rejected' && lastSubmission?.feedback && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Feedback from Reviewer</AlertTitle>
                <AlertDescription>
                    {lastSubmission.feedback}
                </AlertDescription>
            </Alert>
        )}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{task.name}</CardTitle>
                <CardDescription>
                    Please complete the requirements below and submit your work.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                    <ReactMarkdown>{task.description || "No description provided for this task."}</ReactMarkdown>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Submission Details</CardTitle>
                {!isActionable ? (
                     <CardDescription>This task is already submitted or completed. Viewing in read-only mode.</CardDescription>
                ) : (
                    <CardDescription>Fulfill each requirement listed below.</CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-8">
                 {task.requirements && task.requirements.length > 0 ? (
                    task.requirements.map((req, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-lg bg-muted/30">
                            <div className="flex items-center gap-3">
                                <RequirementIcon type={req.type} />
                                <Label className='text-base font-semibold'>{req.label}</Label>
                            </div>
                            
                            <fieldset disabled={!isActionable || isSubmitting} className="space-y-4">
                                {req.type === 'pdf-standard' && req.pdfUrl && (
                                    <div className='aspect-video md:aspect-[4/3]'>
                                        <iframe src={req.pdfUrl} width="100%" height="100%" />
                                    </div>
                                )}
                                
                                {req.type === 'image' && (
                                    <div>
                                        <Input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                            <Camera className="mr-2 h-4 w-4" />
                                            Take Photo
                                        </Button>
                                        {imagePreview && (
                                            <div className="mt-4 overflow-hidden rounded-lg border w-fit">
                                                <Image src={imagePreview} alt="Image preview" width={300} height={225} className="object-cover" />
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
                        </div>
                    ))
                ) : (
                     <p className="text-sm text-muted-foreground text-center p-4">No specific submission required. Click submit to mark as done.</p>
                )}
            </CardContent>
        </Card>

        {isActionable && (
            <div className='flex justify-end'>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            {task.status === 'Rejected' ? 'Resubmit Task' : 'Submit Task'}
                        </>
                    )}
                </Button>
            </div>
        )}
    </form>
  );
}
