import React, { useState } from "react";

const CreatePostContext = React.createContext({
    inCreatePage: false,
    changeInCreatePage: () => {}
});

interface CreatePostInterface {
  children: React.ReactNode;
}

export const CreatePostContextProvider = (props: CreatePostInterface) => {
    const [creating, setCreating] = useState(false);

    const createPageHandler = () => {
      
      setCreating((prevState) => {
        return !prevState;
      });
    }
  
    return (
      <CreatePostContext.Provider
        value={{
          inCreatePage: creating,
          changeInCreatePage: createPageHandler
        }}
      >
        {props.children}
      </CreatePostContext.Provider>
    );
  };

export default CreatePostContext;

