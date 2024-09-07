import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export const Alert = (label) => toast(`${label}`, {
    icon: <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ff6600',width:"20px",height:"20px" }} />,
});
