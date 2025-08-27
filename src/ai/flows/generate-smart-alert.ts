
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating smart alerts based on resident vital signs data.
 *
 * - generateSmartAlert - A function that takes vital signs data as input and returns a smart alert.
 * - GenerateSmartAlertInput - The input type for the generateSmartAlert function.
 * - GenerateSmartAlertOutput - The return type for the generateSmartAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const VitalSignsSchema = z.object({
  heartRate: z.number().describe('Heart rate in beats per minute.'),
  bloodPressureSystolic: z.number().describe('Systolic blood pressure in mmHg.'),
  bloodPressureDiastolic: z.number().describe('Diastolic blood pressure in mmHg.'),
  oxygenSaturation: z.number().describe('Oxygen saturation percentage.'),
  temperature: z.number().describe('Body temperature in degrees Fahrenheit.'),
  respiratoryRate: z.number().describe('Respiratory rate in breaths per minute.'),
});

const GenerateSmartAlertInputSchema = z.object({
  residentName: z.string().describe('The name of the resident.'),
  vitalSigns: VitalSignsSchema.describe('The vital signs data of the resident.'),
  medicalHistory: z.string().describe('The medical history of the resident.'),
  currentMedications: z.string().describe('A list of current medications the resident is taking.'),
  medicationAllergies: z.string().describe('A list of known medication allergies.'),
});
export type GenerateSmartAlertInput = z.infer<typeof GenerateSmartAlertInputSchema>;

const GenerateSmartAlertOutputSchema = z.object({
  alertSummary: z.string().describe('A summary of the smart alert.'),
  alertDetails: z.string().describe('Detailed information about the alert and potential health risks.'),
  suggestedActions: z.string().describe('Suggested actions for the doctor or nurse to take.'),
  audioAlert: z.string().describe('An audio version of the alert summary in base64 WAV format.'),
});
export type GenerateSmartAlertOutput = z.infer<typeof GenerateSmartAlertOutputSchema>;

export async function generateSmartAlert(input: GenerateSmartAlertInput): Promise<GenerateSmartAlertOutput> {
  return generateSmartAlertFlow(input);
}

const smartAlertPrompt = ai.definePrompt({
  name: 'smartAlertPrompt',
  input: {schema: GenerateSmartAlertInputSchema},
  output: {schema: GenerateSmartAlertOutputSchema},
  prompt: `You are an AI assistant specializing in generating smart alerts for elderly patients based on their vital signs data and medical history. Generate a concise alert summary, detailed information about potential health risks, and suggested actions for the doctor or nurse.

Resident Name: {{{residentName}}}
Vital Signs:
- Heart Rate: {{{vitalSigns.heartRate}}} bpm
- Blood Pressure: {{{vitalSigns.bloodPressureSystolic}}}/{{{vitalSigns.bloodPressureDiastolic}}} mmHg
- Oxygen Saturation: {{{vitalSigns.oxygenSaturation}}}%
- Temperature: {{{vitalSigns.temperature}}} °F
- Respiratory Rate: {{{vitalSigns.respiratoryRate}}} breaths/min
Medical History: {{{medicalHistory}}}
Current Medications: {{{currentMedications}}}
Medication Allergies: {{{medicationAllergies}}}

Alert Summary: A brief summary of the potential health risks.
Alert Details: Detailed information about the alert, including analysis of vital signs in relation to medical history, current medications, and allergies. Consider potential drug interactions or contraindications.
Suggested Actions: Specific actions for the healthcare provider to take, such as further monitoring, medication adjustments, or immediate intervention.
Audio Alert: An audio version of the alert summary.

Make sure the vital sign considerations are appropriate for elderly patients.`,
});

const generateSmartAlertFlow = ai.defineFlow(
  {
    name: 'generateSmartAlertFlow',
    inputSchema: GenerateSmartAlertInputSchema,
    outputSchema: GenerateSmartAlertOutputSchema,
  },
  async input => {
    const {output} = await smartAlertPrompt(input);

    // Generate audio alert using TTS model
    const ttsResult = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: output?.alertSummary ?? 'No alert summary available.',
    });

    let audioDataUri = '';
    if (ttsResult.media) {
      const audioBuffer = Buffer.from(
        ttsResult.media.url.substring(ttsResult.media.url.indexOf(',') + 1),
        'base64'
      );
      audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
    }

    return {
      ...output!,
      audioAlert: audioDataUri,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
