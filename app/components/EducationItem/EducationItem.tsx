import { IExperienceItem } from '~/utils/interfaces/components';
import './EducationItem.css'
import StarffallAnimation from '../StarfallAnimation/StarfallAnimation';

const EducationItem = (props:IExperienceItem) => {
  const { date, title, companyName } = props;

  return <div className="edu-item-con">
    <div className="content-con">
      <StarffallAnimation />
      <div className="ribbon" >some</div>
        <h4 className="date">{date}</h4>
        <p className="title">{title}</p>
        <div className='company' >
            <div className='circle' />
            <span className='title' >{companyName}</span>
        </div>
        {/* <div className='left-tringle' /> */}
      </div>
  </div>;
};



export default EducationItem;
