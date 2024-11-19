import { ApiRequest } from './../utils/networks/ApiRequests';
import { State, Action } from './actions';

export const forget_password = async (email: string, dispatch: React.Dispatch<Action>) => {
    try{
        const response = await ApiRequest().request({
            method: "POST",
            // url: `${process.env.REACT_APP_BASE_URL}${GET_AUTO_COMPLETE}`,
          });
    }   catch(err){}

}