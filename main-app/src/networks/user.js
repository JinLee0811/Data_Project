
import api from '../commons/api'


export const fetchUserInfo = async () => {
  try {
    const response = await api.get("/account");

    return response
  } catch (error) {
    console.error(error);
  }
}
