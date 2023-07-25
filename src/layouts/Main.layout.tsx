import React, {FC, PropsWithChildren, ReactElement} from 'react';
import Header from '../components/Header';

const MainLayout: FC<PropsWithChildren> = (props): ReactElement => {
  const {children} = props;

  return (
    <>
      <Header/>

      {children}
    </>
  );
};

export default MainLayout;
