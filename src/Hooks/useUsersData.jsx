import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const fetchUsersData = async () => {
    const response = await axios.get("http://localhost:5000/get_all_users")
    console.log("all user from hooks--->", response.data)
    return (response.data)
}

// custom hooks--->
const useUsersData = () => {
    return useQuery({
        queryKey: ["usersData"],
        queryFn: fetchUsersData(),
    })
}
// export the main hooks --->
export default useUsersData
