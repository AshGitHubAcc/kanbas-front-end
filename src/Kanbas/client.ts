import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollment`;

export const unenroll = async (userId: string, courseId: string) => {
    const response = await axios.delete(`${ENROLLMENT_API}/${userId}/${courseId}`);
    return response.data;
};
export const enroll = async (userId: string, courseId:string) => {
    const response = await axios.get(`${ENROLLMENT_API}/${userId}/${courseId}`);
    return response.data;
};