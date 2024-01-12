import { Icon } from '@iconify/react';
export const ExpandButton = ({ isOpen, toggle }) => {
    return (
        <button onClick={toggle}>

            <Icon icon="ooui:expand" color="#656762"
                style={{
                    transform: `rotate(${isOpen ? 180 : 0}deg)`,
                    transition: "all 0.25s",
                }}
            />

        </button >
    );
};