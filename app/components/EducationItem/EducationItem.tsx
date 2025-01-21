import { IExperienceItem } from '~/utils/interfaces/components';
import './EducationItem.css'

const EducationItem = (props:IExperienceItem) => {
  const { date, title, companyName } = props;

  return <div className="experience-item-con">
    <div className="content-con">
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
