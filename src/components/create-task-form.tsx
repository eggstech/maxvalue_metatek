'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Trash2, Image as ImageIcon, TextCursorInput, ListChecks } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const requirementSchema = z.object({
  type: z.enum(['image', 'data-entry', 'checklist']),
  label: z.string().min(1, 'Label is required.'),
  min: z.number().optional(),
  max: z.number().optional(),
  checklistItems: z.array(z.object({ text: z.string().min(1, 'Checklist item cannot be empty.') })).optional(),
  entryType: z.enum(['text', 'single', 'multiple']).optional(),
  options: z.array(z.object({ text: z.string().min(1, 'Option cannot be empty.') })).optional(),
});

const formSchema = z.object({
  taskName: z.string().min(2, {
    message: 'Task name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  dueDate: z.date({
    required_error: 'A due date is required.',
  }),
  dueTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid time format. Use HH:MM.',
  }),
  assignedTo: z.string({
    required_error: 'Please select a store or group to assign the task to.',
  }),
  isRecurring: z.boolean().default(false).optional(),
  repeatEndDate: z.date().optional(),
  requirements: z.array(requirementSchema).optional(),
}).refine((data) => {
    if (data.isRecurring && !data.repeatEndDate) {
        return false;
    }
    return true;
    }, {
        message: 'End date is required for recurring tasks.',
        path: ['repeatEndDate'],
});


type FormValues = z.infer<typeof formSchema>;

interface CreateTaskFormProps {
    onTaskCreate: (values: FormValues) => void;
    onAfterSubmit?: () => void;
}

export function CreateTaskForm({ onTaskCreate, onAfterSubmit }: CreateTaskFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: '',
      description: '',
      dueTime: '23:59',
      isRecurring: false,
      requirements: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'requirements',
  });

  const isRecurring = form.watch('isRecurring');

  const addChecklistItem = (reqIndex: number) => {
    const requirements = form.getValues('requirements');
    const currentItems = requirements?.[reqIndex]?.checklistItems || [];
    update(reqIndex, {
      ...requirements?.[reqIndex],
      checklistItems: [...currentItems, { text: '' }],
    });
  };

  const removeChecklistItem = (reqIndex: number, itemIndex: number) => {
    const requirements = form.getValues('requirements');
    const currentItems = requirements?.[reqIndex]?.checklistItems || [];
    currentItems.splice(itemIndex, 1);
    update(reqIndex, {
      ...requirements?.[reqIndex],
      checklistItems: currentItems,
    });
  }

  const addDataEntryOption = (reqIndex: number) => {
    const requirements = form.getValues('requirements');
    const currentOptions = requirements?.[reqIndex]?.options || [];
    update(reqIndex, {
        ...requirements?.[reqIndex],
        options: [...currentOptions, { text: '' }],
    });
  };

  const removeDataEntryOption = (reqIndex: number, optionIndex: number) => {
      const requirements = form.getValues('requirements');
      const currentOptions = requirements?.[reqIndex]?.options || [];
      currentOptions.splice(optionIndex, 1);
      update(reqIndex, {
          ...requirements?.[reqIndex],
          options: currentOptions,
      });
  }


  function onSubmit(values: FormValues) {
    onTaskCreate(values);
    toast({
      title: 'Task Created',
      description: `The task "${values.taskName}" has been successfully created.`,
    });
    form.reset();
    onAfterSubmit?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Weekly Display Check" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide a detailed description of the task requirements..." {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                You can use markdown for **bold**, *italic*, and lists.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                 <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a store, a group, or all stores" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all-stores">All Stores</SelectItem>
                  <SelectItem value="group-hcm">Khu vực HCM</SelectItem>
                  <SelectItem value="store-a">Store A</SelectItem>
                  <SelectItem value="store-b">Store B</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4 rounded-lg border p-4">
            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Repeat Daily</FormLabel>
                    <FormDescription>
                      The task will be recreated daily. Turn off to disable.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isRecurring && (
                <FormField
                control={form.control}
                name="repeatEndDate"
                render={({ field }) => (
                  <FormItem className='pt-2'>
                    <FormLabel>End Date</FormLabel>
                     <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < (form.getValues('dueDate') || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        </div>


        <Separator />
        
        <div className="space-y-4">
            <FormLabel>Result Requirements</FormLabel>
            <FormDescription>Define what needs to be submitted for this task.</FormDescription>
            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remove Requirement</span>
                    </Button>
                    <FormField
                        control={form.control}
                        name={`requirements.${index}.type`}
                        render={({ field: typeField }) => (
                            <FormItem>
                                <FormLabel>Requirement Type</FormLabel>
                                <Select onValueChange={(value) => {
                                    typeField.onChange(value);
                                    if(value === 'data-entry') {
                                        form.setValue(`requirements.${index}.entryType`, 'text');
                                    }
                                }} defaultValue={typeField.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select requirement type..." /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="image">Image Submission</SelectItem>
                                        <SelectItem value="data-entry">Data Entry</SelectItem>
                                        <SelectItem value="checklist">Checklist</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    {form.watch(`requirements.${index}.type`) === 'image' && (
                        <>
                            <FormField control={form.control} name={`requirements.${index}.label`} render={({field}) => (<FormItem><FormLabel>Prompt/Label</FormLabel><FormControl><Input placeholder="e.g. 'Photo of front display'" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name={`requirements.${index}.min`} render={({field}) => (<FormItem><FormLabel>Min Images</FormLabel><FormControl><Input type="number" placeholder="1" {...field} value={field.value ?? ''} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name={`requirements.${index}.max`} render={({field}) => (<FormItem><FormLabel>Max Images</FormLabel><FormControl><Input type="number" placeholder="5" {...field} value={field.value ?? ''} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </>
                    )}

                    {form.watch(`requirements.${index}.type`) === 'data-entry' && (
                        <div className="space-y-4">
                            <FormField control={form.control} name={`requirements.${index}.label`} render={({field}) => (<FormItem><FormLabel>Field Name</FormLabel><FormControl><Input placeholder="e.g. 'Current stock count'" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField
                                control={form.control}
                                name={`requirements.${index}.entryType`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Input Type</FormLabel>
                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select input type..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="text">Text Input</SelectItem>
                                                <SelectItem value="single">Single Choice</SelectItem>
                                                <SelectItem value="multiple">Multiple Choice</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {(form.watch(`requirements.${index}.entryType`) === 'single' || form.watch(`requirements.${index}.entryType`) === 'multiple') && (
                                <div className='space-y-2'>
                                    <FormLabel>Options</FormLabel>
                                    {form.getValues(`requirements.${index}.options`)?.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-2">
                                            <FormField
                                                control={form.control}
                                                name={`requirements.${index}.options.${optionIndex}.text`}
                                                render={({ field }) => (
                                                    <FormItem className='flex-grow'>
                                                        <FormControl>
                                                            <Input placeholder={`Option ${optionIndex + 1}`} {...field} value={field.value ?? ''} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeDataEntryOption(index, optionIndex)}>
                                                <Trash2 className="h-4 w-4 text-muted-foreground"/>
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => addDataEntryOption(index)}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Option
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {form.watch(`requirements.${index}.type`) === 'checklist' && (
                        <div className='space-y-2'>
                           <FormField control={form.control} name={`requirements.${index}.label`} render={({field}) => (<FormItem><FormLabel>Checklist Title</FormLabel><FormControl><Input placeholder="e.g. 'Morning Cleaning Checklist'" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                            <FormLabel>Checklist Items</FormLabel>
                            {form.getValues(`requirements.${index}.checklistItems`)?.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center gap-2">
                                     <FormField
                                        control={form.control}
                                        name={`requirements.${index}.checklistItems.${itemIndex}.text`}
                                        render={({ field }) => (
                                            <FormItem className='flex-grow'>
                                                <FormControl>
                                                    <Input placeholder={`Item ${itemIndex + 1}`} {...field} value={field.value ?? ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeChecklistItem(index, itemIndex)}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                                    </Button>
                                </div>
                            ))}
                             <Button type="button" variant="outline" size="sm" onClick={() => addChecklistItem(index)}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                        </div>
                    )}
                </div>
            ))}

            <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="w-full border-dashed">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Requirement
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0">
                    <div className="flex flex-col">
                         <Button variant="ghost" className="justify-start p-3 h-auto" onClick={() => append({type: 'image', label: '', min: 1, max: 1})}>
                            <ImageIcon className="mr-2 h-4 w-4" /> Image Submission
                         </Button>
                         <Button variant="ghost" className="justify-start p-3 h-auto" onClick={() => append({type: 'data-entry', label: '', entryType: 'text', options: []})}>
                            <TextCursorInput className="mr-2 h-4 w-4" /> Data Entry
                         </Button>
                         <Button variant="ghost" className="justify-start p-3 h-auto" onClick={() => append({type: 'checklist', label: '', checklistItems: [{text: ''}]})}>
                            <ListChecks className="mr-2 h-4 w-4" /> Checklist
                         </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>


        <Button type="submit" className="w-full mt-6">
          Create Task
        </Button>
      </form>
    </Form>
  );
}
