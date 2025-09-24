/**
 * @fileOverview Types and schemas for the visual standard validation flow.
 */

import {z} from 'genkit';

// Define the structure for a failed zone
const FailedZoneSchema = z.object({
  zoneId: z.string().describe('The ID of the zone that failed validation.'),
  reason: z.string().describe('The specific reason for the failure.'),
});

// Define the input schema for the flow
export const ValidateVisualStandardInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo submitted by the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  standardPdfUrl: z.string().url().describe('The URL of the standard PDF to validate against.'),
});
export type ValidateVisualStandardInput = z.infer<typeof ValidateVisualStandardInputSchema>;

// Define the output schema for the flow
export const ValidateVisualStandardOutputSchema = z.object({
  status: z.enum(['OK', 'NOT_OK']).describe('The overall validation status.'),
  failureReason: z.string().optional().describe('A summary of why the submission failed.'),
  failedZones: z.array(FailedZoneSchema).optional().describe('A list of zones that failed validation.'),
});
export type ValidateVisualStandardOutput = z.infer<typeof ValidateVisualStandardOutputSchema>;
