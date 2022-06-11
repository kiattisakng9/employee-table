import axios from "axios";

export const useAPICallsHook = () => {
  /**
   * Fetch employees
   * @returns Array of employees
   */
  const fetchAllEmployees = async () => {
    const response = axios
      .get("./Employees.json")
      .then((res) => res?.data)
      .catch((err) => {
        console.error("Err fetching users: ", err);
        return [];
      });

    return response;
  };

  return { fetchAllEmployees };
};
