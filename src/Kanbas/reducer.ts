import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        userId: enrollment.user,
        courseId: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: Ids }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e.user !== Ids.user && e.course !== Ids.course
      );
    },
  },
});


export const { setEnrollments, addEnrollment, deleteEnrollment } =
  enrollmentSlice.actions;
export default enrollmentSlice.reducer;