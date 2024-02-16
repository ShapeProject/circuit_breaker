import AddressIcon from '@/components/Icons/AddressIcon';
import ScoreIcon from '@/components/Icons/ScoreIcon';

const icons = {AddressIcon, ScoreIcon};

type Name = keyof typeof icons;

type Props = {
    name: Name
    size?: number
    className?: string
};

const DEFAULT_SIZE = 24;

export function Icon({ name, size = DEFAULT_SIZE, className } : Props) {
    const SvgComponent = icons[name]

    return (
        <SvgComponent
        style = {{ height: `${size}px`, width: `${size}px`}}
        className={className} />
    );
};