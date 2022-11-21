import MaterialIcon from "material-icons-react";

export interface IconProps {
    name?: string;
    color?: string;
    size?: number;
}

const Icon = (props: IconProps) => {
    const {name, color, size} = props;
    return (
        <MaterialIcon
            icon={name}
            color={color ? color : "#0F2232"}
            size={size ? size : 25}
        />
    );
}

export default Icon;