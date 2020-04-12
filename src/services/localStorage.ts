
export const getOngID = () => localStorage.getItem('ongId');

export const removeOngID = () => localStorage.removeItem('ongId');

export const setOngID = (id: string) => localStorage.setItem('ongId', id);