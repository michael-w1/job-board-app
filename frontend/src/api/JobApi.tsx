import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { Job } from "../types";

// import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllJobs = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getAllJobsRequest = async (): Promise<Job[]> => {
        const accessToken = await getAccessTokenSilently();
        // What end point to call at the backend

        const response = await fetch(`${API_BASE_URL}/api/job`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            //   body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch jobs");
        }


        return response.json();
    };


    const { data: allJobs, isLoading, error } = useQuery<Job[]>({
        queryKey: ['fetchAllJobs'], // Query key
        queryFn: getAllJobsRequest, // Query function
    });

    // console.log(error);

    return { allJobs, isLoading};


};



export const useAddJob = () => {
    const { getAccessTokenSilently } = useAuth0();

    const addJobRequest = async (jobInfo: Job): Promise<Job> => {
        const accessToken = await getAccessTokenSilently();
        // What end point to call at the backend

        const response = await fetch(`${API_BASE_URL}/api/job`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobInfo),
        });

        if (!response.ok) {
            throw new Error("Failed to add job");
        }
        return response.json();
    };

    const queryClient = useQueryClient()

    const { mutateAsync: addJobMutation } = useMutation({
        mutationFn: addJobRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchAllJobs"] });
        }
    })

    return { addJobMutation };


};


export const useEditJob = () => {
    const { getAccessTokenSilently } = useAuth0();

    const editJobRequest = async (jobInfo: Job): Promise<Job> => {
        const accessToken = await getAccessTokenSilently();
        // What end point to call at the backend

        const response = await fetch(`${API_BASE_URL}/api/job`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobInfo),
        });

        if (!response.ok) {
            console.log(response); 
            throw new Error("Failed to edit job");
        }
        return response.json();
    };

    const queryClient = useQueryClient()

    const { mutateAsync: editJobMutation } = useMutation({
        mutationFn: editJobRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchAllJobs"] });
        }
    })

    return { editJobMutation };


};


export const useDeleteJob = () => {
    const { getAccessTokenSilently } = useAuth0();

    const deleteJobRequest = async (jobInfo: Job): Promise<Job> => {
        const accessToken = await getAccessTokenSilently();
        // What end point to call at the backend

        const response = await fetch(`${API_BASE_URL}/api/job`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobInfo),
        });

        if (!response.ok) {
            console.log(response); 
            throw new Error("Failed to delete job");
        }
        return response.json();
    };

    const queryClient = useQueryClient()

    const { mutateAsync: deleteJobMutation } = useMutation({
        mutationFn: deleteJobRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchAllJobs"] });
        }
    })

    return { deleteJobMutation };


};