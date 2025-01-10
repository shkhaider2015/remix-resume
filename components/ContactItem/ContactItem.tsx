import { IContactItem } from 'utils/interfaces/components';
import './ContactItem.css';

const ContactItem = (props:IContactItem) => {
    const { label, value, Icon } = props;

    return <div className="ci-container">
            <div className="icon-con">
                <Icon />
            </div>
            <div className="text-con">
                <div className="label">{label}</div>
                <div className="value">{value}</div>
            </div>
    </div>
};

export default ContactItem;