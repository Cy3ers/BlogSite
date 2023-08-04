import React, { createContext, useState } from 'react';

export const EditBlogContext = createContext();

export const EditBlogProvider = ({ children }) => {
  const [editBlogData, setEditBlogData] = useState(null);

  const setEditData = (data) => {
    setEditBlogData(data);
  };

  return (
    <EditBlogContext.Provider value={{ editBlogData, setEditData }}>
      {children}
    </EditBlogContext.Provider>
  );
};
