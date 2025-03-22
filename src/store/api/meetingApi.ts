import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question } from "../meetingSlice";

export type RecurrenceType = "none" | "daily" | "weekly" | "biweekly" | "monthly";

export type Recurrence = {
  type: RecurrenceType;
  daysOfWeek?: string[];
  startDate: string;       // ISO date string from the date input
  timeZone: string;
  surveyStartTime: string; // Format "HH:mm"
  surveyEndTime: string;   // Format "HH:mm"
}

export type Meeting = {
  _id?: string;
  title: string;
  questions: Question[];
  recurrence: Recurrence;
  invitedUsers: string[];
  meetingOwner: string;
}

type CreateMeetingResponse = {
  message: string;
  meeting: Meeting;
};

export const meetingApi = createApi({
  reducerPath: "meetingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Meeting"],
  endpoints: (builder) => ({
    createMeeting: builder.mutation<Meeting, Partial<Meeting>>({
      query: (meeting) => ({
        url: "/meeting/schedule-meeting",
        method: "POST",
        body: meeting,
      }),
      transformResponse: (response: CreateMeetingResponse) => response.meeting,
      invalidatesTags: ["Meeting"],
    }),
  }),
});

export const { useCreateMeetingMutation } = meetingApi;