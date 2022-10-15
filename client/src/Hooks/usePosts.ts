import { useQuery } from "react-query";

const fetchPosts = async () => {
    let res = await fetch("/posts", {
        credentials: "include",
    })
    return res.json();
};

export default function usePosts() {
    const { data, isLoading, isError} = useQuery("posts", fetchPosts);

    return { data, isLoading, isError }
}