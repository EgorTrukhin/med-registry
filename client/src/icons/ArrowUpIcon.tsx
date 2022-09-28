import { Icon } from "./Icon";

export const ArrowUpIcon = () => {
  const svg = (
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" width="30" height="30" viewBox="0 0 24 24" xmlSpace="preserve">
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M8.5 17.5l6-6 6 6"/>
    </svg>
  );

  return <Icon svg={svg} />
}