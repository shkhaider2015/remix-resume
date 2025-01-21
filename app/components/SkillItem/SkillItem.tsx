import { NextLogo } from "~/assets/logos";
import './SkillItem.css'
import { ISkillItem } from "~/utils/interfaces/components";

const SkillItem = (props:ISkillItem) => {
    const { name, Icon } = props;

    return <div className="si-container" >
        <div className="si-content" >
            <Icon />
        </div>
        <span className="tooltip" >{name}</span>
    </div>
}

export default SkillItem;