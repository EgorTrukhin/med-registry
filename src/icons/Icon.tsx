export interface IconProps {
  svg: JSX.Element;
}

export const Icon = (props: IconProps) => {
  const { svg } = props;
  return svg;
}