/**
 * 세션에 정보를 저장&호출&삭제하기 위한 컴포넌트
 *
 */

export const getSession = (name) => {
  return sessionStorage.getItem(name);
};

export const setSession = (name, value, option) => {
  return sessionStorage.setItem(name, value, { ...option });
};

export const removeSession = (name, option) => {
  return sessionStorage.removeItem(name, { ...option });
};
