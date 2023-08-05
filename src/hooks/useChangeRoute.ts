import {useLocation, useNavigate} from 'react-router-dom';
import {EnumRouter} from '../Router';

interface IUseChangeRoute {
  changeRoute: (to: EnumRouter) => void;
}

export const useChangeRoute = (): IUseChangeRoute => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const changeRoute = (to: EnumRouter) => {
    if (location.pathname !== to) {
      navigate(to);
    }
  };
  
  return { changeRoute };
};
