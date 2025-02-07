import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { useAuth0 } from "@auth0/auth0-react";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };



  // Use useQuery hook with a more explicit structure
  const { data: currentUser, isPending, error } = useQuery<User>({
    queryKey: ['fetchCurrentUser'], // Query key
    queryFn: getMyUserRequest, // Query function
  });



  return { currentUser, isPending };


};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };


  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: createMyUserRequest,
    // Optionally add onError, onSuccess, onSettled here
  });


  return {
    createUser: mutate,
    isPending,
    isError,
    isSuccess,
  };
};

